import { Link } from "wouter";
import { SiteChrome } from "@/components/SiteChrome";

type PolicyKind = "privacy" | "terms";

const privacySections = [
  {
    title: "What this site does",
    body: "WEB CLIENT OS is a storefront for a digital ebook. The current site presents the book, displays an INR base price, calculates an estimated local equivalent when possible, and provides support links. Paddle Checkout is intentionally not connected yet, so this version does not collect payment details or grant ebook access.",
  },
  {
    title: "Information you may provide",
    body: "The site does not currently require account creation or a contact form. If you contact support by email, phone, or WhatsApp, the information you choose to share is handled by the relevant service and by the support operator. Before launch, the business owner should add the legal controller name, business address, and a support-data retention period here: [BUSINESS / CONTROLLER DETAILS TO BE COMPLETED].",
  },
  {
    title: "Currency detection and storage",
    body: "The page reads the browser language and region to choose a likely display currency. For visitors outside India, it requests a reference rate from Frankfurter and labels the result as an estimate. A short-lived sessionStorage entry may cache the rate for up to 30 minutes. If detection or the rate request fails, the page falls back to ₹199 INR. The displayed estimate is not a payment authorization or proof of purchase.",
  },
  {
    title: "Cookies, analytics, and third parties",
    body: "This implementation does not add advertising cookies or an analytics SDK. It uses browser session storage for the currency cache and loads the supplied cover from the site’s storage path. Frankfurter receives a rate request without payment or account data. When Paddle is connected, its checkout, cookies, payment processing, and privacy terms must be added to this notice before launch. Any future analytics provider must also be named here before it is enabled.",
  },
  {
    title: "Retention, security, and rights",
    body: "No purchase record or ebook entitlement is created by this placeholder version. The operator should document the retention periods for support messages and, after Paddle integration, payment and delivery records: [RETENTION SCHEDULE TO BE COMPLETED]. Depending on the visitor’s location, privacy rights may include access, correction, deletion, objection, restriction, or portability. Requests can be sent to dewifystores@gmail.com while the formal controller details are completed.",
  },
];

const termsSections = [
  {
    title: "Product and purchase",
    body: "WEB CLIENT OS is a digital ebook intended to teach beginners how to find businesses, write cold outreach, make calls, handle objections, and sell websites. The source price is ₹199 INR; converted values shown on the site are estimates. Paddle Checkout is not connected in this version, so no purchase can be completed from this placeholder and no access is granted by clicking Buy Now.",
  },
  {
    title: "Delivery and access",
    body: "Before launch, the seller must publish a real Paddle product and define a protected delivery method for the ebook PDF. Access should be granted only after verified provider events, not from a browser redirect or a client-side success message. Delivery timing, access recovery, and support response terms should be completed here before sales begin: [DELIVERY / ACCESS DETAILS TO BE COMPLETED].",
  },
  {
    title: "Permitted use and intellectual property",
    body: "The ebook and its cover artwork are protected works. A buyer may use the purchased copy for personal learning. Unless the seller gives written permission, buyers may not resell, redistribute, publicly post, reproduce, sublicense, or use the ebook to create a competing product. The seller should complete the rights-holder and business details here: [RIGHTS-HOLDER DETAILS TO BE COMPLETED].",
  },
  {
    title: "Refunds, cancellations, and payment processing",
    body: "No refund promise is made by this placeholder page. The seller must choose and publish a lawful refund and cancellation policy that matches Paddle’s terms and applicable consumer rules before launch: [REFUND POLICY TO BE COMPLETED]. Paddle, not this frontend, would process payment details. The seller must verify provider events and handle duplicate or failed events safely.",
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
              ? "A plain-English account of what this storefront does today, what it does not do yet, and what must be completed before Paddle Checkout goes live."
              : "The practical terms for a future digital purchase, written without inventing business details that have not been supplied."}
          </p>
          <p className="legal-date">Last updated: 9 October 2026 · Review placeholders before launch.</p>
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
