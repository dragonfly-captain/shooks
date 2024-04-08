import { useEffect, useRef } from 'react'

export function useOnClickOutside(handler) {
  const targetRef = useRef()
  useEffect(() => {
    const listener = (event) => {
      if (!targetRef.current || targetRef.current.contains(event.target)) return
      handler(event)
    }

    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [handler])

  return { targetRef }
}
