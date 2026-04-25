import { useState, useRef } from 'react';
import { Upload, X, Plus } from 'lucide-react';

interface ImageUploadProps {
  label?: string;
  initialImages?: { src: string; alt: string }[];
  onImagesChange?: (files: File[]) => void;
}

export function ImageUpload({ label, initialImages = [], onImagesChange }: ImageUploadProps) {
  const [images, setImages] = useState<{ file?: File; preview: string; alt: string }[]>(
    initialImages.map((image) => ({
      preview: image.src,
      alt: image.alt
    }))
  );
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;

    const newImages = Array.from(files)
      .filter(file => file.type.startsWith('image/'))
      .map(file => ({
        file,
        preview: URL.createObjectURL(file),
        alt: file.name
      }));

    const updatedImages = [...images, ...newImages];
    setImages(updatedImages);
    onImagesChange?.(updatedImages.flatMap(img => img.file ? [img.file] : []));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
    onImagesChange?.(updatedImages.flatMap(img => img.file ? [img.file] : []));
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm text-[var(--premium-coffee)] mb-2">{label}</label>
      )}

      {images.length === 0 ? (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={handleClick}
          className={`
            border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
            transition-colors
            ${isDragging
              ? 'border-[var(--primary)] bg-[var(--premium-surface-raised)]'
              : 'border-[var(--color-input)] bg-[var(--premium-surface-soft)] hover:border-[var(--primary)] hover:bg-[var(--premium-surface-raised)]'
            }
          `}
        >
          <Upload className="w-10 h-10 text-[var(--premium-coffee)] mx-auto mb-3" />
          <p className="text-sm text-[var(--color-foreground)] mb-1">
            Arraste e solte ou clique para selecionar
          </p>
          <p className="text-xs text-[var(--color-muted-foreground)]">
            PNG, JPG ou WEBP até 5MB
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/jpg,image/webp"
            multiple
            onChange={(e) => handleFiles(e.target.files)}
            className="hidden"
          />
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-4 gap-3 mb-3">
            {images.map((image, index) => (
              <div key={index} className="relative aspect-square rounded-lg overflow-hidden bg-[var(--premium-surface-deep)] border border-[var(--color-border)] group shadow-[0_8px_18px_rgba(74,52,43,0.10)]">
                <img
                  src={image.preview}
                  alt={image.alt || `Imagem ${index + 1} do produto`}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => handleRemove(index)}
                  className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-3 h-3" />
                </button>
                {index === 0 && (
                  <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs py-1 px-2">
                    Principal
                  </div>
                )}
              </div>
            ))}
          </div>

          <button
            onClick={handleClick}
            className="w-full flex items-center justify-center gap-2 py-2.5 border border-[var(--color-border)] rounded-lg text-sm text-[var(--premium-coffee)] bg-[var(--premium-surface-soft)] hover:bg-[var(--premium-surface-deep)] hover:border-[var(--premium-gold-soft)] transition-colors"
          >
            <Plus className="w-4 h-4" />
            Adicionar imagem
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/jpg,image/webp"
            multiple
            onChange={(e) => handleFiles(e.target.files)}
            className="hidden"
          />
        </div>
      )}

      <p className="mt-2 text-xs text-[var(--color-muted-foreground)]">
        Essa será a imagem exibida na listagem e vitrine.
      </p>
    </div>
  );
}
