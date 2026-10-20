export default function EmberRule({ label, light = false, className = "" }) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <span className="ember-glow h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
      <span className={`h-px flex-1 ${light ? "bg-background/20" : "bg-foreground/15"}`} />
      {label ? (
        <span
          className={`shrink-0 text-[10px] uppercase tracking-[0.3em] ${
            light ? "text-background/55" : "text-muted-foreground"
          }`}
        >
          {label}
        </span>
      ) : null}
    </div>
  );
}