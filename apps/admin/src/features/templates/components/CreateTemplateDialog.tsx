import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  toast,
} from '@zavvy/ui'
import { TemplateForm } from './TemplateForm'
import { useCreateTemplate } from '../hooks/useTemplates'
import type { CreateTemplateData } from '../api/templates'

interface CreateTemplateDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateTemplateDialog({ open, onOpenChange }: CreateTemplateDialogProps) {
  const createMutation = useCreateTemplate()

  const handleSubmit = async (data: CreateTemplateData) => {
    try {
      await createMutation.mutateAsync(data)
      toast.success('Template criado com sucesso!')
      onOpenChange(false)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Erro ao criar template')
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Criar Novo Template</DialogTitle>
        </DialogHeader>
        <TemplateForm
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
          isLoading={createMutation.isPending}
          submitLabel="Criar Template"
        />
      </DialogContent>
    </Dialog>
  )
}
