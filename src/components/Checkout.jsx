import { useState } from "react";
import {
  X,
  CreditCard,
  Bank,
  Truck,
  CheckCircle,
  User,
  Envelope,
  MapPin,
  Receipt,
  ShoppingBag,
  WarningCircle,
} from "@phosphor-icons/react";

const IVA = 0.12;

function genOrderNum() {
  return `LP-${Date.now().toString(36).toUpperCase().slice(-6)}`;
}

const PAYMENT_OPTIONS = [
  { value: "tarjeta",    label: "Tarjeta de crédito / débito", icon: <CreditCard size={18} /> },
  { value: "transferencia", label: "Transferencia bancaria",   icon: <Bank size={18} /> },
  { value: "contra",     label: "Contra entrega",              icon: <Truck size={18} /> },
];

function validate(form) {
  const errors = {};
  if (!form.nombre.trim()) errors.nombre = "El nombre es requerido";
  if (!form.email.trim()) {
    errors.email = "El email es requerido";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Email no válido";
  }
  if (!form.direccion.trim()) errors.direccion = "La dirección es requerida";
  if (!form.pago) errors.pago = "Selecciona un método de pago";
  return errors;
}

export default function Checkout({ isOpen, onClose, items, onSuccess }) {
  const [form, setForm] = useState({ nombre: "", email: "", direccion: "", pago: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [orderNum, setOrderNum] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const iva = subtotal * IVA;
  const total = subtotal + iva;

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setErrors((err) => ({ ...err, [e.target.name]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const num = genOrderNum();
      setOrderNum(num);
      setSubmitted(true);
      setLoading(false);
    }, 1200);
  };

  const handleClose = () => {
    if (submitted) onSuccess();
    else onClose();
    setForm({ nombre: "", email: "", direccion: "", pago: "" });
    setErrors({});
    setSubmitted(false);
    setOrderNum("");
  };

  return (
    <div className="checkout-overlay" onClick={(e) => e.target === e.currentTarget && handleClose()}>
      <div className="checkout-modal" role="dialog" aria-label="Checkout">
        <div className="checkout-header">
          <h2>
            <Receipt size={22} weight="fill" />
            {submitted ? "¡Pedido Confirmado!" : "Finalizar Pedido"}
          </h2>
          <button className="cart-close-btn" onClick={handleClose} aria-label="Cerrar">
            <X size={20} />
          </button>
        </div>

        {submitted ? (
          <div className="order-success">
            <div className="success-icon">
              <CheckCircle size={40} weight="fill" />
            </div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem" }}>
              ¡Gracias, {form.nombre.split(" ")[0]}!
            </h3>
            <p style={{ color: "var(--gris)", fontWeight: 600 }}>
              Tu pedido ha sido recibido con éxito.
            </p>
            <div className="success-order-num">{orderNum}</div>
            <p style={{ color: "var(--gris)", fontSize: "0.9rem", fontWeight: 600 }}>
              Te enviaremos una confirmación a <strong>{form.email}</strong>
            </p>

            <div className="success-items">
              <h4>Resumen del pedido</h4>
              {items.map((i) => (
                <div key={i.id} className="summary-item">
                  <span className="summary-item-name">
                    {i.qty}x {i.name}
                  </span>
                  <span className="summary-item-price">
                    Q {(i.price * i.qty).toFixed(2)}
                  </span>
                </div>
              ))}
              <div
                style={{
                  borderTop: "1px solid var(--gris-light)",
                  marginTop: 8,
                  paddingTop: 8,
                  display: "flex",
                  justifyContent: "space-between",
                  fontWeight: 800,
                  fontSize: "1.1rem",
                }}
              >
                <span>Total pagado</span>
                <span style={{ color: "var(--rojo)" }}>Q {total.toFixed(2)}</span>
              </div>
            </div>

            <button className="btn-primary" onClick={handleClose} style={{ marginTop: 8 }}>
              <ShoppingBag size={18} weight="fill" />
              Seguir comprando
            </button>
          </div>
        ) : (
          <form className="checkout-body" onSubmit={handleSubmit} noValidate>
            {/* Datos personales */}
            <div className="checkout-section">
              <h3>
                <User size={16} weight="fill" />
                Datos de contacto
              </h3>

              <div className="form-group">
                <label className="form-label" htmlFor="nombre">Nombre completo</label>
                <input
                  id="nombre"
                  name="nombre"
                  className={`form-input ${errors.nombre ? "error" : ""}`}
                  placeholder="Ej. María García López"
                  value={form.nombre}
                  onChange={handleChange}
                  autoComplete="name"
                />
                {errors.nombre && (
                  <div className="form-error">
                    <WarningCircle size={14} weight="fill" />
                    {errors.nombre}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="email">Correo electrónico</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className={`form-input ${errors.email ? "error" : ""}`}
                  placeholder="tu@correo.com"
                  value={form.email}
                  onChange={handleChange}
                  autoComplete="email"
                />
                {errors.email && (
                  <div className="form-error">
                    <WarningCircle size={14} weight="fill" />
                    {errors.email}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="direccion">
                  <MapPin size={12} weight="fill" style={{ verticalAlign: "middle" }} />
                  {" "}Dirección de entrega
                </label>
                <textarea
                  id="direccion"
                  name="direccion"
                  className={`form-textarea ${errors.direccion ? "error" : ""}`}
                  placeholder="Zona, colonia, calle, número de casa..."
                  value={form.direccion}
                  onChange={handleChange}
                  rows={3}
                />
                {errors.direccion && (
                  <div className="form-error">
                    <WarningCircle size={14} weight="fill" />
                    {errors.direccion}
                  </div>
                )}
              </div>
            </div>

            {/* Método de pago */}
            <div className="checkout-section">
              <h3>
                <CreditCard size={16} weight="fill" />
                Método de pago
              </h3>
              <div className="payment-options">
                {PAYMENT_OPTIONS.map((opt) => (
                  <label
                    key={opt.value}
                    className={`payment-option ${form.pago === opt.value ? "selected" : ""}`}
                  >
                    <input
                      type="radio"
                      name="pago"
                      value={opt.value}
                      checked={form.pago === opt.value}
                      onChange={handleChange}
                    />
                    {opt.icon}
                    {opt.label}
                  </label>
                ))}
              </div>
              {errors.pago && (
                <div className="form-error" style={{ marginTop: 8 }}>
                  <WarningCircle size={14} weight="fill" />
                  {errors.pago}
                </div>
              )}
            </div>

            {/* Resumen */}
            <div className="checkout-section">
              <h3>
                <ShoppingBag size={16} weight="fill" />
                Resumen del pedido
              </h3>
              <div className="order-summary-items">
                {items.map((i) => (
                  <div key={i.id} className="summary-item">
                    <span className="summary-item-name">
                      {i.qty}× {i.name}
                    </span>
                    <span className="summary-item-price">
                      Q {(i.price * i.qty).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="checkout-total">
                <div className="checkout-total-row">
                  <span>Subtotal</span>
                  <span>Q {subtotal.toFixed(2)}</span>
                </div>
                <div className="checkout-total-row">
                  <span>IVA 12%</span>
                  <span>Q {iva.toFixed(2)}</span>
                </div>
                <div className="checkout-total-row grand">
                  <span>Total</span>
                  <span>Q {total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="checkout-submit-btn"
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="spinner" style={{ width: 20, height: 20, borderWidth: 3 }} />
                  Procesando...
                </>
              ) : (
                <>
                  <CheckCircle size={18} weight="fill" />
                  Confirmar Pedido — Q {total.toFixed(2)}
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
