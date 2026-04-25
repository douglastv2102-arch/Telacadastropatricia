import { TextareaHTMLAttributes, forwardRef, useState, useEffect } from 'react';
import { CheckCircle2 } from 'lucide-react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  maxCharacters?: number;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, maxCharacters, className = '', onChange, ...props }, ref) => {
    const [charCount, setCharCount] = useState(0);
    const hasValue = props.value !== undefined && String(props.value).trim() !== '';
    const isRequiredComplete = Boolean(props.required && hasValue && !error);
    const isRequiredPending = Boolean(props.required && !hasValue && !error);

    useEffect(() => {
      if (props.value) {
        setCharCount(String(props.value).length);
      }
    }, [props.value]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCharCount(e.target.value.length);
      if (onChange) {
        onChange(e);
      }
    };

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
          <textarea
            ref={ref}
            onChange={handleChange}
            className={`
              w-full px-3 py-2.5 bg-[var(--color-input-background)] border rounded-lg text-sm text-[var(--color-foreground)]
              placeholder:text-[#9b8b7c]
              transition-all duration-200
              shadow-[inset_0_1px_2px_rgba(74,52,43,0.06)]
              focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] focus:bg-[var(--premium-surface-raised)]
              hover:border-[var(--premium-gold-soft)]
              disabled:bg-[var(--premium-surface-soft)] disabled:text-[var(--color-muted-foreground)] disabled:cursor-not-allowed
              ${error ? 'border-red-300 focus:ring-red-100 focus:border-red-400' : isRequiredComplete ? 'border-[var(--premium-olive)]' : isRequiredPending ? 'border-[var(--destructive)]/60' : 'border-[var(--color-input)]'}
              ${isRequiredComplete ? 'pr-10' : ''}
              ${className}
            `}
            {...props}
          />
          {isRequiredComplete && (
            <CheckCircle2 className="absolute right-3 top-3 h-4 w-4 text-[var(--premium-olive)]" />
          )}
        </div>
        <div className="flex justify-between items-center mt-1.5">
          <div>
            {error && <p className="text-xs text-red-500">{error}</p>}
            {isRequiredComplete && !helperText && <p className="text-xs text-[var(--premium-olive)]">Campo preenchido corretamente.</p>}
            {helperText && !error && <p className="text-xs text-[var(--color-muted-foreground)]">{helperText}</p>}
          </div>
          {maxCharacters && (
            <p className="text-xs text-[var(--color-muted-foreground)]">
              {charCount}/{maxCharacters}
            </p>
          )}
        </div>
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
