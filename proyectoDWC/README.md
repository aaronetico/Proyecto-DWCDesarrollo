# Falcar – Tienda de Piezas Mecánicas (React)

Aplicación web desarrollada en **React** que simula una tienda online de piezas mecánicas para vehículos japoneses.  
El proyecto usa una **fake API en memoria**, sistema de **cache**, autenticación simulada y un flujo completo de compra con carrito y checkout.

---

##  Características principales

✅ Login simulado  
✅ Navegación por marcas → categorías → productos  
✅ Buscador de productos por nombre  
✅ Detalle de producto con stock y precio con IVA  
✅ Carrito de compra persistente en sesión  
✅ Checkout con validación de tarjeta  
✅ Fake API con latencia simulada  
✅ Sistema de cache para evitar llamadas repetidas  

---

##  Arquitectura del Proyecto

```
src/
 ├ api/
 │   ├ data.js
 │   ├ cache.js
 │   └ fakeApi.js
 │
 ├ components/
 │   ├ BrandGrid.jsx
 │   ├ CategoryList.jsx
 │   ├ ProductList.jsx
 │   ├ ProductDetail.jsx
 │   ├ Cart.jsx
 │   ├ Checkout.jsx
 │   ├ Header.jsx
 │   ├ Footer.jsx
 │   ├ Sidebar.jsx
 │   ├ Login.jsx
 │   └ SearchForm.jsx
 │
 ├ hooks/
 │   └ useAsync.js
 │
 ├ models/
 │   └ ProductModel.js
```

---

##  Funcionamiento General

###  Autenticación

- Se simula con `sessionStorage`
- Al hacer login se guarda:

```js
sessionStorage.setItem('fakeAuth', 'true')
```

- Logout limpia sesión y carrito.

---

###  Fake API

Archivo: `src/api/fakeApi.js`

Simula llamadas a servidor con:

- Delay artificial
- Cache en memoria
- Filtrado dinámico

Funciones principales:

| Función | Descripción |
|---|---|
| fetchBrands | Obtiene marcas |
| fetchCategories | Obtiene categorías |
| fetchProducts | Filtra productos |
| fetchProductById | Obtiene producto por ID |

---

###  Sistema de Cache

Archivo: `cache.js`

Evita repetir llamadas innecesarias:

```js
export const cache = {
 brands: null,
 categories: null,
 products: new Map(),
 productById: new Map()
}
```

---

##  Flujo de Usuario

### 1️ Login
El usuario entra mediante formulario simple.

---

### 2️⃣ Selección de Marca
Pantalla: BrandGrid  
Muestra todas las marcas disponibles.

---

### 3️⃣ Selección de Categoría
Pantalla: CategoryList  
Muestra categorías filtradas por marca.

---

### 4️⃣ Listado de Productos
Pantalla: ProductList  

Funciones:
- Mostrar productos
- Buscar por nombre
- Navegar a detalle

---

### 5️⃣ Detalle de Producto
Pantalla: ProductDetail  

Incluye:
- Imagen
- Precio
- Precio con IVA (ProductModel)
- Stock disponible
- Aviso de bajo stock
- Botón añadir al carrito

---

### 6️⃣ Carrito
Pantalla: Cart  

Permite:
- Ver productos añadidos
- Eliminar productos
- Ver total
- Ir a checkout

---

### 7️⃣ Checkout
Pantalla: Checkout  

Incluye formulario con validación:
- Dirección
- Código postal
- Tarjeta bancaria

Validación tarjeta:

```
1234 1234 1234 1234
```

---

##  Modelo de Producto

Archivo: `ProductModel.js`

Se usa para lógica de negocio como:

- Calcular precio con IVA

Ejemplo:

```js
productInstance.getPriceWithVAT()
```

---

##  Buscador

Componente: SearchForm  

Permite buscar productos por nombre parcial.

Ejemplo:
- "freno"
- "honda"
- "kit"

---

##  Hooks Personalizados

### useAsync

Gestiona:
- Loading
- Error
- Data
- Ejecución async

---

##  Datos Simulados

Incluye:

- 4 marcas principales
- 4 categorías
- +60 productos

---

##  UI Principal

Componentes layout:

- Header → navegación y carrito
- Sidebar → navegación rápida por marcas
- Footer → información corporativa

---

##  Simulaciones Implementadas

✔ Backend simulado  
✔ Latencia simulada  
✔ Cache local  
✔ Autenticación simulada  

---

##  Posibles Mejoras Futuras

- Backend real (Node / Spring / Firebase)
- Persistencia real de pedidos
- Sistema real de autenticación
- Paginación productos
- Filtros avanzados
- Tests unitarios
- Redux / Zustand para estado global
- Gestión real de stock
