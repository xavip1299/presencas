// src/app/not-found.tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="p-6">
      <h1 className="text-2xl">404 - Página não encontrada</h1>
      <p>Voltar à <Link href="/">página inicial</Link>.</p>
    </main>
  );
}
