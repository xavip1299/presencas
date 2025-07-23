'use client';

export default function LogoutButton() {
  return (
    <button
      className="border px-3 py-1"
      onClick={async () => {
        await fetch('/logout', { method: 'POST' });
        window.location.href = '/login';
      }}
    >
      Sair
    </button>
  );
}
