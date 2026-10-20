import { Image } from "@/components/ui/image";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { IMAGES, STATS } from "@/data/site";

export default function Story() {
  return (
    <section id="story" className="scroll-mt-16 overflow-hidden">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid lg:grid-cols-[0.88fr_1.12fr]">

          {/* ── Left: full-height image ── */}
          <Reveal className="relative">
            {/* On mobile keep a natural aspect ratio; on desktop stretch to fill */}
            <div className="relative aspect-[3/4] lg:aspect-auto lg:h-full min-h-[420px]">
              <Image
                src={IMAGES.pour}
                alt="Chai poured from a height into a clay cup"
                className="absolute inset-0 h-full w-full"
                fittingType="fill"
              />
            </div>
            {/* Caption sits below the image */}
            <div className="flex items-start gap-3 px-6 py-5 lg:px-8">
              <span className="ember-glow mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <p className="font-display text-[15px] italic leading-snug text-muted-foreground">
                It began with coal-fired chai and parathas. It never stopped growing.
              </p>
            </div>
          </Reveal>

          {/* ── Right: content ── */}
          <div className="flex flex-col justify-between px-6 py-12 lg:px-14 lg:py-16 border-t border-foreground/10 lg:border-t-0 lg:border-l lg:border-foreground/10">
            <div>
              <SectionHeading
                eyebrow="Our Story"
                title="A family kitchen that grew a whole corner of Clifton."
              />
              <div className="mt-7 space-y-5 text-[15px] leading-relaxed text-muted-foreground max-w-2xl">
                <p>
                  Koyla Chai is locally and family owned, and it opened its doors in 2013 with a simple
                  idea: make wonderful dining experiences that people come back for. What started as a
                  tea house is now a full-fledged multi-cuisine casual dining restaurant.
                </p>
                <p>
                  Today there are seven kitchens under one roof — Pakistani, Pan Asian, Persian, Turkish,
                  Afghani, Continental and Italian — prepared by a team dedicated to getting every plate
                  right. Around them sits everything else: a rooftop with live music every night, an
                  indoor dining hall on the ground floor, the Juliet Room, the Gorilla Lounge, a swimming
                  pool with its own private poolside for events, and Candy Chest, with more than 1,500
                  sweets from around the world.
                </p>
                <p>
                  Our food is our passion. Everything here is made for the people who walk through the
                  door — and to every one of them, thank you.
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-8 border-t border-foreground/10 pt-8 sm:grid-cols-4">
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-4xl font-light leading-none">{stat.value}</p>
                  <p className="mt-2.5 text-[10px] uppercase leading-relaxed tracking-[0.2em] text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
