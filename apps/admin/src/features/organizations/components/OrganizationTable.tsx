import { useState, useCallback } from 'react'
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@zavvy/ui'
import { useOrganizations } from '../hooks/useOrganizations'
import { StatusBadge } from './StatusBadge'
import { SearchInput } from './SearchInput'
import { TablePagination } from './TablePagination'
import { EmptyState } from './EmptyState'
import { ErrorState } from './ErrorState'
import { TableSkeleton } from './TableSkeleton'
import type { OrganizationsQueryParams } from '../api/organizations'

type SortField = 'name' | 'email' | 'status' | 'created_at'

// Format date to DD/MM/YYYY (Brazil locale)
function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

export function OrganizationTable() {
  const [params, setParams] = useState<OrganizationsQueryParams>({
    page: 1,
    limit: 20,
    sort: 'created_at',
    order: 'desc',
    search: '',
  })

  const { data, isLoading, isError, error, refetch } = useOrganizations(params)

  const handleSearch = useCallback((search: string) => {
    setParams((prev) => ({ ...prev, search, page: 1 }))
  }, [])

  const handleSort = useCallback((field: SortField) => {
    setParams((prev) => ({
      ...prev,
      sort: field,
      order: prev.sort === field && prev.order === 'asc' ? 'desc' : 'asc',
      page: 1,
    }))
  }, [])

  const handlePageChange = useCallback((page: number) => {
    setParams((prev) => ({ ...prev, page }))
  }, [])

  const getSortIndicator = (field: SortField) => {
    if (params.sort !== field) return null
    return params.order === 'asc' ? ' ↑' : ' ↓'
  }

  // Error state - log for debugging (AC7)
  if (isError) {
    // Log error for debugging
    console.error('[OrganizationTable] Failed to load organizations:', error)

    return (
      <ErrorState
        message={error instanceof Error ? error.message : 'Falha ao carregar organizações'}
        onRetry={() => refetch()}
      />
    )
  }

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="flex justify-between items-center">
        <SearchInput
          value={params.search || ''}
          onChange={handleSearch}
          placeholder="Buscar por nome ou email..."
        />
        {data && (
          <span className="text-sm text-muted-foreground">
            {data.meta.total} {data.meta.total === 1 ? 'organização' : 'organizações'}
          </span>
        )}
      </div>

      {/* Loading state */}
      {isLoading && <TableSkeleton />}

      {/* Empty state */}
      {!isLoading && data?.data.length === 0 && (
        <EmptyState hasSearch={!!params.search} />
      )}

      {/* Table */}
      {!isLoading && data && data.data.length > 0 && (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleSort('name')}
                >
                  Nome{getSortIndicator('name')}
                </TableHead>
                <TableHead
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleSort('email')}
                >
                  Email{getSortIndicator('email')}
                </TableHead>
                <TableHead
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleSort('status')}
                >
                  Status{getSortIndicator('status')}
                </TableHead>
                <TableHead
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleSort('created_at')}
                >
                  Criado{getSortIndicator('created_at')}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.data.map((org) => (
                <TableRow key={org.id}>
                  <TableCell className="font-medium">{org.name}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {org.email || '—'}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={org.status} />
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatDate(org.createdAt)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          <TablePagination
            page={data.meta.page}
            limit={data.meta.limit}
            total={data.meta.total}
            hasMore={data.meta.hasMore}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  )
}
