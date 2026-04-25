interface ProgressIndicatorProps {
  current: number;
  total: number;
}

export function ProgressIndicator({ current, total }: ProgressIndicatorProps) {
  const percentage = Math.round((current / total) * 100);

  return (
    <div className="bg-[var(--premium-surface)] rounded-lg border border-[var(--color-border)] p-4 shadow-[var(--premium-shadow-soft)]">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-[var(--color-muted-foreground)]">Progresso do cadastro</span>
        <span className="text-xs text-[var(--color-foreground)]">{current}/{total} campos</span>
      </div>

      <div className="w-full h-2 bg-[var(--premium-surface-deep)] rounded-full overflow-hidden">
        <div
          className="h-full bg-[var(--primary)] transition-all duration-300 rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <p className="text-xs text-[var(--color-muted-foreground)] mt-2">
        {percentage < 100
          ? `${100 - percentage}% restante para salvar`
          : 'Pronto para salvar: todos os campos obrigatórios foram preenchidos.'
        }
      </p>
    </div>
  );
}
