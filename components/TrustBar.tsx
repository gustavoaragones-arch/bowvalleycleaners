const TRUST_ITEMS = [
  { icon: "🏔", text: "Hyper-local to the Canadian Rockies" },
  { icon: "✓", text: "B2B-grade provider vetting" },
  { icon: "★", text: "Google ratings verified" },
  { icon: "⟳", text: "RFP quote engine for high-value jobs" },
] as const;

export function TrustBar() {
  return (
    <div
      className="flex flex-wrap items-center gap-4 sm:gap-8 px-4 sm:px-7 py-[14px]"
      style={{ backgroundColor: "var(--bv-summit)" }}
    >
      {TRUST_ITEMS.map(({ icon, text }) => (
        <div
          key={text}
          className="flex items-center gap-2 text-[11px]"
          style={{ color: "rgba(232,237,228,0.7)" }}
        >
          <span className="text-[16px]" aria-hidden="true">
            {icon}
          </span>
          {text}
        </div>
      ))}
    </div>
  );
}
