import { GlobalCanvas } from "@/features/home/components/GlobalCanvas/GlobalCanvas";
import Hero from "@/features/home/components/Hero/Hero";
import About from "@/features/home/components/About/About";
import Gallery from "@/features/home/components/Gallery/Gallery";
import Pact from "@/features/home/components/Pact/Pact";
import GalleryBackground from "@/features/home/components/GalleryBackground";

export default function HomePage() {
  return (
    <>
      <GalleryBackground />
      <GlobalCanvas />

      {/* Front Content Layer: Z-index 10 ensures it sits above the Canvas (Z-0) */}
      <div className="relative z-10 w-full">
        <Hero />
        <About />
        <Gallery />
        <Pact />
      </div>
    </>
  );
}
