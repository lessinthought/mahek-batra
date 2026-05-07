"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import {
  GraduationCap,
  Stethoscope,
  Microscope,
  Sparkles,
  Mail,
  User,
  Moon,
  Sun,
} from "lucide-react";
import { InstagramIcon as Instagram } from "@/components/primitives/Icons";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

type Item = {
  href: string;
  label: string;
  Icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
};

const items: Item[] = [
  { href: "#about", label: "About", Icon: User },
  { href: "#education", label: "Education", Icon: GraduationCap },
  { href: "#experience", label: "Experience", Icon: Stethoscope },
  { href: "#research", label: "Research", Icon: Microscope },
  { href: "#skills", label: "Skills", Icon: Sparkles },
  { href: "#instagram", label: "Instagram", Icon: Instagram },
  { href: "#contact", label: "Contact", Icon: Mail },
];

function DockLabel({ label }: { label: string }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 6, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 6, scale: 0.9 }}
      transition={{ duration: 0.18 }}
      className="absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md bg-foreground text-background text-[11px] font-medium whitespace-nowrap pointer-events-none"
    >
      {label}
    </motion.span>
  );
}

function DockItem({
  Icon,
  label,
  href,
  mouseX,
}: Item & { mouseX: ReturnType<typeof useMotionValue<number>> }) {
  const ref = React.useRef<HTMLAnchorElement | null>(null);
  const [hover, setHover] = React.useState(false);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-140, 0, 140], [40, 64, 40]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 220, damping: 18 });

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ width }}
      aria-label={label}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
      className="relative aspect-square grid place-items-center rounded-full bg-card/60 border border-border/60 text-muted-foreground hover:text-foreground transition-colors"
    >
      <Icon className="h-[45%] w-[45%]" strokeWidth={1.6} />
      {hover ? <DockLabel label={label} /> : null}
    </motion.a>
  );
}

function ThemeToggle({
  mouseX,
}: {
  mouseX: ReturnType<typeof useMotionValue<number>>;
}) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  const ref = React.useRef<HTMLButtonElement | null>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });
  const widthSync = useTransform(distance, [-140, 0, 140], [40, 64, 40]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 220, damping: 18 });

  const isDark = (mounted ? resolvedTheme ?? theme : "light") === "dark";

  return (
    <motion.button
      ref={ref}
      style={{ width }}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
      className="aspect-square grid place-items-center rounded-full bg-card/60 border border-border/60 text-muted-foreground hover:text-foreground transition-colors"
    >
      {isDark ? (
        <Sun className="h-[45%] w-[45%]" strokeWidth={1.6} />
      ) : (
        <Moon className="h-[45%] w-[45%]" strokeWidth={1.6} />
      )}
    </motion.button>
  );
}

export function NavDock() {
  const mouseX = useMotionValue<number>(Number.POSITIVE_INFINITY);

  return (
    <motion.nav
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.6, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Number.POSITIVE_INFINITY)}
      className={cn(
        "fixed bottom-5 left-1/2 -translate-x-1/2 z-50",
        "flex items-end gap-2 px-3 py-2 rounded-full",
        "glass-strong border border-border/60 shadow-[0_18px_60px_-20px_oklch(0.45_0.08_195/0.35)]"
      )}
    >
      <Link
        href="#top"
        className="hidden md:flex items-center gap-2 pl-2 pr-3 h-10 rounded-full bg-foreground text-background text-xs font-medium tracking-tight shrink-0"
      >
        <span className="grid place-items-center h-7 w-7 rounded-full bg-background text-foreground font-display text-sm">
          M
        </span>
        Dr. Mahek
      </Link>
      {items.map((item) => (
        <DockItem key={item.href} {...item} mouseX={mouseX} />
      ))}
      <div className="w-px h-8 self-center bg-border/80 mx-1" />
      <ThemeToggle mouseX={mouseX} />
    </motion.nav>
  );
}
