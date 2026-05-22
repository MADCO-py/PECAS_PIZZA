import { Pizza, Heart } from "@phosphor-icons/react";

const links = [
  { href: "#inicio",        label: "Inicio" },
  { href: "#catalogo",      label: "Menú" },
  { href: "#promociones",   label: "Promociones" },
  { href: "#quienes-somos", label: "Quiénes Somos" },
  { href: "#contacto",      label: "Contacto" },
];

const categories = ["Pizzas", "Pastas", "Canoas", "Burritos", "Bebidas", "Especialidades"];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <div className="footer-logo">
              <div className="footer-logo-icon">
                <Pizza size={20} weight="fill" />
              </div>
              <div className="footer-logo-text">
                La <span>Peca</span> en la Pizza
              </div>
            </div>
            <p className="footer-tagline">
              Auténtica pizzería italiana en Guatemala desde hace más de 10 años.
              Cada pizza, una historia. Cada mordida, un recuerdo.
            </p>
          </div>

          {/* Nav links */}
          <div>
            <div className="footer-heading">Navegación</div>
            <ul className="footer-links">
              {links.map((l) => (
                <li key={l.href}>
                  <a href={l.href}>{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <div className="footer-heading">Categorías</div>
            <ul className="footer-links">
              {categories.map((c) => (
                <li key={c}>
                  <a href="#catalogo">{c}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            &copy; {year} La Peca en la Pizza. Todos los derechos reservados.
          </span>
          <span>
            Hecho con <Heart size={14} weight="fill" style={{ color: "var(--rojo)", verticalAlign: "middle" }} /> en Guatemala
          </span>
        </div>
      </div>
    </footer>
  );
}
