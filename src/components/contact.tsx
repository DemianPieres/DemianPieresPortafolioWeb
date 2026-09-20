import { profile } from "@/data/profile";
import { Container } from "./container";
import { MagneticLink } from "./magnetic-link";

export function Contact() {
  return (
    <section id="contacto" className="contact" aria-labelledby="contact-title">
      <Container>
        <p className="eyebrow">Eso es todo por ahora.</p>
        <h2 id="contact-title">¿Tenés algún proyecto en mente?<br />Hablemos.</h2>
        <div className="contact-rule">
          <MagneticLink className="contact-cta" href={`mailto:${profile.email}`}>Ponte en contacto<span className="sr-only"> por email</span></MagneticLink>
        </div>
        <address className="contact-details">
          <div><span>Email:</span><a href={`mailto:${profile.email}`}>{profile.email}</a></div>
          {profile.phone && <div><span>Tel:</span><a href={`tel:${profile.phone}`}>{profile.phone}</a></div>}
        </address>
      </Container>
    </section>
  );
}
