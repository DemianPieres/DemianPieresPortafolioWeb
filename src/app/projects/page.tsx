import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { PhasePlaceholder } from "@/components/phase-placeholder";

export const metadata: Metadata = { title: "Proyectos" };
export default function Projects() {
  return <PageShell header={<div className="title-header"><p className="eyebrow">Demian Pieres · Portfolio</p><h1>Proyectos.</h1></div>}>
    <PhasePlaceholder phase="Fase 4">Selección de trabajos en preparación. Pendiente: confirmar proyectos, imágenes, descripciones y enlaces.</PhasePlaceholder>
  </PageShell>;
}
