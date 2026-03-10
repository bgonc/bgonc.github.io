# bgonc.codeberg.page — Portfolio Website

Personal site built with React, TypeScript, and Vite. Includes a home page, a blog section, and a project showcase.  
Deployed via Codeberg Pages.

Live at 👉 **[bgonc.codeberg.page](https://bgonc.codeberg.page)**

---

## Stack

- **Framework:** React + TypeScript
- **Build tool:** Vite
- **Routing:** React Router (HashRouter for Codeberg Pages compatibility)
- **Deployment:** Codeberg Pages

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
