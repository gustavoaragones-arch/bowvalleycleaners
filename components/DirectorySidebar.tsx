"use client";

export type SidebarItem = { label: string; key: string; count: number };

function SidebarSection({
  title,
  items,
  checked,
  onToggle,
}: {
  title: string;
  items: SidebarItem[];
  checked: string[];
  onToggle: (key: string) => void;
}) {
  return (
    <div className="mb-5">
      <div
        className="text-[9px] uppercase tracking-[1.5px] font-semibold pb-2 mb-2 border-b"
        style={{ color: "var(--bv-slate)", borderColor: "#EEF0EC" }}
      >
        {title}
      </div>
      {items.map(({ label, key, count }) => (
        <button
          key={key}
          type="button"
          onClick={() => onToggle(key)}
          className="w-full flex items-center gap-2 py-[6px] text-[12px] text-left"
          style={{ color: "var(--bv-granite)" }}
        >
          <span
            className="w-[14px] h-[14px] rounded-sm border flex-shrink-0 flex items-center justify-center"
            style={
              checked.includes(key)
                ? {
                    backgroundColor: "var(--bv-alpine)",
                    borderColor: "var(--bv-alpine)",
                  }
                : { borderColor: "#C5CEBC", backgroundColor: "white" }
            }
          >
            {checked.includes(key) && (
              <svg width="9" height="7" viewBox="0 0 9 7" fill="none" aria-hidden="true">
                <path
                  d="M1 3.5L3.5 6L8 1"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </span>
          {label}
          <span
            className="ml-auto text-[10px] px-1.5 py-0.5 rounded-full"
            style={{ backgroundColor: "#EEF0EC", color: "var(--bv-slate)" }}
          >
            {count}
          </span>
        </button>
      ))}
    </div>
  );
}

export function DirectorySidebar({
  locationItems,
  specialtyItems,
  trustItems,
  ratingItems,
  filters,
  onFiltersChange,
}: {
  locationItems: SidebarItem[];
  specialtyItems: SidebarItem[];
  trustItems: SidebarItem[];
  ratingItems: SidebarItem[];
  filters: Record<string, string[]>;
  onFiltersChange: (section: string, keys: string[]) => void;
}) {
  const toggle = (section: string, key: string, singleSelect = false) => {
    const current = filters[section] || [];
    if (singleSelect) {
      onFiltersChange(section, [key]);
      return;
    }
    if (key === "all") {
      onFiltersChange(section, ["all"]);
      return;
    }
    const withoutAll = current.filter((k) => k !== "all");
    onFiltersChange(
      section,
      withoutAll.includes(key)
        ? withoutAll.filter((k) => k !== key)
        : [...withoutAll, key]
    );
  };

  return (
    <aside
      className="hidden lg:block w-[220px] flex-shrink-0 border-r p-5"
      style={{ backgroundColor: "white", borderColor: "var(--bv-border)" }}
    >
      <SidebarSection
        title="Location"
        items={locationItems}
        checked={filters.locations?.length ? filters.locations : ["all"]}
        onToggle={(k) => toggle("locations", k, true)}
      />
      <SidebarSection
        title="Specialization"
        items={specialtyItems}
        checked={filters.specialties || []}
        onToggle={(k) => toggle("specialties", k)}
      />
      <SidebarSection
        title="Trust & Safety"
        items={trustItems}
        checked={filters.trust || []}
        onToggle={(k) => toggle("trust", k)}
      />
      <SidebarSection
        title="Rating"
        items={ratingItems}
        checked={filters.ratings?.length ? filters.ratings : ["rany"]}
        onToggle={(k) => toggle("ratings", k, true)}
      />
    </aside>
  );
}
