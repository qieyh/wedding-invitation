"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export type RevealVariant = "3d" | "left" | "right" | "scale";

const VARIANT_CLASS: Record<RevealVariant, string> = {
  "3d": "reveal-3d",
  left: "reveal-card-left",
  right: "reveal-card-right",
  scale: "reveal-scale",
};

interface RevealProps {
  variant?: RevealVariant;
  delay?: number;
  className?: string;
  children: ReactNode;
}

export function Reveal({ variant = "3d", delay = 0, className = "", children }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return !("IntersectionObserver" in window);
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Use the snap-container as root so observer works inside the phone frame
    const scrollRoot = el.closest(".snap-container") as Element | null;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(true);
            observer.disconnect();
          }
        });
      },
      {
        root: scrollRoot ?? null,
        threshold: 0.12,
        rootMargin: "0px 0px -20px 0px",
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${VARIANT_CLASS[variant]} ${active ? "active" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}