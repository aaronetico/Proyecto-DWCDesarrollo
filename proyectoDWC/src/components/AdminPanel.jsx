import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import {
  createBrand,
  createModel,
  createPart,
  createVersion,
  createYear,
  deleteBrand,
  deleteModel,
  deletePart,
  deleteVersion,
  deleteYear,
  fetchAllBrands,
  fetchAllModels,
  fetchAllParts,
  fetchAllVersions,
  fetchAllYears,
  updateBrand,
  updateModel,
  updatePart,
  updateVersion,
  updateYear,
} from '../api/backendApi'

function sortById(items) {
  return [...items].sort((a, b) => Number(a.id) - Number(b.id))
}

function EntityCrud({ title, items, onCreate, onUpdate, onDelete, fields }) {
  const [draft, setDraft] = useState({})
  const [editingId, setEditingId] = useState(null)
  const [editDraft, setEditDraft] = useState({})

  async function handleCreate(event) {
    event.preventDefault()
    await onCreate(draft)
    setDraft({})
  }

  async function handleSave(id) {
    await onUpdate(id, editDraft)
    setEditingId(null)
    setEditDraft({})
  }

  return (
    <div className="admin-block">
      <h3>{title}</h3>
      <form className="admin-form" onSubmit={handleCreate}>
        <input value="ID" disabled />
        {fields.map((field) => (
          <input
            key={field.key}
            type={field.type ?? 'text'}
            placeholder={field.label}
            value={draft[field.key] ?? ''}
            onChange={(event) => setDraft((prev) => ({ ...prev, [field.key]: event.target.value }))}
            required={Boolean(field.required)}
          />
        ))}
        <button type="submit">Crear</button>
      </form>

      {items.map((item) => (
        <div className="admin-row" key={item.id}>
          <input value={item.id} disabled />
          {fields.map((field) => (
            <input
              key={field.key}
              type={field.type ?? 'text'}
              value={(editingId === item.id ? editDraft[field.key] : item[field.key]) ?? ''}
              disabled={editingId !== item.id}
              onChange={(event) => setEditDraft((prev) => ({ ...prev, [field.key]: event.target.value }))}
            />
          ))}
          {editingId === item.id ? (
            <button onClick={() => handleSave(item.id)}>Guardar</button>
          ) : (
            <button onClick={() => { setEditingId(item.id); setEditDraft(item) }}>Editar</button>
          )}
          <button onClick={() => onDelete(item.id)}>Eliminar</button>
        </div>
      ))}
    </div>
  )
}

