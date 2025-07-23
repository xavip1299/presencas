'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from '@/lib/supabaseClient';
import { toast } from 'sonner';
import { useState } from 'react';
import Spinner from '@/components/ui/Spinner';
import { Button } from '@/components/ui/Button';

const schema = z.object({
  numero_caloiro: z.string().min(1, 'Obrigatório'),
  nome: z.string().min(1, 'Obrigatório'),
  curso: z.string().min(1, 'Obrigatório'),
  data_nascimento: z.string().min(1, 'Obrigatório'),
});
type FormData = z.infer<typeof schema>;

export default function NovoCaloiroForm() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } =
    useForm<FormData>({ resolver: zodResolver(schema) });

  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(data: FormData) {
    setSubmitting(true);
    const { error } = await supabase.from('caloiros').insert(data);
    if (error) toast.error(error.message);
    else {
      toast.success('Caloiro criado!');
      reset();
      window.location.reload();
    }
    setSubmitting(false);
  }
  

  const disabled = isSubmitting || submitting;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="border p-4 mb-6 flex flex-col gap-2 w-full max-w-md">
      <h2 className="text-lg font-semibold">Novo Caloiro</h2>

      <input className={`border p-2 ${errors.numero_caloiro && 'border-red-500'}`} placeholder="Nº Caloiro" {...register('numero_caloiro')} />
      {errors.numero_caloiro && <span className="text-red-600 text-sm">{errors.numero_caloiro.message}</span>}

      <input className={`border p-2 ${errors.nome && 'border-red-500'}`} placeholder="Nome" {...register('nome')} />
      {errors.nome && <span className="text-red-600 text-sm">{errors.nome.message}</span>}

      <input className={`border p-2 ${errors.curso && 'border-red-500'}`} placeholder="Curso" {...register('curso')} />
      {errors.curso && <span className="text-red-600 text-sm">{errors.curso.message}</span>}

      <input className={`border p-2 ${errors.data_nascimento && 'border-red-500'}`} type="date" {...register('data_nascimento')} />
      {errors.data_nascimento && <span className="text-red-600 text-sm">{errors.data_nascimento.message}</span>}

      <button disabled={disabled} className="mt-2 self-start">
        {disabled && <Spinner size={16} />}
        {disabled ? 'A guardar...' : 'Guardar'}
      </button>
    </form>
  );
}
