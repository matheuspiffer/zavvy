import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Política de Privacidade | Zavvy',
  description: 'Política de privacidade da plataforma Zavvy. Saiba como coletamos, usamos e protegemos seus dados pessoais conforme a LGPD.',
}

export default function PoliticaDePrivacidadePage() {
  return (
    <section
        id="politica-de-privacidade"
        aria-labelledby="politica-heading"
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
              id="politica-heading"
              className="text-2xl md:text-3xl font-semibold text-text mb-4"
            >
              Política de Privacidade
            </h1>

            <p className="text-sm text-text-muted mb-12">
              Última atualização: Dezembro de 2025
            </p>

            <div className="space-y-8 text-text leading-relaxed">
              {/* Section 1 */}
              <section aria-labelledby="section-1">
                <h2 id="section-1" className="text-xl md:text-2xl font-semibold text-text mb-4">
                  1. Identificação do Controlador
                </h2>
                <p className="mb-4">
                  A Zavvy (&ldquo;nós&rdquo;, &ldquo;nosso&rdquo; ou &ldquo;Empresa&rdquo;) é a controladora dos dados pessoais coletados através da plataforma Zavvy, nos termos da Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Razão Social: Zavvy Tecnologia Ltda.</li>
                  <li>CNPJ: Em processo de registro</li>
                  <li>Endereço: São Paulo, SP, Brasil</li>
                  <li>
                    Email de contato:{' '}
                    <a
                      href="mailto:contato@zavvy.app"
                      className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                    >
                      contato@zavvy.app
                    </a>
                  </li>
                </ul>
              </section>

              {/* Section 2 */}
              <section aria-labelledby="section-2">
                <h2 id="section-2" className="text-xl md:text-2xl font-semibold text-text mb-4">
                  2. Dados Pessoais Coletados
                </h2>
                <p className="mb-4">
                  Coletamos os seguintes tipos de dados pessoais:
                </p>
                <h3 id="section-2-1" className="text-lg font-medium text-text mb-2">Dados de Identificação</h3>
                <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                  <li>Nome completo</li>
                  <li>Endereço de email</li>
                  <li>Número de telefone/WhatsApp</li>
                  <li>Profissão ou área de atuação</li>
                </ul>
                <h3 id="section-2-2" className="text-lg font-medium text-text mb-2">Dados de Uso</h3>
                <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                  <li>Logs de acesso e navegação</li>
                  <li>Preferências de configuração</li>
                  <li>Histórico de agendamentos</li>
                  <li>Interações com o assistente WhatsApp</li>
                </ul>
                <h3 id="section-2-3" className="text-lg font-medium text-text mb-2">Dados de Pagamento</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Informações de pagamento são processadas pela Stripe</li>
                  <li>Não armazenamos dados de cartão de crédito</li>
                </ul>
              </section>

              {/* Section 3 */}
              <section aria-labelledby="section-3">
                <h2 id="section-3" className="text-xl md:text-2xl font-semibold text-text mb-4">
                  3. Finalidade do Tratamento
                </h2>
                <p className="mb-4">
                  Utilizamos seus dados pessoais para as seguintes finalidades:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Prestação dos serviços de agendamento via WhatsApp</li>
                  <li>Gerenciamento de sua conta e autenticação</li>
                  <li>Envio de notificações de agendamentos</li>
                  <li>Sincronização com Google Calendar</li>
                  <li>Processamento de pagamentos e assinaturas</li>
                  <li>Comunicações sobre o serviço e atualizações</li>
                  <li>Melhoria contínua da plataforma</li>
                  <li>Cumprimento de obrigações legais e regulatórias</li>
                </ul>
              </section>

              {/* Section 4 */}
              <section aria-labelledby="section-4">
                <h2 id="section-4" className="text-xl md:text-2xl font-semibold text-text mb-4">
                  4. Base Legal (LGPD Art. 7)
                </h2>
                <p className="mb-4">
                  O tratamento de seus dados pessoais é realizado com base nas seguintes hipóteses legais da LGPD:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    <strong>Execução de contrato (Art. 7º, V):</strong> Para prestação dos serviços de agendamento contratados
                  </li>
                  <li>
                    <strong>Consentimento (Art. 7º, I):</strong> Para envio de comunicações de marketing e participação na lista de espera
                  </li>
                  <li>
                    <strong>Legítimo interesse (Art. 7º, IX):</strong> Para melhorias do serviço e análises de uso
                  </li>
                  <li>
                    <strong>Cumprimento de obrigação legal (Art. 7º, II):</strong> Para atendimento de obrigações fiscais e regulatórias
                  </li>
                </ul>
              </section>

              {/* Section 5 */}
              <section aria-labelledby="section-5">
                <h2 id="section-5" className="text-xl md:text-2xl font-semibold text-text mb-4">
                  5. Compartilhamento de Dados
                </h2>
                <p className="mb-4">
                  Podemos compartilhar seus dados pessoais com:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    <strong>WhatsApp/Meta:</strong> Para funcionamento do assistente de agendamento
                  </li>
                  <li>
                    <strong>Google:</strong> Para sincronização com Google Calendar
                  </li>
                  <li>
                    <strong>Stripe:</strong> Para processamento seguro de pagamentos
                  </li>
                  <li>
                    <strong>Provedores de infraestrutura:</strong> Serviços de hospedagem e banco de dados
                  </li>
                </ul>
                <p className="mt-4">
                  Não vendemos ou compartilhamos seus dados com terceiros para fins de marketing sem seu consentimento expresso.
                </p>
              </section>

              {/* Section 6 */}
              <section aria-labelledby="section-6">
                <h2 id="section-6" className="text-xl md:text-2xl font-semibold text-text mb-4">
                  6. Armazenamento e Segurança
                </h2>
                <p className="mb-4">
                  Adotamos medidas técnicas e organizacionais para proteger seus dados:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Criptografia de dados em trânsito (HTTPS/TLS)</li>
                  <li>Criptografia de dados sensíveis em repouso (AES-256)</li>
                  <li>Controle de acesso baseado em funções</li>
                  <li>Monitoramento contínuo de segurança</li>
                  <li>Backups regulares com proteção adequada</li>
                  <li>Isolamento de dados por organização (multi-tenancy)</li>
                </ul>
              </section>

              {/* Section 7 */}
              <section aria-labelledby="section-7">
                <h2 id="section-7" className="text-xl md:text-2xl font-semibold text-text mb-4">
                  7. Retenção de Dados
                </h2>
                <p className="mb-4">
                  Mantemos seus dados pessoais pelo tempo necessário para:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    <strong>Dados de conta:</strong> Enquanto sua conta estiver ativa, mais 30 dias após encerramento
                  </li>
                  <li>
                    <strong>Logs de conversação:</strong> 90 dias para fins operacionais
                  </li>
                  <li>
                    <strong>Dados fiscais:</strong> 5 anos conforme legislação tributária
                  </li>
                  <li>
                    <strong>Dados de waitlist:</strong> Até o lançamento do serviço ou revogação do consentimento
                  </li>
                </ul>
                <p className="mt-4">
                  Após o período de retenção, seus dados serão anonimizados ou excluídos de forma segura.
                </p>
              </section>

              {/* Section 8 */}
              <section aria-labelledby="section-8">
                <h2 id="section-8" className="text-xl md:text-2xl font-semibold text-text mb-4">
                  8. Seus Direitos (LGPD Arts. 17-22)
                </h2>
                <p className="mb-4">
                  Conforme a LGPD, você possui os seguintes direitos:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    <strong>Confirmação:</strong> Saber se tratamos seus dados pessoais
                  </li>
                  <li>
                    <strong>Acesso:</strong> Obter cópia dos seus dados pessoais
                  </li>
                  <li>
                    <strong>Correção:</strong> Corrigir dados incompletos ou desatualizados
                  </li>
                  <li>
                    <strong>Anonimização/Bloqueio/Eliminação:</strong> Solicitar tratamento de dados desnecessários
                  </li>
                  <li>
                    <strong>Portabilidade:</strong> Transferir seus dados para outro fornecedor
                  </li>
                  <li>
                    <strong>Eliminação:</strong> Excluir dados tratados com base em consentimento
                  </li>
                  <li>
                    <strong>Informação:</strong> Saber com quem compartilhamos seus dados
                  </li>
                  <li>
                    <strong>Revogação:</strong> Retirar seu consentimento a qualquer momento
                  </li>
                </ul>
                <p className="mt-4">
                  Para exercer seus direitos, entre em contato pelo email{' '}
                  <a
                    href="mailto:privacidade@zavvy.app"
                    className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                  >
                    privacidade@zavvy.app
                  </a>
                  . Responderemos sua solicitação em até 15 dias úteis.
                </p>
              </section>

              {/* Section 9 */}
              <section aria-labelledby="section-9">
                <h2 id="section-9" className="text-xl md:text-2xl font-semibold text-text mb-4">
                  9. Cookies e Tecnologias de Rastreamento
                </h2>
                <p className="mb-4">
                  Utilizamos cookies e tecnologias similares para:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    <strong>Cookies essenciais:</strong> Necessários para funcionamento do site
                  </li>
                  <li>
                    <strong>Cookies de preferências:</strong> Lembrar suas configurações
                  </li>
                  <li>
                    <strong>Cookies de análise:</strong> Entender como você usa nosso site
                  </li>
                </ul>
                <p className="mt-4">
                  Você pode gerenciar suas preferências de cookies através do banner de consentimento exibido no site.
                </p>
              </section>

              {/* Section 10 */}
              <section aria-labelledby="section-10">
                <h2 id="section-10" className="text-xl md:text-2xl font-semibold text-text mb-4">
                  10. Alterações nesta Política
                </h2>
                <p className="mb-4">
                  Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos você sobre mudanças significativas através de:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Email para o endereço cadastrado em sua conta</li>
                  <li>Aviso destacado em nosso site ou aplicativo</li>
                </ul>
                <p className="mt-4">
                  Recomendamos revisar esta política regularmente para estar ciente de como protegemos seus dados.
                </p>
              </section>

              {/* Section 11 */}
              <section aria-labelledby="section-11">
                <h2 id="section-11" className="text-xl md:text-2xl font-semibold text-text mb-4">
                  11. Contato e Encarregado (DPO)
                </h2>
                <p className="mb-4">
                  Para dúvidas sobre esta Política de Privacidade ou para exercer seus direitos, entre em contato:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    <strong>Email geral:</strong>{' '}
                    <a
                      href="mailto:contato@zavvy.app"
                      className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                    >
                      contato@zavvy.app
                    </a>
                  </li>
                  <li>
                    <strong>Encarregado de Proteção de Dados (DPO):</strong>{' '}
                    <a
                      href="mailto:privacidade@zavvy.app"
                      className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                    >
                      privacidade@zavvy.app
                    </a>
                  </li>
                </ul>
                <p className="mt-4">
                  Você também pode registrar reclamação junto à Autoridade Nacional de Proteção de Dados (ANPD) caso considere que o tratamento de seus dados viola a LGPD.
                </p>
              </section>
            </div>
          </div>
        </div>
      </section>
  )
}
