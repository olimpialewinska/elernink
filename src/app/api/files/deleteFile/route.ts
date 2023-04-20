import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import { Json } from "../../../../../types/supabase";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY!
);
export async function POST(req: Request) {
  const body = await req.json();
  const { userId, fileName, id } = body;

  const { data, error } = await supabase.from("files").delete().eq("id", id);

  if (error) {
    console.log(error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 401,
    });
  }
  const { data: storage, error: storageError } = await supabase.storage
    .from("files")
    .remove([`${userId.id}/${fileName}`]);

  if (storageError) {
    console.log(error);
    return new Response(JSON.stringify({ error: storageError.message }), {
      status: 401,
    });
  }

  return new Response(JSON.stringify({ data: data }), {
    status: 200,
  });
}
