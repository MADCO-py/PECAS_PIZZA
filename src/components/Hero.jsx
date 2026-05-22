import { Flame, ArrowRight, Star, Clock } from "@phosphor-icons/react";

export default function Hero({ onCatalogClick }) {
  return (
    <section id="inicio" className="hero">
      <div className="hero-bg-pattern" />

      {/* Floating decorative emojis */}
      <div className="hero-floaters" aria-hidden="true">
        <span className="hero-floater">🍕</span>
        <span className="hero-floater">🌿</span>
        <span className="hero-floater">🍝</span>
        <span className="hero-floater">🧀</span>
        <span className="hero-floater">🫙</span>
      </div>

      <div className="hero-content">
        <div className="hero-badge">
          <Flame size={16} weight="fill" />
          Auténtica Pizzería Italiana · Guatemala
        </div>

        <h1>
          La <span>Peca</span><br />en la Pizza
        </h1>

        <p className="hero-tagline">Donde cada mordida es una aventura</p>

        <p>
          Más de 30 platillos artesanales, pizzas monstruosas, pastas del corazón
          y sabores que no encontrarás en ningún otro lugar de Guatemala.
          Bienvenido a la experiencia La Peca.
        </p>

        <div className="hero-ctas">
          <button className="btn-primary" onClick={onCatalogClick}>
            <ArrowRight size={18} weight="bold" />
            Ver el Menú Completo
          </button>
          <a href="#promociones" className="btn-secondary">
            <Star size={18} weight="fill" />
            Nuestras Promos
          </a>
        </div>

        <div className="hero-stats">
          <div className="hero-stat">
            <strong>33+</strong>
            <span>Opciones en menú</span>
          </div>
          <div className="hero-stat">
            <strong>10 años</strong>
            <span>De tradición</span>
          </div>
          <div className="hero-stat">
            <strong>
              <Clock size={24} weight="fill" style={{ verticalAlign: "middle" }} />
            </strong>
            <span>Abierto todos los días</span>
          </div>
          <div className="hero-stat">
            <strong>2</strong>
            <span>Sucursales en Guate</span>
          </div>
        </div>
      </div>
    </section>
  );
}
