import { useState, useMemo, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft, Search, X, Plus, Minus, ShoppingBag,
  Trash2, ChevronRight, CheckCircle2, Phone, MessageCircle
} from "lucide-react";
import { MENU_CATEGORIES, MENU_TABS, CATEGORY_TAB_MAP } from "@/data/menu";
import { CONTACT } from "@/data/site";

/* ─── price parser ──────────────────────────────────── */
function parsePrice(str) {
  // handles "1250/-", "1995/3050", "000/-" etc.
  const cleaned = str.replace(/\s/g, "");
  const match = cleaned.match(/^(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
}

/* ─── flatten all items into a single orderable list ─── */
const ALL_ITEMS = MENU_CATEGORIES.flatMap((cat) =>
  cat.items
    .filter((item) => parsePrice(item.price) > 0)
    .map((item) => ({
      id: `${cat.id}__${item.name}`,
      category: cat.id,
      categoryLabel: cat.label,
      name: item.name,
      note: item.note ?? null,
      price: parsePrice(item.price),
      priceRaw: item.price,
    }))
);

/* ─── order tabs matching menu tabs ─────────────────── */
const ORDER_TABS = [
  { id: "all", label: "All" },
  ...MENU_TABS.filter((t) => t.id !== "all"),
];

function normalize(str) {
  return str.toLowerCase().replace(/[^a-z0-9 ]/g, "");
}

/* ─── sub-components ─────────────────────────────────── */
function ItemCard({ item, qty, onAdd, onRemove }) {
  return (
    <div className="flex items-start gap-3 rounded-sm border border-foreground/10 bg-card p-4 transition-colors hover:border-foreground/20">
      {/* colour swatch keyed to category */}
      <div className="mt-0.5 h-8 w-8 shrink-0 rounded-sm bg-primary/10 flex items-center justify-center">
        <span className="text-[10px] font-medium text-primary">
          {item.categoryLabel.slice(0, 2).toUpperCase()}
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[13px] leading-snug text-foreground">{item.name}</p>
        {item.note && (
          <p className="mt-0.5 text-[10px] leading-relaxed text-muted-foreground line-clamp-2">
            {item.note}
          </p>
        )}
        <p className="mt-1 text-[13px] font-medium text-primary">
          Rs. {item.price.toLocaleString()}
        </p>
      </div>
      <div className="shrink-0 flex items-center gap-1.5 mt-0.5">
        {qty > 0 ? (
          <>
            <button
              type="button"
              onClick={onRemove}
              className="flex h-7 w-7 items-center justify-center rounded-full border border-foreground/15 text-foreground transition-colors hover:border-primary hover:text-primary"
              aria-label="Remove one"
            >
              <Minus className="h-3 w-3" />
            </button>
            <span className="w-5 text-center text-[13px] font-medium tabular-nums">{qty}</span>
          </>
        ) : null}
        <button
          type="button"
          onClick={onAdd}
          className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground transition-all hover:-translate-y-0.5"
          aria-label="Add one"
        >
          <Plus className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}

function CartItem({ item, qty, onAdd, onRemove }) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-foreground/8 last:border-0">
      <div className="flex-1 min-w-0">
        <p className="text-[13px] leading-snug text-foreground">{item.name}</p>
        <p className="mt-0.5 text-[11px] text-muted-foreground">
          Rs. {item.price.toLocaleString()} × {qty}
        </p>
      </div>
      <div className="flex items-center gap-1.5 shrink-0">
        <button
          type="button"
          onClick={onRemove}
          className="flex h-6 w-6 items-center justify-center rounded-full border border-foreground/15 transition-colors hover:border-primary hover:text-primary"
        >
          {qty === 1 ? <Trash2 className="h-3 w-3" /> : <Minus className="h-3 w-3" />}
        </button>
        <span className="w-4 text-center text-[13px] tabular-nums">{qty}</span>
        <button
          type="button"
          onClick={onAdd}
          className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground"
        >
          <Plus className="h-3 w-3" />
        </button>
      </div>
      <span className="text-[13px] font-medium text-foreground tabular-nums shrink-0 w-16 text-right">
        Rs. {(item.price * qty).toLocaleString()}
      </span>
    </div>
  );
}

/* ─── checkout form ──────────────────────────────────── */
function CheckoutForm({ cart, items, total, onBack, onSuccess }) {
  const [form, setForm] = useState({
    name: "", phone: "", address: "", type: "delivery", notes: ""
  });
  const [errors, setErrors] = useState({});

  const update = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Required";
    if (!form.phone.trim()) e.phone = "Required";
    if (form.type === "delivery" && !form.address.trim()) e.address = "Required for delivery";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    // Build WhatsApp message with order summary
    const lines = [
      `*Koyla Chai Order*`,
      ``,
      `*Type:* ${form.type === "delivery" ? "Delivery" : "Takeaway"}`,
      `*Name:* ${form.name}`,
      `*Phone:* ${form.phone}`,
      form.type === "delivery" ? `*Address:* ${form.address}` : null,
      form.notes ? `*Notes:* ${form.notes}` : null,
      ``,
      `*Order:*`,
      ...Object.entries(cart).map(([id, qty]) => {
        const item = items.find((i) => i.id === id);
        return item ? `• ${item.name} × ${qty} — Rs. ${(item.price * qty).toLocaleString()}` : null;
      }).filter(Boolean),
      ``,
      `*Total: Rs. ${total.toLocaleString()}*`,
    ].filter((l) => l !== null).join("\n");

    const url = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(lines)}`;
    window.open(url, "_blank", "noreferrer");
    onSuccess();
  };

  const fieldClass = "w-full rounded-sm border border-foreground/20 bg-transparent px-4 py-3 text-[13px] outline-none transition-colors focus:border-primary placeholder:text-muted-foreground/60";
  const labelClass = "block mb-1.5 text-[10px] uppercase tracking-[0.22em] text-muted-foreground";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* order type */}
      <div className="grid grid-cols-2 gap-3">
        {["delivery", "takeaway"].map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setForm((p) => ({ ...p, type: t }))}
            className={`rounded-sm border py-3 text-[11px] uppercase tracking-[0.2em] transition-all ${
              form.type === t
                ? "border-primary bg-primary text-primary-foreground"
                : "border-foreground/15 text-muted-foreground hover:border-primary hover:text-primary"
            }`}
          >
            {t === "delivery" ? "Delivery" : "Takeaway"}
          </button>
        ))}
      </div>

      <div>
        <label className={labelClass}>Your Name</label>
        <input className={fieldClass} placeholder="Full name" value={form.name} onChange={update("name")} />
        {errors.name && <p className="mt-1 text-[11px] text-destructive">{errors.name}</p>}
      </div>

      <div>
        <label className={labelClass}>Phone / WhatsApp</label>
        <input className={fieldClass} placeholder="03xx xxxxxxx" value={form.phone} onChange={update("phone")} />
        {errors.phone && <p className="mt-1 text-[11px] text-destructive">{errors.phone}</p>}
      </div>

      {form.type === "delivery" && (
        <div>
          <label className={labelClass}>Delivery Address</label>
          <textarea
            rows={2}
            className={`${fieldClass} resize-none`}
            placeholder="Street, area, landmark…"
            value={form.address}
            onChange={update("address")}
          />
          {errors.address && <p className="mt-1 text-[11px] text-destructive">{errors.address}</p>}
        </div>
      )}

      <div>
        <label className={labelClass}>Special Instructions <span className="normal-case tracking-normal">(optional)</span></label>
        <textarea
          rows={2}
          className={`${fieldClass} resize-none`}
          placeholder="Spice level, allergies, extra sauce…"
          value={form.notes}
          onChange={update("notes")}
        />
      </div>

      <div className="border-t border-foreground/10 pt-4 space-y-1.5">
        <div className="flex justify-between text-[13px] text-muted-foreground">
          <span>Subtotal</span>
          <span>Rs. {total.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-[13px] text-muted-foreground">
          <span>Delivery fee</span>
          <span>{form.type === "delivery" ? "Calculated on call" : "—"}</span>
        </div>
        <div className="flex justify-between text-[15px] font-medium text-foreground border-t border-foreground/10 pt-2 mt-2">
          <span>Total (excl. delivery)</span>
          <span className="text-primary">Rs. {total.toLocaleString()}</span>
        </div>
      </div>

      <button
        type="submit"
        className="w-full rounded-full bg-primary py-4 text-[11px] uppercase tracking-[0.24em] text-primary-foreground transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2"
      >
        <MessageCircle className="h-4 w-4" />
        Place order via WhatsApp
      </button>

      <button
        type="button"
        onClick={onBack}
        className="w-full text-center text-[11px] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors"
      >
        ← Back to cart
      </button>

      <p className="text-center text-[11px] leading-relaxed text-muted-foreground">
        Your order details will open in WhatsApp for confirmation. Our team will call to confirm delivery time &amp; charges.
      </p>
    </form>
  );
}

/* ─── success screen ─────────────────────────────────── */
function SuccessScreen({ onReset }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center gap-5">
      <div className="ember-glow flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground">
        <CheckCircle2 className="h-7 w-7" />
      </div>
      <div>
        <h3 className="font-display text-2xl font-light">Order sent!</h3>
        <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground max-w-xs mx-auto">
          Your order has been sent to WhatsApp. Our team will call you shortly to confirm.
        </p>
      </div>
      <a
        href={CONTACT.phoneHref}
        className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors"
      >
        <Phone className="h-3.5 w-3.5" />
        {CONTACT.phone}
      </a>
      <button
        type="button"
        onClick={onReset}
        className="rounded-full border border-foreground/15 px-6 py-3 text-[11px] uppercase tracking-[0.2em] transition-colors hover:border-primary hover:text-primary"
      >
        Start a new order
      </button>
    </div>
  );
}

/* ─── main page ──────────────────────────────────────── */
export default function Order() {
  const [activeTab, setActiveTab] = useState("all");
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState({});           // { itemId: qty }
  const [cartOpen, setCartOpen] = useState(false);
  const [step, setStep] = useState("cart");        // "cart" | "checkout" | "done"
  const tabBarRef = useRef(null);

  /* filter items */
  const visible = useMemo(() => {
    return ALL_ITEMS.filter((item) => {
      const tabMatch = activeTab === "all" || CATEGORY_TAB_MAP[item.category] === activeTab;
      if (!tabMatch) return false;
      if (!query.trim()) return true;
      return normalize(item.name).includes(normalize(query));
    });
  }, [activeTab, query]);

  /* group visible items by category */
  const grouped = useMemo(() => {
    const map = new Map();
    visible.forEach((item) => {
      if (!map.has(item.category)) map.set(item.category, { label: item.categoryLabel, items: [] });
      map.get(item.category).items.push(item);
    });
    return [...map.values()];
  }, [visible]);

  /* cart helpers */
  const addItem = (id) => setCart((c) => ({ ...c, [id]: (c[id] ?? 0) + 1 }));
  const removeItem = (id) =>
    setCart((c) => {
      const next = { ...c };
      if ((next[id] ?? 0) <= 1) delete next[id];
      else next[id]--;
      return next;
    });
  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);
  const cartTotal = Object.entries(cart).reduce((sum, [id, qty]) => {
    const item = ALL_ITEMS.find((i) => i.id === id);
    return sum + (item?.price ?? 0) * qty;
  }, 0);
  const cartItems = Object.entries(cart)
    .filter(([, qty]) => qty > 0)
    .map(([id, qty]) => ({ item: ALL_ITEMS.find((i) => i.id === id), qty }))
    .filter((e) => e.item);

  const resetOrder = () => {
    setCart({});
    setStep("cart");
    setCartOpen(false);
  };

  /* scroll active tab into view */
  useEffect(() => {
    const btn = tabBarRef.current?.querySelector("[data-active='true']");
    btn?.scrollIntoView({ inline: "nearest", behavior: "smooth", block: "nearest" });
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-background">

      {/* ── top nav ── */}
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

            {/* search */}
            <div className="flex-1 max-w-sm relative ml-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
              <input
                type="search"
                placeholder="Search dishes…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full h-9 rounded-full border border-foreground/15 bg-transparent pl-9 pr-8 text-[13px] outline-none transition-colors focus:border-primary placeholder:text-muted-foreground/60"
              />
              {query && (
                <button type="button" onClick={() => setQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {/* cart button */}
            <button
              type="button"
              onClick={() => { setCartOpen(true); setStep("cart"); }}
              className="relative shrink-0 flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-[11px] uppercase tracking-[0.2em] text-primary-foreground transition-all hover:-translate-y-0.5"
            >
              <ShoppingBag className="h-4 w-4" />
              <span className="hidden sm:inline">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-foreground text-[10px] font-bold text-background">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* tab bar */}
          <div
            ref={tabBarRef}
            className="flex gap-1 overflow-x-auto pb-2 pt-1 -mx-1 px-1"
            style={{ scrollbarWidth: "none" }}
          >
            {ORDER_TABS.map((tab) => (
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

      {/* ── hero ── */}
      <div className="bg-foreground py-8 px-4 lg:px-12 text-background">
        <div className="mx-auto max-w-[1440px] flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.34em] text-background/50">
              Koyla Chai · Clifton, Karachi
            </p>
            <h1 className="mt-2 font-display text-4xl font-light tracking-[-0.02em] sm:text-5xl">
              Order Online
            </h1>
            <p className="mt-2 text-[13px] text-background/60 max-w-md">
              Browse, add to cart, and we confirm via WhatsApp. Delivery &amp; takeaway available every day 5 PM – 2 AM.
            </p>
          </div>
          <div className="flex gap-3 text-[11px] uppercase tracking-[0.2em] text-background/50 shrink-0">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-primary ember-glow" />
              Open till 2 AM
            </span>
          </div>
        </div>
      </div>

      {/* ── item grid ── */}
      <main className="mx-auto max-w-[1440px] px-4 py-8 lg:px-12">
        {grouped.length === 0 ? (
          <div className="py-24 text-center">
            <p className="text-muted-foreground text-sm">No items found for &ldquo;{query}&rdquo;</p>
            <button type="button" onClick={() => { setQuery(""); setActiveTab("all"); }}
              className="mt-4 text-[11px] uppercase tracking-[0.2em] text-primary hover:underline">
              Clear filters
            </button>
          </div>
        ) : (
          <div className="space-y-10">
            {grouped.map(({ label, items }) => (
              <section key={label}>
                <div className="flex items-center gap-4 mb-5">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary ember-glow shrink-0" />
                  <h2 className="font-display text-2xl font-light tracking-tight">{label}</h2>
                  <div className="flex-1 h-px bg-foreground/10" />
                </div>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {items.map((item) => (
                    <ItemCard
                      key={item.id}
                      item={item}
                      qty={cart[item.id] ?? 0}
                      onAdd={() => addItem(item.id)}
                      onRemove={() => removeItem(item.id)}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </main>

      {/* ── floating cart bar (when items in cart) ── */}
      {cartCount > 0 && !cartOpen && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 w-[calc(100%-2rem)] max-w-md">
          <button
            type="button"
            onClick={() => { setCartOpen(true); setStep("cart"); }}
            className="w-full flex items-center justify-between rounded-full bg-foreground px-6 py-4 text-background shadow-2xl transition-all hover:-translate-y-0.5"
          >
            <span className="flex items-center gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-[11px] font-bold">
                {cartCount}
              </span>
              <span className="text-[11px] uppercase tracking-[0.2em]">View cart</span>
            </span>
            <span className="text-[13px] font-medium text-background/80">
              Rs. {cartTotal.toLocaleString()}
            </span>
          </button>
        </div>
      )}

      {/* ── cart drawer ── */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-end">
          {/* backdrop */}
          <div
            className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
            onClick={() => setCartOpen(false)}
          />
          {/* panel */}
          <div className="relative w-full sm:w-[420px] h-[92dvh] sm:h-screen bg-background flex flex-col shadow-2xl">
            {/* drawer header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-foreground/10">
              <div>
                <h2 className="font-display text-2xl font-light">
                  {step === "checkout" ? "Checkout" : step === "done" ? "Order Placed" : "Your Cart"}
                </h2>
                {step === "cart" && cartCount > 0 && (
                  <p className="text-[11px] text-muted-foreground mt-0.5">{cartCount} item{cartCount !== 1 ? "s" : ""}</p>
                )}
              </div>
              <button
                type="button"
                onClick={() => setCartOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-foreground/15 transition-colors hover:border-primary hover:text-primary"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* drawer body */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {step === "done" ? (
                <SuccessScreen onReset={resetOrder} />
              ) : step === "checkout" ? (
                <CheckoutForm
                  cart={cart}
                  items={ALL_ITEMS}
                  total={cartTotal}
                  onBack={() => setStep("cart")}
                  onSuccess={() => setStep("done")}
                />
              ) : cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
                  <ShoppingBag className="h-10 w-10 text-foreground/20" />
                  <p className="text-muted-foreground text-sm">Your cart is empty.</p>
                  <button
                    type="button"
                    onClick={() => setCartOpen(false)}
                    className="text-[11px] uppercase tracking-[0.2em] text-primary hover:underline"
                  >
                    Browse menu
                  </button>
                </div>
              ) : (
                <div>
                  {cartItems.map(({ item, qty }) => (
                    <CartItem
                      key={item.id}
                      item={item}
                      qty={qty}
                      onAdd={() => addItem(item.id)}
                      onRemove={() => removeItem(item.id)}
                    />
                  ))}

                  <div className="mt-6 space-y-2 border-t border-foreground/10 pt-4">
                    <div className="flex justify-between text-[13px] text-muted-foreground">
                      <span>Subtotal ({cartCount} items)</span>
                      <span>Rs. {cartTotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-[13px] text-muted-foreground">
                      <span>Delivery fee</span>
                      <span>Confirmed on call</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* drawer footer */}
            {step === "cart" && cartItems.length > 0 && (
              <div className="px-6 py-5 border-t border-foreground/10">
                <div className="flex justify-between items-baseline mb-4">
                  <span className="text-[13px] text-muted-foreground">Total (excl. delivery)</span>
                  <span className="font-display text-2xl font-light text-primary">
                    Rs. {cartTotal.toLocaleString()}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setStep("checkout")}
                  className="w-full flex items-center justify-between rounded-full bg-primary px-6 py-4 text-[11px] uppercase tracking-[0.24em] text-primary-foreground transition-all hover:-translate-y-0.5"
                >
                  <span>Proceed to checkout</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setCartOpen(false)}
                  className="mt-3 w-full text-center text-[11px] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors"
                >
                  Continue browsing
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
