"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, ChevronDown, ClipboardList, Download, Timer } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { TURNOVER_CHECKLIST_SECTIONS } from "@/lib/turnover-checklist-data";

export function TurnoverChecklist() {
  const [openId, setOpenId] = useState<string | null>(
    TURNOVER_CHECKLIST_SECTIONS[0]?.id ?? null
  );

  function toggleSection(id: string) {
    setOpenId((current) => (current === id ? null : id));
  }

  return (
    <section
      className="overflow-hidden rounded-2xl border transition-shadow duration-300 hover:shadow-md"
      style={{
        borderColor: "var(--bv-border)",
        backgroundColor: "var(--bv-bone)",
      }}
    >
      <div
        className="border-b px-5 py-4 sm:px-6"
        style={{
          borderColor: "var(--bv-border)",
          backgroundColor: "var(--bv-summit)",
          color: "var(--bv-frost)",
        }}
      >
        <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest">
          <ClipboardList className="size-3.5" style={{ color: "var(--bv-amber)" }} />
          Professional SOP
        </div>
        <h2 className="font-playfair text-2xl tracking-tight sm:text-3xl">
          The Bow Valley Turnover
        </h2>
        <p className="mt-1 text-sm" style={{ color: "var(--bv-sage)" }}>
          What a pro STR turnover actually involves — section by section, with real time allotments.
        </p>
      </div>

      <div className="divide-y" style={{ borderColor: "var(--bv-border)" }}>
        {TURNOVER_CHECKLIST_SECTIONS.map((section) => {
          const isOpen = openId === section.id;

          return (
            <div key={section.id} style={{ borderColor: "var(--bv-border)" }}>
              <button
                type="button"
                onClick={() => toggleSection(section.id)}
                aria-expanded={isOpen}
                className={cn(
                  "flex w-full items-center gap-3 px-5 py-4 text-left transition-colors duration-200 sm:px-6",
                  isOpen ? "bg-white" : "hover:bg-white/70"
                )}
              >
                <span
                  className="min-w-0 flex-1 text-sm font-semibold sm:text-base"
                  style={{ color: "var(--bv-summit)" }}
                >
                  {section.title}
                </span>
                <span
                  className="inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold whitespace-nowrap"
                  style={{
                    backgroundColor: "var(--bv-frost)",
                    color: "var(--bv-alpine)",
                  }}
                >
                  <Timer className="size-3" />
                  {section.timeAllotment}
                </span>
                <ChevronDown
                  className={cn(
                    "size-4 shrink-0 transition-transform duration-300",
                    isOpen && "rotate-180"
                  )}
                  style={{ color: "var(--bv-slate)" }}
                />
              </button>

              <div
                className={cn(
                  "grid transition-all duration-300 ease-in-out",
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                )}
              >
                <div className="overflow-hidden">
                  <div
                    className="space-y-4 border-t px-5 py-4 sm:px-6"
                    style={{
                      borderColor: "var(--bv-border)",
                      backgroundColor: "#fff",
                    }}
                  >
                    {section.intro ? (
                      <p className="text-sm leading-relaxed" style={{ color: "var(--bv-granite)" }}>
                        {section.intro}
                      </p>
                    ) : null}

                    <ul className="space-y-3">
                      {section.items.map((item) => (
                        <li key={item.task} className="flex gap-3">
                          <CheckCircle2
                            className="mt-0.5 size-4 shrink-0"
                            style={{ color: "var(--bv-forest)" }}
                          />
                          <div>
                            <p className="text-sm font-semibold" style={{ color: "var(--bv-summit)" }}>
                              {item.task}
                            </p>
                            <p className="mt-0.5 text-sm leading-relaxed" style={{ color: "var(--bv-granite)" }}>
                              {item.description}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div
        className="border-t px-5 py-5 sm:px-6"
        style={{ borderColor: "var(--bv-border)", backgroundColor: "var(--bv-snow)" }}
      >
        <Link
          href="/Unit_Cleaning_List.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ size: "lg" }), "bv-btn-primary inline-flex w-full sm:w-auto")}
        >
          <Download className="size-4" />
          Download Full SOP (PDF)
        </Link>
      </div>
    </section>
  );
}
