import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
  const body = await req.json();
  const { id, name } = body;

  //update topic
  const { data, error } = await supabase
    .from("topic")
    .update({
      name: name,
    })
    .eq("id", id);

  if (error) {
    console.log(error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 401,
    });
  }

  return new Response(JSON.stringify({ data: data }), {
    status: 200,
  });
}
