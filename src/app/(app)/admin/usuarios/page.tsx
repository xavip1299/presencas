import { requireSession } from '@/lib/requireSession';
import type { Usuario } from '@/types/db';
import UsuariosTable from './usuariosTable';

export default async function UsuariosAdminPage() {
  const { supabase, session } = await requireSession();

  // Buscar o meu registo para confirmar admin
  const { data: me } = await supabase
    .from('usuarios')
    .select('*')
    .eq('auth_id', session.user.id)
    .single();

  if (!me || me.role !== 'admin') {
    // redireciona se não for admin
    // (podes criar uma página "403" se preferires)
    return (
      <main className="p-6">
        <h1 className="text-2xl mb-4">Sem permissão</h1>
        <p>Esta página é apenas para administradores.</p>
      </main>
    );
  }

  const { data: usuarios, error } = await supabase
    .from('usuarios')
    .select('id, auth_id, email, nome, role, created_at')
    .order('created_at', { ascending: false });

  if (error) throw error;

  return (
    <main className="p-6">
      <h1 className="text-2xl mb-4">Utilizadores</h1>
      <UsuariosTable usuarios={(usuarios ?? []) as Usuario[]} />
    </main>
  );
}
