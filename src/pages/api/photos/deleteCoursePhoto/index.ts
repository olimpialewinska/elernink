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
  const { courseId } = req.body;

  const { data: photoName, error: courseError } = await supabase
    .from("course")
    .select("photoPath")
    .eq("id", courseId);

  if (courseError) {
    return new Response(JSON.stringify({ error: courseError.message }), {
      status: 401,
    });
    return;
  }

  const { data: deleteData, error: deleteError } = await supabase.storage
    .from("photos")
    .remove([photoName[0].photoPath.slice(1)]);

  if (deleteError) {
    return new Response(JSON.stringify({ error: deleteError.message }), {
      status: 401,
    });
    return;
  }

  const { data, error } = await supabase
    .from("course")
    .update({
      photoPath: null,
      photoName: null,
    })
    .eq("id", courseId);

  if (error) {
    res.status(401).send({
      error: error.message,
    });
    return;
  }

  res.status(200).send(
    JSON.stringify({
      data,
    })
  );
}
