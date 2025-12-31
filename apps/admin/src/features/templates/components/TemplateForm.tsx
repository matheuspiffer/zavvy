import { useState, type FormEvent } from 'react'
import {
  Input,
  Textarea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Button,
  Label,
  Alert,
  AlertDescription,
} from '@zavvy/ui'
import { TemplatePreview } from './TemplatePreview'
import type { Template, CreateTemplateData, TemplateCategory, TemplateButton } from '../api/templates'

type ButtonType = 'QUICK_REPLY' | 'URL' | 'PHONE_NUMBER'

interface TemplateFormProps {
  defaultValues?: Partial<Template>
  onSubmit: (data: CreateTemplateData) => Promise<void>
  onCancel: () => void
  isLoading?: boolean
  submitLabel?: string
}

// Validate template name
function validateName(name: string): string | null {
  if (!name.trim()) return 'Nome é obrigatório'
  if (name.length > 512) return 'Máximo 512 caracteres'
  if (!/^[a-z0-9_]+$/.test(name)) return 'Apenas letras minúsculas, números e underscore'
  return null
}

// Validate body
function validateBody(body: string): string | null {
  if (!body.trim()) return 'Corpo é obrigatório'
  if (body.length > 1024) return 'Máximo 1024 caracteres'
  return null
}

// Validate buttons
function validateButtons(buttons: TemplateButton[]): string | null {
  if (buttons.length > 3) return 'Máximo 3 botões'
  for (const [i, btn] of buttons.entries()) {
    if (!btn.text.trim()) return `Botão ${i + 1}: texto é obrigatório`
    if (btn.text.length > 25) return `Botão ${i + 1}: texto máximo 25 caracteres`
    if (btn.type === 'URL' && !btn.url) return `Botão ${i + 1}: URL é obrigatória`
    if (btn.type === 'PHONE_NUMBER' && !btn.phoneNumber) return `Botão ${i + 1}: telefone é obrigatório`
  }
  return null
}

