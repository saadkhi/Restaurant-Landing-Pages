import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import EmberRule from "./EmberRule";
import { EVENTS } from "@/data/site";
import { anchorClick } from "@/lib/scrollTo";

export default function Events() {
  return (
    <section id="events" className="scroll-mt-16 border-t border-foreground/10 pb-12 pt-12 lg:pb-20 lg:pt-14">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <SectionHeading
          eyebrow="What's On"
          title="Something happening every single night."
          intro="From live music on the rooftop to seasonal celebrations that transform the whole restaurant — there is always a reason to come back."
        />

        <div className="mt-16 grid gap-px border border-foreground/10 sm:grid-cols-2 lg:grid-cols-3">
          {EVENTS.map((event, index) => (
            <Reveal key={event.name} delay={index * 0.04}>
              <div className="group flex h-full flex-col gap-5 border border-foreground/10 p-7 transition-colors duration-300 hover:border-primary/30 hover:bg-primary/[0.03] lg:p-8">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-2xl font-light leading-snug tracking-tight lg:text-3xl">
                    {event.name}
                  </h3>
                  <span className="ember-glow mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
                <EmberRule label={event.when} />
                <p className="text-sm leading-relaxed text-muted-foreground">{event.blurb}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-5">
          <a
            href="#reserve"
            onClick={anchorClick}
            className="rounded-full bg-primary px-8 py-4 text-[11px] uppercase tracking-[0.22em] text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_32px_-14px_rgba(226,88,34,0.9)]"
          >
            Reserve for a special night
          </a>
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
            Live music every Monday to Sunday
          </p>
        </Reveal>
      </div>
    </section>
  );
}
