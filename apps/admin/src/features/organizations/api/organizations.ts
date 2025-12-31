// API client for organizations

const API_BASE = (import.meta.env?.VITE_API_URL as string) || 'http://localhost:3002'

export type OrganizationStatus = 'active' | 'trial' | 'expired' | 'cancelled'

export interface Organization {
  id: string
  name: string
  email: string | null
  status: OrganizationStatus
  createdAt: string
}

export interface OrganizationsResponse {
  data: Organization[]
  meta: {
    total: number
    page: number
    limit: number
    hasMore: boolean
    timestamp: string
  }
}

export interface OrganizationsQueryParams {
  page?: number
  limit?: number
  sort?: 'name' | 'email' | 'status' | 'created_at'
  order?: 'asc' | 'desc'
  search?: string
}

export async function fetchOrganizations(
  params: OrganizationsQueryParams = {}
): Promise<OrganizationsResponse> {
  const searchParams = new URLSearchParams()

  if (params.page) searchParams.set('page', String(params.page))
  if (params.limit) searchParams.set('limit', String(params.limit))
  if (params.sort) searchParams.set('sort', params.sort)
  if (params.order) searchParams.set('order', params.order)
  if (params.search) searchParams.set('search', params.search)

  const url = `${API_BASE}/api/admin/organizations?${searchParams.toString()}`

  const response = await fetch(url, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch organizations: ${response.statusText}`)
  }

  return response.json()
}
