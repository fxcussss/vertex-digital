/**
 * Simple in-memory rate limiter for Server Actions.
 * Limits each IP to `max` requests per `windowMs`.
 */
const store = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(
  identifier: string,
  max = 5,
  windowMs = 60_000
): { success: boolean; remaining: number } {
  const now = Date.now();
  const entry = store.get(identifier);

  if (!entry || now > entry.resetAt) {
    store.set(identifier, { count: 1, resetAt: now + windowMs });
    return { success: true, remaining: max - 1 };
  }

  if (entry.count >= max) {
    return { success: false, remaining: 0 };
  }

  entry.count++;
  return { success: true, remaining: max - entry.count };
}

// Clean up expired entries every 5 minutes
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    store.forEach((v, k) => { if (now > v.resetAt) store.delete(k); });
  }, 300_000);
}
