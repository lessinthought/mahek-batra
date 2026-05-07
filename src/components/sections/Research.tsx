"use client";

import * as React from "react";
import { motion } from "motion/react";
import { FileText, ShieldCheck, ScrollText, Microscope, BookMarked } from "lucide-react";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { TiltCard } from "@/components/primitives/TiltCard";
import { resume } from "@/lib/resume";

const featured = [
  {
    Icon: Microscope,
    tag: "Original Research",
    title: "Oral Lichen Planus — Bilateral Buccal Mucosa",
    note: "28 yo male · corticosteroid therapy · 6-month regression study",
    accent: "from-brand to-rose-accent",
  },
  {
    Icon: BookMarked,
    tag: "Case Reports",
    title: "Four published clinical case reports",
    note: "Conservative dentistry & endodontic complications",
    accent: "from-gold-accent to-rose-accent",
  },
  {
    Icon: ShieldCheck,
    tag: "Government Copyright",
    title: "Original research IP — registered",
    note: "Recognised by the Government of India copyright office",
    accent: "from-rose-accent to-brand",
  },
];

const certifications = resume.certifications;

export function Research() {
  return (
    <section id="research" className="relative py-28 md:py-36 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader
          eyebrow="04 — Research & Writing"
          title="Four publications, one government copyright, and a 60-day deep-dive into clinical writing."
          description="Dr. Batra's research practice blends clinical observation with structured medical writing — the kind that translates to publishable journals and patient-facing communication."
        />

        {/* Featured cards */}
        <div className="mt-16 grid grid-cols-12 gap-5">
          {featured.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="col-span-12 md:col-span-6 lg:col-span-4 perspective-1000"
            >
              <TiltCard intensity={6}>
                <div className="group relative h-full p-6 rounded-3xl border border-border/70 bg-card overflow-hidden hover:border-brand/40 transition-colors">
                  {/* gradient blob */}
                  <div
                    aria-hidden
                    className={`absolute -top-20 -right-20 h-56 w-56 rounded-full opacity-25 blur-3xl bg-gradient-to-br ${f.accent}`}
                  />
                  <div className="relative">
                    <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.22em] font-mono text-brand">
                      <span className="h-1 w-1 rounded-full bg-brand" />
                      {f.tag}
                    </span>
                    <span className={`mt-5 grid place-items-center h-12 w-12 rounded-2xl bg-gradient-to-br ${f.accent} text-foreground/85 shadow-md`}>
                      <f.Icon className="h-5 w-5" strokeWidth={1.6} />
                    </span>
                    <h3 className="mt-5 font-display text-xl md:text-2xl font-medium tracking-tight text-balance">
                      {f.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground text-pretty">
                      {f.note}
                    </p>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        {/* Long-form abstract */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="mt-12 grid grid-cols-12 gap-8 items-start"
        >
          <div className="col-span-12 lg:col-span-4">
            <div className="text-[10px] uppercase tracking-[0.22em] font-mono text-muted-foreground">
              Featured abstract
            </div>
            <h3 className="mt-3 font-display text-2xl md:text-3xl font-medium tracking-tight text-balance">
              Early diagnosis &amp; tailored therapy for{" "}
              <span className="font-serif-italic text-brand">oral lichen planus</span>
            </h3>
            <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs bg-card border border-border/70">
              <FileText className="h-3.5 w-3.5 text-brand" />
              {resume.research_and_projects.duration} dedicated study
            </div>
          </div>
          <div className="col-span-12 lg:col-span-8 relative pl-6 border-l-2 border-brand/30">
            <p className="text-base md:text-lg leading-relaxed text-muted-foreground text-pretty">
              {resume.research_and_projects.description}
            </p>
          </div>
        </motion.div>

        {/* Certifications strip */}
        <div className="mt-20">
          <div className="flex items-center gap-3 mb-6 text-[10px] uppercase tracking-[0.22em] font-mono text-muted-foreground">
            <ScrollText className="h-3.5 w-3.5" />
            Continuing education
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {certifications.map((c, i) => (
              <motion.div
                key={c}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.55 }}
                className="group flex items-start gap-3 p-4 rounded-2xl border border-border/70 bg-card/70 backdrop-blur hover:border-brand/40 hover:bg-card transition-colors"
              >
                <span className="mt-1 h-2 w-2 rounded-full bg-brand shrink-0 group-hover:scale-125 transition-transform" />
                <div className="text-sm leading-snug">{c}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
