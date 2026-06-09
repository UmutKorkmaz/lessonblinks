#!/usr/bin/env bash
set -euo pipefail

BASE_URL="${BASE_URL:-http://localhost:3000}"
# Demo recipient for GET metadata when EDUCATION_WALLET_PUBKEY is unset locally.
DEMO_RECIPIENT="${DEMO_RECIPIENT:-11111111111111111111111111111112}"
ENDPOINT="${BASE_URL}/api/actions/lesson-1-usdc?to=${DEMO_RECIPIENT}"

echo "==> Verifying Solana Action: lesson-1-usdc"
echo "    Base URL: ${BASE_URL}"
echo ""

echo "--- OPTIONS ${ENDPOINT}"
OPTIONS_STATUS="$(curl -sS -o /dev/null -w "%{http_code}" -X OPTIONS "${ENDPOINT}")"
echo "HTTP ${OPTIONS_STATUS}"

if [[ "${OPTIONS_STATUS}" != "200" && "${OPTIONS_STATUS}" != "204" ]]; then
  echo "ERROR: expected OPTIONS to return 200 or 204" >&2
  exit 1
fi

echo ""
echo "--- GET ${ENDPOINT}"
GET_BODY="$(curl -sS -X GET "${ENDPOINT}")"
echo "${GET_BODY}"

if ! echo "${GET_BODY}" | grep -q '"type"[[:space:]]*:[[:space:]]*"action"'; then
  echo "ERROR: GET response missing type: action" >&2
  exit 1
fi

echo ""
echo "Test in browser (embedded Blink):"
echo "  ${BASE_URL}/lessons/1"
echo ""
echo "Local Inspector (clone https://github.com/solana-developers/blinks-xyz):"
echo "  http://localhost:3000/inspector?url=$(python3 -c "import urllib.parse; print(urllib.parse.quote('${ENDPOINT}', safe=''))")"
echo ""
echo "OK: lesson-1-usdc OPTIONS and GET checks passed."