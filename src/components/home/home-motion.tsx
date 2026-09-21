"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export function HomeMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add({
      desktop: "(min-width: 768px)",
      motion: "(prefers-reduced-motion: no-preference)",
    }, (context) => {
      if (!context.conditions?.motion || !root.current) return;

      gsap.from(root.current.querySelector(".portrait"), {
        scale: 1.025,
        duration: 1,
        ease: "power3.out",
        clearProps: "transform",
      });

      root.current.querySelectorAll<HTMLElement>("[data-home-reveal], .contact h2, .footer-top > p").forEach((heading) => {
        // Reproduce el comportamiento de “Blurry Text Scroll” de la referencia:
        // se aclara durante el primer 20% del recorrido y revierte al subir.
        const reveal = gsap.timeline({
          scrollTrigger: {
            trigger: heading,
            start: "top bottom",
            end: "clamp(top top)",
            scrub: 0.7,
            invalidateOnRefresh: true,
          },
        });
        reveal
          .fromTo(heading, { y: 50 }, { y: 0, duration: 0.2, ease: "none" }, 0)
          .fromTo(heading, { filter: "blur(10px)" }, {
            filter: "blur(0px)", duration: 0.2, ease: "circ.inOut",
          }, 0)
          .to({}, { duration: 0.8 });
      });

      root.current.querySelectorAll<HTMLElement>(".project-card").forEach((card, index) => {
        gsap.from(card, {
          y: context.conditions?.desktop ? 28 : 16,
          opacity: 0,
          duration: 0.6,
          delay: context.conditions?.desktop ? (index % 2) * 0.08 : 0,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 94%", once: true },
        });
      });
    });
    return () => media.revert();
  }, { scope: root });

  return <div ref={root} className="home">{children}</div>;
}
