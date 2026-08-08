#!/usr/bin/env bash
#
# deploy.sh — push the built out/ tree to the blog.ancilla.lol docroot.
#
# Credentials come from the environment only; nothing is hardcoded.
#
#   DEPLOY_HOST      user@host                  (required)
#   DEPLOY_PATH      remote path                (required)
#   DEPLOY_PORT      ssh port                   (default 22)
#   DEPLOY_SSH_KEY   private key path           (optional; else agent/default key)
#   BUILD=0          skip the rebuild and deploy the existing out/
#
# DEPLOY_PATH must be "." and not an absolute path. The deploy identity is an
# rrsync forced command chrooted to /var/www/ancilla-blog, so the chroot root
# IS the nginx docroot. An absolute path resolves to
# /var/www/ancilla-blog/var/www/... and fails on mkdir; a subdirectory such as
# "site/" succeeds but writes somewhere nginx does not serve, which produces
# green deploys against a site that never changes. That exact mistake cost the
# sibling thedesknook.com repository several silent no-op deploys.
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO_ROOT"

OUT_DIR="${OUT_DIR:-out}"
: "${DEPLOY_HOST:?set DEPLOY_HOST=user@host}"
: "${DEPLOY_PATH:?set DEPLOY_PATH=. for the chrooted deploy identity}"

if [ "${BUILD:-1}" = "1" ]; then
  echo "==> Building static export (BUILD=0 to skip)"
  npm run build
elif [ ! -f "$OUT_DIR/index.html" ]; then
  echo "ERROR: $OUT_DIR/index.html missing and BUILD=0 — run npm run build first" >&2
  exit 1
fi

# Refuse to publish a tree that the build should never have produced. rsync
# --delete against the live docroot makes an empty out/ destructive.
if [ ! -s "$OUT_DIR/index.html" ]; then
  echo "ERROR: $OUT_DIR/index.html is missing or empty — refusing to deploy" >&2
  exit 1
fi
POST_COUNT="$(find "$OUT_DIR/posts" -name index.html -type f 2>/dev/null | wc -l | tr -d ' ')"
if [ "$POST_COUNT" -lt 1 ]; then
  echo "ERROR: no post pages in $OUT_DIR/posts — refusing to deploy" >&2
  exit 1
fi

FILE_COUNT="$(find "$OUT_DIR" -type f | wc -l | tr -d ' ')"
echo "==> Deploying $FILE_COUNT files ($POST_COUNT posts) to ${DEPLOY_HOST}:${DEPLOY_PATH}/"

SSH="ssh -p ${DEPLOY_PORT:-22}"
[ -n "${DEPLOY_SSH_KEY:-}" ] && SSH="$SSH -i ${DEPLOY_SSH_KEY}"

rsync -az --delete --checksum -e "$SSH" "${OUT_DIR}/" "${DEPLOY_HOST}:${DEPLOY_PATH}/"

echo "==> Deploy complete."
