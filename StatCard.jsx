import { ArrowDownRight, ArrowUpRight } from "lucide-react";

export default function StatCard({ label, value, delta, trend }) {
  const isUp = trend === "up";

  return (
    <div className="rounded-xl border border-surface-border bg-white p-5 shadow-panel">
      <p className="text-sm text-ink-400">{label}</p>
      <div className="mt-2 flex items-end justify-between">
        <p className="font-display text-2xl font-bold text-ink-900">{value}</p>
        <span
          className={`flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-semibold
            ${isUp ? "bg-brand-50 text-brand-700" : "bg-amber-100 text-amber-600"}`}
        >
          {isUp ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
          {delta}
        </span>
      </div>
    </div>
  );
}
