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
  const { topicId, courseId, filename } = req.body;

  const { data, error } = await supabase
    .from("topic_files")
    .delete()
    .eq("topic_id", topicId)
    .eq("course_id", courseId)
    .eq("filename", filename);

  if (error) {
    res.status(401).send({
      error: error.message,
    });
  }
  const { data: storage, error: storageError } = await supabase.storage
    .from("courseFiles")
    .remove([`${courseId}/${topicId}/${filename}`]);

  if (storageError) {
    res.status(401).send({
      error: storageError.message,
    });
    return;
  }

  res.status(200).send(
    JSON.stringify({
      data,
    })
  );
}
