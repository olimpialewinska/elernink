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
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  let authError = null;

  if (data.user && data.user.identities && data.user.identities.length === 0) {
    authError = {
      name: "AuthApiError",
      message: "User already exists",
    };
  } else if (error)
    authError = {
      name: error.name,
      message: error.message,
    };

  if (authError) {
    res.status(401).send({
      error: authError,
    });
    return;
  }

  res.status(200).send({
    data,
  });
  return;
}
