#!/usr/bin/env bash
# Assemble the deployable site into ./dist for Cloudflare Workers Assets.
# Workers Assets will not take the repository root as its directory, so the
# publishable files are copied into a clean folder that contains nothing else.
set -euo pipefail
rm -rf dist && mkdir -p dist
cp -R articles css images js dist/ 2>/dev/null || true
cp ./*.html dist/
cp robots.txt sitemap.xml _headers dist/ 2>/dev/null || true
echo "dist: $(find dist -type f | wc -l | tr -d ' ') files"
