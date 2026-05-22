# 🍕 La Peca en la Pizza

Tienda online simulada de una pizzería italiana guatemalteca.  
Construida con **Vite + React 18**, CSS puro y `@phosphor-icons/react`.

## 🚀 Instalación y desarrollo local

```bash
# 1. Descomprimir el ZIP y entrar a la carpeta
cd la-peca-en-la-pizza

# 2. Instalar dependencias
npm install

# 3. Correr en modo desarrollo
npm run dev
```

Abre `http://localhost:5173/la-peca-en-la-pizza/` en tu navegador.

## 📦 Build para producción

```bash
npm run build
# Los archivos listos quedan en /dist
```

## 🌐 Deploy en GitHub Pages

### Opción A — GitHub Actions (automático)

1. Crea un repositorio en GitHub llamado `la-peca-en-la-pizza`.
2. Sube el proyecto:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/TU_USUARIO/la-peca-en-la-pizza.git
   git push -u origin main
   ```
3. En GitHub → Settings → Pages → Source: **GitHub Actions**.
4. El workflow `.github/workflows/deploy.yml` se encarga del resto.  
   Tu sitio estará en `https://TU_USUARIO.github.io/la-peca-en-la-pizza/`

### Opción B — Deploy manual

```bash
npm run build
# Sube el contenido de /dist a tu hosting
```

## 🏗️ Estructura del proyecto

```
la-peca-en-la-pizza/
├── .github/
│   └── workflows/
│       └── deploy.yml          # CI/CD GitHub Actions
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── Catalogo.jsx        # Filtros + cards con efecto monstruo
│   │   ├── Carrito.jsx         # Panel deslizante
│   │   ├── Checkout.jsx        # Modal con validación
│   │   ├── Promociones.jsx
│   │   ├── QuienesSomos.jsx
│   │   ├── Contacto.jsx
│   │   ├── Footer.jsx
│   │   └── Toast.jsx
│   ├── data/
│   │   └── products.js         # Todo el menú en JSON puro
│   ├── styles/
│   │   └── global.css          # Estilos, variables y animaciones
│   ├── App.jsx                 # Estado global y lógica del carrito
│   └── main.jsx
├── index.html
├── vite.config.js
└── package.json
```

## ✨ Funcionalidades

- Catálogo con 33+ productos filtrable por nombre, categoría y tag
- Carrito persistente con `localStorage`
- Checkout simulado con validación de formulario y número de pedido
- Efecto monstruo en cards de pizza (aura pulsante + llamas + overlay)
- Promociones / combos
- Sección "Quiénes Somos"
- Contacto con 2 sucursales y botones de redes sociales
- Navbar sticky con badge de carrito
- Notificaciones toast
- Diseño responsive

## 🛠️ Stack

| Herramienta | Versión |
|---|---|
| React | 18 |
| Vite | 5 |
| @phosphor-icons/react | 2 |
| CSS puro | — |
