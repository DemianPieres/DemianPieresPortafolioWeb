import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { assets } from "@/data/assets";
import { Container } from "@/components/container";
import { PageShell } from "@/components/page-shell";
import { HomeMotion } from "@/components/home/home-motion";
import { FeaturedProjects } from "@/components/home/featured-projects";
import { ParticleName } from "@/components/home/particle-name";
import { DownloadCV } from "@/components/home/download-cv";
import "./home.css";

export default function Home() {
  return (
    <HomeMotion>
      <PageShell portrait beforeNav={<DownloadCV />} header={<><div className="home-portrait-frame"><Image className="portrait" src={assets.portrait} alt="Retrato de Demian Pieres en blanco y negro" sizes="(max-width: 767px) 1300px, 100vw" preload /></div><ParticleName /></>}>
        <Container className="home-intro">
          <h1 data-home-reveal>Hola, soy Demian Pieres, tengo 22 años y soy Desarrollador de Software, graduado del Instituto Santo Domingo de Córdoba Capital.<br /> Vivo en Córdoba Capital y actualmente me dedico al desarrollo de software a medida, creando soluciones adaptadas a las necesidades de cada proyecto. Además, trabajo como Soporte IT en AMX Argentina, combinando desarrollo y tecnología en mi experiencia profesional. </h1>
          <div className="home-intro-aside">
            <p>Me apasiona el mundo de la tecnología y transformar ideas en soluciones eficientes y automatizadas. Actualmente contengo un enfoque sobre Growth Hacking y todo lo que tenga que ver con Automatización de Marketing con el fin de aumentar trafico o ventas de una entidad</p>
            <Link href="/about" className="text-link">Más sobre mí <ArrowUpRight className="home-arrow" aria-hidden="true" /></Link>
          </div>
        </Container>
        <FeaturedProjects />
      </PageShell>
    </HomeMotion>
  );
}
