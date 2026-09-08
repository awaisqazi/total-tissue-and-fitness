/** Prefix site-owned paths for subdirectory hosting; preserve external URLs and local fragments. */
export function withBase(path: string): string {
  if (/^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(path)) return path;
  return import.meta.env.BASE_URL.replace(/\/$/, '') + '/' + path.replace(/^\/+/, '');
}
