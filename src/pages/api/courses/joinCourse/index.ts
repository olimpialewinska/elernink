import { createClient } from "@supabase/supabase-js";
import { NextApiRequest, NextApiResponse } from "next";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
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
  const { userId, courseId, userName } = req.body;

  const { data, error } = await supabase.from("mycourses").insert([
    {
      userId: userId,
      courseId: courseId,
      user_name: userName,
    },
  ]);

  if (error) {
    res.status(401).send({
      error: error.message,
    });
  }

  res.status(200).send(
    JSON.stringify({
      data,
    })
  );
}
