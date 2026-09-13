import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import StatsGrid from "./components/StatsGrid";
import OrdersTable from "./components/OrdersTable";
import ProfileCard from "./components/ProfileCard";
import ActivityFeed from "./components/ActivityFeed";

export default function App() {
  const [activeItem, setActiveItem] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="flex min-h-screen bg-surface-muted">
      <Sidebar
        activeItem={activeItem}
        onSelectItem={(id) => {
          setActiveItem(id);
          setIsSidebarOpen(false); // auto-close the mobile drawer after choosing a page
        }}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar
          onMenuClick={() => setIsSidebarOpen(true)}
          searchValue={searchValue}
          onSearchChange={setSearchValue}
        />

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl animate-fade-in space-y-6">
            <div>
              <h1 className="font-display text-2xl font-bold text-ink-900">
                Good to see you, Meera
              </h1>
              <p className="text-sm text-ink-400">
                Here&apos;s what&apos;s happening with your store today.
              </p>
            </div>

            <StatsGrid />

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
              <div className="xl:col-span-2">
                <OrdersTable searchValue={searchValue} />
              </div>
              <div className="space-y-6">
                <ProfileCard />
                <ActivityFeed />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
