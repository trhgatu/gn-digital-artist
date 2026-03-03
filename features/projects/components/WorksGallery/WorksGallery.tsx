"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { projects, ProjectCategory, Project } from "@/shared/data/projects";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

type FilterType = "all" | ProjectCategory;

const filters: { label: string; value: FilterType }[] = [
  { label: "All Works", value: "all" },
  { label: "Des Gothic", value: "des-gothic" },
  { label: "Monsters", value: "monster" },
  { label: "Visuals & Char", value: "visual-char" },
];

export const WorksGallery = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedProject]);

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  useGSAP(() => {
    if (!gridRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".project-card",
        { y: 50, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.05,
          ease: "back.out(1.2)",
          overwrite: "auto",
        },
      );
    }, gridRef);

    return () => ctx.revert();
  }, [activeFilter]);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen pb-32 px-4 md:px-12 lg:px-24"
    >
      <style>{`
        .card-image-wrap {
          transition: filter 0.7s ease;
          will-change: filter;
        }
        .card-glow .card-image-wrap {
          filter:
            drop-shadow(0 0 4px rgba(255, 0, 0, 0.4))
            drop-shadow(0 0 12px rgba(161, 0, 0, 0.3))
            drop-shadow(0 0 28px rgba(102, 0, 0, 0.2))
            drop-shadow(0 0 50px rgba(138, 3, 3, 0.1));
        }
        .card-glow:hover .card-image-wrap {
          filter:
            drop-shadow(0 0 6px rgba(255, 0, 0, 0.9))
            drop-shadow(0 0 16px rgba(161, 0, 0, 0.8))
            drop-shadow(0 0 35px rgba(102, 0, 0, 0.6))
            drop-shadow(0 0 70px rgba(138, 3, 3, 0.4))
            drop-shadow(0 0 100px rgba(138, 3, 3, 0.25));
        }
      `}</style>
      <div className="flex flex-wrap items-center justify-center gap-6 mb-16 md:mb-24 relative z-20">
        {filters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => setActiveFilter(filter.value)}
            className={`text-xs md:text-sm font-sans tracking-[0.2em] uppercase transition-all duration-500 ${
              activeFilter === filter.value
                ? "text-[#ff1a1a] drop-shadow-[0_0_8px_rgba(255,0,0,0.8)] scale-110"
                : "text-neutral-500 hover:text-neutral-300"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>
      <div
        ref={gridRef}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-x-12 md:gap-y-16 relative z-20"
      >
        {filteredProjects.map((project) => {
          return (
            <div
              key={`${project.id}-${activeFilter}`}
              className="project-card card-glow group w-full flex flex-col cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              <div className="card-image-wrap relative w-full aspect-3/4 overflow-hidden bg-[#0a0a0a]/50 border border-white/5 rounded-sm">
                <Image
                  src={project.src}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-10 transition-opacity duration-500" />
              </div>

              <div className="mt-6 flex flex-col">
                <span className="text-[10px] font-sans tracking-[0.3em] text-[#8a0303] uppercase mb-2">
                  {project.category.replace("-", " ")}
                </span>
                <span className="text-2xl font-cinzel text-neutral-300 group-hover:text-white transition-colors duration-300">
                  {project.title}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      {selectedProject && (
        <div
          className="fixed inset-0 z-9999 flex items-center justify-center bg-black/95 p-4 md:p-12 cursor-zoom-out"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative w-full h-full max-w-7xl max-h-[90vh] cursor-default flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 md:top-8 md:right-8 text-white/70 hover:text-white text-4xl md:text-5xl transition-colors z-10000 p-4 bg-black/50 hover:bg-black/80 rounded-full backdrop-blur-sm"
              onClick={() => setSelectedProject(null)}
              title="Close"
            >
              &times;
            </button>
            <Image
              src={selectedProject.src}
              alt={selectedProject.title}
              fill
              className="object-contain"
              priority
              sizes="100vw"
            />
          </div>
        </div>
      )}
    </section>
  );
};
