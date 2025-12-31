interface EmptyStateProps {
  hasSearch?: boolean
}

export function EmptyState({ hasSearch = false }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="text-4xl mb-4">📝</div>
      {hasSearch ? (
        <>
          <h3 className="text-lg font-medium">Nenhum template encontrado</h3>
          <p className="text-muted-foreground mt-1">
            Tente ajustar os filtros ou a busca
          </p>
        </>
      ) : (
        <>
          <h3 className="text-lg font-medium">Nenhum template cadastrado</h3>
          <p className="text-muted-foreground mt-1">
            Clique em "Novo Template" para criar o primeiro
          </p>
        </>
      )}
    </div>
  )
}
