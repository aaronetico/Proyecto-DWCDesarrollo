import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import useAsync from '../hooks/useAsync'
import { fetchProducts } from '../api/fakeApi'
import SearchForm from './SearchForm'

function ProductList() {
  const { brandId, categoryId } = useParams()
  const { data: products, loading, run } = useAsync()
  const [allProducts, setAllProducts] = useState([]) // copia completa

  // Carga inicial según la ruta
  useEffect(() => {
    run(() =>
      fetchProducts({
        brandId,
        categoryId
      }).then(data => {
        setAllProducts(data) // guardamos la lista completa
        return data
      })
    )
  }, [brandId, categoryId])

  // Filtrado por nombre (coincidencia en cualquier parte)
  function handleSearch(filters) {
    if (!allProducts) return

    const query = filters.name.trim().toLowerCase()

    // Filtramos todos los productos cuyo nombre contenga el texto escrito en cualquier lugar
    const filtered = allProducts.filter(product =>
      product.name.toLowerCase().includes(query)
    )

    run(async () => filtered)
  }

  if (loading || !products) return <p>Cargando productos...</p>

  return (
    <section>
      <Link to="/" className="back-button">
        ← Volver al inicio
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
            <img src={product.images[0]} alt={product.name} />
            <h4>{product.name}</h4>
            <p>{product.price} €</p>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default ProductList
