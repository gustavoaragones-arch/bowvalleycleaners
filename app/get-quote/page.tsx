import type { Metadata } from "next";
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

// Reads ?preferred_provider= from the URL — passed by CompanyCard CTA
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
    <div className="flex min-h-screen flex-col bg-background">
      <main className="flex flex-1 flex-col lg:flex-row">
        {/* ---------------------------------------------------------------- */}
        {/* LEFT PANEL — value prop                                           */}
        {/* ---------------------------------------------------------------- */}
        <div className="relative flex flex-col justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-8 py-14 text-white lg:w-2/5 lg:px-12 lg:py-0">
          {/* Mountain texture */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 400'%3E%3Cpolygon fill='white' points='0,400 200,100 400,250 600,50 800,200 1000,80 1200,300 1200,400'/%3E%3C/svg%3E\")",
              backgroundSize: "cover",
              backgroundPosition: "bottom",
            }}
          />

          <div className="relative">
            <a href="/" className="mb-10 flex items-center gap-2 select-none">
              <span className="flex size-8 items-center justify-center rounded-lg bg-sky-600 text-sm font-black text-white">
                BV
              </span>
              <span className="text-sm font-semibold text-white/80">
                BowValleyCleaners.ca
              </span>
            </a>

            <h1 className="text-3xl font-extrabold leading-tight tracking-tight lg:text-4xl">
              Find Your Perfect Cleaner.
            </h1>
            <p className="mt-2 text-xl font-semibold text-sky-300">
              Get 3 tailored quotes in 24 hours.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-slate-300">
              Tell us about your property and we&apos;ll personally match you
              with vetted, specialist cleaners who serve your exact area.
            </p>

            {provider && (
              <div className="mt-5 inline-flex items-center gap-2 rounded-xl border border-sky-500/30 bg-sky-500/10 px-3 py-2 text-sm text-sky-300">
                <Star className="size-3.5 fill-sky-400 text-sky-400" />
                Preferred provider:{" "}
                <span className="font-semibold text-white">{provider}</span>
              </div>
            )}

            <div className="mt-10 space-y-4">
              {[
                {
                  icon: <Clock className="size-4 text-sky-400" />,
                  title: "Quotes within 24 hours",
                  body: "Our matchmakers work fast so your property doesn't sit idle.",
                },
                {
                  icon: <Shield className="size-4 text-emerald-400" />,
                  title: "No obligation, ever",
                  body: "Compare quotes and choose freely — we never charge you.",
                },
                {
                  icon: <Star className="size-4 text-amber-400" />,
                  title: "Only vetted specialists",
                  body: "Every cleaner in our directory is rated 4.5+ on Google.",
                },
              ].map(({ icon, title, body }) => (
                <div key={title} className="flex items-start gap-3">
                  <div className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg bg-white/10">
                    {icon}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{title}</p>
                    <p className="text-xs text-slate-400">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* RIGHT PANEL — form                                                */}
        {/* ---------------------------------------------------------------- */}
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
