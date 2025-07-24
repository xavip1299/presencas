'use client';

import { cn } from '@/lib/cn';

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export function Input({ label, error, className, ...props }: Props) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-xs text-gray-300">{label}</label>}
      <input
        {...props}
        className={cn(
          'border border-gray-700 bg-black rounded-md px-3 py-2 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gold',
          error && 'border-red-600 focus:ring-red-600',
          className
        )}
      />
      {error && <span className="text-red-500 text-xs">{error}</span>}
    </div>
  );
}
