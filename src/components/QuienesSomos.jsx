import { Heart, Fire, Leaf, Clock, Trophy, Star } from "@phosphor-icons/react";

const values = [
  {
    icon: <Heart size={22} weight="fill" />,
    title: "Pasión Auténtica",
    desc: "Cada pizza es preparada con amor y dedicación, siguiendo recetas que honran la tradición italiana.",
  },
  {
    icon: <Leaf size={22} weight="fill" />,
    title: "Ingredientes Frescos",
    desc: "Seleccionamos los mejores ingredientes locales e importados para garantizar calidad en cada mordida.",
  },
  {
    icon: <Fire size={22} weight="fill" />,
    title: "Horno de Leña",
    desc: "Nuestro horno artesanal alcanza las temperaturas perfectas para lograr una masa crujiente y un sabor inigualable.",
  },
  {
    icon: <Clock size={22} weight="fill" />,
    title: "Servicio Rápido",
    desc: "Tu pedido listo en el menor tiempo posible, sin sacrificar la calidad que nos caracteriza.",
  },
];

const stats = [
  { value: "10+", label: "Años de tradición" },
  { value: "15K+", label: "Clientes felices" },
  { value: "33+", label: "Platillos en menú" },
  { value: "2", label: "Sucursales" },
];

export default function QuienesSomos() {
  return (
    <section id="quienes-somos" className="quienes-somos">
      <div className="container">
        <div className="qs-grid">
          {/* Text column */}
          <div className="qs-text-col">
            <h2>Quiénes Somos</h2>
            <p className="qs-tagline">
              Más que una pizzería — somos una experiencia
            </p>
            <div className="section-divider" style={{ margin: "0 0 24px 0" }} />

            <p>
              <strong>La Peca en la Pizza</strong> nació hace más de una década con un sueño
              sencillo: traer el auténtico sabor de la pizza italiana al corazón de Guatemala.
              Lo que comenzó como un pequeño local familiar, se convirtió en uno de los
              referentes de la gastronomía italiana en el país.
            </p>
            <p>
              Nuestra filosofía es simple: ingredientes frescos, masa artesanal, horno de
              leña y una atención que hace sentir a cada cliente como en casa. Desde nuestras
              legendarias pizzas monstruosas hasta nuestras pastas de la abuela, cada platillo
              lleva el alma de quienes lo preparan.
            </p>
            <p>
              Dos sucursales, un solo corazón. Bienvenido a La Peca.
            </p>

            <div className="qs-values">
              {values.map((v, i) => (
                <div key={i} className="qs-value">
                  <div className="qs-value-icon">{v.icon}</div>
                  <div>
                    <strong>{v.title}</strong>
                    <span>{v.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual column */}
          <div className="qs-visual">
            {stats.map((s, i) => (
              <div key={i} className="qs-stat-card">
                {i === 0 && <Trophy size={28} style={{ color: "var(--dorado)", marginBottom: 8 }} />}
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
