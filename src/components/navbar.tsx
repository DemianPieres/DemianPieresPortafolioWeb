"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Box, FileText, House, SquareTerminal } from "lucide-react";
import { assets } from "@/data/assets";
import { navigation } from "@/data/navigation";
import { gsap, useGSAP } from "@/lib/gsap";

function NavIcon({ icon }: { icon: (typeof navigation)[number]["icon"] }) {
  if (icon === "linux" || icon === "github") {
    return <Image src={assets[icon]} alt="" width={icon === "linux" ? 48 : 24} height={icon === "linux" ? 48 : 24} sizes={icon === "linux" ? "48px" : "24px"} className={`nav-asset nav-asset--${icon}`} />;
  }
  // No hay asset de LinkedIn: monograma tipográfico de marca, no icono inventado.
  if (icon === "linkedin") return <span aria-hidden="true" className="linkedin-mark">in</span>;
  const Icon = { home: House, terminal: SquareTerminal, projects: Box, document: FileText }[icon];
  return <Icon size={23} strokeWidth={1.6} aria-hidden="true" />;
}

export function Navbar() {
  const pathname = usePathname();
  const nav = useRef<HTMLElement>(null);

  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(nav.current, { y: 10, opacity: 0, scale: 0.97, duration: 0.55, ease: "power3.out" });
    });
    return () => media.revert();
  }, { scope: nav });

  return (
    <nav ref={nav} className="navbar" aria-label="Navegación principal">
      <ul>
        {navigation.map((item) => {
          const active = !item.external && pathname === item.href;
          const label = `${item.label}${item.external ? " (se abre en otra pestaña)" : ""}`;
          return (
            <li key={item.href}>
              <Link href={item.href} className={`nav-link ${active ? "is-active" : ""}`}
                aria-current={active ? "page" : undefined} aria-label={label}
                target={item.external ? "_blank" : undefined} rel={item.external ? "noopener noreferrer" : undefined}>
                <NavIcon icon={item.icon} />
                <span className="nav-tooltip" aria-hidden="true">{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
