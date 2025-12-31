import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  toast,
} from '@zavvy/ui'
import { TemplateForm } from './TemplateForm'
import { useUpdateTemplate } from '../hooks/useTemplates'
import type { Template, CreateTemplateData } from '../api/templates'

interface EditTemplateDialogProps {
  template: Template
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EditTemplateDialog({
  template,
  open,
  onOpenChange,
}: EditTemplateDialogProps) {
  const updateMutation = useUpdateTemplate()

  const handleSubmit = async (data: CreateTemplateData) => {
    try {
      await updateMutation.mutateAsync({ id: template.id, data })
      toast.success('Template atualizado com sucesso!')
      onOpenChange(false)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Erro ao atualizar template')
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Template</DialogTitle>
        </DialogHeader>
        <TemplateForm
          defaultValues={template}
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
          isLoading={updateMutation.isPending}
          submitLabel="Salvar Alterações"
        />
      </DialogContent>
    </Dialog>
  )
}
