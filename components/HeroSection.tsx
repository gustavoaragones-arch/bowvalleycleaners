interface HeroSectionProps {
  providerCount: number;
  avgRating: string;
  areaCount: number;
}

export function HeroSection({ providerCount, avgRating, areaCount }: HeroSectionProps) {
  return (
    <div
      className="relative overflow-hidden"
      style={{ backgroundColor: "var(--bv-summit)", paddingTop: "52px", paddingBottom: 0 }}
    >
      <div className="relative z-10 bv-container pb-0">
        <p
          className="text-[10px] tracking-[2px] uppercase font-semibold mb-3"
          style={{ color: "var(--bv-amber)" }}
        >
          Canadian Rockies · Canmore · Banff · Cochrane
        </p>

        <h1
          className="text-[26px] sm:text-[34px] lg:text-[38px] leading-[1.18] max-w-[420px] mb-4 font-playfair"
          style={{ color: "var(--bv-frost)" }}
        >
          The <em className="italic" style={{ color: "var(--bv-sage)" }}>intelligent</em>{" "}
          matchmaker for Rocky Mountain cleaning
        </h1>

        <p
          className="text-[13px] leading-relaxed max-w-[360px] mb-8"
          style={{ color: "rgba(232,237,228,0.65)" }}
        >
          Connect with vetted, specialist cleaners for STR turnovers, luxury properties, and
          post-construction. Not just any cleaner — the right one.
        </p>

        <div className="flex flex-wrap gap-8 pb-10">
          {[
            { val: String(providerCount), label: "Verified providers" },
            { val: avgRating, label: "Avg. rating" },
            { val: String(areaCount), label: "Local areas" },
          ].map(({ val, label }) => (
            <div key={label}>
              <div className="text-[24px] font-semibold" style={{ color: "var(--bv-frost)" }}>
                {val}
              </div>
              <div
                className="text-[10px] uppercase tracking-[0.8px] mt-0.5"
                style={{ color: "rgba(232,237,228,0.5)" }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <svg
        className="absolute bottom-0 right-0 pointer-events-none hidden sm:block"
        width="340"
        height="180"
        viewBox="0 0 340 180"
        fill="none"
        aria-hidden="true"
        style={{ opacity: 0.18 }}
      >
        <path d="M0 180L80 60L130 120L180 30L240 100L290 50L340 100L340 180Z" fill="#E8EDE4" />
        <path
          d="M180 30L200 70L230 50L240 100"
          fill="none"
          stroke="#E8EDE4"
          strokeWidth="0.5"
          opacity="0.5"
        />
      </svg>
    </div>
  );
}
