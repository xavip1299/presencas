import { redirect } from 'next/navigation';
import { getSupabaseServer } from './supabaseServer';

export async function requireSession() {
  const supabase = await getSupabaseServer();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) redirect('/login');
  return { supabase, session };
}
