import Link from "next/link";

const LEGAL_LINKS = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/cookies", label: "Cookie Notice" },
  { href: "/disclaimer", label: "Disclaimer" },
] as const;

type LegalPageProps = {
  title: string;
  effectiveDate?: string;
  lastUpdated?: string;
  children: React.ReactNode;
};

export function LegalPage({
  title,
  effectiveDate = "January 1, 2026",
  lastUpdated,
  children,
}: LegalPageProps) {
  return (
    <main className="flex-1" style={{ backgroundColor: "var(--bv-snow)" }}>
      <section className="border-b py-12 sm:py-16" style={{ borderColor: "var(--bv-border)", backgroundColor: "var(--bv-bone)" }}>
        <div className="bv-container max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--bv-amber)" }}>
            Legal
          </p>
          <h1 className="mt-2 text-3xl font-playfair tracking-tight sm:text-4xl" style={{ color: "var(--bv-summit)" }}>
            {title}
          </h1>
          <p className="mt-3 text-sm" style={{ color: "var(--bv-slate)" }}>
            BowValleyCleaners.ca · Operated by Albor Digital Canada · Canmore, Alberta
          </p>
          <p className="mt-1 text-xs" style={{ color: "var(--bv-slate)" }}>
            Effective Date: {effectiveDate}
            {lastUpdated ? ` · Last Updated: ${lastUpdated}` : ""}
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="bv-container max-w-3xl legal-prose">{children}</div>
      </section>

      <section
        className="border-t py-8"
        style={{ borderColor: "var(--bv-border)", backgroundColor: "var(--bv-bone)" }}
      >
        <div className="bv-container max-w-3xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--bv-slate)" }}>
            Related documents
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {LEGAL_LINKS.map(({ href, label }) => (
              <Link key={href} href={href} className="text-sm bv-link hover:underline">
                {label}
              </Link>
            ))}
          </div>
          <p className="mt-6 text-xs leading-relaxed" style={{ color: "var(--bv-slate)" }}>
            Questions?{" "}
            <a href="mailto:contact@bowvalleycleaners.ca" className="bv-link hover:underline">
              contact@bowvalleycleaners.ca
            </a>
          </p>
          <p className="mt-4 text-[10px] leading-relaxed" style={{ color: "var(--bv-slate)" }}>
            These documents were prepared as standard legal safeguards for an independent digital directory.
            They are not a substitute for advice from a licensed attorney. Albor Digital Canada recommends
            periodic review by qualified legal counsel as the platform evolves.
          </p>
        </div>
      </section>
    </main>
  );
}

export function LegalSection({
  id,
  title,
  children,
}: {
  id?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mb-10 scroll-mt-24">
      <h2 className="text-xl font-playfair tracking-tight" style={{ color: "var(--bv-summit)" }}>
        {title}
      </h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed" style={{ color: "var(--bv-slate)" }}>
        {children}
      </div>
    </section>
  );
}
