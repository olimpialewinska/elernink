import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
  const body = await req.json();
  const { email, password } = body;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  let authError = null;

  if (data.user && data.user.identities && data.user.identities.length === 0) {
    authError = {
      name: "AuthApiError",
      message: "User already exists",
    };
  } else if (error)
    authError = {
      name: error.name,
      message: error.message,
    };

  if (authError) {
    return new Response(JSON.stringify(authError), {
      status: 400,
    });
  }

  return new Response(JSON.stringify(data), { status: 200 });
}
