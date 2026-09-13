import { useState, useRef, useEffect } from "react";
import {
  Activity, LayoutDashboard, BarChart3, ShoppingCart, Package, Users, Settings,
  LifeBuoy, Menu, X, Search, Bell, ChevronDown, User, LogOut,
  ArrowUpRight, ArrowDownRight, MoreHorizontal, Mail, ShieldCheck,
  PackageCheck, UserPlus, RefreshCcw, AlertCircle,
} from "lucide-react";

/* ---------- mock data ---------- */
const currentUser = { name: "Meera Kulkarni", role: "Product Operations Lead", email: "meera.kulkarni@pulse.io", initials: "MK" };

const statMetrics = [
  { id: "revenue", label: "Revenue this month", value: "₹8,42,300", delta: "+12.4%", trend: "up" },
  { id: "orders", label: "Orders placed", value: "1,284", delta: "+4.1%", trend: "up" },
  { id: "customers", label: "Active customers", value: "9,732", delta: "+2.8%", trend: "up" },
  { id: "refunds", label: "Refund rate", value: "1.9%", delta: "-0.3%", trend: "down" },
];

const recentOrders = [
  { id: "ORD-7841", customer: "Ananya Rao", product: "Wireless Keyboard", date: "12 Sep 2026", amount: "₹2,499", status: "Delivered" },
  { id: "ORD-7840", customer: "Rohit Sharma", product: "Noise Cancelling Headphones", date: "12 Sep 2026", amount: "₹6,999", status: "Processing" },
  { id: "ORD-7839", customer: "Fatima Sheikh", product: "USB-C Hub", date: "11 Sep 2026", amount: "₹1,299", status: "Shipped" },
  { id: "ORD-7838", customer: "Vikram Patel", product: '27" Monitor', date: "11 Sep 2026", amount: "₹18,450", status: "Delivered" },
  { id: "ORD-7837", customer: "Priya Nair", product: "Mechanical Mouse", date: "10 Sep 2026", amount: "₹1,899", status: "Cancelled" },
];

const notificationsData = [
  { id: 1, title: "New order received", detail: "Ananya Rao placed order ORD-7841", time: "5 min ago", unread: true },
  { id: 2, title: "Server backup completed", detail: "Nightly backup finished with no errors", time: "1 hr ago", unread: true },
  { id: 3, title: "Refund approved", detail: "Refund for ORD-7802 was processed", time: "3 hr ago", unread: false },
];

const navSections = [
  { label: "Overview", items: [{ id: "dashboard", label: "Dashboard", icon: LayoutDashboard }, { id: "analytics", label: "Analytics", icon: BarChart3 }] },
  { label: "Store", items: [{ id: "orders", label: "Orders", icon: ShoppingCart }, { id: "products", label: "Products", icon: Package }, { id: "customers", label: "Customers", icon: Users }] },
  { label: "Account", items: [{ id: "settings", label: "Settings", icon: Settings }, { id: "help", label: "Help centre", icon: LifeBuoy }] },
];

const STATUS_STYLES = {
  Delivered: "bg-emerald-50 text-emerald-700",
  Shipped: "bg-sky-50 text-sky-700",
  Processing: "bg-orange-100 text-orange-600",
  Cancelled: "bg-red-50 text-red-600",
};

