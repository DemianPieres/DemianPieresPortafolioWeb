import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { PhasePlaceholder } from "@/components/phase-placeholder";

export const metadata: Metadata = { title: "Sobre mí" };
export default function About() {
  return <PageShell header={<div className="title-header"><p className="eyebrow">Demian Pieres</p><h1>Sobre mí.</h1></div>}>
    <PhasePlaceholder phase="Fase 5">Este espacio contará mi historia. La biografía completa y la composición con Linux están pendientes.</PhasePlaceholder>
  </PageShell>;
}
