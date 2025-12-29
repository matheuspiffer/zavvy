'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const faqItems = [
  {
    question: 'Quanto custa a Zavvy?',
    answer:
      'O plano Starter custa R$49/mês. Você pode testar grátis por 7 dias, sem precisar de cartão de crédito. Cancele quando quiser, sem fidelidade.',
  },
  {
    question: 'Preciso ter WhatsApp Business?',
    answer:
      'Não! A Zavvy usa sua própria infraestrutura de WhatsApp Business. Você só precisa de um número de WhatsApp pessoal para receber as notificações e gerenciar sua agenda.',
  },
  {
    question: 'Como funciona a integração com Google Calendar?',
    answer:
      'Ao conectar seu Google Calendar, a Zavvy sincroniza automaticamente. Eventos externos bloqueiam horários na sua agenda de atendimentos. Tudo fica sempre atualizado.',
  },
  {
    question: 'Como meus clientes agendam?',
    answer:
      'Você compartilha seu link de agendamento personalizado. Seus clientes escolhem o serviço, horário disponível e confirmam. Sem troca de mensagens, sem ligações.',
  },
  {
    question: 'Posso cancelar a qualquer momento?',
    answer:
      'Sim! Não há fidelidade ou multa. Você pode cancelar quando quiser diretamente pelo app. Seus dados ficam disponíveis por 30 dias após o cancelamento.',
  },
  {
    question: 'Meus dados estão seguros?',
    answer:
      'Sim. Seguimos a LGPD rigorosamente. Seus dados e os de seus clientes são criptografados e nunca compartilhados com terceiros. Você pode solicitar exclusão a qualquer momento.',
  },
  {
    question: 'A Zavvy funciona para qualquer profissão?',
    answer:
      'A Zavvy é ideal para profissionais que trabalham com agendamento de horários: psicólogos, advogados, nutricionistas, personal trainers, cabeleireiros, e muitos outros.',
  },
  {
    question: 'Como começo a usar?',
    answer:
      'Entre na lista de espera e avisaremos quando sua conta estiver pronta. O cadastro leva menos de 10 minutos: configure seus serviços, disponibilidade, e pronto!',
  },
]

export function FAQ() {
  return (
    <section id="faq" aria-labelledby="faq-heading" className="py-16 md:py-24">
      <div className="container">
        <h2
          id="faq-heading"
          className="text-2xl md:text-3xl font-semibold text-text text-center mb-4"
        >
          Perguntas Frequentes
        </h2>
        <p className="text-text-muted text-center mb-12 max-w-2xl mx-auto">
          Tudo que você precisa saber sobre a Zavvy
        </p>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-border">
                <AccordionTrigger className="text-text text-base font-medium hover:text-primary hover:no-underline transition-colors py-4">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-text-muted text-sm leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
