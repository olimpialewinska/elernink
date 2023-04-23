import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY!
);
export async function POST(req: Request) {
  const body = await req.json();
  const { courseId } = body;

  const { data, error } = await supabase
    .from("course")
    .select("photoPath")
    .eq("id", courseId);

  if (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 401,
    });
  }

  console.log("data", data);
  const { data: publicUrl } = supabase.storage
    .from("photos")
    .getPublicUrl(data[0].photoPath);

  return new Response(JSON.stringify({ data: publicUrl }), {
    status: 200,
  });
}
