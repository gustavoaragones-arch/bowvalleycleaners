import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 select-none">
          <span className="flex size-7 items-center justify-center rounded-lg bg-sky-600 text-xs font-black text-white">
            BV
          </span>
          <span className="text-sm font-semibold tracking-tight text-foreground hidden sm:block">
            BowValleyCleaners
          </span>
        </Link>

        {/* Nav */}
        <nav className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/for-cleaners"
            className="hidden rounded-md px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors sm:block"
          >
            For Cleaners
          </Link>
          <Link
            href="/add-business"
            className="hidden rounded-md px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors sm:block"
          >
            List Your Business
          </Link>
          <Link
            href="/get-quote"
            className={cn(
              buttonVariants({ size: "sm" }),
              "bg-sky-600 text-white hover:bg-sky-700 gap-1.5 text-xs font-semibold"
            )}
          >
            Get Free Quotes
          </Link>
        </nav>
      </div>
    </header>
  );
}
