import { useRef } from "react";
import { Bell } from "lucide-react";
import useClickOutside from "../hooks/useClickOutside";

export default function NotificationsPanel({ notifications, isOpen, onToggle, onClose }) {
  const panelRef = useRef(null);
  useClickOutside(panelRef, onClose);

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <div className="relative" ref={panelRef}>
      <button
        onClick={onToggle}
        className="relative rounded-full p-2 text-ink-600 hover:bg-surface-muted"
        aria-label="Notifications"
      >
        <Bell size={20} strokeWidth={2} />
        {unreadCount > 0 && (
          <span className="absolute right-1.5 top-1.5 flex h-2 w-2 rounded-full bg-amber-500" />
        )}
      </button>

      {isOpen && (
        <div
          className="absolute right-0 z-50 mt-2 w-80 origin-top-right animate-fade-in
            rounded-xl border border-surface-border bg-white shadow-lg"
        >
          <div className="flex items-center justify-between border-b border-surface-border px-4 py-3">
            <p className="text-sm font-semibold text-ink-900">Notifications</p>
            <span className="text-xs text-ink-400">{unreadCount} unread</span>
          </div>

          <ul className="max-h-80 overflow-y-auto">
            {notifications.map((item) => (
              <li
                key={item.id}
                className="flex gap-3 border-b border-surface-border px-4 py-3 last:border-b-0 hover:bg-surface-muted"
              >
                <span
                  className={`mt-1.5 h-2 w-2 flex-shrink-0 rounded-full ${
                    item.unread ? "bg-amber-500" : "bg-transparent"
                  }`}
                />
                <div>
                  <p className="text-sm font-medium text-ink-900">{item.title}</p>
                  <p className="text-xs text-ink-400">{item.detail}</p>
                  <p className="mt-0.5 text-xs text-ink-200">{item.time}</p>
                </div>
              </li>
            ))}
          </ul>

          <button className="w-full py-2.5 text-center text-sm font-medium text-brand-600 hover:bg-surface-muted">
            View all notifications
          </button>
        </div>
      )}
    </div>
  );
}
