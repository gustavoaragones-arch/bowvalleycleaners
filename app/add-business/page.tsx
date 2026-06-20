import type { Metadata } from "next";
import { Building2 } from "lucide-react";
import { AddBusinessForm } from "@/components/AddBusinessForm";

export const metadata: Metadata = {
  title: "Add Your Business | BowValleyCleaners.ca",
  description:
    "List your cleaning company in the Bow Valley directory. Add your service areas, specializations, ratings, and trust credentials to reach property managers and homeowners in Canmore and Banff.",
  alternates: {
    canonical: "https://bowvalleycleaners.ca/add-business",
  },
};

export default function AddBusinessPage() {
  return (
    <main className="flex-1" style={{ backgroundColor: "var(--bv-snow)" }}>

      <section
        className="border-b py-12 sm:py-16"
        style={{ borderColor: "var(--bv-border)", backgroundColor: "var(--bv-bone)" }}
      >
        <div className="bv-container max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium bv-hero-badge">
            <Building2 className="size-3" />
            Directory Listing
          </div>
          <h1 className="text-3xl font-playfair tracking-tight sm:text-4xl" style={{ color: "var(--bv-summit)" }}>
            Add Your Business
          </h1>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed" style={{ color: "var(--bv-slate)" }}>
            Complete the form below to publish your company profile in the Bow
            Valley cleaning directory. All fields map directly to your public
            listing card.
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="bv-container max-w-2xl">
          <div
            className="rounded-2xl border bg-white p-6 sm:p-8"
            style={{ borderColor: "var(--bv-border)" }}
          >
            <AddBusinessForm />
          </div>
          <p className="mt-6 text-center text-xs" style={{ color: "var(--bv-slate)" }}>
            Need help?{" "}
            <a href="mailto:contact@bowvalleycleaners.ca" className="bv-link hover:underline">
              contact@bowvalleycleaners.ca
            </a>
          </p>
        </div>
      </section>

    </main>
  );
}
