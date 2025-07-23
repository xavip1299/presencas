import { requireSession } from '@/lib/requireSession';
import type { LogEntry, Usuario } from '@/types/db';

export default async function LogsPage() {
  const { supabase, session } = await requireSession();

  const { data: me } = await supabase
    .from('usuarios')
    .select('role')
    .eq('auth_id', session.user.id)
    .single();

  if (!me || me.role !== 'admin') {
    return (
      <main className="p-6">
        <h1 className="text-2xl mb-4">Sem permissão</h1>
        <p>Esta página é apenas para administradores.</p>
      </main>
    );
  }

  const { data, error } = await supabase
    .from('logs')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(200);

  if (error) throw error;

  const logs = (data ?? []) as LogEntry[];

  return (
    <main className="p-6">
      <h1 className="text-2xl mb-4">Logs (últimos 200)</h1>
      <div className="overflow-auto border max-h-[70vh]">
        <table className="w-full text-xs">
          <thead className="bg-gray-100 sticky top-0">
            <tr>
              <th className="border p-2 text-left">Data</th>
              <th className="border p-2 text-left">Tabela</th>
              <th className="border p-2 text-left">Ação</th>
              <th className="border p-2 text-left">Row ID</th>
              <th className="border p-2 text-left">User</th>
              <th className="border p-2 text-left">Extra</th>
            </tr>
          </thead>
          <tbody>
            {logs.map(l => (
              <tr key={l.id}>
                <td className="border p-2">{new Date(l.created_at).toLocaleString()}</td>
                <td className="border p-2">{l.tabela}</td>
                <td className="border p-2">{l.acao}</td>
                <td className="border p-2">{l.row_id ?? '—'}</td>
                <td className="border p-2">{l.user_id ?? '—'}</td>
                <td className="border p-2 max-w-xs overflow-x-auto">{JSON.stringify(l.extra)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
