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

      const scrollWidth = Math.max(
        0,
        trackRef.current.scrollWidth - window.innerWidth,
      );

      if (scrollWidth === 0) {
        gsap.set(trackRef.current, { x: 0 });
        return;
      }

      if (isReverse) {
        gsap.set(trackRef.current, { x: -scrollWidth });
        gsap.to(trackRef.current, {
          x: 0,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: `+=${scrollWidth}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      } else {
        gsap.to(trackRef.current, {
          x: -scrollWidth,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: `+=${scrollWidth}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
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
            let heightClass = "h-[60vh]";
            let widthClass = "w-[60vw] md:w-[40vw] lg:w-[35vw]";
            if (project.size === "large") {
              heightClass = "h-[80vh]";
              widthClass = "w-[80vw] md:w-[60vw] lg:w-[50vw]";
            }
            if (project.size === "small") {
              heightClass = "h-[40vh]";
              widthClass = "w-[40vw] md:w-[25vw] lg:w-[20vw]";
            }

            const yOffsets = ["self-start", "self-center", "self-end"];
            const randomAlign = yOffsets[i % yOffsets.length];

            return (
              <div
                key={project.id}
                className={`relative shrink-0 flex flex-col group ${heightClass} ${widthClass} ${randomAlign}`}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={project.src}
                    alt={project.title}
                    fill
                    className="object-contain object-center grayscale hover:grayscale-0 transition-all duration-700 ease-out group-hover:scale-105 drop-shadow-2xl"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="mt-4 flex flex-col opacity-0 group-hover:opacity-100 transition-opacity duration-500">
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
