'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from '@/lib/supabaseClient';
import { toast } from 'sonner';
import { useState } from 'react';
import Spinner from '@/components/ui/Spinner';

const schema = z.object({
  titulo: z.string().min(1, 'Obrigatório'),
  data: z.string().min(1, 'Obrigatório'),
  tipo: z.string().optional(),
  observacoes: z.string().optional(),
});
type FormData = z.infer<typeof schema>;

export default function NovaAtividadeForm() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } =
    useForm<FormData>({ resolver: zodResolver(schema) });

  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(data: FormData) {
    setSubmitting(true);
    const { error } = await supabase.from('atividades').insert(data);
    if (error) toast.error(error.message);
    else {
      toast.success('Atividade criada!');
      reset();
      window.location.reload();
    }
    setSubmitting(false);
  }

  const disabled = isSubmitting || submitting;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="border p-4 mb-6 flex flex-col gap-2 w-full max-w-md">
      <h2 className="text-lg font-semibold">Nova Atividade</h2>

      <input className={`border p-2 ${errors.titulo && 'border-red-500'}`} placeholder="Título" {...register('titulo')} />
      {errors.titulo && <span className="text-red-600 text-sm">{errors.titulo.message}</span>}

      <input className={`border p-2 ${errors.data && 'border-red-500'}`} type="date" {...register('data')} />
      {errors.data && <span className="text-red-600 text-sm">{errors.data.message}</span>}

      <input className="border p-2" placeholder="Tipo (opcional)" {...register('tipo')} />

      <textarea className="border p-2" placeholder="Observações (opcional)" rows={3} {...register('observacoes')} />

      <button disabled={disabled} className="border px-3 py-1 mt-2 self-start flex items-center gap-2">
        {disabled && <Spinner size={16} />}
        {disabled ? 'A guardar...' : 'Guardar'}
      </button>
    </form>
  );
}
