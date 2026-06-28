import { Building2, CheckCircle2, User, XCircle } from "lucide-react";

type ComparisonCardProps = {
  title: string;
  icon: React.ReactNode;
  whatTheyAre: string;
  pros: { label: string; detail: string }[];
  cons: { label: string; detail: string }[];
  idealFor: string;
  variant: "contractor" | "agency";
};

function ComparisonCard({
  title,
  icon,
  whatTheyAre,
  pros,
  cons,
  idealFor,
  variant,
}: ComparisonCardProps) {
  const isAgency = variant === "agency";

  return (
    <article
      className="flex h-full flex-col rounded-2xl border p-6 sm:p-7"
      style={{
        borderColor: "var(--bv-border)",
        backgroundColor: isAgency ? "var(--bv-frost)" : "#fff",
      }}
    >
      <div className="mb-5 flex items-start gap-3">
        <div
          className="flex size-11 shrink-0 items-center justify-center rounded-xl"
          style={{
            backgroundColor: isAgency ? "rgba(45, 74, 45, 0.12)" : "var(--bv-frost)",
            color: "var(--bv-alpine)",
          }}
        >
          {icon}
        </div>
        <h3
          className="pt-1 font-playfair text-xl tracking-tight sm:text-2xl"
          style={{ color: "var(--bv-summit)" }}
        >
          {title}
        </h3>
      </div>

      <div className="mb-6">
        <p
          className="mb-2 text-xs font-semibold uppercase tracking-widest"
          style={{ color: "var(--bv-amber)" }}
        >
          What they are
        </p>
        <p className="text-sm leading-relaxed" style={{ color: "var(--bv-granite)" }}>
          {whatTheyAre}
        </p>
      </div>

      <div className="mb-6">
        <p
          className="mb-3 text-xs font-semibold uppercase tracking-widest"
          style={{ color: "var(--bv-forest)" }}
        >
          Pros
        </p>
        <ul className="space-y-3">
          {pros.map((item) => (
            <li key={item.label} className="flex gap-2.5">
              <CheckCircle2
                className="mt-0.5 size-4 shrink-0"
                style={{ color: "var(--bv-forest)" }}
              />
              <p className="text-sm leading-relaxed" style={{ color: "var(--bv-granite)" }}>
                <strong style={{ color: "var(--bv-summit)" }}>{item.label}:</strong>{" "}
                {item.detail}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <p
          className="mb-3 text-xs font-semibold uppercase tracking-widest"
          style={{ color: "#B83030" }}
        >
          Cons
        </p>
        <ul className="space-y-3">
          {cons.map((item) => (
            <li key={item.label} className="flex gap-2.5">
              <XCircle
                className="mt-0.5 size-4 shrink-0"
                style={{ color: "var(--bv-slate)" }}
              />
              <p className="text-sm leading-relaxed" style={{ color: "var(--bv-granite)" }}>
                <strong style={{ color: "var(--bv-summit)" }}>{item.label}:</strong>{" "}
                {item.detail}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div
        className="mt-auto rounded-xl border px-4 py-3"
        style={{
          borderColor: isAgency ? "rgba(45, 74, 45, 0.2)" : "rgba(196, 130, 10, 0.3)",
          backgroundColor: isAgency
            ? "rgba(255, 255, 255, 0.65)"
            : "rgba(245, 230, 192, 0.35)",
        }}
      >
        <p className="text-sm leading-relaxed" style={{ color: "var(--bv-granite)" }}>
          <strong style={{ color: "var(--bv-summit)" }}>Ideal For:</strong> {idealFor}
        </p>
      </div>
    </article>
  );
}

export function ProviderComparison() {
  return (
    <div>
      <p
        className="text-xs font-semibold uppercase tracking-widest"
        style={{ color: "var(--bv-amber)" }}
      >
        Step 1 · Choose Your Model
      </p>
      <h2
        className="mt-2 font-playfair text-3xl tracking-tight sm:text-4xl"
        style={{ color: "var(--bv-summit)" }}
      >
        Step 1: Choose Your Model – Agency vs. Independent Contractor
      </h2>
      <p
        className="mt-4 max-w-3xl text-base leading-relaxed sm:text-lg"
        style={{ color: "var(--bv-slate)" }}
      >
        Before you start requesting quotes, you need to decide which operational model fits
        your Short-Term Rental (STR) business. In the Canmore and Banff markets, hiring the
        wrong type of provider is the most common rookie mistake.
      </p>

      <div className="mt-10 grid gap-6 lg:grid-cols-2 lg:gap-8">
        <ComparisonCard
          variant="contractor"
          title="The Independent Contractor"
          icon={<User className="size-5" />}
          whatTheyAre="A solo professional working for themselves. They hold a local municipal business license and operate as a sole proprietorship. When you hire them, they are the exact person showing up at your door every single time."
          pros={[
            {
              label: "Deep Unit Knowledge",
              detail: "They learn your property's specific quirks.",
            },
            {
              label: "Cost-Effective",
              detail: "Lower operating costs translate to competitive rates.",
            },
            {
              label: "Direct Communication",
              detail: "Highly tailored, customized service.",
            },
            {
              label: "High Accountability",
              detail: "Their own business and reputation are on the line.",
            },
          ]}
          cons={[
            {
              label: "Capacity Limits",
              detail: "Maximum 2 to 3 units per turnaround window.",
            },
            {
              label: "Schedule Rigidity",
              detail: "Hard to accommodate late check-outs or early check-ins.",
            },
            {
              label: "Zero Backup",
              detail: "If they get sick, you are left scrambling.",
            },
          ]}
          idealFor="Single-unit owners, small STR portfolios, and hands-on hosts."
        />

        <ComparisonCard
          variant="agency"
          title="The Cleaning Company (Agency)"
          icon={<Building2 className="size-5" />}
          whatTheyAre="An incorporated business that employs a team of workers on payroll. While the owners and supervisors are usually local, the frontline cleaners are often seasonal workers."
          pros={[
            {
              label: "Massive Capacity",
              detail: "Multiple teams can handle high turnover volume.",
            },
            {
              label: "Ultimate Flexibility",
              detail: "Easily absorb schedule changes and emergency bookings.",
            },
            {
              label: "Built-in Backup",
              detail:
                "If a cleaner is sick, they route another team member. Zero no-shows.",
            },
          ]}
          cons={[
            {
              label: "Rotating Staff",
              detail: "You rarely get the same cleaner twice (seasonal workers).",
            },
            {
              label: "Premium Pricing",
              detail: "You pay for overhead (software, payroll, insurance).",
            },
            {
              label: "Lower Accountability",
              detail: "Micro-details can be missed; often requires the host to inspect.",
            },
          ]}
          idealFor="Busy Property Managers, investors with large STR portfolios, and entirely hands-off owners."
        />
      </div>
    </div>
  );
}
