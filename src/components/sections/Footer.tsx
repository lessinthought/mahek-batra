"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Heart, Mail } from "lucide-react";
import { InstagramIcon as Instagram } from "@/components/primitives/Icons";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL, resume } from "@/lib/resume";

export function Footer() {
  return (
    <footer className="relative pt-12 pb-32 border-t border-border/60 bg-background">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-12 gap-8 items-end">
          <div className="col-span-12 md:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-display text-[clamp(3rem,12vw,9rem)] leading-[0.85] tracking-tight font-medium"
            >
              <span>Dr. Mahek</span>{" "}
              <span className="font-serif-italic text-brand">Batra</span>
            </motion.div>
          </div>
          <div className="col-span-12 md:col-span-5 grid grid-cols-2 gap-6 md:text-right">
            <div>
              <div className="text-[10px] uppercase tracking-[0.22em] font-mono text-muted-foreground">
                Connect
              </div>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <a
                    href={`mailto:${resume.personal_information.email}`}
                    className="hover:text-brand transition-colors inline-flex items-center gap-2"
                  >
                    <Mail className="h-3.5 w-3.5" /> Email
                  </a>
                </li>
                <li>
                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-brand transition-colors inline-flex items-center gap-2"
                  >
                    <Instagram className="h-3.5 w-3.5" /> @{INSTAGRAM_HANDLE}
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.22em] font-mono text-muted-foreground">
                Navigate
              </div>
              <ul className="mt-3 space-y-2 text-sm">
                {[
                  ["#about", "About"],
                  ["#research", "Research"],
                  ["#skills", "Skills"],
                  ["#contact", "Contact"],
                ].map(([href, label]) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="hover:text-brand transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border/60 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-xs text-muted-foreground">
          <div>
            © {new Date().getFullYear()} Dr. Mahek Batra. All rights reserved.
          </div>
          <div className="inline-flex items-center gap-1.5">
            Developed with <Heart className="h-3 w-3 text-rose-accent" fill="currentColor" /> by{" "}
            <a
              href="https://piyushgautam.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground hover:text-brand transition-colors underline-offset-4 hover:underline"
            >
              Piyush Gautam
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
