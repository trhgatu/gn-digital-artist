import { GlobalCanvas } from "@/features/home/components/GlobalCanvas/GlobalCanvas";
import Hero from "@/features/home/components/Hero/Hero";
import About from "@/features/home/components/About/About";
import Gallery from "@/features/home/components/Gallery/Gallery";
import Pact from "@/features/home/components/Pact/Pact";
import SocialSidebar from "@/features/home/components/SocialSidebar/SocialSidebar";

export default function HomePage() {
  return (
    <>
      <GlobalCanvas />
      <SocialSidebar />
      <div className="relative z-10 w-full">
        <Hero />
        <About />
        <Gallery />
        <Pact />
      </div>
    </>
  );
}
