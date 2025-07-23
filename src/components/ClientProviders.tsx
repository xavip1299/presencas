'use client';

import { Toaster } from 'sonner';
import SupabaseListener from './SupabaseListener';

export default function ClientProviders() {
  return (
    <>
      <SupabaseListener />
      <Toaster richColors position="top-center" />
    </>
  );
}
