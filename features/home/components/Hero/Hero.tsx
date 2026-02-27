"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const textTitleRef = useRef<HTMLHeadingElement>(null);
  const textBgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Entrance Animation
    const tl = gsap.timeline();
    tl.fromTo(
      [textTitleRef.current, textBgRef.current],
      { opacity: 0, scale: 0.9, filter: "blur(10px)" },
      {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        duration: 2,
        ease: "power3.out",
        stagger: 0.2,
      },
    );

    // Mouse Parallax Effect
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const xPos = (e.clientX / innerWidth - 0.5) * 2; // -1 to +1
      const yPos = (e.clientY / innerHeight - 0.5) * 2;

      // Move text slightly opposite to mouse for depth
      gsap.to(textTitleRef.current, {
        x: xPos * -30,
        y: yPos * -20,
        rotationY: xPos * 5,
        rotationX: yPos * -5,
        ease: "power2.out",
        duration: 1,
      });

      // Background text moves even slower for parallax depth
      gsap.to(textBgRef.current, {
        x: xPos * -15,
        y: yPos * -10,
        ease: "power2.out",
        duration: 1.5,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden text-white z-10 selection:bg-red-900"
      style={{ perspective: "1000px" }}
    >
      <div
        ref={textTitleRef}
        className="relative z-20 flex flex-col w-full max-w-7xl mx-auto px-8 md:px-16 mt-[-20vh] md:mt-[-30vh] pointer-events-none"
        style={{ mixBlendMode: "difference" }}
      >
        <span className="text-7xl md:text-[12vw] font-cinzel text-white uppercase tracking-tighter drop-shadow-2xl leading-[0.8] self-start md:ml-[10%]">
          ART
        </span>
        <span className="text-6xl md:text-[8vw] font-serif italic text-white/90 lowercase tracking-widest drop-shadow-xl self-center mt-[-6vh] z-10">
          &
        </span>
        <span
          className="text-8xl md:text-[12vw] font-cinzel font-black italic uppercase tracking-tighter text-transparent leading-[0.8] self-end mt-[-2vh]"
          style={{
            WebkitTextStroke: "2px rgba(255,255,255,0.9)",
            filter: "drop-shadow(0 0 20px rgba(200,0,0,0.3))",
          }}
        >
          SOUL
        </span>
      </div>

      <div className="absolute inset-x-8 bottom-8 md:bottom-12 flex flex-row justify-between items-end pointer-events-none z-30 opacity-70">
        <div className="flex flex-col space-y-2">
          <span className="text-xs tracking-[0.5em] font-sans uppercase text-neutral-400">
            Digital Artist
          </span>
          <span className="text-sm font-serif italic text-red-800">
            Est. 2026
          </span>
        </div>

        <p className="text-right text-neutral-500 font-serif tracking-[0.2em] text-[10px] md:text-sm uppercase max-w-[200px] md:max-w-xs leading-relaxed">
          &quot;Draw first for yourself,
          <br />
          for half of your soul.&quot;
        </p>
      </div>
    </section>
  );
}
