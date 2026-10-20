import { ArrowUpRight } from "lucide-react";
import { Image } from "@/components/ui/image";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { CONTACT, CUISINES, IMAGES } from "@/data/site";

export default function Cuisines() {
  return (
    <section id="cuisines" className="scroll-mt-24 border-t border-foreground/10 py-24 lg:py-36">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Reveal>
              <div className="relative aspect-[3/2] overflow-hidden">
                <Image
                  src={IMAGES.feast}
                  alt="A shared multi-cuisine feast on a charcoal table"
                  className="h-full w-full"
                  fittingType="fill"
                />
              </div>
              <div className="mt-8">
                <SectionHeading
                  eyebrow="The Kitchens"
                  title="One roof. Seven cuisines."
                  intro="Every kitchen here has its own chef and its own fire. Order across cuisines, mix the table, and let the chai and paratha counter finish the evening."
                />
              </div>
            </Reveal>
          </div>

          <div>
            <div className="border-t border-foreground/10">
              {CUISINES.map((cuisine, index) => (
                <Reveal key={cuisine.name} delay={index * 0.04}>
                  <div className="group grid grid-cols-[auto_1fr] items-start gap-x-6 border-b border-foreground/10 py-7 transition-colors duration-500 hover:border-primary/40">
                    <span className="mt-1 font-body text-[10px] tracking-[0.3em] text-muted-foreground transition-colors group-hover:text-primary">
                      0{index + 1}
                    </span>
                    <div>
                      <h3 className="font-display text-3xl font-light leading-none tracking-tight transition-transform duration-500 group-hover:translate-x-1 sm:text-4xl">
                        {cuisine.name}
                      </h3>
                      <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
                        {cuisine.note}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
              <a
                href={CONTACT.orderUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-foreground/20 px-7 py-4 text-[11px] uppercase tracking-[0.22em] transition-colors hover:border-primary hover:text-primary"
              >
                See the full menu <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Delivery & takeaway via our ordering site
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}