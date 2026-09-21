import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/container";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";

export function FeaturedProjects() {
  const featured = projects.filter((project) => project.featured);

  return (
    <section className="featured-projects" aria-labelledby="featured-title">
      <Container>
        <div className="featured-heading">
          <h2 id="featured-title" data-home-reveal>Algunos de Mis Trabajos...</h2>
          <p>Observa mas en profundidad mis proyectos accediendo a mi <a href={profile.github} target="_blank" rel="noopener noreferrer">GitHub<span className="sr-only"> (se abre en otra pestaña)</span></a>.</p>
        </div>
        <div className="project-grid">
          {featured.map((project, index) => {
            // Los borradores no enlazan a demos ni se presentan como trabajos confirmados.
            const destination = project.status === "published" ? project.liveUrl ?? project.repositoryUrl : null;
            const title = <><ArrowRight className="home-arrow" aria-hidden="true" /><span>{project.title}</span></>;

            return (
              <article className="project-card" key={project.slug} aria-labelledby={`project-${project.slug}`}>
                <div className="project-cover">
                  {project.coverImage ? (
                    <Image src={project.coverImage} alt={`Vista de ${project.title}`} fill sizes="(max-width: 767px) 90vw, (max-width: 1536px) 43vw, 645px" />
                  ) : (
                    <div className="project-cover-placeholder">
                      <span className="project-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                      <p>Portada pendiente</p>
                    </div>
                  )}
                  {project.status === "draft" && <span className="project-status">Borrador · Por confirmar</span>}
                </div>
                <h3 id={`project-${project.slug}`} className="project-title">
                  {destination ? <a href={destination} target="_blank" rel="noopener noreferrer">{title}<span className="sr-only"> (se abre en otra pestaña)</span></a> : <span>{title}</span>}
                </h3>
              </article>
            );
          })}
        </div>
        <div className="projects-more">
          <Link href="/projects"><span aria-hidden="true" />Explorar más<span className="sr-only"> proyectos</span></Link>
        </div>
      </Container>
    </section>
  );
}
