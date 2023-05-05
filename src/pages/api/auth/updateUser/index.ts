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
  const { type, id, value } = req.body;

  if (type == "email") {
    const { data: user, error } = await supabase.auth.admin.updateUserById(id, {
      email: value,
    });

    if (error) {
      res.status(401).send({
        error: error.message,
      });
      return;
    }

    return new Response(JSON.stringify({ message: "email updated" }), {
      status: 200,
    });
  }

  if (type == "password") {
    const { data: user, error } = await supabase.auth.admin.updateUserById(id, {
      password: value,
    });

    if (error) {
      res.status(401).send({
        error: error.message,
      });
      return;
    }

    return new Response(JSON.stringify({ message: "password updated" }), {
      status: 200,
    });
  }
}
