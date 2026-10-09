export const BASE_PRICE_INR = 199;

export type CurrencyState = {
  currency: string;
  amount: number;
  formatted: string;
  isEstimate: boolean;
  loading: boolean;
  error: boolean;
  locale: string;
};

const CACHE_KEY = "web-client-os-currency-v1";
const CACHE_TTL_MS = 30 * 60 * 1000;

const regionCurrency: Record<string, string> = {
  IN: "INR",
  US: "USD",
  CA: "CAD",
  GB: "GBP",
  AU: "AUD",
  NZ: "NZD",
  SG: "SGD",
  AE: "AED",
  SA: "SAR",
  JP: "JPY",
  CN: "CNY",
  HK: "HKD",
  KR: "KRW",
  BR: "BRL",
  MX: "MXN",
  ZA: "ZAR",
  CH: "CHF",
  SE: "SEK",
  NO: "NOK",
  DK: "DKK",
  PL: "PLN",
  TR: "TRY",
  TH: "THB",
  MY: "MYR",
  ID: "IDR",
  PH: "PHP",
};

function browserLocale() {
  if (typeof navigator === "undefined") return "en-IN";
  return navigator.language || "en-IN";
}

function detectCurrency(locale: string) {
  try {
    const region = new Intl.Locale(locale).region;
    return regionCurrency[region ?? ""] ?? (locale.toLowerCase().startsWith("en-in") ? "INR" : "USD");
  } catch {
    return "INR";
  }
}

function formatAmount(amount: number, currency: string, locale: string) {
  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      maximumFractionDigits: currency === "JPY" || currency === "KRW" ? 0 : 2,
    }).format(amount);
  } catch {
    return `₹${BASE_PRICE_INR}`;
  }
}

function fallback(locale = browserLocale(), error = true): CurrencyState {
  return {
    currency: "INR",
    amount: BASE_PRICE_INR,
    formatted: formatAmount(BASE_PRICE_INR, "INR", "en-IN"),
    isEstimate: false,
    loading: false,
    error,
    locale,
  };
}

function readCache(currency: string) {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const cached = JSON.parse(raw) as { timestamp: number; currency: string; rate: number };
    if (cached.currency !== currency || Date.now() - cached.timestamp > CACHE_TTL_MS) return null;
    return cached.rate;
  } catch {
    return null;
  }
}

function writeCache(currency: string, rate: number) {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ timestamp: Date.now(), currency, rate }));
  } catch {
    // Storage can be unavailable in private browsing; the page still works without caching.
  }
}

export async function getLocalizedPrice(): Promise<CurrencyState> {
  const locale = browserLocale();
  const currency = detectCurrency(locale);
  if (currency === "INR") return fallback(locale, false);

  const cachedRate = readCache(currency);
  if (cachedRate && Number.isFinite(cachedRate)) {
    const amount = BASE_PRICE_INR * cachedRate;
    return {
      currency,
      amount,
      formatted: formatAmount(amount, currency, locale),
      isEstimate: true,
      loading: false,
      error: false,
      locale,
    };
  }

  try {
    const response = await fetch(`https://api.frankfurter.app/latest?from=INR&to=${encodeURIComponent(currency)}`, {
      headers: { Accept: "application/json" },
    });
    if (!response.ok) throw new Error(`Rate request failed: ${response.status}`);
    const data = (await response.json()) as { rates?: Record<string, number> };
    const rate = data.rates?.[currency];
    if (!rate || !Number.isFinite(rate)) throw new Error("Currency rate missing");
    writeCache(currency, rate);
    const amount = BASE_PRICE_INR * rate;
    return {
      currency,
      amount,
      formatted: formatAmount(amount, currency, locale),
      isEstimate: true,
      loading: false,
      error: false,
      locale,
    };
  } catch {
    return fallback(locale, true);
  }
}
