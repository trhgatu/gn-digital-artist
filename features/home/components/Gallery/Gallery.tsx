"use client";

import React, { useRef } from "react";
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

  useGSAP(
    () => {
      if (!sectionRef.current || !trackRef.current) return;

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
      className="relative h-screen w-full bg-[#050505] overflow-hidden text-white border-t border-neutral-900/50"
    >
      <div
        ref={trackRef}
        className={`flex h-full w-max items-center ${trackPadding} gap-16 md:gap-32`}
      >
        {!isReverse && (
          <div className="flex flex-col justify-center h-full w-[80vw] md:w-[40vw] shrink-0">
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

        <div className="flex h-[80vh] items-center gap-8 md:gap-16">
          {items.map((project, i) => {
            // Determine dimensions based on size metadata to give Next Image a bounding box
            let heightClass = "h-[65vh]";
            let widthClass = "w-[65vw] md:w-[40vw]"; // Default Medium
            let sizesStr = "(max-width: 768px) 65vw, 40vw"; // Default Medium Sizes
            if (project.size === "large") {
              heightClass = "h-[80vh]";
              widthClass = "w-[85vw] md:w-[50vw]";
              sizesStr = "(max-width: 768px) 85vw, 50vw";
            }
            if (project.size === "small") {
              heightClass = "h-[50vh]";
              widthClass = "w-[50vw] md:w-[30vw]";
              sizesStr = "(max-width: 768px) 50vw, 30vw";
            }

            const yOffsets = ["self-start", "self-center", "self-end"];
            const randomAlign = yOffsets[i % yOffsets.length];

            return (
              <div
                key={project.id}
                className={`relative shrink-0 flex flex-col group ${heightClass} ${widthClass} ${randomAlign}`}
              >
                {/* Image Contaner strictly bounds the next/image fill */}
                <div className="relative w-full h-full">
                  <Image
                    src={project.src}
                    alt={project.title}
                    fill
                    sizes={sizesStr}
                    priority={i < 2} // Preload the first few
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
          <div className="flex flex-col items-end text-right justify-center h-full w-[80vw] md:w-[40vw] shrink-0">
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
  return (
    <div className="relative w-full bg-[#050505] selection:bg-red-900 leading-normal">
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
