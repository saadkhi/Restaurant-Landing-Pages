import { useState } from "react";
import { Check, MessageCircle } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { CONTACT } from "@/data/site";

const TIMES = [
  "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM",
  "8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM", "10:00 PM", "10:30 PM",
  "11:00 PM", "11:30 PM", "12:00 AM", "12:30 AM", "1:00 AM", "1:30 AM",
];

const VENUE_OPTIONS = [
  "No preference",
  "The Rooftop",
  "Gorilla Lounge",
  "Juliet Room",
  "Indoor Dining Hall",
  "Poolside",
];

const OCCASIONS = [
  "Casual dining",
  "Birthday",
  "Anniversary",
  "Bridal / mehndi",
  "Private event",
  "Corporate",
  "Other",
];

const GUESTS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13+"];

const fieldClass =
  "w-full border-0 border-b border-foreground/20 bg-transparent py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary";
const labelClass = "text-[10px] uppercase tracking-[0.24em] text-muted-foreground";

export default function Reserve() {
  const today = new Date().toISOString().split("T")[0];
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    date: today,
    time: "8:00 PM",
    guests: "2",
    venue: "No preference",
    occasion: "Casual dining",
    notes: "",
  });
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const update = (key) => (event) => setForm((prev) => ({ ...prev, [key]: event.target.value }));

  const buildWhatsAppMessage = () => {
    const lines = [
      `Hello Koyla Chai! I would like to request a table.`,
      ``,
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      form.email ? `Email: ${form.email}` : null,
      `Date: ${form.date}`,
      `Time: ${form.time}`,
      `Guests: ${form.guests}`,
      `Venue preference: ${form.venue}`,
      `Occasion: ${form.occasion}`,
      form.notes ? `Notes: ${form.notes}` : null,
    ]
      .filter(Boolean)
      .join("\n");
    return lines;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.date || !form.time) {
      setError("Please add your name, phone number, date and time so we can hold the table.");
      return;
    }
    setError("");

    const message = buildWhatsAppMessage();
    const url = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noreferrer");
    setSubmitted(true);
  };

  const resetForm = () => {
    setSubmitted(false);
    setError("");
    setForm({
      name: "",
      phone: "",
      email: "",
      date: today,
      time: "8:00 PM",
      guests: "2",
      venue: "No preference",
      occasion: "Casual dining",
      notes: "",
    });
  };

  return (
    <section id="reserve" className="scroll-mt-24 border-t border-foreground/10 py-24 lg:py-36">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          <Reveal>
            <SectionHeading
              eyebrow="Reservations"
              title="Hold a table for tonight."
              intro="Tell us when you are coming and which part of Koyla Chai you would like to sit in. Walk-ins are always welcome, but weekends and rooftop seating fill up early."
            />
            <div className="mt-12 space-y-6 border-t border-foreground/10 pt-8">
              <div>
                <p className={labelClass}>Opening hours</p>
                <p className="mt-2 text-sm text-foreground">{CONTACT.hours}</p>
              </div>
              <div>
                <p className={labelClass}>Reservations desk</p>
                <p className="mt-2 text-sm text-foreground">
                  <a href={CONTACT.phoneHref} className="transition-colors hover:text-primary">
                    {CONTACT.phone}
                  </a>
                  <span className="mx-2 text-muted-foreground">/</span>
                  <a href={CONTACT.mobileHref} className="transition-colors hover:text-primary">
                    {CONTACT.mobile}
                  </a>
                </p>
              </div>
              <div>
                <p className={labelClass}>Large groups &amp; events</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  For 13 or more guests, private rooms, poolside events or full-hall bookings, send us
                  the details through WhatsApp and our team will plan it with you.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="border border-foreground/12 bg-card p-7 lg:p-10">
              {submitted ? (
                <div className="flex h-full flex-col justify-center py-6">
                  <span className="ember-glow flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Check className="h-5 w-5" />
                  </span>
                  <h3 className="mt-7 font-display text-3xl font-light leading-tight lg:text-4xl">
                    Your request is on its way.
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    Your reservation details have been sent to us on WhatsApp. Our team will confirm
                    your table by phone shortly.
                  </p>
                  <p className="mt-6 text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                    Didn't open WhatsApp?
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Call us on{" "}
                    <a href={CONTACT.phoneHref} className="text-primary hover:underline">
                      {CONTACT.phone}
                    </a>{" "}
                    and we will sort it out.
                  </p>
                  <div className="mt-9 flex flex-wrap gap-4">
                    <button
                      type="button"
                      onClick={resetForm}
                      className="inline-flex items-center border-b border-foreground/25 pb-1 text-[11px] uppercase tracking-[0.2em] transition-colors hover:border-primary hover:text-primary"
                    >
                      Make another booking
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-7">
                  <div className="grid gap-7 sm:grid-cols-2">
                    <div>
                      <label className={labelClass} htmlFor="name">
                        Your name
                      </label>
                      <input
                        id="name"
                        className={fieldClass}
                        placeholder="Full name"
                        value={form.name}
                        onChange={update("name")}
                      />
                    </div>
                    <div>
                      <label className={labelClass} htmlFor="phone">
                        Phone or WhatsApp
                      </label>
                      <input
                        id="phone"
                        className={fieldClass}
                        placeholder="03xx xxxxxxx"
                        value={form.phone}
                        onChange={update("phone")}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={labelClass} htmlFor="email">
                      Email <span className="normal-case tracking-normal">(optional)</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      className={fieldClass}
                      placeholder="you@email.com"
                      value={form.email}
                      onChange={update("email")}
                    />
                  </div>

                  <div className="grid gap-7 sm:grid-cols-3">
                    <div>
                      <label className={labelClass} htmlFor="date">
                        Date
                      </label>
                      <input
                        id="date"
                        type="date"
                        min={today}
                        className={fieldClass}
                        value={form.date}
                        onChange={update("date")}
                      />
                    </div>
                    <div>
                      <label className={labelClass} htmlFor="time">
                        Time
                      </label>
                      <select id="time" className={fieldClass} value={form.time} onChange={update("time")}>
                        {TIMES.map((slot) => (
                          <option key={slot} value={slot}>
                            {slot}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className={labelClass} htmlFor="guests">
                        Guests
                      </label>
                      <select
                        id="guests"
                        className={fieldClass}
                        value={form.guests}
                        onChange={update("guests")}
                      >
                        {GUESTS.map((count) => (
                          <option key={count} value={count}>
                            {count}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid gap-7 sm:grid-cols-2">
                    <div>
                      <label className={labelClass} htmlFor="venue">
                        Where would you like to sit
                      </label>
                      <select id="venue" className={fieldClass} value={form.venue} onChange={update("venue")}>
                        {VENUE_OPTIONS.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className={labelClass} htmlFor="occasion">
                        Occasion
                      </label>
                      <select
                        id="occasion"
                        className={fieldClass}
                        value={form.occasion}
                        onChange={update("occasion")}
                      >
                        {OCCASIONS.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className={labelClass} htmlFor="notes">
                      Anything we should know
                    </label>
                    <textarea
                      id="notes"
                      rows={3}
                      className={`${fieldClass} resize-none`}
                      placeholder="Birthday cake, high chair, seating preference…"
                      value={form.notes}
                      onChange={update("notes")}
                    />
                  </div>

                  {error ? <p className="text-sm text-destructive">{error}</p> : null}

                  <button
                    type="submit"
                    className="w-full rounded-full bg-primary px-8 py-4 text-[11px] uppercase tracking-[0.24em] text-primary-foreground transition-all hover:-translate-y-0.5"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <MessageCircle className="h-4 w-4" />
                      Request my table via WhatsApp
                    </span>
                  </button>
                  <p className="text-center text-[11px] leading-relaxed text-muted-foreground">
                    No prepayment needed. We confirm every booking over the phone.
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
