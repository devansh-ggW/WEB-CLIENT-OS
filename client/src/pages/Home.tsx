import { ArrowUpRight, Check, CircleAlert, RotateCcw, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { SiteChrome } from "@/components/SiteChrome";
import { beginPaddleCheckout } from "@/lib/checkout";
import { BASE_PRICE_INR, getLocalizedPrice, type CurrencyState } from "@/lib/currency";
import { isPaddleConfigured } from "@/lib/paddle";

const COVER_IMAGE = "/book-cover.png";

const outcomes = [
  { index: "01", title: "Find real businesses", copy: "Spot owners who need a better website now, not someday." },
  { index: "02", title: "Write cold emails", copy: "Use practical scripts that earn replies instead of silence." },
  { index: "03", title: "Make confident calls", copy: "Know what to say, how to open, and how to keep the conversation moving." },
  { index: "04", title: "Handle objections", copy: "Turn “it’s expensive” and “we already have a website” into next steps." },
  { index: "05", title: "Close & get paid", copy: "Present, negotiate, deliver, and keep the client long term." },
];

function BookStage() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("rotateX(0deg) rotateY(0deg)");
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce), (max-width: 680px), (hover: none), (pointer: coarse)");
    if (reduceMotion.matches) return;
    const stage = stageRef.current;
    if (!stage) return;

    const handleMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      const bounds = stage.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      setTransform(`rotateX(${(-y * 10).toFixed(2)}deg) rotateY(${(x * 12).toFixed(2)}deg)`);
    };
    const handleLeave = () => setTransform("rotateX(0deg) rotateY(0deg)");
    stage.addEventListener("pointermove", handleMove, { passive: true });
    stage.addEventListener("pointerleave", handleLeave, { passive: true });
    return () => {
      stage.removeEventListener("pointermove", handleMove);
      stage.removeEventListener("pointerleave", handleLeave);
    };
  }, []);

  return (
    <div className="book-composition" aria-label="Interactive WEB CLIENT OS book cover">
      <div className="book-stage-label">
        <span className="eyebrow-dot" aria-hidden="true" />
        <span>THE FIELD GUIDE / 01</span>
      </div>
      <div ref={stageRef} className="book-stage" style={{ perspective: "1200px" }}>
        <div className="book-halo" aria-hidden="true" />
        <div
          className={loaded ? "book-tilt loaded" : "book-tilt"}
          style={{ transform }}
          aria-busy={!loaded && !failed}
        >
          <div className="book-edge" aria-hidden="true" />
          {!failed ? (
            <img
              className="book-cover"
              src={COVER_IMAGE}
              alt="WEB CLIENT OS front cover"
              onLoad={() => setLoaded(true)}
              onError={() => setFailed(true)}
            />
          ) : (
            <div className="book-fallback">
              <CircleAlert size={22} aria-hidden="true" />
              <span>Cover preview unavailable</span>
            </div>
          )}
        </div>
        <div className="book-shadow" aria-hidden="true" />
      </div>
      <p className="book-stage-note">
        <RotateCcw size={13} aria-hidden="true" />
        Move across the cover to explore the depth
      </p>
    </div>
  );
}

function PriceBlock({ price }: { price: CurrencyState }) {
  return (
    <div className="price-block" aria-live="polite">
      <span className="price-label">SINGLE PURCHASE DIGITAL EDITION</span>
      <strong className="price-value">{price.loading ? "Loading…" : price.formatted}</strong>
      {price.error ? (
        <span className="price-note warning">Paddle price preview unavailable · showing the ₹{BASE_PRICE_INR} INR base price</span>
      ) : (
        <span className="price-note">Localized by Paddle · final amount and taxes confirmed at checkout</span>
      )}
    </div>
  );
}

