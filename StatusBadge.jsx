// Maps an order status string to a colour treatment. Centralising this
// means every table row (or future components) stay visually consistent.
const STATUS_STYLES = {
  Delivered: "bg-brand-50 text-brand-700",
  Shipped: "bg-sky-50 text-sky-700",
  Processing: "bg-amber-100 text-amber-600",
  Cancelled: "bg-red-50 text-red-600",
};

export default function StatusBadge({ status }) {
  const style = STATUS_STYLES[status] || "bg-ink-100 text-ink-600";
  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${style}`}>
      {status}
    </span>
  );
}
