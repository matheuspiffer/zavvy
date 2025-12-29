import { Settings, Share2, CalendarCheck, MessageCircle, ChevronRight } from 'lucide-react'

const steps = [
  {
    number: '1',
    icon: Settings,
    title: 'Configure seus serviços',
    description: 'Cadastre os serviços que você oferece, com duração e preço. Leva menos de 5 minutos.',
  },
  {
    number: '2',
    icon: Share2,
    title: 'Compartilhe seu link',
    description: 'Envie seu link de agendamento para clientes no WhatsApp, Instagram ou onde preferir.',
  },
  {
    number: '3',
    icon: CalendarCheck,
    title: 'Clientes agendam sozinhos',
    description: 'Sem troca de mensagens. Cliente escolhe horário disponível e confirma na hora.',
  },
  {
    number: '4',
    icon: MessageCircle,
    title: 'Zavvy cuida do resto',
    description: 'Confirmações, lembretes e reagendamentos automáticos pelo WhatsApp. Você só atende.',
  },
]

function StepCard({
  number,
  icon: Icon,
  title,
  description,
}: {
  number: string
  icon: typeof Settings
  title: string
  description: string
}) {
  return (
    <div className="flex flex-col items-center text-center p-6 rounded-xl bg-white border border-border-light hover:border-border hover:shadow-sm transition-all group">
      {/* Step Number Badge */}
      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center mb-4">
        <span className="text-white font-bold text-sm">{number}</span>
      </div>

      {/* Icon */}
      <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
        <Icon className="w-6 h-6 text-primary" />
      </div>

      {/* Content */}
      <h3 className="text-lg font-semibold text-text mb-2">{title}</h3>
      <p className="text-text-muted text-sm leading-relaxed">{description}</p>
    </div>
  )
}

export function HowItWorks() {
  return (
    <section id="como-funciona" aria-labelledby="como-funciona-heading" className="py-16 md:py-24 bg-gray-50">
      <div className="container">
        <h2 id="como-funciona-heading" className="text-2xl md:text-3xl font-semibold text-text text-center mb-4">
          Como funciona
        </h2>
        <p className="text-text-muted text-center mb-12 max-w-2xl mx-auto">
          Em 4 passos simples, você automatiza sua agenda
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              <StepCard {...step} />
              {/* Connecting arrow between steps (desktop only) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:flex absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <ChevronRight className="w-6 h-6 text-primary/40" aria-hidden="true" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
