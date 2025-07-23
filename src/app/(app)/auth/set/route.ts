import { NextResponse } from 'next/server';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const body = await request.json();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll().map(c => ({ name: c.name, value: c.value }));
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set({ name, value, ...(options as CookieOptions) });
          });
        },
      },
    }
  );

  // Atualiza os cookies com a sessão recebida
  if (body.event === 'SIGNED_IN' || body.event === 'TOKEN_REFRESHED') {
    await supabase.auth.setSession(body.session);
  }
  if (body.event === 'SIGNED_OUT') {
    await supabase.auth.signOut();
  }

  return NextResponse.json({ ok: true });
}
