import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
  const body = await req.json();
  const { id, creator } = body;

  const { data: data2, error: error2 } = await supabase
    .from("course")
    .select("*")
    .match({
      id: id,
      creator: creator,
    });

  if (error2) {
    return new Response(JSON.stringify({ error: error2.message }), {
      status: 401,
    });
  }

  if (data2.length === 0) {
    return new Response(
      JSON.stringify({ error: "You are not creator of this course" }),
      {
        status: 500,
      }
    );
  }

  const { data, error } = await supabase
    .from("course")
    .select("*")
    .eq("id", id);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 401,
    });
  }

  let imageUrl: string | null = "";
  if (data[0].photoPath) {
    imageUrl = supabase.storage.from("photos").getPublicUrl(data[0].photoPath)
      .data.publicUrl;
  } else {
    imageUrl = null;
  }

  const { data: topics, error: errorTopics } = await supabase
    .from("topic")
    .select("*")
    .eq("course_id", id)
    .order("order", { ascending: true });

  if (errorTopics) {
    return new Response(JSON.stringify({ error: errorTopics.message }), {
      status: 401,
    });
  }

  return new Response(
    JSON.stringify({
      data,
      topics,
      imageUrl,
    }),
    {
      headers: {
        "content-type": "application/json",
      },
    }
  );
}
