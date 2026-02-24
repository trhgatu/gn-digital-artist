import Hero from "@/features/home/components/Hero/Hero";
import About from "@/features/home/components/About/About";
import Gallery from "@/features/home/components/Gallery/Gallery";
import { GlobalCanvas } from "@/features/home/components/GlobalCanvas/GlobalCanvas";

export default function HomePage() {
  return (
    <main className="relative w-full bg-[#050505]">
      <GlobalCanvas />
      <Hero />
      <About />
      <Gallery />
    </main>
  );
}
