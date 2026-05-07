"use client";

import * as React from "react";
import { motion } from "motion/react";
import { Stethoscope, Users, Sparkle } from "lucide-react";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { TiltCard } from "@/components/primitives/TiltCard";
import { resume } from "@/lib/resume";

const ICONS = [Stethoscope, Users, Sparkle];

export function Experience() {
  return (
    <section id="experience" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-12 gap-8 items-end mb-16">
          <div className="col-span-12 lg:col-span-8">
            <SectionHeader
              eyebrow="03 — Experience"
              title="From dental chair to community room — leading where it counts."
            />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="col-span-12 lg:col-span-4 text-sm text-muted-foreground"
          >
            <span className="inline-flex items-center gap-2">
              <span className="inline-block h-px w-8 bg-foreground/30" />
              {resume.personal_information.total_experience} of clinical &amp; leadership work
            </span>
          </motion.div>
        </div>

        <div className="space-y-5">
          {resume.work_experience.map((job, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <motion.div
                key={`${job.title}-${i}`}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="perspective-1000"
              >
                <TiltCard intensity={4} glow={false}>
                  <div className="group relative grid grid-cols-12 gap-4 md:gap-8 p-6 sm:p-8 rounded-3xl border border-border/70 bg-card/80 backdrop-blur hover:border-brand/40 transition-colors">
                    {/* Side accent */}
                    <div className="absolute left-0 top-6 bottom-6 w-1 rounded-r-full bg-gradient-to-b from-brand via-rose-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="col-span-12 md:col-span-3 flex md:flex-col gap-3 items-start">
                      <span className="grid place-items-center h-10 w-10 rounded-xl bg-brand-soft text-brand">
                        <Icon className="h-4 w-4" strokeWidth={1.7} />
                      </span>
                      <div>
                        <div className="text-[10px] uppercase tracking-[0.22em] font-mono text-muted-foreground">
                          {job.duration}
                        </div>
                        <div className="text-sm text-foreground/80 mt-1 font-medium">
                          {job.company}
                        </div>
                      </div>
                    </div>

                    <div className="col-span-12 md:col-span-9">
                      <h3 className="font-display text-2xl md:text-3xl font-medium tracking-tight">
                        {job.title}
                      </h3>
                      {job.highlights.length > 0 ? (
                        <ul className="mt-5 space-y-3">
                          {job.highlights.map((h, idx) => (
                            <motion.li
                              key={idx}
                              initial={{ opacity: 0, x: -8 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true, margin: "-60px" }}
                              transition={{ delay: 0.2 + idx * 0.06, duration: 0.5 }}
                              className="flex gap-3 text-muted-foreground leading-relaxed"
                            >
                              <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-brand shrink-0" />
                              <span className="text-pretty">{h}</span>
                            </motion.li>
                          ))}
                        </ul>
                      ) : (
                        <p className="mt-4 text-sm text-muted-foreground italic">
                          Student leadership role driving academic and cultural events.
                        </p>
                      )}
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
