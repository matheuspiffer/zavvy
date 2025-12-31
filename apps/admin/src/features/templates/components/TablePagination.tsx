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
  const totalPages = Math.ceil(total / limit)
  const start = (page - 1) * limit + 1
  const end = Math.min(page * limit, total)

  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm text-muted-foreground">
        Mostrando {start} a {end} de {total}
      </span>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
        >
          Anterior
        </Button>
        <span className="flex items-center px-2 text-sm">
          Página {page} de {totalPages}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(page + 1)}
          disabled={!hasMore}
        >
          Próxima
        </Button>
      </div>
    </div>
  )
}
