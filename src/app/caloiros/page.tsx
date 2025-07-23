import { requireSession } from '@/lib/requireSession';
import NovoCaloiroForm from './novoCaloiroForm';

export default async function CaloirosPage() {
  const { supabase } = await requireSession();

  const { data: caloiros, error } = await supabase
    .from('caloiros')
    .select('*')
    .order('nome');

  if (error) throw error;

  return (
    <main className="p-6">
      <h1 className="text-2xl mb-4">Caloiros</h1>
      <NovoCaloiroForm />

      <table className="mt-6 w-full border text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2 text-left">Nº</th>
            <th className="border p-2 text-left">Nome</th>
            <th className="border p-2 text-left">Curso</th>
            <th className="border p-2 text-left">Data Nascimento</th>
          </tr>
        </thead>
        <tbody>
          {caloiros?.map((c: any) => (
            <tr key={c.id}>
              <td className="border p-2">{c.numero_caloiro}</td>
              <td className="border p-2">{c.nome}</td>
              <td className="border p-2">{c.curso}</td>
              <td className="border p-2">{c.data_nascimento}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
