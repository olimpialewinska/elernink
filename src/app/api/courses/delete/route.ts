import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
  const body = await req.json();
  const { id } = body;

  const { data: data1, error: error1 } = await supabase
    .from("topic_files")
    .delete()
    .eq("course_id", id);

  if (error1) {
    console.log(error1.message);

    return new Response(JSON.stringify({ error: error1.message }), {
      status: 401,
    });
  }

  const { data: data2, error: error2 } = await supabase
    .from("topic")
    .delete()
    .eq("course_id", id);

  if (error2) {
    console.log(error2.message);
    return new Response(JSON.stringify({ error: error2.message }), {
      status: 401,
    });
  }

  const { data: data3, error: error3 } = await supabase
    .from("mycourses")
    .delete()
    .eq("courseId", id);
  if (error3) {
    console.log(error3.message);
    return new Response(JSON.stringify({ error: error3.message }), {
      status: 401,
    });
  }

  const { data: data4, error: error4 } = await supabase.storage
    .from("courseFiles")
    .remove([`${id}`]);

  if (error4) {
    console.log(error4.message);
    return new Response(JSON.stringify({ error: error4.message }), {
      status: 401,
    });
  }

  const { data: data5, error: error5 } = await supabase.storage
    .from("photos")
    .remove([`${id}`]);

  if (error5) {
    console.log(error5.message);
    return new Response(JSON.stringify({ error: error5.message }), {
      status: 401,
    });
  }

  const { data, error } = await supabase.from("course").delete().eq("id", id);

  if (error) {
    console.log(error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 401,
    });
  }

  return new Response(JSON.stringify(data), {
    status: 200,
  });
}
