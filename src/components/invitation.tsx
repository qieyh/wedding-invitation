"use client";

import { Suspense } from "react";
import { AudioProvider } from "@/components/audio/audio-provider";
import { AudioPill } from "@/components/audio/audio-pill";
import { BackgroundDecor } from "@/components/common/background-decor";
import { CoverScreen } from "@/components/cover/cover-screen";
import { CoupleSection } from "@/components/sections/couple-section";
import { EventsSection } from "@/components/sections/events-section";
import { GallerySection } from "@/components/sections/gallery-section";
import { GiftSection } from "@/components/sections/gift-section";
import { RsvpSection } from "@/components/sections/rsvp-section";

export function Invitation() {
  return (
    <AudioProvider>
      {/* Desktop Ambient Backdrop */}
      <div className="flex min-h-dvh w-full items-center justify-center bg-linear-to-b from-[#ECE4D8] via-[#E4D9CA] to-[#D8CBBA] sm:p-4 md:p-6">
        {/* Mobile Device Mockup Frame on Desktop, 100% Fullscreen on Mobile Phones */}
        <div className="relative h-dvh w-full max-w-107.5 overflow-hidden bg-white shadow-xl transition-all sm:h-211 sm:max-h-[92vh] sm:rounded-2xl">

          <BackgroundDecor />
          <Suspense fallback={null}>
            <CoverScreen />
          </Suspense>
          <AudioPill />
          <main className="snap-container no-scrollbar h-full w-full bg-white">
            <CoupleSection />
            <EventsSection />
            <GallerySection />
            <RsvpSection />
            <GiftSection />
          </main>
        </div>
      </div>
    </AudioProvider>
  );
}