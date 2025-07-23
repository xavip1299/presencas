import Link from 'next/link';
import { requireSession } from '@/lib/requireSession';
import LogoutButton from './LogoutButton';

export default async function DashboardPage() {
  const { supabase, session } = await requireSession();
  const { data: me } = await supabase.from('usuarios').select('role').eq('auth_id', session.user.id).single();

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-heading">Dashboard</h1>
        <LogoutButton />
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm">
        <li><Link href="/caloiros" className="block bg-gray-900 border border-gray-700 p-4 rounded hover:bg-gray-800">Caloiros</Link></li>
        <li><Link href="/atividades" className="block bg-gray-900 border border-gray-700 p-4 rounded hover:bg-gray-800">Atividades</Link></li>
        <li><Link href="/presencas" className="block bg-gray-900 border border-gray-700 p-4 rounded hover:bg-gray-800">Presenças</Link></li>
        <li><Link href="/relatorios" className="block bg-gray-900 border border-gray-700 p-4 rounded hover:bg-gray-800">Relatórios</Link></li>
        {me?.role === 'admin' && (
          <>
            <li><Link href="/admin/usuarios" className="block bg-gray-900 border border-gray-700 p-4 rounded hover:bg-gray-800">Gestão de Utilizadores</Link></li>
            <li><Link href="/admin/logs" className="block bg-gray-900 border border-gray-700 p-4 rounded hover:bg-gray-800">Logs</Link></li>
          </>
        )}
      </ul>
    </>
  );
}
