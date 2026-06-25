import { cn } from "@/lib/utils";

type LocalBusinessBadgeProps = {
  className?: string;
};

/** Renders the local-business stamp SVG using its embedded colors. */
export function LocalBusinessBadge({ className }: LocalBusinessBadgeProps) {
  return (
    <img
      src="/local-business-bowvalley.svg"
      alt="Local business"
      className={cn("shrink-0 object-contain", className)}
    />
  );
}
