import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
  const body = await req.json();
  const { userId, courseId } = body;

  const { data, error } = await supabase.from("mycourses").insert([
    {
      userId: userId,
      courseId: courseId,
    },
  ]);

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
