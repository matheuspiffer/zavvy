import { Badge, cn } from '@zavvy/ui'
import type { TemplateStatus } from '../api/templates'

interface StatusBadgeProps {
  status: TemplateStatus
}

const statusConfig: Record<TemplateStatus, { label: string; className: string }> = {
  draft: {
    label: 'Rascunho',
    className: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100 border-gray-200 dark:border-gray-600',
  },
  pending: {
    label: 'Pendente',
    className: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100 border-yellow-200 dark:border-yellow-800',
  },
  approved: {
    label: 'Aprovado',
    className: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 border-green-200 dark:border-green-800',
  },
  rejected: {
    label: 'Rejeitado',
    className: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100 border-red-200 dark:border-red-800',
  },
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status]

  return (
    <Badge variant="outline" className={cn(config.className)}>
      {config.label}
    </Badge>
  )
}
