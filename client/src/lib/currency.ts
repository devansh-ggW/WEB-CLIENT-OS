import {
  getPaddleLocalizedPrice,
  isPaddleConfigured,
} from "@/lib/paddle";

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

function browserLocale() {
  if (typeof navigator === "undefined") return "en-IN";
  return navigator.language || "en-IN";
}

function fallback(locale = browserLocale(), error = true): CurrencyState {
  return {
    currency: "INR",
    amount: BASE_PRICE_INR,
    formatted: new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(BASE_PRICE_INR),
    isEstimate: false,
    loading: false,
    error,
    locale,
  };
}

/**
 * Paddle's price preview is the source of truth for localized pricing.
 * This avoids showing an unrelated exchange-rate estimate that might differ
 * from the price Paddle actually offers in checkout.
 */
export async function getLocalizedPrice(): Promise<CurrencyState> {
  const locale = browserLocale();
  if (!isPaddleConfigured()) return fallback(locale, true);

  try {
    const localized = await getPaddleLocalizedPrice();
    return {
      currency: localized.currency,
      amount: BASE_PRICE_INR,
      formatted: localized.formatted,
      isEstimate: false,
      loading: false,
      error: false,
      locale,
    };
  } catch {
    return fallback(locale, true);
  }
}
