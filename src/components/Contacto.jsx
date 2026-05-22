import {
  MapPin,
  Phone,
  Clock,
  WhatsappLogo,
  FacebookLogo,
  InstagramLogo,
  Envelope,
} from "@phosphor-icons/react";

const sucursales = [
  {
    num: 1,
    name: "Sucursal Zona 10",
    address: "12 Calle 1-25, Zona 10, Ciudad de Guatemala",
    phone: "+502 2234-5678",
    hours: "Lunes a Domingo: 11:00 AM – 11:00 PM",
    email: "zona10@lapecaenlapizza.gt",
  },
  {
    num: 2,
    name: "Sucursal Mixco",
    address: "Calzada San Juan 15-40, Colonia El Naranjo, Mixco",
    phone: "+502 2345-6789",
    hours: "Lunes a Domingo: 11:00 AM – 10:30 PM",
    email: "mixco@lapecaenlapizza.gt",
  },
];

export default function Contacto() {
  return (
    <section id="contacto" className="contacto">
      <div className="container">
        <h2 className="section-title">Contáctanos</h2>
        <div
          className="section-divider"
          style={{ background: "linear-gradient(90deg, var(--dorado), var(--rojo))" }}
        />
        <p className="section-subtitle">Estamos cerca de ti. ¡Ven a visitarnos!</p>

        <div className="contacto-grid">
          {sucursales.map((s) => (
            <div key={s.num} className="sucursal-card">
              <div className="sucursal-num">{s.num}</div>
              <div className="sucursal-name">{s.name}</div>
              <div className="sucursal-info">
                <div className="sucursal-row">
                  <MapPin size={16} className="sucursal-row-icon" weight="fill" />
                  <span>{s.address}</span>
                </div>
                <div className="sucursal-row">
                  <Phone size={16} className="sucursal-row-icon" weight="fill" />
                  <span>{s.phone}</span>
                </div>
                <div className="sucursal-row">
                  <Clock size={16} className="sucursal-row-icon" weight="fill" />
                  <span>{s.hours}</span>
                </div>
                <div className="sucursal-row">
                  <Envelope size={16} className="sucursal-row-icon" weight="fill" />
                  <span>{s.email}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Social */}
        <div className="social-section">
          <h3 className="social-title">Síguenos y escríbenos</h3>
          <div className="social-buttons">
            <a
              href="https://wa.me/50212345678"
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn social-btn-whatsapp"
            >
              <WhatsappLogo size={22} weight="fill" />
              WhatsApp
            </a>
            <a
              href="https://facebook.com/LaPecaEnLaPizza"
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn social-btn-facebook"
            >
              <FacebookLogo size={22} weight="fill" />
              Facebook
            </a>
            <a
              href="https://instagram.com/LaPecaEnLaPizza"
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn social-btn-instagram"
            >
              <InstagramLogo size={22} weight="fill" />
              Instagram
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
