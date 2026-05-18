import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import useAsync from '../hooks/useAsync'
import { fetchProductsByVersion } from '../api/backendApi'
import SearchForm from './SearchForm'

function ProductList() {
  const { brandId, modelId, yearId, versionId } = useParams()
  const { data: products, loading, error, run } = useAsync()
  const [allProducts, setAllProducts] = useState([]) // copia completa

  useEffect(() => {
    run(() =>
      fetchProductsByVersion(versionId).then(data => {
        setAllProducts(data) // guardamos la lista completa
        return data
      })
    )
  }, [versionId, run])

  // Filtrado por nombre (coincidencia en cualquier parte)
  function handleSearch(filters) {
    if (!allProducts) return

    const query = filters.name.trim().toLowerCase()

    // Filtramos todos los productos cuyo nombre contenga el texto escrito en cualquier lugar
    const filtered = allProducts.filter(product =>
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

        {products.map(product => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            className="product-card"
          >
            <h4>{product.name}</h4>
            <p>{product.price.toFixed(2)} €</p>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default ProductList
