"use client";

import { Particles, ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Engine, ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
  fpsLimit: 120,
  fullScreen: { enable: false },
  detectRetina: false,
  particles: {
    number: { value: 250, density: { enable: true } },
    color: { value: "#ffffff" },
    shape: { type: "circle" },
    opacity: { value: { min: 0.1, max: 0.5 } },
    size: { value: { min: 1, max: 5 } },
    move: {
      enable: true,
      direction: "bottom",
      speed: 2,
      random: false,
      straight: false,
      outModes: { default: "out" },
    },
  },
};

export function ParticlesLayer() {
  return (
    <ParticlesProvider
      init={async (engine: Engine) => {
        await loadSlim(engine);
      }}
    >
      <Particles
        id="cover-particles"
        options={options}
        className="pointer-events-none absolute inset-0"
      />
    </ParticlesProvider>
  );
}