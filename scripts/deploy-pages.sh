#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PAGES_REPO_PATH="${PAGES_REPO_PATH:-$ROOT_DIR/../pages}"

if [[ ! -d "$PAGES_REPO_PATH/.git" ]]; then
  echo "Pages repo not found at: $PAGES_REPO_PATH" >&2
  exit 1
fi

cd "$ROOT_DIR"

if [[ ! -d node_modules ]]; then
  npm ci
fi

npm run build

rsync -a --delete --exclude '.git' "$ROOT_DIR/dist/" "$PAGES_REPO_PATH/"

cd "$PAGES_REPO_PATH"
if [[ -n "$(git status --porcelain)" ]]; then
  SOURCE_SHA="$(git -C "$ROOT_DIR" rev-parse --short HEAD)"
  git add -A
  git commit -m "Deploy from portfolio ${SOURCE_SHA}"
  git push origin "$(git branch --show-current)"
  echo "Pages updated and pushed."
else
  echo "No changes to deploy to pages."
fi
