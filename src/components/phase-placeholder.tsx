import { Container } from "./container";

export function PhasePlaceholder({ phase, children }: { phase: string; children: React.ReactNode }) {
  return <Container className="phase-placeholder"><p className="eyebrow">{phase} · Pendiente</p><p>{children}</p></Container>;
}
