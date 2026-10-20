import { MessageCircle } from "lucide-react";
import Nav from "@/components/site/Nav";
import Hero from "@/components/site/Hero";
import Story from "@/components/site/Story";
import Cuisines from "@/components/site/Cuisines";
import Venues from "@/components/site/Venues";
import Events from "@/components/site/Events";
import Reserve from "@/components/site/Reserve";
import SeoContent from "@/components/site/SeoContent";
import Visit from "@/components/site/Visit";
import { CONTACT } from "@/data/site";

export default function Home() {
  return (
    <div className="overflow-x-hidden bg-background">
      <Nav />
      <main>
        <Hero />
        <Story />
        <Cuisines />
        <Venues />
        <Events />
        <Reserve />
        <SeoContent />
      </main>
      <Visit />
      <a
        href={`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent("Hello Koyla Chai! I would like more information.")}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with Koyla Chai on WhatsApp"
        className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_12px_30px_-10px_rgba(226,88,34,0.9)] transition-transform hover:scale-105"
      >
        <MessageCircle className="h-5 w-5" />
      </a>
    </div>
  );
}