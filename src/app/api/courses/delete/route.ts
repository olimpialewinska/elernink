import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
  const body = await req.json();
  const { id } = body;

  const { data: data2, error: error2 } = await supabase
    .from("topic")
    .delete()
    .eq("course_id", id);

  if (error2) {
    return new Response(JSON.stringify({ error: error2.message }), {
      status: 401,
    });
  }
  //usun kurs
  const { data, error } = await supabase.from("course").delete().eq("id", id);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 401,
    });
  }

  return new Response(JSON.stringify(data), {
    status: 200,
  });
}
