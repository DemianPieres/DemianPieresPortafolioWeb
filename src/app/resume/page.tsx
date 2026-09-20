import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { PhasePlaceholder } from "@/components/phase-placeholder";

export const metadata: Metadata = { title: "Formación y experiencia" };
export default function Resume() {
  return <PageShell header={<div className="title-header"><p className="eyebrow">Información académica y laboral</p><h1>Formación<br />y experiencia.</h1></div>}>
    <PhasePlaceholder phase="Fase 6">La trayectoria se incorporará con datos confirmados: instituciones, títulos, puestos y fechas.</PhasePlaceholder>
  </PageShell>;
}
