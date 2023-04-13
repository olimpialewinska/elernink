import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
  const body = await req.json();
  const { id, creator } = body;

  const { data, error } = await supabase
    .from("course")
    .select("*")
    .eq("id", id);

  if (error) {
    console.log(error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 401,
    });
  }

  const { data: topics, error: errorTopics } = await supabase
    .from("topic")
    .select("*")
    .eq("course_id", id);

  if (errorTopics) {
    console.log(errorTopics.message);
    return new Response(JSON.stringify({ error: errorTopics.message }), {
      status: 401,
    });
  }

  return new Response(JSON.stringify({ data, topics }), {
    headers: {
      "content-type": "application/json",
    },
  });
}