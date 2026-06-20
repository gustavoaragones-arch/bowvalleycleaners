import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service | BowValleyCleaners.ca",
  description:
    "Terms of Service for BowValleyCleaners.ca — an independent cleaning services directory for the Bow Valley, operated by Albor Digital Canada.",
  alternates: {
    canonical: "https://bowvalleycleaners.ca/terms",
  },
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" lastUpdated="January 1, 2026">
      <LegalSection title="1. Acceptance of Terms">
        <p>
          By accessing or using BowValleyCleaners.ca (the &ldquo;Site&rdquo;), including browsing listings,
          submitting a quote request, adding a business, or applying as a cleaning partner, you agree to
          be bound by these Terms of Service (&ldquo;Terms&rdquo;). If you do not agree, do not use the Site.
        </p>
      </LegalSection>

      <LegalSection title="2. Who We Are">
        <p>
          BowValleyCleaners.ca is an independent, hyper-local cleaning services directory for the Canadian
          Rockies. The Site is owned and operated by <strong>Albor Digital Canada</strong> (&ldquo;Albor
          Digital,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;), based in Canmore,
          Alberta. We design and operate our own digital products. We are not a cleaning company and do
          not perform cleaning services.
        </p>
      </LegalSection>

      <LegalSection title="3. What the Site Provides">
        <p>
          The Site helps residents, property managers, and visitors in the Bow Valley find specialized
          cleaning businesses. Our services may include:
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>A searchable directory of cleaning companies and contractors</li>
          <li>A free quote-matching service that connects users with up to three directory-listed cleaners</li>
          <li>Forms for businesses to request directory inclusion or profile updates</li>
          <li>A partner application process for cleaning operators seeking curated network inclusion</li>
        </ul>
        <p>
          We reserve the right to modify, suspend, or discontinue any feature at any time without prior
          notice. We will not be liable for any such modification, suspension, or discontinuation.
        </p>
      </LegalSection>

      <LegalSection title="4. No Agency or Endorsement">
        <p>
          BowValleyCleaners.ca is a directory and referral platform only. Listing a company, featuring a
          business, or matching a user with a cleaner does <strong>not</strong> constitute an endorsement,
          guarantee, or warranty of that company&apos;s services, pricing, insurance, licensing, or
          availability. Any contract for cleaning services is solely between you and the cleaning provider.
        </p>
      </LegalSection>

      <LegalSection title="5. User Eligibility">
        <p>
          You must be at least 13 years of age to use the Site. If you are under 18, you represent that you
          have obtained parental or guardian consent. By using the Site, you represent that you meet these
          requirements.
        </p>
      </LegalSection>

      <LegalSection title="6. Acceptable Use">
        <p>You agree not to use the Site to:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Violate any applicable law or regulation</li>
          <li>Submit false, misleading, or fraudulent business or contact information</li>
          <li>Infringe on the intellectual property rights of Albor Digital or any third party</li>
          <li>Transmit harmful, abusive, or offensive content</li>
          <li>Attempt to gain unauthorized access to our systems or data</li>
          <li>Scrape, harvest, or extract directory data without written permission</li>
          <li>Use the Site for spam, unsolicited marketing, or automated bulk submissions</li>
          <li>Interfere with the operation or integrity of the Site</li>
        </ul>
      </LegalSection>

      <LegalSection title="7. Submissions and User Content">
        <p>
          When you submit a quote request, business listing, partner application, or other information, you
          grant Albor Digital Canada a non-exclusive, worldwide, royalty-free license to use, store, and
          display that information solely to operate, maintain, and improve the Site — including routing
          leads to relevant directory-listed businesses. You retain ownership of your content and are
          solely responsible for its accuracy.
        </p>
        <p>
          We may review, edit, reject, or remove listings and submissions at our sole discretion to
          maintain directory quality and accuracy.
        </p>
      </LegalSection>

      <LegalSection title="8. Intellectual Property">
        <p>
          All content, design, code, data, and materials on the Site — including text, graphics, logos,
          interface elements, and software — are the exclusive property of Albor Digital Canada or its
          licensors and are protected by applicable intellectual property laws.
        </p>
        <p>
          You are granted a limited, non-exclusive, non-transferable, revocable license to access and use
          the Site for personal, non-commercial purposes in accordance with these Terms.
        </p>
      </LegalSection>

      <LegalSection title="9. Third-Party Services and Listings">
        <p>
          Directory listings may include information sourced from publicly available third-party platforms
          (such as Google ratings and review counts). The Site may link to external websites operated by
          listed cleaning companies or other third parties. Those parties have their own terms and privacy
          policies. Albor Digital Canada is not responsible for their practices, content, or services.
        </p>
      </LegalSection>

      <LegalSection title="10. Disclaimer of Warranties">
        <p>
          THE SITE IS PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; WITHOUT WARRANTIES OF ANY
          KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR
          A PARTICULAR PURPOSE, OR NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SITE WILL BE ERROR-FREE,
          UNINTERRUPTED, OR THAT DIRECTORY INFORMATION IS COMPLETE, CURRENT, OR ACCURATE.
        </p>
      </LegalSection>

      <LegalSection title="11. Limitation of Liability">
        <p>
          TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, ALBOR DIGITAL CANADA AND ITS OWNER SHALL NOT BE
          LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF
          OR RELATED TO YOUR USE OF THE SITE, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
          OUR TOTAL LIABILITY TO YOU FOR ANY CLAIM SHALL NOT EXCEED CAD $50.
        </p>
        <p>
          Nothing in these Terms excludes or limits liability that cannot be excluded or limited under
          applicable Canadian law.
        </p>
      </LegalSection>

      <LegalSection title="12. Indemnification">
        <p>
          You agree to indemnify, defend, and hold harmless Albor Digital Canada and its owner from any
          claims, damages, liabilities, costs, or expenses (including reasonable legal fees) arising from
          your use of the Site, your submissions, your violation of these Terms, or your violation of any
          third-party rights.
        </p>
      </LegalSection>

      <LegalSection title="13. Governing Law and Disputes">
        <p>
          These Terms are governed by the laws of the Province of Alberta and the federal laws of Canada
          applicable therein, without regard to conflict of law provisions. Any dispute arising from these
          Terms or your use of the Site shall first be addressed through good-faith negotiation. If
          unresolved, disputes shall be submitted to the courts of Alberta, with venue in the judicial
          district of Canmore or Calgary, as applicable.
        </p>
      </LegalSection>

      <LegalSection title="14. Changes to These Terms">
        <p>
          We may update these Terms at any time. Changes will be posted on this page with a revised
          effective date. Your continued use of the Site after any changes constitutes your acceptance of
          the revised Terms.
        </p>
      </LegalSection>

      <LegalSection title="15. Contact">
        <p>
          For questions about these Terms, contact us at{" "}
          <a href="mailto:contact@bowvalleycleaners.ca" className="bv-link hover:underline">
            contact@bowvalleycleaners.ca
          </a>
          .
        </p>
      </LegalSection>
    </LegalPage>
  );
}
