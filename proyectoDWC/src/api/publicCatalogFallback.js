const brands = [
  { id: 1, name: 'Honda', logo_url: '' },
  { id: 2, name: 'Toyota', logo_url: '' },
]

const models = [
  { id: 11, brand_id: 1, name: 'Civic' },
  { id: 12, brand_id: 1, name: 'Accord' },
  { id: 21, brand_id: 2, name: 'Corolla' },
  { id: 22, brand_id: 2, name: 'Yaris' },
]

const years = [
  { id: 111, car_model_id: 11, year: 2018 },
  { id: 112, car_model_id: 11, year: 2020 },
  { id: 121, car_model_id: 12, year: 2019 },
  { id: 211, car_model_id: 21, year: 2017 },
  { id: 212, car_model_id: 21, year: 2021 },
  { id: 221, car_model_id: 22, year: 2018 },
]

const versions = [
  { id: 1111, car_year_id: 111, name: '1.8 i-VTEC' },
  { id: 1112, car_year_id: 111, name: '1.6 i-DTEC' },
  { id: 1121, car_year_id: 112, name: 'Sport Plus' },
  { id: 1211, car_year_id: 121, name: 'Executive' },
  { id: 2111, car_year_id: 211, name: 'Hybrid' },
  { id: 2121, car_year_id: 212, name: 'GR Sport' },
  { id: 2211, car_year_id: 221, name: 'Active' },
]

const parts = [
  {
    id: 9001,
    car_version_id: 1111,
    name: 'Pastillas de freno delanteras',
    description: 'Juego de pastillas de freno de alto rendimiento.',
    image_url: '',
    price: 89.9,
    stock: 12,
  },
  {
    id: 9002,
    car_version_id: 1112,
    name: 'Filtro de aceite',
    description: 'Filtro de aceite para mantenimiento periódico.',
    image_url: '',
    price: 16.5,
    stock: 50,
  },
  {
    id: 9003,
    car_version_id: 1121,
    name: 'Kit de embrague',
    description: 'Kit completo de embrague.',
    image_url: '',
    price: 249.0,
    stock: 6,
  },
  {
    id: 9004,
    car_version_id: 2111,
    name: 'Batería AGM 70Ah',
    description: 'Batería compatible con sistema start/stop.',
    image_url: '',
    price: 139.0,
    stock: 9,
  },
  {
    id: 9005,
    car_version_id: 2121,
    name: 'Amortiguadores traseros',
    description: 'Pareja de amortiguadores traseros.',
    image_url: '',
    price: 169.0,
    stock: 8,
  },
  {
    id: 9006,
    car_version_id: 2211,
    name: 'Discos de freno ventilados',
    description: 'Discos ventilados para eje delantero.',
    image_url: '',
    price: 124.9,
    stock: 10,
  },
]

export function getFallbackBrands() {
  return brands
}

export function getFallbackModelsByBrand(brandId) {
  return models.filter((model) => String(model.brand_id) === String(brandId))
}

export function getFallbackYearsByModel(modelId) {
  return years.filter((year) => String(year.car_model_id) === String(modelId))
}

export function getFallbackVersionsByYear(yearId) {
  return versions.filter((version) => String(version.car_year_id) === String(yearId))
}

export function getFallbackPartsByVersion(versionId) {
  return parts.filter((part) => String(part.car_version_id) === String(versionId))
}

export function getFallbackPartById(partId) {
  return parts.find((part) => String(part.id) === String(partId)) ?? null
}
