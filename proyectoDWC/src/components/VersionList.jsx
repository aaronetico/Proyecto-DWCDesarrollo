import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import useAsync from '../hooks/useAsync'
import { fetchVersionsByYear } from '../api/backendApi'
import { CATALOG_UPDATED_EVENT } from '../api/cache'

function VersionList() {
  const { brandId, modelId, yearId } = useParams()
  const { data: versions, loading, error, run } = useAsync()

  useEffect(() => {
    run(() => fetchVersionsByYear(yearId))
  }, [yearId, run])

  useEffect(() => {
    function handleCatalogUpdate() {
      run(() => fetchVersionsByYear(yearId))
    }

    window.addEventListener(CATALOG_UPDATED_EVENT, handleCatalogUpdate)
    return () => window.removeEventListener(CATALOG_UPDATED_EVENT, handleCatalogUpdate)
  }, [yearId, run])

  if (loading || !versions) return <p>Cargando versiones...</p>
  if (error) return <p>Error al cargar versiones</p>

  return (
    <section>
      <Link to={`/brand/${brandId}/model/${modelId}/years`} className="back-button">
        ← Volver a años
      </Link>

      <h2>Selecciona una versión</h2>

      <div className="category-grid">
        {versions.length === 0 && <p>No hay versiones disponibles</p>}
        {versions.map(version => (
          <Link
            key={version.id}
            to={`/brand/${brandId}/model/${modelId}/year/${yearId}/version/${version.id}/products`}
            className="category-card"
          >
            {version.name}
          </Link>
        ))}
      </div>
    </section>
  )
}

export default VersionList
