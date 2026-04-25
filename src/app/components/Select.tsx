import { SelectHTMLAttributes, forwardRef } from 'react';
import { CheckCircle2, ChevronDown } from 'lucide-react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, className = '', ...props }, ref) => {
    const hasValue = props.value !== undefined && String(props.value).trim() !== '';
    const isRequiredComplete = Boolean(props.required && hasValue && !error);
    const isRequiredPending = Boolean(props.required && !hasValue && !error);

    return (
      <div className="w-full">
        {label && (
          <label className="flex items-center gap-2 text-sm text-[var(--premium-coffee)] mb-2">
            <span>{label}</span>
            {props.required && (
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
                isRequiredComplete
                  ? 'bg-[var(--premium-olive)]/15 text-[var(--premium-olive)]'
                  : 'bg-[var(--destructive)]/10 text-[var(--destructive)]'
              }`}>
                Obrigatório
              </span>
            )}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            className={`
              w-full px-3 py-2.5 bg-[var(--color-input-background)] border rounded-lg text-sm text-[var(--color-foreground)]
              appearance-none cursor-pointer
              transition-all duration-200
              shadow-[inset_0_1px_2px_rgba(74,52,43,0.06)]
              focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] focus:bg-[var(--premium-surface-raised)]
              hover:border-[var(--premium-gold-soft)]
              disabled:bg-[var(--premium-surface-soft)] disabled:text-[var(--color-muted-foreground)] disabled:cursor-not-allowed
              ${error ? 'border-red-300 focus:ring-red-100 focus:border-red-400' : isRequiredComplete ? 'border-[var(--premium-olive)]' : isRequiredPending ? 'border-[var(--destructive)]/60' : 'border-[var(--color-input)]'}
              ${className}
            `}
            {...props}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {isRequiredComplete ? (
            <CheckCircle2 className="absolute right-8 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--premium-olive)] pointer-events-none" />
          ) : null}
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-muted-foreground)] pointer-events-none" />
        </div>
        {error && (
          <p className="mt-1.5 text-xs text-red-500">{error}</p>
        )}
        {isRequiredComplete && (
          <p className="mt-1.5 text-xs text-[var(--premium-olive)]">Campo preenchido corretamente.</p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
