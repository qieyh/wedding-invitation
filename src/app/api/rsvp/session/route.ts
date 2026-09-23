import { cookies } from "next/headers";
import {
  ADMIN_COOKIE_NAME,
  getExpectedAuthToken,
  verifyAdminPassword,
} from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const password = typeof body?.password === "string" ? body.password : "";

    if (!verifyAdminPassword(password)) {
      return Response.json(
        { error: "Password salah. Silakan coba lagi." },
        { status: 401 }
      );
    }

    const cookieStore = await cookies();
    cookieStore.set(ADMIN_COOKIE_NAME, getExpectedAuthToken(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 hari
    });

    return Response.json({ success: true, message: "Login berhasil." });
  } catch {
    return Response.json(
      { error: "Permintaan tidak valid." },
      { status: 400 }
    );
  }
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
  return Response.json({ success: true, message: "Logout berhasil." });
}
