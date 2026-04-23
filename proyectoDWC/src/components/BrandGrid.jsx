import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import useAsync from '../hooks/useAsync'
import { fetchBrands } from '../api/fakeApi'

function BrandGrid() {
  const { data: brands, loading, error, run } = useAsync()
  // useEffect se ejecuta cuando el componente se monta
  // Aquí lanzamos la petición para obtener marcas
  useEffect(() => {
    run(fetchBrands)
  }, [])
 // Mientras carga o no tenemos marcas todavía → mostramos mensaje
 if (loading || !brands) return <p>Cargando marcas...</p>
  if (error) return <p>Error al cargar marcas</p>

  return (
    <section>
      <h2>Selecciona una marca</h2>

      <div className="brand-grid">
        {brands.map(brand => (
          <Link
            key={brand.id}
            to={`/brand/${brand.id}`}
            className="brand-card"
          >
            <img src={brand.logoUrl} alt={brand.name} />
            <h3>{brand.name}</h3>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default BrandGrid
