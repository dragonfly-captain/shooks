import { useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { stringParams } from '../utils'

export function useToPage() {
  const history = useHistory()

  return useCallback((pathname, params) => {
    return history.push({ pathname: pathname, search: params })
  }, [history])
}
