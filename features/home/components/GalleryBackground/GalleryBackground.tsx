"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

export default function GalleryBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current) return;

    // Start completely invisible (opacity: 0) at the top of the page.
    // Fade in to opacity: 1 gradually as we scroll down into the Gallery.
    gsap.fromTo(
      containerRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: `+=${window.innerHeight * 1}`, // Fade in over the first screen height
          scrub: true,
        },
      },
    );
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-20 pointer-events-none bg-[#050505] opacity-0"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vh] h-[100vw] rotate-90 opacity-20 mix-blend-screen">
        <Image
          src="/assets/images/gothic-background.jpg"
          alt="Gothic Texture"
          fill
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-[#8a0303]/10 mix-blend-multiply" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-[#8a0303]/20 blur-[150px] rounded-full mix-blend-screen" />
    </div>
  );
}
