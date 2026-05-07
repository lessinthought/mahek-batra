"use client";

import * as React from "react";

type Props = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  rootMargin?: string;
  className?: string;
};

// Renders `children` only after the wrapper has scrolled near the viewport.
// Useful for deferring heavy 3D / canvas mounts until they're actually needed.
export function LazyVisible({
  children,
  fallback,
  rootMargin = "200px",
  className,
}: Props) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    const node = ref.current;
    if (!node || show) return;
    if (typeof IntersectionObserver === "undefined") {
      setShow(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShow(true);
            io.disconnect();
            break;
          }
        }
      },
      { rootMargin }
    );
    io.observe(node);
    return () => io.disconnect();
  }, [rootMargin, show]);

  return (
    <div ref={ref} className={className}>
      {show ? children : fallback}
    </div>
  );
}
