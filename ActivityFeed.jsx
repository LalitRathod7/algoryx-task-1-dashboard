import { PackageCheck, RefreshCcw, UserPlus, AlertCircle } from "lucide-react";

const activity = [
  {
    id: 1,
    icon: PackageCheck,
    text: "Order ORD-7838 was marked as delivered",
    time: "18 min ago",
    tone: "text-brand-600 bg-brand-50",
  },
  {
    id: 2,
    icon: UserPlus,
    text: "New customer Fatima Sheikh signed up",
    time: "1 hr ago",
    tone: "text-sky-600 bg-sky-50",
  },
  {
    id: 3,
    icon: RefreshCcw,
    text: "Refund issued for order ORD-7802",
    time: "3 hr ago",
    tone: "text-amber-600 bg-amber-100",
  },
  {
    id: 4,
    icon: AlertCircle,
    text: "Low stock warning: USB-C Hub (6 left)",
    time: "5 hr ago",
    tone: "text-red-600 bg-red-50",
  },
];

export default function ActivityFeed() {
  return (
    <div className="rounded-xl border border-surface-border bg-white p-5 shadow-panel">
      <h2 className="font-display text-base font-bold text-ink-900">Recent activity</h2>
      <ul className="mt-4 space-y-4">
        {activity.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.id} className="flex gap-3">
              <span className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${item.tone}`}>
                <Icon size={15} />
              </span>
              <div>
                <p className="text-sm text-ink-600">{item.text}</p>
                <p className="text-xs text-ink-400">{item.time}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
