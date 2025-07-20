# h3x-3d

A modern, fully responsive 3D print store web app with multi-language support (Persian/English), built with React, Vite, Tailwind CSS, and Bun.

## Features
- 🛒 Browse, search, and filter 3D printed products
- 🏷️ Category browsing with icons
- ❤️ Like/favorite products (local storage)
- 🛍️ Add to cart (local storage)
- 📱 Fully responsive, mobile-first design
- 🌐 Multi-language (i18n) support: Persian (default, RTL, Yekan font) and English (LTR)
- 🔥 Smooth GSAP animations
- 📝 Custom orders, contact, and about pages
- 📦 Deployable to GitHub Pages

## Tech Stack
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Bun](https://bun.sh/) (for scripts and dev server)
- [i18next](https://www.i18next.com/) (for translations)
- [GSAP](https://greensock.com/gsap/) (for animations)

## Local Development
1. **Install dependencies:**
   ```sh
   bun install
   ```
2. **Run the dev server:**
   ```sh
   bun run dev
   ```
3. **Open** [http://localhost:5173](http://localhost:5173) in your browser.

## Build for Production
```sh
bun run build
```

## Deploy to GitHub Pages
1. Make sure you have [gh-pages](https://www.npmjs.com/package/gh-pages) installed as a dev dependency:
   ```sh
   bun add -d gh-pages
   ```
2. Deploy:
   ```sh
   bun run deploy
   ```
   This will build the site and publish the `dist` folder to the `gh-pages` branch.

- The site will be available at: `https://<your-github-username>.github.io/h3x-3d/`

## Configuration for GitHub Pages
- The Vite config sets `base: '/h3x-3d/'` for correct asset paths.
- All static assets (including the Yekan font) are bundled for deployment.

## Persian Support
- Default language is Persian (fa), with full RTL layout and Yekan font.
- All UI text is translatable via `src/i18n.ts`.

## License
MIT 