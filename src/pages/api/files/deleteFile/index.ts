import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
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
  const { userId, fileName, id } = req.body;

  const { data, error } = await supabase.from("files").delete().eq("id", id);

  if (error) {
    res.status(401).send({
      error: error.message,
    });
  }
  const { data: storage, error: storageError } = await supabase.storage
    .from("files")
    .remove([`${userId}/${fileName}`]);

  if (storageError) {
    res.status(401).send({
      error: storageError.message,
    });
    return;
  }

  res.status(200).send(
    JSON.stringify({
      data,
    })
  );
}
