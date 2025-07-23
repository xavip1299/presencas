import { getSupabaseServer } from '@/lib/supabaseServer';

export default async function Debug() {
  const supabase = await getSupabaseServer();
  const { data } = await supabase.auth.getSession();
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}