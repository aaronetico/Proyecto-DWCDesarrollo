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

- `VITE_API_BASE_URL=http://127.0.0.1:8150/api`
- `VITE_PROXY_TARGET=http://127.0.0.1:8150`

### Nota sobre GitHub Pages

En local se puede usar proxy de Vite con `VITE_API_BASE_URL=/api`, pero en GitHub Pages no existe ese proxy.
Para que el despliegue funcione, el frontend debe apuntar a una URL absoluta de backend (por ejemplo `http://127.0.0.1:8150/api` en tu equipo cuando tengas Laravel levantado).

Si el backend no está disponible en producción, el catálogo público usa datos de respaldo para evitar que la app quede bloqueada en carga.
