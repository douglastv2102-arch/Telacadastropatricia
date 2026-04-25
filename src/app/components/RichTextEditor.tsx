import { useState } from 'react';
import { Bold, Italic, Underline, List, ListOrdered, Link as LinkIcon, Image as ImageIcon } from 'lucide-react';

interface RichTextEditorProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  maxCharacters?: number;
  placeholder?: string;
}

export function RichTextEditor({
  label,
  value,
  onChange,
  maxCharacters,
  placeholder = 'Digite aqui...'
}: RichTextEditorProps) {
  const [charCount, setCharCount] = useState(value.length);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setCharCount(newValue.length);
    onChange(newValue);
  };

  const toolbarButtons = [
    { icon: Bold, label: 'Negrito' },
    { icon: Italic, label: 'Itálico' },
    { icon: Underline, label: 'Sublinhado' },
    { icon: List, label: 'Lista' },
    { icon: ListOrdered, label: 'Lista numerada' },
    { icon: LinkIcon, label: 'Link' },
    { icon: ImageIcon, label: 'Imagem' }
  ];

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm text-[var(--premium-coffee)] mb-2">{label}</label>
      )}

      <div className="border border-[var(--color-input)] rounded-lg overflow-hidden bg-[var(--color-input-background)] shadow-[inset_0_1px_2px_rgba(74,52,43,0.06)] focus-within:ring-2 focus-within:ring-[var(--primary)]/20 focus-within:border-[var(--primary)]">
        <div className="flex items-center gap-1 px-3 py-2 border-b border-[var(--color-border)] bg-[var(--premium-surface-soft)]">
          {toolbarButtons.map((btn, idx) => {
            const Icon = btn.icon;
            return (
              <button
                key={idx}
                type="button"
                title={btn.label}
                className="p-1.5 rounded hover:bg-[var(--premium-surface-raised)] hover:text-[var(--color-foreground)] text-[var(--color-muted-foreground)] transition-colors"
              >
                <Icon className="w-4 h-4" />
              </button>
            );
          })}
        </div>

        <textarea
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full px-3 py-3 text-sm text-[var(--color-foreground)] bg-transparent placeholder:text-[#9b8b7c] focus:outline-none resize-none min-h-[120px]"
        />
      </div>

      {maxCharacters && (
        <div className="flex justify-end mt-1.5">
          <p className="text-xs text-[var(--color-muted-foreground)]">
            {charCount}/{maxCharacters}
          </p>
        </div>
      )}
    </div>
  );
}
