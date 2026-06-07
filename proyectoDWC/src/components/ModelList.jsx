import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import useAsync from '../hooks/useAsync'
import { fetchModelsByBrand, fetchYearsByModel } from '../api/backendApi'
import { CATALOG_UPDATED_EVENT } from '../api/cache'

function ModelList() {
  const { brandId } = useParams()
  const { data: models, loading, error, run } = useAsync()

  useEffect(() => {
    run(() => fetchModelsByBrand(brandId))
  }, [brandId, run])

  useEffect(() => {
    function handleCatalogUpdate() {
      run(() => fetchModelsByBrand(brandId))
    }

    window.addEventListener(CATALOG_UPDATED_EVENT, handleCatalogUpdate)
    return () => window.removeEventListener(CATALOG_UPDATED_EVENT, handleCatalogUpdate)
  }, [brandId, run])

  if (loading || !models) return <p>Cargando modelos...</p>
  if (error) return <p>Error al cargar modelos</p>

  return (
    <section>
      <Link to="/" className="back-button">
        ← Volver a marcas
      </Link>

      <h2>Selecciona un modelo</h2>

      <div className="category-grid">
        {models.length === 0 && <p>No hay modelos disponibles</p>}
        {models.map(model => (
          <Link
            key={model.id}
            to={`/brand/${brandId}/model/${model.id}/years`}
            className="category-card"
            onMouseEnter={() => {
              fetchYearsByModel(model.id).catch(() => {})
            }}
          >
            {model.name}
          </Link>
        ))}
      </div>
    </section>
  )
}

export default ModelList
