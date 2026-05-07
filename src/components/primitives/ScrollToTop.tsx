"use client";

import * as React from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { ArrowUp } from "lucide-react";

export function ScrollToTop() {
  const { scrollY, scrollYProgress } = useScroll();
  const [visible, setVisible] = React.useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    setVisible(y > 600);
  });

  function toTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <AnimatePresence>
      {visible ? (
        <motion.button
          key="scroll-top"
          type="button"
          onClick={toTop}
          aria-label="Scroll to top"
          initial={{ opacity: 0, y: 20, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.85 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.94 }}
          className="group fixed right-5 bottom-24 sm:bottom-6 z-50 grid place-items-center h-12 w-12 rounded-full glass-strong border border-border/60 text-foreground shadow-[0_18px_40px_-15px_oklch(0.18_0.02_240/0.4)] hover:border-brand/50 transition-colors"
        >
          {/* Progress ring */}
          <svg
            aria-hidden
            viewBox="0 0 36 36"
            className="absolute inset-0 -rotate-90 h-full w-full"
          >
            <circle
              cx="18"
              cy="18"
              r="16.5"
              fill="none"
              stroke="currentColor"
              strokeOpacity="0.08"
              strokeWidth="1.5"
            />
            <motion.circle
              cx="18"
              cy="18"
              r="16.5"
              fill="none"
              stroke="oklch(0.55 0.1 195)"
              strokeWidth="1.5"
              strokeLinecap="round"
              pathLength={1}
              style={{ pathLength: scrollYProgress }}
            />
          </svg>
          <ArrowUp
            className="relative h-4 w-4 transition-transform group-hover:-translate-y-0.5"
            strokeWidth={1.8}
          />
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
