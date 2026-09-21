"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { MessagesSquare, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Reveal } from "@/components/common/reveal";
import { SectionHeading } from "@/components/common/section-heading";
import { JasmineTree } from "@/components/common/jasmine-tree";
import { ClosingSection } from "@/components/sections/closing-section";
import {
  getSupabase,
  isSupabaseConfigured,
  type Wish,
  type WishStatus,
} from "@/lib/supabase/client";

const LOCAL_KEY = "wedding-wishes";

const SEED_WISHES: Wish[] = [
  {
    id: "seed-1",
    name: "Dimas & Anisa",
    status: "Hadir",
    pax: "2",
    message:
      "Barakallahu lakuma wa baraka alaikuma! Semoga sakinah mawaddah warahmah selalu ya Wulan & Adi.",
    created_at: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "seed-2",
    name: "Sarah Maulida",
    status: "Hadir",
    pax: "1",
    message:
      "Selamat untuk Wulan dan Adi! Lancar sampai hari H yaa, happily ever after!",
    created_at: "2026-01-02T00:00:00.000Z",
  },
];

const STATUS_BADGE: Record<WishStatus, string> = {
  Hadir: "bg-emerald-50 text-emerald-700",
  "Ragu-ragu": "bg-amber-50 text-amber-700",
  "Tidak Hadir": "bg-rose-50 text-rose-700",
};

function loadStoredWishes(): Wish[] {
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Wish[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function persistStoredWishes(wishes: Wish[]) {
  try {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(wishes));
  } catch {
    // storage penuh / private mode — abaikan
  }
}

function WishItem({ wish }: { wish: Wish }) {
  return (
    <div className="rounded-xl border border-nude-200/80 bg-white p-2.5 shadow-xs">
      <div className="mb-1 flex items-center justify-between gap-2">
        <span className="text-[11px] font-semibold text-nude-900">{wish.name}</span>
        <span
          className={`rounded-full px-2 py-0.5 text-[9px] ${STATUS_BADGE[wish.status]}`}
        >
          {wish.status}
        </span>
      </div>
      <p className="text-[11px] text-nude-700">{wish.message}</p>
    </div>
  );
}

export function RsvpSection() {
  const [name, setName] = useState("");
  const [status, setStatus] = useState<WishStatus>("Hadir");
  const [pax, setPax] = useState("1");
  const [message, setMessage] = useState("");
  const [wishes, setWishes] = useState<Wish[]>(SEED_WISHES);
  const [submitting, setSubmitting] = useState(false);

  const uniqueWishes = useMemo(() => {
    const seen = new Set<string>();
    return wishes.filter((wish) => {
      if (seen.has(wish.id)) return false;
      seen.add(wish.id);
      return true;
    });
  }, [wishes]);

  useEffect(() => {
    let cancelled = false;

    if (!isSupabaseConfigured()) {
      const timer = setTimeout(() => {
        if (cancelled) return;
        const stored = loadStoredWishes();
        if (stored.length > 0) {
          setWishes([...stored, ...SEED_WISHES]);
        }
      }, 0);
      return () => {
        cancelled = true;
        clearTimeout(timer);
      };
    }

    const supabase = getSupabase();
    if (!supabase) return;

    supabase
      .from("wishes")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50)
      .then(({ data, error }) => {
        if (cancelled || error) return;
        setWishes((data as Wish[]) ?? []);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const cleanName = name.trim();
    const cleanMessage = message.trim();
    if (!cleanName || !cleanMessage || submitting) return;

    setSubmitting(true);

    const optimistic: Wish = {
      id: cryptoRandomId(),
      name: cleanName,
      status,
      pax,
      message: cleanMessage,
      created_at: new Date().toISOString(),
    };
    setWishes((prev) => [optimistic, ...prev]);
    setMessage("");
    setName("");

    const supabase = getSupabase();
    if (!supabase) {
      const stored = loadStoredWishes();
      persistStoredWishes([optimistic, ...stored]);
      toast.info("Tersimpan di perangkat ini (Supabase belum dikonfigurasi)");
      setSubmitting(false);
      return;
    }

    const { error } = await supabase
      .from("wishes")
      .insert({ name: cleanName, status, pax, message: cleanMessage });

    if (error) {
      setWishes((prev) => prev.filter((w) => w.id !== optimistic.id));
      toast.error("Gagal mengirim. Coba lagi ya.");
    } else {
      toast.success("Terima kasih! Konfirmasi dan doa restu Anda telah terkirim.");
    }
    setSubmitting(false);
  }

  return (
    <section
      id="rsvp"
      className="snap-section relative flex min-h-dvh flex-col justify-center overflow-hidden bg-linear-to-b from-[#FAF8F5] to-[#F5EEE6] px-6 pb-0 pt-20"
    >
      <JasmineTree />
      <SectionHeading
        badge="RSVP & Ucapan"
        title="Konfirmasi Kehadiran"
        subtitle="Doa restu Anda adalah kehormatan bagi kami"
      />

      <Reveal variant="scale" className="mb-4">
        <form
          onSubmit={handleSubmit}
          className="space-y-2.5 rounded-2xl border border-gold-300/40 bg-white/95 p-4 shadow-lg backdrop-blur-md"
        >
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nama Lengkap"
            required
            className="h-9 w-full rounded-xl border-nude-200 bg-nude-50/50 px-3.5 text-xs focus:border-gold-500"
          />
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Select value={status} onValueChange={(v) => setStatus(v as WishStatus)}>
                <SelectTrigger className="h-9 w-full rounded-xl border-nude-200 bg-nude-50/50 px-3 text-xs text-nude-800">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Hadir">Pasti Hadir</SelectItem>
                  <SelectItem value="Ragu-ragu">Masih Ragu</SelectItem>
                  <SelectItem value="Tidak Hadir">Maaf Tidak Bisa</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select value={pax} onValueChange={setPax}>
                <SelectTrigger className="h-9 w-full rounded-xl border-nude-200 bg-nude-50/50 px-3 text-xs text-nude-800">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Orang</SelectItem>
                  <SelectItem value="2">2 Orang</SelectItem>
                  <SelectItem value="3">3+ Orang</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tuliskan ucapan & doa restu..."
            required
            rows={2}
            className="rounded-xl border-nude-200 bg-nude-50/50 px-3.5 py-2 text-xs focus:border-gold-500"
          />
          <Button
            type="submit"
            disabled={submitting}
            className="flex h-auto w-full items-center justify-center gap-1.5 rounded-xl bg-gold-400 py-2.5 text-xs font-medium uppercase tracking-wider text-white shadow-md transition-all hover:bg-gold-500 active:scale-95 disabled:opacity-60"
          >
            <Send className="h-3.5 w-3.5" />
            {submitting ? "Mengirim..." : "Kirim Konfirmasi & Doa"}
          </Button>
        </form>
      </Reveal>

      <Reveal variant="3d">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1 font-serif text-xs font-bold text-nude-900">
            <MessagesSquare className="h-3.5 w-3.5 text-gold-500" />
            Doa &amp; Harapan ({uniqueWishes.length})
          </span>
          <span className="text-[10px] italic text-nude-700">Terbaru</span>
        </div>
        <div className="no-scrollbar mt-2 max-h-36 space-y-2 overflow-y-auto pr-1 text-xs">
          {uniqueWishes.map((wish, i) => (
            <div key={wish.id || `wish-${i}`} className="animate-fade-in">
              <WishItem wish={wish} />
            </div>
          ))}
        </div>
      </Reveal>

      <ClosingSection />
    </section>
  );
}

function cryptoRandomId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}