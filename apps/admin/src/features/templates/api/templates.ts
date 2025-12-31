// API client for WhatsApp templates

const API_BASE = (import.meta.env?.VITE_API_URL as string) || 'http://localhost:3002'

export type TemplateStatus = 'draft' | 'pending' | 'approved' | 'rejected'
export type TemplateCategory = 'marketing' | 'utility' | 'authentication'

export interface TemplateButton {
  type: 'QUICK_REPLY' | 'URL' | 'PHONE_NUMBER'
  text: string
  url?: string
  phoneNumber?: string
}

export interface Template {
  id: string
  name: string
  category: TemplateCategory
  language: string
  header: string | null
  body: string
  footer: string | null
  buttons: TemplateButton[] | null
  status: TemplateStatus
  metaTemplateId: string | null
  rejectionReason: string | null
  createdAt: string
  updatedAt: string
}

export interface TemplatesResponse {
  data: Template[]
  meta: {
    total: number
    page: number
    limit: number
    hasMore: boolean
    timestamp: string
  }
}

export interface TemplateResponse {
  data: Template
}

export interface TemplatesQueryParams {
  page?: number
  limit?: number
  sort?: 'name' | 'category' | 'status' | 'created_at'
  order?: 'asc' | 'desc'
  search?: string
  status?: TemplateStatus
  category?: TemplateCategory
}

export interface CreateTemplateData {
  name: string
  category: TemplateCategory
  language?: string
  header?: string | null
  body: string
  footer?: string | null
  buttons?: TemplateButton[] | null
}

export interface UpdateTemplateData {
  name?: string
  category?: TemplateCategory
  language?: string
  header?: string | null
  body?: string
  footer?: string | null
  buttons?: TemplateButton[] | null
}

// Fetch all templates with pagination, sorting, filtering
export async function fetchTemplates(
  params: TemplatesQueryParams = {}
): Promise<TemplatesResponse> {
  const searchParams = new URLSearchParams()

  if (params.page) searchParams.set('page', String(params.page))
  if (params.limit) searchParams.set('limit', String(params.limit))
  if (params.sort) searchParams.set('sort', params.sort)
  if (params.order) searchParams.set('order', params.order)
  if (params.search) searchParams.set('search', params.search)
  if (params.status) searchParams.set('status', params.status)
  if (params.category) searchParams.set('category', params.category)

  const url = `${API_BASE}/api/admin/templates?${searchParams.toString()}`

  const response = await fetch(url, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch templates: ${response.statusText}`)
  }

  return response.json()
}

// Fetch single template by ID
export async function fetchTemplate(id: string): Promise<TemplateResponse> {
  const url = `${API_BASE}/api/admin/templates/${id}`

  const response = await fetch(url, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch template: ${response.statusText}`)
  }

  return response.json()
}

// Create new template
export async function createTemplate(data: CreateTemplateData): Promise<TemplateResponse> {
  const url = `${API_BASE}/api/admin/templates`

  const response = await fetch(url, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || `Failed to create template: ${response.statusText}`)
  }

  return response.json()
}

// Update template
export async function updateTemplate(
  id: string,
  data: UpdateTemplateData
): Promise<TemplateResponse> {
  const url = `${API_BASE}/api/admin/templates/${id}`

  const response = await fetch(url, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || `Failed to update template: ${response.statusText}`)
  }

  return response.json()
}

// Delete template
export async function deleteTemplate(id: string): Promise<{ data: { success: boolean; id: string } }> {
  const url = `${API_BASE}/api/admin/templates/${id}`

  const response = await fetch(url, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || `Failed to delete template: ${response.statusText}`)
  }

  return response.json()
}
