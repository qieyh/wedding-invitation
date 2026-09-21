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

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.01, rootMargin: "60px 0px 40px 0px" }
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