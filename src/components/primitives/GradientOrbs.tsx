"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

function useReducedAnim() {
  const [reduce, setReduce] = React.useState(false);
  React.useEffect(() => {
    const a = window.matchMedia("(prefers-reduced-motion: reduce)");
    const b = window.matchMedia("(max-width: 767px)");
    const update = () => setReduce(a.matches || b.matches);
    update();
    a.addEventListener("change", update);
    b.addEventListener("change", update);
    return () => {
      a.removeEventListener("change", update);
      b.removeEventListener("change", update);
    };
  }, []);
  return reduce;
}

// Soft gradient orbs that drift in the background. Uses rgba (not oklch in
// radial-gradient) to render reliably in all browsers. Animation is disabled
// on mobile and when prefers-reduced-motion is set.
export function GradientOrbs({ className }: { className?: string }) {
  const reduce = useReducedAnim();
  const anim = (s: string) => (reduce ? undefined : s);

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
        className
      )}
    >
      <div
        className="absolute -top-20 -left-20 h-[360px] w-[360px] md:h-[480px] md:w-[480px] rounded-full opacity-70 blur-2xl md:blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(112,196,184,0.55) 0%, rgba(112,196,184,0) 65%)",
          animation: anim("orb 22s ease-in-out infinite"),
        }}
      />
      <div
        className="absolute top-1/3 -right-24 h-[400px] w-[400px] md:h-[520px] md:w-[520px] rounded-full opacity-60 blur-2xl md:blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(244,178,170,0.55) 0%, rgba(244,178,170,0) 65%)",
          animation: anim("orb 28s ease-in-out infinite reverse"),
        }}
      />
      <div
        className="absolute bottom-0 left-1/4 h-[320px] w-[320px] md:h-[420px] md:w-[420px] rounded-full opacity-50 blur-2xl md:blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(247,213,162,0.5) 0%, rgba(247,213,162,0) 65%)",
          animation: anim("orb 24s ease-in-out infinite"),
        }}
      />
    </div>
  );
}
