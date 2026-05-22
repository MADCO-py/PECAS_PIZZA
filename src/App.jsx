import { useState, useCallback, useEffect } from "react";
import "./styles/global.css";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Catalogo from "./components/Catalogo";
import Carrito from "./components/Carrito";
import Checkout from "./components/Checkout";
import Promociones from "./components/Promociones";
import QuienesSomos from "./components/QuienesSomos";
import Contacto from "./components/Contacto";
import Footer from "./components/Footer";
import Toast from "./components/Toast";

const CART_KEY = "lapeca_cart";

function loadCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveCart(items) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
}

let toastIdCounter = 0;

export default function App() {
  const [cart, setCart] = useState(() => loadCart());
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [toasts, setToasts] = useState([]);

  // Persist cart
  useEffect(() => {
    saveCart(cart);
  }, [cart]);

  const addToast = useCallback((message, type = "success", duration = 3000) => {
    const id = ++toastIdCounter;
    setToasts((t) => [...t, { id, message, type, duration }]);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((t) => t.filter((x) => x.id !== id));
  }, []);

  // Cart operations
  const addToCart = useCallback((product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
    addToast(`"${product.name}" agregado al carrito`, "success");
  }, [addToast]);

  const removeOne = useCallback((id) => {
    setCart((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, qty: i.qty - 1 } : i))
        .filter((i) => i.qty > 0)
    );
  }, []);

  const deleteItem = useCallback((id) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
    addToast("Producto eliminado del carrito", "warning");
  }, [addToast]);

  const clearCart = useCallback(() => {
    setCart([]);
    addToast("Carrito vaciado", "warning");
  }, [addToast]);

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  const handleCheckout = () => {
    setCartOpen(false);
    setCheckoutOpen(true);
  };

  const handleOrderSuccess = () => {
    setCheckoutOpen(false);
    clearCart();
    addToast("¡Pedido confirmado! Gracias por tu compra.", "success", 5000);
  };

  const scrollToCatalog = () => {
    document.getElementById("catalogo")?.scrollIntoView({ behavior: "smooth" });
  };

  // Promo add
  const addPromoToCart = useCallback((promo) => {
    const promoProduct = {
      id: `promo-${promo.id}`,
      name: promo.name,
      price: promo.promoPrice,
      image: "🎁",
      category: "Combos",
    };
    setCart((prev) => {
      const existing = prev.find((i) => i.id === promoProduct.id);
      if (existing) {
        return prev.map((i) =>
          i.id === promoProduct.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { ...promoProduct, qty: 1 }];
    });
    addToast(`"${promo.name}" agregado al carrito`, "success");
  }, [addToast]);

  return (
    <>
      <Navbar cartCount={cartCount} onCartOpen={() => setCartOpen(true)} />

      <main>
        <Hero onCatalogClick={scrollToCatalog} />
        <Catalogo onAddToCart={addToCart} />
        <Promociones onAddPromo={addPromoToCart} />
        <QuienesSomos />
        <Contacto />
      </main>

      <Footer />

      <Carrito
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        onAdd={addToCart}
        onRemove={removeOne}
        onDelete={deleteItem}
        onClear={clearCart}
        onCheckout={handleCheckout}
      />

      <Checkout
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        items={cart}
        onSuccess={handleOrderSuccess}
      />

      <Toast toasts={toasts} removeToast={removeToast} />
    </>
  );
}
