import Link from 'next/link';

export default function Home() {
  return (
    <main className="p-6">
      <h1>Praxe</h1>
      <Link href="/login">Login</Link>
    </main>
  );
}
