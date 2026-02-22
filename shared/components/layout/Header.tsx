import Link from "next/link";

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 px-8 lg:px-16 py-8 flex justify-between items-center mix-blend-difference text-white pointer-events-none">
      <Link
        href="/"
        className="font-serif text-3xl font-bold italic tracking-widest pointer-events-auto"
      >
        GN.
      </Link>
      <nav className="flex gap-8 font-sans text-xs tracking-[0.2em] uppercase pointer-events-auto">
        <Link
          href="/"
          className="text-neutral-400 hover:text-white transition-colors"
        >
          Works
        </Link>
        <Link
          href="#about"
          className="text-neutral-400 hover:text-white transition-colors"
        >
          About
        </Link>
        <Link
          href="#contact"
          className="text-neutral-400 hover:text-white transition-colors"
        >
          Contact
        </Link>
      </nav>
    </header>
  );
};
