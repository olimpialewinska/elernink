import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import { Json } from "../../../../../types/supabase";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY!
);
export async function POST(req: Request) {
  const files = await req.formData();
  const courseId = files.get("courseId");
  const topicId = files.get("topicId");

  for (var pair of files.entries()) {
    if (pair[0] == "topicId" || pair[0] == "courseId") {
      continue;
    }

    const newName = pair[1].name.replace(/[^a-zA-Z0-9.]/g, "");
    const path = `/${courseId}/${topicId}/${newName}`;
    const { data, error } = await supabase.storage
      .from("courseFiles")
      .upload(path, pair[1], {
        cacheControl: "3600",
        upsert: false,
      });
    if (error) {
      console.log(error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 401,
      });
    }

    const { data: fileData, error: fileError } = await supabase
      .from("topic_files")
      .insert([
        {
          filename: newName,
          path: path,
          topic_id: topicId,
          course_id: courseId,
          type: pair[1].type,
        },
      ]);
    if (fileError) {
      console.log(fileError);
      return new Response(JSON.stringify({ error: fileError.message }), {
        status: 401,
      });
    }
  }

  return new Response(JSON.stringify({ data: "success" }), {
    status: 200,
  });
}
