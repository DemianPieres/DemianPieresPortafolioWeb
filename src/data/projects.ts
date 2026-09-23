import ecommerceCover from "../../docs/PortadaEcomerce.png";

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

// Primer título y portada aportados por el usuario; los demás son seeds del brief.
// TODO: completar los datos y enlaces antes de publicar los proyectos.
export const projects: Project[] = [
  ["ecomerce-web-inteligente", "eCOMERCE-Web inteligente"],
  ["winzee", "Winzee Web Chat application"],
  ["chatgpt-clone", "ChatGPT clone"],
  ["gemini-clone", "Gemini Clone"],
].map(([slug, title]) => ({
  slug, title, shortDescription: null, longDescription: null, coverImage: slug === "ecomerce-web-inteligente" ? ecommerceCover.src : null,
  gallery: [], technologies: [], featured: true, liveUrl: null,
  repositoryUrl: null, year: null, status: "draft",
}));
