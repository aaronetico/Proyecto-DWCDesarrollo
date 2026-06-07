function CheckoutSteps({ currentStep }) {
  const steps = [
    { id: 1, label: 'Carrito' },
    { id: 2, label: 'Envío' },
    { id: 3, label: 'Método' },
    { id: 4, label: 'Pago' },
    { id: 5, label: 'Confirmar' },
  ]

  return (
    <div className="checkout-steps">
      {steps.map((step) => (
        <div
          key={step.id}
          className={`checkout-step ${currentStep === step.id ? 'active' : ''} ${currentStep > step.id ? 'done' : ''}`}
        >
          <span className="checkout-step-number">{step.id}</span>
          <span className="checkout-step-label">{step.label}</span>
        </div>
      ))}
    </div>
  )
}

export default CheckoutSteps
