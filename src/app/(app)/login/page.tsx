'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [msg, setMsg] = useState('');

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setMsg('');

    const { data, error } = await supabase.auth.signInWithPassword({
  email,
  password: pass,
});
alert(JSON.stringify({ data, error }, null, 2)); // <-- mantém
console.log({ data, error });


    if (error) {
      setMsg(error.message);
    } else {
      window.location.replace('/dashboard');
    }
  }

  return (
    <div className="p-6 max-w-sm mx-auto">
      <h1 className="text-xl mb-4">Login</h1>
      <form onSubmit={handleLogin} className="flex flex-col gap-3">
        <input className="border p-2" type="email" placeholder="email"
               value={email} onChange={e => setEmail(e.target.value)} />
        <input className="border p-2" type="password" placeholder="password"
               value={pass} onChange={e => setPass(e.target.value)} />
        <button className="border p-2">Entrar</button>
      </form>
      {msg && <p className="mt-2 text-red-600 text-sm">{msg}</p>}
    </div>
  );
}
