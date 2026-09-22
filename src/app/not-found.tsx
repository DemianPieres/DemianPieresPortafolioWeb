import Link from "next/link";
import { ThemeToggle } from "@/components/home/theme-toggle";

export default function NotFound() {
  return <div className="page-shell"><ThemeToggle /><main id="main" className="container not-found" tabIndex={-1}><p className="eyebrow">404</p><h1>Esta página no existe.</h1><Link className="text-link" href="/">Volver al inicio</Link></main></div>;
}
