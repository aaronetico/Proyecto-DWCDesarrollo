// src/api/fakeApi.js

import { brands, categories, products } from './data'
import { cache } from './cache'
// Simula latencia de servidor
function simulateDelay(ms = 600) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export async function fetchBrands() {
  if (cache.brands) {
    return cache.brands
  }

  await simulateDelay()
  cache.brands = brands
  return brands
}

export async function fetchCategories() {
  if (cache.categories) {
    return cache.categories
  }

  await simulateDelay()
  cache.categories = categories
  return categories
}
// Devuelve todos los productos
export async function fetchProducts({ brandId, categoryId, name } = {}) {
  // Normalizamos el name para que la clave de cache sea consistente
  const normalizedName = name ? name.trim().toLowerCase() : ''

  const key = JSON.stringify({ brandId, categoryId, name: normalizedName })

  if (cache.products.has(key)) {
    return cache.products.get(key)
  }

  await simulateDelay()

  let filteredProducts = products

  if (brandId) {
    filteredProducts = filteredProducts.filter(
      product => product.brandId === brandId
    )
  }

  if (categoryId) {
    filteredProducts = filteredProducts.filter(
      product => product.categoryId === categoryId
    )
  }

  if (normalizedName) {

    filteredProducts = filteredProducts.filter(product =>
      product.name.toLowerCase().includes(normalizedName)
    )
  }

  cache.products.set(key, filteredProducts)
  return filteredProducts
}


export async function fetchProductById(productId) {
  if (cache.productById.has(productId)) {
    return cache.productById.get(productId)
  }

  await simulateDelay()

  const product = products.find(p => p.id === productId)
  cache.productById.set(productId, product)
  return product
}
