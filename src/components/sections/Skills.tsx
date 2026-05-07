"use client";

import * as React from "react";
import { motion } from "motion/react";
import {
  PenLine,
  ChartScatter,
  MessagesSquare,
  Clock,
  Cpu,
  Presentation,
  Heart,
  Plane,
  BookOpen,
} from "lucide-react";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { TiltCard } from "@/components/primitives/TiltCard";
import { Marquee } from "@/components/primitives/Marquee";
import { GooeyText } from "@/components/ui/gooey-text-morphing";
import { resume } from "@/lib/resume";

const MORPH_WORDS = [
  "Care.",
  "Science.",
  "Stories.",
  "Smiles.",
  "Research.",
  "Endodontics.",
];

const SKILL_ICONS: Record<string, React.ComponentType<{ className?: string; strokeWidth?: number }>> = {
  "Medical & Scientific Writing Skills": PenLine,
  "Research & Data Analysis": ChartScatter,
  "Digital Communication & Collaboration": MessagesSquare,
  "Time Management & Multitasking": Clock,
  "Tech Adaptability": Cpu,
  "Presentation & Documentation Skill": Presentation,
};

const HOBBY_ICONS: Record<string, React.ComponentType<{ className?: string; strokeWidth?: number }>> = {
  "Content Creation": Heart,
  "Travel & Exploring Cultures": Plane,
  "Research Writing & Scientific Reading": BookOpen,
};

export function Skills() {
  return (
    <section id="skills" className="relative py-28 md:py-36 overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader
          eyebrow="05 — Skills"
          title="A toolkit built for clinic, copy, and conversation."
        />

        <div className="mt-16 grid grid-cols-12 gap-6 md:gap-8 items-stretch">
          {/* Gooey text showpiece */}
          <div className="col-span-12 lg:col-span-5 relative">
            <div className="relative h-full min-h-[440px] rounded-3xl overflow-hidden border border-border/70 bg-gradient-to-br from-brand-soft via-card to-card">
              <div
                aria-hidden
                className="absolute inset-0 opacity-[0.18] mix-blend-overlay pointer-events-none"
                style={{
                  backgroundImage:
                    "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              />

              {/* Soft glow accent behind the morphing text */}
              <div
                aria-hidden
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-72 w-72 rounded-full blur-3xl opacity-50 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle, rgba(112,196,184,0.55) 0%, rgba(244,178,170,0.4) 55%, rgba(112,196,184,0) 80%)",
                }}
              />

              {/* Tiny corner label */}
              <div className="absolute top-5 left-5 text-[10px] uppercase tracking-[0.22em] font-mono text-muted-foreground">
                What she does
              </div>

              {/* Morphing word — sized to fit the panel without overflow */}
              <div className="absolute inset-0 flex items-center justify-center px-6">
                <GooeyText
                  texts={MORPH_WORDS}
                  morphTime={0.9}
                  cooldownTime={1.4}
                  className="w-full h-32 sm:h-40"
                  textClassName="font-display font-medium tracking-tight text-5xl sm:text-6xl md:text-[64px] text-foreground"
                />
              </div>

              {/* Specialty card overlay */}
              <div className="absolute bottom-5 left-5 right-5 px-4 py-3 rounded-2xl glass-strong border border-border/60 pointer-events-none">
                <div className="text-[10px] uppercase tracking-[0.22em] font-mono text-muted-foreground">
                  Specialty
                </div>
                <div className="mt-1 font-display text-xl tracking-tight">
                  Conservative Dentistry &amp; Endodontics
                </div>
              </div>
            </div>
          </div>

          {/* Skill grid */}
          <div className="col-span-12 lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {resume.key_skills.map((skill, i) => {
              const Icon = SKILL_ICONS[skill] ?? PenLine;
              return (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ delay: i * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="perspective-1000"
                >
                  <TiltCard intensity={5} glow={false}>
                    <div className="group relative h-full p-5 rounded-2xl border border-border/70 bg-card/80 backdrop-blur hover:border-brand/40 hover:bg-card transition-colors overflow-hidden">
                      <div
                        aria-hidden
                        className="absolute -top-10 -right-10 h-32 w-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity blur-2xl"
                        style={{
                          background:
                            "radial-gradient(circle, rgba(112,196,184,0.45) 0%, rgba(112,196,184,0) 70%)",
                        }}
                      />
                      <div className="relative flex items-start gap-4">
                        <span className="grid place-items-center h-10 w-10 rounded-xl bg-secondary text-brand shrink-0 group-hover:scale-110 transition-transform">
                          <Icon className="h-4 w-4" strokeWidth={1.7} />
                        </span>
                        <div>
                          <div className="font-medium tracking-tight text-pretty">
                            {skill}
                          </div>
                          <div className="text-[10px] uppercase tracking-[0.22em] font-mono text-muted-foreground mt-1">
                            Daily practice
                          </div>
                        </div>
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Hobbies marquee */}
        <div className="mt-20">
          <div className="flex items-center justify-between mb-5">
            <div className="text-[10px] uppercase tracking-[0.22em] font-mono text-muted-foreground">
              Off the clock
            </div>
            <div className="hidden sm:block text-[10px] uppercase tracking-[0.22em] font-mono text-muted-foreground">
              Hobbies · Pursuits
            </div>
          </div>
          <Marquee speed={28}>
            {[...resume.hobbies, ...resume.hobbies, ...resume.hobbies].map((h, i) => {
              const Icon = HOBBY_ICONS[h] ?? Heart;
              return (
                <div
                  key={`${h}-${i}`}
                  className="flex items-center gap-3 pr-6"
                >
                  <span className="grid place-items-center h-8 w-8 rounded-full bg-rose-accent/20 text-rose-accent">
                    <Icon className="h-4 w-4" strokeWidth={1.7} />
                  </span>
                  <span className="font-display text-2xl md:text-3xl tracking-tight whitespace-nowrap">
                    {h}
                  </span>
                  <span className="text-3xl text-border mx-3" aria-hidden>
                    ✺
                  </span>
                </div>
              );
            })}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
