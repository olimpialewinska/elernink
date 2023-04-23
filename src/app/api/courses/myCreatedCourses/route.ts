import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
  const body = await req.json();
  const { id } = body;

  const { data, error } = await supabase
    .from("course")
    .select("*")
    .eq("creator", id);

  if (error) {
    console.log(error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 401,
    });
  }

  const dataWithUrl = await Promise.all(
    data.map(async (course) => {
      if (!course.photoPath) {
        return {
          ...course,
          image: null,
        };
      }
      const { data: imageUrl } = supabase.storage
        .from("photos")
        .getPublicUrl(course.photoPath);

      return {
        ...course,
        image: imageUrl.publicUrl,
      };
    })
  );

  return new Response(JSON.stringify(dataWithUrl), {
    headers: {
      "content-type": "application/json",
    },
  });
}
