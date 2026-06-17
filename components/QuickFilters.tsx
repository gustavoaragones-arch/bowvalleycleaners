"use client";

const CHIPS = [
  { label: "All", key: "all" },
  { label: "Same-day turnover", key: "same-day" },
  { label: "Eco-friendly", key: "eco" },
  { label: "Carpet specialist", key: "carpet" },
  { label: "Post-construction", key: "post" },
] as const;

const TRUST_CHIPS = [
  { label: "✓ Insured", key: "insured" },
  { label: "✓ Background checked", key: "bg-checked" },
] as const;

export function QuickFilters({
  active,
  onChange,
}: {
  active: string[];
  onChange: (keys: string[]) => void;
}) {
  const toggle = (key: string) => {
    if (key === "all") {
      onChange(["all"]);
      return;
    }
    const next = active.filter((k) => k !== "all");
    onChange(
      next.includes(key) ? next.filter((k) => k !== key) : [...next, key]
    );
  };

  return (
    <div
      className="border-b"
      style={{ backgroundColor: "var(--bv-bone)", borderColor: "var(--bv-border)" }}
    >
      <div className="bv-container flex items-center gap-2 flex-wrap py-3">
        <span
          className="text-[10px] uppercase tracking-[1px] mr-1"
          style={{ color: "var(--bv-slate)" }}
        >
          Quick:
        </span>
        {CHIPS.map(({ label, key }) => (
          <button
            key={key}
            type="button"
            onClick={() => toggle(key)}
            className="px-3 py-[5px] rounded-full text-[11px] font-medium border transition-colors"
            style={
              active.includes(key)
                ? {
                    backgroundColor: "var(--bv-alpine)",
                    color: "white",
                    borderColor: "var(--bv-alpine)",
                  }
                : {
                    backgroundColor: "white",
                    color: "var(--bv-alpine)",
                    borderColor: "#C5CEBC",
                  }
            }
          >
            {label}
          </button>
        ))}
        {TRUST_CHIPS.map(({ label, key }) => (
          <button
            key={key}
            type="button"
            onClick={() => toggle(key)}
            className="px-3 py-[5px] rounded-full text-[11px] font-medium border transition-colors"
            style={
              active.includes(key)
                ? {
                    backgroundColor: "var(--bv-amber)",
                    color: "white",
                    borderColor: "var(--bv-amber)",
                  }
                : {
                    backgroundColor: "white",
                    color: "var(--bv-amber)",
                    borderColor: "var(--bv-amber)",
                  }
            }
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
