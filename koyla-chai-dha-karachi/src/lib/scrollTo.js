/**
 * Smoothly scrolls to a section so that the first visible content
 * (heading or the inner content div) sits just below the fixed nav,
 * with a small breathing gap.
 *
 * Strategy:
 *  1. Find the section element by id.
 *  2. Look for the first heading (h1-h3) or the first direct div child
 *     inside it — that's where the actual content starts.
 *  3. Scroll so that element is ~24px below the nav bottom.
 *
 * @param {string} hash  e.g. "#reserve" or "#story"
 */
export function scrollToSection(hash) {
  const id = hash.replace("#", "");

  if (id === "top") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  const section = document.getElementById(id);
  if (!section) return;

  const navHeight = document.querySelector("header")?.offsetHeight ?? 64;

  // Find the first heading or content container inside the section
  const firstContent =
    section.querySelector("h1, h2, h3") ||
    section.querySelector(".mx-auto") ||
    section;

  const top =
    firstContent.getBoundingClientRect().top +
    window.scrollY -
    navHeight -
    24;

  window.scrollTo({ top, behavior: "smooth" });
}

/**
 * onClick handler for anchor elements.
 * Usage: <a href="#reserve" onClick={anchorClick}>
 */
export function anchorClick(e) {
  const href = e.currentTarget.getAttribute("href");
  if (!href?.startsWith("#")) return;
  e.preventDefault();
  scrollToSection(href);
}
