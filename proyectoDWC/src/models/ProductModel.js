// Modelo de dominio del producto
// Encapsula lógica de negocio
export default class ProductModel {
  constructor(product) {
    this.name = product.name
    this.price = product.price
    this.stock = product.stock
  }

  getPriceWithVAT() {
    return (this.price * 1.21).toFixed(2)
  }

  hasStock() {
    return this.stock > 0
  }
}
