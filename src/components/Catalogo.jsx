import { useState, useMemo } from "react";
import {
  MagnifyingGlass,
  Fire,
  Sparkle,
  Tag,
  SortAscending,
  SortDescending,
  ShoppingCart,
  CheckCircle,
  Package,
} from "@phosphor-icons/react";
import { products, categories } from "../data/products";

function PizzaCard({ product, onAdd }) {
  return (
    <div className="product-card pizza-card">
      <div className="card-image-wrap">
        <span style={{ userSelect: "none" }}>{product.image}</span>

        {/* Monster overlay */}
        <div className="pizza-overlay" aria-hidden="true">
          <div className="flames">
            <span className="flame">🔥</span>
            <span className="flame">🔥</span>
            <span className="flame">🔥</span>
            <span className="flame">🔥</span>
            <span className="flame">🔥</span>
          </div>
          <div className="monster-text">¡DESATA AL MONSTRUO!</div>
        </div>

        {/* Badges */}
        <div className="card-badges">
          <span className="badge badge-monster">
            <Fire size={10} weight="fill" />
            MONSTRUOSA
          </span>
          {product.tags.includes("popular") && (
            <span className="badge badge-popular">
              <Sparkle size={10} weight="fill" />
              Popular
            </span>
          )}
          {product.tags.includes("nuevo") && (
            <span className="badge badge-nuevo">Nuevo</span>
          )}
        </div>
      </div>

      {/* Size bar */}
      <div className="pizza-size-bar">
        <div className="size-label">
          <span>Tamaño</span>
          <strong>GIGANTE</strong>
        </div>
        <div className="size-bar" />
      </div>

      <div className="card-body">
        <div className="card-category">
          <Fire size={12} weight="fill" />
          {product.category}
        </div>
        <h3 className="card-name">{product.name}</h3>
        <p className="card-desc">{product.description}</p>

        <div className="card-footer">
          <div>
            <div className="card-price">
              Q {product.price.toFixed(2)}
              <span> / unidad</span>
            </div>
            <div className="card-stock">
              <CheckCircle size={12} weight="fill" />
              {product.stock} disponibles
            </div>
          </div>
        </div>

        <button
          className="card-add-btn pizza-btn"
          onClick={() => onAdd(product)}
          disabled={product.stock === 0}
        >
          <ShoppingCart size={16} weight="fill" />
          {product.stock === 0 ? "Sin stock" : "Agregar al carrito"}
        </button>
      </div>
    </div>
  );
}

function ProductCard({ product, onAdd }) {
  if (product.category === "Pizzas") {
    return <PizzaCard product={product} onAdd={onAdd} />;
  }

  return (
    <div className="product-card">
      <div className="card-image-wrap">
        <span style={{ userSelect: "none" }}>{product.image}</span>
        <div className="card-badges">
          {product.tags.includes("popular") && (
            <span className="badge badge-popular">
              <Sparkle size={10} weight="fill" />
              Popular
            </span>
          )}
          {product.tags.includes("nuevo") && (
            <span className="badge badge-nuevo">Nuevo</span>
          )}
          {product.tags.includes("oferta") && (
            <span className="badge badge-oferta">Oferta</span>
          )}
        </div>
      </div>

      <div className="card-body">
        <div className="card-category">
          <Package size={12} weight="fill" />
          {product.category}
        </div>
        <h3 className="card-name">{product.name}</h3>
        <p className="card-desc">{product.description}</p>

        <div className="card-footer">
          <div>
            <div className="card-price">
              Q {product.price.toFixed(2)}
              <span> / unidad</span>
            </div>
            <div className="card-stock">
              <CheckCircle size={12} weight="fill" />
              {product.stock} disponibles
            </div>
          </div>
        </div>

        <button
          className="card-add-btn"
          onClick={() => onAdd(product)}
          disabled={product.stock === 0}
        >
          <ShoppingCart size={16} weight="fill" />
          {product.stock === 0 ? "Sin stock" : "Agregar al carrito"}
        </button>
      </div>
    </div>
  );
}

export default function Catalogo({ onAddToCart }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Todos");
  const [tag, setTag] = useState("");
  const [sort, setSort] = useState("default");

  const filtered = useMemo(() => {
    let list = [...products];

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    if (category !== "Todos") {
      list = list.filter((p) => p.category === category);
    }

    if (tag) {
      list = list.filter((p) => p.tags.includes(tag));
    }

    if (sort === "asc") list.sort((a, b) => a.price - b.price);
    if (sort === "desc") list.sort((a, b) => b.price - a.price);

    return list;
  }, [search, category, tag, sort]);

  return (
    <section id="catalogo" className="catalogo">
      <div className="container">
        <h2 className="section-title">Nuestro Menú</h2>
        <div className="section-divider" />
        <p className="section-subtitle">
          Más de 30 opciones artesanales preparadas con ingredientes seleccionados
        </p>

        {/* Filters */}
        <div className="catalogo-filters">
          <div className="filter-row">
            <div className="filter-search">
              <MagnifyingGlass
                size={18}
                className="filter-search-icon"
                weight="bold"
              />
              <input
                type="text"
                placeholder="Buscar en el menú..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <select
              className="filter-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <select
              className="filter-select"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="default">Ordenar</option>
              <option value="asc">Precio: menor a mayor</option>
              <option value="desc">Precio: mayor a menor</option>
            </select>
          </div>

          <div className="filter-tags">
            <button
              className={`tag-btn ${tag === "" ? "active-popular" : ""}`}
              onClick={() => setTag("")}
            >
              Todos
            </button>
            <button
              className={`tag-btn ${tag === "popular" ? "active-popular" : ""}`}
              onClick={() => setTag(tag === "popular" ? "" : "popular")}
            >
              <Fire size={13} weight="fill" />
              Populares
            </button>
            <button
              className={`tag-btn ${tag === "nuevo" ? "active-nuevo" : ""}`}
              onClick={() => setTag(tag === "nuevo" ? "" : "nuevo")}
            >
              <Sparkle size={13} weight="fill" />
              Nuevos
            </button>
            <button
              className={`tag-btn ${tag === "oferta" ? "active-oferta" : ""}`}
              onClick={() => setTag(tag === "oferta" ? "" : "oferta")}
            >
              <Tag size={13} weight="fill" />
              Ofertas
            </button>
          </div>
        </div>

        <p className="catalogo-results">
          {filtered.length === 0
            ? "No se encontraron productos"
            : `${filtered.length} producto${filtered.length !== 1 ? "s" : ""} encontrado${filtered.length !== 1 ? "s" : ""}`}
        </p>

        {filtered.length === 0 ? (
          <div className="empty-state">
            <MagnifyingGlass size={64} />
            <h3>Sin resultados</h3>
            <p>Intenta con otra búsqueda o categoría.</p>
          </div>
        ) : (
          <div className="catalogo-grid">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} onAdd={onAddToCart} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
