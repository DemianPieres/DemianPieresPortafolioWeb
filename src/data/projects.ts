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

// Seeds visuales del PROJECT_BRIEF: no presentar como trabajos confirmados.
// TODO: confirmar autoría y completar contenido, portadas y enlaces.
export const projects: Project[] = [
  ["learnlogicify", "Learnlogicify Landing Page"],
  ["winzee", "Winzee Web Chat application"],
  ["chatgpt-clone", "ChatGPT clone"],
  ["gemini-clone", "Gemini Clone"],
].map(([slug, title]) => ({
  slug, title, shortDescription: null, longDescription: null, coverImage: null,
  gallery: [], technologies: [], featured: true, liveUrl: null,
  repositoryUrl: null, year: null, status: "draft",
}));
