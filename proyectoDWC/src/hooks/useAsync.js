import { useState } from 'react'

// Hook personalizado para gestionar llamadas asíncronas
// Centraliza loading y data

export default function useAsync() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function run(asyncFunction) {
    try {
      setLoading(true)
      setError(null)
      const result = await asyncFunction()
      setData(result)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  return { data, loading, error, run }
}
