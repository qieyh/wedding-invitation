"use client";

import { useEffect, useState } from "react";
import {
  Calendar,
  Gift,
  Heart,
  Images,
  MessagesSquare,
  type LucideIcon,
} from "lucide-react";

interface NavItem {
  id: string;
  label: string;
  Icon: LucideIcon;
}

const ITEMS: NavItem[] = [
  { id: "couple", label: "Mempelai", Icon: Heart },
  { id: "events", label: "Rangkaian Acara", Icon: Calendar },
  { id: "gallery", label: "Galeri", Icon: Images },
  { id: "rsvp", label: "RSVP", Icon: MessagesSquare },
  { id: "gift", label: "Kado", Icon: Gift },
];

export function FloatingNav() {
  const [active, setActive] = useState(ITEMS[0].id);

  useEffect(() => {
    const container = document.querySelector<HTMLElement>(".snap-container");
    if (!container) return;

    const sections: HTMLElement[] = ITEMS.flatMap((item) => {
      const el = document.getElementById(item.id);
      return el ? [el] : [];
    });
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { root: container, rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  function goTo(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    const container = el.closest(".snap-container");
    if (container) {
      container.scrollTo({ top: el.offsetTop, left: 0, behavior: "smooth" });
    }
  }

  return (
    <nav
      className="pointer-events-none absolute inset-x-0 bottom-3 z-30 flex justify-center px-4"
      aria-label="Navigasi undangan"
    >
      <div className="pointer-events-auto flex items-center gap-1 rounded-2xl border border-gold-300/40 bg-white/85 p-1.5 shadow-lg backdrop-blur-md">
        {ITEMS.map(({ id, label, Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => goTo(id)}
            aria-label={label}
            aria-current={active === id ? "true" : undefined}
            className={`flex h-9 w-9 items-center justify-center rounded-xl transition-all active:scale-95 ${
              active === id
                ? "bg-gold-400 text-white shadow"
                : "text-nude-700 hover:bg-gold-300/20"
            }`}
          >
            <Icon className="h-4 w-4" />
          </button>
        ))}
      </div>
    </nav>
  );
}