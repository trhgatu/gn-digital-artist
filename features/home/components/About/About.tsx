"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current || !leftColRef.current || !rightColRef.current)
        return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
          end: "bottom bottom",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        leftColRef.current,
        { y: 100, opacity: 0, filter: "blur(10px) grayscale(100%)" },
        {
          y: 0,
          opacity: 0.8,
          filter: "blur(0px) grayscale(100%)",
          duration: 1.5,
          ease: "power3.out",
        },
      ).fromTo(
        rightColRef.current.children,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power2.out" },
        "-=1.0",
      );
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full flex items-center z-10 text-white selection:bg-red-900 overflow-hidden"
    >
      <div className="absolute inset-0 bg-linear-to-b from-transparent to-[#050505] pointer-events-none z-0"></div>

      <div className="relative z-20 grid grid-cols-1 md:grid-cols-2 w-full px-8 md:px-16 lg:px-24 gap-12 max-w-7xl mx-auto">
        <div
          ref={leftColRef}
          className="relative w-full aspect-3/4 md:aspect-auto md:h-[80vh] flex items-center justify-center opacity-0"
        >
          <div className="relative w-full h-[80%] max-w-sm ml-auto mr-12 overflow-hidden border border-neutral-800/50 shadow-2xl">
            <Image
              src="/assets/images/avt.png"
              alt="The Architect of Nightmares"
              fill
              className="object-cover object-center grayscale hover:grayscale-0 transition-all duration-1000 ease-in-out hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 mix-blend-overlay opacity-30 bg-[url('https://upload.wikimedia.org/wikipedia/commons/7/76/1k_Dissolve_Noise_Texture.png')]" />
          </div>
        </div>
        <div
          ref={rightColRef}
          className="flex flex-col justify-center space-y-8 py-24 md:pr-12"
        >
          <h2 className="text-sm font-sans tracking-[0.3em] text-neutral-500 uppercase">
            The Architect of Nightmares
          </h2>

          <div className="space-y-6 text-neutral-300 font-serif leading-relaxed text-lg md:text-xl">
            <p>
              <span className="text-5xl font-cinzel text-[#8a0303] float-left mr-3 mt-1 leading-none drop-shadow-[0_0_15px_rgba(138,3,3,0.5)]">
                I
              </span>
              n the quietest hours of the night, when the boundary between
              realms thins, I find my canvas. I am a digital artist obsessed
              with the macabre, the forgotten, and the creatures that lurk just
              beyond the periphery of our vision.
            </p>
            <p>
              My work is an exploration of darkness, not as a void, but as a
              space rich with untold stories. Through intricate inking and
              visceral digital painting, I seek to capture the haunting beauty
              within the grotesque.
            </p>
            <p>
              Every stroke is a pact with the shadows. I do not merely draw
              monsters; I excavate them from the collective unconscious, giving
              form to our deepest, most primal fears.
            </p>
          </div>

          {/* Tools row */}
          {(() => {
            const TOOLS = [
              { src: "/assets/icons/medibang.svg", alt: "MediBang Paint" },
              { src: "/assets/icons/pts.svg", alt: "Photoshop" },
            ];
            return (
              <div className="pt-2">
                <div className="w-12 h-px bg-neutral-700 mb-4" />
                <p className="text-[10px] tracking-[0.4em] text-neutral-400 uppercase mb-3 font-sans">
                  Tools
                </p>
                <div className="flex items-center gap-5">
                  {TOOLS.map((tool) => (
                    <div
                      key={tool.src}
                      className="relative w-8 h-8 opacity-70 hover:opacity-100 transition-opacity duration-300"
                    >
                      <Image
                        src={tool.src}
                        alt={tool.alt}
                        fill
                        sizes="32px"
                        className="object-contain invert"
                      />
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}
        </div>
      </div>
    </section>
  );
}
