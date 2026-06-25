import { cn } from "@/lib/utils";

type LocalBusinessBadgeProps = {
  className?: string;
};

/**
 * Renders the local-business stamp SVG with a tintable fill via CSS mask.
 * Color matches review stars (`var(--bv-amber)`).
 */
export function LocalBusinessBadge({ className }: LocalBusinessBadgeProps) {
  return (
    <div
      role="img"
      aria-label="Local business"
      className={cn("shrink-0 bg-[var(--bv-amber)]", className)}
      style={{
        WebkitMaskImage: "url(/local-business-bowvalley.svg)",
        maskImage: "url(/local-business-bowvalley.svg)",
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
      }}
    />
  );
}
