export function rewriteUrlForNextExport(url: string): string {
  const [pathname, hash] = url.split('#');
  // eslint-disable-next-line prefer-const
  let [path, qs] = pathname.split('?');

  if (path) {
    path = path.replace(/\/$/, '');
    // Append a trailing slash if this path does not have an extension
    if (!/\.[^/]+\/?$/.test(path)) path += '/';
  }
  if (typeof qs === 'string') path += `?${qs}`;
  if (typeof hash === 'string') path += `#${hash}`;
  return path;
}
