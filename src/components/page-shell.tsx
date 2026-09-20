import type { ReactNode } from "react";
import { Navbar } from "./navbar";
import { Contact } from "./contact";
import { EditorialFooter } from "./editorial-footer";

export function PageShell({ children, header, theme = "light", portrait = false }: {
  children: ReactNode;
  header: ReactNode;
  theme?: "light" | "dark";
  portrait?: boolean;
}) {
  return (
    <div id="top" data-theme={theme} className="page-shell">
      <header className={portrait ? "page-header page-header--portrait" : "page-header"}>
        {header}
        <div className="nav-position"><Navbar /></div>
      </header>
      <main id="main" tabIndex={-1}>{children}<Contact /></main>
      <EditorialFooter />
    </div>
  );
}