export function TemplateForm({
  defaultValues,
  onSubmit,
  onCancel,
  isLoading = false,
  submitLabel = 'Salvar',
}: TemplateFormProps) {
  const [name, setName] = useState(defaultValues?.name || '')
  const [category, setCategory] = useState<TemplateCategory | ''>(defaultValues?.category || '')
  const [language, setLanguage] = useState(defaultValues?.language || 'pt_BR')
  const [header, setHeader] = useState(defaultValues?.header || '')
  const [body, setBody] = useState(defaultValues?.body || '')
  const [footer, setFooter] = useState(defaultValues?.footer || '')
  const [buttons, setButtons] = useState<TemplateButton[]>(defaultValues?.buttons || [])
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitError, setSubmitError] = useState<string | null>(null)

  const addButton = () => {
    if (buttons.length >= 3) return
    setButtons([...buttons, { type: 'QUICK_REPLY', text: '' }])
  }

  const removeButton = (index: number) => {
    setButtons(buttons.filter((_, i) => i !== index))
  }

  const updateButton = (index: number, updates: Partial<TemplateButton>) => {
    setButtons(buttons.map((btn, i) => (i === index ? { ...btn, ...updates } : btn)))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSubmitError(null)

    // Validate
    const newErrors: Record<string, string> = {}

    const nameError = validateName(name)
    if (nameError) newErrors.name = nameError

    if (!category) newErrors.category = 'Categoria é obrigatória'

    const bodyError = validateBody(body)
    if (bodyError) newErrors.body = bodyError

    if (header && header.length > 60) newErrors.header = 'Máximo 60 caracteres'
    if (footer && footer.length > 60) newErrors.footer = 'Máximo 60 caracteres'

    const buttonsError = validateButtons(buttons)
    if (buttonsError) newErrors.buttons = buttonsError

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setErrors({})

    try {
      await onSubmit({
        name,
        category: category as TemplateCategory,
        language,
        header: header || null,
        body,
        footer: footer || null,
        buttons: buttons.length > 0 ? buttons : null,
      })
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Erro ao salvar template')
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {submitError && (
          <Alert variant="destructive">
            <AlertDescription>{submitError}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-2">
          <Label htmlFor="name">Nome do Template</Label>
          <Input
            id="name"
            placeholder="meu_template_exemplo"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isLoading}
          />
          <p className="text-sm text-muted-foreground">
            Apenas letras minúsculas, números e underscore
          </p>
          {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Categoria</Label>
          <Select
            value={category}
            onValueChange={(value) => setCategory(value as TemplateCategory)}
            disabled={isLoading}
          >
            <SelectTrigger id="category">
              <SelectValue placeholder="Selecione a categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="marketing">Marketing</SelectItem>
              <SelectItem value="utility">Utilidade</SelectItem>
              <SelectItem value="authentication">Autenticação</SelectItem>
            </SelectContent>
          </Select>
          {errors.category && <p className="text-sm text-red-600">{errors.category}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="language">Idioma</Label>
          <Select value={language} onValueChange={setLanguage} disabled={isLoading}>
            <SelectTrigger id="language">
              <SelectValue placeholder="Selecione o idioma" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pt_BR">Português (Brasil)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="header">Cabeçalho (opcional)</Label>
          <Input
            id="header"
            placeholder="Título da mensagem"
            value={header}
            onChange={(e) => setHeader(e.target.value)}
            disabled={isLoading}
          />
          <p className="text-sm text-muted-foreground">Máximo 60 caracteres</p>
          {errors.header && <p className="text-sm text-red-600">{errors.header}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="body">Corpo da Mensagem</Label>
          <Textarea
            id="body"
            placeholder="Olá {{1}}, seu agendamento para {{2}} foi confirmado!"
            className="min-h-[120px]"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            disabled={isLoading}
          />
          <p className="text-sm text-muted-foreground">
            Use {'{{1}}'}, {'{{2}}'}, etc. para variáveis. Máximo 1024 caracteres.
          </p>
          {errors.body && <p className="text-sm text-red-600">{errors.body}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="footer">Rodapé (opcional)</Label>
          <Input
            id="footer"
            placeholder="Zavvy - Agendamento Inteligente"
            value={footer}
            onChange={(e) => setFooter(e.target.value)}
            disabled={isLoading}
          />
          <p className="text-sm text-muted-foreground">Máximo 60 caracteres</p>
          {errors.footer && <p className="text-sm text-red-600">{errors.footer}</p>}
        </div>

        {/* Buttons section */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Botões (opcional)</Label>
            {buttons.length < 3 && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addButton}
                disabled={isLoading}
              >
                + Adicionar
              </Button>
            )}
          </div>
          <p className="text-sm text-muted-foreground">Máximo 3 botões, 25 caracteres cada</p>

          {buttons.map((btn, index) => (
            <div key={index} className="border rounded-lg p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Botão {index + 1}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeButton(index)}
                  disabled={isLoading}
                  className="text-red-600 hover:text-red-700"
                >
                  Remover
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label className="text-xs">Tipo</Label>
                  <Select
                    value={btn.type}
                    onValueChange={(value: ButtonType) => updateButton(index, { type: value })}
                    disabled={isLoading}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="QUICK_REPLY">Resposta Rápida</SelectItem>
                      <SelectItem value="URL">Link (URL)</SelectItem>
                      <SelectItem value="PHONE_NUMBER">Telefone</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-xs">Texto</Label>
                  <Input
                    placeholder="Texto do botão"
                    value={btn.text}
                    onChange={(e) => updateButton(index, { text: e.target.value })}
                    disabled={isLoading}
                    maxLength={25}
                  />
                </div>
              </div>

              {btn.type === 'URL' && (
                <div>
                  <Label className="text-xs">URL</Label>
                  <Input
                    placeholder="https://exemplo.com"
                    value={btn.url || ''}
                    onChange={(e) => updateButton(index, { url: e.target.value })}
                    disabled={isLoading}
                  />
                </div>
              )}

              {btn.type === 'PHONE_NUMBER' && (
                <div>
                  <Label className="text-xs">Telefone</Label>
                  <Input
                    placeholder="+5511999999999"
                    value={btn.phoneNumber || ''}
                    onChange={(e) => updateButton(index, { phoneNumber: e.target.value })}
                    disabled={isLoading}
                  />
                </div>
              )}
            </div>
          ))}

          {errors.buttons && <p className="text-sm text-red-600">{errors.buttons}</p>}
        </div>

        <div className="flex gap-2 pt-4">
          <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Salvando...' : submitLabel}
          </Button>
        </div>
      </form>

      {/* Preview */}
      <div>
        <h3 className="text-sm font-medium mb-2">Pré-visualização</h3>
        <TemplatePreview
          header={header || null}
          body={body || 'Digite o corpo da mensagem...'}
          footer={footer || null}
          buttons={buttons.length > 0 ? buttons : null}
        />
      </div>
    </div>
  )
}
