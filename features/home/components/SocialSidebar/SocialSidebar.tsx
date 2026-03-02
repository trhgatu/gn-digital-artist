"use client";

import { FaFacebook, FaTiktok, FaDeviantart } from "react-icons/fa";
import { SiThreads } from "react-icons/si";

const SOCIALS = [
  {
    href: "https://www.deviantart.com/cachetgn",
    label: "DeviantArt",
    Icon: FaDeviantart,
  },
  {
    href: "https://www.facebook.com/motu43",
    label: "Facebook",
    Icon: FaFacebook,
  },
  {
    href: "https://www.threads.net/@ginkomegane",
    label: "Threads",
    Icon: SiThreads,
  },
  {
    href: "https://www.tiktok.com/@cachet4k",
    label: "TikTok",
    Icon: FaTiktok,
  },
];

export default function SocialSidebar() {
  return (
    <>
      {/* ── Desktop: fixed vertical sidebar (centered) ── */}
      <aside
        className="fixed left-5 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-center gap-6"
        aria-label="Social links"
      >
        {SOCIALS.map(({ href, label, Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="group relative flex items-center"
          >
            {/* Tooltip slides in to the right on hover */}
            <span className="absolute left-9 text-[9px] tracking-[0.3em] font-sans uppercase text-neutral-500 whitespace-nowrap opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out pointer-events-none">
              {label}
            </span>
            <span className="flex items-center justify-center w-8 h-8 rounded-full border border-neutral-800 group-hover:border-[#8a0303]/50 group-hover:bg-[#8a0303]/10 transition-all duration-300">
              <Icon
                size={16}
                className="text-neutral-500 group-hover:text-[#8a0303] group-hover:scale-110 transition-all duration-300"
              />
            </span>
          </a>
        ))}
        <div className="w-px h-16 bg-neutral-800" />
      </aside>

      {/* ── Mobile: fixed bottom bar ── */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-50 flex md:hidden items-center justify-center gap-6 py-3 bg-[#050505]/90 backdrop-blur-sm border-t border-neutral-900"
        aria-label="Social links"
      >
        {SOCIALS.map(({ href, label, Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="flex items-center justify-center w-9 h-9 rounded-full border border-neutral-800 hover:border-[#8a0303]/50 hover:bg-[#8a0303]/10 transition-all duration-300"
          >
            <Icon
              size={16}
              className="text-neutral-500 hover:text-[#8a0303] transition-colors duration-300"
            />
          </a>
        ))}
      </nav>
    </>
  );
}
