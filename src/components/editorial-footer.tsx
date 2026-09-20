import { CornerUpRight } from "lucide-react";

export function EditorialFooter() {
  return (
    <footer className="editorial-footer">
      <div className="footer-top">
        <p>The boss in progress...</p>
        <a className="footer-back" href="#top" aria-label="Volver al inicio de la página"><CornerUpRight aria-hidden="true" strokeWidth={1.5} /></a>
      </div>
      <p className="footer-word" aria-hidden="true">shhhhhhhhh</p>
    </footer>
  );
}
