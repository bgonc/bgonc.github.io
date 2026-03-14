# bgonc.codeberg.page — Portfolio

Personal site built with React, TypeScript, and Vite. Has a project section and a small blog where I document things I'm learning.

→ **[bgonc.codeberg.page](https://bgonc.codeberg.page)**

---

## Stack

- **Framework:** React + TypeScript
- **Build tool:** Vite
- **Routing:** React Router (HashRouter — works well with static hosting)
- **Hosting:** Codeberg Pages

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

## Deploy to `pages`

The repo includes an automated flow to keep `../pages` in sync after every push.

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

Every push to `main` builds the site, syncs `dist/` into `../pages`, and pushes it if there are changes.

---

## License

MIT — see [LICENSE](LICENSE).

---

## Author

[Bruno Goncalves](https://bgonc.codeberg.page) · [codeberg.org/bgonc](https://codeberg.org/bgonc)
