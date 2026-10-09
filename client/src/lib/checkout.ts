export type CheckoutResult = {
  ready: false;
  message: string;
};

/**
 * Paddle is intentionally not configured yet. This boundary makes the future
 * integration explicit without pretending that payment or delivery exists.
 */
export function beginPaddleCheckout(): CheckoutResult {
  return {
    ready: false,
    message:
      "Paddle Checkout is not connected yet. No payment was started. Before launch, add the Paddle product/price, seller account, server-side verification, webhook handling, and protected ebook delivery.",
  };
}
