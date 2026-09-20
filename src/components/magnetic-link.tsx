"use client";

import { useRef, type ComponentPropsWithoutRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export function MagneticLink(props: ComponentPropsWithoutRef<"a">) {
  const ref = useRef<HTMLAnchorElement>(null);
  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add("(min-width: 1024px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      const link = ref.current;
      if (!link) return;
      const x = gsap.quickTo(link, "x", { duration: 0.3, ease: "power3.out" });
      const y = gsap.quickTo(link, "y", { duration: 0.3, ease: "power3.out" });
      const move = (event: PointerEvent) => {
        const bounds = link.getBoundingClientRect();
        x((event.clientX - bounds.left - bounds.width / 2) * 0.12);
        y((event.clientY - bounds.top - bounds.height / 2) * 0.12);
      };
      const reset = () => { x(0); y(0); };
      link.addEventListener("pointermove", move);
      link.addEventListener("pointerleave", reset);
      link.addEventListener("focus", reset);
      return () => {
        link.removeEventListener("pointermove", move);
        link.removeEventListener("pointerleave", reset);
        link.removeEventListener("focus", reset);
      };
    });
    return () => media.revert();
  }, { scope: ref });
  return <a ref={ref} {...props} />;
}
