// Cache simple en memoria
// Evita repetir llamadas innecesarias a la fakeApi
export const cache = {
  brands: null,
  categories: null,
  products: new Map(), 
  productById: new Map()
}
