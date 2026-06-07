export const cache = {
  brands: null,
  modelsByBrand: new Map(),
  yearsByModel: new Map(),
  versionsByYear: new Map(),
  productsByVersion: new Map(),
  productById: new Map(),
}

export const CATALOG_UPDATED_EVENT = 'falcar:catalog-updated'

export function clearCatalogCache(scope = 'all') {
  if (scope === 'all' || scope === 'brands') {
    cache.brands = null
    cache.modelsByBrand.clear()
  }

  if (scope === 'all' || scope === 'models') {
    cache.modelsByBrand.clear()
    cache.yearsByModel.clear()
  }

  if (scope === 'all' || scope === 'years') {
    cache.yearsByModel.clear()
    cache.versionsByYear.clear()
  }

  if (scope === 'all' || scope === 'versions') {
    cache.versionsByYear.clear()
    cache.productsByVersion.clear()
  }

  if (scope === 'all' || scope === 'parts') {
    cache.productsByVersion.clear()
    cache.productById.clear()
  }

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(CATALOG_UPDATED_EVENT, { detail: { scope } }))
  }
}
