import {
  LayoutDashboard,
  BarChart3,
  ShoppingCart,
  Package,
  Users,
  Settings,
  LifeBuoy,
  Activity,
  X,
} from "lucide-react";
import { navSections } from "../data/mockData";

// Maps the icon name stored in mockData.js to the actual Lucide component.
// Keeping this map here (instead of storing components in the data file)
// keeps mockData.js as plain, serialisable data.
const ICONS = {
  LayoutDashboard,
  BarChart3,
  ShoppingCart,
  Package,
  Users,
  Settings,
  LifeBuoy,
};

export default function Sidebar({ activeItem, onSelectItem, isOpen, onClose }) {
  return (
    <>
      {/* Dark overlay behind the drawer on mobile. Clicking it closes the sidebar. */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-ink-900/40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-surface-border
          bg-white transition-transform duration-200 ease-out
          lg:static lg:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex h-16 items-center justify-between px-5">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500 text-white">
              <Activity size={18} strokeWidth={2.5} />
            </span>
            <span className="font-display text-lg font-bold text-ink-900">Pulse</span>
          </div>
          <button
            className="rounded-md p-1 text-ink-400 hover:bg-surface-muted lg:hidden"
            onClick={onClose}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-2">
          {navSections.map((section) => (
            <div key={section.label} className="mb-5">
              <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wide text-ink-400">
                {section.label}
              </p>
              <ul className="space-y-0.5">
                {section.items.map((item) => {
                  const Icon = ICONS[item.icon];
                  const isActive = item.id === activeItem;
                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => onSelectItem(item.id)}
                        className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors
                          ${
                            isActive
                              ? "bg-brand-50 text-brand-700"
                              : "text-ink-600 hover:bg-surface-muted hover:text-ink-900"
                          }`}
                      >
                        <Icon size={18} strokeWidth={2} />
                        {item.label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        <div className="border-t border-surface-border p-4">
          <div className="rounded-lg bg-surface-muted p-3">
            <p className="text-xs font-semibold text-ink-900">Storage used</p>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-ink-100">
              <div className="h-full w-2/3 rounded-full bg-brand-500" />
            </div>
            <p className="mt-1.5 text-xs text-ink-400">6.7 GB of 10 GB</p>
          </div>
        </div>
      </aside>
    </>
  );
}
