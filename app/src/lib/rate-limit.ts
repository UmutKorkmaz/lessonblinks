interface RateLimitBucket {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitBucket>();

export interface RateLimitOptions {
  /** Sliding window length in milliseconds (default: 60s) */
  windowMs?: number;
  /** Max requests allowed per window (default: 5) */
  maxRequests?: number;
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: number;
  retryAfterMs: number;
}

/**
 * Simple in-memory rate limiter stub for Action POST handlers.
 * Suitable for single-instance dev / MVP; replace with Redis in production.
 */
export function checkRateLimit(
  key: string,
  { windowMs = 60_000, maxRequests = 5 }: RateLimitOptions = {},
): RateLimitResult {
  const now = Date.now();
  const bucket = store.get(key);

  if (!bucket || now >= bucket.resetAt) {
    const resetAt = now + windowMs;
    store.set(key, { count: 1, resetAt });
    return {
      allowed: true,
      remaining: maxRequests - 1,
      resetAt,
      retryAfterMs: 0,
    };
  }

  if (bucket.count >= maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetAt: bucket.resetAt,
      retryAfterMs: Math.max(0, bucket.resetAt - now),
    };
  }

  bucket.count += 1;
  store.set(key, bucket);

  return {
    allowed: true,
    remaining: maxRequests - bucket.count,
    resetAt: bucket.resetAt,
    retryAfterMs: 0,
  };
}

/** Build a composite rate-limit key from wallet + route + optional IP. */
export function rateLimitKey(
  parts: Array<string | undefined | null>,
): string {
  return parts.filter(Boolean).join(":");
}

/** Clear all buckets (testing helper). */
export function resetRateLimits(): void {
  store.clear();
}

/** Throw a user-facing Action-compatible error when rate limited. */
export function assertRateLimit(
  key: string,
  options?: RateLimitOptions,
): void {
  const result = checkRateLimit(key, options);
  if (!result.allowed) {
    const seconds = Math.ceil(result.retryAfterMs / 1000);
    throw `Too many requests. Try again in ${seconds} seconds.`;
  }
}