import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import useAsync from '../hooks/useAsync'
import { fetchYearsByModel } from '../api/backendApi'
import { CATALOG_UPDATED_EVENT } from '../api/cache'

function YearList() {
  const { brandId, modelId } = useParams()
  const { data: years, loading, error, run } = useAsync()

  useEffect(() => {
    run(() => fetchYearsByModel(modelId))
  }, [modelId, run])

  useEffect(() => {
    function handleCatalogUpdate() {
      run(() => fetchYearsByModel(modelId))
    }

    window.addEventListener(CATALOG_UPDATED_EVENT, handleCatalogUpdate)
    return () => window.removeEventListener(CATALOG_UPDATED_EVENT, handleCatalogUpdate)
  }, [modelId, run])

  if (loading || !years) return <p>Cargando años...</p>
  if (error) return <p>Error al cargar años</p>

  return (
    <section>
      <Link to={`/brand/${brandId}`} className="back-button">
        ← Volver a modelos
      </Link>

      <h2>Selecciona un año</h2>

      <div className="category-grid">
        {years.length === 0 && <p>No hay años disponibles</p>}
        {years.map(year => (
          <Link
            key={year.id}
            to={`/brand/${brandId}/model/${modelId}/year/${year.id}/versions`}
            className="category-card"
          >
            {year.value}
          </Link>
        ))}
      </div>
    </section>
  )
}

export default YearList
