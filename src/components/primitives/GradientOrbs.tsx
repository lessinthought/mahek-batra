import { cn } from "@/lib/utils";

// Soft gradient orbs that drift in the background. Uses rgba (not oklch in radial-gradient)
// to render reliably in all browsers.
export function GradientOrbs({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)}>
      <div
        className="absolute -top-20 -left-20 h-[480px] w-[480px] rounded-full opacity-70 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(112,196,184,0.55) 0%, rgba(112,196,184,0) 65%)",
          animation: "orb 22s ease-in-out infinite",
        }}
      />
      <div
        className="absolute top-1/3 -right-32 h-[520px] w-[520px] rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(244,178,170,0.55) 0%, rgba(244,178,170,0) 65%)",
          animation: "orb 28s ease-in-out infinite reverse",
        }}
      />
      <div
        className="absolute bottom-0 left-1/4 h-[420px] w-[420px] rounded-full opacity-50 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(247,213,162,0.5) 0%, rgba(247,213,162,0) 65%)",
          animation: "orb 24s ease-in-out infinite",
        }}
      />
    </div>
  );
}
