'use client';

export default function Spinner({ size = 20 }: { size?: number }) {
  return (
    <div
      className="animate-spin rounded-full border-2 border-gray-300 border-t-gray-600"
      style={{ width: size, height: size }}
    />
  );
}
