import { useCallback, useState } from 'react'

// Hook personalizado para gestionar llamadas asíncronas
// Centraliza loading y data

export default function useAsync() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const run = useCallback(async (asyncFunction) => {
    try {
      setLoading(true)
      setError(null)
      const result = await asyncFunction()
      setData(result)
      return result
    } catch (err) {
      setError(err)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  return { data, loading, error, run }
}
