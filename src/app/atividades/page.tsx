import { requireSession } from '@/lib/requireSession';
import NovaAtividadeForm from './novaAtividadeForm';

export default async function AtividadesPage() {
  const { supabase } = await requireSession();

  const { data: atividades, error } = await supabase
    .from('atividades')
    .select('*')
    .order('data', { ascending: false });

  if (error) throw error;

  return (
    <main className="p-6">
      <h1 className="text-2xl mb-4">Atividades</h1>

      <NovaAtividadeForm />

      <table className="mt-6 w-full border text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2 text-left">Data</th>
            <th className="border p-2 text-left">Título</th>
            <th className="border p-2 text-left">Tipo</th>
            <th className="border p-2 text-left">Observações</th>
          </tr>
        </thead>
        <tbody>
          {atividades?.map((a: any) => (
            <tr key={a.id}>
              <td className="border p-2">{a.data}</td>
              <td className="border p-2">{a.titulo}</td>
              <td className="border p-2">{a.tipo || '—'}</td>
              <td className="border p-2">{a.observacoes || '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
