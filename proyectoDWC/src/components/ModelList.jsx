import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import useAsync from '../hooks/useAsync'
import { fetchModelsByBrand, fetchYearsByModel } from '../api/backendApi'

function ModelList() {
  const { brandId } = useParams()
  const { data: models, loading, error, run } = useAsync()

  useEffect(() => {
    run(() => fetchModelsByBrand(brandId))
  }, [brandId, run])

  if (error) return <p>Error al cargar modelos</p>
  if (loading || !models) return <p>Cargando modelos...</p>

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
