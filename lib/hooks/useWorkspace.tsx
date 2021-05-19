import request from 'axios'
import { useEffect } from 'react'
import useSWR, { SWRConfiguration } from 'swr'
import { useDefaultCredentials } from './useDefaultCredentials'

interface UseWorkspaceProps {
  onErrorRetry?: SWRConfiguration['onErrorRetry']
}

function useWorkspace({ onErrorRetry }: Partial<UseWorkspaceProps> = {}) {
  const opts: SWRConfiguration = {}
  const fetcher = async (url: string) =>
    request.get(url).then((res) => res.data)
  if (onErrorRetry) {
    opts.onErrorRetry = onErrorRetry
  }
  const { data, error } = useSWR(
    '/api/tru/console/v0.1/workspaces/default',
    fetcher,
    opts,
  )
  const { setCredentials } = useDefaultCredentials()
  useEffect(() => {
    if (data?.credentials) {
      setCredentials({
        clientId: data.credentials.client_id,
        clientSecret: data.credentials.client_secret,
        dataResidency: data.data_residency,
      })
    }
  }, [data, setCredentials])
  return {
    workspace: data,
    loading: !error && !data,
    error,
  }
}

export default useWorkspace
