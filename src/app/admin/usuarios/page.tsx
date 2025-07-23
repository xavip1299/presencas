'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useSession } from '@/hooks/useSession';

type UserRow = { id: string; email: string; role: string; nome: string };

export default function UsuariosPage() {
  const { session, loading } = useSession();
  const [rows, setRows] = useState<UserRow[]>([]);
  const [me, setMe] = useState<UserRow | null>(null);

  useEffect(() => {
    if (!loading && !session) window.location.replace('/login');
  }, [loading, session]);

  useEffect(() => {
    if (!session) return;
    // buscar o meu registo para saber se sou admin
    supabase.from('usuarios').select('*').eq('auth_id', session.user.id).single()
      .then(({ data }) => {
        setMe(data as UserRow);
        if (data?.role !== 'admin') window.location.replace('/dashboard');
      });

    supabase.from('usuarios').select('id,email,role,nome')
      .then(({ data, error }) => {
        if (error) alert(error.message);
        else setRows(data as UserRow[]);
      });
  }, [session, loading]);

  async function tornarAdmin(id: string) {
    const { error } = await supabase.from('usuarios').update({ role: 'admin' }).eq('id', id);
    if (error) return alert(error.message);
    setRows(r => r.map(u => u.id === id ? { ...u, role: 'admin' } : u));
  }

  if (loading || !session || !me) return <p className="p-6">A carregar...</p>;

  return (
    <main className="p-6">
      <h1 className="text-2xl mb-4">Utilizadores</h1>
      <table className="border w-full text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2 text-left">Email</th>
            <th className="border p-2 text-left">Nome</th>
            <th className="border p-2 text-left">Role</th>
            <th className="border p-2 text-left">Ações</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(u => (
            <tr key={u.id}>
              <td className="border p-2">{u.email}</td>
              <td className="border p-2">{u.nome || '—'}</td>
              <td className="border p-2">{u.role}</td>
              <td className="border p-2">
                {u.role === 'doutor' && (
                  <button className="border px-2 py-1" onClick={() => tornarAdmin(u.id)}>
                    Tornar admin
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
