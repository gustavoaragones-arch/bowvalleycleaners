import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Phone,
  Globe,
  Star,
  MapPin,
  Clock,
  ArrowLeft,
  MessageSquare,
  CheckCircle2,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SPECIALIZATION_COLORS, SPECIALIZATION_COLOR_FALLBACK, type CompanyFull, type Specialization } from "@/types/company";

// ---------------------------------------------------------------------------
// Data fetching
// ---------------------------------------------------------------------------
async function getCompany(slug: string): Promise<CompanyFull | null> {
  const { data, error } = await supabase
    .from("companies_full")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !data) return null;
  return data as CompanyFull;
}

// ---------------------------------------------------------------------------
// generateMetadata — dynamic SEO per company
// ---------------------------------------------------------------------------
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const company = await getCompany(slug);

  if (!company) {
    return {
      title: "Company Not Found | BowValleyCleaners.ca",
    };
  }

  const primaryArea = company.service_areas[0] ?? "the Bow Valley";
  const primarySpec = company.specializations[0];
  const ratingStr = company.google_rating
    ? `${company.google_rating}★ rated`
    : "top-rated";

  const title = `Hire ${company.name} — ${ratingStr} Cleaning in ${primaryArea} | BowValleyCleaners.ca`;

  const descParts = [
    `${company.name} is a ${ratingStr} cleaning service`,
    company.service_areas.length > 0
      ? `serving ${company.service_areas.join(", ")}`
      : "in the Bow Valley",
    primarySpec ? `specializing in ${primarySpec}` : "",
    company.review_count > 0
      ? `with ${company.review_count} verified reviews`
      : "",
    "Get a quote today.",
  ]
    .filter(Boolean)
    .join(". ");

  return {
    title,
    description: descParts,
    openGraph: {
      title,
      description: descParts,
      url: `https://bowvalleycleaners.ca/company/${slug}`,
      siteName: "BowValleyCleaners.ca",
      locale: "en_CA",
      type: "website",
    },
    alternates: {
      canonical: `https://bowvalleycleaners.ca/company/${slug}`,
    },
  };
}

// ---------------------------------------------------------------------------
// generateStaticParams — pre-render all company pages at build time
// ---------------------------------------------------------------------------
export async function generateStaticParams() {
  const { data } = await supabase
    .from("companies")
    .select("slug")
    .eq("is_active", true);

  return (data ?? []).map((row: { slug: string }) => ({ slug: row.slug }));
}

