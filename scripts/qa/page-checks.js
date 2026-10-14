// Comprobaciones de la vista actual para el agente qa-changes.
// Se pasa tal cual como `function` a `evaluate_script` (Chrome DevTools MCP).
// Devuelve un JSON corto: solo lo que falla, nunca el DOM entero.
// eslint-disable-next-line @typescript-eslint/no-unused-expressions -- es una expresión de función, no un módulo
() => {
  const describe = (element) =>
    element.tagName.toLowerCase() +
    (element.id ? `#${element.id}` : "") +
    (element.getAttribute("data-motion-section")
      ? `[data-motion-section=${element.getAttribute("data-motion-section")}]`
      : "");

  const internalLinks = [...document.querySelectorAll("a[href]")].filter(
    (link) => link.origin === location.origin,
  );
  const brokenAnchors = internalLinks
    .filter((link) => link.hash && link.pathname === location.pathname)
    .filter((link) => !document.getElementById(decodeURIComponent(link.hash.slice(1))))
    .map((link) => ({ href: link.getAttribute("href"), text: link.textContent.trim() }));
  const relativeAnchors = internalLinks
    .filter((link) => link.getAttribute("href").startsWith("#"))
    .map((link) => link.getAttribute("href"));
  const routes = [
    ...new Set(
      internalLinks
        .filter((link) => link.pathname !== location.pathname)
        .map((link) => link.pathname),
    ),
  ];

  const viewportWidth = document.documentElement.clientWidth;
  // Un ancestro que recorta (overflow hidden/clip) dentro del viewport tapa el exceso: no se ve.
  const isClipped = (element) => {
    for (let parent = element.parentElement; parent && parent !== document.body; parent = parent.parentElement) {
      const box = parent.getBoundingClientRect();
      if (/hidden|clip/.test(getComputedStyle(parent).overflowX) && box.left >= -1 && box.right <= viewportWidth + 1)
        return true;
    }
    return false;
  };
  const overflowing = [...document.body.querySelectorAll("*")]
    .filter((element) => {
      const box = element.getBoundingClientRect();
      return box.width > 0 && (box.right > viewportWidth + 1 || box.left < -1);
    })
    .filter((element) => !element.closest("[aria-hidden='true'], [inert]") && !isClipped(element))
    .slice(0, 5)
    .map(describe);

  const images = [...document.querySelectorAll("img")];
  const headings = [...document.querySelectorAll("h1, h2, h3, h4, h5, h6")];
  const skippedHeadings = headings
    .map((heading) => Number(heading.tagName[1]))
    .filter((level, index, levels) => index > 0 && level - levels[index - 1] > 1).length;
  const unnamedControls = [...document.querySelectorAll("a[href], button")]
    .filter((element) => !element.closest("[aria-hidden='true']"))
    .filter(
      (element) =>
        !element.textContent.trim() &&
        !element.getAttribute("aria-label") &&
        !element.getAttribute("aria-labelledby") &&
        !element.querySelector("img[alt]:not([alt=''])"),
    )
    .map(describe);
  const rawKeys = (document.body.innerText.match(/\b[a-z]+(\.[a-zA-Z]+){2,}\b/g) || []).slice(0, 5);

  return {
    url: location.pathname + location.hash,
    viewport: `${innerWidth}x${innerHeight}`,
    reducedMotion: matchMedia("(prefers-reduced-motion: reduce)").matches,
    h1: document.querySelectorAll("h1").length,
    skippedHeadings,
    horizontalOverflow: document.documentElement.scrollWidth > viewportWidth,
    overflowing,
    brokenAnchors,
    relativeAnchors,
    routes,
    imagesWithoutAlt: images.filter((image) => !image.hasAttribute("alt")).map((image) => image.src),
    imagesWithoutSize: images
      .filter((image) => !image.getAttribute("width") || !image.getAttribute("height"))
      .map((image) => image.currentSrc || image.src)
      .slice(0, 5),
    brokenImages: images
      .filter((image) => image.complete && image.naturalWidth === 0 && image.loading !== "lazy")
      .map((image) => image.src),
    unnamedControls,
    rawTranslationKeys: rawKeys,
    hiddenSections: [...document.querySelectorAll("[data-motion-section]")]
      .filter((section) => getComputedStyle(section).opacity === "0" || getComputedStyle(section).visibility === "hidden")
      .map(describe),
  };
};
