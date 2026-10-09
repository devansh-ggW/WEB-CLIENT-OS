import { useEffect, type ReactNode } from "react";
import { Link, useLocation } from "wouter";

const SITE_NAME = "WEB CLIENT OS";

const pageMeta: Record<string, { title: string; description: string }> = {
  "/": {
    title: "WEB CLIENT OS — Turn outreach into website deals",
    description:
      "A practical playbook for finding businesses, writing cold emails, making cold calls, and closing your first website deal.",
  },
  "/privacy": {
    title: "Privacy Policy — WEB CLIENT OS",
    description: "How WEB CLIENT OS handles website, currency, support, and future payment data.",
  },
  "/terms": {
    title: "Terms & Conditions — WEB CLIENT OS",
    description: "Terms for purchasing, accessing, and using the WEB CLIENT OS digital ebook.",
  },
  "/support": {
    title: "Support — WEB CLIENT OS",
    description: "Contact WEB CLIENT OS support by email, phone, or WhatsApp.",
  },
};

export function usePageMeta(path: string) {
  useEffect(() => {
    const meta = pageMeta[path] ?? pageMeta["/"];
    document.title = meta.title;
    const description = document.querySelector('meta[name="description"]');
    description?.setAttribute("content", meta.description);
    document.documentElement.lang = "en";
  }, [path]);
}

export function Wordmark() {
  return (
    <span className="wordmark" aria-label={SITE_NAME}>
      <span className="wordmark-mark">OS</span>
      <span className="wordmark-copy">
        <span>WEB CLIENT</span>
        <span>FIELD GUIDE</span>
      </span>
    </span>
  );
}

export function SiteChrome({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  usePageMeta(location);

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="site-header-inner">
          <Link href="/" className="brand-link" aria-label="WEB CLIENT OS home">
            <Wordmark />
          </Link>
          <nav className="site-nav" aria-label="Primary navigation">
            <Link href="/" className={location === "/" ? "nav-link active" : "nav-link"}>
              Home
            </Link>
            <Link href="/privacy" className={location === "/privacy" ? "nav-link active" : "nav-link"}>
              Privacy
            </Link>
            <Link href="/terms" className={location === "/terms" ? "nav-link active" : "nav-link"}>
              Terms
            </Link>
            <Link href="/support" className={location === "/support" ? "nav-link active" : "nav-link"}>
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
