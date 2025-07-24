'use client';
import { ReactNode } from 'react';

export function Sheet({ open, onOpenChange, children }: { open: boolean; onOpenChange: (o: boolean) => void; children: ReactNode }) {
  return <>{children}</>;
}
export function SheetTrigger({ asChild, children }: { asChild?: boolean; children: ReactNode }) {
  return <>{children}</>;
}
export function SheetContent({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={`fixed top-0 bottom-0 w-60 bg-black border-r border-gray-800 p-4 z-50 ${className||''}`}>
      {children}
    </div>
  );
}
