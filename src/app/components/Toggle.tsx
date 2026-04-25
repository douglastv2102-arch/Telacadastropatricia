import { InputHTMLAttributes, forwardRef } from 'react';

interface ToggleProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  description?: string;
}

export const Toggle = forwardRef<HTMLInputElement, ToggleProps>(
  ({ label, description, className = '', ...props }, ref) => {
    return (
      <label className="flex items-start justify-between cursor-pointer group">
        <div className="flex-1 mr-4">
          {label && (
            <span className="block text-sm text-[var(--color-foreground)]">{label}</span>
          )}
          {description && (
            <span className="block text-xs text-[var(--color-muted-foreground)] mt-0.5">{description}</span>
          )}
        </div>

        <div className="relative flex-shrink-0">
          <input
            ref={ref}
            type="checkbox"
            className="sr-only peer"
            {...props}
          />
          <div className="
            w-11 h-6 rounded-full
            bg-[var(--premium-surface-deep)]
            peer-checked:bg-[var(--primary)]
            peer-focus:ring-2 peer-focus:ring-[var(--primary)]/20
            group-hover:bg-[var(--color-input)]
            peer-checked:group-hover:bg-[var(--premium-terracotta-hover)]
            transition-all duration-200
            relative
          ">
            <div className="
              absolute top-0.5 left-0.5
              w-5 h-5 rounded-full bg-[var(--premium-surface-raised)] shadow-sm
              peer-checked:translate-x-5
              transition-transform duration-200
            " />
          </div>
        </div>
      </label>
    );
  }
);

Toggle.displayName = 'Toggle';
