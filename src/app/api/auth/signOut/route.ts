import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
  return new Response("Signing Out", {
    headers: {
      "content-type": "application/json",
      "Set-Cookie": `Authorization=signout; Max-Age=0; Path=/`,
    },
  });
}
