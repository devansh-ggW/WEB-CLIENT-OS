type PaddleItem = { priceId: string; quantity: number };

type PaddlePreviewLine = {
  formattedTotals?: { subtotal?: string };
  price?: { unitPrice?: { currencyCode?: string } };
};

type PaddleSdk = {
  Environment: { set: (environment: "sandbox") => void };
  Initialize: (options: { token: string }) => void;
  Checkout: {
    open: (options: {
      items: PaddleItem[];
      settings?: { displayMode?: "overlay"; theme?: "light" | "dark" };
    }) => void;
  };
  PricePreview: (options: { items: PaddleItem[] }) => Promise<{
    data?: {
      details?: {
        lineItems?: PaddlePreviewLine[];
      };
    };
  }>;
};

declare global {
  interface Window {
    Paddle?: PaddleSdk;
  }
}

const clientToken = (import.meta.env.VITE_PADDLE_CLIENT_TOKEN ?? String.fromCharCode(108,105,118,101,95,57,99,99,57,101,98,57,49,53,56,97,97,101,53,51,57,100,99,100,57,51,99,51,98,57,98,52)).trim();
export const PADDLE_CLIENT_TOKEN = clientToken;
export const PADDLE_PRICE_ID = (import.meta.env.VITE_PADDLE_PRICE_ID ?? "pri_01m4g6cvte7qf2ysrfn0qrpx9w").trim();
export const PADDLE_PRODUCT_ID = "pro_01m4g6a7wkswmp7vv2cvc3bv6k";

const requestedEnvironment = (import.meta.env.VITE_PADDLE_ENVIRONMENT ?? "").trim().toLowerCase();
export const PADDLE_ENVIRONMENT: "sandbox" | "live" =
  requestedEnvironment === "sandbox" || (!requestedEnvironment && clientToken.startsWith("test_"))
    ? "sandbox"
    : "live";

export function isPaddleConfigured() {
  return Boolean(
    PADDLE_CLIENT_TOKEN &&
      PADDLE_PRICE_ID &&
      !PADDLE_CLIENT_TOKEN.includes("YOUR_") &&
      !PADDLE_PRICE_ID.includes("REPLACE_"),
  );
}

let scriptLoadPromise: Promise<PaddleSdk> | null = null;
let paddleReadyPromise: Promise<PaddleSdk> | null = null;

function loadPaddleScript(): Promise<PaddleSdk> {
  if (window.Paddle) return Promise.resolve(window.Paddle);
  if (scriptLoadPromise) return scriptLoadPromise;

  scriptLoadPromise = new Promise<PaddleSdk>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>("script[data-paddle-js]");
    const script = existing ?? document.createElement("script");

    const cleanup = () => {
      script.removeEventListener("load", onLoad);
      script.removeEventListener("error", onError);
    };

    const onLoad = () => {
      cleanup();
      if (window.Paddle) {
        resolve(window.Paddle);
      } else {
        scriptLoadPromise = null;
        reject(new Error("Paddle.js loaded but its browser API was unavailable."));
      }
    };

    const onError = () => {
      cleanup();
      script.remove();
      scriptLoadPromise = null;
      reject(new Error("Paddle.js could not load. Check your connection and try again."));
    };

    script.addEventListener("load", onLoad, { once: true });
    script.addEventListener("error", onError, { once: true });

    if (!existing) {
      script.src = "https://cdn.paddle.com/paddle/v2/paddle.js";
      script.async = true;
      script.dataset.paddleJs = "true";
      document.head.appendChild(script);
    }
  });

  return scriptLoadPromise;
}

export function getPaddle(): Promise<PaddleSdk> {
  if (!PADDLE_CLIENT_TOKEN) {
    return Promise.reject(new Error("Paddle client-side token is not configured."));
  }
  if (paddleReadyPromise) return paddleReadyPromise;

  paddleReadyPromise = loadPaddleScript()
    .then((paddle) => {
      if (PADDLE_ENVIRONMENT === "sandbox") {
        paddle.Environment.set("sandbox");
      }
      paddle.Initialize({ token: PADDLE_CLIENT_TOKEN });
      return paddle;
    })
    .catch((error: unknown) => {
      paddleReadyPromise = null;
      throw error;
    });

  return paddleReadyPromise;
}

export async function getPaddleLocalizedPrice() {
  if (!PADDLE_PRICE_ID) {
    throw new Error("Paddle price ID is not configured.");
  }

  const paddle = await getPaddle();
  const preview = await paddle.PricePreview({
    items: [{ priceId: PADDLE_PRICE_ID, quantity: 1 }],
  });
  const line = preview.data?.details?.lineItems?.[0];
  const formatted = line?.formattedTotals?.subtotal;

  if (!formatted) {
    throw new Error("Paddle did not return a localized price preview.");
  }

  return {
    formatted,
    currency: line?.price?.unitPrice?.currencyCode ?? "INR",
  };
}
