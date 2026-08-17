import { useRevealAll, useSpotlight } from "@/lib/motion";
import { Cursor, Intro, ScrollProgress } from "@/components/Chrome";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Work from "@/components/Work";
import InHouse from "@/components/InHouse";
import Method from "@/components/Method";
import Studio from "@/components/Studio";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function App() {
  useRevealAll();
  useSpotlight();

  return (
    <div className="grain relative min-h-screen bg-ink">
      <Intro />
      <ScrollProgress />
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <Work />
        <InHouse />
        <Method />
        <Studio />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
