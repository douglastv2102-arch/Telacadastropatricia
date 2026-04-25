import { ReactNode } from 'react';

interface FormCardProps {
  icon?: ReactNode;
  title: string;
  children: ReactNode;
  className?: string;
}

export function FormCard({ icon, title, children, className = '' }: FormCardProps) {
  return (
    <section className={`bg-[var(--premium-surface)] rounded-lg border border-[var(--color-border)] p-4 md:p-6 shadow-[var(--premium-shadow-soft)] ${className}`}>
      <div className="flex items-center gap-2 mb-4">
        {icon && <div className="text-[var(--primary)]">{icon}</div>}
        <h2 className="text-sm md:text-base text-[var(--color-foreground)] tracking-wide">{title}</h2>
      </div>
      {children}
    </section>
  );
}
