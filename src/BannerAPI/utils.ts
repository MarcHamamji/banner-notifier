export function build_url(
  base: string,
  path: string,
  query: Record<string, unknown>,
) {
  const url = base + path;
  const queryStr = Object.keys(query)
    .map(key => key + '=' + query[key])
    .join('&');
  return url + '?' + queryStr;
}

export function removeNullValues(
  obj: Record<string, string | number | boolean | null>,
): Record<string, string | number | boolean> {
  return Object.fromEntries(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Object.entries(obj).filter(([key, value]) => value !== null),
  ) as Record<string, string | number | boolean>;
}
