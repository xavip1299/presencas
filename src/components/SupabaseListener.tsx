'use client';

import { useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function SupabaseListener() {
  useEffect(() => {
    const { data: subscription } = supabase.auth.onAuthStateChange(async (event, session) => {
      await fetch('/auth/set', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event, session }),
      });
    });

    return () => {
      subscription.subscription.unsubscribe();
    };
  }, []);

  return null;
}
