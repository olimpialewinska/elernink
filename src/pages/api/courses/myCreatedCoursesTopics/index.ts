import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return new Response(null, {
      status: 405,
      statusText: "Method Not Allowed",
    });
  }
  const { id, creator } = req.body;

  const { data: data2, error: error2 } = await supabase
    .from("course")
    .select("*")
    .match({
      id: id,
      creator: creator,
    });

  if (error2) {
    res.status(401).send(
      JSON.stringify({
        error: error2.message,
      })
    );
    return;
  }

  if (data2.length === 0) {
    res.status(401).send(
      JSON.stringify({
        error: "You are not the creator of this course",
      })
    );
    return;
  }

  const { data, error } = await supabase
    .from("course")
    .select("*")
    .eq("id", id);

  if (error) {
    res.status(401).send({
      error: error.message,
    });
    return;
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
    res.status(401).send({
      error: errorTopics.message,
    });
    return;
  }

  res.status(200).send(
    JSON.stringify({
      data,
      topics,
      imageUrl,
    })
  );
}
