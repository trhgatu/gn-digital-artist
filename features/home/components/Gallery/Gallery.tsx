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
  const [hasMounted, setHasMounted] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    setHasMounted(true);
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useGSAP(
    () => {
      if (!sectionRef.current || !trackRef.current || isMobile || !hasMounted)
        return;

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
    { scope: sectionRef, dependencies: [isMobile, hasMounted] },
  );

  if (!hasMounted) return null;

  // --- MOBILE VERSION (Vertical List) ---
  if (isMobile) {
    return (
      <section className="relative w-full py-24 px-8 bg-transparent">
        {/* Background Texture */}
        <div className="absolute inset-0 -z-10 pointer-events-none opacity-10">
          <Image
            src="/assets/images/gothic-background.jpg"
            alt="Gothic Texture"
            fill
            className="object-cover"
          />
        </div>

        {/* Title Section */}
        <div className="mb-16">
          <h2 className="text-sm font-sans tracking-[0.3em] text-[#8a0303] uppercase mb-4">
            {subtitle}
          </h2>
          <h3 className="text-5xl font-cinzel text-neutral-200 uppercase">
            {title.split(" ").map((word, i) => (
              <span key={i} className="inline-block mr-4">
                {word}
              </span>
            ))}
          </h3>
        </div>

        {/* Vertical List of Items */}
        <div className="flex flex-col gap-20">
          {items.slice(0, 4).map((project) => (
            <div key={project.id} className="flex flex-col group">
              <div
                className={`relative w-full card-glow overflow-hidden ${
                  project.size === "large"
                    ? "h-[50vh]"
                    : project.size === "small"
                      ? "h-[35vh]"
                      : "h-[42vh]"
                }`}
              >
                <Image
                  src={project.src}
                  alt={project.title}
                  fill
                  sizes="100vw"
                  className="object-contain grayscale hover:grayscale-0 transition-grayscale duration-700"
                />
              </div>
              <div className="mt-3">
                <span className="text-xs font-sans tracking-[0.2em] text-[#8a0303] uppercase">
                  {project.category.replace("-", " ")}
                </span>
                <p className="text-2xl font-cinzel text-neutral-300 mt-1">
                  {project.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // --- DESKTOP VERSION (Horizontal Scroll & Pinning) ---
  const trackPadding = isReverse
    ? "pl-[20vw] pr-[10vw]"
    : "pl-[10vw] pr-[20vw]";

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-transparent overflow-hidden"
    >
      <style>{`
        .card-image-wrap {
          transition: filter 0.7s ease;
          will-change: filter;
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
        className={`flex h-full w-max items-center ${trackPadding} gap-32`}
      >
        <div
          className={`relative z-30 flex flex-col justify-center h-full shrink-0 w-[40vw] ${
            isReverse ? "items-end text-right" : ""
          }`}
        >
          <h2 className="text-sm font-sans tracking-[0.3em] text-[#8a0303] uppercase mb-4">
            {subtitle}
          </h2>
          <h3 className="text-8xl font-cinzel text-neutral-200 uppercase drop-shadow-2xl">
            {title.split(" ").map((word, i) => (
              <span key={i} className="block">
                {word}
              </span>
            ))}
          </h3>
        </div>

        <div className="flex h-[90vh] items-center gap-24">
          {items.map((project, i) => {
            const heightClass =
              project.size === "large"
                ? "h-[88vh]"
                : project.size === "small"
                  ? "h-[65vh]"
                  : "h-[75vh]";
            const widthClass =
              project.size === "large"
                ? "w-[60vw]"
                : project.size === "small"
                  ? "w-[38vw]"
                  : "w-[50vw]";

            const yOffsets = ["self-start", "self-center", "self-end"];
            const desktopAlign = yOffsets[i % yOffsets.length];

            return (
              <div
                key={project.id}
                className={`gallery-card card-glow relative z-30 shrink-0 flex flex-col group ${heightClass} ${widthClass} ${desktopAlign}`}
              >
                <div className="card-image-wrap relative w-full h-full">
                  <Image
                    src={project.src}
                    alt={project.title}
                    fill
                    sizes="50vw"
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
          <div className="relative z-30 flex flex-col items-end text-right justify-center h-full w-[40vw] shrink-0">
            <h2 className="text-sm font-sans tracking-[0.3em] text-[#8a0303] uppercase mb-4">
              {subtitle}
            </h2>
            <h3 className="text-8xl font-cinzel text-neutral-200 uppercase drop-shadow-2xl">
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
