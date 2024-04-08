import { useCallback, useState } from 'react'

export default function useOpenStatus(defaultStatus = false) {
  const [status, setStatus] = useState(defaultStatus)

  const close = useCallback(() => {
    setStatus(false)
  }, [])

  const open = useCallback(() => {
    setStatus(true)
  }, [])

  const toggle = useCallback(() => {
    setStatus((s) => !s)
  }, [])

  return { status, close, open, toggle }
}
