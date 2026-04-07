import { ContactHero } from "@/features/contact/components/ContactHero";
import { ContactForm } from "@/features/contact/components/ContactForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with GN Digital Artist for commissions, collaborations, and enquiries.",
};

export default function ContactPage() {
  return (
    <>
      <div className="relative z-10 w-full bg-transparent overflow-hidden selection:bg-red-900">
        <ContactHero />
        <ContactForm />
      </div>
    </>
  );
}
