import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import useAsync from '../hooks/useAsync'
import { fetchProductById } from '../api/backendApi'
import { CATALOG_UPDATED_EVENT } from '../api/cache'
import ProductModel from '../models/ProductModel'

// Ficha detallada de una pieza con precio, stock y descripción
function ProductDetail({ addToCart }) {
  const { productId } = useParams()
  const navigate = useNavigate()
  const { data: product, loading, run } = useAsync()

  function loadProduct() {
    run(() => fetchProductById(productId))
  }

  useEffect(() => {
    loadProduct()
  }, [productId, run])

  useEffect(() => {
    function handleCatalogUpdate() {
      loadProduct()
    }

    window.addEventListener(CATALOG_UPDATED_EVENT, handleCatalogUpdate)
    return () => window.removeEventListener(CATALOG_UPDATED_EVENT, handleCatalogUpdate)
  }, [productId, run])

  if (loading) return <p>Cargando producto...</p>
  if (!product) return <p>Producto no encontrado</p>

  const productInstance = new ProductModel(product)
  const hasLowStock = product.stock > 0 && product.stock <= 5
  const imageUrl = product.images?.[0]

  return (
    <section className="product-detail-page">
      <button onClick={() => navigate(-1)} className="back-button">
        ← Volver
      </button>

      <div className="product-detail-hero">
        <div className="product-detail-media">
          <img src={"/assets/parts/colector.jpg"} alt={product.name} className="product-detail-image" />
          <div className="product-detail-badges">
            <span className="product-badge">Pieza verificada</span>
            <span className="product-badge">Motor JDM / OEM</span>
          </div>
        </div>

        <div className="product-detail-main">
          <p className="product-detail-kicker">Recambio de motor especializado</p>
          <h2>{"Inyector X-56 (solenoide) adaptable"}</h2>

          <div className="product-detail-price-box">
            <div>
              <span className="product-price-label">Precio</span>
              <p className="product-price-value">{product.price.toFixed(2)} €</p>
            </div>
            <div>
              <span className="product-price-label">IVA incluido</span>
              <p className="product-price-vat">{productInstance.getPriceWithVAT()} €</p>
            </div>
          </div>

          <div className="product-detail-availability">
            {product.stock > 0 ? (
              <>
                <p className="in-stock">✔ En stock · {product.stock} unidades</p>
                {hasLowStock && <p className="low-stock">Últimas unidades disponibles</p>}
              </>
            ) : (
              <p className="out-stock">Sin stock temporalmente</p>
            )}
          </div>

          <button
            className="add-to-cart-btn product-detail-buy-btn"
            onClick={() => addToCart(product)}
            disabled={product.stock <= 0}
          >
            🛒 Añadir al carrito
          </button>

          <div className="product-detail-trust">
            <p>Envío 24/48h peninsular</p>
            <p>Garantía técnica 24 meses</p>
            <p>Asesoramiento por especialistas en motores japoneses</p>
          </div>
        </div>
      </div>

      <div className="product-detail-bottom">
        <article className="product-detail-description">
          <h3>Descripción del producto</h3>
          <p>{"Es el inyector más extendido en motores de gasolina y también en muchos diésel desde que llegó la electrónica. Utiliza una electroválvula de solenoide, que es básicamente una bobina que al ser energizada crea un campo magnético que levanta una aguja o balín que abre el paso de combustible. Cuando la corriente cesa, un resorte cierra de nuevo el inyector. La ECU del motor controla estos pulsos eléctricos para abrir el inyector en el momento exacto y durante milisegundos precisos. Los inyectores solenoide permiten un control mucho más exacto de la cantidad de combustible que se inyecta, comparado con los mecánicos."}</p>
        </article>

        <aside className="product-detail-info-grid">
          <div className="panel-section">
            <h3>Compatibilidad</h3>
            <p>Seleccionada según marca, modelo, año y versión del catálogo Falcar.</p>
            <p>Consulta compatibilidad exacta antes del montaje en motor.</p>
          </div>
          <div className="panel-section">
            <h3>Envío y devoluciones</h3>
            <p>Preparación en 24 h laborables</p>
            <p>Portes gratis en pedidos superiores a 99 €</p>
            <p>Devolución hasta 30 días en piezas sin montar</p>
          </div>
          <div className="panel-section">
            <h3>Soporte Falcar</h3>
            <p>Equipo especializado en Mazda, Honda, Nissan y resto de marcas JDM</p>
            <p>Atención técnica previa al pedido</p>
          </div>
        </aside>
      </div>
    </section>
  )
}

export default ProductDetail
