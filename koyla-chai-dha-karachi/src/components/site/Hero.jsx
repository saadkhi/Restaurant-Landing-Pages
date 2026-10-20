import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Image } from "@/components/ui/image";
import { CONTACT, IMAGES } from "@/data/site";

const fade = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
};

export default function Hero() {
  const handleMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--mx", `${((event.clientX - rect.left) / rect.width) * 100}%`);
    event.currentTarget.style.setProperty("--my", `${((event.clientY - rect.top) / rect.height) * 100}%`);
  };

  return (
    <section id="top" className="relative">
      <div className="grid lg:min-h-[100svh] lg:grid-cols-[1.02fr_0.98fr]">
        <div className="flex flex-col justify-center px-6 pb-16 pt-32 lg:px-12 lg:py-36">
          <motion.p
            {...fade}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-[10px] uppercase tracking-[0.34em] text-muted-foreground"
          >
            Koyla Chai Restaurant · Est. 2013
          </motion.p>

          <motion.h1
            {...fade}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 font-display text-[16vw] font-light leading-[0.92] tracking-[-0.03em] sm:text-[11vw] lg:text-[5.2vw]"
          >
            The people
            <br />
            <span className="italic text-primary">pleasing</span> place.
          </motion.h1>

          <motion.p
            {...fade}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 max-w-lg text-[15px] leading-relaxed text-muted-foreground"
          >
            Seven cuisines under one roof in Clifton — a rooftop with live music every night, a pink
            paradise party room, an ember-lit lounge, and a chest of more than 1,500 sweets from around
            the world.
          </motion.p>

          <motion.div
            {...fade}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-11 flex flex-wrap items-center gap-x-8 gap-y-5"
          >
            <a
              href="#reserve"
              className="inline-flex items-center rounded-full bg-primary px-8 py-4 text-[11px] uppercase tracking-[0.22em] text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_32px_-14px_rgba(226,88,34,0.9)]"
            >
              Reserve a table
            </a>
            <a
              href={CONTACT.orderUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 border-b border-foreground/25 pb-1 text-[11px] uppercase tracking-[0.22em] transition-colors hover:border-primary hover:text-primary"
            >
              Order online <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </motion.div>

          <div className="mt-16 grid grid-cols-2 gap-x-8 gap-y-5 border-t border-foreground/10 pt-7 sm:grid-cols-4 lg:mt-20">
            {["Family owned", "7 cuisines", "Live music nightly", "Open till 2 AM"].map((item) => (
              <span key={item} className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                {item}
              </span>
            ))}
          </div>
        </div>

        <div
          onMouseMove={handleMove}
          className="relative min-h-[58vh] overflow-hidden lg:min-h-full"
        >
          <Image
            src={IMAGES.embers}
            alt="Glowing coals at the heart of the Koyla Chai kitchen"
            className="absolute inset-0 h-full w-full"
            fittingType="fill"
          />
          <div
            className="pointer-events-none absolute inset-0 transition-opacity duration-700"
            style={{
              background:
                "radial-gradient(360px circle at var(--mx, 50%) var(--my, 45%), rgba(226,88,34,0.45), transparent 70%)",
              mixBlendMode: "screen",
            }}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent lg:from-background/85" />
          <span className="absolute bottom-7 right-7 hidden text-[10px] uppercase tracking-[0.3em] text-white/60 lg:block">
            Clifton · Karachi
          </span>
        </div>
      </div>
    </section>
  );
}