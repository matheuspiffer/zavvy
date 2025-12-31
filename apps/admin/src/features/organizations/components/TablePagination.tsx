import { Button } from '@zavvy/ui'

interface TablePaginationProps {
  page: number
  limit: number
  total: number
  hasMore: boolean
  onPageChange: (page: number) => void
}

export function TablePagination({
  page,
  limit,
  total,
  hasMore,
  onPageChange,
}: TablePaginationProps) {
  const start = (page - 1) * limit + 1
  const end = Math.min(page * limit, total)

  return (
    <div className="flex items-center justify-between px-2 py-4">
      <p className="text-sm text-muted-foreground">
        Exibindo {start}-{end} de {total} {total === 1 ? 'organização' : 'organizações'}
      </p>

      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
        >
          Anterior
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(page + 1)}
          disabled={!hasMore}
        >
          Próximo
        </Button>
      </div>
    </div>
  )
}
