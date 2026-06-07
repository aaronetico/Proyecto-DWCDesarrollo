import { useEffect, useState } from 'react'
import { CATALOG_UPDATED_EVENT } from '../api/cache'

export default function useCatalogRefresh(refreshFn, deps = []) {
  const [tick, setTick] = useState(0)

  useEffect(() => {
    function handleUpdate() {
      setTick((value) => value + 1)
    }

    window.addEventListener(CATALOG_UPDATED_EVENT, handleUpdate)
    return () => window.removeEventListener(CATALOG_UPDATED_EVENT, handleUpdate)
  }, [])

  useEffect(() => {
    if (typeof refreshFn === 'function') {
      refreshFn()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tick, ...deps])
}
