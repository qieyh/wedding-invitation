import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Undangan Pernikahan Digital - Wulan & Adi",
  description:
    "The Wedding Celebration Of Wulan & Adi - Minggu, 11 Oktober 2026. Jl. KH. Agus Salim RT/RW 08/01 Dusun Krajan 1 Alasbuluh, Wongsorejo, Banyuwangi.",
  openGraph: {
    title: "Wedding Website",
    description: "Wulan & Adi - Minggu, 11 Oktober 2026. Mohon doa restunya.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#F4EFEA",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="id"
      className={`${plusJakartaSans.variable} ${playfairDisplay.variable} ${cormorantGaramond.variable} h-full scroll-smooth`}
    >
      <body className="flex min-h-full flex-col select-none bg-[#FAF8F5] font-sans antialiased">
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}