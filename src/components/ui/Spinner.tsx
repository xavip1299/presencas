'use client';
export default function Spinner({ size = 18 }: { size?: number }) {
  return (
    <div
      className="animate-spin rounded-full border-2 border-gray-400 border-t-transparent"
      style={{ width: size, height: size }}
    />
  );
}
