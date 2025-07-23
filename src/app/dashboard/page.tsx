import Link from 'next/link';
import { requireSession } from '@/lib/requireSession';
import LogoutButton from './LogoutButton';

export default async function DashboardPage() {
  await requireSession();

  return (
    <main className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl">Dashboard</h1>
        <LogoutButton />
      </div>

      <ul className="list-disc pl-6 space-y-2">
        <li><Link href="/caloiros">Caloiros</Link></li>
        <li><Link href="/atividades">Atividades</Link></li>
        <li><Link href="/presencas">Presenças</Link></li>
        <li><Link href="/relatorios">Relatórios</Link></li>
      </ul>
    </main>
  );
}
