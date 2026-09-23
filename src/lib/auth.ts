import "server-only";
import { cookies } from "next/headers";
import { createHmac } from "crypto";

export const ADMIN_COOKIE_NAME = "admin_authed";
const SALT = "wulan-adi-wedding-admin-salt-2026";

export function getExpectedAuthToken(): string {
  const secret = process.env.ADMIN_PASSWORD || "admin123";
  return createHmac("sha256", SALT).update(secret).digest("hex");
}

export function verifyAdminPassword(password: string): boolean {
  const configuredPassword = process.env.ADMIN_PASSWORD || "admin123";
  return Boolean(password && password === configuredPassword);
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  if (!token) {
    return false;
  }
  return token === getExpectedAuthToken();
}
