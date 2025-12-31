import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  Button,
  Badge,
} from '@zavvy/ui'
import { StatusBadge } from './StatusBadge'
import { TemplatePreview } from './TemplatePreview'
import type { Template, TemplateCategory } from '../api/templates'

interface TemplateDetailDialogProps {
  template: Template
  open: boolean
  onOpenChange: (open: boolean) => void
  onEdit?: () => void
  onDelete?: () => void
}

const categoryLabels: Record<TemplateCategory, string> = {
  marketing: 'Marketing',
  utility: 'Utilidade',
  authentication: 'Autenticação',
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function TemplateDetailDialog({
  template,
  open,
  onOpenChange,
  onEdit,
  onDelete,
}: TemplateDetailDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {template.name}
            <StatusBadge status={template.status} />
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Details */}
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Categoria</h4>
              <p>{categoryLabels[template.category]}</p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Idioma</h4>
              <p>{template.language}</p>
            </div>

            {template.header && (
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Cabeçalho</h4>
                <p>{template.header}</p>
              </div>
            )}

            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Corpo</h4>
              <p className="whitespace-pre-wrap">{template.body}</p>
            </div>

            {template.footer && (
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Rodapé</h4>
                <p>{template.footer}</p>
              </div>
            )}

            {template.buttons && template.buttons.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Botões</h4>
                <div className="space-y-1 mt-1">
                  {template.buttons.map((btn, i) => (
                    <Badge key={i} variant="outline">
                      {btn.type}: {btn.text}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {template.metaTemplateId && (
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Meta Template ID</h4>
                <p className="font-mono text-sm">{template.metaTemplateId}</p>
              </div>
            )}

            {template.rejectionReason && (
              <div>
                <h4 className="text-sm font-medium text-red-600">Motivo da Rejeição</h4>
                <p className="text-red-600">{template.rejectionReason}</p>
              </div>
            )}

            <div className="flex gap-4 text-sm text-muted-foreground">
              <div>
                <span className="font-medium">Criado:</span> {formatDate(template.createdAt)}
              </div>
              <div>
                <span className="font-medium">Atualizado:</span> {formatDate(template.updatedAt)}
              </div>
            </div>
          </div>

          {/* Preview */}
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-2">
              Pré-visualização WhatsApp
            </h4>
            <TemplatePreview
              header={template.header}
              body={template.body}
              footer={template.footer}
              buttons={template.buttons}
            />
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Fechar
          </Button>
          {onEdit && (
            <Button variant="outline" onClick={onEdit}>
              Editar
            </Button>
          )}
          {onDelete && (
            <Button variant="destructive" onClick={onDelete}>
              Excluir
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
