import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

import Header from './components/Header'
import Footer from './components/Footer'
import Sidebar from './components/Sidebar'
import BrandGrid from './components/BrandGrid'
import CategoryList from './components/CategoryList'
import ProductList from './components/ProductList'
import ProductDetail from './components/ProductDetail'
import About from './components/About'
import NotFound from './components/NotFound'
import Login from './components/Login'
import Cart from './components/Cart'
import Checkout from './components/Checkout'
// Componente principal de la aplicación
// Gestiona rutas y estado global del carrito
function App() {
  const location = useLocation()
  const navigate = useNavigate()

  const fakeAuth = sessionStorage.getItem('fakeAuth') === 'true'//Crea una variable booleana para que simule un login.

  const [cart, setCart] = useState([])

  function addToCart(product) {
    setCart(prev => {
      const existing = prev.find(p => p.id === product.id)
      if (existing) {
        return prev.map(p =>
          p.id === product.id
            ? { ...p, quantity: p.quantity + 1 }
            : p
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  function removeFromCart(id) {
    setCart(prev => prev.filter(p => p.id !== id))
  }

  function clearCart() {
    setCart([])
  }

  useEffect(() => { //Esto simula un usuario logueado y otro que no, no te deja entrar a la pagina si no estás logueado con localstorage.
    if (!fakeAuth && location.pathname !== '/login') {
      navigate('/login', { replace: true })
    }
  }, [location.pathname, fakeAuth])

  if (!fakeAuth && location.pathname === '/login') {
    return <Login />
  }

  return ( //Control de rutas
    <div className="app-root">
      <Header cart={cart} clearCart={clearCart} />

      <div className="container">
        <Sidebar />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<BrandGrid />} />
            <Route path="/brand/:brandId" element={<CategoryList />} />
            <Route
              path="/brand/:brandId/category/:categoryId"
              element={<ProductList />}
            />
            <Route
              path="/product/:productId"
              element={<ProductDetail addToCart={addToCart} />}
            />
            <Route
              path="/cart"
              element={
                <Cart
                  cart={cart}
                  removeFromCart={removeFromCart}
                />
              }
            />
            <Route
              path="/checkout"
              element={<Checkout clearCart={clearCart} />}
            />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>

      <Footer />
    </div>
  )
}

export default App
