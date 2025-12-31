import { Badge } from '@zavvy/ui'
import { cn } from '@zavvy/ui'
import type { OrganizationStatus } from '../api/organizations'

interface StatusBadgeProps {
  status: OrganizationStatus
}

const statusConfig: Record<OrganizationStatus, { label: string; className: string }> = {
  active: {
    label: 'Ativo',
    className: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 border-green-200 dark:border-green-800',
  },
  trial: {
    label: 'Trial',
    className: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 border-blue-200 dark:border-blue-800',
  },
  expired: {
    label: 'Expirado',
    className: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100 border-yellow-200 dark:border-yellow-800',
  },
  cancelled: {
    label: 'Cancelado',
    className: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100 border-gray-200 dark:border-gray-600',
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
