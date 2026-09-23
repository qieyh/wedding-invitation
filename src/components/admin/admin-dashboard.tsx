"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  Download,
  HelpCircle,
  LayoutGrid,
  LogOut,
  MessageSquare,
  RefreshCw,
  Search,
  Table as TableIcon,
  Users,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { type Wish, type WishStatus } from "@/lib/supabase/client";

interface AdminDashboardProps {
  initialWishes: Wish[];
  isConfigured: boolean;
}

const STATUS_CONFIG: Record<
  WishStatus,
  { label: string; badgeClass: string; icon: React.ComponentType<{ className?: string }> }
> = {
  Hadir: {
    label: "Pasti Hadir",
    badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
    icon: CheckCircle2,
  },
  "Ragu-ragu": {
    label: "Masih Ragu",
    badgeClass: "bg-amber-50 text-amber-700 border-amber-200/80",
    icon: HelpCircle,
  },
  "Tidak Hadir": {
    label: "Tidak Hadir",
    badgeClass: "bg-rose-50 text-rose-700 border-rose-200/80",
    icon: XCircle,
  },
};

function formatIndonesianDate(isoString: string): string {
  try {
    const d = new Date(isoString);
    if (isNaN(d.getTime())) return isoString;
    return new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(d);
  } catch {
    return isoString;
  }
}

