import Link from 'next/link';
import { requireSession } from '@/lib/requireSession';

export default async function PresencasPage() {
  const { supabase } = await requireSession();

  const { data: atividades, error } = await supabase
    .from('atividades')
    .select('*')
    .order('data', { ascending: false });

  if (error) throw error;

  return (
    <main className="p-6">
      <h1 className="text-2xl mb-4">Presenças</h1>
      <p className="mb-4">Escolhe a atividade para marcar presenças.</p>

      <ul className="space-y-2">
        {atividades?.map((a: any) => (
          <li key={a.id}>
            <Link className="underline" href={`/presencas/${a.id}`}>
              {a.data} — {a.titulo}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
