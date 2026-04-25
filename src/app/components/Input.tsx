import { InputHTMLAttributes, forwardRef } from 'react';
import { CheckCircle2 } from 'lucide-react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, icon, className = '', ...props }, ref) => {
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
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={`
              w-full px-3 py-2.5 bg-[var(--color-input-background)] border rounded-lg text-sm text-[var(--color-foreground)]
              placeholder:text-[#9b8b7c]
              transition-all duration-200
              shadow-[inset_0_1px_2px_rgba(74,52,43,0.06)]
              focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] focus:bg-[var(--premium-surface-raised)]
              hover:border-[var(--premium-gold-soft)]
              disabled:bg-[var(--premium-surface-soft)] disabled:text-[var(--color-muted-foreground)] disabled:cursor-not-allowed
              ${error ? 'border-red-300 focus:ring-red-100 focus:border-red-400' : isRequiredComplete ? 'border-[var(--premium-olive)]' : isRequiredPending ? 'border-[var(--destructive)]/60' : 'border-[var(--color-input)]'}
              ${icon ? 'pl-10' : ''}
              ${isRequiredComplete ? 'pr-10' : ''}
              ${className}
            `}
            {...props}
          />
          {isRequiredComplete && (
            <CheckCircle2 className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--premium-olive)]" />
          )}
        </div>
        {error && (
          <p className="mt-1.5 text-xs text-red-500">{error}</p>
        )}
        {isRequiredComplete && !helperText && (
          <p className="mt-1.5 text-xs text-[var(--premium-olive)]">Campo preenchido corretamente.</p>
        )}
        {helperText && !error && (
          <p className="mt-1.5 text-xs text-[var(--color-muted-foreground)]">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
