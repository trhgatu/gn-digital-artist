"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { IconMenu2, IconX } from "@tabler/icons-react";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Works", href: "/works" },
    { name: "TOS", href: "/tos" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 px-8 lg:px-16 py-8 flex justify-between items-center mix-blend-difference text-white pointer-events-none">
        <Link
          href="/"
          className="font-serif text-3xl font-bold italic tracking-widest pointer-events-auto"
        >
          GN.
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8 font-sans text-xs tracking-[0.2em] uppercase pointer-events-auto">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-neutral-400 hover:text-white transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden pointer-events-auto">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white p-2"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-12 md:hidden"
          >
            <div className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="font-cinzel text-4xl text-neutral-400 hover:text-white transition-colors uppercase tracking-[0.2em]"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Subtle background text */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-neutral-800 font-serif italic text-4xl opacity-20 pointer-events-none select-none whitespace-nowrap">
              “Gaze into the abyss”
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
