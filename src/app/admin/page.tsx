import type { Metadata } from "next";
import { isAdminAuthenticated } from "@/lib/auth";
import { getAdminSupabase, isAdminSupabaseConfigured } from "@/lib/supabase/admin";
import { AdminLoginForm } from "@/components/admin/login-form";
import { AdminDashboard } from "@/components/admin/admin-dashboard";
import type { Wish } from "@/lib/supabase/client";

export const metadata: Metadata = {
  title: "Admin Portal RSVP & Ucapan - Wulan & Adi",
  description: "Dashboard manajemen RSVP dan ucapan pernikahan Wulan & Adi.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminPage() {
  const isAuthed = await isAdminAuthenticated();

  if (!isAuthed) {
    return <AdminLoginForm />;
  }

  let wishes: Wish[] = [];
  const isConfigured = isAdminSupabaseConfigured();

  if (isConfigured) {
    const supabase = getAdminSupabase();
    if (supabase) {
      const { data } = await supabase
        .from("wishes")
        .select("*")
        .order("created_at", { ascending: false });

      if (data) {
        wishes = data as Wish[];
      }
    }
  }

  return <AdminDashboard initialWishes={wishes} isConfigured={isConfigured} />;
}
