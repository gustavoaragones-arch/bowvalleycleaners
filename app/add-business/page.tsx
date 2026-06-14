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
    <main className="flex-1">

      <section className="border-b border-border bg-muted/30 px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700">
            <Building2 className="size-3" />
            Directory Listing
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Add Your Business
          </h1>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
            Complete the form below to publish your company profile in the Bow
            Valley cleaning directory. All fields map directly to your public
            listing card.
          </p>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
            <AddBusinessForm />
          </div>
          <p className="mt-6 text-center text-xs text-muted-foreground">
            Need help?{" "}
            <a
              href="mailto:contact@bowvalleycleaners.ca"
              className="text-sky-600 hover:underline"
            >
              contact@bowvalleycleaners.ca
            </a>
          </p>
        </div>
      </section>

    </main>
  );
}
