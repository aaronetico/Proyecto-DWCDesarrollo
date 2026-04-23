import { useNavigate } from 'react-router-dom'

function Cart({ cart, removeFromCart }) {
  const navigate = useNavigate()

  const total = cart.reduce( //Reduce recorre un array, y te devuelve 1 número.
    (sum, item) => sum + item.price * item.quantity, //Para calcular el número final de lo que cuesta todo lo que tienes en el carrito.
    0                                                //Suma lo que ya haya de antes, con la multiplicación del precio por cantidad.
  )                                                   //ej 5 piezas de 20 euros cada una --> 5 x 20.

  return (
    <section>
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Volver atrás
      </button>

      <h2>Carrito</h2>

      {cart.length === 0 ? (
        <>
          <p>Tu carrito está vacío</p>

          <button
            className="secondary-btn"
            onClick={() => navigate('/')}
          >
            Volver a la tienda
          </button>
        </>
      ) : (
        <>
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <h4>{item.name}</h4>
              <p>{item.price} €</p>
              <p>Cantidad: {item.quantity}</p>

              <button onClick={() => removeFromCart(item.id)}>
                Eliminar
              </button>
            </div>
          ))}

          <h3>Total: {total.toFixed(2)} €</h3>

          <button onClick={() => navigate('/checkout')}>
            Pagar
          </button>
        </>
      )}
    </section>
  )
}

export default Cart
