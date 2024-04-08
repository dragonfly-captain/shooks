import { useCallback, useEffect, useState } from 'react'
import { uniqKeyFor } from '../utils'

export default function useForceUpdate() {
  const [key, setKey] = useState(0)

  const forceMount = useCallback(() => {
    setKey((x) => ++x)
  }, [])

  return { key, forceMount }
}

export function useKey(dep) {
  const [key, setKey] = useState(0)
  const forceUpdate = useCallback(() => setKey(uniqKeyFor()), [])

  useEffect(() => {
    forceUpdate()
  }, [dep, forceUpdate])

  return { key, forceMount: forceUpdate }
}
