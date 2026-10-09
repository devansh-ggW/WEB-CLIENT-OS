import { useEffect, useState, type ReactNode } from "react";
import { Link, useLocation } from "wouter";

const SITE_NAME = "WEB CLIENT OS";
const SITE_URL = "https://webclientos.dewify.shop";
const SHARE_IMAGE = SITE_URL + "/book-cover.png";

const pageMeta: Record<string, { title: string; description: string }> = {
  "/": {
    title: "WEB CLIENT OS: The Guide to Landing Website Clients",
    description:
      "Learn to find business leads, write cold emails, make calls, and sell websites with the WEB CLIENT OS digital guide.",
  },
  "/privacy": {
    title: "Privacy Policy | WEB CLIENT OS",
    description: "Read how WEB CLIENT OS handles visitor data, Paddle pricing previews, support messages, and checkout privacy.",
  },
  "/terms": {
    title: "Terms and Conditions | WEB CLIENT OS",
    description: "Review purchase terms, digital delivery, permitted use, refunds, and seller responsibilities for the WEB CLIENT OS guide.",
  },
  "/support": {
    title: "Support | WEB CLIENT OS",
    description: "Get help with the WEB CLIENT OS guide, purchase questions, or access by email, phone, or WhatsApp.",
  },
  "/404": {
    title: "Page not found | WEB CLIENT OS",
    description: "The page could not be found. Return to the WEB CLIENT OS digital guide to learn how to sell websites to businesses.",
  },
};

function setMeta(selector: string, attribute: "name" | "property", key: string, value: string) {
  let meta = document.head.querySelector<HTMLMetaElement>(selector);
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute(attribute, key);
    document.head.appendChild(meta);
  }
  meta.setAttribute("content", value);
}

export function usePageMeta(path: string) {
  useEffect(() => {
    const meta = pageMeta[path] ?? pageMeta["/404"];
    document.title = meta.title;
    setMeta('meta[name="description"]', "name", "description", meta.description);
    setMeta('meta[name="robots"]', "name", "robots", "index,follow,max-image-preview:large");
    setMeta('meta[property="og:type"]', "property", "og:type", path === "/" ? "product" : "website");
    setMeta('meta[property="og:site_name"]', "property", "og:site_name", SITE_NAME);
    setMeta('meta[property="og:title"]', "property", "og:title", meta.title);
    setMeta('meta[property="og:description"]', "property", "og:description", meta.description);
    setMeta('meta[property="og:url"]', "property", "og:url", SITE_URL + (path === "/" ? "/" : path));
    setMeta('meta[property="og:image"]', "property", "og:image", SHARE_IMAGE);
    setMeta('meta[property="og:image:alt"]', "property", "og:image:alt", "The WEB CLIENT OS digital guide cover");
    setMeta('meta[name="twitter:card"]', "name", "twitter:card", "summary_large_image");
    setMeta('meta[name="twitter:title"]', "name", "twitter:title", meta.title);
    setMeta('meta[name="twitter:description"]', "name", "twitter:description", meta.description);
    setMeta('meta[name="twitter:image"]', "name", "twitter:image", SHARE_IMAGE);
    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = SITE_URL + (path === "/" ? "/" : path);
    document.documentElement.lang = "en";
  }, [path]);
}

export function Wordmark() {
  return (
    <span className="wordmark" aria-label={SITE_NAME}>
      <img className="wordmark-mark" src="/brand-icon.svg" alt="" width={28} height={28} />
      <span className="wordmark-copy">
        <span>WEB CLIENT</span>
        <span>FIELD GUIDE</span>
      </span>
    </span>
  );
}

export function SiteChrome({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  usePageMeta(location);

  useEffect(() => {
    setMobileNavOpen(false);
  }, [location]);

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="site-header-inner">
          <Link href="/" className="brand-link" aria-label="WEB CLIENT OS home">
            <Wordmark />
          </Link>
          <button
            type="button"
            className="mobile-menu-toggle"
            aria-label={mobileNavOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={mobileNavOpen}
            aria-controls="primary-navigation"
            onClick={() => setMobileNavOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
          <nav id="primary-navigation" className={mobileNavOpen ? "site-nav mobile-nav-open" : "site-nav"} aria-label="Primary navigation">
            <Link href="/" onClick={() => setMobileNavOpen(false)} className={location === "/" ? "nav-link active" : "nav-link"}>
              Home
            </Link>
            <Link href="/privacy" onClick={() => setMobileNavOpen(false)} className={location === "/privacy" ? "nav-link active" : "nav-link"}>
              Privacy
            </Link>
            <Link href="/terms" onClick={() => setMobileNavOpen(false)} className={location === "/terms" ? "nav-link active" : "nav-link"}>
              Terms
            </Link>
            <Link href="/support" onClick={() => setMobileNavOpen(false)} className={location === "/support" ? "nav-link active" : "nav-link"}>
              Support
            </Link>
          </nav>
        </div>
      </header>
      <main>{children}</main>
      <footer className="site-footer">
        <div className="site-footer-inner">
          <p className="footer-note">A practical guide to turning outreach into clients.</p>
          <div className="footer-meta">
            <span>WEB CLIENT OS</span>
            <span className="footer-dot" aria-hidden="true" />
            <span>Digital field guide</span>
          </div>
          <nav className="footer-nav" aria-label="Footer navigation">
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms &amp; Conditions</Link>
            <Link href="/support">Support</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
