import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Phone, X } from "lucide-react";
import { CONTACT } from "@/data/site";
import { scrollToSection } from "@/lib/scrollTo";

const LINKS = [
  { label: "Our Story", href: "#story" },
  { label: "Kitchens", href: "#cuisines" },
  { label: "Menu", href: "/menu", isRoute: true },
  { label: "Venues", href: "#venues" },
  { label: "What's On", href: "#events" },
  { label: "Visit", href: "#visit" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (e, href) => {
    if (!href.startsWith("#")) return;
    e.preventDefault();
    setOpen(false);
    scrollToSection(href);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 bg-background/90 backdrop-blur-md transition-all duration-500 ${
          scrolled ? "border-b border-foreground/10 shadow-sm" : ""
        }`}
      >
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-6 py-5 lg:px-12">
          <a
            href="#top"
            onClick={(e) => handleNavClick(e, "#top")}
            className="flex items-center gap-2"
          >
            <img
              src="/logo.png"
              alt="Koyla Chai"
              className="h-10 w-10 rounded-full object-cover"
            />
            <span className="font-display text-2xl leading-none tracking-tight">Koyla Chai</span>
          </a>

          <nav className="hidden items-center gap-9 lg:flex">
            {LINKS.map((link) =>
              link.isRoute ? (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-[11px] uppercase tracking-[0.24em] text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-[11px] uppercase tracking-[0.24em] text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              )
            )}
          </nav>

          <div className="hidden items-center gap-6 lg:flex">
            <a
              href={CONTACT.phoneHref}
              className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
            >
              <Phone className="h-3.5 w-3.5" />
              {CONTACT.phone}
            </a>
            <a
              href="#reserve"
              onClick={(e) => handleNavClick(e, "#reserve")}
              className="rounded-full bg-primary px-6 py-3 text-[11px] uppercase tracking-[0.2em] text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_28px_-14px_rgba(226,88,34,0.9)]"
            >
              Reserve a table
            </a>
          </div>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-foreground/15 transition-colors hover:border-primary hover:text-primary lg:hidden"
          >
            <Menu className="h-4 w-4" />
          </button>
        </div>
      </header>

      {open ? (
        <div className="fixed inset-0 z-[60] bg-background lg:hidden">
          <div className="flex items-center justify-between px-6 py-5">
            <div className="flex items-center gap-2">
              <img
                src="/logo.png"
                alt="Koyla Chai"
                className="h-10 w-10 rounded-full object-cover"
              />
              <span className="font-display text-2xl">Koyla Chai</span>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-foreground/15"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <nav className="flex flex-col px-6 pt-6">
            {LINKS.map((link, index) =>
              link.isRoute ? (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-foreground/10 py-5 font-display text-3xl font-light tracking-tight"
                >
                  <span className="mr-4 font-body text-[10px] tracking-[0.3em] text-primary">
                    0{index + 1}
                  </span>
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="border-b border-foreground/10 py-5 font-display text-3xl font-light tracking-tight"
                >
                  <span className="mr-4 font-body text-[10px] tracking-[0.3em] text-primary">
                    0{index + 1}
                  </span>
                  {link.label}
                </a>
              )
            )}
          </nav>
          <div className="px-6 pt-8">
            <a
              href="#reserve"
              onClick={(e) => handleNavClick(e, "#reserve")}
              className="block rounded-full bg-primary px-6 py-4 text-center text-[11px] uppercase tracking-[0.24em] text-primary-foreground"
            >
              Reserve a table
            </a>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">{CONTACT.address}</p>
            <a href={CONTACT.phoneHref} className="mt-2 block text-sm text-foreground">
              {CONTACT.phone}
            </a>
          </div>
        </div>
      ) : null}
    </>
  );
}
