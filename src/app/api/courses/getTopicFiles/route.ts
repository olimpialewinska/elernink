import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import { Json } from "../../../../../types/supabase";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY!
);
export async function POST(req: Request) {
  const body = await req.json();
  const { courseId, topicId } = body;

  const { data, error } = await supabase
    .from("topic_files")
    .select("*")
    .eq("topic_id", topicId);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 401,
    });
  }

  const files = await Promise.all(
    data.map(async (file) => {
      const { data: publicUrlData } = supabase.storage
        .from("courseFiles")
        .getPublicUrl(file.path);

      const { data: downloadData, error: downloadError } =
        await supabase.storage.from("courseFiles").download(file.path);

      if (downloadError) {
        return new Response(JSON.stringify({ error: downloadError.message }), {
          status: 401,
        });
      }

      return {
        id: file.id,
        url: publicUrlData.publicUrl,
        name: file.filename,
        type: file.type,
        path: file.path,
        download: downloadData,
      };
    })
  );

  return new Response(JSON.stringify(files), {
    status: 200,
  });
}
