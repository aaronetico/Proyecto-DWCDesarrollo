function About() {
  return (
    <section className="about-page">
      <div className="about-hero">
        <p className="about-kicker">Especialistas en motores japoneses</p>
        <h2>Falcar · Piezas de motor Mazda y marcas JDM</h2>
        <p className="about-lead">
          Falcar nace en Alicante como referente en recambio de motor para vehículos japoneses,
          con especial foco en la gama Mazda: rotativos 13B, Skyactiv-G y plataformas MX-5, CX-5 y Mazda3.
        </p>
      </div>

      <div className="about-grid">
        <article className="about-card">
          <h3>Nuestra especialización</h3>
          <p>
            Trabajamos piezas de bloque, culata, distribución, turbo, embrague y componentes
            internos con criterio técnico real. Cada referencia del catálogo está vinculada a
            marca, modelo, año y versión para facilitar la búsqueda correcta.
          </p>
        </article>

        <article className="about-card">
          <h3>Calidad y trazabilidad</h3>
          <p>
            Seleccionamos fabricantes OEM, equivalentes de competición y marcas reconocidas
            como Carrillo, Exedy, NGK o KYB. Priorizamos referencias con ficha técnica clara,
            stock verificado y compatibilidad documentada.
          </p>
        </article>

        <article className="about-card">
          <h3>Servicio profesional</h3>
          <p>
            Preparadores, talleres y particulares encuentran en Falcar un partner de confianza:
            asesoramiento previo al pedido, envíos rápidos a toda España y soporte postventa
            para dudas de montaje o compatibilidad.
          </p>
        </article>
      </div>

      <div className="about-stats">
        <div><strong>+1200</strong><span>Referencias activas</span></div>
        <div><strong>8</strong><span>Marcas japonesas</span></div>
        <div><strong>24/48h</strong><span>Envío peninsular</span></div>
        <div><strong>2 años</strong><span>Garantía técnica</span></div>
      </div>

      <div className="about-values">
        <h3>Por qué elegir Falcar</h3>
        <ul>
          <li>Catálogo estructurado por árbol de vehículo, no por categorías genéricas.</li>
          <li>Piezas reales con imagen, SKU y descripción técnica en Honda Accord y resto de gamas.</li>
          <li>Checkout con tarjeta, PayPal o transferencia bancaria.</li>
          <li>Equipo con experiencia en motores Mazda rotativos y gasolina de alto rendimiento.</li>
        </ul>
      </div>
    </section>
  )
}

export default About