// ---------------------------------------------------------------------------
// Star rating display
// ---------------------------------------------------------------------------
function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            className={cn(
              "size-4",
              i < Math.round(rating)
                ? "fill-amber-400 text-amber-400"
                : "fill-amber-100 text-amber-200"
            )}
          />
        ))}
      </div>
      <span className="text-lg font-bold tabular-nums">{rating.toFixed(1)}</span>
      <span className="text-sm text-muted-foreground">
        ({count.toLocaleString()} Google reviews)
      </span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default async function CompanyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const company = await getCompany(slug);

  if (!company) notFound();

  const {
    name,
    tagline,
    google_rating,
    review_count,
    years_in_business,
    phone_number,
    website_url,
    email,
    is_featured,
    service_areas,
    specializations,
  } = company;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
          {/* Back link */}
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="size-3.5" />
            Back to directory
          </Link>

          {/* ---------------------------------------------------------------- */}
          {/* COMPANY HERO                                                      */}
          {/* ---------------------------------------------------------------- */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
              {/* Logo / initials */}
              <div className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 text-xl font-black text-slate-600 ring-1 ring-slate-200 select-none sm:size-20">
                {name
                  .split(" ")
                  .slice(0, 2)
                  .map((w) => w[0])
                  .join("")
                  .toUpperCase()}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-start gap-2">
                  <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                    {name}
                  </h1>
                  {is_featured && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-sky-500 px-2.5 py-0.5 text-xs font-bold text-white uppercase tracking-wide">
                      <Star className="size-2.5 fill-white" />
                      Featured
                    </span>
                  )}
                </div>

                {tagline && (
                  <p className="mt-1.5 text-base text-muted-foreground leading-relaxed">
                    {tagline}
                  </p>
                )}

                {google_rating !== null && (
                  <div className="mt-3">
                    <StarRating rating={google_rating} count={review_count} />
                  </div>
                )}
              </div>
            </div>

            {/* ---------------------------------------------------------------- */}
            {/* STATS ROW                                                         */}
            {/* ---------------------------------------------------------------- */}
            {years_in_business !== null && (
              <div className="mt-6 flex flex-wrap gap-4 border-t border-border pt-5">
                <div className="flex items-center gap-2 text-sm">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-emerald-50 ring-1 ring-emerald-200">
                    <Clock className="size-4 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">
                      {years_in_business} years
                    </p>
                    <p className="text-xs text-muted-foreground">In business</p>
                  </div>
                </div>

                {google_rating !== null && (
                  <div className="flex items-center gap-2 text-sm">
                    <div className="flex size-8 items-center justify-center rounded-lg bg-amber-50 ring-1 ring-amber-200">
                      <Star className="size-4 fill-amber-400 text-amber-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">
                        {google_rating.toFixed(1)} / 5.0
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Google rating
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-2 text-sm">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-sky-50 ring-1 ring-sky-200">
                    <CheckCircle2 className="size-4 text-sky-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Verified</p>
                    <p className="text-xs text-muted-foreground">
                      Listed business
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {/* ---------------------------------------------------------------- */}
            {/* SERVICE AREAS                                                     */}
            {/* ---------------------------------------------------------------- */}
            {service_areas.length > 0 && (
              <div className="rounded-xl border border-border bg-card p-5">
                <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground uppercase tracking-wide">
                  <MapPin className="size-4 text-sky-500" />
                  Service Areas
                </h2>
                <div className="flex flex-wrap gap-2">
                  {service_areas.map((area) => (
                    <span
                      key={area}
                      className="rounded-lg bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* ---------------------------------------------------------------- */}
            {/* SPECIALIZATIONS                                                   */}
            {/* ---------------------------------------------------------------- */}
            {specializations.length > 0 && (
              <div className="rounded-xl border border-border bg-card p-5">
                <h2 className="mb-3 text-sm font-semibold text-foreground uppercase tracking-wide">
                  Specializations
                </h2>
                <div className="flex flex-wrap gap-2">
                  {specializations.map((spec) => {
                    const colors = SPECIALIZATION_COLORS[spec as Specialization] ?? SPECIALIZATION_COLOR_FALLBACK;
                    return (
                      <span
                        key={spec}
                        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${colors.bg} ${colors.text} ${colors.ring}`}
                      >
                        {spec}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* ---------------------------------------------------------------- */}
          {/* CTA PANEL                                                         */}
          {/* ---------------------------------------------------------------- */}
          <div className="mt-6 rounded-xl border border-border bg-gradient-to-r from-sky-50 to-slate-50 p-6">
            <h2 className="mb-1 text-lg font-bold text-foreground">
              Ready to book {name}?
            </h2>
            <p className="mb-5 text-sm text-muted-foreground">
              Reach out directly — no middleman, no platform fees.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                className="gap-2 bg-sky-600 text-white hover:bg-sky-700"
                aria-label={`Get a quote from ${name}`}
              >
                <MessageSquare className="size-4" />
                Get a Quote
              </Button>

              {phone_number && (
                <a
                  href={`tel:${phone_number.replace(/\s/g, "")}`}
                  aria-label={`Call ${name}`}
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "gap-2"
                  )}
                >
                  <Phone className="size-4" />
                  {phone_number}
                </a>
              )}

              {email && (
                <a
                  href={`mailto:${email}`}
                  aria-label={`Email ${name}`}
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "gap-2"
                  )}
                >
                  Email
                </a>
              )}

              {website_url && (
                <a
                  href={website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${name} website`}
                  className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "gap-2"
                  )}
                >
                  <Globe className="size-4" />
                  Visit Website
                </a>
              )}
            </div>
          </div>

          {/* ---------------------------------------------------------------- */}
          {/* DISCLAIMER                                                        */}
          {/* ---------------------------------------------------------------- */}
          <p className="mt-8 text-center text-xs text-muted-foreground/70 leading-relaxed">
            BowValleyCleaners.ca is an independent directory operated by Albor Digital (Canada).
            Ratings and review counts are sourced from public third-party platforms and are provided for
            reference only. We do not verify, endorse, or guarantee the services of any listed company.
          </p>
        </div>
      </main>
    </div>
  );
}

