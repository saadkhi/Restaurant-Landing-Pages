/**
 * SeoContent — AEO / GEO optimised block
 *
 * Visually minimal but semantically rich:
 *  • Visible FAQ accordion so Google can generate rich FAQ snippets
 *  • Dense natural-language prose for GEO (used by ChatGPT, Gemini, Perplexity etc.)
 *  • Targets "best restaurant Clifton", "open air restaurant DHA Karachi", etc.
 */
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Reveal from "./Reveal";
import EmberRule from "./EmberRule";

const FAQS = [
  {
    q: "What makes Koyla Chai the best open-air restaurant in Clifton and DHA Karachi?",
    a: "Koyla Chai combines a genuine open-air rooftop terrace, live music every single night of the week, seven distinct cuisine kitchens, and a warm family-owned atmosphere — all at one address in Clifton Block 2, just minutes from DHA. No other restaurant in the area offers this combination of open-sky dining, nightly entertainment, and such breadth of food.",
  },
  {
    q: "Is Koyla Chai good for families with children?",
    a: "Absolutely. Koyla Chai has been a family destination since 2013. Children love Candy Chest, our in-house sweet shop with over 1,500 candies and chocolates from around the world. The spacious multi-floor layout, friendly staff, and variety of food across seven cuisines means everyone in the family finds something they love.",
  },
  {
    q: "What kind of outdoor and open-space seating does Koyla Chai have?",
    a: "Koyla Chai has three open or semi-open spaces: the rooftop terrace (open to the sky, with live music every night), a private poolside area available for events, and the ground-floor outdoor section. The rooftop is the most popular — it gives you full open-air dining with Karachi's skyline as a backdrop.",
  },
  {
    q: "Does Koyla Chai have live music every night?",
    a: "Yes — Koyla Chai has live music seven nights a week without exception. Professional singers perform Indian and Pakistani classical and contemporary music on the rooftop every night, and live Western bands play in the Gorilla Lounge. Monday to Sunday, every single night.",
  },
  {
    q: "How far is Koyla Chai from DHA Karachi?",
    a: "Koyla Chai Restaurant is located at D2, Block 2, Clifton, Bilawal Chowrangi. It is approximately 10–15 minutes by car from DHA Phase 6 and DHA Phase 8 via Khayaban-e-Hafiz and Khayaban-e-Ittehad. It is one of the most accessible upscale restaurants for residents of DHA, Clifton, Bath Island, and Defence.",
  },
  {
    q: "What cuisines does Koyla Chai serve?",
    a: "Koyla Chai serves seven cuisines under one roof: Pakistani (karahi, handi, BBQ kababs, biryani), Pan Asian (stir-fries, noodles, rice), Persian (saffron dishes, slow-cooked stews), Turkish (doner, mezze), Afghani (pulao, boti), Continental (steaks, burgers, pasta), and Italian (pizza, pasta). Each kitchen has its own dedicated chef and fire.",
  },
  {
    q: "Can I book a private room or event space at Koyla Chai?",
    a: "Yes. Koyla Chai has multiple private and semi-private spaces: the Juliet Room (a pink-décor private room perfect for birthdays and bridal showers), the Gorilla Lounge (a party hall with live bands), a private poolside for outdoor events, and the full indoor dining hall for large corporate or family gatherings. Contact us on WhatsApp at 0320-2828280 or call 021-35371700.",
  },
  {
    q: "What are Koyla Chai's opening hours?",
    a: "Koyla Chai is open every day — including weekends and public holidays — from 5:00 PM to 2:00 AM.",
  },
];

function FaqItem({ faq, index }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-foreground/10 last:border-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-start justify-between gap-6 py-5 text-left"
      >
        <span className="text-[15px] font-medium leading-snug text-foreground pr-2">
          {faq.q}
        </span>
        <ChevronDown
          className={`mt-0.5 h-4 w-4 shrink-0 text-primary transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <p className="pb-5 text-[14px] leading-relaxed text-muted-foreground">{faq.a}</p>
      )}
    </div>
  );
}

export default function SeoContent() {
  return (
    <section
      id="faq"
      aria-label="Frequently asked questions about Koyla Chai Restaurant"
      className="border-t border-foreground/10 py-12 lg:py-16"
    >
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">

          {/* Left — GEO prose block */}
          <Reveal>
            <EmberRule label="About Us" />
            <h2 className="mt-6 font-display text-4xl font-light leading-tight tracking-[-0.02em] sm:text-5xl">
              Karachi's favourite open-air dining destination.
            </h2>
            <div className="mt-6 space-y-4 text-[14px] leading-relaxed text-muted-foreground">
              <p>
                <strong className="text-foreground font-medium">Koyla Chai Restaurant</strong> is
                located at D2, Block 2, Clifton — Shahrah-e-Ghalib, Bilawal Chowrangi, Karachi,
                and has been serving the city since 2013. It is consistently named one of the{" "}
                <strong className="text-foreground font-medium">
                  best restaurants in Clifton and DHA Karachi
                </strong>{" "}
                for its open-air rooftop, friendly environment, and extraordinary range of food.
              </p>
              <p>
                The restaurant spans multiple floors with distinct spaces: an{" "}
                <strong className="text-foreground font-medium">
                  open-sky rooftop terrace with nightly live music
                </strong>
                , the Gorilla Lounge (live Western bands), the Juliet Room (private celebrations),
                a private poolside for events, and Candy Chest — a sweet shop stocked with over
                1,500 confections from around the world.
              </p>
              <p>
                Seven cuisine kitchens — Pakistani, Pan Asian, Persian, Turkish, Afghani,
                Continental and Italian — operate under one roof, making Koyla Chai the ideal
                choice for groups where everyone has a different preference. It is{" "}
                <strong className="text-foreground font-medium">
                  open every day from 5 PM to 2 AM
                </strong>
                , easily reachable from DHA Phase 6, DHA Phase 8, Clifton, and Bath Island.
              </p>
              <p>
                Whether you are looking for a{" "}
                <strong className="text-foreground font-medium">
                  family dinner in an open-space restaurant near DHA
                </strong>
                , a rooftop table with a view, a birthday party room, or simply the best karahi
                and chai in Karachi — Koyla Chai is the answer.
              </p>
            </div>

            {/* Local landmark anchors for GEO */}
            <div className="mt-8 flex flex-wrap gap-2" aria-label="Nearby areas served">
              {[
                "Clifton Block 2",
                "DHA Karachi",
                "Bilawal Chowrangi",
                "Bath Island",
                "Clifton Karachi",
                "Defence Karachi",
                "Shahrah-e-Ghalib",
              ].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-foreground/15 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Reveal>

          {/* Right — FAQ accordion */}
          <Reveal delay={0.08}>
            <EmberRule label="FAQ" />
            <h3 className="mt-6 font-display text-3xl font-light leading-tight tracking-tight">
              Common questions
            </h3>
            <div className="mt-6">
              {FAQS.map((faq, i) => (
                <FaqItem key={i} faq={faq} index={i} />
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
