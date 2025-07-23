'use client';

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <html>
      <body className="p-6">
        <h1 className="text-2xl mb-4">Ocorreu um erro</h1>
        <pre className="text-sm bg-gray-100 p-3 overflow-auto max-h-60">{error.message}</pre>
        <button className="border px-3 py-1 mt-4" onClick={reset}>Tentar de novo</button>
      </body>
    </html>
  );
}
