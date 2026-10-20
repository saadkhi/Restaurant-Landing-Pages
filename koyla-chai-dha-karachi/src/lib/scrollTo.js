/**
 * Smoothly scrolls to a section by id, offset by the fixed nav height.
 * Use this wherever an anchor link points to an on-page section.
 *
 * @param {string} hash  e.g. "#reserve" or "#story"
 */
export function scrollToSection(hash) {
  const id = hash.replace("#", "");
  const el = id === "top" ? document.body : document.getElementById(id);
  if (!el) return;
  const navHeight = document.querySelector("header")?.offsetHeight ?? 80;
  const top =
    id === "top"
      ? 0
      : el.getBoundingClientRect().top + window.scrollY - navHeight - 16;
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
