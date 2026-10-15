export function getNavigationSectionId(href: string) {
  if (!href.startsWith("/#")) {
    return null;
  }

  return href.slice(2) || null;
}

export function getActiveNavigationHref(
  pathname: string,
  visibleSectionId: string | null,
  hrefs: readonly string[],
) {
  if (pathname === "/blog" || pathname.startsWith("/blog/")) {
    return hrefs.find((href) => href === "/blog") ?? null;
  }

  if (pathname !== "/" || visibleSectionId === null) {
    return null;
  }

  return (
    hrefs.find((href) => getNavigationSectionId(href) === visibleSectionId) ??
    null
  );
}

export function getNavigationAriaCurrent(href: string) {
  return getNavigationSectionId(href) === null ? "page" : "location";
}
