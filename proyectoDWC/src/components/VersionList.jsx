import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import useAsync from '../hooks/useAsync'
import { fetchVersionsByYear } from '../api/backendApi'

function VersionList() {
  const { brandId, modelId, yearId } = useParams()
  const { data: versions, loading, error, run } = useAsync()

  useEffect(() => {
    run(() => fetchVersionsByYear(yearId))
  }, [yearId, run])

  if (error) return <p>Error al cargar versiones</p>
  if (loading || !versions) return <p>Cargando versiones...</p>

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
