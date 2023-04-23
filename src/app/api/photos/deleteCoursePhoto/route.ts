import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY!
);
export async function POST(req: Request) {
  const body = await req.json();
  const { courseId } = body;

  const { data: photoName, error: courseError } = await supabase
    .from("course")
    .select("photoPath")
    .eq("id", courseId);

  if (courseError) {
    console.log(courseError.message);
    return new Response(JSON.stringify({ error: courseError.message }), {
      status: 401,
    });
  }
  console.log(photoName);

  const { data: deleteData, error: deleteError } = await supabase.storage
    .from("photos")
    .remove([photoName[0].photoPath.slice(1)]);

  console.log(deleteError);
  console.log(deleteData);
  console.log(photoName);

  if (deleteError) {
    console.log(deleteError.message);
    return new Response(JSON.stringify({ error: deleteError.message }), {
      status: 401,
    });
  }

  const { data, error } = await supabase
    .from("course")
    .update({
      photoPath: null,
      photoName: null,
    })
    .eq("id", courseId);

  if (error) {
    console.log(error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 401,
    });
  }

  return new Response(JSON.stringify({ data }), {
    status: 200,
  });
}
