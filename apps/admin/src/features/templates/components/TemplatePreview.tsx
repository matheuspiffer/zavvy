import { cn } from '@zavvy/ui'
import type { TemplateButton } from '../api/templates'

interface TemplatePreviewProps {
  header?: string | null
  body: string
  footer?: string | null
  buttons?: TemplateButton[] | null
  className?: string
}

// Highlight variables like {{1}}, {{2}}
function highlightVariables(text: string): React.ReactNode {
  const parts = text.split(/(\{\{\d+\}\})/g)
  return parts.map((part, index) => {
    if (part.match(/^\{\{\d+\}\}$/)) {
      return (
        <span
          key={index}
          className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-1 rounded font-mono text-sm"
        >
          {part}
        </span>
      )
    }
    return part
  })
}

export function TemplatePreview({
  header,
  body,
  footer,
  buttons,
  className,
}: TemplatePreviewProps) {
  return (
    <div
      className={cn(
        'bg-[#e5ddd5] dark:bg-gray-800 p-4 rounded-lg max-w-sm',
        className
      )}
    >
      {/* WhatsApp message bubble */}
      <div className="bg-white dark:bg-gray-700 rounded-lg shadow-sm p-3 space-y-2">
        {/* Header */}
        {header && (
          <div className="font-semibold text-sm">{highlightVariables(header)}</div>
        )}

        {/* Body */}
        <div className="text-sm whitespace-pre-wrap">{highlightVariables(body)}</div>

        {/* Footer */}
        {footer && (
          <div className="text-xs text-muted-foreground">{highlightVariables(footer)}</div>
        )}

        {/* Buttons */}
        {buttons && buttons.length > 0 && (
          <div className="border-t pt-2 mt-2 space-y-1">
            {buttons.map((button, index) => (
              <div
                key={index}
                className="text-center text-blue-600 dark:text-blue-400 text-sm py-1 border rounded"
              >
                {button.type === 'URL' && '🔗 '}
                {button.type === 'PHONE_NUMBER' && '📞 '}
                {button.text}
              </div>
            ))}
          </div>
        )}

        {/* Timestamp */}
        <div className="text-right text-xs text-muted-foreground">
          {new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  )
}
