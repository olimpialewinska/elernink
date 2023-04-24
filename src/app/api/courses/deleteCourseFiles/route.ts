import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import { Json } from "../../../../../types/supabase";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY!
);
export async function POST(req: Request) {
  const body = await req.json();
  const { topicId, courseId, filename } = body;
  console.log(topicId, courseId, filename);

  const { data, error } = await supabase
    .from("topic_files")
    .delete()
    .eq("topic_id", topicId)
    .eq("course_id", courseId)
    .eq("filename", filename);

  if (error) {
    console.log(error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 401,
    });
  }
  const { data: storage, error: storageError } = await supabase.storage
    .from("courseFiles")
    .remove([`${courseId}/${topicId}/${filename}`]);

  if (storageError) {
    console.log(storageError.message);
    return new Response(JSON.stringify({ error: storageError.message }), {
      status: 401,
    });
  }

  return new Response(JSON.stringify({ data: data }), {
    status: 200,
  });
}
