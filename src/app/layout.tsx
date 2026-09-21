import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { homeThemeScript } from "@/lib/home-theme";

const sans = Geist({ subsets: ["latin"], variable: "--font-geist-sans", display: "swap" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });

export const metadata: Metadata = {
  title: { default: "Demian Pieres — Portfolio", template: "%s — Demian Pieres" },
  description: "Portfolio personal de Demian Pieres, desarrollador de software.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es" className={`${sans.variable} ${mono.variable}`} suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: homeThemeScript }} /></head><body><a href="#main" className="skip-link">Saltar al contenido</a>{children}</body></html>;
}
