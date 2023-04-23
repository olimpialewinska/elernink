import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY!
);

export async function POST(req: Request) {
  const body = await req.json();
  const { type, id, value } = body;

  if (type == "email") {
    const { data: user, error } = await supabase.auth.admin.updateUserById(id, {
      email: value,
    });

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 401,
      });
    }

    return new Response(JSON.stringify({ message: "email updated" }), {
      status: 200,
    });
  }

  if (type == "password") {
    const { data: user, error } = await supabase.auth.admin.updateUserById(id, {
      password: value,
    });

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 401,
      });
    }

    return new Response(JSON.stringify({ message: "password updated" }), {
      status: 200,
    });
  }
}
