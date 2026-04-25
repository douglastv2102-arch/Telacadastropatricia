import { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Input } from './components/Input';
import { Textarea } from './components/Textarea';
import { Checkbox } from './components/Checkbox';
import { Toggle } from './components/Toggle';
import { Select } from './components/Select';
import { RichTextEditor } from './components/RichTextEditor';
import { ImageUpload } from './components/ImageUpload';
import { ProgressIndicator } from './components/ProgressIndicator';
import { ValidationMessage } from './components/ValidationMessage';
import { Tooltip } from './components/Tooltip';
import { NumberStepper } from './components/NumberStepper';
import {
  Package,
  DollarSign,
  FileText,
  Image,
  ShieldCheck,
  Box,
  FolderTree,
  Info,
  Sparkles
} from 'lucide-react';

const mockedProductImages = [
  { src: '/images/poltrona01.webp', alt: 'Poltrona Queen Elisabeth em destaque' },
  { src: '/images/poltrona02.webp', alt: 'Vista lateral da Poltrona Queen Elisabeth' },
  { src: '/images/poltrona03.webp', alt: 'Detalhe do acabamento da Poltrona Queen Elisabeth' },
  { src: '/images/poltrona04.webp', alt: 'Poltrona Queen Elisabeth em ambiente decorado' },
  { src: '/images/poltrona05.webp', alt: 'Detalhe do tecido da Poltrona Queen Elisabeth' },
  { src: '/images/poltrona06.webp', alt: 'Vista posterior da Poltrona Queen Elisabeth' }
];

