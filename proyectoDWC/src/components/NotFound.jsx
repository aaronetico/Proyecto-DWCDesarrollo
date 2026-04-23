import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <section>
      <h2>Error 404</h2>
      <p>La página que buscas no existe.</p>
      <Link to="/">Volver al inicio</Link>
    </section>
  )
}

export default NotFound
