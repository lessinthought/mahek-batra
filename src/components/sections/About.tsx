"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Quote, Award, BookOpen, Trophy, Globe2 } from "lucide-react";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { TiltCard } from "@/components/primitives/TiltCard";
import { AnimatedNumber } from "@/components/primitives/AnimatedNumber";
import { PROFILE_IMG, resume } from "@/lib/resume";

const stats = [
  { Icon: Trophy, value: 1, label: "Gold Medal", suffix: "x" },
  { Icon: Award, value: 6, label: "Distinctions" },
  { Icon: BookOpen, value: 4, label: "Publications" },
  { Icon: Globe2, value: 4, label: "Languages" },
];

export function About() {
  return (
    <section
      id="about"
      className="relative py-28 md:py-36"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 grid grid-cols-12 gap-8 md:gap-14 items-start">
        {/* Left: portrait collage */}
        <div className="col-span-12 lg:col-span-5 relative">
          <div className="perspective-1000">
            <TiltCard intensity={6} glow={false} className="group rounded-[28px]">
              <motion.div
                initial={{ opacity: 0, y: 30, rotate: -3 }}
                whileInView={{ opacity: 1, y: 0, rotate: -2 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full max-w-[460px] aspect-[3/4] mx-auto rounded-[28px] overflow-hidden bg-card border border-border shadow-[0_40px_90px_-30px_oklch(0.18_0.02_240/0.4)]"
              >
                <Image
                  src={PROFILE_IMG}
                  alt="Dr. Mahek Batra at her BDS graduation"
                  fill
                  sizes="460px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 px-4 py-3 rounded-2xl bg-background/85 backdrop-blur flex items-center justify-between">
                  <div className="leading-tight">
                    <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-mono">
                      Convocation 2024
                    </div>
                    <div className="font-display text-base md:text-lg">
                      Sharad Pawar Dental College
                    </div>
                  </div>
                  <span className="grid place-items-center h-9 w-9 rounded-xl bg-gradient-to-br from-gold-accent to-rose-accent text-foreground/80">
                    <Trophy className="h-4 w-4" strokeWidth={1.8} />
                  </span>
                </div>
              </motion.div>
            </TiltCard>
          </div>

          {/* Floating sticker */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: 8 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 6 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="absolute -bottom-3 -right-1 sm:-right-3 lg:right-6 hidden sm:flex items-center gap-3 rounded-2xl bg-foreground text-background px-4 py-3 shadow-xl"
          >
            <span className="grid place-items-center h-8 w-8 rounded-full bg-background/15">
              <Quote className="h-3.5 w-3.5" strokeWidth={2} />
            </span>
            <div className="leading-tight">
              <div className="text-[10px] uppercase tracking-[0.22em] opacity-70">
                Personal motto
              </div>
              <div className="text-sm font-medium">Care, science, smiles.</div>
            </div>
          </motion.div>
        </div>

        {/* Right: copy */}
        <div className="col-span-12 lg:col-span-7">
          <SectionHeader
            eyebrow="01 — About"
            title={
              "A clinician with a writer’s rigor and a researcher’s curiosity."
            }
          />

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-7 text-lg leading-relaxed text-muted-foreground text-pretty"
          >
            {resume.profile_summary}
          </motion.p>

          {/* Stat tiles */}
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.6 }}
                className="group relative rounded-2xl border border-border/70 bg-card/70 backdrop-blur p-4 hover:border-brand/50 hover:bg-card transition-colors"
              >
                <s.Icon className="h-4 w-4 text-brand" strokeWidth={1.6} />
                <div className="mt-3 font-display text-3xl font-medium tracking-tight">
                  <AnimatedNumber to={s.value} suffix={s.suffix ?? ""} />
                </div>
                <div className="mt-1 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Languages chip row */}
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <span className="text-[11px] uppercase tracking-[0.22em] font-mono text-muted-foreground">
              Speaks
            </span>
            <div className="flex flex-wrap gap-2">
              {resume.languages.map((lang, i) => (
                <motion.span
                  key={lang}
                  initial={{ opacity: 0, y: 6 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.06, duration: 0.5 }}
                  className="px-3 py-1 rounded-full text-xs font-medium border border-border/70 bg-card/60 backdrop-blur"
                >
                  {lang}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
