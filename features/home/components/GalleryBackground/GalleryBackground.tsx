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

    // Fade IN: invisible at top → fully visible after 1 screen scroll
    gsap.fromTo(
      containerRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: `+=${window.innerHeight * 1}`,
          scrub: true,
        },
      },
    );

    // Fade OUT: fade back to invisible when the Pact section enters the viewport
    const pactEl = document.querySelector("#pact");
    if (pactEl) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 1 },
        {
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: pactEl,
            start: "top 80%",
            end: "top 20%",
            scrub: true,
            refreshPriority: -1, // Recalculate AFTER Gallery pins inject their spacers
          },
        },
      );
    }
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
