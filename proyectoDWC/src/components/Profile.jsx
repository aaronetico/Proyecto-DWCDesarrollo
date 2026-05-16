import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { updateMe } from '../api/backendApi'

const fields = [
  { key: 'name', label: 'Nombre' },
  { key: 'last_name', label: 'Apellidos' },
  { key: 'email', label: 'Email' },
  { key: 'birth_date', label: 'Fecha de nacimiento', type: 'date' },
  { key: 'country', label: 'País' },
  { key: 'city', label: 'Ciudad' },
]

function Profile({ isAuthenticated, user, onProfileUpdated }) {
  const [form, setForm] = useState({})
  const [editingField, setEditingField] = useState(null)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    setForm(user ?? {})
  }, [user])

  if (!isAuthenticated) return <Navigate to="/login" replace />

  async function saveField(field) {
    setError('')
    setSuccess('')
    try {
      const updated = await updateMe({ [field]: form[field] })
      onProfileUpdated(updated)
      setEditingField(null)
      setSuccess('Perfil actualizado')
    } catch {
      setError('No se pudo actualizar el perfil')
    }
  }

  return (
    <section>
      <h2>Mi perfil</h2>
      {error && <p className="form-error">{error}</p>}
      {success && <p className="in-stock">{success}</p>}

      <div className="profile-grid">
        {fields.map((field) => (
          <div className="profile-item" key={field.key}>
            <label>{field.label}</label>
            <input
              type={field.type ?? 'text'}
              value={form[field.key] ?? ''}
              disabled={editingField !== field.key}
              onChange={(event) => setForm((prev) => ({ ...prev, [field.key]: event.target.value }))}
            />
            {editingField === field.key ? (
              <button onClick={() => saveField(field.key)}>Guardar</button>
            ) : (
              <button onClick={() => setEditingField(field.key)}>Modificar</button>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

export default Profile
