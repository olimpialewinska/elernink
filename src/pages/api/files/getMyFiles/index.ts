import { createClient } from "@supabase/supabase-js";
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
  const { userId } = req.body;

  const { data, error } = await supabase
    .from("files")
    .select("*")
    .eq("userId", userId);

  if (error) {
    res.status(401).send({
      error: error.message,
    });
    return;
  }

  const files = await Promise.all(
    data.map(async (file) => {
      const { data: publicUrlData } = supabase.storage
        .from("files")
        .getPublicUrl(`${userId}/${file.name}`);

      const { data: downloadData, error: downloadError } =
        await supabase.storage.from("files").download(`${userId}/${file.name}`);

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
        name: file.name,
        size: file.size,
        type: file.type,
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
