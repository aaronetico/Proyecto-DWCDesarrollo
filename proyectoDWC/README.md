# Falcar – Frontend React conectado a Laravel

Frontend de tienda de piezas mecánicas integrado con API Laravel real.

## Funcionalidades

- Flujo catálogo: marcas → modelos → años → versiones → piezas.
- Home pública sin login obligatorio.
- Login, registro y perfil con API token (Sanctum).
- Panel de gestión por rol:
  - `admin`: CRUD completo (brands, models, years, versions, parts).
  - `empleado`: CRUD solo de parts.
- Carrito y checkout en frontend.

## Configuración local

1. Levanta Laravel (Sail suele exponerlo en `http://127.0.0.1:8150`).
2. En este proyecto, crea `.env` desde `.env.example`.
3. Ejecuta:
   - `npm install`
   - `npm run dev`

## Variables de entorno

- `VITE_API_BASE_URL=/api`
- `VITE_PROXY_TARGET=http://127.0.0.1:8150`
