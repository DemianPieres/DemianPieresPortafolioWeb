"use client";

import { useSyncExternalStore } from "react";
import ParticleText from "@/components/ParticleText";
import { getHomeTheme, getServerHomeTheme, subscribeHomeTheme } from "@/lib/home-theme";

function subscribeCompact(onChange: () => void) {
  const query = matchMedia("(max-width: 1100px)");
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}
const getCompact = () => matchMedia("(max-width: 1100px)").matches;
const getServerCompact = () => false;

export function ParticleName() {
  const theme = useSyncExternalStore(subscribeHomeTheme, getHomeTheme, getServerHomeTheme);
  const compact = useSyncExternalStore(subscribeCompact, getCompact, getServerCompact);
  const color = theme === "dark" ? "#ffffff" : "#000000";

  return (
    <div className="home-brand">
      <span className="home-brand-fallback" aria-hidden="true">DemianPieres.Dev</span>
      <ParticleText
        text="DemianPieres.Dev"
        particleSize={compact ? 1.2 : 2.2}
        density={compact ? 2 : 4}
        color={color}
        highlightColor={color}
        scatter={190}
        gatherDuration={1600}
        stagger={420}
        pointerRepel={42}
        repelRadius={120}
        idleDrift={0.8}
        trigger="hover"
        fontSize="clamp(3.5rem, 13vw, 9rem)"
        fontWeight={800}
        fontFamily="inherit"
        overflowPadding={210}
        glow
      />
    </div>
  );
}
