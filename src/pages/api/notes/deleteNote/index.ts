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
  const body = JSON.parse(req.body);
  const { noteId } = body;

  const { data, error } = await supabase
    .from("notes")
    .delete()
    .eq("id", noteId)
    .select("id");

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
