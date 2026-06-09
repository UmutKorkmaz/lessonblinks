import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

/**
 * CORS headers required by the Solana Actions / Blinks spec.
 * @see https://github.com/solana-developers/solana-actions — ACTIONS_CORS_HEADERS
 */
const ACTIONS_CORS_HEADERS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,PUT,OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, Content-Encoding, Accept-Encoding, X-Accept-Action-Version, X-Accept-Blockchain-Ids",
  "Access-Control-Expose-Headers": "X-Action-Version, X-Blockchain-Ids",
};

function withActionCors(response: NextResponse): NextResponse {
  for (const [key, value] of Object.entries(ACTIONS_CORS_HEADERS)) {
    response.headers.set(key, value);
  }
  return response;
}

export function middleware(request: NextRequest) {
  if (request.method === "OPTIONS") {
    return withActionCors(new NextResponse(null, { status: 200 }));
  }

  return withActionCors(NextResponse.next());
}

export const config = {
  matcher: "/api/actions/:path*",
};