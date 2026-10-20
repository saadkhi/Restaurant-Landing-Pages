import { Image } from "@/components/ui/image";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { VENUES } from "@/data/site";
import { anchorClick } from "@/lib/scrollTo";

function VenueCard({ venue, tall = false }) {
  return (
    <div className={`group relative overflow-hidden ${tall ? "lg:col-span-2 aspect-[4/3] lg:aspect-[16/9]" : "aspect-[4/3]"}`}>
      <Image
        src={venue.image}
        alt={venue.name}
        className="absolute inset-0 h-full w-full transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
        fittingType="fill"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/45 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-7 lg:p-9">
        <h3 className="font-display text-3xl font-light leading-none text-background lg:text-4xl">
          {venue.name}
        </h3>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-background/70">{venue.blurb}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {venue.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-background/25 px-3.5 py-1.5 text-[10px] uppercase tracking-[0.2em] text-background/75"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Venues() {
  const featured = VENUES.find((venue) => venue.featured);
  const rest = VENUES.filter((venue) => !venue.featured);

  return (
    <section id="venues" className="scroll-mt-24 bg-foreground py-24 text-background lg:py-36">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <SectionHeading
          light
          eyebrow="Under One Roof"
          title="You do not have to choose a room. We have six."
          intro="Rooftop, lounge, party room, dining hall, poolside or the candy store — every part of Koyla Chai has its own character, and they are all on the same address."
        />

        <div className="mt-16 grid gap-5 lg:grid-cols-2">
          {featured ? <VenueCard venue={featured} tall /> : null}
          {rest.map((venue, index) => (
            <Reveal key={venue.name} delay={index * 0.05}>
              <VenueCard venue={venue} />
            </Reveal>
          ))}

          <Reveal delay={0.1}>
            <div className="flex h-full min-h-[300px] flex-col justify-between border border-background/15 p-7 lg:p-9">
              <span className="ember-glow h-1.5 w-1.5 rounded-full bg-primary" />
              <div>
                <h3 className="font-display text-3xl font-light leading-none lg:text-4xl">
                  Poolside &amp; Indoor Hall
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-background/65">
                  A swimming pool with its own private poolside for events, and the ground-floor indoor
                  dining hall for the days you would rather stay cool. Both are available to book
                  privately.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {["Private poolside", "Event hall", "Indoor dining"].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-background/25 px-3.5 py-1.5 text-[10px] uppercase tracking-[0.2em] text-background/75"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-5">
          <a
            href="#reserve"
            onClick={anchorClick}
            className="rounded-full bg-primary px-8 py-4 text-[11px] uppercase tracking-[0.22em] text-primary-foreground transition-all hover:-translate-y-0.5"
          >
            Book a room or a table
          </a>
          <p className="text-xs uppercase tracking-[0.18em] text-background/55">
            Private events, birthdays &amp; corporate bookings
          </p>
        </Reveal>
      </div>
    </section>
  );
}