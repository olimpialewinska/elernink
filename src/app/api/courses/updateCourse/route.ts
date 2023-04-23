import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
  const body = await req.json();
  const { id, type, value } = body;

  if (type === "name") {
    const { data, error } = await supabase
      .from("course")
      .update({
        name: value,
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
  } else if (type === "description") {
    const { data, error } = await supabase
      .from("course")
      .update({
        description: value,
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
  } else if (type === "alert") {
    const { data, error } = await supabase
      .from("course")
      .update({
        alert: value,
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
