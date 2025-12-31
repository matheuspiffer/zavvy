import { useState, useCallback } from 'react'
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Skeleton,
  toast,
} from '@zavvy/ui'
import { useTemplates, useDeleteTemplate } from '../hooks/useTemplates'
import { StatusBadge } from './StatusBadge'
import { SearchInput } from './SearchInput'
import { TablePagination } from './TablePagination'
import { EmptyState } from './EmptyState'
import { ErrorState } from './ErrorState'
import { CreateTemplateDialog } from './CreateTemplateDialog'
import { EditTemplateDialog } from './EditTemplateDialog'
import { TemplateDetailDialog } from './TemplateDetailDialog'
import { DeleteConfirmDialog } from './DeleteConfirmDialog'
import type { TemplatesQueryParams, Template, TemplateStatus, TemplateCategory } from '../api/templates'

type SortField = 'name' | 'category' | 'status' | 'created_at'

// Format date to DD/MM/YYYY (Brazil locale)
function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

// Category labels in Portuguese
const categoryLabels: Record<TemplateCategory, string> = {
  marketing: 'Marketing',
  utility: 'Utilidade',
  authentication: 'Autenticação',
}

// Table skeleton component
function TableSkeleton() {
  return (
    <div className="space-y-2">
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={i} className="h-12 w-full" />
      ))}
    </div>
  )
}

export function TemplateTable() {
  const [params, setParams] = useState<TemplatesQueryParams>({
    page: 1,
    limit: 20,
    sort: 'created_at',
    order: 'desc',
    search: '',
  })

  // Dialog states
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null)
  const [viewingTemplate, setViewingTemplate] = useState<Template | null>(null)
  const [deletingTemplate, setDeletingTemplate] = useState<Template | null>(null)

  const { data, isLoading, isError, error, refetch } = useTemplates(params)
  const deleteTemplateMutation = useDeleteTemplate()

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

  const handleStatusFilter = useCallback((status: string) => {
    setParams((prev) => ({
      ...prev,
      status: status === 'all' ? undefined : (status as TemplateStatus),
      page: 1,
    }))
  }, [])

  const handleCategoryFilter = useCallback((category: string) => {
    setParams((prev) => ({
      ...prev,
      category: category === 'all' ? undefined : (category as TemplateCategory),
      page: 1,
    }))
  }, [])

  const handleDelete = async () => {
    if (!deletingTemplate) return
    try {
      await deleteTemplateMutation.mutateAsync(deletingTemplate.id)
      toast.success('Template excluído com sucesso!')
      setDeletingTemplate(null)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Erro ao excluir template')
    }
  }

  const getSortIndicator = (field: SortField) => {
    if (params.sort !== field) return null
    return params.order === 'asc' ? ' ↑' : ' ↓'
  }

  // Check if template can be edited (only draft)
  const canEdit = (template: Template) => template.status === 'draft'

  // Check if template can be deleted (only draft or rejected)
  const canDelete = (template: Template) =>
    template.status === 'draft' || template.status === 'rejected'

  // Error state
  if (isError) {
    return (
      <ErrorState
        message={error instanceof Error ? error.message : 'Falha ao carregar templates'}
        onRetry={() => refetch()}
      />
    )
  }

  return (
    <div className="space-y-4">
      {/* Header with search, filters and create button */}
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-2 items-center">
          <SearchInput
            value={params.search || ''}
            onChange={handleSearch}
            placeholder="Buscar por nome..."
          />

          {/* Status filter */}
          <Select value={params.status || 'all'} onValueChange={handleStatusFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="draft">Rascunho</SelectItem>
              <SelectItem value="pending">Pendente</SelectItem>
              <SelectItem value="approved">Aprovado</SelectItem>
              <SelectItem value="rejected">Rejeitado</SelectItem>
            </SelectContent>
          </Select>

          {/* Category filter */}
          <Select value={params.category || 'all'} onValueChange={handleCategoryFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
              <SelectItem value="utility">Utilidade</SelectItem>
              <SelectItem value="authentication">Autenticação</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          {data && (
            <span className="text-sm text-muted-foreground">
              {data.meta.total} {data.meta.total === 1 ? 'template' : 'templates'}
            </span>
          )}
          <Button onClick={() => setIsCreateOpen(true)}>Novo Template</Button>
        </div>
      </div>

      {/* Loading state */}
      {isLoading && <TableSkeleton />}

      {/* Empty state */}
      {!isLoading && data?.data.length === 0 && (
        <EmptyState hasSearch={!!params.search || !!params.status || !!params.category} />
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
                  onClick={() => handleSort('category')}
                >
                  Categoria{getSortIndicator('category')}
                </TableHead>
                <TableHead>Idioma</TableHead>
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
                <TableHead className="w-[70px]">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.data.map((template) => (
                <TableRow key={template.id} className="cursor-pointer hover:bg-muted/30">
                  <TableCell
                    className="font-medium"
                    onClick={() => setViewingTemplate(template)}
                  >
                    {template.name}
                  </TableCell>
                  <TableCell onClick={() => setViewingTemplate(template)}>
                    {categoryLabels[template.category]}
                  </TableCell>
                  <TableCell
                    className="text-muted-foreground"
                    onClick={() => setViewingTemplate(template)}
                  >
                    {template.language}
                  </TableCell>
                  <TableCell onClick={() => setViewingTemplate(template)}>
                    <StatusBadge status={template.status} />
                  </TableCell>
                  <TableCell
                    className="text-muted-foreground"
                    onClick={() => setViewingTemplate(template)}
                  >
                    {formatDate(template.createdAt)}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          •••
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setViewingTemplate(template)}>
                          Visualizar
                        </DropdownMenuItem>
                        {canEdit(template) && (
                          <DropdownMenuItem onClick={() => setEditingTemplate(template)}>
                            Editar
                          </DropdownMenuItem>
                        )}
                        {canDelete(template) && (
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => setDeletingTemplate(template)}
                          >
                            Excluir
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
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

      {/* Create Dialog */}
      <CreateTemplateDialog open={isCreateOpen} onOpenChange={setIsCreateOpen} />

      {/* Edit Dialog */}
      {editingTemplate && (
        <EditTemplateDialog
          template={editingTemplate}
          open={!!editingTemplate}
          onOpenChange={(open) => !open && setEditingTemplate(null)}
        />
      )}

      {/* Detail Dialog */}
      {viewingTemplate && (
        <TemplateDetailDialog
          template={viewingTemplate}
          open={!!viewingTemplate}
          onOpenChange={(open) => !open && setViewingTemplate(null)}
          onEdit={canEdit(viewingTemplate) ? () => {
            setViewingTemplate(null)
            setEditingTemplate(viewingTemplate)
          } : undefined}
          onDelete={canDelete(viewingTemplate) ? () => {
            setViewingTemplate(null)
            setDeletingTemplate(viewingTemplate)
          } : undefined}
        />
      )}

      {/* Delete Confirmation */}
      <DeleteConfirmDialog
        open={!!deletingTemplate}
        onOpenChange={(open) => !open && setDeletingTemplate(null)}
        onConfirm={handleDelete}
        templateName={deletingTemplate?.name || ''}
        isLoading={deleteTemplateMutation.isPending}
      />
    </div>
  )
}
