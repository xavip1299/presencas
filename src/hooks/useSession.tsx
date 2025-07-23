'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export function useSession() {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<null | Awaited<ReturnType<typeof supabase.auth.getSession>>['data']['session']>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session ?? null);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session ?? null);
      setLoading(false);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return { session, loading };
}
