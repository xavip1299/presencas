import { requireSession } from '@/lib/requireSession';
import RelatorioTabela from './relatorioTabela';

export default async function RelatoriosPage() {
  const { supabase } = await requireSession();
  const { data, error } = await supabase.rpc('contar_presencas');
  if (error) throw error;

  return (
    <main className="p-6">
      <h1 className="text-2xl mb-4">Relatório de Presenças</h1>
      <RelatorioTabela rows={data || []} />
    </main>
  );
}
