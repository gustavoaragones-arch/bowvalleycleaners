import Link from "next/link";

export function Navbar() {
  return (
    <nav
      style={{ backgroundColor: "var(--bv-summit)" }}
      className="border-b border-white/8"
    >
      <div className="bv-container flex h-[58px] items-center justify-between">
        <Link href="/" className="flex items-center gap-2 no-underline">
          <MountainLogo />
          <span
            className="text-[15px] tracking-wide font-playfair"
            style={{ color: "var(--bv-frost)" }}
          >
            Bow Valley Cleaners
          </span>
        </Link>

        <div className="flex items-center gap-4 sm:gap-6">
          <div className="hidden md:flex items-center gap-4 sm:gap-6">
            <Link
              href="/"
              className="text-[11px] tracking-widest uppercase text-white/60 hover:text-white/90 transition-colors no-underline"
            >
              Browse
            </Link>
            <Link
              href="/resources/new-host"
              className="text-[11px] tracking-widest uppercase text-white/60 hover:text-white/90 transition-colors no-underline"
            >
              New Host Guide
            </Link>
            <Link
              href="/for-cleaners"
              className="text-[11px] tracking-widest uppercase text-white/60 hover:text-white/90 transition-colors no-underline"
            >
              For Cleaners
            </Link>
            <Link
              href="/about"
              className="text-[11px] tracking-widest uppercase text-white/60 hover:text-white/90 transition-colors no-underline"
            >
              About
            </Link>
            <Link
              href="/get-quote"
              className="text-[11px] tracking-widest uppercase text-white/60 hover:text-white/90 transition-colors no-underline"
            >
              Get Quote
            </Link>
          </div>
          <Link
            href="/add-business"
            className="text-[11px] font-semibold tracking-wide uppercase px-3 sm:px-4 py-2 rounded text-white no-underline transition-opacity hover:opacity-90"
            style={{ backgroundColor: "var(--bv-amber)" }}
          >
            List Your Business
          </Link>
        </div>
      </div>
    </nav>
  );
}

function MountainLogo() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <path
        d="M2 18L7 7L11 14L14 9L19 18H2Z"
        fill="#6B8F5E"
        stroke="#6B8F5E"
        strokeWidth="0.5"
        strokeLinejoin="round"
      />
      <path
        d="M7 7L11 1L15 7"
        fill="none"
        stroke="rgba(232,237,228,0.35)"
        strokeWidth="1"
        strokeLinejoin="round"
      />
    </svg>
  );
}
