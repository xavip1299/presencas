import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Dura Praxis',
  description: 'Gestão de presenças',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <body>{children}</body>
    </html>
  );
}
