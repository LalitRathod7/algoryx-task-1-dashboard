import { Search } from "lucide-react";

export default function SearchBar({ value, onChange, className = "" }) {
  return (
    <label className={`relative block ${className}`}>
      <span className="sr-only">Search</span>
      <Search
        size={17}
        strokeWidth={2}
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-400"
      />
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search orders, customers, products…"
        className="w-full rounded-lg border border-surface-border bg-surface-muted py-2 pl-9 pr-3
          text-sm text-ink-900 placeholder:text-ink-400
          focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-500"
      />
    </label>
  );
}
