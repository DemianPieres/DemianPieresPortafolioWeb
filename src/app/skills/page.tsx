import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { PhasePlaceholder } from "@/components/phase-placeholder";

export const metadata: Metadata = { title: "Skills" };
export default function Skills() {
  return <PageShell theme="dark" header={<div className="title-header"><p className="eyebrow">@ Code by Demian.dev</p><h1>Habilidades que<br />alimentan mi<br />pasión</h1></div>}>
    <PhasePlaceholder phase="Fase 3">La grilla de habilidades está pendiente de implementación a partir de la referencia Figma.</PhasePlaceholder>
  </PageShell>;
}
