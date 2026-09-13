import { MoreHorizontal } from "lucide-react";
import StatusBadge from "./StatusBadge";
import { recentOrders } from "../data/mockData";

export default function OrdersTable({ searchValue = "" }) {
  const query = searchValue.trim().toLowerCase();
  const filteredOrders = query
    ? recentOrders.filter((order) =>
        [order.id, order.customer, order.product].some((field) =>
          field.toLowerCase().includes(query)
        )
      )
    : recentOrders;

  return (
    <div className="rounded-xl border border-surface-border bg-white shadow-panel">
      <div className="flex items-center justify-between border-b border-surface-border px-5 py-4">
        <div>
          <h2 className="font-display text-base font-bold text-ink-900">Recent orders</h2>
          <p className="text-sm text-ink-400">Latest activity across your store</p>
        </div>
        <button className="text-sm font-medium text-brand-600 hover:text-brand-700">
          View all
        </button>
      </div>

      {/* Table layout for medium screens and up */}
      <div className="hidden overflow-x-auto sm:block">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-surface-border text-xs uppercase tracking-wide text-ink-400">
              <th className="px-5 py-3 font-medium">Order</th>
              <th className="px-5 py-3 font-medium">Customer</th>
              <th className="px-5 py-3 font-medium">Product</th>
              <th className="px-5 py-3 font-medium">Date</th>
              <th className="px-5 py-3 font-medium">Amount</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr
                key={order.id}
                className="border-b border-surface-border last:border-b-0 hover:bg-surface-muted"
              >
                <td className="px-5 py-3 font-medium text-ink-900">{order.id}</td>
                <td className="px-5 py-3 text-ink-600">{order.customer}</td>
                <td className="px-5 py-3 text-ink-600">{order.product}</td>
                <td className="px-5 py-3 text-ink-400">{order.date}</td>
                <td className="px-5 py-3 font-medium text-ink-900">{order.amount}</td>
                <td className="px-5 py-3">
                  <StatusBadge status={order.status} />
                </td>
                <td className="px-5 py-3 text-right">
                  <button className="rounded-md p-1 text-ink-400 hover:bg-surface-border hover:text-ink-600">
                    <MoreHorizontal size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredOrders.length === 0 && (
          <p className="px-5 py-8 text-center text-sm text-ink-400">
            No orders match “{searchValue}”.
          </p>
        )}
      </div>

      {/* Stacked card layout on small screens instead of a squeezed table */}
      <ul className="divide-y divide-surface-border sm:hidden">
        {filteredOrders.map((order) => (
          <li key={order.id} className="p-4">
            <div className="flex items-center justify-between">
              <p className="font-medium text-ink-900">{order.customer}</p>
              <StatusBadge status={order.status} />
            </div>
            <p className="mt-0.5 text-sm text-ink-400">{order.product}</p>
            <div className="mt-2 flex items-center justify-between text-sm">
              <span className="text-ink-400">
                {order.id} · {order.date}
              </span>
              <span className="font-medium text-ink-900">{order.amount}</span>
            </div>
          </li>
        ))}
        {filteredOrders.length === 0 && (
          <li className="px-4 py-8 text-center text-sm text-ink-400">
            No orders match “{searchValue}”.
          </li>
        )}
      </ul>
    </div>
  );
}
