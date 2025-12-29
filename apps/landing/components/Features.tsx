import {
  MessageCircle,
  Link,
  Calendar,
  Bell,
  RefreshCw,
  Users,
  BarChart3,
  Shield,
} from 'lucide-react'

const features = [
  {
    icon: MessageCircle,
    title: 'Assistente WhatsApp',
    description: 'Gerencie tudo pelo WhatsApp. Consulte agenda, crie agendamentos e mais.',
  },
  {
    icon: Link,
    title: 'Link de agendamento',
    description: 'Seus clientes agendam sozinhos, 24 horas por dia, sem troca de mensagens.',
  },
  {
    icon: Calendar,
    title: 'Sincronização com Google Calendar',
    description: 'Sua agenda sempre atualizada. Eventos externos bloqueiam horários automaticamente.',
  },
  {
    icon: Bell,
    title: 'Lembretes automáticos',
    description: 'Clientes recebem lembretes 24h e 1h antes. Menos faltas, mais tranquilidade.',
  },
  {
    icon: RefreshCw,
    title: 'Confirmações e reagendamentos',
    description: 'Confirmação automática. Cliente pode reagendar sem te incomodar.',
  },
  {
    icon: Users,
    title: 'Gestão de clientes',
    description: 'Histórico completo de cada cliente. Saiba quem são seus melhores clientes.',
  },
  {
    icon: BarChart3,
    title: 'Relatórios simples',
    description: 'Veja quantos agendamentos, faltas e cancelamentos você teve.',
  },
  {
    icon: Shield,
    title: 'Seguro e confiável',
    description: 'Seus dados protegidos. Backup automático. Sem perder informações.',
  },
]

function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof MessageCircle
  title: string
  description: string
}) {
  return (
    <div className="flex flex-col items-center text-center p-6 rounded-xl bg-white border border-border-light hover:border-border hover:shadow-sm transition-all group">
      <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <h3 className="text-lg font-semibold text-text mb-2">{title}</h3>
      <p className="text-text-muted text-sm leading-relaxed">{description}</p>
    </div>
  )
}

export function Features() {
  return (
    <section id="funcionalidades" aria-labelledby="funcionalidades-heading" className="py-16 md:py-24">
      <div className="container">
        <h2 id="funcionalidades-heading" className="text-2xl md:text-3xl font-semibold text-text text-center mb-4">
          Funcionalidades
        </h2>
        <p className="text-text-muted text-center mb-12 max-w-2xl mx-auto">
          Tudo que você precisa para automatizar sua agenda
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  )
}
