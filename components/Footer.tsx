import Link from "next/link";

const CURRENT_YEAR = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="border-t border-border bg-slate-950 text-slate-300">
      {/* ------------------------------------------------------------------ */}
      {/* EEAT BAND — establishes authorship, operator identity, and trust    */}
      {/* ------------------------------------------------------------------ */}
      <div className="border-b border-slate-800 px-4 py-8 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-2">

          {/* About the directory */}
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="flex size-7 items-center justify-center rounded-lg bg-sky-600 text-xs font-black text-white select-none">
                BV
              </span>
              <span className="text-sm font-bold text-white">BowValleyCleaners.ca</span>
            </div>
            <p className="text-xs leading-relaxed text-slate-400">
              An independent, hyper-local cleaning services directory for the
              Canadian Rockies. We help property managers, homeowners, and
              developers find the right specialist — not just any cleaner.
            </p>
          </div>

          {/* Directory links */}
          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-500">
              Directory
            </h3>
            <nav className="flex flex-col gap-2 text-xs">
              {[
                { href: "/",              label: "Browse All Cleaners" },
                { href: "/add-business",  label: "Add Your Business"   },
                { href: "/for-cleaners",  label: "For Cleaners"        },
                { href: "/about",         label: "About This Directory" },
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* LEGAL BAND                                                           */}
      {/* ------------------------------------------------------------------ */}
      <div className="px-4 py-5 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 sm:flex-row sm:justify-between">

          {/* Legal links */}
          <nav className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-[11px] text-slate-500 sm:justify-start">
            {[
              { href: "/privacy",  label: "Privacy Policy"  },
              { href: "/terms",    label: "Terms of Service" },
              { href: "/cookies",  label: "Cookie Notice"   },
              { href: "/disclaimer", label: "Disclaimer"    },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="hover:text-slate-300 transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Copyright */}
          <p className="text-[11px] text-slate-600">
            © {CURRENT_YEAR} BowValleyCleaners.ca — Canmore, AB. All rights reserved.
          </p>
        </div>

        {/* Disclaimer — EEAT: clearly not a review aggregator making endorsements */}
        <p className="mx-auto mt-3 max-w-6xl text-[10px] leading-relaxed text-slate-700">
          BowValleyCleaners.ca is an independent directory. Listings, ratings, and review counts are compiled from
          publicly available third-party sources (including Google) and are provided for general reference only.
          We do not verify, endorse, or guarantee the quality of any listed business or its services.
          All use of this directory is subject to our{" "}
          <Link href="/terms" className="underline hover:text-slate-500 transition-colors">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/disclaimer" className="underline hover:text-slate-500 transition-colors">
            Disclaimer
          </Link>.
        </p>
      </div>
    </footer>
  );
}
