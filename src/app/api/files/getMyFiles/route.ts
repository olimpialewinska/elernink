
import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import { Json } from "../../../../../types/supabase";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY!
);
export async function POST(req: Request) {
  
}
