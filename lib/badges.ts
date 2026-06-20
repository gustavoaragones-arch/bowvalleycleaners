import type { CSSProperties } from "react";

export function getSpecBadgeStyle(spec: string): CSSProperties {
  const s = spec.toLowerCase();
  if (s.includes("airbnb") || s.includes("str"))
    return { backgroundColor: "var(--badge-airbnb-bg)", color: "var(--badge-airbnb-fg)" };
  if (s.includes("eco"))
    return { backgroundColor: "var(--badge-eco-bg)", color: "var(--badge-eco-fg)" };
  if (s.includes("luxury"))
    return { backgroundColor: "var(--badge-luxury-bg)", color: "var(--badge-luxury-fg)" };
  if (s.includes("post") || s.includes("construct"))
    return { backgroundColor: "var(--badge-post-bg)", color: "var(--badge-post-fg)" };
  return { backgroundColor: "var(--badge-default-bg)", color: "var(--badge-default-fg)" };
}
