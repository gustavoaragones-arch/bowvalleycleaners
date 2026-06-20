import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Cookie Notice | BowValleyCleaners.ca",
  description:
    "How BowValleyCleaners.ca uses cookies and similar technologies. Operated by Albor Digital Canada.",
  alternates: {
    canonical: "https://bowvalleycleaners.ca/cookies",
  },
};

export default function CookiesPage() {
  return (
    <LegalPage title="Cookie Notice" lastUpdated="January 1, 2026">
      <LegalSection title="1. What Are Cookies">
        <p>
          Cookies are small text files stored on your device when you visit a website. They help websites
          function properly, remember your preferences, and provide analytical information to operators.
          Similar technologies — such as local storage, session storage, and tracking pixels — may also be
          used.
        </p>
      </LegalSection>

      <LegalSection title="2. How We Use Cookies">
        <p>
          Albor Digital Canada uses cookies and similar technologies on BowValleyCleaners.ca to:
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Ensure the Site functions correctly (strictly necessary cookies)</li>
          <li>Remember your preferences and settings where applicable</li>
          <li>Analyze how users interact with the Site so we can improve it</li>
        </ul>
        <p>
          BowValleyCleaners.ca is not an ad-supported product. We do not use cookies to serve third-party
          advertising on this Site.
        </p>
      </LegalSection>

      <LegalSection title="3. Types of Cookies We Use">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[480px] border-collapse text-left text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--bv-border)" }}>
                <th className="py-2 pr-4 font-semibold" style={{ color: "var(--bv-summit)" }}>
                  Type
                </th>
                <th className="py-2 pr-4 font-semibold" style={{ color: "var(--bv-summit)" }}>
                  Purpose
                </th>
                <th className="py-2 font-semibold" style={{ color: "var(--bv-summit)" }}>
                  Duration
                </th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid var(--bv-border)" }}>
                <td className="py-3 pr-4 align-top font-medium">Strictly Necessary</td>
                <td className="py-3 pr-4 align-top">
                  Core site functionality, session management, and security.
                </td>
                <td className="py-3 align-top">Session</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--bv-border)" }}>
                <td className="py-3 pr-4 align-top font-medium">Functional</td>
                <td className="py-3 pr-4 align-top">
                  User preferences and saved states within forms or filters.
                </td>
                <td className="py-3 align-top">Up to 1 year</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 align-top font-medium">Analytics</td>
                <td className="py-3 pr-4 align-top">
                  Aggregate usage data via analytics tools. Data is anonymized where possible.
                </td>
                <td className="py-3 align-top">Up to 2 years</td>
              </tr>
            </tbody>
          </table>
        </div>
      </LegalSection>

      <LegalSection title="4. Third-Party Cookies">
        <p>
          Some cookies on the Site may be placed by third-party services that help us operate the platform,
          including hosting providers, database services, and analytics tools. These third parties have their
          own cookie policies and we encourage you to review them.
        </p>
      </LegalSection>

      <LegalSection title="5. Your Choices">
        <p>You can control and manage cookies in several ways:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Through your browser settings, where you can block or delete cookies</li>
          <li>Through opt-out mechanisms provided by third-party analytics services</li>
        </ul>
        <p>
          Please note that disabling strictly necessary cookies may affect the functionality of the Site.
        </p>
      </LegalSection>

      <LegalSection title="6. Do Not Track">
        <p>
          Some browsers include a &ldquo;Do Not Track&rdquo; (DNT) feature. The Site does not currently
          respond to DNT signals, as there is no industry-standard approach. We continue to monitor
          developments in this area.
        </p>
      </LegalSection>

      <LegalSection title="7. Updates to This Notice">
        <p>
          We may update this Cookie Notice as the Site evolves or regulations change. Updates will be posted
          with a revised effective date.
        </p>
      </LegalSection>

      <LegalSection title="8. Contact">
        <p>
          For questions about our use of cookies:{" "}
          <a href="mailto:contact@bowvalleycleaners.ca" className="bv-link hover:underline">
            contact@bowvalleycleaners.ca
          </a>
        </p>
      </LegalSection>
    </LegalPage>
  );
}
