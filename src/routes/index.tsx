import { createFileRoute } from "@tanstack/react-router";
import { useReveal } from "@/hooks/useReveal";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StatsMarquee from "@/components/StatsMarquee";
import Capabilities from "@/components/Capabilities";
import Process from "@/components/Process";
import WhyUs from "@/components/WhyUs";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Algoniv — AI-powered software, built for the real world" },
      { name: "description", content: "A studio of senior engineers and applied scientists shipping production-grade AI systems, custom software, data platforms, and intelligent automation." },
      { property: "og:title", content: "Algoniv — AI-powered software, built for the real world" },
      { property: "og:description", content: "Senior-only pods. Eval-driven AI. We ship." },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Plus+Jakarta+Sans:wght@700;800&family=JetBrains+Mono:wght@400;500&display=swap",
      },
    ],
  }),
  component: Index,
});

function Index() {
  useReveal();
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <StatsMarquee />
        <Capabilities />
        <Process />
        <WhyUs />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
