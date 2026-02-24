"use client";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen w-full overflow-hidden text-white z-10 selection:bg-red-900">
      <div className="absolute inset-0 z-20 grid grid-cols-1 md:grid-cols-3 items-center pointer-events-none p-8 md:p-16 lg:p-24 gap-8">
        {/* Left Column: Main Title */}
        <div className="flex flex-col items-center md:items-start justify-center">
          <h1
            className="flex flex-col items-center md:items-start text-7xl md:text-8xl lg:text-9xl font-cinzel text-white uppercase tracking-widest text-left"
            style={{ mixBlendMode: "difference" }}
          >
            <span className="block opacity-90 drop-shadow-2xl">ART &</span>
            <span
              className="block opacity-90 font-bold italic"
              style={{ filter: "blur(1px)" }}
            >
              SOUL
            </span>
          </h1>
        </div>

        {/* Center Column: Reserved for 3D Ring */}
        <div className="hidden md:block w-full h-full"></div>

        {/* Right Column: Subtitle & Quote */}
        <div className="flex flex-col items-center md:items-end justify-center text-center md:text-right space-y-12 mt-8 md:mt-0">
          <span className="block text-xl md:text-2xl tracking-[1em] font-sans font-light text-neutral-400">
            GN VISIONS
          </span>
          <p className="text-neutral-600 font-serif tracking-[0.2em] text-sm uppercase max-w-xs leading-relaxed">
            &quot;Draw first for yourself,
            <br />
            for half of your soul.&quot;
          </p>
        </div>
      </div>
    </section>
  );
}
