import { isAdminAuthenticated } from "@/lib/auth";
import { getAdminSupabase } from "@/lib/supabase/admin";

export async function GET() {
  const isAuthed = await isAdminAuthenticated();
  if (!isAuthed) {
    return Response.json(
      { error: "Akses ditolak. Silakan login sebagai admin terlebih dahulu." },
      { status: 401 }
    );
  }

  const supabase = getAdminSupabase();
  if (!supabase) {
    return Response.json({
      data: [],
      configured: false,
      message:
        "Supabase belum dikonfigurasi di .env.local. Masukkan NEXT_PUBLIC_SUPABASE_URL dan SUPABASE_SERVICE_ROLE_KEY.",
    });
  }

  const { data, error } = await supabase
    .from("wishes")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json({ data: data ?? [], configured: true });
}
