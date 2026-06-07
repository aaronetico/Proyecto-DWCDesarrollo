import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import useAsync from '../hooks/useAsync'
import { fetchBrands, fetchModelsByBrand } from '../api/backendApi'
import { CATALOG_UPDATED_EVENT } from '../api/cache'

function BrandGrid() {
  const { data: brands, loading, error, run } = useAsync()

  useEffect(() => {
    run(fetchBrands)
  }, [run])

  useEffect(() => {
    function handleCatalogUpdate() {
      run(fetchBrands)
    }

    window.addEventListener(CATALOG_UPDATED_EVENT, handleCatalogUpdate)
    return () => window.removeEventListener(CATALOG_UPDATED_EVENT, handleCatalogUpdate)
  }, [run])

  if (loading || !brands) return <p>Cargando marcas...</p>
  if (error) return <p>Error al cargar marcas</p>

  return (
    <section>
      <h2>Selecciona una marca</h2>

      <div className="brand-grid">
        {brands.map((brand) => (
          <Link
            key={brand.id}
            to={`/brand/${brand.id}`}
            className="brand-card"
            onMouseEnter={() => {
              fetchModelsByBrand(brand.id).catch(() => {})
            }}
          >
            <h3>{brand.name}</h3>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default BrandGrid
