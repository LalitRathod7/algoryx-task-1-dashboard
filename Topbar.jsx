import { useRef, useState } from "react";
import { Menu, ChevronDown, LogOut, User, Settings } from "lucide-react";
import SearchBar from "./SearchBar";
import NotificationsPanel from "./NotificationsPanel";
import useClickOutside from "../hooks/useClickOutside";
import { currentUser, notifications } from "../data/mockData";

export default function Topbar({ onMenuClick, searchValue, onSearchChange }) {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);
  useClickOutside(profileRef, () => setIsProfileOpen(false));

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-surface-border bg-white/90 px-4 backdrop-blur sm:px-6">
      <button
        onClick={onMenuClick}
        className="rounded-md p-2 text-ink-600 hover:bg-surface-muted lg:hidden"
        aria-label="Open menu"
      >
        <Menu size={20} />
      </button>

      <SearchBar
        value={searchValue}
        onChange={onSearchChange}
        className="hidden max-w-sm flex-1 sm:block"
      />

      <div className="ml-auto flex items-center gap-1.5 sm:gap-3">
        <NotificationsPanel
          notifications={notifications}
          isOpen={isNotificationsOpen}
          onToggle={() => setIsNotificationsOpen((open) => !open)}
          onClose={() => setIsNotificationsOpen(false)}
        />

        <div className="h-6 w-px bg-surface-border" />

        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setIsProfileOpen((open) => !open)}
            className="flex items-center gap-2 rounded-lg p-1.5 hover:bg-surface-muted"
          >
            <span
              className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold text-white ${currentUser.avatarColor}`}
            >
              {currentUser.initials}
            </span>
            <span className="hidden text-left sm:block">
              <span className="block text-sm font-medium leading-tight text-ink-900">
                {currentUser.name}
              </span>
              <span className="block text-xs leading-tight text-ink-400">{currentUser.role}</span>
            </span>
            <ChevronDown size={16} className="hidden text-ink-400 sm:block" />
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 z-50 mt-2 w-48 animate-fade-in rounded-xl border border-surface-border bg-white py-1.5 shadow-lg">
              <button className="flex w-full items-center gap-2.5 px-4 py-2 text-sm text-ink-600 hover:bg-surface-muted">
                <User size={16} /> View profile
              </button>
              <button className="flex w-full items-center gap-2.5 px-4 py-2 text-sm text-ink-600 hover:bg-surface-muted">
                <Settings size={16} /> Account settings
              </button>
              <div className="my-1 h-px bg-surface-border" />
              <button className="flex w-full items-center gap-2.5 px-4 py-2 text-sm text-amber-600 hover:bg-surface-muted">
                <LogOut size={16} /> Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
