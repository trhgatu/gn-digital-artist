"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export const WorksHero = () => {
  const containerRef = useRef<HTMLElement>(null);
  const textTitleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      textTitleRef.current,
      { opacity: 0, scale: 0.9, filter: "blur(10px)" },
      {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        duration: 2,
        ease: "power3.out",
      },
    );

    const qX = gsap.quickTo(textTitleRef.current, "x", {
      ease: "power2.out",
      duration: 1,
    });
    const qY = gsap.quickTo(textTitleRef.current, "y", {
      ease: "power2.out",
      duration: 1,
    });
    const qRotY = gsap.quickTo(textTitleRef.current, "rotationY", {
      ease: "power2.out",
      duration: 1,
    });
    const qRotX = gsap.quickTo(textTitleRef.current, "rotationX", {
      ease: "power2.out",
      duration: 1,
    });

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const xPos = (e.clientX / innerWidth - 0.5) * 2;
      const yPos = (e.clientY / innerHeight - 0.5) * 2;

      qX(xPos * -30);
      qY(yPos * -20);
      qRotY(xPos * 5);
      qRotX(yPos * -5);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-[80vh] md:h-screen w-full flex flex-col items-center justify-center overflow-hidden z-10 selection:bg-red-900"
      style={{ perspective: "1000px" }}
    >
      <div className="absolute inset-x-0 bottom-0 top-0 -z-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vw] md:w-screen md:h-screen bg-[#8a0303]/10 blur-[100px] rounded-full mix-blend-screen" />
        <div className="absolute inset-0 bg-linear-to-b from-[#050505] via-transparent to-[#050505]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)] opacity-20" />
      </div>

      <div
        ref={textTitleRef}
        className="relative z-20 flex flex-col w-full max-w-7xl mx-auto px-8 md:px-16 pointer-events-none items-center mt-[-10vh]"
        style={{ mixBlendMode: "difference" }}
      >
        <div className="flex gap-4 md:gap-8 items-center justify-center overflow-hidden">
          <span className="text-5xl md:text-8xl lg:text-[10vw] font-cinzel text-neutral-200 uppercase drop-shadow-2xl leading-none">
            THE
          </span>
          <span
            className="text-5xl md:text-8xl lg:text-[10vw] font-cinzel text-transparent uppercase drop-shadow-2xl leading-none"
            style={{
              WebkitTextStroke: "2px rgba(255,255,255,0.9)",
              filter: "drop-shadow(0 0 20px rgba(200,0,0,0.3))",
            }}
          >
            ARCHIVES
          </span>
        </div>
        <p className="hero-subtitle mt-8 text-xs md:text-sm tracking-[0.4em] text-[#8a0303] uppercase font-sans">
          A Collection of Dark Visions
        </p>
      </div>
    </section>
  );
};
