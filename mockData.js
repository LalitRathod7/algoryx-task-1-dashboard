// Centralised mock data. In a real app this would come from an API layer
// (e.g. src/api/orders.js) — kept here so the whole dashboard runs with
// zero backend setup.

export const currentUser = {
  name: "Meera Kulkarni",
  role: "Product Operations Lead",
  email: "meera.kulkarni@pulse.io",
  avatarColor: "bg-brand-500",
  initials: "MK",
};

export const statMetrics = [
  {
    id: "revenue",
    label: "Revenue this month",
    value: "₹8,42,300",
    delta: "+12.4%",
    trend: "up",
  },
  {
    id: "orders",
    label: "Orders placed",
    value: "1,284",
    delta: "+4.1%",
    trend: "up",
  },
  {
    id: "customers",
    label: "Active customers",
    value: "9,732",
    delta: "+2.8%",
    trend: "up",
  },
  {
    id: "refunds",
    label: "Refund rate",
    value: "1.9%",
    delta: "-0.3%",
    trend: "down",
  },
];

export const recentOrders = [
  {
    id: "ORD-7841",
    customer: "Ananya Rao",
    product: "Wireless Keyboard",
    date: "12 Sep 2026",
    amount: "₹2,499",
    status: "Delivered",
  },
  {
    id: "ORD-7840",
    customer: "Rohit Sharma",
    product: "Noise Cancelling Headphones",
    date: "12 Sep 2026",
    amount: "₹6,999",
    status: "Processing",
  },
  {
    id: "ORD-7839",
    customer: "Fatima Sheikh",
    product: "USB-C Hub",
    date: "11 Sep 2026",
    amount: "₹1,299",
    status: "Shipped",
  },
  {
    id: "ORD-7838",
    customer: "Vikram Patel",
    product: "27\" Monitor",
    date: "11 Sep 2026",
    amount: "₹18,450",
    status: "Delivered",
  },
  {
    id: "ORD-7837",
    customer: "Priya Nair",
    product: "Mechanical Mouse",
    date: "10 Sep 2026",
    amount: "₹1,899",
    status: "Cancelled",
  },
  {
    id: "ORD-7836",
    customer: "Karan Mehta",
    product: "Laptop Stand",
    date: "10 Sep 2026",
    amount: "₹1,150",
    status: "Shipped",
  },
];

export const notifications = [
  {
    id: 1,
    title: "New order received",
    detail: "Ananya Rao placed order ORD-7841",
    time: "5 min ago",
    unread: true,
  },
  {
    id: 2,
    title: "Server backup completed",
    detail: "Nightly backup finished with no errors",
    time: "1 hr ago",
    unread: true,
  },
  {
    id: 3,
    title: "Refund approved",
    detail: "Refund for ORD-7802 was processed",
    time: "3 hr ago",
    unread: false,
  },
  {
    id: 4,
    title: "New teammate joined",
    detail: "Sana Iyer joined the Operations workspace",
    time: "Yesterday",
    unread: false,
  },
];

export const navSections = [
  {
    label: "Overview",
    items: [
      { id: "dashboard", label: "Dashboard", icon: "LayoutDashboard" },
      { id: "analytics", label: "Analytics", icon: "BarChart3" },
    ],
  },
  {
    label: "Store",
    items: [
      { id: "orders", label: "Orders", icon: "ShoppingCart" },
      { id: "products", label: "Products", icon: "Package" },
      { id: "customers", label: "Customers", icon: "Users" },
    ],
  },
  {
    label: "Account",
    items: [
      { id: "settings", label: "Settings", icon: "Settings" },
      { id: "help", label: "Help centre", icon: "LifeBuoy" },
    ],
  },
];
