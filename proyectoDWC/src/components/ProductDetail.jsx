import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import useAsync from '../hooks/useAsync'
import { fetchProductById } from '../api/fakeApi'
import ProductModel from '../models/ProductModel'

function ProductDetail({ addToCart }) {
  const { productId } = useParams()
  const navigate = useNavigate() // Hook para poder navegar
  const { data: product, loading, run } = useAsync()

  useEffect(() => {// Ejecutamos la llamada async para traer el producto
    run(() => fetchProductById(productId))
  }, [productId])

  if (loading) return <p>Cargando producto...</p>
  if (!product) return <p>Producto no encontrado</p>

  const productInstance = new ProductModel(product)
// Detectamos si el stock es bajo y ayor que 0 y menor o igual que 5
  const hasLowStock = product.stock > 0 && product.stock <= 5

  return (
    <section className="product-detail-layout">
      <div className="product-main">
        <button onClick={() => navigate(-1)} className="back-button">
          ← Volver
        </button>

        <h2>{product.name}</h2>

        <img src={product.images[0]} alt={product.name} />

        <p><strong>Precio:</strong> {product.price} €</p>
        <p>
          <strong>Precio con IVA:</strong>{' '}
          {productInstance.getPriceWithVAT()} €
        </p>

        <button
          className="add-to-cart-btn"
          onClick={() => addToCart(product)}
        >
          🛒 Añadir al carrito
        </button>

        <p>{product.description}</p>
      </div>

      <aside className="product-side-panel">
        <div className="panel-section">
          <h3>Disponibilidad</h3>
          {product.stock > 0 ? (
            <>
              <p className="in-stock">✔ En stock</p>
              <p>{product.stock} unidades disponibles</p>
              {hasLowStock && (
                <p className="low-stock">Últimas unidades</p>
              )}
            </>
          ) : (
            <p className="out-stock">Sin stock</p>
          )}
        </div>

        <div className="panel-section">
          <h3>Envío</h3>
          <p>Envío 24/48h</p>
          <p>Gratis en pedidos +99 €</p>
          <p>Devolución hasta 30 días</p>
        </div>

        <div className="panel-section">
          <h3>Garantía</h3>
          <p>Garantía de 2 años</p>
          <p>Producto revisado y verificado</p>
        </div>

        <div className="panel-section">
          <h3>Confianza Falcar</h3>
          <p>Pago 100% seguro</p>
          <p>Soporte técnico especializado</p>
          <p>Proyecto académico</p>
        </div>
      </aside>
    </section>
  )
}

export default ProductDetail
