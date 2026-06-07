import { createContext, useContext, useMemo, useState } from 'react'

const CheckoutContext = createContext(null)

// Datos por defecto del formulario de envío
const defaultShipping = {
  name: '',
  email: '',
  phone: '',
  address: '',
  block: '',
  floor: '',
  door: '',
  postalCode: '',
  city: '',
  country: 'España',
  billingSameAsShipping: true,
  billingName: '',
  billingAddress: '',
  billingPostalCode: '',
  billingCity: '',
}

const defaultPaymentDetails = {
  cardNumber: '',
  cardName: '',
  cardExpiry: '',
  cardCvv: '',
  paypalEmail: '',
  bankHolder: '',
  bankIban: '',
  bankConcept: '',
}

export function CheckoutProvider({ children }) {
  const [shipping, setShipping] = useState(defaultShipping)
  const [paymentMethod, setPaymentMethod] = useState('')
  const [paymentDetails, setPaymentDetails] = useState(defaultPaymentDetails)

  // Comparte el estado del checkout entre los pasos del formulario
  const value = useMemo(() => ({
    shipping,
    setShipping,
    paymentMethod,
    setPaymentMethod,
    paymentDetails,
    setPaymentDetails,
    resetCheckout: () => {
      setShipping(defaultShipping)
      setPaymentMethod('')
      setPaymentDetails(defaultPaymentDetails)
    },
  }), [shipping, paymentMethod, paymentDetails])

  return (
    <CheckoutContext.Provider value={value}>
      {children}
    </CheckoutContext.Provider>
  )
}

export function useCheckout() {
  const context = useContext(CheckoutContext)
  if (!context) {
    throw new Error('useCheckout debe usarse dentro de CheckoutProvider')
  }
  return context
}
