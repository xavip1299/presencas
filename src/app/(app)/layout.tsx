// src/app/(app)/layout.tsx
'use client';
import ClientProviders from '@/components/ClientProviders';
import Image from 'next/image';
import Link from 'next/link';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ClientProviders />
      <div className="min-h-screen bg-black text-white">
        <header className="border-b border-gray-800 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/logo-white.png" alt="Praxe" width={40} height={40} />
            <span className="font-bold text-xl">Dura Praxis</span>
          </div>
          <nav className="hidden sm:flex gap-4 text-sm">
            <Link href="/dashboard" className="hover:underline">Dashboard</Link>
            <Link href="/caloiros" className="hover:underline">Caloiros</Link>
            <Link href="/atividades" className="hover:underline">Atividades</Link>
            <Link href="/presencas" className="hover:underline">Presenças</Link>
          </nav>
        </header>
        <main className="px-4 py-6 max-w-5xl mx-auto">{children}</main>
      </div>
    </>
  );
}
