import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { fetchOrganizations, type OrganizationsQueryParams } from '../api/organizations'

export function useOrganizations(params: OrganizationsQueryParams = {}) {
  return useQuery({
    queryKey: ['organizations', params],
    queryFn: () => fetchOrganizations(params),
    placeholderData: keepPreviousData,
  })
}
