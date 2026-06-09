#!/usr/bin/env bash
# Run on the server after git pull (or via SSH one-liner).
set -euo pipefail

APP_ROOT="/var/www/lessonblinks"
APP_DIR="${APP_ROOT}/app"

echo "=== Deploying LessonBlinks ==="
cd "${APP_ROOT}"
git pull origin main

cd "${APP_DIR}"
npm ci
npm run build

pm2 restart lessonblinks || pm2 start ecosystem.config.cjs
pm2 save

echo "=== Done ==="
pm2 status lessonblinks
curl -sS -o /dev/null -w "Homepage: %{http_code}\n" http://127.0.0.1:3210/
curl -sS -o /dev/null -w "Lesson 1 Action: %{http_code}\n" http://127.0.0.1:3210/api/actions/lesson-1-usdc