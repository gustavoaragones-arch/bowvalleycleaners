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
    <main className="flex-1" style={{ backgroundColor: "var(--bv-snow)" }}>

      {/* HERO */}
      <section className="bv-hero py-20 text-center sm:py-28">
        <div className="bv-container">
          <div className="mx-auto max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium bv-hero-badge">
              <MapPin className="size-3" /> Canmore, Alberta, Canada
            </div>
            <h1 className="text-4xl font-playfair tracking-tight sm:text-5xl">
              A directory built for the Bow Valley
            </h1>
            <p
              className="mx-auto mt-5 max-w-xl text-base leading-relaxed"
              style={{ color: "rgba(232,237,228,0.65)" }}
            >
              Finding a reliable, specialized cleaner in this area shouldn&apos;t
              be a guessing game. We built this to make it simple.
            </p>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-16 sm:py-20">
        <div className="bv-container max-w-3xl space-y-6 text-base leading-relaxed">

          <h2 className="text-2xl font-playfair tracking-tight sm:text-3xl" style={{ color: "var(--bv-summit)" }}>
            Why this exists
          </h2>

          <p style={{ color: "var(--bv-slate)" }}>
            The Bow Valley — Canmore, Banff, Dead Man&apos;s Flats, Exshaw —
            is one of the most active short-term rental and luxury residential
            markets in Canada. Thousands of Airbnb properties, mountain chalets,
            and vacation homes turn over guests every week, year-round.
          </p>

          <p style={{ color: "var(--bv-slate)" }}>
            Yet finding the right cleaning service here has always been harder
            than it should be. A Google search returns a mix of Calgary
            companies that don&apos;t actually serve the area, outdated listings,
            and generic cleaning franchises that aren&apos;t equipped for same-day
            STR turnovers or post-construction deep cleans.
          </p>

          <p style={{ color: "var(--bv-slate)" }}>
            Property managers were sharing cleaner contacts through word of
            mouth. Homeowners were posting in Facebook groups. Visitors were
            taking their chances with whoever showed up on the first page of
            results. That&apos;s a problem worth solving.
          </p>

          <hr style={{ borderColor: "var(--bv-border)" }} />

          <h2 className="text-2xl font-playfair tracking-tight sm:text-3xl" style={{ color: "var(--bv-summit)" }}>
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
              <div
                key={title}
                className="rounded-xl border bg-white p-5"
                style={{ borderColor: "var(--bv-border)" }}
              >
                <div className="mb-3 flex size-9 items-center justify-center rounded-lg bv-icon-box">
                  <Icon className="size-4" />
                </div>
                <h3 className="mb-1 text-sm font-semibold" style={{ color: "var(--bv-summit)" }}>{title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: "var(--bv-slate)" }}>{body}</p>
              </div>
            ))}
          </div>

          <hr style={{ borderColor: "var(--bv-border)" }} />

          <h2 className="text-2xl font-playfair tracking-tight sm:text-3xl" style={{ color: "var(--bv-summit)" }}>
            Who this is for
          </h2>

          <ul className="space-y-2" style={{ color: "var(--bv-slate)" }}>
            {[
              "Airbnb and short-term rental hosts who need same-day turnovers between guests",
              "Property managers overseeing multiple units across Canmore and Banff",
              "Homeowners looking for a reliable recurring cleaner they can actually trust",
              "Developers and contractors who need post-construction deep cleans",
              "Seasonal residents and second-home owners who aren't around year-round",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm">
                <ArrowRight className="mt-0.5 size-3.5 shrink-0" style={{ color: "var(--bv-amber)" }} />
                {item}
              </li>
            ))}
          </ul>

          <hr style={{ borderColor: "var(--bv-border)" }} />

          <h2 className="text-2xl font-playfair tracking-tight sm:text-3xl" style={{ color: "var(--bv-summit)" }}>
            About this project
          </h2>

          <p style={{ color: "var(--bv-slate)" }}>
            BowValleyCleaners.ca is an independent community resource. It was
            created and is maintained by a Canmore local who saw the same gap
            everyone else did — and decided to do something about it. New STR
            hosts can start with our{" "}
            <Link href="/resources/new-host" className="bv-link hover:underline">
              guide to hiring an STR cleaner in the Bow Valley
            </Link>
            .
          </p>

          <p style={{ color: "var(--bv-slate)" }}>
            BowValleyCleaners.ca is a community resource built and maintained
            by a Canmore local. This directory exists to make it easier for
            residents, property managers, and visitors in the Bow Valley to find
            the right cleaning specialist for their needs.
          </p>

          <p style={{ color: "var(--bv-slate)" }}>
            This is not a national franchise directory or a venture-funded
            platform. It&apos;s a focused tool built for this specific community,
            kept accurate by people who live here.
          </p>

          <p style={{ color: "var(--bv-slate)" }}>
            If you run a cleaning business in the Bow Valley and would like to
            be listed, or if you have feedback on a listing, reach out at{" "}
            <a href="mailto:contact@bowvalleycleaners.ca" className="bv-link hover:underline">
              contact@bowvalleycleaners.ca
            </a>
            .
          </p>

        </div>
      </section>

      {/* CTA */}
      <section
        className="border-t py-12 text-center"
        style={{ borderColor: "var(--bv-border)", backgroundColor: "var(--bv-bone)" }}
      >
        <div className="bv-container max-w-xl">
          <h2 className="text-xl font-playfair" style={{ color: "var(--bv-summit)" }}>
            Ready to find the right cleaner?
          </h2>
          <p className="mt-2 text-sm" style={{ color: "var(--bv-slate)" }}>
            Browse the full directory — filtered by area, specialty, and trust signals.
          </p>
          <Link
            href="/"
            className="mt-5 inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold bv-btn-primary transition-opacity"
          >
            Browse all cleaners <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

    </main>
  );
}
