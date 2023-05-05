import { createClient } from "@supabase/supabase-js";
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
  const { id } = req.body;

  const { data, error } = await supabase
    .from("course")
    .select("*")
    .eq("creator", id);

  if (error) {
    res.status(401).send({
      error: error.message,
    });
    return;
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

  res.status(200).send(dataWithUrl);
}
