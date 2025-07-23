'use client';

import { useState } from 'react';
import type { Usuario } from '@/types/db';
import { supabase } from '@/lib/supabaseClient';
import { toast } from 'sonner';
import Spinner from '@/components/ui/Spinner';

type Props = { usuarios: Usuario[] };

export default function UsuariosTable({ usuarios }: Props) {
  const [rows, setRows] = useState<Usuario[]>(usuarios);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  async function mudarRole(id: string, role: 'admin' | 'doutor') {
    setLoadingId(id);
    const { error } = await supabase.from('usuarios').update({ role }).eq('id', id);
    if (error) toast.error(error.message);
    else {
      setRows(r => r.map(u => (u.id === id ? { ...u, role } : u)));
      toast.success('Role atualizado');
    }
    setLoadingId(null);
  }

  return (
    <div>
      <table className="border w-full text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2 text-left">Email</th>
            <th className="border p-2 text-left">Nome</th>
            <th className="border p-2 text-left">Role</th>
            <th className="border p-2 text-left">Criado em</th>
            <th className="border p-2 text-left">Ações</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(u => (
            <tr key={u.id}>
              <td className="border p-2">{u.email}</td>
              <td className="border p-2">{u.nome || '—'}</td>
              <td className="border p-2">{u.role}</td>
              <td className="border p-2">{new Date(u.created_at).toLocaleString()}</td>
              <td className="border p-2 space-x-2">
                {u.role !== 'admin' && (
                  <button
                    className="border px-2 py-1 inline-flex items-center gap-1"
                    onClick={() => mudarRole(u.id, 'admin')}
                    disabled={loadingId === u.id}
                  >
                    {loadingId === u.id && <Spinner size={12} />}
                    Tornar admin
                  </button>
                )}
                {u.role !== 'doutor' && (
                  <button
                    className="border px-2 py-1 inline-flex items-center gap-1"
                    onClick={() => mudarRole(u.id, 'doutor')}
                    disabled={loadingId === u.id}
                  >
                    {loadingId === u.id && <Spinner size={12} />}
                    Tornar doutor
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
