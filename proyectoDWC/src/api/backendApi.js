import { cache, clearCatalogCache } from './cache'

// URL base de la API Laravel (proxy local o Render en producción)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/api'

// Lee el token guardado en el navegador
function getAuthToken() {
  return localStorage.getItem('authToken')
}

function normalizeCollection(payload) {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.data)) return payload.data
  return []
}

async function requestJson(url, options = {}) {
  const headers = { 'Content-Type': 'application/json', ...(options.headers ?? {}) }
  const token = getAuthToken()
  if (token) headers.Authorization = `Bearer ${token}`

  const response = await fetch(url, { ...options, headers })
  if (!response.ok) {
    let details = ''
    try {
      const errorPayload = await response.json()
      details = errorPayload?.message ?? JSON.stringify(errorPayload)
    } catch {
      details = response.statusText
    }
    throw new Error(`HTTP ${response.status} on ${url}: ${details}`)
  }
  if (response.status === 204) return null
  return response.json()
}

async function requestFromCandidates(pathCandidates) {
  let lastError = null

  for (const path of pathCandidates) {
    try {
      return await requestJson(`${API_BASE_URL}${path}`)
    } catch (error) {
      lastError = error
    }
  }

  throw lastError ?? new Error('No se pudo conectar con el backend')
}

function normalizeBrand(brand) {
  return {
    id: brand.id,
    name: brand.name ?? brand.brand_name ?? 'Marca',
    logoUrl: brand.logo_url ?? brand.logoUrl ?? 'https://via.placeholder.com/300x300?text=Brand'
  }
}

function normalizeModel(model) {
  return {
    id: model.id,
    name: model.name ?? model.model_name ?? 'Modelo'
  }
}

function normalizeYear(year) {
  return {
    id: year.id,
    value: String(year.year ?? year.name ?? year.value ?? '')
  }
}

function normalizeVersion(version) {
  return {
    id: version.id,
    name: version.name ?? version.version_name ?? 'Version'
  }
}

function normalizeProduct(product) {

  if (!product) {
    return {
      id: null,
      name: 'Pieza',
      price: 0,
      stock: 0,
      description: 'Sin descripcion',
      images: ['https://via.placeholder.com/300x300?text=Producto']
    }
  }

  const image = product.image_url ?? product.image ?? product.images?.[0] ?? 'https://via.placeholder.com/300x300?text=Producto'

  return {
    id: product.id,
    name: product.name ?? product.part_name ?? 'Pieza',
    price: Number(product.price ?? product.sale_price ?? 0),
    stock: Number(product.stock ?? product.units ?? 0),
    description: product.description ?? 'Sin descripcion',
    images: [image]
  }
}

function mapUser(user) {
  if (!user) return null
  return {
    id: user.id,
    name: user.name ?? '',
    last_name: user.last_name ?? '',
    email: user.email ?? '',
    birth_date: user.birth_date ?? '',
    country: user.country ?? '',
    city: user.city ?? '',
    roles: Array.isArray(user.roles) ? user.roles : [],
  }
}

export async function fetchBrands() {
  if (cache.brands) return cache.brands

  const payload = await requestFromCandidates(['/brands'])
  const brands = normalizeCollection(payload).map(normalizeBrand).sort((a, b) => Number(a.id) - Number(b.id))
  cache.brands = brands
  return brands
}

export async function fetchModelsByBrand(brandId) {
  if (cache.modelsByBrand.has(brandId)) return cache.modelsByBrand.get(brandId)

  const payload = await requestFromCandidates([
    `/brands/${brandId}/models`,
    `/models?brand_id=${brandId}`
  ])
  const models = normalizeCollection(payload).map(normalizeModel)
  cache.modelsByBrand.set(brandId, models)
  return models
}

export async function fetchYearsByModel(modelId) {
  if (cache.yearsByModel.has(modelId)) return cache.yearsByModel.get(modelId)

  const payload = await requestFromCandidates([
    `/models/${modelId}/years`,
    `/years?model_id=${modelId}`
  ])
  const years = normalizeCollection(payload).map(normalizeYear)
  cache.yearsByModel.set(modelId, years)
  return years
}

export async function fetchVersionsByYear(yearId) {
  if (cache.versionsByYear.has(yearId)) return cache.versionsByYear.get(yearId)

  const payload = await requestFromCandidates([
    `/years/${yearId}/versions`,
    `/versions?year_id=${yearId}`
  ])
  const versions = normalizeCollection(payload).map(normalizeVersion)
  cache.versionsByYear.set(yearId, versions)
  return versions
}

export async function fetchProductsByVersion(versionId) {
  if (cache.productsByVersion.has(versionId)) return cache.productsByVersion.get(versionId)

  const payload = await requestFromCandidates([
    `/versions/${versionId}/parts`,
    `/parts?car_version_id=${versionId}`,
    `/parts`
  ])
  let products = normalizeCollection(payload)

  if (products.length > 0 && products[0]?.car_version_id !== undefined) {
    products = products.filter(part => String(part.car_version_id) === String(versionId))
  }

  products = products.map(normalizeProduct)
  cache.productsByVersion.set(versionId, products)
  return products
}

export async function fetchProductById(productId) {
  if (cache.productById.has(productId)) return cache.productById.get(productId)

  const payload = await requestFromCandidates([`/parts/${productId}`])
  const product = normalizeProduct(payload?.data ?? payload)
  cache.productById.set(productId, product)
  return product
}

