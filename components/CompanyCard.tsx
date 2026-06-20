import Link from "next/link";
import type { CompanyFull } from "@/types/company";
import { getSpecBadgeStyle } from "@/lib/badges";

function AvatarInitials({ name, featured }: { name: string; featured?: boolean }) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
  return (
    <div
      className="w-10 h-10 rounded-lg flex items-center justify-center text-[13px] font-bold text-white flex-shrink-0 font-playfair"
      style={{
        backgroundColor: featured ? "var(--bv-amber)" : "var(--bv-alpine)",
      }}
    >
      {initials}
    </div>
  );
}

function StarRating({ rating, reviewCount }: { rating: number; reviewCount: number }) {
  return (
    <div className="flex items-center gap-1 mt-0.5">
      <span className="text-[11px] font-semibold" style={{ color: "var(--bv-amber)" }}>
        {"★".repeat(Math.round(rating))}
      </span>
      <span className="text-[11px] font-semibold" style={{ color: "var(--bv-amber)" }}>
        {rating.toFixed(1)}
      </span>
      <span className="text-[10px]" style={{ color: "var(--bv-slate)" }}>
        ({reviewCount} reviews)
      </span>
    </div>
  );
}

interface CompanyCardProps {
  company: CompanyFull;
  featured?: boolean;
}

export function CompanyCard({ company, featured }: CompanyCardProps) {
  const isFeatured = featured ?? company.is_featured;
  const {
    name,
    slug,
    business_type,
    google_rating,
    review_count,
    service_areas,
    specializations,
    is_insured,
    is_licensed,
    is_background_checked,
    years_in_business,
    phone_number,
    email,
    website_url,
  } = company;

  const trustBadges = [
    is_insured && "Insured",
    is_licensed && "Licensed",
    is_background_checked && "Bg. checked",
  ].filter(Boolean) as string[];

  return (
    <article
      className="relative rounded-xl p-4 bv-card-hover"
      style={{
        backgroundColor: "white",
        border: isFeatured
          ? "1.5px solid var(--bv-amber)"
          : "1px solid var(--bv-border)",
      }}
    >
      {isFeatured && (
        <div
          className="absolute -top-px right-3 text-[9px] font-bold tracking-widest uppercase text-white px-3 py-[3px] rounded-b-md"
          style={{ backgroundColor: "var(--bv-amber)" }}
        >
          Featured
        </div>
      )}

      <div className="flex gap-3 mb-3">
        <AvatarInitials name={name} featured={isFeatured} />
        <div className="flex-1 min-w-0">
          <Link
            href={`/company/${slug}`}
            className="text-[13px] font-semibold truncate block no-underline hover:underline"
            style={{ color: "var(--bv-summit)" }}
          >
            {name}
          </Link>
          <div
            className="text-[10px] uppercase tracking-[0.7px]"
            style={{ color: "var(--bv-slate)" }}
          >
            {business_type ?? "Cleaning Provider"}
            {years_in_business ? ` · ${years_in_business} yrs` : ""}
          </div>
          {google_rating != null && (
            <StarRating rating={google_rating} reviewCount={review_count} />
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-1 mb-2">
        {service_areas.map((loc) => (
          <span
            key={loc}
            className="text-[10px] font-medium px-2 py-0.5 rounded-sm"
            style={{ backgroundColor: "var(--bv-frost)", color: "var(--bv-alpine)" }}
          >
            ⌂ {loc}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap gap-1 mb-3">
        {specializations.slice(0, 4).map((spec) => (
          <span
            key={spec}
            className="text-[10px] font-medium px-2 py-0.5 rounded-full"
            style={getSpecBadgeStyle(spec)}
          >
            {spec}
          </span>
        ))}
        {specializations.length > 4 && (
          <span
            className="text-[10px] px-2 py-0.5 rounded-full"
            style={{ backgroundColor: "var(--bv-frost)", color: "var(--bv-slate)" }}
          >
            +{specializations.length - 4}
          </span>
        )}
      </div>

      {trustBadges.length > 0 && (
        <div className="flex flex-wrap gap-3 mb-3">
          {trustBadges.map((badge) => (
            <div key={badge} className="flex items-center gap-1">
              <div
                className="w-[6px] h-[6px] rounded-full flex-shrink-0"
                style={{ backgroundColor: "var(--bv-sage)" }}
              />
              <span
                className="text-[9px] font-semibold uppercase tracking-[0.5px]"
                style={{ color: "var(--bv-sage)" }}
              >
                {badge}
              </span>
            </div>
          ))}
        </div>
      )}

      <div className="flex gap-1.5">
        <Link
          href={`/get-quote?preferred_provider=${encodeURIComponent(name)}`}
          className="flex-1 py-2 text-center text-[11px] font-semibold text-white rounded no-underline transition-opacity hover:opacity-90"
          style={{ backgroundColor: isFeatured ? "var(--bv-amber)" : "var(--bv-alpine)" }}
        >
          Get Quote
        </Link>
        {phone_number && (
          <a
            href={`tel:${phone_number.replace(/\s/g, "")}`}
            className="w-8 h-8 flex items-center justify-center border rounded text-[13px] no-underline transition-colors hover:bg-gray-50"
            style={{ borderColor: "var(--bv-border)", color: "var(--bv-slate)" }}
            aria-label="Call"
          >
            📞
          </a>
        )}
        {email && (
          <a
            href={`mailto:${email}`}
            className="w-8 h-8 flex items-center justify-center border rounded text-[13px] no-underline transition-colors hover:bg-gray-50"
            style={{ borderColor: "var(--bv-border)", color: "var(--bv-slate)" }}
            aria-label="Email"
          >
            ✉
          </a>
        )}
        {website_url && (
          <a
            href={website_url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 flex items-center justify-center border rounded text-[13px] no-underline transition-colors hover:bg-gray-50"
            style={{ borderColor: "var(--bv-border)", color: "var(--bv-slate)" }}
            aria-label="Website"
          >
            ↗
          </a>
        )}
      </div>
    </article>
  );
}
