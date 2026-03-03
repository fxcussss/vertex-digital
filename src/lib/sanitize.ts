/**
 * Strip HTML tags and dangerous characters from user input.
 * Prevents XSS and HTML injection.
 */
export function sanitize(input: string): string {
  return input
    .replace(/<[^>]*>/g, "") // strip HTML tags
    .replace(/[<>"'`]/g, (c) => ({ "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#x27;", "`": "&#x60;" }[c] ?? c))
    .trim();
}

export function sanitizeAll<T extends Record<string, string>>(obj: T): T {
  const result = {} as T;
  for (const key in obj) {
    result[key] = sanitize(obj[key]) as T[typeof key];
  }
  return result;
}
