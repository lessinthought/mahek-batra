"use client";

import * as React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  fill?: string;
};

// Soft animated spotlight that floats around a hero — no purple AI cliche, uses the brand teal.
export function Spotlight({ className, fill = "oklch(0.78 0.11 195)" }: Props) {
  return (
    <svg
      aria-hidden
      className={cn("pointer-events-none absolute -z-0 opacity-70 mix-blend-multiply dark:mix-blend-screen", className)}
      width="100%"
      height="100%"
      viewBox="0 0 1280 720"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="sl-grad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={fill} stopOpacity="0.55" />
          <stop offset="60%" stopColor={fill} stopOpacity="0.06" />
          <stop offset="100%" stopColor={fill} stopOpacity="0" />
        </radialGradient>
      </defs>
      <motion.ellipse
        cx="640"
        cy="240"
        rx="560"
        ry="220"
        fill="url(#sl-grad)"
        animate={{
          cx: [600, 720, 540, 640],
          cy: [200, 260, 180, 240],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
}
