'use client';

import { Toaster } from 'sonner';
import SupabaseListener from '@/components/SupabaseListener';

export default function ClientProviders() {
  return (
    <>
      <SupabaseListener />
      <Toaster richColors position="top-center" />
    </>
  );
}
