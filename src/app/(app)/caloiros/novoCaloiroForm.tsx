'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from '@/lib/supabaseClient';
import { toast } from 'sonner';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/input';

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

  async function onSubmit(data: FormData) {
    const { error } = await supabase.from('caloiros').insert(data);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Caloiro criado!');
      reset();
      window.location.reload();
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 max-w-md">
      <Input label="Nº Caloiro" error={errors.numero_caloiro?.message} {...register('numero_caloiro')} />
      <Input label="Nome" error={errors.nome?.message} {...register('nome')} />
      <Input label="Curso" error={errors.curso?.message} {...register('curso')} />
      <Input type="date" label="Data de Nascimento" error={errors.data_nascimento?.message} {...register('data_nascimento')} />

      <Button loading={isSubmitting} type="submit">Guardar</Button>
    </form>
  );
}
