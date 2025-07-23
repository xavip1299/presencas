'use client';

import ClientProviders from '@/components/ClientProviders';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/cn';
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/Sheet';

const links = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/caloiros', label: 'Caloiros' },
  { href: '/atividades', label: 'Atividades' },
  { href: '/presencas', label: 'Presenças' },
  { href: '/relatorios', label: 'Relatórios' },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <ClientProviders />
      <div className="min-h-screen bg-black text-white flex">
        {/* Desktop sidebar */}
        <aside className="hidden md:flex flex-col w-60 border-r border-gray-800 p-4 gap-6">
          <div className="flex items-center gap-3">
            <Image src="/logo-white.png" alt="Praxe" width={36} height={36} />
            <span className="font-heading text-xl">Dura Praxis</span>
          </div>
          <nav className="flex flex-col gap-1 text-sm">
            {links.map(l => (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  'px-3 py-2 rounded hover:bg-gray-800',
                  pathname.startsWith(l.href) && 'bg-gray-800'
                )}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Mobile topbar */}
        <div className="md:hidden fixed top-0 left-0 right-0 bg-black border-b border-gray-800 px-4 py-3 flex items-center justify-between z-40">
          <div className="flex items-center gap-3">
            <Image src="/logo-white.png" alt="Praxe" width={30} height={30} />
            <span className="font-heading text-lg">Dura Praxis</span>
          </div>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button aria-label="menu">
                <Menu size={24} />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-60">
              <div className="p-4 flex items-center gap-3 border-b border-gray-800">
                <Image src="/logo-white.png" alt="Praxe" width={30} height={30} />
                <span className="font-heading text-lg">Dura Praxis</span>
              </div>
              <nav className="flex flex-col gap-1 text-sm p-2">
                {links.map(l => (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'px-3 py-2 rounded hover:bg-gray-800',
                      pathname.startsWith(l.href) && 'bg-gray-800'
                    )}
                  >
                    {l.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        {/* Main */}
        <main className="flex-1 md:ml-0 md:pl-0 pt-[56px] md:pt-0 p-4 md:p-8 max-w-5xl">
          {children}
        </main>
      </div>
    </>
  );
}
