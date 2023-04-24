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

  for (var pair of files.entries()) {
    if (pair[0] == "userId") {
      continue;
    }

    if (pair instanceof File) {
      const newName = pair.name.replace(/[^a-zA-Z0-9.]/g, "");
      const path = `${userId.id}/${newName}`;
      const { data, error } = await supabase.storage
        .from("files")
        .upload(path, pair, {
          cacheControl: "3600",
          upsert: false,
        });
      if (error) {
        return new Response(JSON.stringify({ error: error.message }), {
          status: 401,
        });
      }

      const { data: fileData, error: fileError } = await supabase
        .from("files")
        .insert([
          {
            name: newName,
            url: data.path,
            size: pair.size,
            type: pair.type,
            userId: userId.id,
          },
        ]);
      if (fileError) {
        return new Response(JSON.stringify({ error: fileError.message }), {
          status: 401,
        });
      }
    }
  }

  return new Response(JSON.stringify({ data: "success" }), {
    status: 200,
  });
}