export default function Home() {
  const [price, setPrice] = useState<CurrencyState>({
    currency: "INR",
    amount: BASE_PRICE_INR,
    formatted: "₹199",
    isEstimate: false,
    loading: true,
    error: false,
    locale: "en-IN",
  });
  const [checkoutMessage, setCheckoutMessage] = useState<string | null>(null);
  const [checkoutBusy, setCheckoutBusy] = useState(false);
  const paddleConfigured = isPaddleConfigured();

  useEffect(() => {
    let active = true;
    getLocalizedPrice().then((next) => {
      if (active) setPrice(next);
    });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const schemaScript = document.createElement("script");
    schemaScript.id = "web-client-os-product-schema";
    schemaScript.type = "application/ld+json";
    schemaScript.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Product",
      name: "WEB CLIENT OS Digital Guide",
      description: "A practical digital guide to finding business leads, writing cold emails, making calls, and selling websites.",
      image: "https://webclientos.dewify.shop/book-cover.png",
      productID: "pro_01m4g6a7wkswmp7vv2cvc3bv6k",
      sku: "pro_01m4g6a7wkswmp7vv2cvc3bv6k",
      brand: { "@type": "Brand", name: "WEB CLIENT OS" },
      offers: { "@type": "Offer", price: "199", priceCurrency: "INR", url: "https://webclientos.dewify.shop/" }
    });
    document.head.appendChild(schemaScript);
    return () => schemaScript.remove();
  }, []);

  const handleBuy = async () => {
    setCheckoutMessage(null);
    setCheckoutBusy(true);
    try {
      const result = await beginPaddleCheckout();
      if (!result.ready) setCheckoutMessage(result.message);
    } finally {
      setCheckoutBusy(false);
    }
  };

  return (
    <SiteChrome>
      <div className="page-grid home-page">
        <section className="hero-section" aria-labelledby="hero-title">
          <div className="hero-copy">
            <div className="topline">
              <span>WEB CLIENT OS</span>
              <span className="topline-rule" aria-hidden="true" />
              <span>MORE CLIENTS. MORE WEBSITES. MORE INCOME.</span>
            </div>
            <div className="hero-kicker"><Sparkles size={14} aria-hidden="true" /> Practical guide / digital edition</div>
            <h1 id="hero-title">
              The world doesn’t need
              <span>more websites.</span>
              <em>It needs people who can sell them.</em>
            </h1>
            <p className="hero-intro">
              WEB CLIENT OS is the step by step playbook for landing your first cold call or cold email and selling websites to real businesses, even if you’re starting from zero.
            </p>
            <div className="hero-detail">
              <span className="detail-line" aria-hidden="true" />
              <p>No agency. No theory. Just the scripts, decisions, and next moves that take you from outreach to a paid website deal.</p>
            </div>
            <div className="hero-actions">
              <button type="button" className="primary-button" onClick={handleBuy} disabled={checkoutBusy}>
                {checkoutBusy ? "Opening checkout…" : "Buy the guide"} <ArrowUpRight size={18} aria-hidden="true" />
              </button>
              <span className="action-note">{paddleConfigured ? "Single purchase · powered by Paddle" : "Paddle setup required before purchases can start"}</span>
            </div>
          </div>
          <BookStage />
        </section>

        <section className="outcomes-section" aria-labelledby="outcomes-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Inside the playbook</p>
              <h2 id="outcomes-title">Skills that turn into clients.</h2>
            </div>
            <p className="section-aside">A field tested path for beginners who want practical momentum, not another course to finish.</p>
          </div>
          <div className="outcomes-list">
            {outcomes.map((outcome) => (
              <article className="outcome-row" key={outcome.index}>
                <span className="outcome-index">{outcome.index}</span>
                <h3>{outcome.title}</h3>
                <p>{outcome.copy}</p>
                <Check size={16} aria-hidden="true" />
              </article>
            ))}
          </div>
        </section>

        <section className="purchase-section" aria-labelledby="purchase-title">
          <div className="purchase-cover-mark">
            <img src={COVER_IMAGE} alt="" aria-hidden="true" />
          </div>
          <div className="purchase-copy">
            <p className="eyebrow">Start with one conversation</p>
            <h2 id="purchase-title">Read the playbook.<br />Make the call.</h2>
            <p>One clear system. A handful of scripts. Your first serious shot at turning a website skill into income.</p>
          </div>
          <div className="purchase-cta">
            <PriceBlock price={price} />
            <button type="button" className="secondary-button" onClick={handleBuy} disabled={checkoutBusy}>{checkoutBusy ? "Opening checkout…" : "Buy now"} <ArrowUpRight size={17} aria-hidden="true" /></button>
          </div>
        </section>

        {checkoutMessage ? (
          <div className="notice-panel" role="status">
            <div className="notice-icon"><CircleAlert size={18} aria-hidden="true" /></div>
            <div>
              <strong>Checkout could not be opened.</strong>
              <p>{checkoutMessage}</p>
            </div>
            <button type="button" className="notice-close" onClick={() => setCheckoutMessage(null)} aria-label="Dismiss checkout notice">×</button>
          </div>
        ) : null}

        <p className="home-footnote">{paddleConfigured ? "Paddle supplies localized price previews. The final amount and applicable taxes are confirmed in checkout." : "The base price of ₹199 INR appears until the Paddle token and price ID are configured."}</p>
      </div>
    </SiteChrome>
  );
}
