"use client";

import * as React from "react";
import dynamic from "next/dynamic";

// We use the Next-optimized server-component variant via dynamic import.
// Note: `/next` exports an async server component, but loading it through
// next/dynamic with ssr:false runs it on the client.
const Spline = dynamic(
  () => import("@splinetool/react-spline").then((m) => m.default),
  { ssr: false, loading: () => null }
);

type Props = {
  scene: string;
  className?: string;
  onLoad?: () => void;
  fallback?: React.ReactNode;
  // When true (default), the scene won't mount on mobile / coarse-pointer
  // devices and the fallback is shown instead. Spline runtime + scene files
  // are too heavy for low-end mobile GPUs.
  skipOnMobile?: boolean;
};

function useShouldRender(skipOnMobile: boolean) {
  const [shouldRender, setShouldRender] = React.useState(!skipOnMobile);
  React.useEffect(() => {
    if (!skipOnMobile) {
      setShouldRender(true);
      return;
    }
    const mq = window.matchMedia(
      "(min-width: 768px) and (hover: hover) and (pointer: fine)"
    );
    const update = () => setShouldRender(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [skipOnMobile]);
  return shouldRender;
}

class SplineErrorBoundary extends React.Component<
  { children: React.ReactNode; onError: () => void },
  { errored: boolean }
> {
  state = { errored: false };

  static getDerivedStateFromError() {
    return { errored: true };
  }

  componentDidCatch() {
    this.props.onError();
  }

  render() {
    if (this.state.errored) return null;
    return this.props.children;
  }
}

function DefaultFallback() {
  return (
    <div className="absolute inset-0 grid place-items-center overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 45%, rgba(112,196,184,0.45) 0%, rgba(112,196,184,0) 70%), radial-gradient(50% 50% at 70% 70%, rgba(244,178,170,0.45) 0%, rgba(244,178,170,0) 70%), radial-gradient(40% 40% at 30% 70%, rgba(247,213,162,0.4) 0%, rgba(247,213,162,0) 70%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 mix-blend-overlay opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <div className="relative">
        <div className="absolute -inset-10 rounded-full bg-gradient-to-tr from-rose-accent/40 via-gold-accent/30 to-brand/40 blur-2xl" />
        <div className="relative h-56 w-56 sm:h-72 sm:w-72 rounded-full bg-gradient-to-br from-white/70 via-white/20 to-transparent backdrop-blur-xl border border-white/40 shadow-[0_30px_80px_-25px_rgba(31,41,55,0.35)]">
          <div className="absolute inset-6 rounded-full bg-gradient-to-tr from-rose-accent/40 via-gold-accent/30 to-brand/40 blur-md" />
          <div className="absolute inset-12 rounded-full bg-gradient-to-br from-white to-white/60" />
          <div className="absolute inset-20 rounded-full bg-gradient-to-tr from-brand/20 via-white to-rose-accent/20" />
        </div>
      </div>
    </div>
  );
}

// Module-level guard: only swap to fallback if Spline never reaches `onLoad`
// AND a runtime error has fired. Per-frame errors after a successful load are
// silenced but the scene stays mounted (so users still see the static visual).
function isSplineErrorEvent(filename?: string, message?: string) {
  const hay = `${filename ?? ""} ${message ?? ""}`;
  return (
    hay.includes("splinetool") ||
    hay.includes("scene.splinecode") ||
    hay.includes("V1.onFrame") ||
    hay.includes("@splinetool")
  );
}

export function SplineScene({
  scene,
  className,
  onLoad,
  fallback,
  skipOnMobile = true,
}: Props) {
  const shouldRender = useShouldRender(skipOnMobile);
  const [loaded, setLoaded] = React.useState(false);
  const [hardFailed, setHardFailed] = React.useState(false);
  const loadedRef = React.useRef(false);

  React.useEffect(() => {
    function looksLikeSpline(msg: string, stack: string) {
      return (
        msg.includes("position") &&
        (stack.includes("splinetool") ||
          stack.includes("V1.onFrame") ||
          stack.includes("@splinetool"))
      );
    }

    // 1. Patch requestAnimationFrame to swallow Spline's per-frame throws at
    //    the source — before they ever reach window.error.
    const originalRAF = window.requestAnimationFrame.bind(window);
    const patchedRAF: typeof window.requestAnimationFrame = (cb) => {
      return originalRAF((time) => {
        try {
          cb(time);
        } catch (err) {
          const e = err as Error;
          const msg = String(e?.message ?? err ?? "");
          const stack = String(e?.stack ?? "");
          if (looksLikeSpline(msg, stack)) {
            if (!loadedRef.current) setHardFailed(true);
            return;
          }
          throw err;
        }
      });
    };
    window.requestAnimationFrame = patchedRAF;

    // 2. Capture-phase listener so we run BEFORE Next.js's dev overlay handler
    //    and can stopImmediatePropagation.
    function onError(e: ErrorEvent) {
      const stack = String((e.error as Error | undefined)?.stack ?? "");
      if (!isSplineErrorEvent(e.filename, e.message) && !looksLikeSpline(e.message, stack)) {
        return;
      }
      e.preventDefault();
      e.stopImmediatePropagation();
      if (!loadedRef.current) setHardFailed(true);
    }
    function onRejection(e: PromiseRejectionEvent) {
      const reason = e.reason as { message?: string; stack?: string } | undefined;
      const msg = String(reason?.message ?? e.reason ?? "");
      const stack = String(reason?.stack ?? "");
      if (
        msg.includes("splinetool") ||
        msg.includes("scene.splinecode") ||
        msg.includes("@splinetool") ||
        looksLikeSpline(msg, stack)
      ) {
        e.preventDefault();
        e.stopImmediatePropagation();
        if (!loadedRef.current) setHardFailed(true);
      }
    }

    window.addEventListener("error", onError, { capture: true });
    window.addEventListener("unhandledrejection", onRejection, { capture: true });

    return () => {
      window.requestAnimationFrame = originalRAF;
      window.removeEventListener("error", onError, { capture: true } as EventListenerOptions);
      window.removeEventListener("unhandledrejection", onRejection, {
        capture: true,
      } as EventListenerOptions);
    };
  }, []);

  if (hardFailed || !shouldRender) {
    return <div className={className}>{fallback ?? <DefaultFallback />}</div>;
  }

  return (
    <div className={className}>
      <SplineErrorBoundary onError={() => !loadedRef.current && setHardFailed(true)}>
        {!loaded ? (
          <div className="absolute inset-0 grid place-items-center pointer-events-none z-10">
            <div className="flex flex-col items-center gap-3 text-muted-foreground">
              <div className="relative h-10 w-10">
                <span
                  className="absolute inset-0 rounded-full border border-brand/30"
                  style={{ animation: "pulse-ring 1.6s ease-out infinite" }}
                />
                <span className="absolute inset-0 rounded-full border-2 border-brand border-t-transparent animate-spin" />
              </div>
              <span className="text-[10px] uppercase tracking-[0.3em] font-mono">
                loading scene
              </span>
            </div>
          </div>
        ) : null}
        <Spline
          scene={scene}
          onLoad={() => {
            loadedRef.current = true;
            setLoaded(true);
            onLoad?.();
          }}
          style={{ width: "100%", height: "100%" }}
        />
      </SplineErrorBoundary>
    </div>
  );
}

// Self-hosted from /public — avoids Spline's CDN entirely and lets us swap
// the file without changing code.
export const SPLINE_HERO_SCENE = "/scene.splinecode";
