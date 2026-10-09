import { Link } from "wouter";
import { SiteChrome } from "@/components/SiteChrome";

type PolicyKind = "privacy" | "terms";

const privacySections = [
  {
    title: "What this site does",
    body: "WEB CLIENT OS is a static storefront for a digital ebook. It uses Paddle.js, when configured, to preview localized pricing and open Paddle Checkout. This website does not run its own server, database, customer account system, or payment form. Payment details are entered into Paddle’s checkout, and Paddle processes them under its own terms and privacy notice.",
  },
  {
    title: "Information you may provide",
    body: "The site does not currently require account creation or a contact form. If you contact support by email, phone, or WhatsApp, the information you choose to share is handled by the relevant service and by the support operator. Before launch, the business owner should add the legal controller name, business address, and a support-data retention period here: [BUSINESS / CONTROLLER DETAILS TO BE COMPLETED].",
  },
  {
    title: "Currency detection and storage",
    body: "When configured, the page requests a localized price preview from Paddle.js for the WEB CLIENT OS price ID. Paddle can use visitor location to determine the likely local currency and returns the formatted price. If Paddle is unavailable or the product price is not configured, the page falls back to the ₹199 INR base price. The preview is informational; the currency, applicable taxes, and final amount are confirmed in Paddle Checkout.",
  },
  {
    title: "Cookies, analytics, and third parties",
    body: "This implementation does not add an advertising or analytics SDK. When configured, it loads Paddle.js to preview prices and launch checkout. Paddle may process device, browser, transaction, and location information as part of these services and may use cookies or similar technologies. Review Paddle’s privacy notice at https://www.paddle.com/legal/privacy. This static website does not receive or store card details. Any future analytics provider must be named here before it is enabled.",
  },
  {
    title: "Retention, security, and rights",
    body: "No purchase record or ebook entitlement is created by this placeholder version. The operator should document the retention periods for support messages and, after Paddle integration, payment and delivery records: [RETENTION SCHEDULE TO BE COMPLETED]. Depending on the visitor’s location, privacy rights may include access, correction, deletion, objection, restriction, or portability. Requests can be sent to dewifystores@gmail.com while the formal controller details are completed.",
  },
];

const termsSections = [
  {
    title: "Product and purchase",
    body: "WEB CLIENT OS is a digital ebook intended to teach beginners how to find businesses, write cold outreach, make calls, handle objections, and sell websites. The base price is ₹199 INR. When localized pricing is enabled in Paddle, the storefront and Paddle Checkout may show a local-currency price, and Paddle Checkout confirms the amount and any applicable taxes before payment. A purchase is complete only when Paddle confirms it.",
  },
  {
    title: "Delivery and access",
    body: "Before launch, the seller must publish an active Paddle product and configure how buyers receive the ebook. This static frontend does not verify transactions with a server or protect a private PDF file. A public download URL can be shared, so do not treat it as protected paid access. Configure an appropriate delivery process and complete delivery timing, access recovery, and support response terms here before sales begin: [DELIVERY / ACCESS DETAILS TO BE COMPLETED].",
  },
  {
    title: "Permitted use and intellectual property",
    body: "The ebook and its cover artwork are protected works. A buyer may use the purchased copy for personal learning. Unless the seller gives written permission, buyers may not resell, redistribute, publicly post, reproduce, sublicense, or use the ebook to create a competing product. The seller should complete the rights-holder and business details here: [RIGHTS HOLDER DETAILS TO BE COMPLETED].",
  },
  {
    title: "Refunds, cancellations, and payment processing",
    body: "The seller must publish a clear refund and cancellation policy that matches Paddle’s terms and applicable consumer rules before launch: [REFUND POLICY TO BE COMPLETED]. Paddle processes payment details through its checkout. Because this site has no backend or webhook receiver, it does not independently verify transactions or maintain order records.",
  },
  {
    title: "Liability and applicable law",
    body: "The ebook is educational material and does not promise a particular income, client result, or business outcome. The seller should complete any permitted liability limits, complaint process, governing law, and court or dispute venue after obtaining appropriate legal advice: [GOVERNING LAW / BUSINESS DETAILS TO BE COMPLETED]. Nothing here removes rights that cannot lawfully be excluded.",
  },
];

export default function Policy({ kind }: { kind: PolicyKind }) {
  const isPrivacy = kind === "privacy";
  const sections = isPrivacy ? privacySections : termsSections;
  return (
    <SiteChrome>
      <div className="page-grid legal-page">
        <div className="legal-intro">
          <Link href="/" className="back-link">← Back to the field guide</Link>
          <p className="eyebrow">{isPrivacy ? "A clear record" : "Read before you buy"}</p>
          <h1>{isPrivacy ? "Privacy Policy" : "Terms & Conditions"}</h1>
          <p className="legal-lede">
            {isPrivacy
              ? "A plain English account of how this static storefront uses Paddle.js and handles privacy-related information."
              : "The terms for the WEB CLIENT OS digital product and its powered by Paddle checkout."}
          </p>
          <p className="legal-date">Last updated: 9 October 2026 · Review business, delivery, and legal placeholders before launch.</p>
        </div>
        <div className="legal-body">
          {sections.map((section, index) => (
            <section className="legal-section" key={section.title}>
              <div className="legal-section-index">0{index + 1}</div>
              <div>
                <h2>{section.title}</h2>
                <p>{section.body}</p>
              </div>
            </section>
          ))}
          <div className="legal-contact">
            <strong>Questions about this document?</strong>
            <p>Write to <a href="mailto:dewifystores@gmail.com">dewifystores@gmail.com</a>. This link opens your email application; it does not send a message automatically.</p>
          </div>
        </div>
      </div>
    </SiteChrome>
  );
}
