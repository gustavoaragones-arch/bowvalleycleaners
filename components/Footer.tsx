import Link from "next/link";

const CURRENT_YEAR = new Date().getFullYear();

export function Footer() {
  return (
    <footer
      className="px-4 sm:px-7 py-10 border-t mt-auto"
      style={{ backgroundColor: "#111E11", borderColor: "rgba(232,237,228,0.08)" }}
    >
      <div className="mx-auto max-w-6xl flex flex-col sm:flex-row justify-between items-start gap-8 mb-8">
        <div className="max-w-[240px]">
          <div
            className="text-[14px] mb-2 font-playfair"
            style={{ color: "var(--bv-frost)" }}
          >
            BowValleyCleaners.ca
          </div>
          <p
            className="text-[11px] leading-relaxed"
            style={{ color: "rgba(232,237,228,0.5)" }}
          >
            An independent, hyper-local cleaning services directory for the Canadian Rockies.
          </p>
        </div>

        <div className="flex gap-8 sm:gap-12">
          <div>
            <div
              className="text-[9px] uppercase tracking-[1.5px] mb-3 font-semibold"
              style={{ color: "var(--bv-sage)" }}
            >
              Directory
            </div>
            {[
              { href: "/", label: "Browse All Cleaners" },
              { href: "/add-business", label: "Add Your Business" },
              { href: "/for-cleaners", label: "For Cleaners" },
              { href: "/about", label: "About This Directory" },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="block text-[12px] mb-2 no-underline hover:underline"
                style={{ color: "rgba(232,237,228,0.6)" }}
              >
                {label}
              </Link>
            ))}
          </div>
          <div>
            <div
              className="text-[9px] uppercase tracking-[1.5px] mb-3 font-semibold"
              style={{ color: "var(--bv-sage)" }}
            >
              Legal
            </div>
            {[
              { href: "/privacy", label: "Privacy Policy" },
              { href: "/terms", label: "Terms of Service" },
              { href: "/cookies", label: "Cookie Notice" },
              { href: "/disclaimer", label: "Disclaimer" },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="block text-[12px] mb-2 no-underline hover:underline"
                style={{ color: "rgba(232,237,228,0.6)" }}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div
        className="mx-auto max-w-6xl border-t pt-5 text-[10px] leading-relaxed"
        style={{ borderColor: "rgba(232,237,228,0.08)", color: "rgba(232,237,228,0.35)" }}
      >
        © {CURRENT_YEAR} BowValleyCleaners.ca — Canmore, AB. All rights reserved.
        BowValleyCleaners.ca is an independent directory. Listings, ratings, and review counts are
        compiled from publicly available third-party sources and are provided for general reference
        only.
      </div>
    </footer>
  );
}
