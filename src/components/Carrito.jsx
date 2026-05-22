import {
  X,
  ShoppingCart,
  Trash,
  Plus,
  Minus,
  ArrowRight,
} from "@phosphor-icons/react";

const IVA = 0.12;

export default function Carrito({ isOpen, onClose, items, onAdd, onRemove, onDelete, onClear, onCheckout }) {
  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const iva = subtotal * IVA;
  const total = subtotal + iva;

  if (!isOpen) return null;

  return (
    <>
      <div className="cart-overlay" onClick={onClose} />
      <aside className="cart-panel" role="dialog" aria-label="Carrito de compras">
        <div className="cart-header">
          <h2>
            <ShoppingCart size={22} weight="fill" />
            Tu <span>Carrito</span>
          </h2>
          <button className="cart-close-btn" onClick={onClose} aria-label="Cerrar carrito">
            <X size={20} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="cart-empty">
            <ShoppingCart size={72} className="cart-empty-icon" weight="thin" />
            <p>Tu carrito está vacío</p>
            <small>¡Agrega algo delicioso del menú!</small>
          </div>
        ) : (
          <div className="cart-items">
            {items.map((item) => (
              <div key={item.id} className="cart-item">
                <span className="cart-item-emoji">{item.image}</span>
                <div className="cart-item-info">
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-price">Q {item.price.toFixed(2)}</div>
                  <div className="cart-item-subtotal">
                    Subtotal: Q {(item.price * item.qty).toFixed(2)}
                  </div>
                </div>
                <div className="cart-item-controls">
                  <button className="qty-btn" onClick={() => onRemove(item.id)} aria-label="Disminuir">
                    <Minus size={12} weight="bold" />
                  </button>
                  <span className="qty-display">{item.qty}</span>
                  <button className="qty-btn" onClick={() => onAdd(item)} aria-label="Aumentar">
                    <Plus size={12} weight="bold" />
                  </button>
                  <button className="cart-remove-btn" onClick={() => onDelete(item.id)} aria-label="Eliminar">
                    <Trash size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {items.length > 0 && (
          <div className="cart-footer">
            <div className="cart-totals">
              <div className="cart-total-row">
                <span>Subtotal</span>
                <span>Q {subtotal.toFixed(2)}</span>
              </div>
              <div className="cart-total-row">
                <span>IVA (12%)</span>
                <span>Q {iva.toFixed(2)}</span>
              </div>
              <div className="cart-total-row total">
                <span>Total</span>
                <span>Q {total.toFixed(2)}</span>
              </div>
            </div>

            <div className="cart-actions">
              <button className="cart-checkout-btn" onClick={onCheckout}>
                <ArrowRight size={18} weight="bold" />
                Ir al Checkout — Q {total.toFixed(2)}
              </button>
              <button className="cart-clear-btn" onClick={onClear}>
                <Trash size={14} />
                Vaciar carrito
              </button>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
