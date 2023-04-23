import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY!
);
export async function POST(req: Request) {
  const files = await req.formData();
  const courseId = files.get("courseId");

  for (var pair of files.entries()) {
    if (pair[0] == "courseId") {
      continue;
    }

    const newName = pair[1].name.replace(/[^a-zA-Z0-9.]/g, "");
    const path = `/${courseId}/${newName}`;
    const { data, error } = await supabase.storage
      .from("photos")
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
      .from("course")
      .update({ photoPath: path, photoName: pair[1].name })
      .eq("id", courseId);

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
