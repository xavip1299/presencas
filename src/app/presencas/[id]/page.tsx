// @ts-nocheck
import { requireSession } from '@/lib/requireSession';
import MarcarPresencasForm from './marcarForm';

export default async function Page({ params }) {
  const { supabase } = await requireSession();
  const atividadeId = params.id;

  const [{ data: atividade, error: e1 }, { data: caloiros, error: e2 }] = await Promise.all([
    supabase.from('atividades').select('*').eq('id', atividadeId).single(),
    supabase.from('caloiros').select('id, nome, numero_caloiro').order('nome'),
  ]);

  if (e1) throw e1;
  if (e2) throw e2;

  return (
    <main className="p-6">
      <h1 className="text-2xl mb-4">Marcar presenças: {atividade?.titulo}</h1>
      <MarcarPresencasForm atividadeId={atividadeId} caloiros={caloiros || []} />
    </main>
  );
}
