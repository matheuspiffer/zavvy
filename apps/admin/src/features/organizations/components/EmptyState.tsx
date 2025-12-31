interface EmptyStateProps {
  hasSearch?: boolean
}

export function EmptyState({ hasSearch = false }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="text-4xl mb-4">📭</div>
      {hasSearch ? (
        <>
          <h3 className="text-lg font-medium mb-2">Nenhum resultado encontrado</h3>
          <p className="text-muted-foreground">
            Tente ajustar sua busca para encontrar o que procura.
          </p>
        </>
      ) : (
        <>
          <h3 className="text-lg font-medium mb-2">Nenhuma organização ainda</h3>
          <p className="text-muted-foreground">
            As organizações aparecerão aqui quando os profissionais se cadastrarem.
          </p>
        </>
      )}
    </div>
  )
}
