"use client";

import * as React from "react";
import { motion, type Variants } from "motion/react";

type Props = {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: keyof React.JSX.IntrinsicElements;
  by?: "word" | "char";
};

const container = (stagger: number, delay: number): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren: stagger, delayChildren: delay },
  },
});

const child: Variants = {
  hidden: { y: "0.6em", opacity: 0, filter: "blur(8px)" },
  show: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function RevealText({
  text,
  className,
  delay = 0,
  stagger = 0.05,
  as = "span",
  by = "word",
}: Props) {
  const tokens = by === "word" ? text.split(" ") : Array.from(text);

  const inner = (
    <motion.span
      variants={container(stagger, delay)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className="inline-block"
    >
      {tokens.map((tok, i) => (
        <React.Fragment key={i}>
          <span className="inline-block overflow-hidden align-baseline">
            <motion.span variants={child} className="inline-block will-change-transform">
              {tok}
            </motion.span>
          </span>
          {by === "word" && i < tokens.length - 1 ? " " : null}
        </React.Fragment>
      ))}
    </motion.span>
  );

  return React.createElement(as, { className }, inner);
}
