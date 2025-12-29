import { MessageSquare, Calendar, Clock, AlertTriangle } from 'lucide-react'

const painPoints = [
  {
    icon: MessageSquare,
    title: 'Mensagens perdidas',
    description: 'Clientes mandam mensagem a qualquer hora. Você esquece, perde, ou demora pra responder.',
  },
  {
    icon: Calendar,
    title: 'Conflitos de horário',
    description: 'Agenda no papel, no celular, na cabeça. Marcou dois clientes no mesmo horário sem querer.',
  },
  {
    icon: Clock,
    title: 'Tempo desperdiçado',
    description: 'Horas por semana só confirmando, lembrando e reagendando. Tempo que você não tem.',
  },
  {
    icon: AlertTriangle,
    title: 'Faltas e cancelamentos',
    description: 'Cliente esquece, não avisa, você fica esperando. Horário perdido, dinheiro perdido.',
  },
]

function PainPointCard({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof MessageSquare
  title: string
  description: string
}) {
  return (
    <div className="flex flex-col items-center text-center p-6 rounded-xl bg-white border border-border-light hover:border-border hover:shadow-sm transition-all">
      <div className="w-14 h-14 rounded-xl bg-primary-light flex items-center justify-center mb-4">
        <Icon className="w-7 h-7 text-primary" />
      </div>
      <h3 className="text-lg font-semibold text-text mb-2">{title}</h3>
      <p className="text-text-muted text-sm leading-relaxed">{description}</p>
    </div>
  )
}

export function PainPoints() {
  return (
    <section id="problemas" aria-labelledby="problemas-heading" className="py-16 md:py-24 bg-gray-50">
      <div className="container">
        <h2 id="problemas-heading" className="text-2xl md:text-3xl font-semibold text-text text-center mb-4">
          O caos de agendar pelo WhatsApp
        </h2>
        <p className="text-text-muted text-center mb-12 max-w-2xl mx-auto">
          Se você se identifica com pelo menos um desses problemas, Zavvy foi feito pra você.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {painPoints.map((point) => (
            <PainPointCard key={point.title} {...point} />
          ))}
        </div>
      </div>
    </section>
  )
}
