"use client";

import { motion } from "framer-motion";

const tosContent = [
  {
    title: "Payment Methods",
    content:
      "Payments are accepted exclusively via Direct Bank Transfer. Details will be provided upon agreement.",
  },
  {
    title: "Commission Types",
    content:
      "Each commission type has its own specific terms and conditions. We categorize our services into three primary types:",
    list: [
      "Inking Art (ILLUSTRATION)",
      "Monster Sketch Design",
      "Gothic Sketch Design",
    ],
  },
  {
    title: "Turnaround Time & Rush Fees",
    content:
      "The typical completion time ranges from 3 to 6 weeks depending on complexity.",
    list: [
      "Rush Fee: 70k - 200k VND.",
      "Commission requests may be declined if the requested deadline is too restrictive or beyond current capacity.",
    ],
  },
  {
    title: "Cancellations & Intellectual Property",
    content:
      "If the client initiates a cancellation, no refunds will be issued and the client loses all rights to use any Work-In-Progress (WIP) materials. For design commissions, the artist retains the right to reuse design elements (with original characters removed) for personal projects.",
  },
  {
    title: "Usage Rights & Publication",
    content:
      "By default, all completed commissions are considered samples and the artist reserves the right to showcase them on social media and other platforms.",
    list: [
      "Private Commission Fee: +30% of total value.",
      "Commercial Use: 3x total commission value.",
    ],
  },
  {
    title: "Complexity Surcharge",
    content:
      "Additional charges ranging from 70k to 300k VND may apply for highly detailed or complex requests.",
  },
  {
    title: "Revisions",
    content:
      "Two comprehensive revision rounds are included (up to 90% changes). Starting from the third revision, a surcharge of 10k to 50k VND per edit will be applied based on complexity.",
  },
  {
    title: "Artist Attribution",
    content:
      "Appropriate credit to the artist (GN.) must be maintained whenever the work is shared or published.",
  },
  {
    title: "Deliverables",
    content:
      "For Sketch Design commissions, clients will receive both a full-resolution digital file and a transparent background version via email.",
  },
  {
    // Payment Schedule
    title: "Payment Schedule",
    list: [
      "10% Deposit: Required after slot confirmation and brief finalization.",
      "30% - 50% Milestone: Due after the initial sketch is approved.",
      "Final Payment: The remaining balance is due after completion and final approval.",
    ],
  },
];

export default function TosPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white pt-32 pb-24 px-8 lg:px-16 relative overflow-hidden">
      {/* Texture Overlay */}
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.03] mix-blend-overlay bg-[url('https://upload.wikimedia.org/wikipedia/commons/7/76/1k_Dissolve_Noise_Texture.png')]" />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 border-l-2 border-white pl-8"
        >
          <h1 className="text-5xl md:text-7xl font-cinzel font-bold tracking-tighter mb-4">
            Terms of Service.
          </h1>
          <p className="text-neutral-500 font-sans text-xs tracking-[0.3em] uppercase">
            Last Updated: April 2026
          </p>
        </motion.div>

        <div className="space-y-12">
          {tosContent.map((item, index) => (
            <motion.section
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <h2 className="text-2xl font-cinzel tracking-widest text-neutral-200 group-hover:text-[#ff1a1a] transition-colors mb-4 flex items-baseline gap-4">
                <span className="text-xs md:text-sm text-[#ff1a1a] font-mono tracking-widest opacity-100 shrink-0 pt-1">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {item.title}
              </h2>
              {item.content && (
                <p className="text-neutral-300 font-sans text-base leading-relaxed mb-4 max-w-2xl">
                  {item.content}
                </p>
              )}
              {item.list && (
                <ul className="space-y-3">
                  {item.list.map((li, i) => (
                    <li key={i} className="flex gap-4 items-start">
                      <span className="w-1.5 h-1.5 bg-neutral-700 mt-2 rotate-45 group-hover:bg-red-900 transition-colors shrink-0" />
                      <span className="text-neutral-400 text-base font-sans tracking-wide group-hover:text-neutral-200 transition-colors">
                        {li}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </motion.section>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-24 pt-12 border-t border-neutral-900"
        >
          <p className="text-neutral-500 font-serif italic text-xl tracking-widest leading-relaxed">
            “By commissioning me, you acknowledge and agree to the terms listed
            above.”
          </p>
        </motion.div>
      </div>
    </div>
  );
}
