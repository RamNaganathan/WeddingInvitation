# 💍 Hemalatha & Ram — Wedding Invitation

An interactive, South-Indian themed wedding invitation web app built with **React + Vite** and styled with **Tailwind CSS**.

---

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- npm (comes with Node.js)
- Git

---

## Local Development

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the dev server

```bash
npm run dev
```

The app will be available at **http://localhost:5173** (or the next available port). The dev server supports hot module replacement — changes are reflected instantly in the browser.

---

## Building for Production

```bash
npm run build
```

The optimised output is written to the `dist/` folder. To preview it locally before deploying:

```bash
npm run preview
```

---

## Hosting on GitHub Pages

### Step 1 — Set the `base` path in Vite

GitHub Pages serves your site from a sub-path (e.g. `https://<username>.github.io/<repo>/`), so Vite needs to know about it.

Open **`vite.config.js`** and add the `base` option:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/<your-repo-name>/',   // ← replace with your actual repo name
})
```

### Step 2 — Install the `gh-pages` helper

```bash
npm install --save-dev gh-pages
```

### Step 3 — Add deploy scripts to `package.json`

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

### Step 4 — Deploy

```bash
npm run deploy
```

This builds the app and pushes the `dist/` folder to the `gh-pages` branch of your repository.

### Step 5 — Enable GitHub Pages in repository settings

1. Go to your repository on GitHub.
2. Navigate to **Settings → Pages**.
3. Under **Branch**, select `gh-pages` and click **Save**.

Your invitation will be live at:

```
https://<your-username>.github.io/<your-repo>/
```

> **Note:** It may take a minute or two for the site to go live after the first deploy.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 |
| Build Tool | Vite 8 |
| Styling | Tailwind CSS 3 |
| Fonts | Google Fonts (Cormorant Garamond, Great Vibes, Lato) |
| Deployment | GitHub Pages via `gh-pages` |
