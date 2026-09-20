import { profile } from "./profile";

export const navigation = [
  { href: "/", label: "Inicio", icon: "home", external: false },
  { href: "/skills", label: "Skills", icon: "terminal", external: false },
  { href: "/projects", label: "Proyectos", icon: "projects", external: false },
  { href: "/about", label: "Sobre mí", icon: "linux", external: false },
  { href: "/resume", label: "Información académica y laboral", icon: "document", external: false },
  { href: profile.github, label: "GitHub", icon: "github", external: true },
  { href: profile.linkedin, label: "LinkedIn", icon: "linkedin", external: true },
] as const;
