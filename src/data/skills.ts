import type { AssetKey } from "./assets";

export interface SkillCategory {
  id: string;
  title: string;
  logos: AssetKey[];
  missingLogos: string[];
  description: string | null;
}

// Categorías de Figma, sin porcentajes ni niveles inventados.
// TODO: completar/revisar descripciones durante Fase 3.
export const skills: SkillCategory[] = [
  { id: "frontend", title: "Front-End Development", logos: ["html", "javascript", "typescript", "nextjs", "redux", "react"], missingLogos: [] },
  { id: "styling", title: "Styling & Design", logos: ["tailwind"], missingLogos: ["CSS", "Bootstrap", "Sass", "Material UI"] },
  { id: "languages", title: "Programming Languages", logos: ["python", "c", "cpp"], missingLogos: ["Ruby"] },
  { id: "backend", title: "Back-End Development", logos: ["nodejs", "express"], missingLogos: ["Django", "Rails"] },
  { id: "motion", title: "Web Animations", logos: ["gsap"], missingLogos: ["Motion", "Spline"] },
  { id: "database", title: "Database Management", logos: ["mysql", "postgresql", "mongodb"], missingLogos: ["Firebase"] },
  { id: "cs", title: "Core Computer Science Concepts", logos: [], missingLogos: [] },
  { id: "cloud", title: "Cloud & Deployment", logos: ["docker", "aws", "vercel"], missingLogos: ["Azure", "Google Cloud"] },
  { id: "mobile", title: "Mobile App Development", logos: ["reactNative"], missingLogos: [] },
  { id: "version-control", title: "Version Control & Collaboration", logos: ["github", "git"], missingLogos: [] },
  { id: "design", title: "UI/UX Design", logos: ["figma"], missingLogos: [] },
  { id: "personal", title: "Personal Development", logos: [], missingLogos: [] },
  { id: "testing", title: "Testing & Debugging", logos: [], missingLogos: ["Postman", "Jest", "Selenium"] },
].map((category) => ({ ...category, logos: category.logos as AssetKey[], description: null }));
