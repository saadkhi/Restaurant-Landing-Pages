import EmberRule from "./EmberRule";
import Reveal from "./Reveal";

export default function SectionHeading({ eyebrow, title, intro, light = false, className = "" }) {
  return (
    <Reveal className={className}>
      <EmberRule label={eyebrow} light={light} />
      <h2
        className={`mt-7 font-display text-4xl font-light leading-[1.04] tracking-[-0.02em] sm:text-5xl lg:text-[3.6rem] ${
          light ? "text-background" : "text-foreground"
        }`}
      >
        {title}
      </h2>
      {intro ? (
        <p
          className={`mt-6 max-w-2xl text-[15px] leading-relaxed ${
            light ? "text-background/65" : "text-muted-foreground"
          }`}
        >
          {intro}
        </p>
      ) : null}
    </Reveal>
  );
}