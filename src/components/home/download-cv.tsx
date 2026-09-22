"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import "./download-cv.css";

// Visual reference: Uiverse.io by nazar-gavrylyk. Native download, GSAP motion.
export function DownloadCV() {
  const root = useRef<HTMLAnchorElement>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);
  const { contextSafe } = useGSAP(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const reset = () => {
      timeline.current?.kill();
      if (root.current) gsap.set([root.current, ...root.current.querySelectorAll("span, svg")], { clearProps: "all" });
    };
    media.addEventListener("change", reset);
    return () => {
      media.removeEventListener("change", reset);
      timeline.current?.kill();
    };
  }, { scope: root });

  const animate = () => contextSafe(() => {
    if (!root.current || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    timeline.current?.revert();
    const title = root.current.querySelector(".cv-download__title");
    const circle = root.current.querySelector(".cv-download__circle");
    const icon = root.current.querySelector("svg");
    const square = root.current.querySelector(".cv-download__square");
    const fill = root.current.querySelector(".cv-download__fill");
    const orbit = root.current.querySelector(".cv-download__orbit");
    timeline.current = gsap.timeline({ defaults: { ease: "power2.inOut" } })
      .to(title, { opacity: 0, duration: 0.18 }, 0)
      .to(root.current, { width: 57, duration: 0.4 }, 0)
      .to(circle, { rotation: 180, scale: 0.95, duration: 0.4 }, 0)
      .to(icon, { opacity: 0, duration: 0.2 }, 0)
      .to(square, { opacity: 1, duration: 0.2 }, 0.2)
      .to(orbit, { opacity: 1, duration: 0.1 }, 0.4)
      .fromTo(orbit, { rotation: -90 }, { rotation: 270, duration: 1.2 }, 0.4)
      .to(fill, { scaleY: 1, duration: 1.2 }, 0.4)
      .to(orbit, { opacity: 0, duration: 0.15 }, 1.6)
      .to(square, { opacity: 0, duration: 0.15 }, 1.6)
      .to(fill, { scaleY: 0, duration: 0.25 }, 1.6)
      .to(circle, { rotation: 0, scale: 1, duration: 0.4 }, 1.6)
      .to(root.current, { width: 196, duration: 0.4 }, 1.6)
      .to(icon, { opacity: 1, duration: 0.2 }, 1.8)
      .to(title, { opacity: 1, duration: 0.2 }, 1.8);
  })();

  return (
    <div className="cv-download-slot">
      <a ref={root} href="/cv" download="DemianPieres.pdf" className="cv-download" aria-label="Descargar CV (PDF)" onClick={animate}>
        <span className="cv-download__orbit" aria-hidden="true"><span /></span>
        <span className="cv-download__circle" aria-hidden="true">
          <span className="cv-download__fill" />
          <svg viewBox="0 0 24 24" fill="none"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 19V5m0 14-4-4m4 4 4-4" /></svg>
          <span className="cv-download__square" />
        </span>
        <span className="cv-download__title" aria-hidden="true">Descargar CV</span>
      </a>
    </div>
  );
}
