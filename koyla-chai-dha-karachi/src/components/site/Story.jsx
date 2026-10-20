import { Image } from "@/components/ui/image";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { IMAGES, STATS } from "@/data/site";

export default function Story() {
  return (
    <section id="story" className="scroll-mt-24 py-24 lg:py-36">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="grid gap-14 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
          <Reveal className="relative">
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src={IMAGES.pour}
                alt="Chai poured from a height into a clay cup"
                className="h-full w-full"
                fittingType="fill"
              />
            </div>
            <div className="mt-6 flex items-start gap-4">
              <span className="ember-glow mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <p className="font-display text-lg italic leading-snug text-muted-foreground">
                It began with coal-fired chai and parathas. It never stopped growing.
              </p>
            </div>
          </Reveal>

          <div>
            <SectionHeading
              eyebrow="Our Story"
              title="A family kitchen that grew a whole corner of Clifton."
            />
            <div className="mt-8 space-y-6 text-[15px] leading-relaxed text-muted-foreground">
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

            <div className="mt-14 grid grid-cols-2 gap-x-8 gap-y-9 border-t border-foreground/10 pt-9 sm:grid-cols-4">
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-4xl font-light leading-none">{stat.value}</p>
                  <p className="mt-3 text-[10px] uppercase leading-relaxed tracking-[0.2em] text-muted-foreground">
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