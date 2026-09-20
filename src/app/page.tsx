import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { assets } from "@/data/assets";
import { profile } from "@/data/profile";
import { Container } from "@/components/container";
import { PageShell } from "@/components/page-shell";
import { PhasePlaceholder } from "@/components/phase-placeholder";

export default function Home() {
  return (
    <PageShell portrait header={<Image className="portrait" src={assets.portrait} alt="Retrato de Demian Pieres en blanco y negro" sizes="(max-width: 767px) 1300px, 100vw" preload />}>
      <Container className="intro">
        <div><p className="eyebrow">Portfolio personal</p><h1>Me llamo {profile.name}.<br />{profile.role}.</h1></div>
        <div className="intro-aside"><p>{profile.shortBio}</p><Link href="/about" className="text-link">Más sobre mí <ArrowUpRight aria-hidden="true" size={22} /></Link></div>
      </Container>
      <PhasePlaceholder phase="Fase 2">Inicio en construcción. La selección de proyectos y la composición completa de esta página se incorporarán en la siguiente fase.</PhasePlaceholder>
    </PageShell>
  );
}
