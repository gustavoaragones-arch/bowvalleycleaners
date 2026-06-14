import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Search, Users, ShieldCheck, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About | BowValleyCleaners.ca — Canmore & Bow Valley Cleaning Directory",
  description:
    "Why we built an independent cleaning directory for the Bow Valley. Helping Canmore, Banff, and area residents find the right local cleaning specialist.",
};

export default function AboutPage() {
  return (
    <main className="flex-1">

      {/* ------------------------------------------------------------------ */}
      {/* HERO                                                                 */}
      {/* ------------------------------------------------------------------ */}
      <section className="bg-slate-950 px-4 py-20 text-center sm:px-6 sm:py-28">
        <div className="mx-auto max-w-2xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 text-xs font-medium text-sky-300">
            <MapPin className="size-3" /> Canmore, Alberta, Canada
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            A directory built for the Bow Valley
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-slate-300">
            Finding a reliable, specialized cleaner in this area shouldn&apos;t
            be a guessing game. We built this to make it simple.
          </p>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* THE PROBLEM                                                           */}
      {/* ------------------------------------------------------------------ */}
      <section className="px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-3xl space-y-6 text-base leading-relaxed text-foreground">

          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Why this exists
          </h2>

          <p className="text-muted-foreground">
            The Bow Valley — Canmore, Banff, Dead Man&apos;s Flats, Exshaw —
            is one of the most active short-term rental and luxury residential
            markets in Canada. Thousands of Airbnb properties, mountain chalets,
            and vacation homes turn over guests every week, year-round.
          </p>

          <p className="text-muted-foreground">
            Yet finding the right cleaning service here has always been harder
            than it should be. A Google search returns a mix of Calgary
            companies that don&apos;t actually serve the area, outdated listings,
            and generic cleaning franchises that aren&apos;t equipped for same-day
            STR turnovers or post-construction deep cleans.
          </p>

          <p className="text-muted-foreground">
            Property managers were sharing cleaner contacts through word of
            mouth. Homeowners were posting in Facebook groups. Visitors were
            taking their chances with whoever showed up on the first page of
            results. That&apos;s a problem worth solving.
          </p>

          <hr className="border-border" />

          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            What we do differently
          </h2>

          <div className="grid gap-6 sm:grid-cols-3">
            {[
              {
                icon: Search,
                title: "Hyper-local only",
                body: "Every listing is a business that actually operates in the Bow Valley. No Calgary-based companies padding results for towns they don't serve.",
              },
              {
                icon: Users,
                title: "Specialization-first",
                body: "We distinguish between Airbnb turnovers, luxury residential, post-construction, and commercial — because they genuinely require different skills and equipment.",
              },
              {
                icon: ShieldCheck,
                title: "Transparency over ads",
                body: "We display trust signals — insured, licensed, background-checked — clearly on every listing. Featured placements are labelled. We don't hide paid positions.",
              },
            ].map(({ icon: Icon, title, body }) => (
              <div key={title} className="rounded-xl border border-border bg-card p-5">
                <div className="mb-3 flex size-9 items-center justify-center rounded-lg bg-sky-50 text-sky-600">
                  <Icon className="size-4" />
                </div>
                <h3 className="mb-1 text-sm font-semibold text-foreground">{title}</h3>
                <p className="text-xs leading-relaxed text-muted-foreground">{body}</p>
              </div>
            ))}
          </div>

          <hr className="border-border" />

          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Who this is for
          </h2>

          <ul className="space-y-2 text-muted-foreground">
            {[
              "Airbnb and short-term rental hosts who need same-day turnovers between guests",
              "Property managers overseeing multiple units across Canmore and Banff",
              "Homeowners looking for a reliable recurring cleaner they can actually trust",
              "Developers and contractors who need post-construction deep cleans",
              "Seasonal residents and second-home owners who aren't around year-round",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm">
                <ArrowRight className="mt-0.5 size-3.5 shrink-0 text-sky-500" />
                {item}
              </li>
            ))}
          </ul>

          <hr className="border-border" />

          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            About this project
          </h2>

          <p className="text-muted-foreground">
            BowValleyCleaners.ca is an independent community resource. It was
            created and is maintained by a Canmore local who saw the same gap
            everyone else did — and decided to do something about it.
          </p>

          <p className="text-muted-foreground">
            BowValleyCleaners.ca is a community resource built and maintained
            by a Canmore local. This directory exists to make it easier for
            residents, property managers, and visitors in the Bow Valley to find
            the right cleaning specialist for their needs.
          </p>

          <p className="text-muted-foreground">
            This is not a national franchise directory or a venture-funded
            platform. It&apos;s a focused tool built for this specific community,
            kept accurate by people who live here.
          </p>

          <p className="text-muted-foreground">
            If you run a cleaning business in the Bow Valley and would like to
            be listed, or if you have feedback on a listing, reach out at{" "}
            <a
              href="mailto:contact@bowvalleycleaners.ca"
              className="text-sky-600 hover:underline"
            >
              contact@bowvalleycleaners.ca
            </a>
            .
          </p>

        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* CTA                                                                  */}
      {/* ------------------------------------------------------------------ */}
      <section className="border-t border-border bg-muted/30 px-4 py-12 text-center sm:px-6">
        <div className="mx-auto max-w-xl">
          <h2 className="text-xl font-bold text-foreground">
            Ready to find the right cleaner?
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Browse the full directory — filtered by area, specialty, and trust signals.
          </p>
          <Link
            href="/"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-sky-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 transition-colors"
          >
            Browse all cleaners <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

    </main>
  );
}
