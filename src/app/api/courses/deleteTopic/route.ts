import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
  const body = await req.json();
  const { id } = body;
  console.log(id);

  const { data: data1, error: error1 } = await supabase
    .from("topic_files")
    .delete()
    .eq("topic_id", id);

  if (error1) {
    console.log(error1.message);
    return new Response(JSON.stringify({ error: error1.message }), {
      status: 401,
    });
  }

  console.log(error1);
  console.log("deleted");

  const { data, error: error2 } = await supabase
    .from("topic")
    .delete()
    .eq("id", id);

  if (error2) {
    console.log(error2.message);
    return new Response(JSON.stringify({ error: error2.message }), {
      status: 401,
    });
  }

  return new Response(JSON.stringify({ data: data }), {
    status: 200,
  });
}