export async function loginUser(credentials) {
  const payload = await requestJson(`${API_BASE_URL}/login`, {
    method: 'POST',
    body: JSON.stringify(credentials),
  })
  return {
    token: payload.token,
    user: mapUser(payload.user),
  }
}

export async function registerUser(data) {
  const payload = await requestJson(`${API_BASE_URL}/register`, {
    method: 'POST',
    body: JSON.stringify(data),
  })
  return {
    token: payload.token,
    user: mapUser(payload.user),
  }
}

export async function logoutUser() {
  await requestJson(`${API_BASE_URL}/logout`, { method: 'POST' })
}

export async function fetchMe() {
  const payload = await requestJson(`${API_BASE_URL}/me`)
  return mapUser(payload.user)
}

export async function updateMe(data) {
  const payload = await requestJson(`${API_BASE_URL}/me`, {
    method: 'PUT',
    body: JSON.stringify(data),
  })
  return mapUser(payload.user)
}

export async function fetchAllBrands() {
  const payload = await requestJson(`${API_BASE_URL}/brands`)
  return normalizeCollection(payload)
    .map(normalizeBrand)
    .sort((a, b) => Number(a.id) - Number(b.id))
}

export async function createBrand(data) {
  const result = await requestJson(`${API_BASE_URL}/brands`, {
    method: 'POST',
    body: JSON.stringify(data),
  })
  clearCatalogCache('brands')
  return result
}

export async function updateBrand(id, data) {
  const result = await requestJson(`${API_BASE_URL}/brands/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  })
  clearCatalogCache('brands')
  return result
}

export async function deleteBrand(id) {
  const result = await requestJson(`${API_BASE_URL}/brands/${id}`, { method: 'DELETE' })
  clearCatalogCache('all')
  return result
}

export async function fetchAllModels() {
  const payload = await requestJson(`${API_BASE_URL}/models`)
  return normalizeCollection(payload).map((model) => ({
    id: model.id,
    brand_id: model.brand_id,
    name: model.name ?? model.model_name ?? '',
  }))
}

export async function createModel(data) {
  const result = await requestJson(`${API_BASE_URL}/models`, {
    method: 'POST',
    body: JSON.stringify(data),
  })
  clearCatalogCache('models')
  return result
}

export async function updateModel(id, data) {
  const result = await requestJson(`${API_BASE_URL}/models/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  })
  clearCatalogCache('models')
  return result
}

export async function deleteModel(id) {
  const result = await requestJson(`${API_BASE_URL}/models/${id}`, { method: 'DELETE' })
  clearCatalogCache('all')
  return result
}

export async function fetchAllYears() {
  const payload = await requestJson(`${API_BASE_URL}/years`)
  return normalizeCollection(payload).map((year) => ({
    id: year.id,
    car_model_id: year.car_model_id,
    year: year.year,
  }))
}

export async function createYear(data) {
  const result = await requestJson(`${API_BASE_URL}/years`, {
    method: 'POST',
    body: JSON.stringify(data),
  })
  clearCatalogCache('years')
  return result
}

export async function updateYear(id, data) {
  const result = await requestJson(`${API_BASE_URL}/years/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  })
  clearCatalogCache('years')
  return result
}

export async function deleteYear(id) {
  const result = await requestJson(`${API_BASE_URL}/years/${id}`, { method: 'DELETE' })
  clearCatalogCache('all')
  return result
}

export async function fetchAllVersions() {
  const payload = await requestJson(`${API_BASE_URL}/versions`)
  return normalizeCollection(payload).map((version) => ({
    id: version.id,
    car_year_id: version.car_year_id,
    name: version.name,
  }))
}

export async function createVersion(data) {
  const result = await requestJson(`${API_BASE_URL}/versions`, {
    method: 'POST',
    body: JSON.stringify(data),
  })
  clearCatalogCache('versions')
  return result
}

export async function updateVersion(id, data) {
  const result = await requestJson(`${API_BASE_URL}/versions/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  })
  clearCatalogCache('versions')
  return result
}

export async function deleteVersion(id) {
  const result = await requestJson(`${API_BASE_URL}/versions/${id}`, { method: 'DELETE' })
  clearCatalogCache('all')
  return result
}

export async function fetchAllParts() {
  const payload = await requestJson(`${API_BASE_URL}/parts`)
  return normalizeCollection(payload).map((part) => ({
    id: part.id,
    car_version_id: part.car_version_id,
    name: part.name,
    sku: part.sku ?? '',
    description: part.description ?? '',
    image_url: part.image_url ?? '',
    price: Number(part.price ?? 0),
    stock: Number(part.stock ?? 0),
    agotado: Boolean(part.agotado),
  }))
}

export async function createPart(data) {
  const result = await requestJson(`${API_BASE_URL}/parts`, {
    method: 'POST',
    body: JSON.stringify(data),
  })
  clearCatalogCache('parts')
  return result
}

export async function updatePart(id, data) {
  const result = await requestJson(`${API_BASE_URL}/parts/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  })
  clearCatalogCache('parts')
  return result
}

export async function deletePart(id) {
  const result = await requestJson(`${API_BASE_URL}/parts/${id}`, { method: 'DELETE' })
  clearCatalogCache('parts')
  return result
}
