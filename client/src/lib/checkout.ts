import {
  getPaddle,
  isPaddleConfigured,
  PADDLE_PRICE_ID,
} from "@/lib/paddle";

export type CheckoutResult =
  | { ready: true }
  | { ready: false; message: string };

export async function beginPaddleCheckout(): Promise<CheckoutResult> {
  if (!isPaddleConfigured()) {
    const missing: string[] = [];
    if (!import.meta.env.VITE_PADDLE_CLIENT_TOKEN) missing.push("VITE_PADDLE_CLIENT_TOKEN");
    if (!PADDLE_PRICE_ID) missing.push("VITE_PADDLE_PRICE_ID");

    return {
      ready: false,
      message:
        "Paddle is not configured yet. Add these repository Actions variables before purchases can start: " +
        missing.join(" and ") +
        ". Use a Paddle Paddle browser token, never a Paddle API secret.",
    };
  }

  try {
    const paddle = await getPaddle();
    paddle.Checkout.open({
      items: [{ priceId: PADDLE_PRICE_ID, quantity: 1 }],
      settings: {
        displayMode: "overlay",
        theme: "light",
      },
    });
    return { ready: true };
  } catch {
    return {
      ready: false,
      message:
        "Paddle checkout could not open. Check that the token and price ID belong to the same Paddle environment, the price is active, and the checkout domain is approved in Paddle.",
    };
  }
}
