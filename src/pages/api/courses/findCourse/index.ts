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
  const { userId } = req.body;

  const { data: mycourses, error: mycoursesError } = await supabase
    .from("mycourses")
    .select("courseId")
    .eq("userId", userId);

  if (mycoursesError) {
    res.status(401).send(JSON.stringify({ error: mycoursesError.message }));
    return;
  }

  const courseIds = mycourses.map((course) => course.courseId);

  const { data, error } = await supabase
    .from("course")
    .select("*")
    .not("id", "in", `(${courseIds})`)
    .neq("creator", userId)
    .order("id", { ascending: false });

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

  res.status(200).send(JSON.stringify(dataWithUrl));
}
