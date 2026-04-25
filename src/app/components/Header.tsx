import { ChevronRight, ExternalLink } from 'lucide-react';
import { MobileMenu } from './MobileMenu';

interface HeaderProps {
  onCancel?: () => void;
  onSave?: () => void;
  isSaveDisabled?: boolean;
  saveDisabledReason?: string;
}

export function Header({ onCancel, onSave, isSaveDisabled, saveDisabledReason }: HeaderProps) {
  return (
    <header className="border-b border-[var(--color-border)] bg-[var(--premium-surface-raised)]/95 sticky top-0 z-30 shadow-[0_8px_24px_rgba(74,52,43,0.08)] backdrop-blur">
      <div className="px-4 md:px-8 py-3 md:py-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3 flex-1">
            <MobileMenu activeItem="products" />

            <div>
              <div className="hidden md:flex items-center gap-2 text-xs text-[var(--color-muted-foreground)] mb-1">
                <span>PAINEL</span>
                <ChevronRight className="w-3 h-3" />
                <span>PRODUTOS</span>
              </div>
              <h1 className="text-lg md:text-xl text-[var(--color-foreground)] mb-0.5">Cadastro de produto</h1>
              <p className="text-xs text-[var(--color-muted-foreground)] hidden md:block">
                Revise os dados da Poltrona Queen Elisabeth antes de salvar na BETEL INTERIORES.
              </p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button className="flex items-center gap-2 text-sm text-[var(--premium-coffee)] hover:text-[var(--primary)] transition-colors">
              <span>VER LOJA</span>
              <ExternalLink className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 px-3 py-1.5 bg-[var(--premium-surface-soft)] rounded-lg border border-[var(--color-border)]">
              <div className="w-7 h-7 rounded-full bg-[var(--premium-surface-deep)] flex items-center justify-center text-xs text-[var(--premium-coffee)]">
                PO
              </div>
              <div className="text-left">
                <p className="text-xs text-[var(--color-foreground)]">Patricia Oliveira</p>
                <p className="text-xs text-[var(--color-muted-foreground)]">Administrador</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          {isSaveDisabled && saveDisabledReason && (
            <p className="hidden md:flex max-w-md items-center text-right text-xs text-[var(--destructive)]">
              {saveDisabledReason}
            </p>
          )}
          <button
            onClick={onCancel}
            className="px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm text-[var(--premium-coffee)] bg-[var(--premium-surface-soft)] border border-[var(--color-border)] rounded-lg hover:bg-[var(--premium-surface-deep)] hover:border-[var(--premium-gold-soft)] transition-all duration-200"
          >
            CANCELAR
          </button>
          <button
            onClick={onSave}
            disabled={isSaveDisabled}
            className={`
              px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm text-white rounded-lg transition-all duration-200 whitespace-nowrap
              ${isSaveDisabled
                ? 'bg-[var(--premium-surface-deep)] text-[var(--color-muted-foreground)] cursor-not-allowed opacity-70'
                : 'bg-[var(--primary)] hover:bg-[var(--premium-terracotta-hover)] hover:shadow-md'
              }
            `}
            title={isSaveDisabled ? saveDisabledReason || 'Preencha todos os campos obrigatórios antes de salvar' : 'Salvar alterações do produto'}
          >
            <span className="hidden md:inline">{isSaveDisabled ? 'PREENCHA OS CAMPOS OBRIGATÓRIOS' : 'SALVAR PRODUTO'}</span>
            <span className="md:hidden">SALVAR</span>
          </button>
        </div>
      </div>
    </header>
  );
}
