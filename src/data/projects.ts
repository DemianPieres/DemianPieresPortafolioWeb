import ecommerceCover from "../../docs/PortadaEcomerce.png";
import laSextaCover from "../../docs/LaSextaapp.png";

export interface Project {
  slug: string;
  title: string;
  shortDescription: string | null;
  longDescription: string | null;
  coverImage: string | null;
  gallery: string[];
  technologies: string[];
  featured: boolean;
  liveUrl: string | null;
  repositoryUrl: string | null;
  year: number | null;
  status: "draft" | "published";
}

const projectCovers: Record<string, string> = {
  "ecomerce-web-inteligente": ecommerceCover.src,
  "la-sexta-android": laSextaCover.src,
};

// Los dos primeros títulos y portadas son del usuario; los demás son seeds del brief.
// TODO: completar los datos y enlaces antes de publicar los proyectos.
export const projects: Project[] = [
  ["ecomerce-web-inteligente", "eCOMERCE-Web inteligente"],
  ["la-sexta-android", "App Android para complejo de fútbol"],
  ["chatgpt-clone", "ChatGPT clone"],
  ["gemini-clone", "Gemini Clone"],
].map(([slug, title]) => ({
  slug, title, shortDescription: null, longDescription: null, coverImage: projectCovers[slug] ?? null,
  gallery: [], technologies: [], featured: true, liveUrl: null,
  repositoryUrl: null, year: null, status: "draft",
}));
