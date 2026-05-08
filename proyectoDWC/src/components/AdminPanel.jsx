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
      setBrands(b)
      setModels(m)
      setYears(y)
      setVersions(v)
      setParts(p)
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
            onCreate={async (data) => { await createBrand(data); await reloadAll() }}
            onUpdate={async (id, data) => { await updateBrand(id, data); await reloadAll() }}
            onDelete={async (id) => { await deleteBrand(id); await reloadAll() }}
          />

          <EntityCrud
            title="Modelos"
            items={models}
            fields={[{ key: 'brand_id', label: 'Brand ID', required: true }, { key: 'name', label: 'Nombre', required: true }]}
            onCreate={async (data) => { await createModel(data); await reloadAll() }}
            onUpdate={async (id, data) => { await updateModel(id, data); await reloadAll() }}
            onDelete={async (id) => { await deleteModel(id); await reloadAll() }}
          />

          <EntityCrud
            title="Años"
            items={years}
            fields={[{ key: 'car_model_id', label: 'Model ID', required: true }, { key: 'year', label: 'Año', required: true }]}
            onCreate={async (data) => { await createYear(data); await reloadAll() }}
            onUpdate={async (id, data) => { await updateYear(id, data); await reloadAll() }}
            onDelete={async (id) => { await deleteYear(id); await reloadAll() }}
          />

          <EntityCrud
            title="Versiones"
            items={versions}
            fields={[{ key: 'car_year_id', label: 'Year ID', required: true }, { key: 'name', label: 'Nombre', required: true }]}
            onCreate={async (data) => { await createVersion(data); await reloadAll() }}
            onUpdate={async (id, data) => { await updateVersion(id, data); await reloadAll() }}
            onDelete={async (id) => { await deleteVersion(id); await reloadAll() }}
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
          onCreate={async (data) => { await createPart(data); await reloadAll() }}
          onUpdate={async (id, data) => { await updatePart(id, data); await reloadAll() }}
          onDelete={async (id) => { await deletePart(id); await reloadAll() }}
        />
      )}
    </section>
  )
}

export default AdminPanel
