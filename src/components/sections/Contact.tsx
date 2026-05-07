"use client";

import * as React from "react";
import { motion } from "motion/react";
import { Mail, Phone, MapPin, ArrowUpRight, Copy, Check } from "lucide-react";
import { InstagramIcon as Instagram } from "@/components/primitives/Icons";
import { MagneticButton } from "@/components/primitives/MagneticButton";
import { resume, INSTAGRAM_URL, INSTAGRAM_HANDLE } from "@/lib/resume";

const email = resume.personal_information.email;
const phone = resume.personal_information.phone;

export function Contact() {
  const [copied, setCopied] = React.useState<"email" | "phone" | null>(null);

  function copy(value: string, key: "email" | "phone") {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(key);
      setTimeout(() => setCopied(null), 1600);
    });
  }

  return (
    <section
      id="contact"
      className="relative py-32 md:py-44 overflow-hidden"
    >
      {/* Backdrop */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(900px 600px at 50% 0%, rgba(112,196,184,0.18), transparent 60%), linear-gradient(180deg, transparent 0%, oklch(0.95 0.02 200) 100%)",
        }}
      />
      <div className="absolute inset-0 -z-10 dark:hidden grain" />

      <div className="mx-auto max-w-5xl px-5 sm:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border/70 bg-card/70 backdrop-blur text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground"
        >
          <span className="relative inline-flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          Currently open to opportunities
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 font-display tracking-tight text-balance leading-[0.95] text-[clamp(2.6rem,8vw,6.4rem)]"
        >
          Let&apos;s build something{" "}
          <span className="font-serif-italic text-brand">remarkable</span>{" "}
          together.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 max-w-xl mx-auto text-base md:text-lg text-muted-foreground text-pretty"
        >
          Medical writing, research collaborations, healthcare communication,
          content partnerships — let&apos;s talk.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <MagneticButton
            href={`mailto:${email}`}
            className="group h-14 pl-6 pr-3 rounded-full bg-foreground text-background shadow-[0_24px_60px_-22px_oklch(0.18_0.02_240/0.6)]"
          >
            <span className="inline-flex items-center gap-3 text-sm font-medium">
              <Mail className="h-4 w-4" strokeWidth={1.8} />
              {email}
              <span className="grid place-items-center h-10 w-10 rounded-full bg-background text-foreground transition-transform group-hover:rotate-45">
                <ArrowUpRight className="h-4 w-4" strokeWidth={1.8} />
              </span>
            </span>
          </MagneticButton>

          <MagneticButton
            href={INSTAGRAM_URL}
            strength={14}
            className="h-14 px-6 rounded-full border border-border bg-card/80 backdrop-blur"
          >
            <span className="inline-flex items-center gap-2 text-sm font-medium">
              <Instagram className="h-4 w-4" strokeWidth={1.7} />
              @{INSTAGRAM_HANDLE}
            </span>
          </MagneticButton>
        </motion.div>

        {/* Contact tiles */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-3 text-left max-w-3xl mx-auto">
          <Tile
            Icon={Mail}
            label="Email"
            value={email}
            onCopy={() => copy(email, "email")}
            copied={copied === "email"}
          />
          <Tile
            Icon={Phone}
            label="Phone"
            value={phone}
            onCopy={() => copy(phone, "phone")}
            copied={copied === "phone"}
          />
          <Tile
            Icon={MapPin}
            label="Location"
            value={`${resume.personal_information.location.city}, ${resume.personal_information.location.country}`}
          />
        </div>
      </div>
    </section>
  );
}

function Tile({
  Icon,
  label,
  value,
  onCopy,
  copied,
}: {
  Icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  value: string;
  onCopy?: () => void;
  copied?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group relative p-5 rounded-2xl border border-border/70 bg-card/80 backdrop-blur hover:border-brand/40 transition-colors"
    >
      <div className="flex items-start justify-between">
        <span className="grid place-items-center h-9 w-9 rounded-xl bg-secondary text-brand">
          <Icon className="h-4 w-4" strokeWidth={1.7} />
        </span>
        {onCopy ? (
          <button
            onClick={onCopy}
            aria-label={`Copy ${label}`}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
          </button>
        ) : null}
      </div>
      <div className="mt-4">
        <div className="text-[10px] uppercase tracking-[0.22em] font-mono text-muted-foreground">
          {label}
        </div>
        <div className="mt-1 text-sm font-medium break-all">{value}</div>
      </div>
    </motion.div>
  );
}
