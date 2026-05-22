import { useState } from "react";
import {
  Pizza,
  ShoppingCart,
  List,
  X,
  House,
  BookOpen,
  Star,
  Info,
  Phone,
} from "@phosphor-icons/react";

const navLinks = [
  { href: "#inicio",      label: "Inicio",       icon: <House size={16} /> },
  { href: "#catalogo",    label: "Menú",         icon: <BookOpen size={16} /> },
  { href: "#promociones", label: "Promociones",  icon: <Star size={16} /> },
  { href: "#quienes-somos", label: "Nosotros",   icon: <Info size={16} /> },
  { href: "#contacto",    label: "Contacto",     icon: <Phone size={16} /> },
];

export default function Navbar({ cartCount, onCartOpen }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        {/* Logo */}
        <a href="#inicio" className="navbar-logo">
          <div className="navbar-logo-icon">
            <Pizza size={24} weight="fill" />
          </div>
          <div className="navbar-logo-text">
            La <span>Peca</span> en la Pizza
          </div>
        </a>

        {/* Desktop nav */}
        <ul className="navbar-nav">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a href={l.href}>
                {l.icon}
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right side */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <button className="navbar-cart-btn" onClick={onCartOpen} aria-label="Ver carrito">
            <ShoppingCart size={22} weight="fill" />
            {cartCount > 0 && (
              <span className="cart-badge" key={cartCount}>
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </button>

          <button
            className="navbar-hamburger"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menú móvil"
            style={{ color: "#fff" }}
          >
            {menuOpen ? <X size={24} /> : <List size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {navLinks.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>
            {l.icon}
            {l.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
