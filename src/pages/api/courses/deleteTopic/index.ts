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
    .eq("topic_id", id);

  if (error1) {
    res.status(401).send(JSON.stringify({ error: error1.message }));
    return;
  }

  const { data, error: error2 } = await supabase
    .from("topic")
    .delete()
    .eq("id", id);

  if (error2) {
    res.status(401).send(
      JSON.stringify({
        error: error2.message,
      })
    );
    return;
  }

  res.status(200).send(
    JSON.stringify({
      data,
    })
  );
}
