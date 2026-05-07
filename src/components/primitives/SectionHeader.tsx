"use client";

import * as React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { RevealText } from "./RevealText";

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: Props) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-brand mb-5",
            align === "center" && "justify-center"
          )}
        >
          <span className="inline-block h-px w-6 bg-brand/60" />
          <span className="font-mono">{eyebrow}</span>
        </motion.div>
      ) : null}
      <RevealText
        as="h2"
        text={title}
        className="font-display text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-balance leading-[1.05]"
      />
      {description ? (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5 text-base md:text-lg text-muted-foreground text-pretty leading-relaxed"
        >
          {description}
        </motion.p>
      ) : null}
    </div>
  );
}
