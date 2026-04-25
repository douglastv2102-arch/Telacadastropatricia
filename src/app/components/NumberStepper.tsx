import { Minus, Plus } from 'lucide-react';

interface NumberStepperProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  helperText?: string;
  min?: number;
  max?: number;
  step?: number;
}

export function NumberStepper({
  label,
  value,
  onChange,
  helperText,
  min = 0,
  max,
  step = 1
}: NumberStepperProps) {
  const numericValue = Number.parseInt(value || '0', 10);
  const currentValue = Number.isNaN(numericValue) ? min : numericValue;

  const normalize = (nextValue: number) => {
    const limitedByMin = Math.max(min, nextValue);
    const limitedByMax = typeof max === 'number' ? Math.min(max, limitedByMin) : limitedByMin;
    onChange(String(limitedByMax));
  };

  const handleManualChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextValue = event.target.value.replace(/\D/g, '');
    onChange(nextValue);
  };

  return (
    <div className="w-full">
      <label className="block text-sm text-[var(--premium-coffee)] mb-2">
        {label}
      </label>

      <div className="flex items-stretch rounded-lg border border-[var(--color-input)] bg-[var(--color-input-background)] shadow-[inset_0_1px_2px_rgba(74,52,43,0.06)] focus-within:ring-2 focus-within:ring-[var(--primary)]/20 focus-within:border-[var(--primary)]">
        <button
          type="button"
          aria-label={`Diminuir ${label.toLowerCase()}`}
          onClick={() => normalize(currentValue - step)}
          disabled={currentValue <= min}
          className="flex w-11 items-center justify-center rounded-l-lg border-r border-[var(--color-border)] text-[var(--premium-coffee)] hover:bg-[var(--premium-surface-soft)] disabled:cursor-not-allowed disabled:opacity-45"
        >
          <Minus className="h-4 w-4" />
        </button>

        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          value={value}
          onChange={handleManualChange}
          className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-center text-sm text-[var(--color-foreground)] focus:outline-none"
          aria-label={label}
        />

        <button
          type="button"
          aria-label={`Aumentar ${label.toLowerCase()}`}
          onClick={() => normalize(currentValue + step)}
          disabled={typeof max === 'number' && currentValue >= max}
          className="flex w-11 items-center justify-center rounded-r-lg border-l border-[var(--color-border)] text-[var(--premium-coffee)] hover:bg-[var(--premium-surface-soft)] disabled:cursor-not-allowed disabled:opacity-45"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      {helperText && (
        <p className="mt-1.5 text-xs text-[var(--color-muted-foreground)]">{helperText}</p>
      )}
    </div>
  );
}
