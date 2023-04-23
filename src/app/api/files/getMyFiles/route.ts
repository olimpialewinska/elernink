import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import { Json } from "../../../../../types/supabase";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY!
);
export async function POST(req: Request) {
  const body = await req.json();
  const { userId } = body;

  const { data, error } = await supabase
    .from("files")
    .select("*")
    .eq("userId", userId);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 401,
    });
  }

  const files = await Promise.all(
    data.map(async (file) => {
      const { data: publicUrlData } = supabase.storage
        .from("files")
        .getPublicUrl(`${userId}/${file.name}`);

      const { data: downloadData, error: downloadError } =
        await supabase.storage.from("files").download(`${userId}/${file.name}`);

      if (downloadError) {
        return new Response(JSON.stringify({ error: downloadError.message }), {
          status: 401,
        });
      }

      return {
        id: file.id,
        url: publicUrlData.publicUrl,
        name: file.name,
        size: file.size,
        type: file.type,
        download: downloadData,
      };
    })
  );

  return new Response(JSON.stringify(files), {
    status: 200,
  });
}
