"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const tiers = [
  {
    id: "sketch-monster",
    name: "Sketch Design Monster",
    description:
      "Exclusive to the demonic and the monstrous. A clean, full-body character sketch accompanied by detailed marginalia and lore notes.",
    features: [
      "Clean & polished digital sketch",
      "Full-body monster/demon design",
      "Path: Semi-Human OR Non-Human",
      "2 Full-demo revisions included",
      "Price scales with complexity",
    ],
    price: "From $1,100",
    image: "/assets/projects/monsters/asaktra.png",
  },
  {
    id: "sketch-gothic",
    name: "Sketch Design Gothic",
    description:
      "Tailored for dark fantasy and Victorian aesthetics. Custom gothic dress designs for your Character or OC, fully realized in a clean sketch with marginalia.",
    features: [
      "Clean & polished digital sketch",
      "Full-body gothic character/OC design",
      "Custom outfits & architectural motifs",
      "2 Full-demo revisions included",
      "Price scales with complexity",
    ],
    price: "From $1,100",
    image: "/assets/projects/des-gothic/dg6.png",
  },
  {
    id: "illustration",
    name: "Illustration",
    description:
      "A fully realized summoning. Available in both Traditional (A4) and Digital media. Choose your crop for the perfect composition.",
    features: [
      "Waist-up: $360 (Tradi) / $360 (Digi)",
      "Halfbody: $450 (Tradi) / $450 (Digi)",
      "Fullbody: $550 (Tradi) / $550 (Digi)",
      "Highly detailed & atmospheric rendering",
      "Custom backgrounds & complex lighting",
    ],
    price: "From $360",
    image: "/assets/projects/visuals/kantel-board.png",
  },
];

export default function Pact() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      gsap.fromTo(
        cardsRef.current,
        {
          y: 100,
          opacity: 0,
          rotationY: 15,
          filter: "grayscale(100%) blur(10px)",
        },
        {
          y: 0,
          opacity: 1,
          rotationY: 0,
          filter: "grayscale(100%) blur(0px)",
          duration: 1.2,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="pact"
      className="relative min-h-screen w-full bg-transparent py-32 px-8 lg:px-16 flex flex-col items-center justify-center border-t border-neutral-900/80"
    >
      <div className="text-center mb-24 max-w-2xl relative z-10">
        <h2 className="text-sm font-sans tracking-[0.4em] text-[#8a0303] uppercase mb-6">
          The Pact
        </h2>
        <h3 className="text-5xl md:text-7xl font-cinzel text-neutral-200 uppercase tracking-widest drop-shadow-2xl mb-8">
          Commissions
        </h3>
        <p className="text-neutral-400 font-sans text-sm leading-relaxed tracking-widest">
          Bind your vision to the canvas. Select a tier of manifestation and let
          the nightmare take form.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 w-full max-w-7xl">
        {tiers.map((tier, index) => (
          <div
            key={tier.id}
            ref={(el) => {
              if (el) cardsRef.current[index] = el;
            }}
            className="group relative flex flex-col bg-[#080808] border border-neutral-900 overflow-hidden transition-all duration-700 hover:-translate-y-4 hover:border-[#8a0303]/50 hover:shadow-[0_0_40px_rgba(138,3,3,0.1)]"
          >
            <div className="h-64 w-full relative overflow-hidden border-b border-neutral-900 grayscale group-hover:grayscale-0 transition-all duration-700">
              <Image
                width={200}
                height={200}
                src={tier.image}
                alt={tier.name}
                className="w-full h-full object-cover object-top opacity-50 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#080808] to-transparent" />
            </div>
            <div className="flex flex-col grow p-8">
              <h4 className="font-cinzel text-2xl text-neutral-200 mb-2 uppercase">
                {tier.name}
              </h4>
              <p className="font-sans text-[#8a0303] text-lg tracking-widest mb-6 border-b border-neutral-900 pb-6">
                {tier.price}
              </p>

              <p className="text-neutral-500 font-sans text-xs leading-relaxed tracking-widest mb-8 min-h-16">
                {tier.description}
              </p>

              <ul className="flex flex-col gap-3 font-sans text-xs tracking-widest text-neutral-400 uppercase mb-12 grow">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-[#8a0303] mt-px">⨯</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="#contact"
                className="w-full py-4 border border-neutral-800 text-center font-sans tracking-[0.3em] text-xs uppercase text-neutral-400 hover:text-white hover:border-[#8a0303] hover:bg-[#8a0303]/10 transition-all duration-300"
              >
                Summon
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
