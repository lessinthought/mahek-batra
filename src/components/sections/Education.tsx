"use client";

import * as React from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { GraduationCap, ScrollText } from "lucide-react";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { resume } from "@/lib/resume";

type Item = (typeof resume.education)[number];

function Card({ item, alignRight = false }: { item: Item; alignRight?: boolean }) {
  const subtitle =
    "institution" in item && item.institution
      ? item.institution
      : `Board: ${"board" in item ? item.board : ""} · ${
          "medium" in item ? item.medium : ""
        } medium`;

  return (
    <div
      className={`relative inline-block w-full max-w-md p-5 sm:p-6 rounded-2xl bg-card border border-border/70 shadow-sm hover:shadow-md hover:border-brand/40 transition-all ${
        alignRight ? "text-right" : "text-left"
      }`}
    >
      <div
        className={`flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] font-mono text-brand ${
          alignRight ? "justify-end" : ""
        }`}
      >
        <GraduationCap className="h-3.5 w-3.5" />
        Class of {item.year}
      </div>
      <div className="mt-2 font-display text-xl md:text-2xl font-medium tracking-tight">
        {item.degree}
      </div>
      <div className="mt-1 text-sm text-muted-foreground text-pretty">
        {subtitle}
      </div>
    </div>
  );
}

export function Education() {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const lineScale = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    mass: 0.6,
  });
  const lineHeight = useTransform(lineScale, [0, 1], ["0%", "100%"]);

  return (
    <section id="education" className="relative py-28 md:py-36 bg-secondary/30">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeader
          eyebrow="02 — Education"
          title="Trained in some of India's most rigorous dental programs."
          description="From CBSE foundations to a Gold-Medalist BDS, currently completing her MDS in Conservative Dentistry & Endodontics — every step built on academic distinction."
        />

        <div ref={ref} className="relative mt-20">
          {/* Vertical rail (desktop centered, mobile left) */}
          <div className="absolute md:left-1/2 left-5 -translate-x-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px bg-border/60" />
          <motion.div
            style={{ height: lineHeight }}
            className="absolute md:left-1/2 left-5 -translate-x-1/2 md:-translate-x-1/2 top-0 w-px bg-gradient-to-b from-brand via-rose-accent to-gold-accent"
          />

          <div className="space-y-14 md:space-y-20">
            {resume.education.map((item, idx) => {
              const isLeft = idx % 2 === 0;
              return (
                <motion.div
                  key={`${item.degree}-${idx}`}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="relative grid grid-cols-1 md:grid-cols-2 items-center gap-6 md:gap-12"
                >
                  {/* Center node */}
                  <span className="absolute left-5 md:left-1/2 -translate-x-1/2 top-2 md:top-1/2 md:-translate-y-1/2 z-10">
                    <span className="relative grid place-items-center h-10 w-10 rounded-full bg-card border border-brand/40 shadow-md">
                      <span className="absolute inset-0 rounded-full bg-brand/20 blur-md" />
                      <span className="relative h-2.5 w-2.5 rounded-full bg-brand" />
                    </span>
                  </span>

                  {/* Mobile: stacked */}
                  <div className="md:hidden pl-16">
                    <Card item={item} />
                  </div>

                  {/* Desktop: alternating left/right */}
                  {isLeft ? (
                    <>
                      <div className="hidden md:flex justify-end pr-12">
                        <Card item={item} alignRight />
                      </div>
                      <div className="hidden md:block" />
                    </>
                  ) : (
                    <>
                      <div className="hidden md:block" />
                      <div className="hidden md:flex justify-start pl-12">
                        <Card item={item} />
                      </div>
                    </>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Internship card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mt-20 mx-auto max-w-3xl rounded-3xl border border-border/70 bg-card/80 backdrop-blur p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-5"
        >
          <span className="grid place-items-center h-12 w-12 rounded-2xl bg-brand-soft text-brand">
            <ScrollText className="h-5 w-5" strokeWidth={1.6} />
          </span>
          <div className="flex-1">
            <div className="text-[10px] uppercase tracking-[0.22em] font-mono text-muted-foreground">
              Clinical Internship
            </div>
            <div className="font-display text-xl mt-1">
              {resume.internship.duration} ·{" "}
              <span className="text-brand">{resume.internship.institution}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
