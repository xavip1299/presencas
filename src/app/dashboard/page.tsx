import Link from 'next/link';
import { requireSession } from '@/lib/requireSession';
import LogoutButton from './LogoutButton';

export default async function DashboardPage() {
  const { supabase, session } = await requireSession();

  // buscar o meu registo para saber o role
  const { data: me } = await supabase
    .from('usuarios')
    .select('role')
    .eq('auth_id', session.user.id)
    .single();

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

      {me?.role === 'admin' && (
        <>
          <h2 className="text-xl mt-8 mb-2">Admin</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><Link href="/admin/usuarios">Gestão de utilizadores</Link></li>
            <li><Link href="/admin/logs">Logs</Link></li>
          </ul>
        </>
      )}
    </main>
  );
}
