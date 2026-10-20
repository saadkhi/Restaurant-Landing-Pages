/**
 * Smoothly scrolls to a section, offset by the fixed nav height + 8px gap.
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
  const top = section.getBoundingClientRect().top + window.scrollY - navHeight - 8;

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
