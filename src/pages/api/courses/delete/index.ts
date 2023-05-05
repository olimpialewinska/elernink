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
  const { id } = req.body;

  const { data: data1, error: error1 } = await supabase
    .from("topic_files")
    .delete()
    .eq("course_id", id);

  if (error1) {
    res.status(401).send(JSON.stringify({ error: error1.message }));
    return;
  }

  const { data: data2, error: error2 } = await supabase
    .from("topic")
    .delete()
    .eq("course_id", id);

  if (error2) {
    res.status(401).send(
      JSON.stringify({
        error: error2.message,
      })
    );
    return;
  }

  const { data: data3, error: error3 } = await supabase
    .from("mycourses")
    .delete()
    .eq("courseId", id);
  if (error3) {
    res.status(401).send(
      JSON.stringify({
        error: error3.message,
      })
    );
    return;
  }

  const { data: data4, error: error4 } = await supabase.storage
    .from("courseFiles")
    .remove([`${id}`]);

  if (error4) {
    res.status(401).send(
      JSON.stringify({
        error: error4.message,
      })
    );
    return;
  }

  const { data: data5, error: error5 } = await supabase.storage
    .from("photos")
    .remove([`${id}`]);

  if (error5) {
    res.status(401).send(
      JSON.stringify({
        error: error5.message,
      })
    );
    return;
  }

  const { data, error } = await supabase.from("course").delete().eq("id", id);

  if (error) {
    res.status(401).send({
      error: error.message,
    });
  }

  res.status(200).send(JSON.stringify(data));
}
