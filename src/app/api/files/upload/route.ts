import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import { Json } from "../../../../../types/supabase";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY!
);
export async function POST(req: Request) {
  const files = await req.formData();
  const userIdString = files.get("userId") as string;

  const userId = JSON.parse(userIdString);
  console.log(userId.id);

  files.forEach(async (file: any) => {
    const path = `${userId.id}/${file.name}`;
    console.log(path);
    const { data, error } = await supabase.storage
      .from("files")
      .upload(path, file, {
        cacheControl: "3600",
        upsert: false,
      });
    if (error) {
      console.log(error.message);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 401,
      });
    }

    const { data: fileData, error: fileError } = await supabase
      .from("files")
      .insert([
        {
          name: file.name,
          url: data.path,
          size: file.size,
          type: file.type,
          userId: userId.id,
        },
      ]);
    if (fileError) {
      console.log(fileError.message);
      return new Response(JSON.stringify({ error: fileError.message }), {
        status: 401,
      });
    }
  });

  return new Response(JSON.stringify({ data: "success" }), {
    status: 200,
  });
}