export function AdminDashboard({ initialWishes, isConfigured }: AdminDashboardProps) {
  const [wishes, setWishes] = useState<Wish[]>(initialWishes);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"Semua" | WishStatus>("Semua");
  const [viewMode, setViewMode] = useState<"card" | "table">("card");
  const [refreshing, setRefreshing] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const router = useRouter();

  // Statistik Ringkasan
  const stats = useMemo(() => {
    const total = wishes.length;
    let hadirCount = 0;
    let hadirPax = 0;
    let raguCount = 0;
    let raguPax = 0;
    let tidakHadirCount = 0;

    for (const w of wishes) {
      const paxNum = parseInt(w.pax, 10) || 1;
      if (w.status === "Hadir") {
        hadirCount++;
        hadirPax += paxNum;
      } else if (w.status === "Ragu-ragu") {
        raguCount++;
        raguPax += paxNum;
      } else if (w.status === "Tidak Hadir") {
        tidakHadirCount++;
      }
    }

    return {
      total,
      hadirCount,
      hadirPax,
      raguCount,
      raguPax,
      tidakHadirCount,
      totalPaxHadir: hadirPax,
    };
  }, [wishes]);

  // Data Terfilter
  const filteredWishes = useMemo(() => {
    return wishes.filter((w) => {
      const matchStatus = statusFilter === "Semua" || w.status === statusFilter;
      const cleanQuery = searchTerm.trim().toLowerCase();
      const matchSearch =
        !cleanQuery ||
        w.name.toLowerCase().includes(cleanQuery) ||
        w.message.toLowerCase().includes(cleanQuery);
      return matchStatus && matchSearch;
    });
  }, [wishes, statusFilter, searchTerm]);

  // Refresh data dari API
  async function handleRefresh() {
    setRefreshing(true);
    try {
      const res = await fetch("/api/rsvp");
      const json = await res.json();
      if (res.ok && Array.isArray(json.data)) {
        setWishes(json.data);
        toast.success("Data berhasil diperbarui!");
      } else {
        toast.error(json.error || "Gagal memuat data terbaru.");
      }
    } catch {
      toast.error("Gagal terhubung ke server.");
    } finally {
      setRefreshing(false);
    }
  }

  // Logout
  async function handleLogout() {
    setLoggingOut(true);
    try {
      await fetch("/api/rsvp/session", { method: "DELETE" });
      toast.success("Logout berhasil.");
      router.refresh();
    } catch {
      toast.error("Gagal logout.");
      setLoggingOut(false);
    }
  }

  // Export CSV dengan UTF-8 BOM
  function handleExportCsv() {
    if (wishes.length === 0) {
      toast.info("Belum ada data untuk diexport.");
      return;
    }

    const BOM = "\uFEFF";
    const headers = [
      "Nama",
      "Status Kehadiran",
      "Jumlah Pax",
      "Ucapan & Doa",
      "Waktu Konfirmasi",
    ];

    const escapeCsv = (val: string | number) => {
      const str = String(val ?? "").replace(/"/g, '""');
      return `"${str}"`;
    };

    const rows = wishes.map((w) => [
      escapeCsv(w.name),
      escapeCsv(w.status),
      escapeCsv(w.pax),
      escapeCsv(w.message.replace(/\r?\n/g, " ")),
      escapeCsv(formatIndonesianDate(w.created_at)),
    ]);

    const csvContent =
      BOM + [headers.join(","), ...rows.map((r) => r.join(","))].join("\r\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    const dateStr = new Date().toISOString().slice(0, 10);
    link.download = `rsvp-wulan-adi-${dateStr}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast.success("File CSV berhasil diunduh.");
  }

  return (
    <div className="min-h-dvh bg-[#FAF8F5] pb-16 text-nude-900">
      {/* Top Navbar */}
      <header className="sticky top-0 z-20 border-b border-nude-200/80 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2.5">
            <Link
              href="/"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-nude-200 bg-nude-50 text-nude-700 transition hover:bg-gold-50 hover:text-gold-600"
              title="Kembali ke Undangan"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <div>
              <h1 className="font-serif text-base sm:text-lg font-bold leading-tight text-nude-900">
                Admin RSVP &amp; Ucapan
              </h1>
              <p className="text-[11px] text-nude-700">Wulan &amp; Adi</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={refreshing}
              className="h-8 gap-1 rounded-lg border-nude-200 px-2.5 text-xs text-nude-800 hover:border-gold-300 hover:bg-gold-50/50"
              title="Perbarui Data"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${refreshing ? "animate-spin" : ""}`} />
              <span className="hidden sm:inline">Refresh</span>
            </Button>

            <Button
              size="sm"
              onClick={handleExportCsv}
              className="h-8 gap-1 rounded-lg bg-gold-500 px-2.5 text-xs text-white hover:bg-gold-600 shadow-xs"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Export CSV</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              disabled={loggingOut}
              className="h-8 gap-1 rounded-lg px-2 text-xs text-rose-600 hover:bg-rose-50 hover:text-rose-700"
              title="Keluar"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Keluar</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="mx-auto max-w-6xl px-4 pt-5 sm:px-6">
        {/* Banner jika env belum terhubung */}
        {!isConfigured && (
          <div className="mb-5 rounded-2xl border border-amber-300/80 bg-amber-50/90 p-4 text-xs text-amber-800 shadow-xs">
            <p className="font-semibold">Perhatian: Kredensial Supabase Belum Lengkap</p>
            <p className="mt-1 text-amber-700">
              Isi <code className="rounded bg-amber-100 px-1 py-0.5 font-mono">NEXT_PUBLIC_SUPABASE_URL</code> dan{" "}
              <code className="rounded bg-amber-100 px-1 py-0.5 font-mono">SUPABASE_SERVICE_ROLE_KEY</code> di file{" "}
              <code className="rounded bg-amber-100 px-1 py-0.5 font-mono">.env.local</code> agar data RSVP tersimpan
              dan terbaca langsung dari cloud database.
            </p>
          </div>
        )}

        {/* Ringkasan / Stat Cards (Responsive Grid) */}
        <section className="mb-6 grid grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-4">
          <Card className="border border-nude-200/90 bg-white shadow-xs">
            <CardContent className="p-3.5">
              <div className="flex items-center justify-between text-nude-700">
                <span className="text-[11px] font-medium uppercase tracking-wider">Total Respon</span>
                <MessageSquare className="h-4 w-4 text-gold-500" />
              </div>
              <p className="mt-1.5 font-serif text-2xl font-bold text-nude-900">{stats.total}</p>
              <p className="text-[10px] text-nude-700">Ucapan &amp; konfirmasi</p>
            </CardContent>
          </Card>

          <Card className="border border-emerald-200/70 bg-emerald-50/40 shadow-xs">
            <CardContent className="p-3.5">
              <div className="flex items-center justify-between text-emerald-800">
                <span className="text-[11px] font-medium uppercase tracking-wider">Pasti Hadir</span>
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              </div>
              <div className="mt-1.5 flex items-baseline gap-1.5">
                <span className="font-serif text-2xl font-bold text-emerald-900">{stats.hadirCount}</span>
                <span className="text-xs text-emerald-700">undangan</span>
              </div>
              <p className="text-[10px] font-medium text-emerald-700">
                Estimasi <span className="font-bold">{stats.hadirPax} tamu</span>
              </p>
            </CardContent>
          </Card>

          <Card className="border border-amber-200/70 bg-amber-50/40 shadow-xs">
            <CardContent className="p-3.5">
              <div className="flex items-center justify-between text-amber-800">
                <span className="text-[11px] font-medium uppercase tracking-wider">Masih Ragu</span>
                <HelpCircle className="h-4 w-4 text-amber-600" />
              </div>
              <div className="mt-1.5 flex items-baseline gap-1.5">
                <span className="font-serif text-2xl font-bold text-amber-900">{stats.raguCount}</span>
                <span className="text-xs text-amber-700">undangan</span>
              </div>
              <p className="text-[10px] text-amber-700">
                Potensi <span className="font-bold">{stats.raguPax} tamu</span>
              </p>
            </CardContent>
          </Card>

          <Card className="border border-rose-200/70 bg-rose-50/40 shadow-xs">
            <CardContent className="p-3.5">
              <div className="flex items-center justify-between text-rose-800">
                <span className="text-[11px] font-medium uppercase tracking-wider">Tidak Hadir</span>
                <XCircle className="h-4 w-4 text-rose-600" />
              </div>
              <div className="mt-1.5 flex items-baseline gap-1.5">
                <span className="font-serif text-2xl font-bold text-rose-900">{stats.tidakHadirCount}</span>
                <span className="text-xs text-rose-700">undangan</span>
              </div>
              <p className="text-[10px] text-rose-700">Mendoakan dari jauh</p>
            </CardContent>
          </Card>
        </section>

        {/* Filter, Search & View Controls */}
        <div className="mb-4 flex flex-col gap-3 rounded-2xl border border-nude-200 bg-white p-3 shadow-xs sm:flex-row sm:items-center sm:justify-between">
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-nude-700" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari nama atau ucapan..."
              className="h-9 w-full rounded-xl border-nude-200 bg-nude-50/50 pl-9 text-xs focus:border-gold-500"
            />
          </div>

          {/* Status Tabs & Mode Switcher */}
          <div className="flex flex-wrap items-center justify-between gap-2 sm:justify-end">
            {/* Status Pills */}
            <div className="flex items-center gap-1 overflow-x-auto rounded-xl bg-nude-100/70 p-1">
              {(["Semua", "Hadir", "Ragu-ragu", "Tidak Hadir"] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`rounded-lg px-2.5 py-1 text-[11px] font-medium transition ${
                    statusFilter === st
                      ? "bg-white text-nude-900 shadow-xs"
                      : "text-nude-700 hover:text-nude-900"
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>

            {/* Layout Toggle (Card vs Table) */}
            <div className="flex items-center rounded-xl border border-nude-200 bg-nude-50/60 p-0.5">
              <button
                onClick={() => setViewMode("card")}
                className={`flex h-7 w-7 items-center justify-center rounded-lg transition ${
                  viewMode === "card"
                    ? "bg-white text-gold-600 shadow-xs"
                    : "text-nude-700 hover:text-nude-900"
                }`}
                title="Tampilan Kartu (Nyaman di Mobile)"
              >
                <LayoutGrid className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => setViewMode("table")}
                className={`flex h-7 w-7 items-center justify-center rounded-lg transition ${
                  viewMode === "table"
                    ? "bg-white text-gold-600 shadow-xs"
                    : "text-nude-700 hover:text-nude-900"
                }`}
                title="Tampilan Tabel"
              >
                <TableIcon className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Counter Info */}
        <div className="mb-3 flex items-center justify-between px-1 text-xs text-nude-700">
          <span>
            Menampilkan <strong className="text-nude-900">{filteredWishes.length}</strong> dari{" "}
            {wishes.length} data
          </span>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="text-[11px] font-medium text-gold-600 hover:underline"
            >
              Reset pencarian
            </button>
          )}
        </div>

        {/* Empty State */}
        {filteredWishes.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-nude-300 bg-white py-12 text-center shadow-xs">
            <MessageSquare className="h-8 w-8 text-nude-300" />
            <p className="mt-2 text-sm font-semibold text-nude-800">Tidak ada data yang cocok</p>
            <p className="mt-1 text-xs text-nude-700">
              {searchTerm || statusFilter !== "Semua"
                ? "Coba ubah kata kunci atau filter status kehadiran."
                : "Belum ada tamu yang mengirimkan konfirmasi kehadiran."}
            </p>
          </div>
        )}

        {/* View Mode: Card (Ideal untuk Mobile & Tablet) */}
        {viewMode === "card" && filteredWishes.length > 0 && (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filteredWishes.map((item) => {
              const statusCfg = STATUS_CONFIG[item.status] || STATUS_CONFIG["Hadir"];
              const StatusIcon = statusCfg.icon;

              return (
                <div
                  key={item.id}
                  className="flex flex-col justify-between rounded-2xl border border-nude-200/90 bg-white p-4 shadow-xs transition hover:border-gold-300/60 hover:shadow-md"
                >
                  <div>
                    {/* Header Card: Nama & Badge */}
                    <div className="flex items-start justify-between gap-2">
                      <h2 className="font-semibold text-sm text-nude-900 leading-tight">
                        {item.name}
                      </h2>
                      <span
                        className={`inline-flex shrink-0 items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium ${statusCfg.badgeClass}`}
                      >
                        <StatusIcon className="h-3 w-3" />
                        {item.status}
                      </span>
                    </div>

                    {/* Metadata: Pax & Waktu */}
                    <div className="mt-2 flex flex-wrap items-center gap-3 text-[11px] text-nude-700">
                      <span className="inline-flex items-center gap-1 font-medium text-nude-800">
                        <Users className="h-3.5 w-3.5 text-gold-500" />
                        {item.pax} Tamu (Pax)
                      </span>
                      <span className="inline-flex items-center gap-1 text-[10px]">
                        <Clock className="h-3 w-3 text-nude-700" />
                        {formatIndonesianDate(item.created_at)}
                      </span>
                    </div>

                    {/* Ucapan */}
                    <div className="mt-3 rounded-xl bg-nude-50/60 p-2.5 text-xs leading-relaxed text-nude-800 border border-nude-200/50">
                      &ldquo;{item.message}&rdquo;
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* View Mode: Table (Ideal untuk Desktop & Layar Lebar) */}
        {viewMode === "table" && filteredWishes.length > 0 && (
          <div className="overflow-hidden rounded-2xl border border-nude-200 bg-white shadow-xs">
            <div className="no-scrollbar overflow-x-auto">
              <table className="w-full min-w-[650px] border-collapse text-left text-xs">
                <thead>
                  <tr className="border-b border-nude-200 bg-nude-50/70 text-[11px] font-semibold uppercase tracking-wider text-nude-700">
                    <th className="py-3 pl-4 pr-3">Nama Tamu</th>
                    <th className="px-3 py-3">Status</th>
                    <th className="px-3 py-3">Pax</th>
                    <th className="px-3 py-3">Ucapan &amp; Doa</th>
                    <th className="py-3 pl-3 pr-4 text-right">Waktu Konfirmasi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-nude-200/60">
                  {filteredWishes.map((item) => {
                    const statusCfg = STATUS_CONFIG[item.status] || STATUS_CONFIG["Hadir"];
                    const StatusIcon = statusCfg.icon;

                    return (
                      <tr key={item.id} className="transition-colors hover:bg-gold-50/20">
                        <td className="py-3 pl-4 pr-3 font-semibold text-nude-900">
                          {item.name}
                        </td>
                        <td className="px-3 py-3 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium ${statusCfg.badgeClass}`}
                          >
                            <StatusIcon className="h-3 w-3" />
                            {item.status}
                          </span>
                        </td>
                        <td className="px-3 py-3 whitespace-nowrap font-medium text-nude-800">
                          {item.pax} Pax
                        </td>
                        <td className="max-w-xs px-3 py-3 text-nude-700">
                          <p className="line-clamp-2 leading-relaxed">{item.message}</p>
                        </td>
                        <td className="py-3 pl-3 pr-4 text-right whitespace-nowrap text-[11px] text-nude-700">
                          {formatIndonesianDate(item.created_at)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
