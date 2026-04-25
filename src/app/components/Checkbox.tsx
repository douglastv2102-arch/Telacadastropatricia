import { InputHTMLAttributes, forwardRef } from 'react';
import { Check } from 'lucide-react';

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  description?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, description, className = '', ...props }, ref) => {
    return (
      <label className="flex items-start gap-3 cursor-pointer group">
        <div className="relative flex-shrink-0 mt-0.5">
          <input
            ref={ref}
            type="checkbox"
            className="sr-only peer"
            {...props}
          />
          <div className="
            w-5 h-5 rounded border-2 border-[var(--color-input)] bg-[var(--color-input-background)]
            peer-checked:bg-[var(--primary)] peer-checked:border-[var(--primary)]
            peer-focus:ring-2 peer-focus:ring-[var(--primary)]/20
            group-hover:border-[var(--primary)]
            transition-all duration-200
            flex items-center justify-center
          ">
            <Check className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
          </div>
        </div>
        {(label || description) && (
          <div className="flex-1">
            {label && (
              <span className="block text-sm text-[var(--color-foreground)]">{label}</span>
            )}
            {description && (
              <span className="block text-xs text-[var(--color-muted-foreground)] mt-0.5">{description}</span>
            )}
          </div>
        )}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';
