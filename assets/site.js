(() => {
  const config = window.WEB_CLIENT_OS_CONFIG || {};
  const priceNodes = document.querySelectorAll("[data-price]");
  const priceHints = document.querySelectorAll("[data-price-hint]");
  const buyButtons = document.querySelectorAll("[data-buy]");
  const toast = document.querySelector("[data-toast]");
  const toastText = document.querySelector("[data-toast-text]");
  const toastClose = document.querySelector("[data-toast-close]");
  let paddlePromise = null;
  let initialized = false;
  let toastTimer = null;

  function message(text) {
    if (!toast || !toastText) return;
    toastText.textContent = text;
    toast.classList.add("is-visible");
    toast.setAttribute("aria-hidden", "false");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove("is-visible");
      toast.setAttribute("aria-hidden", "true");
    }, 8500);
  }
  if (toastClose) toastClose.addEventListener("click", () => {
    toast.classList.remove("is-visible");
    toast.setAttribute("aria-hidden", "true");
  });

  function configured() {
    return Boolean(String(config.paddleClientToken || "").trim() && String(config.paddlePriceId || "").trim());
  }
  function loadPaddle() {
    if (window.Paddle) return Promise.resolve(window.Paddle);
    if (paddlePromise) return paddlePromise;
    paddlePromise = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://cdn.paddle.com/paddle/v2/paddle.js";
      script.async = true;
      script.onload = () => window.Paddle ? resolve(window.Paddle) : reject(new Error("Paddle.js loaded, but its API is unavailable."));
      script.onerror = () => reject(new Error("Paddle.js could not load. Check your connection and try again."));
      document.head.appendChild(script);
    }).catch(error => { paddlePromise = null; throw error; });
    return paddlePromise;
  }
  async function paddleReady() {
    if (!configured()) throw new Error("Paddle is not configured yet. Add the client-side token and active price ID in assets/site-config.js.");
    const paddle = await loadPaddle();
    if (!initialized) {
      if (String(config.paddleEnvironment || "live").toLowerCase() === "sandbox") paddle.Environment.set("sandbox");
      paddle.Initialize({ token: String(config.paddleClientToken).trim() });
      initialized = true;
    }
    return paddle;
  }
  async function refreshPrice() {
    if (!configured()) {
      priceNodes.forEach(node => node.textContent = "₹199");
      priceHints.forEach(node => node.textContent = "Base price · ₹199 INR. Checkout setup is still required.");
      return;
    }
    try {
      const paddle = await paddleReady();
      const response = await paddle.PricePreview({ items: [{ priceId: String(config.paddlePriceId).trim(), quantity: 1 }] });
      const item = response?.data?.details?.lineItems?.[0];
      const formatted = item?.formattedTotals?.subtotal || item?.formattedTotals?.total;
      if (!formatted) throw new Error("No localized price was returned.");
      priceNodes.forEach(node => node.textContent = formatted);
      priceHints.forEach(node => node.textContent = "Localized price from Paddle · final amount and applicable taxes are confirmed at checkout.");
    } catch (_) {
      priceNodes.forEach(node => node.textContent = "₹199");
      priceHints.forEach(node => node.textContent = "Showing the ₹199 INR base price because Paddle pricing preview is unavailable.");
    }
  }
  buyButtons.forEach(button => button.addEventListener("click", async () => {
    const label = button.dataset.loadingLabel || button.textContent;
    button.disabled = true;
    button.setAttribute("aria-busy", "true");
    try {
      const paddle = await paddleReady();
      paddle.Checkout.open({
        items: [{ priceId: String(config.paddlePriceId).trim(), quantity: 1 }],
        settings: { displayMode: "overlay", theme: "light" }
      });
    } catch (error) {
      message(error?.message || "Checkout could not open. Check Paddle token, price ID, environment, and approved domain.");
    } finally {
      button.disabled = false;
      button.removeAttribute("aria-busy");
      if (button.dataset.loadingLabel) button.textContent = label;
    }
  }));
  const stage = document.querySelector("[data-book-stage]");
  if (stage && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    stage.addEventListener("pointermove", event => {
      if (event.pointerType === "touch") return;
      const rect = stage.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - .5;
      const y = (event.clientY - rect.top) / rect.height - .5;
      stage.style.transform = "rotateX(" + (-y * 7).toFixed(2) + "deg) rotateY(" + (x * 10).toFixed(2) + "deg)";
    }, { passive: true });
    stage.addEventListener("pointerleave", () => stage.style.transform = "rotateX(0deg) rotateY(0deg)", { passive: true });
  }
  refreshPrice();
})();