export default function App() {
  const [formData, setFormData] = useState({
    productName: 'Poltrona Queen Elisabeth',
    slug: 'poltrona-queen-elisabeth',
    sku: 'POL-QUEEN-ELI-001',
    barcode: '7897133224235',
    fiscalClass: '94016100',
    salePrice: 'R$ 2.489,90',
    promotionalPrice: 'R$ 2.199,90',
    shortDescription: 'Poltrona Queen Elisabeth com design clássico, encosto confortável e acabamento premium para salas de estar.',
    fullDescription: 'Poltrona Queen Elisabeth com estrutura reforçada em madeira, espuma de alta densidade e revestimento em tecido premium. Indicada para salas de estar, quartos e espaços de leitura que precisam unir conforto, presença visual e durabilidade.',
    isActive: true,
    controlStock: true,
    stockQuantity: '12',
    minAlert: '3',
    weight: '28',
    height: '98',
    width: '86',
    depth: '92',
    brand: 'mobili',
    warranty: '12',
    categories: {
      sofas: false,
      poltronas: true,
      puffs: false,
      mesasCentro: false,
      cadeiras: false,
      cozinha: false,
      quarto: false,
      decoracao: false
    }
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  useEffect(() => {
    if (formData.productName && !touched.slug) {
      const slug = formData.productName
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

      setFormData(prev => ({ ...prev, slug }));
    }
  }, [formData.productName, touched.slug]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setTouched(prev => ({ ...prev, [field]: true }));
    setHasUnsavedChanges(true);
    setShowSuccessMessage(false);

    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleCategoryChange = (category: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      categories: { ...prev.categories, [category]: checked }
    }));
    setTouched(prev => ({ ...prev, categories: true }));
    setHasUnsavedChanges(true);
    setShowSuccessMessage(false);

    if (errors.categories) {
      setErrors(prev => ({ ...prev, categories: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    const hasSelectedCategory = Object.values(formData.categories).some(Boolean);

    if (!formData.productName.trim()) {
      newErrors.productName = 'Nome do produto é obrigatório';
    }

    if (!formData.slug.trim()) {
      newErrors.slug = 'Slug é obrigatório';
    }

    if (!formData.sku.trim()) {
      newErrors.sku = 'SKU é obrigatório';
    }

    if (!formData.salePrice.trim()) {
      newErrors.salePrice = 'Preço de venda é obrigatório';
    }

    if (!formData.shortDescription.trim()) {
      newErrors.shortDescription = 'Resumo curto é obrigatório';
    }

    if (!hasSelectedCategory) {
      newErrors.categories = 'Selecione pelo menos uma categoria para organizar o produto na loja.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const hasSelectedCategory = Object.values(formData.categories).some(Boolean);

  const isSaveDisabled =
    !formData.productName.trim() ||
    !formData.slug.trim() ||
    !formData.sku.trim() ||
    !formData.salePrice.trim() ||
    !formData.shortDescription.trim() ||
    !hasSelectedCategory;

  const handleSave = () => {
    if (validateForm()) {
      console.log('Produto salvo:', formData);
      setHasUnsavedChanges(false);
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 5000);
    }
  };

  const requiredChecklist = [
    { key: 'productName', label: 'Nome do produto', done: Boolean(formData.productName.trim()) },
    { key: 'slug', label: 'URL amigável', done: Boolean(formData.slug.trim()) },
    { key: 'sku', label: 'SKU interno', done: Boolean(formData.sku.trim()) },
    { key: 'salePrice', label: 'Preço de venda', done: Boolean(formData.salePrice.trim()) },
    { key: 'shortDescription', label: 'Resumo curto', done: Boolean(formData.shortDescription.trim()) },
    { key: 'categories', label: 'Categoria selecionada', done: hasSelectedCategory }
  ];

  const filledRequiredFields = requiredChecklist.filter(item => item.done).length;
  const missingRequiredItems = requiredChecklist.filter(item => !item.done);
  const saveDisabledReason = missingRequiredItems.length
    ? `Falta preencher: ${missingRequiredItems.map(item => item.label).join(', ')}.`
    : '';

  const stockQuantityNumber = Number.parseInt(formData.stockQuantity || '0', 10);
  const minAlertNumber = Number.parseInt(formData.minAlert || '0', 10);
  const currentStock = Number.isNaN(stockQuantityNumber) ? 0 : stockQuantityNumber;
  const minimumStock = Number.isNaN(minAlertNumber) ? 0 : minAlertNumber;
  const hasLowStockAlert = formData.controlStock && minimumStock > 0 && currentStock <= minimumStock;
  const hasHealthyStock = formData.controlStock && minimumStock > 0 && currentStock > minimumStock;

  const handleCancel = () => {
    if (confirm('Deseja realmente cancelar? As alterações não salvas serão perdidas.')) {
      window.location.reload();
    }
  };

  const cardClass =
    'bg-[var(--premium-surface)] rounded-2xl border border-[var(--color-border)] p-6 shadow-[var(--premium-shadow-soft)] [box-shadow:var(--premium-shadow-soft),var(--premium-inset)]';

  const iconClass = 'w-5 h-5 text-[var(--primary)]';

  const titleClass =
    'text-base text-[var(--color-foreground)] font-semibold tracking-tight';

  const mutedTextClass = 'text-[var(--color-muted-foreground)]';

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <div className="hidden lg:block">
        <Sidebar activeItem="products" />
      </div>

      <div className="lg:ml-56">
        <Header
          onCancel={handleCancel}
          onSave={handleSave}
          isSaveDisabled={isSaveDisabled}
          saveDisabledReason={saveDisabledReason}
        />

        <main className="p-4 md:p-8">
          {showSuccessMessage && (
            <div className="max-w-7xl mx-auto mb-4 md:mb-6">
              <ValidationMessage
                type="success"
                message="Produto salvo com sucesso! O produto já está disponível no sistema."
              />
            </div>
          )}

          <div className="max-w-7xl mx-auto mb-4 md:mb-6">
            <ValidationMessage
              type={hasUnsavedChanges ? 'warning' : 'success'}
              message={
                hasUnsavedChanges
                  ? 'Existem alterações ainda não salvas. Revise os itens obrigatórios e clique em Salvar produto.'
                  : 'Cadastro pré-preenchido com dados mockados da Poltrona Queen Elisabeth. Todos os campos obrigatórios estão prontos para revisão.'
              }
            />
          </div>

          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
            <div className="lg:col-span-2 space-y-4 md:space-y-6">
              <section className={cardClass}>
                <div className="flex items-center gap-2 mb-4">
                  <Package className={iconClass} />
                  <h2 className={titleClass}>INFORMAÇÕES DO PRODUTO</h2>
                </div>

                <div className="space-y-4">
                  <Input
                    label="Nome do produto"
                    placeholder="Ex: Poltrona Queen Elisabeth"
                    required
                    value={formData.productName}
                    onChange={(e) => handleInputChange('productName', e.target.value)}
                    error={errors.productName}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Input
                        label="Slug (URL amigável)"
                        placeholder="poltrona-queen-elisabeth"
                        required
                        value={formData.slug}
                        onChange={(e) => handleInputChange('slug', e.target.value)}
                        error={errors.slug}
                      />

                      {formData.slug && !touched.slug && (
                        <div className={`flex items-center gap-1 mt-1.5 text-xs ${mutedTextClass}`}>
                          <Sparkles className="w-3 h-3 text-[var(--primary)]" />
                          <span>Gerado automaticamente</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <label className="text-sm text-[var(--premium-coffee)]">
                          SKU (Código interno)
                        </label>
                        <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
                          formData.sku.trim()
                            ? 'bg-[var(--premium-olive)]/15 text-[var(--premium-olive)]'
                            : 'bg-[var(--destructive)]/10 text-[var(--destructive)]'
                        }`}>
                          Obrigatório
                        </span>
                        <Tooltip content="Código único de identificação do produto no estoque" />
                      </div>

                      <Input
                        placeholder="POLTR-001"
                        required
                        value={formData.sku}
                        onChange={(e) => handleInputChange('sku', e.target.value)}
                        error={errors.sku}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <label className="text-sm text-[var(--premium-coffee)]">
                          Código de barras (EAN)
                        </label>
                        <Tooltip content="Código internacional do produto (13 dígitos)" />
                      </div>

                      <Input
                        placeholder="7897133224235"
                        value={formData.barcode}
                        onChange={(e) => handleInputChange('barcode', e.target.value)}
                      />
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <label className="text-sm text-[var(--premium-coffee)]">
                          Classe fiscal (NCM)
                        </label>
                        <Tooltip content="Nomenclatura Comum do Mercosul para fins fiscais" />
                      </div>

                      <Input
                        placeholder="94016100"
                        value={formData.fiscalClass}
                        onChange={(e) => handleInputChange('fiscalClass', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </section>

              <section className={cardClass}>
                <div className="flex items-center gap-2 mb-4">
                  <DollarSign className={iconClass} />
                  <h2 className={titleClass}>PREÇOS</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Preço de venda"
                    placeholder="R$ 1.599,90"
                    required
                    value={formData.salePrice}
                    onChange={(e) => handleInputChange('salePrice', e.target.value)}
                    error={errors.salePrice}
                  />

                  <Input
                    label="Preço promocional"
                    placeholder="R$ 1.439,90"
                    value={formData.promotionalPrice}
                    onChange={(e) => handleInputChange('promotionalPrice', e.target.value)}
                    helperText="Deixe em branco para não usar promoção"
                  />
                </div>
              </section>

              <section className={cardClass}>
                <div className="flex items-center gap-2 mb-4">
                  <FileText className={iconClass} />
                  <h2 className={titleClass}>DESCRIÇÃO</h2>
                </div>

                <div className="space-y-4">
                  <Textarea
                    label="Resumo curto"
                    placeholder="Poltrona giratória confortável com acabamento premium e design moderno."
                    required
                    rows={3}
                    maxCharacters={150}
                    value={formData.shortDescription}
                    onChange={(e) => handleInputChange('shortDescription', e.target.value)}
                    error={errors.shortDescription}
                  />

                  <RichTextEditor
                    label="Descrição completa"
                    value={formData.fullDescription}
                    onChange={(value) => handleInputChange('fullDescription', value)}
                    maxCharacters={2000}
                    placeholder="Poltrona Queen Elisabeth com estrutura reforçada, acabamento premium e design clássico."
                  />
                </div>
              </section>

              <section className={cardClass}>
                <div className="flex items-center gap-2 mb-4">
                  <Image className={iconClass} />
                  <h2 className={titleClass}>IMAGENS DO PRODUTO</h2>
                </div>

                <div className="mb-3">
                  <p className="text-sm text-[var(--color-foreground)] mb-1">
                    Imagem principal
                  </p>
                  <p className={`text-xs ${mutedTextClass}`}>
                    Essa será a imagem exibida na listagem e vitrine.
                  </p>
                </div>

                <ImageUpload initialImages={mockedProductImages} />

                <div className="mt-4 p-3 bg-[var(--premium-surface-soft)] rounded-xl border border-[var(--color-border)]">
                  <p className="text-xs text-[var(--color-foreground)]">
                    <strong>Imagens adicionais</strong>
                  </p>
                  <p className={`text-xs mt-1 ${mutedTextClass}`}>
                    Adicione até 6 imagens para mostrar mais detalhes do produto.
                  </p>
                </div>
              </section>
            </div>

            <div className="space-y-4 md:space-y-6 lg:sticky lg:top-24 lg:self-start">
              <ProgressIndicator current={filledRequiredFields} total={requiredChecklist.length} />

              <section className={cardClass}>
                <div className="flex items-center gap-2 mb-4">
                  <Image className={iconClass} />
                  <h2 className={titleClass}>PRÉ-VISUALIZAÇÃO</h2>
                </div>

                <div className="overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--premium-surface-soft)] shadow-[0_14px_30px_rgba(74,52,43,0.12)]">
                  <div className="flex h-64 items-center justify-center bg-[radial-gradient(circle_at_center,#fcf6ee_0%,#eadccd_72%)] p-2">
                    <img
                      src={mockedProductImages[0].src}
                      alt={mockedProductImages[0].alt}
                      className="max-h-full w-[116%] max-w-none object-contain drop-shadow-[0_18px_18px_rgba(74,52,43,0.18)]"
                    />
                  </div>
                  <div className="p-4 space-y-2">
                    <div>
                      <p className="text-sm font-semibold text-[var(--color-foreground)]">
                        {formData.productName || 'Nome do produto'}
                      </p>
                      <p className={`text-xs ${mutedTextClass}`}>
                        SKU: {formData.sku || 'não informado'}
                      </p>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[var(--primary)] font-semibold">
                        {formData.promotionalPrice || formData.salePrice || 'Preço não informado'}
                      </span>
                      <span className={mutedTextClass}>
                        {formData.stockQuantity || 0} em estoque
                      </span>
                    </div>
                  </div>
                </div>
              </section>

              <section className={cardClass}>
                <div className="flex items-center gap-2 mb-4">
                  <ShieldCheck className={iconClass} />
                  <h2 className={titleClass}>STATUS DO PRODUTO</h2>
                </div>

                <div className="space-y-4">
                  <Toggle
                    label="Produto ativo"
                    description="O produto ficará visível na loja."
                    checked={formData.isActive}
                    onChange={(e) => handleInputChange('isActive', e.target.checked)}
                  />

                  <Toggle
                    label="Controlar estoque"
                    description="Habilita para gerenciar o estoque deste produto."
                    checked={formData.controlStock}
                    onChange={(e) => handleInputChange('controlStock', e.target.checked)}
                  />
                </div>
              </section>

              <section className={cardClass}>
                <div className="flex items-center gap-2 mb-4">
                  <Box className={iconClass} />
                  <h2 className={titleClass}>ESTOQUE</h2>
                </div>

                <div className="space-y-4">
                  {hasLowStockAlert && (
                    <ValidationMessage
                      type="warning"
                      message={`Estoque baixo: há ${currentStock} unidade(s), e o alerta mínimo está configurado para ${minimumStock}. Considere repor antes de publicar promoções.`}
                    />
                  )}

                  {hasHealthyStock && (
                    <ValidationMessage
                      type="success"
                      message={`Estoque confortável: ${currentStock} unidade(s) disponíveis, acima do alerta mínimo de ${minimumStock}.`}
                    />
                  )}

                  <NumberStepper
                    label="Quantidade em estoque"
                    value={formData.stockQuantity}
                    onChange={(value) => handleInputChange('stockQuantity', value)}
                  />

                  <NumberStepper
                    label="Alerta mínimo"
                    value={formData.minAlert}
                    onChange={(value) => handleInputChange('minAlert', value)}
                    helperText="Receba um alerta quando o estoque atingir este nível."
                  />
                </div>
              </section>

              <section className={`${cardClass} ${hasSelectedCategory ? 'border-[var(--premium-olive)]' : 'border-[var(--destructive)]/60'}`}>
                <div className="flex items-center gap-2 mb-4">
                  <FolderTree className={iconClass} />
                  <h2 className={titleClass}>CATEGORIAS</h2>
                </div>

                <div className="mb-3 flex items-center justify-between gap-3">
                  <p className={`text-xs ${mutedTextClass}`}>
                    Selecione pelo menos uma categoria
                  </p>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
                    hasSelectedCategory
                      ? 'bg-[var(--premium-olive)]/15 text-[var(--premium-olive)]'
                      : 'bg-[var(--destructive)]/10 text-[var(--destructive)]'
                  }`}>
                    {hasSelectedCategory ? 'Completo' : 'Obrigatório'}
                  </span>
                </div>
                {errors.categories && (
                  <div className="mb-3">
                    <ValidationMessage type="error" message={errors.categories} />
                  </div>
                )}

                <div className="space-y-2 mb-3">
                  <Checkbox
                    label="Sofás"
                    checked={formData.categories.sofas}
                    onChange={(e) => handleCategoryChange('sofas', e.target.checked)}
                  />
                  <Checkbox
                    label="Poltronas"
                    checked={formData.categories.poltronas}
                    onChange={(e) => handleCategoryChange('poltronas', e.target.checked)}
                  />
                  <Checkbox
                    label="Puffs"
                    checked={formData.categories.puffs}
                    onChange={(e) => handleCategoryChange('puffs', e.target.checked)}
                  />
                  <Checkbox
                    label="Mesas de Centro"
                    checked={formData.categories.mesasCentro}
                    onChange={(e) => handleCategoryChange('mesasCentro', e.target.checked)}
                  />
                  <Checkbox
                    label="Cadeiras"
                    checked={formData.categories.cadeiras}
                    onChange={(e) => handleCategoryChange('cadeiras', e.target.checked)}
                  />
                  <Checkbox
                    label="Cozinha"
                    checked={formData.categories.cozinha}
                    onChange={(e) => handleCategoryChange('cozinha', e.target.checked)}
                  />
                  <Checkbox
                    label="Quarto"
                    checked={formData.categories.quarto}
                    onChange={(e) => handleCategoryChange('quarto', e.target.checked)}
                  />
                  <Checkbox
                    label="Decoração"
                    checked={formData.categories.decoracao}
                    onChange={(e) => handleCategoryChange('decoracao', e.target.checked)}
                  />
                </div>

                <button className="text-xs text-[var(--primary)] hover:opacity-80 transition">
                  Gerenciar categorias →
                </button>
              </section>

              <section className={cardClass}>
                <div className="flex items-center gap-2 mb-4">
                  <Info className={iconClass} />
                  <h2 className={titleClass}>INFORMAÇÕES ADICIONAIS</h2>
                </div>

                <div className="space-y-4">
                  <Input
                    label="Peso (kg)"
                    type="number"
                    placeholder="15"
                    value={formData.weight}
                    onChange={(e) => handleInputChange('weight', e.target.value)}
                  />

                  <div>
                    <label className="block text-sm text-[var(--premium-coffee)] mb-2">
                      Dimensões (cm)
                    </label>

                    <div className="grid grid-cols-3 gap-2">
                      <Input
                        placeholder="Altura"
                        type="number"
                        value={formData.height}
                        onChange={(e) => handleInputChange('height', e.target.value)}
                      />
                      <Input
                        placeholder="Largura"
                        type="number"
                        value={formData.width}
                        onChange={(e) => handleInputChange('width', e.target.value)}
                      />
                      <Input
                        placeholder="Prof."
                        type="number"
                        value={formData.depth}
                        onChange={(e) => handleInputChange('depth', e.target.value)}
                      />
                    </div>
                  </div>

                  <Select
                    label="Marca"
                    value={formData.brand}
                    onChange={(e) => handleInputChange('brand', e.target.value)}
                    options={[
                      { value: 'mobili', label: 'BETEL INTERIORES' },
                      { value: 'outras', label: 'Outras marcas' }
                    ]}
                  />

                  <Select
                    label="Garantia"
                    value={formData.warranty}
                    onChange={(e) => handleInputChange('warranty', e.target.value)}
                    options={[
                      { value: '3', label: '3 meses' },
                      { value: '6', label: '6 meses' },
                      { value: '12', label: '12 meses' },
                      { value: '24', label: '24 meses' }
                    ]}
                  />
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
