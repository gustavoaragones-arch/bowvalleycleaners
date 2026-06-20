import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { MatchmakerForm } from "@/components/MatchmakerForm";
import { Shield, Clock, Star } from "lucide-react";

export const metadata: Metadata = {
  title: "Get 3 Free Cleaning Quotes | BowValleyCleaners.ca",
  description:
    "Tell us about your property and we'll match you with up to 3 specialized, vetted cleaners in Canmore, Banff, or across the Bow Valley — within 24 hours, no obligation.",
  alternates: {
    canonical: "https://bowvalleycleaners.ca/get-quote",
  },
};

function GetQuotePage({
  searchParams,
}: {
  searchParams: Promise<{ preferred_provider?: string }>;
}) {
  return (
    <Suspense fallback={null}>
      <GetQuoteInner searchParams={searchParams} />
    </Suspense>
  );
}

async function GetQuoteInner({
  searchParams,
}: {
  searchParams: Promise<{ preferred_provider?: string }>;
}) {
  const params = await searchParams;
  const provider = params.preferred_provider
    ? decodeURIComponent(params.preferred_provider)
    : "";

  return (
    <div className="flex min-h-screen flex-col" style={{ backgroundColor: "var(--bv-snow)" }}>
      <main className="flex flex-1 flex-col lg:flex-row">
        {/* LEFT PANEL */}
        <div className="relative flex flex-col justify-center bv-hero px-8 py-14 lg:w-2/5 lg:px-12 lg:py-0">
          <div className="relative">
            <Link href="/" className="mb-10 flex items-center gap-2 select-none no-underline">
              <span
                className="flex size-8 items-center justify-center rounded-lg text-sm font-black text-white font-playfair"
                style={{ backgroundColor: "var(--bv-amber)" }}
              >
                BV
              </span>
              <span className="text-sm font-semibold" style={{ color: "rgba(232,237,228,0.8)" }}>
                BowValleyCleaners.ca
              </span>
            </Link>

            <h1 className="text-3xl font-playfair leading-tight tracking-tight lg:text-4xl">
              Find Your Perfect Cleaner.
            </h1>
            <p className="mt-2 text-xl font-semibold" style={{ color: "var(--bv-amber)" }}>
              Get 3 tailored quotes in 24 hours.
            </p>
            <p className="mt-4 text-sm leading-relaxed" style={{ color: "rgba(232,237,228,0.65)" }}>
              Tell us about your property and we&apos;ll personally match you
              with vetted, specialist cleaners who serve your exact area.
            </p>

            {provider && (
              <div className="mt-5 inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm bv-hero-badge">
                <Star className="size-3.5" style={{ color: "var(--bv-amber)" }} />
                Preferred provider:{" "}
                <span className="font-semibold">{provider}</span>
              </div>
            )}

            <div className="mt-10 space-y-4">
              {[
                {
                  icon: <Clock className="size-4" style={{ color: "var(--bv-amber)" }} />,
                  title: "Quotes within 24 hours",
                  body: "Our matchmakers work fast so your property doesn't sit idle.",
                },
                {
                  icon: <Shield className="size-4" style={{ color: "var(--bv-sage)" }} />,
                  title: "No obligation, ever",
                  body: "Compare quotes and choose freely — we never charge you.",
                },
                {
                  icon: <Star className="size-4" style={{ color: "var(--bv-amber)" }} />,
                  title: "Only vetted specialists",
                  body: "Every cleaner in our directory is rated 4.5+ on Google.",
                },
              ].map(({ icon, title, body }) => (
                <div key={title} className="flex items-start gap-3">
                  <div
                    className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg"
                    style={{ backgroundColor: "rgba(232,237,228,0.1)" }}
                  >
                    {icon}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{title}</p>
                    <p className="text-xs" style={{ color: "rgba(232,237,228,0.5)" }}>{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="flex flex-1 items-start justify-center px-6 py-12 lg:items-center lg:px-12 lg:py-0">
          <div className="w-full max-w-lg">
            <MatchmakerForm preferredProvider={provider} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default GetQuotePage;
