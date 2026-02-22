"use client";

import Link from "next/link";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconMail,
} from "@tabler/icons-react";

const year = new Date().getFullYear();

export const Footer = () => (
  <footer className="w-full bg-[#050505] border-t border-neutral-900 text-white font-serif relative overflow-hidden py-24 px-8 lg:px-16">
    {/* Background noise texture */}
    <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.03] mix-blend-overlay bg-[url('https://upload.wikimedia.org/wikipedia/commons/7/76/1k_Dissolve_Noise_Texture.png')]" />

    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 relative z-10">
      {/* Logo area */}
      <div className="flex flex-col gap-6 lg:border-r border-neutral-900 lg:pr-8">
        <h2 className="text-6xl md:text-8xl font-bold italic tracking-tighter">
          GN.
        </h2>
        <p className="text-neutral-500 font-sans text-xs tracking-[0.2em] uppercase max-w-xs leading-relaxed">
          Digital Artist specializing in inking and horrific creatures.
        </p>
      </div>

      {/* Navigation */}
      <div className="flex flex-col gap-6">
        <h3 className="text-sm tracking-[0.3em] text-neutral-400 uppercase">
          Explore
        </h3>
        <div className="flex flex-col gap-4">
          {[
            { name: "Home", href: "/" },
            { name: "Projects", href: "/projects" },
            { name: "Timeline", href: "/about" },
            { name: "About me", href: "/contact" },
          ].map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="font-sans text-neutral-600 hover:text-white transition-colors uppercase tracking-widest text-xs w-fit"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Socials */}
      <div className="flex flex-col gap-6">
        <h3 className="text-sm tracking-[0.3em] text-neutral-400 uppercase">
          Connect
        </h3>
        <div className="flex gap-6">
          <Link
            href="mailto:contact@trhgatu.dev"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Email"
            className="text-neutral-600 hover:text-white transition-colors"
          >
            <IconMail stroke={1} size={24} />
          </Link>
          <Link
            href="https://www.facebook.com/motu43"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="text-neutral-600 hover:text-white transition-colors"
          >
            <IconBrandFacebook stroke={1} size={24} />
          </Link>
          <Link
            href="https://instagram.com/tu.trhgatu"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-neutral-600 hover:text-white transition-colors"
          >
            <IconBrandInstagram stroke={1} size={24} />
          </Link>
        </div>
        <p className="mt-2 text-neutral-700 font-serif text-sm italic tracking-widest">
          “Gaze into the abyss”
        </p>
      </div>

      {/* Credit */}
      <div className="flex flex-col gap-6 lg:items-end lg:text-right">
        <h3 className="text-sm tracking-[0.3em] text-neutral-400 uppercase">
          Credits
        </h3>
        <div className="text-neutral-600 font-sans text-xs uppercase tracking-widest space-y-3">
          <p>Designed & Developed by</p>
          <a
            href="https://thatu.is-a.dev"
            target="_blank"
            rel="noreferrer"
            className="text-neutral-300 hover:text-white hover:underline underline-offset-4 transition-all inline-block text-sm tracking-[0.2em]"
          >
            Trhgatu
          </a>
        </div>
      </div>
    </div>

    {/* Bottom bar */}
    <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-neutral-900 flex flex-col md:flex-row justify-between items-center gap-4 relative z-10 font-sans text-[10px] uppercase tracking-[0.3em] text-neutral-700">
      <p>&copy; {year} GN. All rights reserved.</p>
      <p>Digital Art Portfolio</p>
    </div>
  </footer>
);
