'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from '@/lib/supabaseClient';
import { useState } from 'react';

const schema = z.object({
  numero_caloiro: z.string().min(1, 'Obrigatório'),
  nome: z.string().min(1, 'Obrigatório'),
  curso: z.string().min(1, 'Obrigatório'),
  data_nascimento: z.string().min(1, 'Obrigatório'), // YYYY-MM-DD
});

type FormData = z.infer<typeof schema>;

export default function NovoCaloiroForm() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } =
    useForm<FormData>({ resolver: zodResolver(schema) });

  const [msg, setMsg] = useState('');

  async function onSubmit(data: FormData) {
    setMsg('');
    const { error } = await supabase.from('caloiros').insert(data);
    if (error) {
      setMsg(error.message);
    } else {
      setMsg('Caloiro criado!');
      reset();
      window.location.reload();
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="border p-4 mb-6 flex flex-col gap-2 w-full max-w-md">
      <h2 className="text-lg font-semibold">Novo Caloiro</h2>

      <input className="border p-2" placeholder="Nº Caloiro" {...register('numero_caloiro')} />
      {errors.numero_caloiro && <span className="text-red-600 text-sm">{errors.numero_caloiro.message}</span>}

      <input className="border p-2" placeholder="Nome" {...register('nome')} />
      {errors.nome && <span className="text-red-600 text-sm">{errors.nome.message}</span>}

      <input className="border p-2" placeholder="Curso" {...register('curso')} />
      {errors.curso && <span className="text-red-600 text-sm">{errors.curso.message}</span>}

      <input className="border p-2" type="date" {...register('data_nascimento')} />
      {errors.data_nascimento && <span className="text-red-600 text-sm">{errors.data_nascimento.message}</span>}

      <button disabled={isSubmitting} className="border px-3 py-1 mt-2 self-start">
        {isSubmitting ? 'A guardar...' : 'Guardar'}
      </button>

      {msg && <p className="text-sm mt-2">{msg}</p>}
    </form>
  );
}
