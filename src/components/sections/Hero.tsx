"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import { ArrowDown, Award, MapPin, Sparkles, BookOpen, Stethoscope } from "lucide-react";
import { Spotlight } from "@/components/primitives/Spotlight";
import { GradientOrbs } from "@/components/primitives/GradientOrbs";
import { RevealText } from "@/components/primitives/RevealText";
import { MagneticButton } from "@/components/primitives/MagneticButton";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { HEADSHOT_IMG, PROFILE_IMG, resume } from "@/lib/resume";
import { SPLINE_HERO_SCENE } from "@/components/primitives/SplineScene";
import { LazyVisible } from "@/components/primitives/LazyVisible";

const SplineScene = dynamic(
  () => import("@/components/primitives/SplineScene").then((m) => m.SplineScene),
  { ssr: false }
);

function useHasFinePointer() {
  const [fine, setFine] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setFine(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return fine;
}

export function Hero() {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const hasPointer = useHasFinePointer();

  // Mouse parallax — only enabled with a fine pointer (desktop). On touch
  // devices the per-frame motion-value updates would tank scroll perf.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 80, damping: 18 });
  const smy = useSpring(my, { stiffness: 80, damping: 18 });

  function handleMove(e: React.MouseEvent) {
    if (!hasPointer) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    mx.set(px);
    my.set(py);
  }

  // Scroll fade for hero content
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0.2]);

  const tx1 = useTransform(smx, (v) => v * 12);
  const ty1 = useTransform(smy, (v) => v * 12);
  const tx2 = useTransform(smx, (v) => v * -22);
  const ty2 = useTransform(smy, (v) => v * -22);
  const tx3 = useTransform(smx, (v) => v * 18);
  const ty3 = useTransform(smy, (v) => v * 18);

  return (
    <section
      id="top"
      ref={containerRef}
      onMouseMove={handleMove}
      className="relative min-h-[100svh] overflow-hidden grain"
    >
      <GradientOrbs />
      <Spotlight className="inset-0 h-full" />

      {/* Faint grid */}
      <div
        aria-hidden
        className="absolute inset-0 -z-[5] opacity-[0.18] dark:opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(to right, oklch(0.6 0.02 220 / 0.18) 1px, transparent 1px), linear-gradient(to bottom, oklch(0.6 0.02 220 / 0.18) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse at center, black 0%, black 40%, transparent 80%)",
        }}
      />

      <motion.div
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 pt-24 sm:pt-32 pb-32"
      >
        {/* Top meta row */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center gap-3 mb-8"
        >
          <Badge
            variant="outline"
            className="rounded-full px-3 py-1 gap-2 border-border/60 bg-card/60 backdrop-blur"
          >
            <span className="relative inline-flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="text-xs font-medium tracking-wide">
              Open to medical writing & research collabs
            </span>
          </Badge>
          <Badge
            variant="secondary"
            className="rounded-full gap-1.5 bg-secondary/70 backdrop-blur"
          >
            <MapPin className="h-3 w-3" />
            <span className="text-xs">{resume.personal_information.location.city}, India</span>
          </Badge>
        </motion.div>

        <div className="grid grid-cols-12 gap-6 md:gap-10 items-end">
          {/* Left: name + lockup */}
          <div className="col-span-12 lg:col-span-7 relative">
            <div className="flex items-center gap-3 mb-5 text-xs uppercase tracking-[0.28em] text-muted-foreground font-mono">
              <span className="inline-block h-px w-10 bg-foreground/40" />
              <span>Resident Dentist · MDS · Researcher</span>
            </div>

            <h1 className="font-display font-medium tracking-tight leading-[0.92] text-[clamp(3.2rem,9vw,7.4rem)] text-balance">
              <RevealText
                as="span"
                text="Dr. Mahek"
                className="block"
                stagger={0.06}
              />
              <span className="block relative">
                <RevealText
                  as="span"
                  text="Batra."
                  className="font-serif-italic text-brand"
                  delay={0.25}
                  stagger={0.06}
                />
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1.1, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  style={{ originX: 0 }}
                  className="absolute left-0 -bottom-2 sm:-bottom-3 h-[3px] w-[55%] bg-gradient-to-r from-brand via-rose-accent to-transparent rounded-full"
                />
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mt-7 max-w-xl text-base sm:text-lg text-muted-foreground text-pretty leading-relaxed"
            >
              MDS Resident in <em className="font-serif-italic text-foreground">Conservative Dentistry &amp; Endodontics</em>.
              Gold Medalist with four publications, a government-registered research
              copyright, and a quiet obsession with making smiles &mdash; and the science
              behind them &mdash; remarkable.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.95, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <MagneticButton
                href="#contact"
                className="group h-12 pl-5 pr-2 rounded-full bg-foreground text-background shadow-[0_18px_50px_-18px_oklch(0.18_0.02_240_/0.6)] hover:shadow-[0_22px_60px_-18px_oklch(0.18_0.02_240_/0.7)] transition-shadow"
              >
                <span className="inline-flex items-center gap-3 h-full text-sm font-medium">
                  Let&apos;s collaborate
                  <span className="grid place-items-center h-9 w-9 rounded-full bg-background text-foreground transition-transform group-hover:rotate-45">
                    <ArrowDown className="h-4 w-4 -rotate-45" strokeWidth={1.8} />
                  </span>
                </span>
              </MagneticButton>

              <MagneticButton
                href="#research"
                strength={14}
                className="group h-12 px-6 rounded-full border border-border bg-card/70 backdrop-blur hover:bg-card transition-colors"
              >
                <span className="inline-flex items-center gap-2 text-sm font-medium">
                  <BookOpen className="h-4 w-4" strokeWidth={1.6} />
                  Read research
                </span>
              </MagneticButton>
            </motion.div>

            {/* Tiny stat row */}
            <div className="mt-12 grid grid-cols-3 gap-4 max-w-md">
              {[
                { k: "4", v: "Publications" },
                { k: "6×", v: "Distinctions" },
                { k: "1", v: "Gold Medal" },
              ].map((s, i) => (
                <motion.div
                  key={s.v}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 + i * 0.08, duration: 0.6 }}
                  className="border-l border-border/70 pl-3"
                >
                  <div className="font-display text-2xl md:text-3xl font-medium tracking-tight">
                    {s.k}
                  </div>
                  <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground mt-0.5">
                    {s.v}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: composed visual */}
          <div className="col-span-12 lg:col-span-5 relative h-[460px] sm:h-[560px] lg:h-[620px]">
            {/* Spline 3D hero scene */}
            <motion.div
              style={{ x: tx1, y: ty1 }}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              <LazyVisible className="absolute inset-0">
                <SplineScene
                  scene={SPLINE_HERO_SCENE}
                  className="absolute inset-0"
                />
              </LazyVisible>
            </motion.div>

            {/* B&W portrait card — floating */}
            <motion.div
              style={{ x: tx2, y: ty2, rotate: -6 }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className={cn(
                "absolute right-2 sm:right-4 top-4 sm:top-8",
                "w-[150px] sm:w-[180px] aspect-[4/5] rounded-[28px] overflow-hidden",
                "bg-card border border-border shadow-[0_30px_60px_-25px_oklch(0.18_0.02_240/0.4)]"
              )}
            >
              <Image
                src={HEADSHOT_IMG}
                alt="Dr. Mahek Batra portrait"
                fill
                sizes="180px"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/30 rounded-[28px]" />
              <div className="absolute bottom-2 left-2 right-2 px-3 py-2 rounded-2xl bg-background/85 backdrop-blur text-[10px] uppercase tracking-[0.18em] font-mono">
                @smilewithdrmahek
              </div>
            </motion.div>

            {/* Achievement chip — top left */}
            <motion.div
              style={{ x: tx3, y: ty3 }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.7 }}
              className="absolute left-1 sm:left-3 top-4 glass border border-border/60 rounded-2xl p-3 pr-4 flex items-center gap-3 shadow-lg"
            >
              <span className="grid place-items-center h-9 w-9 rounded-xl bg-gradient-to-br from-gold-accent to-rose-accent text-foreground/80">
                <Award className="h-4 w-4" strokeWidth={1.8} />
              </span>
              <div className="leading-tight">
                <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  2024
                </div>
                <div className="text-sm font-medium">Gold Medalist · BDS</div>
              </div>
            </motion.div>

            {/* Floating publication chip */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.05, duration: 0.7 }}
              style={{ x: tx2, y: ty1 }}
              className="absolute left-2 sm:left-6 bottom-10 glass border border-border/60 rounded-2xl px-3 py-2.5 flex items-center gap-3 shadow-lg"
            >
              <span className="grid place-items-center h-8 w-8 rounded-lg bg-secondary text-secondary-foreground">
                <BookOpen className="h-4 w-4" strokeWidth={1.6} />
              </span>
              <div className="leading-tight">
                <div className="text-sm font-medium">4 published case reports</div>
                <div className="text-[11px] text-muted-foreground">+ research copyright</div>
              </div>
            </motion.div>

            {/* Specialty chip */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              style={{ x: tx3, y: ty2 }}
              className="absolute right-3 bottom-20 glass border border-border/60 rounded-full px-3 py-1.5 flex items-center gap-2 shadow-lg"
            >
              <Stethoscope className="h-3.5 w-3.5 text-brand" strokeWidth={1.8} />
              <span className="text-xs font-medium tracking-tight">
                Conservative Dentistry &amp; Endodontics
              </span>
            </motion.div>
          </div>
        </div>

        {/* Hidden, retained: graduation pic context for accessibility */}
        <div className="sr-only">
          <Image src={PROFILE_IMG} alt="Dr. Mahek Batra at her BDS graduation" width={120} height={160} />
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-muted-foreground"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] font-mono">scroll</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="h-4 w-4" strokeWidth={1.5} />
        </motion.span>
      </motion.div>
    </section>
  );
}
