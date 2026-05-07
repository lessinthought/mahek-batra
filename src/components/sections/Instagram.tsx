"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { ExternalLink, BadgeCheck } from "lucide-react";
import { InstagramIcon as InstaIcon } from "@/components/primitives/Icons";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { TiltCard } from "@/components/primitives/TiltCard";
import {
  HEADSHOT_IMG,
  INSTAGRAM_BIO,
  INSTAGRAM_FOLLOWERS,
  INSTAGRAM_FOLLOWING,
  INSTAGRAM_HANDLE,
  INSTAGRAM_HIGHLIGHTS,
  INSTAGRAM_POSTS,
  INSTAGRAM_URL,
} from "@/lib/resume";

function formatNumber(n: number) {
  if (n >= 1000) return `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}k`;
  return `${n}`;
}

const TILE_PROMPTS = [
  { emoji: "🦷", label: "Smile care", caption: "Clinical, simplified" },
  { emoji: "✨", label: "Skincare", caption: "Routines that work" },
  { emoji: "💄", label: "Beauty tips", caption: "Quick, evidence-led" },
  { emoji: "👩🏻‍⚕️", label: "Residency", caption: "Behind the chair" },
  { emoji: "🌍", label: "Travel diaries", caption: "Bali · Bangkok · more" },
  { emoji: "🌻", label: "PR & collabs", caption: "Brand partnerships" },
];

