import { createClient } from "@supabase/supabase-js";
import { NextApiRequest, NextApiResponse } from "next";
import { json } from "stream/consumers";

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

  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    res.status(401).send({
      error: error.message,
    });
    return;
  }

  res
    .setHeader(
      "Set-Cookie",
      `Authorization=${JSON.stringify(data)}; Max-Age=3600; Path=/`
    )
    .status(200)
    .send(JSON.stringify(data));
}
