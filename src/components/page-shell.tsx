import type { ReactNode } from "react";
import { Navbar } from "./navbar";
import { Contact } from "./contact";
import { EditorialFooter } from "./editorial-footer";
import { ThemeToggle } from "./home/theme-toggle";

export function PageShell({ children, header, theme = "light", portrait = false, beforeNav }: {
  children: ReactNode;
  header: ReactNode;
  theme?: "light" | "dark";
  portrait?: boolean;
  beforeNav?: ReactNode;
}) {
  return (
    <div id="top" data-theme={theme} className="page-shell">
      <header className={portrait ? "page-header page-header--portrait" : "page-header"}>
        {header}
        <ThemeToggle />
        <div className="nav-position">{beforeNav}<Navbar /></div>
      </header>
      <main id="main" tabIndex={-1}>{children}<Contact /></main>
      <EditorialFooter />
    </div>
  );
}