export function Instagram() {
  return (
    <section id="instagram" className="relative py-28 md:py-36 overflow-hidden">
      {/* Decorative gradient background */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(800px 500px at 80% 0%, rgba(244,178,170,0.18), transparent 60%), radial-gradient(700px 500px at 0% 100%, rgba(112,196,184,0.18), transparent 60%)",
        }}
      />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader
          eyebrow="06 — Public presence"
          title="Bringing dentistry, skincare, and beauty to a growing audience."
          description="Beyond the clinic, Dr. Batra runs @smilewithdrmahek — a content channel that translates clinical insight into approachable smile, skincare, and beauty tips for thousands of followers."
        />

        <div className="mt-16 grid grid-cols-12 gap-8 items-start">
          {/* Profile card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="col-span-12 lg:col-span-5 perspective-1000"
          >
            <TiltCard intensity={4} glow={false}>
              <div className="relative rounded-[28px] border border-border/70 bg-card overflow-hidden shadow-[0_30px_80px_-30px_oklch(0.18_0.02_240/0.4)]">
                {/* IG bar */}
                <div className="flex items-center justify-between px-5 py-3 border-b border-border/70 bg-background/60 backdrop-blur">
                  <span className="font-serif-italic text-2xl tracking-tight">
                    Instagram
                  </span>
                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs px-3 py-1 rounded-full bg-foreground text-background font-medium"
                  >
                    Log In
                  </a>
                </div>

                {/* Profile header */}
                <div className="p-6 sm:p-8 grid grid-cols-12 gap-5 items-center">
                  <div className="col-span-4 flex justify-center">
                    <div className="relative h-24 w-24 sm:h-28 sm:w-28 rounded-full p-[2px] bg-gradient-to-tr from-rose-accent via-gold-accent to-brand">
                      <div className="relative h-full w-full rounded-full overflow-hidden bg-background">
                        <Image
                          src={HEADSHOT_IMG}
                          alt="@smilewithdrmahek"
                          fill
                          sizes="120px"
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-span-8">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-medium text-lg">{INSTAGRAM_HANDLE}</span>
                      <BadgeCheck className="h-4 w-4 text-brand" strokeWidth={2} fill="currentColor" />
                      <a
                        href={INSTAGRAM_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-1 text-[10px] uppercase tracking-[0.2em] font-mono text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
                      >
                        Visit <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                    <div className="mt-1 text-sm text-muted-foreground">
                      Dr. Mahek Batra
                    </div>
                    <div className="mt-4 flex items-center gap-5 text-sm">
                      <Stat label="posts" value={INSTAGRAM_POSTS} />
                      <Stat label="followers" value={INSTAGRAM_FOLLOWERS} highlight />
                      <Stat label="following" value={INSTAGRAM_FOLLOWING} />
                    </div>
                  </div>
                </div>

                <div className="px-6 sm:px-8 pb-6 text-sm leading-relaxed">
                  <div className="font-medium">{INSTAGRAM_BIO}</div>
                  <div className="text-muted-foreground mt-1">
                    📩 drmahekbatra@gmail.com
                  </div>
                </div>

                {/* Highlights */}
                <div className="px-4 sm:px-6 pb-6">
                  <div className="flex gap-3 overflow-x-auto pb-1 mask-fade-x">
                    {INSTAGRAM_HIGHLIGHTS.map((h) => (
                      <motion.div
                        key={h.label}
                        whileHover={{ y: -4 }}
                        className="flex flex-col items-center gap-2 min-w-[72px]"
                      >
                        <span className="grid place-items-center h-16 w-16 rounded-full bg-gradient-to-br from-card to-secondary border border-border/70 text-2xl">
                          {h.emoji}
                        </span>
                        <span className="text-[10px] uppercase tracking-[0.18em] font-mono text-muted-foreground">
                          {h.label}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="px-6 sm:px-8 pb-8">
                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full h-12 rounded-2xl bg-gradient-to-r from-rose-accent via-gold-accent to-brand text-foreground/90 hover:opacity-95 transition-opacity font-medium tracking-tight"
                  >
                    <InstaIcon className="h-4 w-4" strokeWidth={1.8} />
                    Follow @{INSTAGRAM_HANDLE}
                  </a>
                </div>
              </div>
            </TiltCard>
          </motion.div>

          {/* Content tiles */}
          <div className="col-span-12 lg:col-span-7">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {TILE_PROMPTS.map((t, i) => (
                <motion.a
                  key={t.label}
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -4 }}
                  className="group relative aspect-square rounded-2xl overflow-hidden border border-border/70 bg-card"
                >
                  <div
                    className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
                    style={{
                      background: i % 3 === 0
                        ? "radial-gradient(circle at 30% 20%, rgba(112,196,184,0.5), rgba(244,178,170,0.4) 60%, rgba(247,213,162,0.4))"
                        : i % 3 === 1
                          ? "radial-gradient(circle at 70% 80%, rgba(244,178,170,0.6), rgba(247,213,162,0.5) 60%, rgba(112,196,184,0.4))"
                          : "radial-gradient(circle at 50% 50%, rgba(247,213,162,0.55), rgba(112,196,184,0.5) 60%, rgba(244,178,170,0.4))",
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent" />
                  <div className="absolute inset-0 grid place-items-center pt-6 text-5xl sm:text-6xl">
                    <motion.span
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
                    >
                      {t.emoji}
                    </motion.span>
                  </div>
                  <div className="absolute bottom-0 inset-x-0 p-3 sm:p-4">
                    <div className="text-sm sm:text-base font-medium text-white leading-tight">
                      {t.label}
                    </div>
                    <div className="mt-0.5 text-[11px] text-white/80 leading-tight">
                      {t.caption}
                    </div>
                  </div>
                  <div className="absolute top-3 right-3 h-7 w-7 grid place-items-center rounded-full bg-white/85 text-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                    <InstaIcon className="h-3.5 w-3.5" strokeWidth={1.8} />
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Pull-quote */}
            <motion.blockquote
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-6 p-6 rounded-2xl border border-border/70 bg-card/70 backdrop-blur"
            >
              <p className="font-serif-italic text-xl md:text-2xl tracking-tight text-balance leading-snug">
                &ldquo;Skincare, smile care &amp; clinical truth — broken down for the
                people who scroll past the science.&rdquo;
              </p>
              <footer className="mt-4 text-[11px] uppercase tracking-[0.2em] font-mono text-muted-foreground">
                — content philosophy · @{INSTAGRAM_HANDLE}
              </footer>
            </motion.blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({
  label,
  value,
  highlight,
}: {
  label: string;
  value: number;
  highlight?: boolean;
}) {
  return (
    <div className="leading-tight">
      <div className={`font-display ${highlight ? "text-brand" : ""}`}>
        <span className="text-lg md:text-xl font-medium">{formatNumber(value)}</span>
      </div>
      <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </div>
    </div>
  );
}
