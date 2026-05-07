"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
  reverse?: boolean;
  speed?: number; // seconds per loop
  pauseOnHover?: boolean;
};

export function Marquee({
  children,
  className,
  reverse = false,
  speed = 32,
  pauseOnHover = true,
}: Props) {
  return (
    <div
      className={cn(
        "group relative flex w-full overflow-hidden mask-fade-x",
        className
      )}
    >
      {[0, 1].map((i) => (
        <div
          key={i}
          aria-hidden={i === 1}
          className={cn(
            "flex shrink-0 items-center gap-6 px-3",
            pauseOnHover && "group-hover:[animation-play-state:paused]"
          )}
          style={{
            animation: `marquee-x ${speed}s linear infinite`,
            animationDirection: reverse ? "reverse" : "normal",
          }}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
