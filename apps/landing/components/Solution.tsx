import { X, Check } from 'lucide-react'

const beforeItems = [
  'Mensagens a qualquer hora',
  'Conflitos de agenda',
  'Horas confirmando',
  'Faltas surpresa',
]

const afterItems = [
  'Agendamento automático 24h',
  'Calendário sempre atualizado',
  'Confirmações automáticas',
  'Lembretes que funcionam',
]

function BeforeItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 py-3 px-4 rounded-lg bg-gray-100">
      <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
        <X className="w-4 h-4 text-gray-500" />
      </div>
      <span className="text-text-muted line-through">{text}</span>
    </div>
  )
}

function AfterItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 py-3 px-4 rounded-lg bg-primary-light">
      <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
        <Check className="w-4 h-4 text-white" />
      </div>
      <span className="text-text font-medium">{text}</span>
    </div>
  )
}

export function Solution() {
  return (
    <section id="solucao" aria-labelledby="solucao-heading" className="py-16 md:py-24">
      <div className="container">
        <h2 id="solucao-heading" className="text-2xl md:text-3xl font-semibold text-text text-center mb-4">
          Com Zavvy, você só atende
        </h2>
        <p className="text-text-muted text-center mb-12 max-w-2xl mx-auto">
          Transforme o caos em tranquilidade. Seus clientes marcam sozinhos, você recebe tudo organizado.
        </p>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-4xl mx-auto">
          {/* Before Column */}
          <div>
            <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-4 text-center md:text-left">
              Antes
            </h3>
            <div className="space-y-3">
              {beforeItems.map((item) => (
                <BeforeItem key={item} text={item} />
              ))}
            </div>
          </div>

          {/* After Column */}
          <div>
            <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-4 text-center md:text-left">
              Com Zavvy
            </h3>
            <div className="space-y-3">
              {afterItems.map((item) => (
                <AfterItem key={item} text={item} />
              ))}
            </div>
          </div>
        </div>

        {/* Closing Statement */}
        <div className="mt-12 text-center">
          <p className="text-lg md:text-xl text-text max-w-2xl mx-auto leading-relaxed">
            Seus clientes marcam pelo link.{' '}
            <span className="text-primary font-semibold">Zavvy cuida do resto.</span>{' '}
            Você só aparece na hora.
          </p>
        </div>
      </div>
    </section>
  )
}
