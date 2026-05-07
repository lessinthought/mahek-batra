"use client";

import * as React from "react";
import { animate, useMotionValue, useTransform, motion } from "motion/react";

type Props = {
  to: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  duration?: number;
};

export function AnimatedNumber({
  to,
  decimals = 0,
  suffix = "",
  prefix = "",
  className,
  duration = 1.6,
}: Props) {
  const ref = React.useRef<HTMLSpanElement | null>(null);
  // Start at target so SSR / first paint already shows the correct value.
  // We animate from 0 → to once the element comes into view.
  const value = useMotionValue<number>(to);
  const display = useTransform(value, (latest) =>
    `${prefix}${latest.toFixed(decimals)}${suffix}`
  );

  React.useEffect(() => {
    const node = ref.current;
    if (!node) return;
    let played = false;
    let safetyTimer: ReturnType<typeof setTimeout> | null = null;

    function play() {
      if (played) return;
      played = true;
      value.set(0);
      // requestAnimationFrame so the 0 paints before we kick off the animation
      requestAnimationFrame(() => {
        animate(value, to, { duration, ease: [0.16, 1, 0.3, 1] });
      });
    }

    if (typeof IntersectionObserver === "undefined") {
      play();
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            play();
            io.disconnect();
            if (safetyTimer) clearTimeout(safetyTimer);
            break;
          }
        }
      },
      { threshold: 0.15 }
    );
    io.observe(node);

    // Safety net: if the observer hasn't fired within 1.6s of mount (e.g. the
    // element is already on-screen on first paint, or the IO is being flaky on
    // mobile), play the animation anyway.
    safetyTimer = setTimeout(() => {
      play();
      io.disconnect();
    }, 1600);

    return () => {
      io.disconnect();
      if (safetyTimer) clearTimeout(safetyTimer);
    };
  }, [to, duration, value]);

  return (
    <motion.span ref={ref} className={className}>
      {display}
    </motion.span>
  );
}
