'use client';

import { useState } from 'react';
import type { Usuario } from '@/types/db';
import { supabase } from '@/lib/supabaseClient';


type Props = { usuarios: Usuario[] };

export default function UsuariosTable({ usuarios }: Props) {
  const [rows, setRows] = useState<Usuario[]>(usuarios);
  const [msg, setMsg] = useState('');

  async function mudarRole(id: string, role: 'admin' | 'doutor') {
    setMsg('');
    const { error } = await supabase.from('usuarios').update({ role }).eq('id', id);
    if (error) {
      setMsg(error.message);
    } else {
      setRows(r => r.map(u => (u.id === id ? { ...u, role } : u)));
      setMsg('Role atualizado.');
    }
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
                    className="border px-2 py-1"
                    onClick={() => mudarRole(u.id, 'admin')}
                  >
                    Tornar admin
                  </button>
                )}
                {u.role !== 'doutor' && (
                  <button
                    className="border px-2 py-1"
                    onClick={() => mudarRole(u.id, 'doutor')}
                  >
                    Tornar doutor
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {msg && <p className="text-sm mt-2">{msg}</p>}
    </div>
  );
}
