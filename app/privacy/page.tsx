import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, LegalSection } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy | BowValleyCleaners.ca",
  description:
    "How BowValleyCleaners.ca collects, uses, and protects your personal information. Operated by Albor Digital Canada in Canmore, Alberta.",
  alternates: {
    canonical: "https://bowvalleycleaners.ca/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" lastUpdated="January 1, 2026">
      <LegalSection title="1. Introduction">
        <p>
          Albor Digital Canada (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) respects your
          privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard information
          when you use BowValleyCleaners.ca (the &ldquo;Site&rdquo;).
        </p>
        <p>By using the Site, you consent to the practices described in this policy.</p>
      </LegalSection>

      <LegalSection title="2. Information We Collect">
        <p>
          <strong>Information you provide directly:</strong> Name, email address, phone number, property
          details, business information, service areas, specializations, and any other data you submit
          through quote requests, business listing forms, partner applications, or when contacting us.
        </p>
        <p>
          <strong>Usage data:</strong> Pages visited, features used, device type, browser type, IP
          address, and referring URLs.
        </p>
        <p>
          <strong>Cookies and tracking data:</strong> See our{" "}
          <Link href="/cookies" className="bv-link hover:underline">
            Cookie Notice
          </Link>{" "}
          for full details.
        </p>
        <p>
          <strong>Public directory data:</strong> Business names, ratings, review counts, and other
          information compiled from publicly available third-party sources for directory listings.
        </p>
      </LegalSection>

      <LegalSection title="3. How We Use Your Information">
        <p>We use collected information to:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Operate and maintain the Site and directory</li>
          <li>Process quote requests and route them to relevant cleaning businesses</li>
          <li>Review and publish business listing and partner application submissions</li>
          <li>Respond to inquiries and support requests</li>
          <li>Send transactional communications related to your submissions</li>
          <li>Improve and develop the Site</li>
          <li>Detect and prevent fraud or misuse</li>
          <li>Comply with legal obligations</li>
        </ul>
        <p>
          We do not sell your personal information to third parties. We do not use your data for targeted
          advertising on behalf of third parties.
        </p>
      </LegalSection>

      <LegalSection title="4. Legal Basis for Processing">
        <p>
          If you are located in Canada, we process personal information in accordance with the{" "}
          <em>Personal Information Protection and Electronic Documents Act</em> (PIPEDA) and applicable
          provincial privacy legislation, including Alberta&apos;s <em>Personal Information Protection Act</em>{" "}
          (PIPA) where applicable.
        </p>
        <p>
          If you are located in the European Economic Area, our legal bases for processing include:
          performance of a contract (to provide our services), compliance with legal obligations, our
          legitimate interests in operating and improving the Site, and — where required — your consent.
        </p>
      </LegalSection>

      <LegalSection title="5. Sharing of Information">
        <p>We may share your information with:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            Directory-listed cleaning businesses, when you submit a quote request and we match you with
            relevant providers
          </li>
          <li>
            Service providers who assist in operating the Site (e.g., cloud hosting, database providers,
            analytics services), under confidentiality agreements
          </li>
          <li>Law enforcement or regulatory bodies when required by law</li>
          <li>A successor entity in the event of a merger, acquisition, or sale of assets</li>
        </ul>
      </LegalSection>

      <LegalSection title="6. Data Retention">
        <p>
          We retain personal data for as long as necessary to fulfill the purposes outlined in this policy,
          or as required by law. Quote requests and form submissions are retained for a reasonable period
          to support matching, follow-up, and operational records. You may request deletion of your data at
          any time, subject to legal retention requirements.
        </p>
      </LegalSection>

      <LegalSection title="7. Your Rights">
        <p>Depending on your jurisdiction, you may have the right to:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Access the personal data we hold about you</li>
          <li>Request correction of inaccurate data</li>
          <li>Request deletion of your data</li>
          <li>Object to or restrict our processing</li>
          <li>Withdraw consent at any time, where processing is consent-based</li>
          <li>Receive your data in a portable format</li>
          <li>Lodge a complaint with a privacy commissioner or supervisory authority</li>
        </ul>
        <p>
          To exercise any of these rights, contact us at{" "}
          <a href="mailto:contact@bowvalleycleaners.ca" className="bv-link hover:underline">
            contact@bowvalleycleaners.ca
          </a>
          . We will respond within 30 days.
        </p>
      </LegalSection>

      <LegalSection title="8. Children's Privacy">
        <p>
          The Site is not directed to children under the age of 13. We do not knowingly collect personal
          information from children under 13. If we become aware that we have inadvertently collected such
          data, we will delete it promptly.
        </p>
      </LegalSection>

      <LegalSection title="9. Data Security">
        <p>
          We implement reasonable administrative, technical, and physical safeguards to protect your data.
          However, no method of transmission over the internet or electronic storage is 100% secure. We
          cannot guarantee absolute security.
        </p>
      </LegalSection>

      <LegalSection title="10. International Transfers">
        <p>
          Your information may be transferred to and processed in countries other than your own, including
          Canada and the United States (where some of our service providers may operate). We take steps to
          ensure that appropriate safeguards are in place for such transfers in compliance with applicable law.
        </p>
      </LegalSection>

      <LegalSection title="11. Third-Party Links">
        <p>
          The Site may contain links to third-party websites or services, including listed cleaning
          companies. We are not responsible for the privacy practices of those third parties and encourage
          you to review their privacy policies.
        </p>
      </LegalSection>

      <LegalSection title="12. Changes to This Policy">
        <p>
          We may update this Privacy Policy periodically. Changes will be posted with a revised effective
          date. Continued use of the Site after changes constitutes acceptance of the updated policy.
        </p>
      </LegalSection>

      <LegalSection title="13. Contact">
        <p>
          For privacy-related questions or requests:{" "}
          <a href="mailto:contact@bowvalleycleaners.ca" className="bv-link hover:underline">
            contact@bowvalleycleaners.ca
          </a>
        </p>
      </LegalSection>
    </LegalPage>
  );
}
