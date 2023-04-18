import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
  const body = await req.json();
  const { userId } = body;

  const { data: mycourses, error: mycoursesError } = await supabase
    .from("mycourses")
    .select("courseId")
    .eq("userId", userId);

  if (mycoursesError) {
    console.log(mycoursesError.message);
    return new Response(JSON.stringify({ error: mycoursesError.message }), {
      status: 401,
    });
  }

  const courseIds = mycourses.map((course) => course.courseId);

  const { data, error } = await supabase
    .from("course")
    .select("*")
    .not("id", "in", `(${courseIds})`)
    .neq("creator", userId)
    .order("id", { ascending: false });

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
