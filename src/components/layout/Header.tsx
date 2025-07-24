'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/cn';

const links = [
  { href: '/dashboard', label: 'DASHBOARD' },
  { href: '/atividades', label: 'EVENTOS' },
  { href: '/presencas', label: 'PRESENÇAS' },
  { href: '/perfil', label: 'PERFIL' },
];

export default function Header() {
  const pathname = usePathname();
  return (
    <header className="w-full border-b border-white/10 bg-black/70 backdrop-blur-sm fixed top-0 left-0 z-40">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-gothic text-3xl text-offwhite">
          Praxistica
        </Link>

        <nav className="hidden md:flex gap-8 text-gold tracking-widest text-sm">
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                'hover:underline underline-offset-4',
                pathname.startsWith(l.href) && 'underline'
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
