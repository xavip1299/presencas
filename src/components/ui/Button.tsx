'use client';

import Spinner from './Spinner';
import { cn } from '@/lib/cn';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  variant?: 'primary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
};

export function Button({
  loading,
  children,
  variant = 'primary',
  size = 'md',
  className,
  ...props
}: Props) {
  const base =
    'inline-flex items-center gap-2 rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed';
  const variants = {
    primary: 'bg-gray-800 text-white hover:bg-gray-700',
    outline: 'border border-gray-700 text-white hover:bg-gray-800',
    ghost: 'hover:bg-gray-800 text-white',
    danger: 'bg-red-600 hover:bg-red-500 text-white',
  }[variant];
  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-5 py-3 text-base',
  }[size];

  return (
    <button {...props} className={cn(base, variants, sizes, className)}>
      {loading && <Spinner size={16} />}
      {children}
    </button>
  );
}
