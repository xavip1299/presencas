/* eslint-disable @typescript-eslint/no-explicit-any */
import { requireSession } from '@/lib/requireSession';
import MarcarPresencasForm from './marcarForm';
import type { Atividade, Caloiro } from '@/types/db';

export default async function Page(...args: any[]) {
  const { params } = args[0] as { params: { id: string } };
  const atividadeId = params.id;

  const { supabase } = await requireSession();

  const [{ data: atividade, error: e1 }, { data: caloiros, error: e2 }] = await Promise.all([
    supabase.from('atividades').select('*').eq('id', atividadeId).single(),
    supabase.from('caloiros').select('id, nome, numero_caloiro').order('nome'),
  ]);

  if (e1) throw e1;
  if (e2) throw e2;

  return (
    <main className="p-6">
      <h1 className="text-2xl mb-4">Marcar presenças: {(atividade as Atividade)?.titulo}</h1>
      <MarcarPresencasForm
        atividadeId={atividadeId}
        caloiros={(caloiros as Caloiro[]) || []}
      />
    </main>
  );
}
