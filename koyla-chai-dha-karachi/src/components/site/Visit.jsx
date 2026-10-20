import { Facebook, Instagram, MapPin, MessageCircle, Phone } from "lucide-react";
import Reveal from "./Reveal";
import EmberRule from "./EmberRule";
import { CONTACT } from "@/data/site";
import { anchorClick } from "@/lib/scrollTo";

const footerLink =
  "text-[11px] uppercase tracking-[0.2em] text-background/60 transition-colors hover:text-primary";

export default function Visit() {
  return (
    <footer id="visit" className="scroll-mt-24 bg-foreground pt-24 text-background lg:pt-36">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <Reveal>
          <h2 className="max-w-4xl font-display text-5xl font-light leading-[0.98] tracking-[-0.03em] sm:text-6xl lg:text-[5vw]">
            Come sit with us in <span className="italic text-primary">Clifton</span>.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-12 lg:grid-cols-[1.2fr_1fr_1fr] lg:gap-16">
          <Reveal>
            <EmberRule light label="Find us" />
            <p className="mt-7 max-w-sm text-[15px] leading-relaxed text-background/75">
              {CONTACT.address}
            </p>
            <a
              href={CONTACT.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-7 inline-flex items-center gap-3 rounded-full border border-background/20 px-6 py-3.5 text-[11px] uppercase tracking-[0.2em] transition-colors hover:border-primary hover:text-primary"
            >
              <MapPin className="h-4 w-4" /> Get directions
            </a>
            <p className="mt-7 text-[10px] uppercase tracking-[0.24em] text-background/50">
              {CONTACT.hours}
            </p>
          </Reveal>

          <Reveal delay={0.05}>
            <EmberRule light label="Talk to us" />
            <ul className="mt-7 space-y-4 text-sm">
              <li>
                <a href={CONTACT.phoneHref} className="flex items-center gap-3 text-background/75 transition-colors hover:text-primary">
                  <Phone className="h-4 w-4" /> {CONTACT.phone}
                </a>
              </li>
              <li>
                <a href={CONTACT.mobileHref} className="flex items-center gap-3 text-background/75 transition-colors hover:text-primary">
                  <Phone className="h-4 w-4" /> {CONTACT.mobile}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent("Hello Koyla Chai! I would like to know more about your restaurant.")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 text-background/75 transition-colors hover:text-primary"
                >
                  <MessageCircle className="h-4 w-4" /> WhatsApp us
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACT.email}`} className="text-background/75 transition-colors hover:text-primary">
                  {CONTACT.email}
                </a>
              </li>
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <EmberRule light label="Order &amp; follow" />
            <ul className="mt-7 space-y-4">
              <li>
                <a href={CONTACT.orderUrl} target="_blank" rel="noreferrer" className={footerLink}>
                  Order online
                </a>
              </li>
              <li>
                <a href={CONTACT.instagram} target="_blank" rel="noreferrer" className={`${footerLink} flex items-center gap-3`}>
                  <Instagram className="h-4 w-4" /> Instagram
                </a>
              </li>
              <li>
                <a href={CONTACT.facebook} target="_blank" rel="noreferrer" className={`${footerLink} flex items-center gap-3`}>
                  <Facebook className="h-4 w-4" /> Facebook
                </a>
              </li>
              <li>
                <a href="#reserve" onClick={anchorClick} className={footerLink}>
                  Reserve a table
                </a>
              </li>
              <li>
                <a href="#events" onClick={anchorClick} className={footerLink}>
                  What&apos;s on
                </a>
              </li>
            </ul>
          </Reveal>
        </div>

        <div className="mt-20 flex flex-col gap-5 border-t border-background/12 py-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Koyla Chai" className="h-10 w-10 rounded-full object-cover" />
            <span className="font-display text-xl">Koyla Chai</span>
          </div>
          <p className="text-[10px] uppercase tracking-[0.24em] text-background/45">
            The people pleasing place · Clifton, Karachi · Since 2013
          </p>
        </div>
      </div>
    </footer>
  );
}