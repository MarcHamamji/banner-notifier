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
    Object.entries(obj).filter(([, value]) => value !== null),
  ) as Record<string, string | number | boolean>;
}

const entities = [
  ['amp', '&'],
  ['apos', "'"],
  ['#x27', "'"],
  ['#x2F', '/'],
  ['#39', "'"],
  ['#47', '/'],
  ['lt', '<'],
  ['gt', '>'],
  ['nbsp', ' '],
  ['quot', '"'],
];

export function decodeHTMLEntities(text: string) {
  for (let i = 0, max = entities.length; i < max; ++i) {
    text = text.replace(
      new RegExp('&' + entities[i][0] + ';', 'g'),
      entities[i][1],
    );
  }

  return text;
}
