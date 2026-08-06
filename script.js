/* Krispin Ibyiza — Portfolio (vanilla JS)
   Skeleton only. Individual features are wired up in later batches.
   Rules:
     - No dependencies. No frameworks. No build step.
     - Respect prefers-reduced-motion.
     - Fail quietly on missing DOM nodes (progressive enhancement). */

(function () {
  "use strict";

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /** Batch 1: mobile nav toggle (hamburger). */
  function initNavToggle() {
    // TODO(Batch 1): wire up hamburger + accessible aria-expanded menu.
  }

  /** Batch 8: fade/slide-in on scroll via IntersectionObserver. */
  function initScrollReveal() {
    if (prefersReducedMotion) return;
    // TODO(Batch 8): observe [data-reveal] / .reveal and toggle .is-visible.
  }

  /** Batch 8: active nav link highlighting based on section in view. */
  function initActiveNav() {
    // TODO(Batch 8): observe section anchors and mark matching nav link as [aria-current="page"].
  }

  /** Batch 1: thin scroll-progress bar at the very top. */
  function initProgressBar() {
    // TODO(Batch 1): update --scroll-progress on scroll; bar reads from CSS.
  }

  /** Batch 5: count-up on scroll for impact metrics. */
  function initCountUp() {
    if (prefersReducedMotion) return;
    // TODO(Batch 5): animate [data-count] from 0 → target when in view.
  }

  /** Batch 7: auto-update footer copyright year. */
  function initFooterYear() {
    const el = document.querySelector("[data-year]");
    if (el) el.textContent = String(new Date().getFullYear());
  }

  function boot() {
    initNavToggle();
    initScrollReveal();
    initActiveNav();
    initProgressBar();
    initCountUp();
    initFooterYear();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
