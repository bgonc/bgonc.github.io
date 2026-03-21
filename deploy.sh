#!/usr/bin/env bash
set -euo pipefail

PAGES_DIR="../pages"
DIST_DIR="dist"

# Verify pages repo exists
if [ ! -d "$PAGES_DIR/.git" ]; then
    echo "Error: pages repo not found at $PAGES_DIR"
    exit 1
fi

# Build
echo "Building..."
npm run build

# Sync dist to pages (delete old files, preserve .git and LICENSE)
echo "Syncing to pages repo..."
rsync -av --delete \
    --exclude '.git' \
    --exclude 'LICENSE' \
    "$DIST_DIR/" "$PAGES_DIR/"

# Commit and push pages
cd "$PAGES_DIR"
COMMIT_MSG="Deploy from portfolio $(git -C "$OLDPWD" rev-parse --short HEAD)"

if git diff --quiet && git diff --cached --quiet && [ -z "$(git ls-files --others --exclude-standard)" ]; then
    echo "No changes to deploy."
    exit 0
fi

git add -A
git commit -m "$COMMIT_MSG"
git push

echo "Deployed successfully!"
