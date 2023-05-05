import { createClient } from "@supabase/supabase-js";
import { NextApiRequest, NextApiResponse } from "next";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  res
    .setHeader("Set-Cookie", `Authorization=""}; Max-Age=0; Path=/`)
    .status(200);
}
