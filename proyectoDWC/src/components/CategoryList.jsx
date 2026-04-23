import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import useAsync from '../hooks/useAsync'
import { fetchCategories } from '../api/fakeApi'

function CategoryList() { 
  const { brandId } = useParams()
  const { data: categories, loading, run } = useAsync()
//Hace un fetch de las categorias para poder mostrarlas.
  useEffect(() => {
    run(fetchCategories)
  }, [])

    if (loading || !categories) return <p>Cargando categorías...</p>

  return (
    <section>
      <h2>Categorías disponibles</h2>

      <div className="category-grid">
        {categories.map(category => (
          <Link
            key={category.id}
            to={`/brand/${brandId}/category/${category.id}`}
            className="category-card"
          >
            {category.name}
          </Link>
        ))}
      </div>
    </section>
  )
}

export default CategoryList
