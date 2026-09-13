import { Mail, ShieldCheck } from "lucide-react";
import { currentUser } from "../data/mockData";

export default function ProfileCard() {
  return (
    <div className="overflow-hidden rounded-xl border border-surface-border bg-white shadow-panel">
      <div className="h-14 bg-brand-500" />
      <div className="px-5 pb-5">
        <span
          className={`-mt-8 flex h-16 w-16 items-center justify-center rounded-full border-4 border-white text-lg font-semibold text-white ${currentUser.avatarColor}`}
        >
          {currentUser.initials}
        </span>

        <h3 className="mt-3 font-display text-base font-bold text-ink-900">
          {currentUser.name}
        </h3>
        <p className="text-sm text-ink-400">{currentUser.role}</p>

        <div className="mt-4 space-y-2 border-t border-surface-border pt-4 text-sm">
          <p className="flex items-center gap-2 text-ink-600">
            <Mail size={15} className="text-ink-400" />
            {currentUser.email}
          </p>
          <p className="flex items-center gap-2 text-ink-600">
            <ShieldCheck size={15} className="text-brand-500" />
            Two-factor authentication on
          </p>
        </div>

        <button className="mt-4 w-full rounded-lg border border-surface-border py-2 text-sm font-medium text-ink-600 hover:bg-surface-muted">
          Edit profile
        </button>
      </div>
    </div>
  );
}
