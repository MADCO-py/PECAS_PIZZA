import { Tag, ShoppingCart } from "@phosphor-icons/react";
import { promos } from "../data/products";

export default function Promociones({ onAddPromo }) {
  return (
    <section id="promociones" className="promociones">
      <div className="container">
        <h2 className="section-title">Combos y Promociones</h2>
        <div className="section-divider" style={{ background: "linear-gradient(90deg, var(--dorado), var(--rojo))" }} />
        <p className="section-subtitle">
          Las mejores combinaciones al mejor precio. ¡Solo por tiempo limitado!
        </p>

        <div className="promos-grid">
          {promos.map((promo) => (
            <div
              key={promo.id}
              className="promo-card"
              style={{ background: `linear-gradient(135deg, ${promo.color}dd, ${promo.color}99)` }}
            >
              <div className="promo-header">
                <div className="promo-badge">{promo.badge}</div>
                <div className="promo-icon">
                  <Tag size={32} weight="fill" />
                </div>
                <div className="promo-name">{promo.name}</div>
                <div className="promo-desc">{promo.description}</div>
              </div>

              <div className="promo-footer">
                <div className="promo-prices">
                  <div className="promo-original">Q {promo.originalPrice.toFixed(2)}</div>
                  <div className="promo-final">Q {promo.promoPrice.toFixed(2)}</div>
                </div>
                <button
                  className="promo-add-btn"
                  onClick={() => onAddPromo && onAddPromo(promo)}
                >
                  <ShoppingCart size={15} weight="fill" />
                  Agregar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
