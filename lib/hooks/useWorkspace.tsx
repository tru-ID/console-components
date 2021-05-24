import request from 'axios'
import { useEffect } from 'react'
import useSWR, { SWRConfiguration } from 'swr'
import { useDefaultCredentials } from './useDefaultCredentials'

export interface WorkspaceResponse {
  _embedded: {
    balance: {
      amount_available: number
      amount_reserved: number
      currency: string
    }
  }
}

function useWorkspace(opts?: SWRConfiguration) {
  const fetcher = async (url: string) =>
    request.get(url).then((res) => res.data)
  const { data, error } = useSWR(
    '/api/tru/console/v0.1/workspaces/default',
    fetcher,
    opts,
  )
  const credentials = useDefaultCredentials()
  useEffect(() => {
    if (data?.credentials) {
      credentials!.setCredentials({
        clientId: data.credentials.client_id,
        clientSecret: data.credentials.client_secret,
        dataResidency: data.data_residency,
      })
    }
  }, [data, credentials])
  return {
    workspace: data,
    loading: !error && !data,
    error,
  }
}

export default useWorkspace
