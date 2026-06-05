import Link from "next/link";
import { Phone, Globe, Star, MapPin, Clock, MessageSquare, ShieldCheck, BadgeCheck, UserCheck, Mail, Building2, User } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { type CompanyFull, SPECIALIZATION_COLORS, SPECIALIZATION_COLOR_FALLBACK, type Specialization, type BusinessType } from "@/types/company";

interface CompanyCardProps {
  company: CompanyFull;
}

function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const partial = rating - full;
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => {
        if (i < full) {
          return (
            <Star key={i} className="size-3.5 fill-amber-400 text-amber-400" />
          );
        }
        if (i === full && partial >= 0.5) {
          return (
            <span key={i} className="relative inline-block size-3.5">
              <Star className="absolute inset-0 size-3.5 text-amber-200 fill-amber-200" />
              <span className="absolute inset-0 overflow-hidden w-1/2">
                <Star className="size-3.5 fill-amber-400 text-amber-400" />
              </span>
            </span>
          );
        }
        return <Star key={i} className="size-3.5 text-amber-200 fill-amber-200" />;
      })}
    </span>
  );
}

function SpecializationBadge({ label }: { label: string }) {
  const colors = SPECIALIZATION_COLORS[label as Specialization] ?? SPECIALIZATION_COLOR_FALLBACK;
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold ring-1 ring-inset leading-tight ${colors.bg} ${colors.text} ${colors.ring}`}
    >
      {label}
    </span>
  );
}

export function CompanyCard({ company }: CompanyCardProps) {
  const {
    name,
    tagline,
    google_rating,
    review_count,
    years_in_business,
    phone_number,
    email,
    website_url,
    is_featured,
    service_areas,
    specializations,
    is_insured,
    is_licensed,
    is_background_checked,
    business_type,
  } = company;

  const BUSINESS_TYPE_CONFIG: Record<BusinessType, { icon: typeof User; className: string }> = {
    "Cleaning Contractor": { icon: User,      className: "border-slate-200 bg-slate-50 text-slate-600" },
    "Cleaning Company":    { icon: Building2, className: "border-slate-200 bg-slate-50 text-slate-600" },
  };

  const trustFlags = [
    { active: is_insured,            icon: ShieldCheck, label: "Insured"            },
    { active: is_licensed,           icon: BadgeCheck,  label: "Licensed"           },
    { active: is_background_checked, icon: UserCheck,   label: "Background Checked" },
  ].filter((f) => f.active);

  return (
    <Card
      className={`relative flex flex-col transition-shadow duration-200 hover:shadow-lg ${
        is_featured
          ? "ring-2 ring-sky-500/60 shadow-md shadow-sky-100"
          : "hover:ring-foreground/15"
      }`}
    >
      {/* Featured ribbon */}
      {is_featured && (
        <div className="absolute top-3 right-3 z-10">
          <span className="inline-flex items-center gap-1 rounded-full bg-sky-500 px-2.5 py-0.5 text-[11px] font-bold text-white shadow-sm uppercase tracking-wide">
            <Star className="size-2.5 fill-white" />
            Featured
          </span>
        </div>
      )}

      <CardHeader className="pb-0">
        {/* Logo placeholder / initials avatar */}
        <div className="flex items-start gap-3">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 text-base font-bold text-slate-600 ring-1 ring-slate-200 select-none">
            {name
              .split(" ")
              .slice(0, 2)
              .map((w) => w[0])
              .join("")
              .toUpperCase()}
          </div>
          <div className="min-w-0 flex-1 pr-16">
            <h3 className="truncate text-[15px] font-semibold leading-snug text-foreground">
              {name}
            </h3>
            {tagline && (
              <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground line-clamp-2">
                {tagline}
              </p>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-4 pt-3">
        {/* Business type badge */}
        {business_type && (() => {
          const cfg = BUSINESS_TYPE_CONFIG[business_type];
          const Icon = cfg.icon;
          return (
            <div>
              <span className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[11px] font-semibold ${cfg.className}`}>
                <Icon className="size-3 shrink-0" />
                {business_type}
              </span>
            </div>
          );
        })()}

        {/* Rating + stats row */}
        <div className="flex flex-wrap items-center gap-3 text-sm">
          {google_rating !== null && (
            <div className="flex items-center gap-1.5">
              <StarRating rating={google_rating} />
              <span className="font-semibold tabular-nums text-foreground">
                {google_rating.toFixed(1)}
              </span>
              <span className="text-muted-foreground">
                ({review_count.toLocaleString()} reviews)
              </span>
            </div>
          )}
          {years_in_business !== null && (
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock className="size-3.5 shrink-0" />
              <span className="text-xs font-medium">
                {years_in_business} yr{years_in_business !== 1 ? "s" : ""} in business
              </span>
            </div>
          )}
        </div>

        {/* Service areas */}
        {service_areas.length > 0 && (
          <div className="flex flex-wrap items-start gap-1.5">
            <MapPin className="mt-0.5 size-3.5 shrink-0 text-muted-foreground" />
            <div className="flex flex-wrap gap-1">
              {service_areas.map((area) => (
                <span
                  key={area}
                  className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Trust verification stamps */}
        {trustFlags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {trustFlags.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1 rounded-md border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700"
              >
                <Icon className="size-3 shrink-0" />
                {label}
              </span>
            ))}
          </div>
        )}

        {/* Specialization badges */}
        {specializations.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {specializations.map((spec) => (
              <SpecializationBadge key={spec} label={spec} />
            ))}
          </div>
        )}
      </CardContent>

      <CardFooter className="mt-auto gap-2">
        <Link
          href={`/get-quote?preferred_provider=${encodeURIComponent(name)}`}
          aria-label={`Get a quote from ${name}`}
          className={cn(
            buttonVariants({ size: "sm" }),
            "flex-1 gap-1.5 bg-sky-600 text-white hover:bg-sky-700 active:bg-sky-800"
          )}
        >
          <MessageSquare className="size-3.5" />
          Get Quote
        </Link>

        {phone_number && (
          <a
            href={`tel:${phone_number.replace(/\s/g, "")}`}
            aria-label={`Call ${name}`}
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "flex-1 gap-1.5"
            )}
          >
            <Phone className="size-3.5" />
            Call Now
          </a>
        )}

        {email && (
          <a
            href={`mailto:${email}`}
            aria-label={`Email ${name}`}
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "flex-1 gap-1.5"
            )}
          >
            <Mail className="size-3.5" />
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
              buttonVariants({ variant: "ghost", size: "sm" }),
              "gap-1.5 px-2.5"
            )}
          >
            <Globe className="size-3.5" />
            Website
          </a>
        )}
      </CardFooter>
    </Card>
  );
}
