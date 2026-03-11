# bgonc.codeberg.page — Portfolio Website

Personal site built with React, TypeScript, and Vite. It includes a project section and blog posts that document what I am learning.  
Main site: **[bgonc.codeberg.page](https://bgonc.codeberg.page)**

---

## About this repo

I work in technical support and keep developing my IT skills through formal study and hands-on projects. This repository is part of my learning path and public portfolio.

---

## Stack

- **Framework:** React + TypeScript
- **Build tool:** Vite
- **Routing:** React Router (HashRouter for static hosting compatibility)
- **Hosting:** Codeberg Pages (with GitHub mirror)

---

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the dev server:
   ```bash
   npm run dev
   ```
3. Build for production:
   ```bash
   npm run build
   ```

---

## Auto Deploy To `pages`

This repo includes a local automation flow that keeps `../pages` synced.

- Script: `scripts/deploy-pages.sh`
- Hook: `.githooks/post-push`

Enable hooks once in this clone:

```bash
git config core.hooksPath .githooks
```

Manual deploy command:

```bash
npm run deploy:pages
```

Behavior:
- Every push to `main` in this local clone runs the deploy script automatically.
- The script builds the site, syncs `dist/` into `../pages`, commits there if needed, and pushes `pages`.

---

## License

MIT — see [LICENSE](LICENSE) for details.

---

## Author

[Bruno Goncalves](https://bgonc.codeberg.page) · [codeberg.org/bgonc](https://codeberg.org/bgonc)
