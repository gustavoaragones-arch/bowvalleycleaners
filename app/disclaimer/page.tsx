import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Disclaimer | BowValleyCleaners.ca",
  description:
    "Important disclaimers for BowValleyCleaners.ca — an independent cleaning directory for the Bow Valley, operated by Albor Digital Canada.",
  alternates: {
    canonical: "https://bowvalleycleaners.ca/disclaimer",
  },
};

export default function DisclaimerPage() {
  return (
    <LegalPage title="Disclaimer" lastUpdated="January 1, 2026">
      <LegalSection title="1. General Disclaimer">
        <p>
          The listings, tools, data, and content provided on BowValleyCleaners.ca (the &ldquo;Site&rdquo;)
          are offered for informational and practical utility purposes only. While we strive for accuracy
          and usefulness, we make no representations or warranties — express or implied — regarding the
          completeness, accuracy, reliability, or suitability of any information for any particular purpose.
          All use is at your own risk.
        </p>
        <p>
          BowValleyCleaners.ca is an independent directory operated by Albor Digital Canada. We are not a
          cleaning company, employment agency, or franchise network.
        </p>
      </LegalSection>

      <LegalSection title="2. Directory Listings and Ratings">
        <p>
          Company listings, ratings, review counts, trust badges, and specialization labels are compiled
          from publicly available third-party sources, business submissions, and editorial review. They are
          provided for general reference only.
        </p>
        <p>
          We do not independently verify every claim made by listed businesses, including insurance status,
          licensing, background checks, years in business, or service quality. Display of a badge or
          credential indicates that a business has represented that credential — not that we have audited
          or guaranteed it.
        </p>
        <p>
          Featured placements are labelled as such. Inclusion in the directory does not constitute an
          endorsement, recommendation, or guarantee of any listed company.
        </p>
      </LegalSection>

      <LegalSection title="3. Quote Matching Service">
        <p>
          Our free quote-matching service connects users with up to three directory-listed cleaning
          businesses based on property type, location, and stated requirements. We do not guarantee that
          matched cleaners will respond, provide quotes, be available, or meet your expectations. Any
          agreement for cleaning services is solely between you and the cleaning provider.
        </p>
      </LegalSection>

      <LegalSection title="4. No Professional Advice">
        <p>
          Nothing provided through the Site constitutes legal, financial, medical, insurance, tax, or
          professional advice of any kind. Any data, analysis, or output from our tools should not be relied
          upon as a substitute for advice from a qualified professional. Always seek independent
          professional guidance before making decisions based on information found on the Site.
        </p>
      </LegalSection>

      <LegalSection title="5. AI-Assisted Features">
        <p>
          Where the Site incorporates artificial intelligence or automated matching, outputs are generated
          algorithmically and may contain errors, omissions, or inaccuracies. AI-assisted outputs reflect
          patterns in available data and do not represent verified facts, professional opinions, or the
          views of Albor Digital Canada.
        </p>
        <p>
          In line with our responsible AI practices, automated features are designed for informational and
          decision-support purposes only. Users retain full responsibility for evaluating and verifying any
          automated output before acting on it. We discourage submitting sensitive personal data through
          AI-assisted interfaces.
        </p>
      </LegalSection>

      <LegalSection title="6. External Links">
        <p>
          The Site may reference or link to external websites and resources, including listed cleaning
          companies, review platforms, and social profiles. Albor Digital Canada does not control and is not
          responsible for the content, accuracy, or availability of external sites. Inclusion of a link does
          not imply endorsement.
        </p>
      </LegalSection>

      <LegalSection title="7. Limitation of Liability">
        <p>
          To the fullest extent permitted by applicable law, Albor Digital Canada and its owner shall not be
          liable for any direct, indirect, incidental, consequential, or punitive damages arising from reliance
          on or use of the Site, listings, quote matching, or any content therein — including any errors,
          interruptions, or inaccuracies.
        </p>
        <p>
          Nothing in this Disclaimer excludes or limits liability that cannot be excluded or limited under
          applicable Canadian law.
        </p>
      </LegalSection>

      <LegalSection title="8. Jurisdictional Notice">
        <p>
          The Site is operated from Canmore, Alberta, Canada. We make no representation that the Site is
          appropriate or available for use in all jurisdictions. Users who access the Site from outside
          Canada do so at their own initiative and are responsible for compliance with local laws.
        </p>
      </LegalSection>

      <LegalSection title="9. Contact">
        <p>
          For questions about this Disclaimer:{" "}
          <a href="mailto:contact@bowvalleycleaners.ca" className="bv-link hover:underline">
            contact@bowvalleycleaners.ca
          </a>
        </p>
      </LegalSection>
    </LegalPage>
  );
}
