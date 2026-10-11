# Yash Jain — Personal Developer Portfolio

A clean, minimal developer portfolio inspired by [priyazsh.github.io](https://priyazsh.github.io/).  
Built with **React + Vite**, vanilla CSS, and Lucide icons.

## 🚀 Running Locally

```bash
# Install dependencies
npm install

# Start the dev server (opens at http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## ✏️ Customising Your Details

All personal information, projects, and social links live in a **single file**:

```
src/data/config.js
```

### Things to update before publishing:

| Field | Location | Status |
|-------|----------|--------|
| LinkedIn URL | `PERSONAL.linkedin` | ⚠️ Placeholder — update before deploying |
| Email address | `PERSONAL.email` | ⚠️ Placeholder — update before deploying |
| Profile photo | `public/avatar.jpg` | Replace with your actual photo |
| Graduation year | `EDUCATION` (commented out) | Add when ready |

## 🖼️ Replacing Images

| Image | File | Notes |
|-------|------|-------|
| Profile avatar | `public/avatar.jpg` | Recommend square, ≥ 256×256 px |
| SVVV Notes thumbnail | `public/svvv-notes.jpg` | Replace with real screenshot |
| PrestigeStay thumbnail | `public/prestigestay.jpg` | Replace with real screenshot |
| Kisan Mitra thumbnail | `public/kisanmitra.jpg` | Replace with real screenshot |

## 📦 Deployment

### Vercel (Recommended — zero config)
1. Push the project to a GitHub repository
2. Go to [vercel.com](https://vercel.com) → Import project → Select repo
3. Vite is auto-detected. Click **Deploy**

### GitHub Pages
1. Add `base` to `vite.config.js`:
   ```js
   export default defineConfig({
     plugins: [react()],
     base: '/YOUR_REPO_NAME/',   // e.g. '/Yash_port/'
   })
   ```
2. Run `npm run build`
3. Deploy the `dist/` folder via GitHub Pages (branch: `gh-pages`)
   ```bash
   npm install -D gh-pages
   # Add to package.json scripts:
   # "deploy": "gh-pages -d dist"
   npm run build && npm run deploy
   ```

## 📁 Project Structure

```
src/
  components/
    Navbar.jsx        — Sticky nav, mobile menu, dark mode toggle
    Hero.jsx          — Name, avatar, bio, CTA buttons
    About.jsx         — Longer biography
    Projects.jsx      — Project grid
    ProjectCard.jsx   — Individual project card
    TechStack.jsx     — Skills chips grouped by category
    GitHubActivity.jsx — GitHub profile link + contribution graph
    Education.jsx     — Education card
    Contact.jsx       — Contact links
    Footer.jsx        — Copyright
  data/
    config.js         — ⭐ All personal data in one place
  index.css           — Global styles, CSS variables, design tokens
  App.jsx             — Root component + dark mode state
  main.jsx            — React entry point
public/
  avatar.jpg
  svvv-notes.jpg
  prestigestay.jpg
  kisanmitra.jpg
index.html            — SEO meta, OG tags, dark-mode flash prevention
```

## 🌙 Dark Mode

The site respects the OS `prefers-color-scheme` setting on first visit.  
The user's choice is then persisted in `localStorage` under the key `yj-theme`.

## ♿ Accessibility

- Semantic HTML structure with `<main>`, `<header>`, `<footer>`, `<nav>`, `<section>`, `<article>`
- All interactive elements have `aria-label` and keyboard focus states
- `prefers-reduced-motion` respected — animations disabled for users who prefer it
- All images have descriptive `alt` text