function AdminPanel({ isAuthenticated, canManageStructure, canManageParts }) {
  const [brands, setBrands] = useState([])
  const [models, setModels] = useState([])
  const [years, setYears] = useState([])
  const [versions, setVersions] = useState([])
  const [parts, setParts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  async function reloadAll() {
    setLoading(true)
    setError('')
    try {
      const [b, m, y, v, p] = await Promise.all([
        fetchAllBrands(),
        fetchAllModels(),
        fetchAllYears(),
        fetchAllVersions(),
        fetchAllParts(),
      ])
      setBrands(sortById(b))
      setModels(sortById(m))
      setYears(sortById(y))
      setVersions(sortById(v))
      setParts(sortById(p))
    } catch {
      setError('No se pudieron cargar los datos de gestión')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    reloadAll()
  }, [])

  if (!isAuthenticated) return <Navigate to="/login" replace />
  if (!canManageStructure && !canManageParts) return <Navigate to="/" replace />
  if (loading) {
    return (
      <section>
        <h2>Panel de gestión</h2>
        <p>Cargando datos...</p>
      </section>
    )
  }

  return (
    <section>
      <h2>Panel de gestión</h2>
      {error && <p className="form-error">{error}</p>}

      {canManageStructure && (
        <>
          <EntityCrud
            title="Marcas"
            items={brands}
            fields={[{ key: 'name', label: 'Nombre', required: true }]}
            onCreate={async (data) => {
              const created = await createBrand(data)
              setBrands((prev) => sortById([...prev, { id: created.id, name: created.name }]))
            }}
            onUpdate={async (id, data) => {
              const updated = await updateBrand(id, data)
              setBrands((prev) => sortById(prev.map((item) => (
                item.id === id ? { ...item, name: updated.name ?? data.name } : item
              ))))
            }}
            onDelete={async (id) => {
              await deleteBrand(id)
              setBrands((prev) => prev.filter((item) => item.id !== id))
            }}
          />

          <EntityCrud
            title="Modelos"
            items={models}
            fields={[{ key: 'brand_id', label: 'Brand ID', required: true }, { key: 'name', label: 'Nombre', required: true }]}
            onCreate={async (data) => {
              const created = await createModel(data)
              setModels((prev) => sortById([...prev, {
                id: created.id,
                brand_id: Number(created.brand_id ?? data.brand_id),
                name: created.name ?? data.name,
              }]))
            }}
            onUpdate={async (id, data) => {
              const updated = await updateModel(id, data)
              setModels((prev) => sortById(prev.map((item) => (
                item.id === id
                  ? {
                    ...item,
                    brand_id: Number(updated.brand_id ?? data.brand_id),
                    name: updated.name ?? data.name,
                  }
                  : item
              ))))
            }}
            onDelete={async (id) => {
              await deleteModel(id)
              setModels((prev) => prev.filter((item) => item.id !== id))
            }}
          />

          <EntityCrud
            title="Años"
            items={years}
            fields={[{ key: 'car_model_id', label: 'Model ID', required: true }, { key: 'year', label: 'Año', required: true }]}
            onCreate={async (data) => {
              const created = await createYear(data)
              setYears((prev) => sortById([...prev, {
                id: created.id,
                car_model_id: Number(created.car_model_id ?? data.car_model_id),
                year: Number(created.year ?? data.year),
              }]))
            }}
            onUpdate={async (id, data) => {
              const updated = await updateYear(id, data)
              setYears((prev) => sortById(prev.map((item) => (
                item.id === id
                  ? {
                    ...item,
                    car_model_id: Number(updated.car_model_id ?? data.car_model_id),
                    year: Number(updated.year ?? data.year),
                  }
                  : item
              ))))
            }}
            onDelete={async (id) => {
              await deleteYear(id)
              setYears((prev) => prev.filter((item) => item.id !== id))
            }}
          />

          <EntityCrud
            title="Versiones"
            items={versions}
            fields={[{ key: 'car_year_id', label: 'Year ID', required: true }, { key: 'name', label: 'Nombre', required: true }]}
            onCreate={async (data) => {
              const created = await createVersion(data)
              setVersions((prev) => sortById([...prev, {
                id: created.id,
                car_year_id: Number(created.car_year_id ?? data.car_year_id),
                name: created.name ?? data.name,
              }]))
            }}
            onUpdate={async (id, data) => {
              const updated = await updateVersion(id, data)
              setVersions((prev) => sortById(prev.map((item) => (
                item.id === id
                  ? {
                    ...item,
                    car_year_id: Number(updated.car_year_id ?? data.car_year_id),
                    name: updated.name ?? data.name,
                  }
                  : item
              ))))
            }}
            onDelete={async (id) => {
              await deleteVersion(id)
              setVersions((prev) => prev.filter((item) => item.id !== id))
            }}
          />
        </>
      )}

      {canManageParts && (
        <EntityCrud
          title="Piezas"
          items={parts}
          fields={[
            { key: 'car_version_id', label: 'Version ID', required: true },
            { key: 'name', label: 'Nombre', required: true },
            { key: 'sku', label: 'SKU' },
            { key: 'description', label: 'Descripción' },
            { key: 'image_url', label: 'Imagen URL' },
            { key: 'price', label: 'Precio', type: 'number', required: true },
            { key: 'stock', label: 'Stock', type: 'number', required: true },
          ]}
          onCreate={async (data) => {
            const created = await createPart(data)
            setParts((prev) => sortById([...prev, {
              id: created.id,
              car_version_id: Number(created.car_version_id ?? data.car_version_id),
              name: created.name ?? data.name,
              sku: created.sku ?? data.sku ?? '',
              description: created.description ?? data.description ?? '',
              image_url: created.image_url ?? data.image_url ?? '',
              price: Number(created.price ?? data.price),
              stock: Number(created.stock ?? data.stock),
              agotado: Boolean(created.agotado),
            }]))
          }}
          onUpdate={async (id, data) => {
            const updated = await updatePart(id, data)
            setParts((prev) => sortById(prev.map((item) => (
              item.id === id
                ? {
                  ...item,
                  car_version_id: Number(updated.car_version_id ?? data.car_version_id),
                  name: updated.name ?? data.name,
                  sku: updated.sku ?? data.sku ?? item.sku,
                  description: updated.description ?? data.description ?? item.description,
                  image_url: updated.image_url ?? data.image_url ?? item.image_url,
                  price: Number(updated.price ?? data.price),
                  stock: Number(updated.stock ?? data.stock),
                  agotado: Boolean(updated.agotado ?? item.agotado),
                }
                : item
            ))))
          }}
          onDelete={async (id) => {
            await deletePart(id)
            setParts((prev) => prev.filter((item) => item.id !== id))
          }}
        />
      )}
    </section>
  )
}

export default AdminPanel
