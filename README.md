# Rule Intelligence Platform

A React-based dashboard for managing business rules and workflows.

## Tech Stack

- React 19 + Vite
- ReactFlow (node-based flow editor)
- Recharts (analytics charts)
- Lucide React (icons)

## Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

### Render (Static Site)

1. Push code to GitHub
2. Go to [render.com](https://render.com) → New → Static Site
3. Connect your repo
4. Set:
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `dist`
5. Deploy

### Vercel

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import your repo
4. Vite is auto-detected, just click Deploy

### Netlify

1. Push code to GitHub
2. Go to [netlify.com](https://netlify.com) → Add new site
3. Connect your repo
4. Set:
   - **Build Command:** `npm run build`
   - **Publish Directory:** `dist`
5. Deploy

## Features

- Dashboard with analytics and charts
- Rule Management with filters
- Visual Rule Creation Flow editor
- Organization management (teams, members, roles)
- Template library
