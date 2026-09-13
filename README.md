# Pulse — Admin Dashboard

A production-style, responsive admin dashboard built with **React + Vite** and **Tailwind CSS**, created for Task 1 of the frontend internship (Week 1).

## Preview

> Add your deployed link and screenshots here once you've deployed the project (see the [Deployment](#deployment) section below).

- **Live demo:** _add your Vercel/Netlify URL_
- **Desktop screenshot:** `screenshots/desktop.png`
- **Mobile screenshot:** `screenshots/mobile.png`

## Features

- Responsive sidebar that becomes a slide-in drawer on mobile
- Sticky top navigation with search, notifications, and a profile menu
- Dashboard statistic cards with trend indicators
- Recent orders table (with a stacked card layout on small screens) that's filterable via the search bar
- User profile card and a recent activity feed
- Notifications dropdown with unread indicators
- Light, purposeful animations (drawer slide, dropdown fade-in)
- Fully responsive from mobile to large desktop screens

## Tech stack

| Layer       | Choice                     |
| ----------- | -------------------------- |
| Framework   | React 18 + Vite            |
| Styling     | Tailwind CSS               |
| Icons       | lucide-react               |
| State       | React hooks (`useState`, custom hooks) |

## Project structure

```
admin-dashboard/
├── src/
│   ├── components/       # Reusable, single-purpose UI components
│   │   ├── Sidebar.jsx
│   │   ├── Topbar.jsx
│   │   ├── SearchBar.jsx
│   │   ├── NotificationsPanel.jsx
│   │   ├── StatCard.jsx
│   │   ├── StatsGrid.jsx
│   │   ├── OrdersTable.jsx
│   │   ├── StatusBadge.jsx
│   │   ├── ProfileCard.jsx
│   │   └── ActivityFeed.jsx
│   ├── hooks/            # Custom React hooks
│   │   ├── useMediaQuery.js
│   │   └── useClickOutside.js
│   ├── data/
│   │   └── mockData.js   # Mock data standing in for an API layer
│   ├── App.jsx           # Page layout — composes everything together
│   ├── main.jsx          # React entry point
│   └── index.css         # Tailwind directives + base styles
├── index.html
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── package.json
```

## Getting started

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev

# 3. Build for production
npm run build

# 4. Preview the production build locally
npm run preview
```

The dev server runs at `http://localhost:5173` by default.

## Deployment

This project deploys cleanly to **Vercel** or **Netlify** as a static Vite build:

1. Push this repository to GitHub.
2. On Vercel/Netlify, import the repo.
3. Build command: `npm run build`
4. Output directory: `dist`

After deploying, add the live link and a couple of screenshots (desktop + mobile) to this README so reviewers can see the result without cloning the repo.

## Design notes

- Palette is a deep teal (`brand`) paired with a muted burnt-amber accent (`amber`) on a cool slate/white surface — chosen to feel like a real analytics product rather than a generic template.
- Headings use **Sora**, body text uses **Inter**, loaded via Google Fonts in `index.html`.
- All data in `src/data/mockData.js` is mocked — swap it for real API calls when wiring up a backend.

## Learning outcomes covered

- Component architecture and composition
- State management with hooks (`useState`, custom hooks like `useClickOutside` and `useMediaQuery`)
- Responsive, mobile-first UI with Tailwind CSS
- Reusable, prop-driven component design
- Scalable folder structure that separates components, hooks, and data
