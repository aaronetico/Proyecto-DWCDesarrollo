// Simulación de base de datos en memoria
// Representa los productos disponibles
export const brands = [
  {
    id: 'honda',
    name: 'Honda',

    logoUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/Honda-logo.svg'
  },
  {
    id: 'mazda',
    name: 'Mazda',
    logoUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/Mazda_logo.svg'
  },
  {
    id: 'mitsubishi',
    name: 'Mitsubishi',
    logoUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/Mitsubishi-logo.png'
  },
  {
    id: 'toyota',
    name: 'Toyota',
    logoUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/Logo_Toyota.svg'
  }
]

export const categories = [
  { id: 'motor', name: 'Motor' },
  { id: 'frenos', name: 'Frenos' },
  { id: 'suspension', name: 'Suspensión' },
  { id: 'direccion', name: 'Dirección' }
]



// Lista larga de productos (~62)
export const products = [
  {
    id: 'prod_001',
    name: 'Pastillas de freno Brembo X1',
    brandId: 'honda',
    categoryId: 'frenos',
    price: 89.99,
    stock: 15,
    images: [
      'https://commons.wikimedia.org/wiki/Special:FilePath/Disc_brake.jpg'
    ],
    description: 'Pastillas de freno de alto rendimiento para uso diario.',
    compatibility: ['Civic 2018', 'Civic 2019']
  },
  {
    id: 'prod_002',
    name: 'Filtro de aceite HighFlow HF-90',
    brandId: 'toyota',
    categoryId: 'motor',
    price: 15.99,
    stock: 80,
    images: [
      'https://commons.wikimedia.org/wiki/Special:FilePath/Engine_oil_filter.JPG'
    ],
    description: 'Filtro de aceite para mantenimiento periódico.',
    compatibility: ['Corolla 2016', 'Yaris 2017']
  },

  // ================= Honda adicionales
  {
    id: 'prod_003',
    name: 'Filtro de aire Honda OEM',
    brandId: 'honda',
    categoryId: 'motor',
    price: 24.99,
    stock: 40,
    images: ['https://commons.wikimedia.org/wiki/Special:FilePath/Oilfilter_IMG_0474.JPG'],
    description: 'Filtro de aire original Honda.',
    compatibility: ['Civic 2018', 'Civic 2019']
  },
  {
    id: 'prod_004',
    name: 'Bujías NGK Honda',
    brandId: 'honda',
    categoryId: 'motor',
    price: 39.99,
    stock: 30,
    images: ['https://commons.wikimedia.org/wiki/Special:FilePath/Spark_plug.jpg'],
    description: 'Juego de bujías NGK para motores Honda.',
    compatibility: ['Accord 2017', 'Civic 2020']
  },
  {
    id: 'prod_005',
    name: 'Discos de freno Honda Sport',
    brandId: 'honda',
    categoryId: 'frenos',
    price: 129.99,
    stock: 18,
    images: ['https://commons.wikimedia.org/wiki/Special:FilePath/Brake_disc_polishing.jpg'],
    description: 'Discos de freno ventilados.',
    compatibility: ['Civic 2019']
  },
  {
    id: 'prod_006',
    name: 'Amortiguadores Honda Comfort',
    brandId: 'honda',
    categoryId: 'suspension',
    price: 219.99,
    stock: 12,
    images: ['https://commons.wikimedia.org/wiki/Special:FilePath/Power_steering_rack.jpg'],
    description: 'Amortiguadores de conducción cómoda.',
    compatibility: ['CR-V 2018']
  },
  {
    id: 'prod_007',
    name: 'Bieletas de dirección Honda',
    brandId: 'honda',
    categoryId: 'direccion',
    price: 54.99,
    stock: 25,
    images: ['https://commons.wikimedia.org/wiki/Special:FilePath/Car_with_clearly_visible_steering_rack_with_inner_track_rod_and_track_rod_ends.jpg'],
    description: 'Bieletas reforzadas.',
    compatibility: ['Civic 2017']
  },

  // ================= Toyota adicionales
  {
    id: 'prod_008',
    name: 'Correa de distribución Toyota Premium',
    brandId: 'toyota',
    categoryId: 'motor',
    price: 99.99,
    stock: 28,
    images: ['https://commons.wikimedia.org/wiki/Special:FilePath/Timing_belt.jpg'],
    description: 'Correa de distribución reforzada.',
    compatibility: ['Avensis 2015', 'Corolla 2016']
  },
  {
    id: 'prod_009',
    name: 'Pastillas de freno Toyota',
    brandId: 'toyota',
    categoryId: 'frenos',
    price: 79.99,
    stock: 35,
    images: ['https://commons.wikimedia.org/wiki/Special:FilePath/Disc_brake.jpg'],
    description: 'Pastillas silenciosas.',
    compatibility: ['Corolla 2019']
  },
  {
    id: 'prod_010',
    name: 'Muelles deportivos Toyota',
    brandId: 'toyota',
    categoryId: 'suspension',
    price: 189.99,
    stock: 10,
    images: ['https://commons.wikimedia.org/wiki/Special:FilePath/Car_spring.jpg'],
    description: 'Muelles deportivos.',
    compatibility: ['GT86']
  },
  {
    id: 'prod_011',
    name: 'Cremallera de dirección Toyota',
    brandId: 'toyota',
    categoryId: 'direccion',
    price: 349.99,
    stock: 6,
    images: ['https://commons.wikimedia.org/wiki/Special:FilePath/Power_steering_rack.jpg'],
    description: 'Dirección asistida hidráulica.',
    compatibility: ['RAV4 2017']
  },
  {
    id: 'prod_012',
    name: 'Radiador Toyota ECO',
    brandId: 'toyota',
    categoryId: 'motor',
    price: 199.99,
    stock: 9,
    images: ['https://commons.wikimedia.org/wiki/Special:FilePath/Antifreeze_in_the_radiator.jpg'],
    description: 'Radiador de alto rendimiento.',
    compatibility: ['Yaris 2018']
  },

  // ================= Mazda adicionales
  {
    id: 'prod_013',
    name: 'Filtro de combustible Mazda',
    brandId: 'mazda',
    categoryId: 'motor',
    price: 34.99,
    stock: 28,
    images: ['https://commons.wikimedia.org/wiki/Special:FilePath/Fuel_filter.jpg'],
    description: 'Filtro de combustible Mazda.',
    compatibility: ['Mazda 3 2018']
  },
  {
    id: 'prod_014',
    name: 'Radiador Mazda',
    brandId: 'mazda',
    categoryId: 'motor',
    price: 199.99,
    stock: 9,
    images: ['https://commons.wikimedia.org/wiki/Special:FilePath/Engine_oil_filter_cutaway.JPG'],
    description: 'Radiador de alto rendimiento.',
    compatibility: ['CX-5 2019']
  },
  {
    id: 'prod_015',
    name: 'Discos de freno Mazda',
    brandId: 'mazda',
    categoryId: 'frenos',
    price: 119.99,
    stock: 20,
    images: ['https://commons.wikimedia.org/wiki/Special:FilePath/Disc_brake.jpg'],
    description: 'Discos ventilados.',
    compatibility: ['Mazda 6']
  },
  {
    id: 'prod_016',
    name: 'Amortiguadores Mazda Sport',
    brandId: 'mazda',
    categoryId: 'suspension',
    price: 229.99,
    stock: 14,
    images: ['https://commons.wikimedia.org/wiki/Special:FilePath/Shock_absorber.jpg'],
    description: 'Amortiguadores deportivos.',
    compatibility: ['Mazda 3']
  },
  {
    id: 'prod_017',
    name: 'Terminales de dirección Mazda',
    brandId: 'mazda',
    categoryId: 'direccion',
    price: 59.99,
    stock: 26,
    images: ['https://commons.wikimedia.org/wiki/Special:FilePath/Tie_rod_end.jpg'],
    description: 'Terminales de dirección.',
    compatibility: ['CX-3']
  },

  // ================= Mitsubishi adicionales
  {
    id: 'prod_018',
    name: 'Filtro de aire Mitsubishi',
    brandId: 'mitsubishi',
    categoryId: 'motor',
    price: 27.99,
    stock: 44,
    images: ['https://commons.wikimedia.org/wiki/Special:FilePath/Air_filter.jpg'],
    description: 'Filtro de aire original.',
    compatibility: ['Lancer 2016']
  },
  {
    id: 'prod_019',
    name: 'Kit de embrague Mitsubishi',
    brandId: 'mitsubishi',
    categoryId: 'motor',
    price: 399.99,
    stock: 7,
    images: ['https://commons.wikimedia.org/wiki/Special:FilePath/Clutchdisc.jpg'],
    description: 'Kit de embrague completo.',
    compatibility: ['Lancer EVO']
  },
  {
    id: 'prod_020',
    name: 'Pastillas de freno Mitsubishi',
    brandId: 'mitsubishi',
    categoryId: 'frenos',
    price: 84.99,
    stock: 31,
    images: ['https://commons.wikimedia.org/wiki/Special:FilePath/Disc_brake.jpg'],
    description: 'Pastillas cerámicas.',
    compatibility: ['ASX 2018']
  },
  {
    id: 'prod_021',
    name: 'Suspensión Mitsubishi Offroad',
    brandId: 'mitsubishi',
    categoryId: 'suspension',
    price: 299.99,
    stock: 8,
    images: ['https://commons.wikimedia.org/wiki/Special:FilePath/Shock_absorber.jpg'],
    description: 'Suspensión reforzada.',
    compatibility: ['Montero']
  },
  {
    id: 'prod_022',
    name: 'Bomba de dirección Mitsubishi',
    brandId: 'mitsubishi',
    categoryId: 'direccion',
    price: 279.99,
    stock: 11,
    images: ['https://commons.wikimedia.org/wiki/Special:FilePath/Power_steering_rack.jpg'],
    description: 'Bomba hidráulica.',
    compatibility: ['Outlander']
  },

  // ================= Más productos variados (para llegar ~60)
  {
    id: 'prod_023',
    name: 'Correa accesorios Honda',
    brandId: 'honda',
    categoryId: 'motor',
    price: 49.99,
    stock: 50,
    images: ['https://commons.wikimedia.org/wiki/Special:FilePath/Timing_belt.jpg'],
    description: 'Correa de accesorios original.',
    compatibility: ['Civic 2016', 'Jazz 2017']
  },
  {
    id: 'prod_024',
    name: 'Bombín de freno Toyota',
    brandId: 'toyota',
    categoryId: 'frenos',
    price: 129.99,
    stock: 22,
    images: ['https://commons.wikimedia.org/wiki/Special:FilePath/Brake_disc_polishing.jpg'],
    description: 'Bombín trasero para Toyota.',
    compatibility: ['Corolla 2015']
  },
  {
    id: 'prod_025',
    name: 'Bomba de agua Mazda',
    brandId: 'mazda',
    categoryId: 'motor',
    price: 89.99,
    stock: 19,
    images: ['https://commons.wikimedia.org/wiki/Special:FilePath/Car_radiator_grille_under_snow_at_Gatton%2C_Surrey.jpg'],
    description: 'Bomba de agua reforzada.',
    compatibility: ['Mazda 6 2016']
  },
  {
    id: 'prod_026',
    name: 'Kit pastillas + discos Mitsubishi',
    brandId: 'mitsubishi',
    categoryId: 'frenos',
    price: 239.99,
    stock: 12,
    images: ['https://commons.wikimedia.org/wiki/Special:FilePath/Brake_disc_McLaren_F1.jpg'],
    description: 'Kit completo para frenos delantero.',
    compatibility: ['ASX 2018']
  },
  {
    id: 'prod_027',
    name: 'Inyector Honda Denso',
    brandId: 'honda',
    categoryId: 'motor',
    price: 129.0,
    stock: 20,
    images: ['https://commons.wikimedia.org/wiki/Special:FilePath/Engine_oil_filter.JPG'],
    description: 'Inyector original Denso.',
    compatibility: ['Civic 2017']
  },
  {
    id: 'prod_028',
    name: 'Sonda lambda Toyota',
    brandId: 'toyota',
    categoryId: 'motor',
    price: 119.0,
    stock: 15,
    images: ['https://commons.wikimedia.org/wiki/Special:FilePath/Oilfilter_IMG_0474.JPG'],
    description: 'Sonda lambda para control emisiones.',
    compatibility: ['Yaris 2019']
  },
  {
    id: 'prod_029',
    name: 'Tubo de escape Mazda sport',
    brandId: 'mazda',
    categoryId: 'motor',
    price: 189.99,
    stock: 7,
    images: ['https://commons.wikimedia.org/wiki/Special:FilePath/Disc_brake.jpg'],
    description: 'Escape con salida doble.',
    compatibility: ['MX-5']
  },
  {
    id: 'prod_030',
    name: 'Silentblocks Mitsubishi',
    brandId: 'mitsubishi',
    categoryId: 'suspension',
    price: 39.99,
    stock: 60,
    images: ['https://commons.wikimedia.org/wiki/Special:FilePath/Car_spring.jpg'],
    description: 'Silentblocks para suspensión.',
    compatibility: ['L200']
  },
  {
    id: 'prod_031',
    name: 'Kit distribución completo Honda',
    brandId: 'honda',
    categoryId: 'motor',
    price: 189.99,
    stock: 11,
    images: ['https://commons.wikimedia.org/wiki/Special:FilePath/Timing_belt.jpg'],
    description: 'Kit completo con bomba de agua.',
    compatibility: ['Civic 2012-2016']
  },
  {
    id: 'prod_032',
    name: 'Latiguillos deportivos Toyota',
    brandId: 'toyota',
    categoryId: 'frenos',
    price: 59.99,
    stock: 40,
    images: ['https://commons.wikimedia.org/wiki/Special:FilePath/Disc_brake.jpg'],
    description: 'Latiguillos metálicos para freno.',
    compatibility: ['Corolla 2018']
  },
  {
    id: 'prod_033',
    name: 'Colector admisión Mazda',
    brandId: 'mazda',
    categoryId: 'motor',
    price: 149.99,
    stock: 6,
    images: ['https://commons.wikimedia.org/wiki/Special:FilePath/Engine_oil_filter_cutaway.JPG'],
    description: 'Colector de admisión original.',
    compatibility: ['CX-5 2018']
  },
  {
    id: 'prod_034',
    name: 'Cojinetes rueda Mitsubishi',
    brandId: 'mitsubishi',
    categoryId: 'direccion',
    price: 69.99,
    stock: 22,
    images: ['https://commons.wikimedia.org/wiki/Special:FilePath/Clutchdisc.jpg'],
    description: 'Rodamiento delantero.',
    compatibility: ['Outlander']
  },
  {
    id: 'prod_035',
    name: 'Centralita ECU Honda',
    brandId: 'honda',
    categoryId: 'motor',
    price: 299.99,
    stock: 5,
    images: ['https://commons.wikimedia.org/wiki/Special:FilePath/Oilfilter_IMG_0474.JPG'],
    description: 'Centralita reprogramada.',
    compatibility: ['Accord 2016']
  },
  {
    id: 'prod_036',
    name: 'Eje de transmisión Toyota',
    brandId: 'toyota',
    categoryId: 'direccion',
    price: 249.99,
    stock: 8,
    images: ['https://commons.wikimedia.org/wiki/Special:FilePath/Power_steering_rack.jpg'],
    description: 'Eje trasero completo.',
    compatibility: ['Rav4 2015']
  },
  {
    id: 'prod_037',
    name: 'Filtro habitáculo Mazda',
    brandId: 'mazda',
    categoryId: 'motor',
    price: 19.99,
    stock: 80,
    images: ['https://commons.wikimedia.org/wiki/Special:FilePath/Ace_oil_filter.JPG'],
    description: 'Filtro de polen y polvo.',
    compatibility: ['Mazda 3 2016']
  },
  {
    id: 'prod_038',
    name: 'Soportes motor Mitsubishi',
    brandId: 'mitsubishi',
    categoryId: 'motor',
    price: 79.99,
    stock: 13,
    images: ['https://commons.wikimedia.org/wiki/Special:FilePath/Clutchdisc.jpg'],
    description: 'Soportes hidráulicos.',
    compatibility: ['Lancer']
  },
  {
    id: 'prod_039',
    name: 'Antinieblas Honda',
    brandId: 'honda',
    categoryId: 'direccion',
    price: 49.99,
    stock: 33,
    images: ['https://commons.wikimedia.org/wiki/Special:FilePath/Car_radiator_grille_under_snow_at_Gatton%2C_Surrey.jpg'],
    description: 'Faros antinieblas LED.',
    compatibility: ['Civic 2019']
  },
  {
    id: 'prod_040',
    name: 'Manguetas Toyota',
    brandId: 'toyota',
    categoryId: 'direccion',
    price: 109.99,
    stock: 14,
    images: ['https://commons.wikimedia.org/wiki/Special:FilePath/Power_steering_rack.jpg'],
    description: 'Mangueta delantera completa.',
    compatibility: ['Corolla 2017']
  },
  {
    id: 'prod_041',
    name: 'Bomba gasolina Mazda',
    brandId: 'mazda',
    categoryId: 'motor',
    price: 179.99,
    stock: 9,
    images: ['https://commons.wikimedia.org/wiki/Special:FilePath/Fuel_filter.jpg'],
    description: 'Bomba eléctrica interna.',
    compatibility: ['CX-3']
  },
  {
    id: 'prod_042',
    name: 'Palieres Mitsubishi',
    brandId: 'mitsubishi',
    categoryId: 'direccion',
    price: 129.99,
    stock: 12,
    images: ['https://commons.wikimedia.org/wiki/Special:FilePath/Power_steering_rack.jpg'],
    description: 'Juego de palieres con juntas.',
    compatibility: ['L200']
  },
  {
    id: 'prod_043',
    name: 'Soporte transmisión Honda',
    brandId: 'honda',
    categoryId: 'motor',
    price: 64.99,
    stock: 21,
    images: ['https://commons.wikimedia.org/wiki/Special:FilePath/Clutchdisc.jpg'],
    description: 'Soporte de caja de cambios.',
    compatibility: ['Accord 2015']
  },
  {
    id: 'prod_044',
    name: 'Latiguillo freno delantero Toyota',
    brandId: 'toyota',
    categoryId: 'frenos',
    price: 34.99,
    stock: 55,
    images: ['https://commons.wikimedia.org/wiki/Special:FilePath/Disc_brake.jpg'],
    description: 'Latiguillo reforzado.',
    compatibility: ['Corolla 2019']
  },
  {
    id: 'prod_045',
    name: 'Tapa válvulas Mazda',
    brandId: 'mazda',
    categoryId: 'motor',
    price: 49.99,
    stock: 45,
    images: ['https://commons.wikimedia.org/wiki/Special:FilePath/Engine_oil_filter_cutaway.JPG'],
    description: 'Tapa válvulas original.',
    compatibility: ['Mazda 6 2017']
  },
  {
    id: 'prod_046',
    name: 'Soporte amortiguador Mitsubishi',
    brandId: 'mitsubishi',
    categoryId: 'suspension',
    price: 39.99,
    stock: 38,
    images: ['https://commons.wikimedia.org/wiki/Special:FilePath/Shock_absorber.jpg'],
    description: 'Soporte superior.',
    compatibility: ['ASX']
  },
  {
    id: 'prod_047',
    name: 'Juego rodamientos Honda',
    brandId: 'honda',
    categoryId: 'direccion',
    price: 89.99,
    stock: 17,
    images: ['https://commons.wikimedia.org/wiki/Special:FilePath/Clutchdisc.jpg'],
    description: 'Rodamientos y retenes.',
    compatibility: ['Civic 2014-2018']
  },
  {
    id: 'prod_048',
    name: 'Manguito radiador Toyota',
    brandId: 'toyota',
    categoryId: 'motor',
    price: 12.99,
    stock: 120,
    images: ['https://commons.wikimedia.org/wiki/Special:FilePath/Antifreeze_in_the_radiator.jpg'],
    description: 'Manguito de goma reforzado.',
    compatibility: ['Corolla 2016']
  },
  {
    id: 'prod_049',
    name: 'Tapón aceite Mazda',
    brandId: 'mazda',
    categoryId: 'motor',
    price: 6.99,
    stock: 300,
    images: ['https://commons.wikimedia.org/wiki/Special:FilePath/Oilfilter_IMG_0474.JPG'],
    description: 'Tapón con junta original.',
    compatibility: ['Varias']
  },
  {
    id: 'prod_050',
    name: 'Filtro aire sport Mitsubishi',
    brandId: 'mitsubishi',
    categoryId: 'motor',
    price: 39.99,
    stock: 26,
    images: ['https://commons.wikimedia.org/wiki/Special:FilePath/Air_filter.jpg'],
    description: 'Filtro alto flujo.',
    compatibility: ['Lancer EVO']
  },
  {
    id: 'prod_051',
    name: 'Eje de leva Honda',
    brandId: 'honda',
    categoryId: 'motor',
    price: 149.99,
    stock: 7,
    images: ['https://commons.wikimedia.org/wiki/Special:FilePath/Engine_oil_filter_cutaway.JPG'],
    description: 'Árbol de levas original.',
    compatibility: ['Civic 2012-2016']
  },
  {
    id: 'prod_052',
    name: 'Pinza freno Toyota del.',
    brandId: 'toyota',
    categoryId: 'frenos',
    price: 169.99,
    stock: 9,
    images: ['https://commons.wikimedia.org/wiki/Special:FilePath/Brake_disc_polishing.jpg'],
    description: 'Pinza monobloque para mayor rendimiento.',
    compatibility: ['GT86']
  },
  {
    id: 'prod_053',
    name: 'Sensor ABS Mazda',
    brandId: 'mazda',
    categoryId: 'frenos',
    price: 49.99,
    stock: 27,
    images: ['https://commons.wikimedia.org/wiki/Special:FilePath/Disc_brake.jpg'],
    description: 'Sensor rueda ABS.',
    compatibility: ['Mazda 3 2018']
  },
  {
    id: 'prod_054',
    name: 'Silentblock brazo Mitsubishi',
    brandId: 'mitsubishi',
    categoryId: 'suspension',
    price: 29.99,
    stock: 42,
    images: ['https://commons.wikimedia.org/wiki/Special:FilePath/Car_spring.jpg'],
    description: 'Silentblock reforzado para brazo.',
    compatibility: ['Montero']
  },
  {
    id: 'prod_055',
    name: 'Tobera admisión Honda',
    brandId: 'honda',
    categoryId: 'motor',
    price: 89.99,
    stock: 10,
    images: ['https://commons.wikimedia.org/wiki/Special:FilePath/Engine_oil_filter.JPG'],
    description: 'Tobera para admisión deportiva.',
    compatibility: ['Civic Type R']
  },
  {
    id: 'prod_056',
    name: 'Juego retenes Toyota',
    brandId: 'toyota',
    categoryId: 'motor',
    price: 19.99,
    stock: 80,
    images: ['https://commons.wikimedia.org/wiki/Special:FilePath/Oilfilter_IMG_0474.JPG'],
    description: 'Juego retenes motor y caja.',
    compatibility: ['Corolla 2012-2019']
  },
  {
    id: 'prod_057',
    name: 'Cazoletas amortiguador Mazda',
    brandId: 'mazda',
    categoryId: 'suspension',
    price: 39.99,
    stock: 31,
    images: ['https://commons.wikimedia.org/wiki/Special:FilePath/Shock_absorber.jpg'],
    description: 'Cazoletas y rodamientos.',
    compatibility: ['Mazda 6']
  },
  {
    id: 'prod_058',
    name: 'Culata Mitsubishi (reacond.)',
    brandId: 'mitsubishi',
    categoryId: 'motor',
    price: 599.99,
    stock: 2,
    images: ['https://commons.wikimedia.org/wiki/Special:FilePath/Clutchdisc.jpg'],
    description: 'Culata reacondicionada con garantía.',
    compatibility: ['Lancer']
  },
  {
    id: 'prod_059',
    name: 'Kit distribución Toyota OEM',
    brandId: 'toyota',
    categoryId: 'motor',
    price: 179.99,
    stock: 14,
    images: ['https://commons.wikimedia.org/wiki/Special:FilePath/Timing_belt.jpg'],
    description: 'Kit OEM completo.',
    compatibility: ['Avensis', 'Corolla']
  },
  {
    id: 'prod_060',
    name: 'Juego pastillas sport Honda',
    brandId: 'honda',
    categoryId: 'frenos',
    price: 99.99,
    stock: 23,
    images: ['https://commons.wikimedia.org/wiki/Special:FilePath/Disc_brake.jpg'],
    description: 'Pastillas alto rendimiento.',
    compatibility: ['Civic', 'CR-V']
  },
  {
    id: 'prod_061',
    name: 'Bieleta estabilizadora Mazda',
    brandId: 'mazda',
    categoryId: 'suspension',
    price: 29.99,
    stock: 44,
    images: ['https://commons.wikimedia.org/wiki/Special:FilePath/Car_spring.jpg'],
    description: 'Bieleta reforzada.',
    compatibility: ['Mazda 3']
  },
  {
    id: 'prod_062',
    name: 'Cremallera dirección Honda (reman.)',
    brandId: 'honda',
    categoryId: 'direccion',
    price: 329.99,
    stock: 5,
    images: ['https://commons.wikimedia.org/wiki/Special:FilePath/Power_steering_rack.jpg'],
    description: 'Cremallera reacondicionada.',
    compatibility: ['Accord', 'Civic']
  }
]
