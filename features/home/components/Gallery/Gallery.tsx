"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Project, projects } from "@/shared/data/projects";

gsap.registerPlugin(ScrollTrigger);

const desGothicProjects = projects.filter((p) => p.category === "des-gothic");
const monsterProjects = projects.filter((p) => p.category === "monster");
const visualCharProjects = projects.filter((p) => p.category === "visual-char");

interface GalleryRowProps {
  title: string;
  subtitle: string;
  items: Project[];
  isReverse?: boolean;
}

function GalleryRow({
  title,
  subtitle,
  items,
  isReverse = false,
}: GalleryRowProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLElement[]>([]);

  const updateGlow = () => {
    if (cardsRef.current.length === 0) return;
    const cards = cardsRef.current;
    const vCenter = window.innerWidth / 2;
    const threshold = window.innerWidth * 0.35;
    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.left + rect.width / 2;
      const dist = Math.abs(cardCenter - vCenter);
      if (dist < threshold) {
        card.classList.add("card-glow");
      } else {
        card.classList.remove("card-glow");
      }
    });
  };

  useEffect(() => {
    if (cardContainerRef.current) {
      cardsRef.current = Array.from(
        cardContainerRef.current.querySelectorAll<HTMLElement>(".gallery-card"),
      );
      // Init glow immediately
      updateGlow();
    }
  }, [items]);

  useGSAP(
    () => {
      if (!sectionRef.current || !trackRef.current) return;

      gsap.set(trackRef.current, { autoAlpha: 1 });

      const getScrollWidth = () =>
        Math.max(0, trackRef.current!.scrollWidth - window.innerWidth);

      if (isReverse) {
        gsap.fromTo(
          trackRef.current,
          { x: () => -getScrollWidth() },
          {
            x: 0,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: () => `+=${window.innerHeight * 3}`,
              pin: true,
              anticipatePin: 1,
              scrub: 1,
              invalidateOnRefresh: true,
              onUpdate: updateGlow,
            },
          },
        );
      } else {
        gsap.fromTo(
          trackRef.current,
          { x: 0 },
          {
            x: () => -getScrollWidth(),
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: () => `+=${window.innerHeight * 3}`,
              pin: true,
              anticipatePin: 1,
              scrub: 1,
              invalidateOnRefresh: true,
              onUpdate: updateGlow,
            },
          },
        );
      }
    },
    { scope: sectionRef },
  );

  const trackPadding = isReverse
    ? "pl-[20vw] pr-[10vw]"
    : "pl-[10vw] pr-[20vw]";

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full bg-transparent overflow-hidden"
    >
      <style>{`
        .card-image-wrap {
          transition: filter 0.7s ease;
        }
        .card-glow .card-image-wrap {
          filter:
            drop-shadow(0 0 4px rgba(255, 0, 0, 0.8))    /* Tight hot core */
            drop-shadow(0 0 12px rgba(161, 0, 0, 0.7))   /* Medium spread */
            drop-shadow(0 0 28px rgba(102, 0, 0, 0.5))   /* Wide diffusion */
            drop-shadow(0 0 50px rgba(138, 3, 3, 0.3))   /* Very wide base */
            drop-shadow(0 0 80px rgba(138, 3, 3, 0.15)); /* Ambient soft glow */
        }
      `}</style>
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vh] h-[100vw] rotate-90 opacity-10 mix-blend-screen">
          <Image
            src="/assets/images/gothic-background.jpg"
            alt="Gothic Texture"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-[#8a0303]/5 mix-blend-multiply" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-[#8a0303]/15 blur-[120px] rounded-full mix-blend-screen" />
      </div>
      <div
        ref={trackRef}
        className={`invisible flex h-full w-max items-center ${trackPadding} gap-16 md:gap-32`}
      >
        {!isReverse && (
          <div className="relative z-30 flex flex-col justify-center h-full w-[80vw] md:w-[40vw] shrink-0">
            <h2 className="text-sm font-sans tracking-[0.3em] text-[#8a0303] uppercase mb-4">
              {subtitle}
            </h2>
            <h3 className="text-5xl md:text-8xl font-cinzel text-neutral-200 uppercase drop-shadow-2xl">
              {title.split(" ").map((word, i) => (
                <span key={i} className="block">
                  {word}
                </span>
              ))}
            </h3>
          </div>
        )}

        <div
          ref={cardContainerRef}
          className="flex h-[90vh] items-center gap-8 md:gap-24"
        >
          {items.map((project, i) => {
            let heightClass = "h-[75vh]";
            let widthClass = "w-[75vw] md:w-[50vw]";
            let sizesStr = "(max-width: 768px) 75vw, 50vw";
            if (project.size === "large") {
              heightClass = "h-[88vh]";
              widthClass = "w-[90vw] md:w-[60vw]";
              sizesStr = "(max-width: 768px) 90vw, 60vw";
            }
            if (project.size === "small") {
              heightClass = "h-[65vh]";
              widthClass = "w-[60vw] md:w-[38vw]";
              sizesStr = "(max-width: 768px) 60vw, 38vw";
            }

            const yOffsets = ["self-start", "self-center", "self-end"];
            const randomAlign = yOffsets[i % yOffsets.length];

            return (
              <div
                key={project.id}
                className={`gallery-card relative z-30 shrink-0 flex flex-col group ${heightClass} ${widthClass} ${randomAlign}`}
              >
                <div className="card-image-wrap relative w-full h-full">
                  <Image
                    src={project.src}
                    alt={project.title}
                    fill
                    sizes={sizesStr}
                    priority={i < 2}
                    className="object-contain grayscale hover:grayscale-0 transition-all duration-700 ease-out group-hover:scale-[1.02] drop-shadow-2xl"
                  />
                </div>

                <div className="mt-4 flex flex-col shrink-0">
                  <span className="text-xs font-sans tracking-[0.2em] text-[#8a0303] uppercase">
                    {project.category.replace("-", " ")}
                  </span>
                  <span className="text-xl font-cinzel text-neutral-300">
                    {project.title}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {isReverse && (
          <div className="relative z-30 flex flex-col items-end text-right justify-center h-full w-[80vw] md:w-[40vw] shrink-0">
            <h2 className="text-sm font-sans tracking-[0.3em] text-[#8a0303] uppercase mb-4">
              {subtitle}
            </h2>
            <h3 className="text-5xl md:text-8xl font-cinzel text-neutral-200 uppercase drop-shadow-2xl">
              {title.split(" ").map((word, i) => (
                <span key={i} className="block">
                  {word}
                </span>
              ))}
            </h3>
          </div>
        )}
      </div>
      <div className="absolute top-0 left-0 right-0 h-32 bg-linear-to-b from-[#050505] to-transparent pointer-events-none z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-[#050505] to-transparent pointer-events-none z-10" />
    </section>
  );
}

export default function Gallery() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={wrapperRef}
      className="relative z-0 w-full bg-transparent selection:bg-red-900 leading-normal"
    >
      <GalleryRow
        title="Des Gothic"
        subtitle="Chapter I"
        items={desGothicProjects}
      />

      <GalleryRow
        title="Monsters"
        subtitle="Chapter II"
        items={monsterProjects}
        isReverse={true}
      />

      <GalleryRow
        title="Visuals & Char"
        subtitle="Chapter III"
        items={visualCharProjects}
      />
    </div>
  );
}
