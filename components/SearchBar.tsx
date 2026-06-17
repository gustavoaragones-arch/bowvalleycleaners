"use client";

import { useState } from "react";

const SPECIALTIES = [
  "Any specialty",
  "Airbnb / STR Turnover",
  "Post-Construction",
  "Luxury Home",
  "Deep Clean / Move-out",
  "Eco-Friendly",
  "Carpet Cleaning",
  "Commercial",
] as const;

const LOCATIONS = [
  "All areas",
  "Canmore",
  "Banff",
  "Dead Man's Flats",
  "Exshaw",
  "Cochrane",
  "Calgary",
] as const;

const CLIENT_TYPES = [
  "Any client type",
  "STR Property Manager",
  "Luxury Homeowner",
  "New Airbnb Host",
  "Construction Developer",
] as const;

export type SearchQuery = {
  specialty: string;
  location: string;
  clientType: string;
};

export function SearchBar({
  onSearch,
}: {
  onSearch: (q: SearchQuery) => void;
}) {
  const [specialty, setSpecialty] = useState<string>("Any specialty");
  const [location, setLocation] = useState<string>("All areas");
  const [clientType, setClientType] = useState<string>("Any client type");

  const fields = [
    { label: "I need", value: specialty, set: setSpecialty, opts: SPECIALTIES },
    { label: "Location", value: location, set: setLocation, opts: LOCATIONS },
    { label: "Client type", value: clientType, set: setClientType, opts: CLIENT_TYPES },
  ] as const;

  return (
    <div
      className="flex flex-col sm:flex-row items-stretch gap-0 px-4 sm:px-7 py-[18px] border-b-2"
      style={{ backgroundColor: "var(--bv-alpine)", borderBottomColor: "var(--bv-amber)" }}
    >
      <div
        className="flex flex-1 flex-col sm:flex-row rounded-md sm:rounded-l-md border overflow-hidden"
        style={{ borderColor: "rgba(232,237,228,0.12)", backgroundColor: "rgba(255,255,255,0.06)" }}
      >
        {fields.map(({ label, value, set, opts }, i) => (
          <div
            key={label}
            className="flex-1 px-4 py-3"
            style={{
              borderRight: i < fields.length - 1 ? "1px solid rgba(232,237,228,0.12)" : "none",
              borderBottom: i < fields.length - 1 ? "1px solid rgba(232,237,228,0.12)" : "none",
            }}
          >
            <label
              className="block text-[9px] uppercase tracking-[1.2px] font-semibold mb-1"
              style={{ color: "var(--bv-amber)" }}
            >
              {label}
            </label>
            <select
              value={value}
              onChange={(e) => set(e.target.value)}
              className="bg-transparent border-none outline-none text-[12px] w-full appearance-none cursor-pointer"
              style={{ color: "var(--bv-frost)", fontFamily: "var(--font-sans)" }}
            >
              {opts.map((o) => (
                <option key={o} value={o} style={{ backgroundColor: "var(--bv-summit)" }}>
                  {o}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => onSearch({ specialty, location, clientType })}
        className="px-6 py-3 sm:py-0 sm:rounded-r-md text-[12px] font-semibold uppercase tracking-wide text-white transition-opacity hover:opacity-90"
        style={{ backgroundColor: "var(--bv-amber)" }}
      >
        Find Cleaners →
      </button>
    </div>
  );
}
