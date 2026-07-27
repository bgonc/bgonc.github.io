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

GitHub Actions builds and deploys the portfolio after every push to `main`. The workflow also publishes [Excel Utils](https://github.com/bgonc/excel-utils) under `/excel-utils`.

A manual deployment script is available as a fallback when the `gh-pages` worktree is checked out at `../pages`:

```bash
npm run deploy:pages
```

---

## License

MIT — see [LICENSE](LICENSE).

---

## Author

[Bruno Goncalves](https://bgonc.github.io) · [github.com/bgonc](https://github.com/bgonc)
