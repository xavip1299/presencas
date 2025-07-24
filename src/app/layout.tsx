import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Praxis',
  description: 'Gestão de Praxe',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt" className="dark">
      <body>{children}</body>
    </html>
  );
}
