import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Termos de Uso | Zavvy',
  description: 'Termos e condições de uso da plataforma Zavvy de agendamento via WhatsApp.',
}

export default function TermosDeUsoPage() {
  return (
    <section
        id="termos-de-uso"
        aria-labelledby="termos-heading"
        className="py-16 md:py-24"
      >
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <Link
              href="/"
              className="inline-flex items-center text-sm text-text-muted hover:text-primary focus:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors mb-8"
            >
              ← Voltar para home
            </Link>

            <h1
              id="termos-heading"
              className="text-2xl md:text-3xl font-semibold text-text mb-4"
            >
              Termos de Uso
            </h1>

            <p className="text-sm text-text-muted mb-12">
              Última atualização: Dezembro de 2025
            </p>

            <div className="space-y-8 text-text leading-relaxed">
              {/* Section 1 */}
              <section aria-labelledby="section-1">
                <h2 id="section-1" className="text-xl md:text-2xl font-semibold text-text mb-4">
                  1. Aceitação dos Termos
                </h2>
                <p className="mb-4">
                  Ao acessar ou utilizar a plataforma Zavvy (&ldquo;Serviço&rdquo;), você concorda em cumprir e estar vinculado a estes Termos de Uso. Se você não concordar com qualquer parte destes termos, não poderá acessar ou utilizar o Serviço.
                </p>
                <p>
                  Estes termos constituem um contrato vinculante entre você (&ldquo;Usuário&rdquo;) e Zavvy (&ldquo;nós&rdquo;, &ldquo;nosso&rdquo; ou &ldquo;Empresa&rdquo;). Recomendamos que você leia atentamente antes de utilizar nossos serviços.
                </p>
              </section>

              {/* Section 2 */}
              <section aria-labelledby="section-2">
                <h2 id="section-2" className="text-xl md:text-2xl font-semibold text-text mb-4">
                  2. Descrição do Serviço
                </h2>
                <p className="mb-4">
                  A Zavvy é uma plataforma de agendamento de consultas e serviços via WhatsApp, destinada a profissionais autônomos e pequenas empresas. Nosso serviço inclui:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Assistente virtual via WhatsApp para gerenciamento de agenda</li>
                  <li>Link de agendamento personalizado para seus clientes</li>
                  <li>Integração com Google Calendar</li>
                  <li>Notificações automáticas de agendamentos</li>
                  <li>Painel web para configuração e visualização da agenda</li>
                </ul>
              </section>

              {/* Section 3 */}
              <section aria-labelledby="section-3">
                <h2 id="section-3" className="text-xl md:text-2xl font-semibold text-text mb-4">
                  3. Cadastro e Conta
                </h2>
                <p className="mb-4">
                  Para utilizar o Serviço, você deve criar uma conta fornecendo informações precisas e completas. Você é responsável por:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Manter a confidencialidade de suas credenciais de acesso</li>
                  <li>Todas as atividades realizadas em sua conta</li>
                  <li>Notificar imediatamente sobre qualquer uso não autorizado</li>
                  <li>Manter suas informações de conta atualizadas</li>
                </ul>
              </section>

              {/* Section 4 */}
              <section aria-labelledby="section-4">
                <h2 id="section-4" className="text-xl md:text-2xl font-semibold text-text mb-4">
                  4. Obrigações do Usuário
                </h2>
                <p className="mb-4">
                  Ao utilizar o Serviço, você concorda em:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Utilizar o Serviço apenas para fins lícitos e conforme estes Termos</li>
                  <li>Não violar direitos de terceiros, incluindo privacidade e propriedade intelectual</li>
                  <li>Não transmitir conteúdo ilegal, ofensivo ou prejudicial</li>
                  <li>Não tentar acessar sistemas ou dados sem autorização</li>
                  <li>Não utilizar o Serviço para enviar spam ou mensagens não solicitadas</li>
                  <li>Respeitar as políticas de uso do WhatsApp e Google</li>
                </ul>
              </section>

              {/* Section 5 */}
              <section aria-labelledby="section-5">
                <h2 id="section-5" className="text-xl md:text-2xl font-semibold text-text mb-4">
                  5. Limitações de Responsabilidade
                </h2>
                <p className="mb-4">
                  O Serviço é fornecido &ldquo;como está&rdquo; e &ldquo;conforme disponível&rdquo;. Na extensão máxima permitida por lei:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Não garantimos que o Serviço será ininterrupto ou livre de erros</li>
                  <li>Não somos responsáveis por danos indiretos, incidentais ou consequenciais</li>
                  <li>Não nos responsabilizamos por ações de terceiros, incluindo WhatsApp e Google</li>
                  <li>Nossa responsabilidade total está limitada ao valor pago pelo Serviço nos últimos 12 meses</li>
                </ul>
              </section>

              {/* Section 6 */}
              <section aria-labelledby="section-6">
                <h2 id="section-6" className="text-xl md:text-2xl font-semibold text-text mb-4">
                  6. Propriedade Intelectual
                </h2>
                <p className="mb-4">
                  Todo o conteúdo, design, código, marcas e outros materiais do Serviço são de propriedade exclusiva da Zavvy ou de seus licenciadores.
                </p>
                <p>
                  Você não pode copiar, modificar, distribuir, vender ou alugar qualquer parte do Serviço sem nossa autorização prévia por escrito. O uso do Serviço não concede a você qualquer direito de propriedade intelectual.
                </p>
              </section>

              {/* Section 7 */}
              <section aria-labelledby="section-7">
                <h2 id="section-7" className="text-xl md:text-2xl font-semibold text-text mb-4">
                  7. Encerramento da Conta
                </h2>
                <p className="mb-4">
                  Você pode encerrar sua conta a qualquer momento através do painel de configurações. Ao encerrar:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Seu acesso ao Serviço será imediatamente revogado</li>
                  <li>Seus dados serão mantidos por 30 dias para recuperação, se necessário</li>
                  <li>Após 30 dias, seus dados serão permanentemente excluídos</li>
                  <li>Você pode solicitar a exclusão imediata conforme a LGPD</li>
                </ul>
                <p className="mt-4">
                  Reservamo-nos o direito de suspender ou encerrar contas que violem estes Termos, sem aviso prévio.
                </p>
              </section>

              {/* Section 8 */}
              <section aria-labelledby="section-8">
                <h2 id="section-8" className="text-xl md:text-2xl font-semibold text-text mb-4">
                  8. Modificações dos Termos
                </h2>
                <p className="mb-4">
                  Podemos modificar estes Termos a qualquer momento. Notificaremos você sobre mudanças significativas através de:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Email para o endereço cadastrado em sua conta</li>
                  <li>Aviso destacado em nosso site ou aplicativo</li>
                </ul>
                <p className="mt-4">
                  O uso continuado do Serviço após as modificações constitui sua aceitação dos novos termos.
                </p>
              </section>

              {/* Section 9 */}
              <section aria-labelledby="section-9">
                <h2 id="section-9" className="text-xl md:text-2xl font-semibold text-text mb-4">
                  9. Lei Aplicável e Foro
                </h2>
                <p className="mb-4">
                  Estes Termos são regidos pelas leis da República Federativa do Brasil. Qualquer disputa será resolvida nos tribunais da cidade de São Paulo, Estado de São Paulo, Brasil.
                </p>
                <p>
                  As disposições do Código de Defesa do Consumidor (CDC) e da Lei Geral de Proteção de Dados (LGPD) são aplicáveis na relação entre a Zavvy e seus usuários.
                </p>
              </section>

              {/* Section 10 */}
              <section aria-labelledby="section-10">
                <h2 id="section-10" className="text-xl md:text-2xl font-semibold text-text mb-4">
                  10. Contato
                </h2>
                <p className="mb-4">
                  Se você tiver dúvidas sobre estes Termos de Uso, entre em contato conosco:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    Email:{' '}
                    <a
                      href="mailto:contato@zavvy.app"
                      className="text-primary hover:underline"
                    >
                      contato@zavvy.app
                    </a>
                  </li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      </section>
  )
}
