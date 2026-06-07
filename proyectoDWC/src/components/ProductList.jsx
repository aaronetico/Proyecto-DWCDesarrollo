import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import useAsync from '../hooks/useAsync'
import { fetchProductsByVersion } from '../api/backendApi'
import { CATALOG_UPDATED_EVENT } from '../api/cache'
import SearchForm from './SearchForm'

// Lista de piezas filtrables de una version concreta
function ProductList() {
  const { brandId, modelId, yearId, versionId } = useParams()
  const { data: products, loading, error, run } = useAsync()
  const [allProducts, setAllProducts] = useState([])

  function loadProducts() {
    run(() =>
      fetchProductsByVersion(versionId).then((data) => {
        setAllProducts(data)
        return data
      })
    )
  }

  useEffect(() => {
    loadProducts()
  }, [versionId, run])

  useEffect(() => {
    function handleCatalogUpdate() {
      loadProducts()
    }

    window.addEventListener(CATALOG_UPDATED_EVENT, handleCatalogUpdate)
    return () => window.removeEventListener(CATALOG_UPDATED_EVENT, handleCatalogUpdate)
  }, [versionId, run])

  function handleSearch(filters) {
    if (!allProducts) return

    const query = filters.name.trim().toLowerCase()
    const filtered = allProducts.filter((product) =>
      (product.name ?? '').toLowerCase().includes(query)
    )

    run(async () => filtered)
  }

  if (error) return <p>Error al cargar productos</p>
  if (loading || !products) return <p>Cargando productos...</p>

  return (
    <section>
      <Link to="/" className="back-button">
        ← Volver a marcas
      </Link>

      <Link
        to={`/brand/${brandId}/model/${modelId}/year/${yearId}/versions`}
        className="back-button back-button-inline"
      >
        ← Volver a versiones
      </Link>

      <h2>Productos</h2>

      <p className="search-title">Buscar por nombre:</p>
      <SearchForm onSearch={handleSearch} />

      <div className="product-grid">
        {products.length === 0 && <p>No hay resultados</p>}

        {products.map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            className="product-card"
          >
            <img src={product.images?.[0]} alt={product.name} loading="lazy" />
            <h4>{product.name}</h4>
            <p>{Number(product.price ?? 0).toFixed(2)} €</p>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default ProductList
