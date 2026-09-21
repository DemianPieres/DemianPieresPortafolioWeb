"use client";

import { useRef, useSyncExternalStore, type MouseEvent } from "react";
import { IconParkOutlineDarkMode } from "@/components/icons/icon-park-outline/dark-mode";
import { gsap, useGSAP } from "@/lib/gsap";
import { getHomeTheme, getServerHomeTheme, subscribeHomeTheme, toggleHomeTheme } from "@/lib/home-theme";

export function ThemeToggle() {
  const button = useRef<HTMLButtonElement>(null);
  const theme = useSyncExternalStore(subscribeHomeTheme, getHomeTheme, getServerHomeTheme);
  const { contextSafe } = useGSAP(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: reduce)", () => {
      const targets = button.current?.querySelectorAll("svg, .theme-toggle-ripple");
      if (targets) {
        gsap.killTweensOf(targets);
        gsap.set(targets, { clearProps: "transform,opacity" });
      }
    });
    return () => media.revert();
  }, { scope: button });

  const toggle = contextSafe((event: MouseEvent<HTMLButtonElement>) => {
    toggleHomeTheme();
    const icon = event.currentTarget.querySelector("svg");
    const ripple = event.currentTarget.querySelector(".theme-toggle-ripple");
    if (!icon || !ripple || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.killTweensOf([icon, ripple]);
    gsap.fromTo(icon, { rotation: -90, scale: 0.65 }, {
      rotation: 0, scale: 1, duration: 0.55, ease: "back.out(1.5)", clearProps: "transform",
    });
    gsap.fromTo(ripple, { scale: 0.8, opacity: 0.65 }, {
      scale: 1.5, opacity: 0, duration: 0.55, ease: "power2.out", clearProps: "transform,opacity",
    });
  });

  return (
    <button ref={button} className="theme-toggle" type="button" onClick={toggle}
      aria-label="Modo oscuro" aria-pressed={theme === "dark"}
      title={theme === "dark" ? "Activar modo claro" : "Activar modo oscuro"}>
      <span className="theme-toggle-ripple" aria-hidden="true" />
      <IconParkOutlineDarkMode aria-hidden="true" focusable="false" />
    </button>
  );
}
