import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return new Response(null, {
      status: 405,
      statusText: "Method Not Allowed",
    });
  }
  const { topicId } = JSON.parse(req.body);

  const { data, error } = await supabase
    .from("topic_files")
    .select("*")
    .eq("topic_id", topicId);

  if (error) {
    res.status(401).send({
      error: error.message,
    });
    return;
  }

  const files = await Promise.all(
    data.map(async (file) => {
      const { data: publicUrlData } = supabase.storage
        .from("courseFiles")
        .getPublicUrl(file.path);

      const { data: downloadData, error: downloadError } =
        await supabase.storage.from("courseFiles").download(file.path);

      if (downloadError) {
        res.status(401).send(
          JSON.stringify({
            error: downloadError.message,
          })
        );
        return;
      }

      return {
        id: file.id,
        url: publicUrlData.publicUrl,
        name: file.filename,
        type: file.type,
        path: file.path,
        download: downloadData,
      };
    })
  );

  res.status(200).send(
    JSON.stringify({
      files,
    })
  );
}
