"use client";

import * as React from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "motion/react";

type Props = {
  to: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
};

export function AnimatedNumber({
  to,
  decimals = 0,
  suffix = "",
  prefix = "",
  className,
}: Props) {
  const ref = React.useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const value = useMotionValue(0);
  const spring = useSpring(value, { stiffness: 70, damping: 22, mass: 0.8 });
  const display = useTransform(spring, (latest) =>
    `${prefix}${latest.toFixed(decimals)}${suffix}`
  );

  React.useEffect(() => {
    if (inView) value.set(to);
  }, [inView, to, value]);

  return <motion.span ref={ref} className={className}>{display}</motion.span>;
}