/* ---------- helper hook ---------- */
function useClickOutside(ref, onOutside) {
  useEffect(() => {
    function handler(e) {
      if (ref.current && !ref.current.contains(e.target)) onOutside();
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [ref, onOutside]);
}

/* ---------- small components ---------- */
function StatusBadge({ status }) {
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${STATUS_STYLES[status] || "bg-slate-100 text-slate-600"}`}>{status}</span>;
}

function StatCard({ label, value, delta, trend }) {
  const isUp = trend === "up";
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm text-slate-400">{label}</p>
      <div className="mt-2 flex items-end justify-between">
        <p className="text-2xl font-bold text-slate-900">{value}</p>
        <span className={`flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-semibold ${isUp ? "bg-emerald-50 text-emerald-700" : "bg-orange-100 text-orange-600"}`}>
          {isUp ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}{delta}
        </span>
      </div>
    </div>
  );
}

function Sidebar({ activeItem, onSelectItem, isOpen, onClose }) {
  return (
    <>
      {isOpen && <div className="fixed inset-0 z-30 bg-slate-900/40 lg:hidden" onClick={onClose} />}
      <aside className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform duration-200 ease-out lg:static lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex h-16 items-center justify-between px-5">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-700 text-white"><Activity size={18} strokeWidth={2.5} /></span>
            <span className="text-lg font-bold text-slate-900">Pulse</span>
          </div>
          <button className="rounded-md p-1 text-slate-400 hover:bg-slate-100 lg:hidden" onClick={onClose}><X size={20} /></button>
        </div>
        <nav className="flex-1 overflow-y-auto px-3 py-2">
          {navSections.map((section) => (
            <div key={section.label} className="mb-5">
              <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">{section.label}</p>
              <ul className="space-y-0.5">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = item.id === activeItem;
                  return (
                    <li key={item.id}>
                      <button onClick={() => onSelectItem(item.id)} className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${isActive ? "bg-emerald-50 text-emerald-700" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"}`}>
                        <Icon size={18} strokeWidth={2} />{item.label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
        <div className="border-t border-slate-200 p-4">
          <div className="rounded-lg bg-slate-50 p-3">
            <p className="text-xs font-semibold text-slate-900">Storage used</p>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-200"><div className="h-full w-2/3 rounded-full bg-emerald-700" /></div>
            <p className="mt-1.5 text-xs text-slate-400">6.7 GB of 10 GB</p>
          </div>
        </div>
      </aside>
    </>
  );
}

function NotificationsPanel({ isOpen, onToggle, onClose }) {
  const ref = useRef(null);
  useClickOutside(ref, onClose);
  const unread = notificationsData.filter((n) => n.unread).length;
  return (
    <div className="relative" ref={ref}>
      <button onClick={onToggle} className="relative rounded-full p-2 text-slate-600 hover:bg-slate-100">
        <Bell size={20} />
        {unread > 0 && <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-orange-500" />}
      </button>
      {isOpen && (
        <div className="absolute right-0 z-50 mt-2 w-80 rounded-xl border border-slate-200 bg-white shadow-lg">
          <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
            <p className="text-sm font-semibold text-slate-900">Notifications</p>
            <span className="text-xs text-slate-400">{unread} unread</span>
          </div>
          <ul className="max-h-72 overflow-y-auto">
            {notificationsData.map((n) => (
              <li key={n.id} className="flex gap-3 border-b border-slate-100 px-4 py-3 last:border-b-0 hover:bg-slate-50">
                <span className={`mt-1.5 h-2 w-2 flex-shrink-0 rounded-full ${n.unread ? "bg-orange-500" : "bg-transparent"}`} />
                <div>
                  <p className="text-sm font-medium text-slate-900">{n.title}</p>
                  <p className="text-xs text-slate-400">{n.detail}</p>
                  <p className="mt-0.5 text-xs text-slate-300">{n.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function Topbar({ onMenuClick, searchValue, onSearchChange }) {
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);
  useClickOutside(profileRef, () => setProfileOpen(false));
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-slate-200 bg-white/90 px-4 backdrop-blur sm:px-6">
      <button onClick={onMenuClick} className="rounded-md p-2 text-slate-600 hover:bg-slate-100 lg:hidden"><Menu size={20} /></button>
      <label className="relative hidden max-w-sm flex-1 sm:block">
        <Search size={17} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input value={searchValue} onChange={(e) => onSearchChange(e.target.value)} placeholder="Search orders, customers, products…" className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm focus:border-emerald-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-600" />
      </label>
      <div className="ml-auto flex items-center gap-2 sm:gap-3">
        <NotificationsPanel isOpen={notifOpen} onToggle={() => setNotifOpen((o) => !o)} onClose={() => setNotifOpen(false)} />
        <div className="h-6 w-px bg-slate-200" />
        <div className="relative" ref={profileRef}>
          <button onClick={() => setProfileOpen((o) => !o)} className="flex items-center gap-2 rounded-lg p-1.5 hover:bg-slate-100">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-700 text-xs font-semibold text-white">{currentUser.initials}</span>
            <span className="hidden text-left sm:block">
              <span className="block text-sm font-medium leading-tight text-slate-900">{currentUser.name}</span>
              <span className="block text-xs leading-tight text-slate-400">{currentUser.role}</span>
            </span>
            <ChevronDown size={16} className="hidden text-slate-400 sm:block" />
          </button>
          {profileOpen && (
            <div className="absolute right-0 z-50 mt-2 w-48 rounded-xl border border-slate-200 bg-white py-1.5 shadow-lg">
              <button className="flex w-full items-center gap-2.5 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50"><User size={16} /> View profile</button>
              <button className="flex w-full items-center gap-2.5 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50"><Settings size={16} /> Account settings</button>
              <div className="my-1 h-px bg-slate-100" />
              <button className="flex w-full items-center gap-2.5 px-4 py-2 text-sm text-orange-600 hover:bg-slate-50"><LogOut size={16} /> Sign out</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

function OrdersTable({ searchValue }) {
  const q = searchValue.trim().toLowerCase();
  const filtered = q ? recentOrders.filter((o) => [o.id, o.customer, o.product].some((f) => f.toLowerCase().includes(q))) : recentOrders;
  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
        <div>
          <h2 className="text-base font-bold text-slate-900">Recent orders</h2>
          <p className="text-sm text-slate-400">Latest activity across your store</p>
        </div>
        <button className="text-sm font-medium text-emerald-700 hover:text-emerald-800">View all</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-400">
              <th className="px-5 py-3 font-medium">Order</th>
              <th className="px-5 py-3 font-medium">Customer</th>
              <th className="hidden px-5 py-3 font-medium md:table-cell">Product</th>
              <th className="hidden px-5 py-3 font-medium sm:table-cell">Date</th>
              <th className="px-5 py-3 font-medium">Amount</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody>
            {filtered.map((o) => (
              <tr key={o.id} className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50">
                <td className="px-5 py-3 font-medium text-slate-900">{o.id}</td>
                <td className="px-5 py-3 text-slate-600">{o.customer}</td>
                <td className="hidden px-5 py-3 text-slate-600 md:table-cell">{o.product}</td>
                <td className="hidden px-5 py-3 text-slate-400 sm:table-cell">{o.date}</td>
                <td className="px-5 py-3 font-medium text-slate-900">{o.amount}</td>
                <td className="px-5 py-3"><StatusBadge status={o.status} /></td>
                <td className="px-5 py-3 text-right"><button className="rounded-md p-1 text-slate-400 hover:bg-slate-100"><MoreHorizontal size={16} /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <p className="px-5 py-8 text-center text-sm text-slate-400">No orders match "{searchValue}".</p>}
      </div>
    </div>
  );
}

function ProfileCard() {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="h-14 bg-emerald-700" />
      <div className="px-5 pb-5">
        <span className="-mt-8 flex h-16 w-16 items-center justify-center rounded-full border-4 border-white bg-emerald-700 text-lg font-semibold text-white">{currentUser.initials}</span>
        <h3 className="mt-3 text-base font-bold text-slate-900">{currentUser.name}</h3>
        <p className="text-sm text-slate-400">{currentUser.role}</p>
        <div className="mt-4 space-y-2 border-t border-slate-100 pt-4 text-sm">
          <p className="flex items-center gap-2 text-slate-600"><Mail size={15} className="text-slate-400" />{currentUser.email}</p>
          <p className="flex items-center gap-2 text-slate-600"><ShieldCheck size={15} className="text-emerald-600" />Two-factor authentication on</p>
        </div>
        <button className="mt-4 w-full rounded-lg border border-slate-200 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50">Edit profile</button>
      </div>
    </div>
  );
}

function ActivityFeed() {
  const activity = [
    { id: 1, icon: PackageCheck, text: "Order ORD-7838 was marked as delivered", time: "18 min ago", tone: "text-emerald-600 bg-emerald-50" },
    { id: 2, icon: UserPlus, text: "New customer Fatima Sheikh signed up", time: "1 hr ago", tone: "text-sky-600 bg-sky-50" },
    { id: 3, icon: RefreshCcw, text: "Refund issued for order ORD-7802", time: "3 hr ago", tone: "text-orange-600 bg-orange-100" },
    { id: 4, icon: AlertCircle, text: "Low stock warning: USB-C Hub (6 left)", time: "5 hr ago", tone: "text-red-600 bg-red-50" },
  ];
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-base font-bold text-slate-900">Recent activity</h2>
      <ul className="mt-4 space-y-4">
        {activity.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.id} className="flex gap-3">
              <span className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${item.tone}`}><Icon size={15} /></span>
              <div><p className="text-sm text-slate-600">{item.text}</p><p className="text-xs text-slate-400">{item.time}</p></div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default function AdminDashboardPreview() {
  const [activeItem, setActiveItem] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      <Sidebar activeItem={activeItem} onSelectItem={(id) => { setActiveItem(id); setSidebarOpen(false); }} isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar onMenuClick={() => setSidebarOpen(true)} searchValue={searchValue} onSearchChange={setSearchValue} />
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Good to see you, Meera</h1>
              <p className="text-sm text-slate-400">Here's what's happening with your store today.</p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {statMetrics.map((m) => <StatCard key={m.id} {...m} />)}
            </div>
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
              <div className="xl:col-span-2"><OrdersTable searchValue={searchValue} /></div>
              <div className="space-y-6"><ProfileCard /><ActivityFeed /></div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
