'use client';

import ClientProviders from '@/components/ClientProviders';
import Image from 'next/image';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import { useState } from 'react';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

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
            <Link href="/relatorios" className="hover:underline">Relatórios</Link>
          </nav>
          <button className="sm:hidden" onClick={() => setOpen(o => !o)}>
            <Menu size={24} />
          </button>
        </header>

        {open && (
          <nav className="sm:hidden border-b border-gray-800 px-4 py-2 flex flex-col gap-2 text-sm bg-black">
            <Link onClick={() => setOpen(false)} href="/dashboard">Dashboard</Link>
            <Link onClick={() => setOpen(false)} href="/caloiros">Caloiros</Link>
            <Link onClick={() => setOpen(false)} href="/atividades">Atividades</Link>
            <Link onClick={() => setOpen(false)} href="/presencas">Presenças</Link>
            <Link onClick={() => setOpen(false)} href="/relatorios">Relatórios</Link>
          </nav>
        )}

        <main className="px-4 py-6 max-w-5xl mx-auto">{children}</main>
      </div>
    </>
  );
}
