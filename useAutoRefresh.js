import { useEffect } from 'react'

export default function useAutoRefresh(refresh) {
  useEffect(() => {
    refresh()
  }, [refresh])
}
