'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { toast } from 'sonner';
import Spinner from '@/components/ui/Spinner';
import { Button } from '@/components/ui/Button';

type Caloiro = { id: string; nome: string; numero_caloiro: string };
type Props = { atividadeId: string; caloiros: Caloiro[] };

export default function MarcarPresencasForm({ atividadeId, caloiros }: Props) {
  const [selecionados, setSelecionados] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const ids = Object.keys(selecionados).filter(id => selecionados[id]);
    if (!ids.length) {
      toast.warning('Nada selecionado');
      setLoading(false);
      return;
    }

    const rows = ids.map(caloioId => ({
      atividade_id: atividadeId,
      caloiro_id: caloioId,
    }));

    const { error } = await supabase.from('presencas').insert(rows);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Presenças marcadas!');
      setTimeout(() => (window.location.href = '/presencas'), 800);
    }
    setLoading(false);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="max-h-96 overflow-auto border p-2">
        {caloiros.map((c) => (
          <label key={c.id} className="flex items-center gap-2 border-b py-1">
            <input
              type="checkbox"
              checked={!!selecionados[c.id]}
              onChange={(e) =>
                setSelecionados(prev => ({ ...prev, [c.id]: e.target.checked }))
              }
            />
            <span>{c.numero_caloiro} — {c.nome}</span>
          </label>
        ))}
      </div>

      <Button disabled={loading} className="mt-2 self-start">
        {loading && <Spinner size={16} />}
        {loading ? 'A guardar...' : 'Guardar presenças'}
      </Button>
    </form>
  );
}
