import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Search, X } from "lucide-react";
import { MENU_CATEGORIES, MENU_TABS, CATEGORY_TAB_MAP } from "@/data/menu";

/* ─── helpers ─────────────────────────────────────────── */
function normalize(str) {
  return str.toLowerCase().replace(/[^a-z0-9 ]/g, "");
}

/* ─── sub-components ──────────────────────────────────── */
function MenuItem({ item }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-foreground/8 py-3 last:border-0">
      <div className="flex-1 min-w-0">
        <span className="text-[14px] leading-snug text-foreground">{item.name}</span>
        {item.note && (
          <p className="mt-0.5 text-[11px] leading-relaxed text-muted-foreground">{item.note}</p>
        )}
      </div>
      <span className="shrink-0 font-display text-[14px] font-medium text-primary tabular-nums">
        {item.price}
      </span>
    </div>
  );
}

function CategoryCard({ category }) {
  return (
    <div className="break-inside-avoid rounded-sm border border-foreground/10 bg-card p-5 mb-5">
      <h3 className="mb-3 font-display text-2xl font-light leading-tight tracking-tight text-foreground">
        {category.label}
      </h3>
      <div className="h-px w-10 bg-primary mb-4" />
      <div>
        {category.items.map((item) => (
          <MenuItem key={item.name} item={item} />
        ))}
      </div>
    </div>
  );
}

/* ─── main page ───────────────────────────────────────── */
export default function Menu() {
  const [activeTab, setActiveTab] = useState("all");
  const [query, setQuery] = useState("");
  const tabBarRef = useRef(null);

  // Scroll active tab button into view on mobile
  useEffect(() => {
    const btn = tabBarRef.current?.querySelector("[data-active='true']");
    btn?.scrollIntoView({ inline: "nearest", behavior: "smooth", block: "nearest" });
  }, [activeTab]);

  // Filtered categories
  const visible = MENU_CATEGORIES.filter((cat) => {
    const tabMatch = activeTab === "all" || CATEGORY_TAB_MAP[cat.id] === activeTab;
    if (!tabMatch) return false;
    if (!query.trim()) return true;
    const q = normalize(query);
    if (normalize(cat.label).includes(q)) return true;
    return cat.items.some((item) => normalize(item.name).includes(q));
  }).map((cat) => {
    if (!query.trim()) return cat;
    const q = normalize(query);
    // If category name matches, show all items; otherwise filter items
    if (normalize(cat.label).includes(q)) return cat;
    return {
      ...cat,
      items: cat.items.filter((item) => normalize(item.name).includes(q)),
    };
  }).filter((cat) => cat.items.length > 0);

  return (
    <div className="min-h-screen bg-background">
      {/* ── sticky header ── */}
      <header className="sticky top-0 z-40 border-b border-foreground/10 bg-background/90 backdrop-blur-md">
        <div className="mx-auto max-w-[1440px] px-4 lg:px-12">
          <div className="flex h-16 items-center gap-4">
            <Link
              to="/"
              className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-muted-foreground transition-colors hover:text-primary shrink-0"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Back</span>
            </Link>

            <div className="flex items-center gap-2 shrink-0">
              <img src="/logo.png" alt="Koyla Chai" className="h-8 w-8 rounded-full object-cover" />
              <span className="font-display text-xl leading-none tracking-tight hidden sm:inline">
                Koyla Chai
              </span>
            </div>

            <div className="ml-auto flex-1 max-w-xs relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
              <input
                type="search"
                placeholder="Search menu…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full h-9 rounded-full border border-foreground/15 bg-transparent pl-9 pr-8 text-[13px] outline-none transition-colors focus:border-primary placeholder:text-muted-foreground/60"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* ── tab bar ── */}
          <div
            ref={tabBarRef}
            className="flex gap-1 overflow-x-auto pb-2 pt-1 scrollbar-hide -mx-1 px-1"
            style={{ scrollbarWidth: "none" }}
          >
            {MENU_TABS.map((tab) => (
              <button
                key={tab.id}
                data-active={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`shrink-0 rounded-full px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground"
                    : "border border-foreground/15 text-muted-foreground hover:border-primary hover:text-primary"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* ── hero strip ── */}
      <div className="border-b border-foreground/10 bg-foreground py-10 px-4 lg:px-12 text-background">
        <div className="mx-auto max-w-[1440px]">
          <p className="text-[10px] uppercase tracking-[0.34em] text-background/50">
            Koyla Chai Restaurant · Clifton, Karachi
          </p>
          <h1 className="mt-3 font-display text-4xl font-light leading-tight tracking-[-0.02em] sm:text-5xl lg:text-6xl">
            The Full Menu
          </h1>
          <p className="mt-3 text-[14px] leading-relaxed text-background/60 max-w-xl">
            Seven cuisines, one address. Prices are per serving and subject to change — our team is
            happy to help at the table.
          </p>
        </div>
      </div>

      {/* ── grid ── */}
      <main className="mx-auto max-w-[1440px] px-4 py-10 lg:px-12 lg:py-14">
        {visible.length === 0 ? (
          <div className="py-24 text-center">
            <p className="text-muted-foreground text-sm">
              No items found for &ldquo;{query}&rdquo;
            </p>
            <button
              type="button"
              onClick={() => { setQuery(""); setActiveTab("all"); }}
              className="mt-4 text-[11px] uppercase tracking-[0.2em] text-primary hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div
            className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-5"
          >
            {visible.map((cat) => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        )}
      </main>

      {/* ── footer strip ── */}
      <div className="border-t border-foreground/10 py-8 px-4 lg:px-12">
        <div className="mx-auto max-w-[1440px] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            Prices in PKR · Subject to change without notice
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
