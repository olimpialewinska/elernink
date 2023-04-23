import { TopicInterface } from "@/types";
import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
  const body = await req.json();
  const { courseId, topic, lesson, order } = body;
  console.log(topic, courseId, lesson, order);

  const { data, error } = await supabase
    .from("topic")
    .insert([
      {
        topic: topic,
        lesson: lesson,
        course_id: courseId,
        order: order,
      },
    ])
    .select("id");

  if (error) {
    console.log(error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 401,
    });
  }

  console.log(data);
  return new Response(JSON.stringify(data), {
    status: 200,
  });
}
