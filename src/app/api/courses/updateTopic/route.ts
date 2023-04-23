import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
  const body = await req.json();
  const { id, value, type } = body;

  if (type === "lesson") {
    const { data, error } = await supabase
      .from("topic")
      .update({
        lesson: value,
      })
      .eq("id", id);

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 401,
      });
    }

    return new Response(JSON.stringify({ data: data }), {
      status: 200,
    });
  } else if (type === "topic") {
    const { data, error } = await supabase
      .from("topic")
      .update({
        topic: value,
      })
      .eq("id", id);

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 401,
      });
    }

    return new Response(JSON.stringify({ data: data }), {
      status: 200,
    });
  }
}
