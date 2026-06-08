import { useCallback, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { fetchBrands } from '../api/backendApi'
import { CATALOG_UPDATED_EVENT } from '../api/cache'

// Barra lateral con marcas y datos de contacto
function Sidebar() {
  const location = useLocation()
  const [brands, setBrands] = useState([])
  const [loading, setLoading] = useState(true)

  const loadBrands = useCallback(() => {
    setLoading(true)
    fetchBrands()
      .then((data) => setBrands(data))
      .catch((err) => console.error('Error cargando marcas:', err))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    loadBrands()
  }, [loadBrands])

  useEffect(() => {
    function handleCatalogUpdate() {
      loadBrands()
    }

    window.addEventListener(CATALOG_UPDATED_EVENT, handleCatalogUpdate)
    return () => window.removeEventListener(CATALOG_UPDATED_EVENT, handleCatalogUpdate)
  }, [loadBrands])

  return (
    <aside className="sidebar">
      <h3>Marcas</h3>

      {loading && <p>Cargando marcas...</p>}

      <ul className="sidebar-brand-list">
        {brands.map((brand) => {
          const isActive = location.pathname.startsWith(`/brand/${brand.id}`)
          return (
            <li key={brand.id}>
              <Link
                to={`/brand/${brand.id}`}
                className={`sidebar-brand-link ${isActive ? 'active' : ''}`}
              >
                {brand.name}
              </Link>
            </li>
          )
        })}
      </ul>

      <hr />

      <div className="sidebar-contact">
        <h3>Contacto</h3>
        <p><strong>Email:</strong> ventas@falcar.com</p>
        <p><strong>Teléfono:</strong> +34 600 123 456</p>
        <p><strong>Dirección:</strong> Av. de la Industria 42, 03008 Elda Alicante</p>
        <p><strong>Horario:</strong> Lunes a Viernes, 9:00 - 18:00</p>
        <p><strong>Redes:</strong>
          <a href="#" className="contact-link">Instagram</a> |
          <a href="#" className="contact-link">Twitter</a> |
          <a href="#" className="contact-link">Facebook</a>
        </p>
      </div>
    </aside>
  )
}

export default Sidebar
