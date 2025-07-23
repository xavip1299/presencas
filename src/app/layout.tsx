import type { Metadata } from 'next';
import SupabaseListener from '@/components/SupabaseListener';

export const metadata: Metadata = {
  title: 'Praxe',
  description: 'Gestão de presenças',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <body>
        <SupabaseListener />
        {children}
      </body>
    </html>
  );
}
