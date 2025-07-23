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
        <li><a href="/caloiros">Caloiros</a></li>
        <li><a href="/atividades">Atividades</a></li>
        <li><a href="/presencas">Presenças</a></li>
        <li><a href="/relatorios">Relatórios</a></li>
      </ul>
    </main>
  );
}
