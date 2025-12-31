// Components
export { TemplateTable } from './components/TemplateTable'
export { TemplateForm } from './components/TemplateForm'
export { TemplatePreview } from './components/TemplatePreview'
export { StatusBadge } from './components/StatusBadge'
export { CreateTemplateDialog } from './components/CreateTemplateDialog'
export { EditTemplateDialog } from './components/EditTemplateDialog'
export { TemplateDetailDialog } from './components/TemplateDetailDialog'
export { DeleteConfirmDialog } from './components/DeleteConfirmDialog'
export { SearchInput } from './components/SearchInput'
export { TablePagination } from './components/TablePagination'
export { EmptyState } from './components/EmptyState'
export { ErrorState } from './components/ErrorState'

// Hooks
export {
  useTemplates,
  useTemplate,
  useCreateTemplate,
  useUpdateTemplate,
  useDeleteTemplate,
  templateKeys,
} from './hooks/useTemplates'

// API
export {
  fetchTemplates,
  fetchTemplate,
  createTemplate,
  updateTemplate,
  deleteTemplate,
} from './api/templates'

// Types
export type {
  Template,
  TemplateStatus,
  TemplateCategory,
  TemplateButton,
  TemplatesResponse,
  TemplateResponse,
  TemplatesQueryParams,
  CreateTemplateData,
  UpdateTemplateData,
} from './api/templates'
