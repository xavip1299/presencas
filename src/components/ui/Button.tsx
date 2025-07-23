'use client';

import Spinner from './Spinner';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  variant?: 'default' | 'ghost';
};

export function Button({ loading, children, variant = 'default', className = '', ...props }: Props) {
  const base =
    variant === 'ghost'
      ? 'border border-gray-600 hover:bg-gray-800'
      : 'bg-gray-800 hover:bg-gray-700';
  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className={`inline-flex items-center gap-2 px-3 py-2 rounded transition disabled:opacity-50 ${base} ${className}`}
    >
      {loading && <Spinner size={14} />}
      {children}
    </button>
  );
}
