# bgonc.github.io — Portfolio

Personal site built with React, TypeScript, and Vite. Has a project section and a small blog where I document things I'm learning.

→ **[bgonc.github.io](https://bgonc.github.io)**

---

## Stack

- **Framework:** React + TypeScript
- **Build tool:** Vite
- **Routing:** React Router (HashRouter — works well with static hosting)
- **Hosting:** GitHub Pages

---

## Run locally

Prerequisites: Node.js

```bash
npm install
npm run dev
```

To build for production:
```bash
npm run build
```

---

## Deploy to GitHub Pages

The repo includes an automated flow that builds the portfolio and syncs it to the `gh-pages` branch checked out at `../pages`. It also publishes Excel Utils under `/excel-utils`.

- Script: `scripts/deploy-pages.sh`
- Hook: `.githooks/post-push`

Enable it once in your local clone:
```bash
git config core.hooksPath .githooks
```

Or trigger it manually:
```bash
npm run deploy:pages
```

Every push to `main` builds the site and pushes changed deployment files to GitHub Pages.

---

## License

MIT — see [LICENSE](LICENSE).

---

## Author

[Bruno Goncalves](https://bgonc.github.io) · [github.com/bgonc](https://github.com/bgonc)
