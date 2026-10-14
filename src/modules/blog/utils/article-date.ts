const CARD_DATE_FORMATTER = new Intl.DateTimeFormat("es", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

const DETAIL_DATE_FORMATTER = new Intl.DateTimeFormat("es", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

function parseIsoDate(value: string): Date {
  return new Date(value);
}

export function formatArticleCardDate(value: string): string {
  return CARD_DATE_FORMATTER.format(parseIsoDate(value)).replace(".", "");
}

export function formatArticleDetailDate(value: string): string {
  return DETAIL_DATE_FORMATTER.format(parseIsoDate(value));
}

export function wasArticleUpdated(
  publishedAt: string,
  updatedAt: string,
): boolean {
  return parseIsoDate(updatedAt).getTime() > parseIsoDate(publishedAt).getTime();
}
