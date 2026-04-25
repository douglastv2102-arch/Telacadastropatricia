import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  FolderTree,
  Users,
  Warehouse,
  Megaphone,
  BarChart3,
  Settings
} from 'lucide-react';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', key: 'dashboard' },
  { icon: ShoppingCart, label: 'Pedidos', key: 'orders' },
  { icon: Package, label: 'Produtos', key: 'products' },
  { icon: FolderTree, label: 'Categorias', key: 'categories' },
  { icon: Users, label: 'Clientes', key: 'customers' },
  { icon: Warehouse, label: 'Estoque', key: 'inventory' },
  { icon: Megaphone, label: 'Marketing', key: 'marketing' },
  { icon: BarChart3, label: 'Relatórios', key: 'reports' },
  { icon: Settings, label: 'Configurações', key: 'settings' }
];

interface MobileMenuProps {
  activeItem?: string;
}

export function MobileMenu({ activeItem = 'products' }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden p-2 text-[var(--premium-coffee)] hover:bg-[var(--premium-surface-soft)] rounded-lg transition-colors"
      >
        <Menu className="w-6 h-6" />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsOpen(false)}
          />

          <div className="fixed top-0 left-0 h-full w-64 bg-[var(--sidebar)] z-50 lg:hidden shadow-2xl flex flex-col animate-slide-in">
            <div className="flex items-center justify-between p-6 border-b border-[var(--sidebar-border)]">
              <div className="flex flex-col gap-1">
                <h1 className="text-xl tracking-tight text-[var(--sidebar-foreground)]">BETEL</h1>
                <p className="text-xs text-[var(--color-muted-foreground)] tracking-wide">INTERIORES</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-[var(--sidebar-accent)] rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-[var(--premium-coffee)]" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto py-4">
              <ul className="space-y-0.5 px-3">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = item.key === activeItem;

                  return (
                    <li key={item.key}>
                      <button
                        onClick={() => setIsOpen(false)}
                        className={`
                          w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors
                          ${isActive
                            ? 'bg-[var(--premium-surface-raised)] text-[var(--color-foreground)] shadow-sm'
                            : 'text-[var(--color-muted-foreground)] hover:bg-[var(--sidebar-accent)] hover:text-[var(--sidebar-accent-foreground)]'
                          }
                        `}
                      >
                        <Icon className="w-4 h-4 flex-shrink-0" />
                        <span className="text-sm">{item.label}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </>
      )}
    </>
  );
}
