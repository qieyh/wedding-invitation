"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { ArrowLeft, Eye, EyeOff, Lock, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export function AdminLoginForm() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!password.trim() || loading) return;

    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/rsvp/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: password.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Password tidak cocok.");
        toast.error(data.error || "Gagal masuk.");
        setLoading(false);
        return;
      }

      toast.success("Login berhasil! Membuka portal admin...");
      router.refresh();
    } catch {
      setErrorMsg("Terjadi gangguan koneksi. Silakan coba lagi.");
      toast.error("Gagal menghubungi server.");
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-linear-to-b from-[#FAF8F5] via-[#F4EFEA] to-[#FAF8F5] px-4 py-8">
      <div className="w-full max-w-sm sm:max-w-md">
        <Link
          href="/"
          className="mb-4 inline-flex items-center gap-1.5 text-xs font-medium text-nude-700 transition-colors hover:text-gold-600"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali ke Undangan
        </Link>

        <Card className="border border-gold-300/40 bg-white/95 shadow-xl backdrop-blur-md">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-50 border border-gold-200/60 shadow-xs">
              <Lock className="h-6 w-6 text-gold-500" />
            </div>
            <CardTitle className="font-serif text-xl sm:text-2xl text-nude-900 font-bold tracking-tight">
              Portal Admin RSVP
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm text-nude-700">
              Pernikahan Wulan &amp; Adi &bull; 11 Oktober 2026
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-4">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1.5">
                <label
                  htmlFor="password"
                  className="block text-xs font-semibold uppercase tracking-wider text-nude-800"
                >
                  Password Admin
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Masukkan password admin..."
                    required
                    autoFocus
                    className="h-11 rounded-xl border-nude-200 bg-nude-50/40 pr-10 text-sm focus:border-gold-500 focus:ring-1 focus:ring-gold-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-nude-700 hover:text-nude-900 transition-colors p-1"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {errorMsg && (
                <div className="rounded-xl border border-rose-200 bg-rose-50/80 p-2.5 text-center text-xs text-rose-700">
                  {errorMsg}
                </div>
              )}

              <Button
                type="submit"
                disabled={loading || !password.trim()}
                className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gold-500 text-xs sm:text-sm font-semibold uppercase tracking-wider text-white shadow-md transition-all hover:bg-gold-600 active:scale-[0.99] disabled:opacity-50"
              >
                <LogIn className="h-4 w-4" />
                {loading ? "Memeriksa..." : "Masuk ke Dashboard"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="mt-6 text-center text-[11px] text-nude-700">
          Akses khusus pengantin &amp; pengelola acara
        </p>
      </div>
    </div>
  );
}
