import type { Metadata } from 'next';
import SupabaseListener from '@/components/SupabaseListener';
import { Toaster } from 'sonner';
import './globals.css'; // se tiveres CSS global

export const metadata: Metadata = {
  title: 'Praxe',
  description: 'Gestão de presenças',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <body>
        <SupabaseListener />
        <Toaster richColors position="top-center" />
        {children}
      </body>
    </html>
  );
}
