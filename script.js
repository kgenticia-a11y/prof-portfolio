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
    const toggle = document.querySelector("[data-nav-toggle]");
    const menu = document.getElementById("primary-menu");
    const header = document.querySelector(".site-header");
    if (!toggle || !menu) return;

    const setOpen = (open) => {
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      menu.classList.toggle("is-open", open);
      document.documentElement.style.overflow = open ? "hidden" : "";
    };

    toggle.addEventListener("click", () => {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });

    menu.addEventListener("click", (e) => {
      if (e.target instanceof HTMLAnchorElement) setOpen(false);
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setOpen(false);
        toggle.focus();
      }
    });

    // Close the menu if the viewport grows out of mobile range.
    const mq = window.matchMedia("(min-width: 761px)");
    const onChange = () => { if (mq.matches) setOpen(false); };
    if (mq.addEventListener) mq.addEventListener("change", onChange);
    else mq.addListener(onChange);

    // Header border on scroll.
    if (header) {
      const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 4);
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
    }
  }

  /** Batch 1/8: fade/slide-in on scroll via IntersectionObserver. */
  function initScrollReveal() {
    const targets = document.querySelectorAll(".reveal");
    if (!targets.length) return;

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });

    targets.forEach((el) => io.observe(el));
  }

  /** Batch 8: active nav link highlighting based on section in view. */
  function initActiveNav() {
    const sections = document.querySelectorAll("main section[id]");
    const navLinks = document.querySelectorAll(".nav__list a[href^='#']");
    if (!sections.length || !navLinks.length || !("IntersectionObserver" in window)) return;

    const linkFor = (id) =>
      Array.from(navLinks).find((a) => a.getAttribute("href") === "#" + id);

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const link = linkFor(entry.target.id);
          if (!link) return;
          navLinks.forEach((a) => a.removeAttribute("aria-current"));
          link.setAttribute("aria-current", "page");
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );

    sections.forEach((section) => io.observe(section));
  }

  /** Batch 1: thin scroll-progress bar at the very top. */
  function initProgressBar() {
    const bar = document.getElementById("scroll-progress");
    if (!bar) return;
    let ticking = false;
    const update = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const pct = height > 0 ? Math.min(100, Math.max(0, (scrollTop / height) * 100)) : 0;
      bar.style.setProperty("--scroll-progress", pct + "%");
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
  }

  /** Batch 5: count-up on scroll for impact metrics.
   *  Markup already contains the true final value as static text, so this
   *  is purely decorative: reduced-motion (or no JS) users just see the
   *  correct number the whole time — nothing depends on the animation. */
  function initCountUp() {
    if (prefersReducedMotion) return;

    const nodes = document.querySelectorAll(".js-count");
    if (!nodes.length || !("IntersectionObserver" in window)) return;

    const animate = (el) => {
      const target = parseFloat(el.getAttribute("data-count-to") || "0");
      const suffix = el.getAttribute("data-count-suffix") || "";
      const duration = 900;
      const start = performance.now();

      el.textContent = "0" + suffix;

      const step = (now) => {
        const elapsed = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - elapsed, 3); // ease-out cubic
        const value = Math.round(target * eased);
        el.textContent = value + suffix;
        if (elapsed < 1) window.requestAnimationFrame(step);
        else el.textContent = target + suffix;
      };
      window.requestAnimationFrame(step);
    };

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animate(entry.target);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    nodes.forEach((el) => io.observe(el));
  }

  /** Copy-link-to-section buttons next to each section heading. */
  function initAnchorLinks() {
    const buttons = document.querySelectorAll(".anchor-link");
    const status = document.querySelector("[data-anchor-status]");
    if (!buttons.length) return;

    buttons.forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        e.preventDefault();
        const id = btn.getAttribute("data-anchor");
        if (!id) return;
        const url = location.origin + location.pathname + "#" + id;

        try {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(url);
          }
        } catch (err) {
          // Clipboard unavailable — the URL still updates below.
        }

        history.replaceState(null, "", "#" + id);

        btn.classList.add("is-copied");
        if (status) status.textContent = "Link copied to clipboard.";
        window.clearTimeout(btn._resetTimer);
        btn._resetTimer = window.setTimeout(() => {
          btn.classList.remove("is-copied");
          if (status) status.textContent = "";
        }, 1500);
      });
    });
  }

  /** Batch 7: auto-update footer copyright year. */
  function initFooterYear() {
    const el = document.querySelector("[data-year]");
    if (el) el.textContent = String(new Date().getFullYear());
  }

  /** Writing essays: expand/collapse toggle. */
  function initEssayExpand() {
    const buttons = document.querySelectorAll(".thinking-card__expand");
    if (!buttons.length) return;

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const targetId = btn.getAttribute("aria-controls");
        const panel = targetId ? document.getElementById(targetId) : null;
        if (!panel) return;
        const isExpanded = btn.getAttribute("aria-expanded") === "true";
        btn.setAttribute("aria-expanded", String(!isExpanded));
        panel.hidden = isExpanded;
        btn.innerHTML = isExpanded
          ? 'Read more <span aria-hidden="true">&#8595;</span>'
          : 'Read less <span aria-hidden="true">&#8593;</span>';
      });
    });
  }

  function boot() {
    initNavToggle();
    initScrollReveal();
    initActiveNav();
    initProgressBar();
    initCountUp();
    initAnchorLinks();
    initFooterYear();
    initEssayExpand();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
