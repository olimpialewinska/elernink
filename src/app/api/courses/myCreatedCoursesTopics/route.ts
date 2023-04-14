import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
  const body = await req.json();
  const { id, creator } = body;

  // sprawdz czy creator z bazy zgadza sie z tym z body
  const { data: data2, error: error2 } = await supabase
    .from("course")
    .select("*")
    .match({
      id: id,
      creator: creator,
    });

  if (error2) {
    console.log(error2.message);
    return new Response(JSON.stringify({ error: error2.message }), {
      status: 401,
    });
  }

  if (data2.length === 0) {
    return new Response(
      JSON.stringify({ error: "You are not creator of this course" }),
      {
        status: 500,
      }
    );
  }

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
