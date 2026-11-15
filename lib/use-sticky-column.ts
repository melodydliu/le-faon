"use client";

import { useEffect, type RefObject } from "react";

/** Gap kept between the column and the header above, and the window's edge below. */
const GAP = 40;

/**
 * A sticky side column that is never out of reach, whatever its height, with the page's single scroll.
 *
 * Fits the window: it simply stays pinned below the header.
 * Taller than the window: scrolling down, it travels with the page until its end is in view, then holds
 * there; scrolling up, it travels back until its top is in view, then holds there. Done by steering the
 * sticky `top` between those two limits by the distance scrolled, so it never jumps.
 */
export function useStickyColumn(ref: RefObject<HTMLElement | null>, media = "(min-width: 1024px)") {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mq = window.matchMedia(media);
    let top = 0;
    let lastY = window.scrollY;
    let frame = 0;

    function limits() {
      const header = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-h")) || 0;
      const upper = header + GAP;
      const lower = Math.min(upper, window.innerHeight - el!.offsetHeight - GAP);
      return { upper, lower };
    }

    function update() {
      frame = 0;
      if (!mq.matches) {
        el!.style.top = "";
        lastY = window.scrollY;
        return;
      }
      const { upper, lower } = limits();
      const y = window.scrollY;
      top = Math.min(upper, Math.max(lower, top - (y - lastY)));
      lastY = y;
      el!.style.top = `${top}px`;
    }

    function schedule() {
      if (!frame) frame = requestAnimationFrame(update);
    }

    // Start as if scrolled from the top of the page, so a mid-page reload lands consistently.
    top = limits().upper - window.scrollY;
    lastY = window.scrollY;
    update();

    const resize = new ResizeObserver(schedule); // accordions opening, fonts settling
    resize.observe(el);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    mq.addEventListener("change", schedule);
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      mq.removeEventListener("change", schedule);
      el.style.top = "";
    };
  }, [ref, media]);
}
