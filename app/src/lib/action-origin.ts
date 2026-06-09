/**
 * Public origin for Solana Action metadata (icon, href).
 * Behind nginx, req.url may resolve to localhost — prefer env + forwarded headers.
 */
export function getActionOrigin(req: Request): string {
  const configured = process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/$/, "");
  if (configured) {
    return configured;
  }

  const proto = req.headers.get("x-forwarded-proto")?.split(",")[0]?.trim() ?? "https";
  const host =
    req.headers.get("x-forwarded-host")?.split(",")[0]?.trim() ??
    req.headers.get("host")?.trim();

  if (host && !host.startsWith("localhost") && !host.startsWith("127.0.0.1")) {
    return `${proto}://${host}`;
  }

  return new URL(req.url).origin;
}

export function getActionUrl(req: Request): URL {
  const origin = getActionOrigin(req);
  const incoming = new URL(req.url);
  return new URL(`${incoming.pathname}${incoming.search}`, origin);
}