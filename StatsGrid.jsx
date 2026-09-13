import StatCard from "./StatCard";
import { statMetrics } from "../data/mockData";

export default function StatsGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {statMetrics.map((metric) => (
        <StatCard key={metric.id} {...metric} />
      ))}
    </div>
  );
}
