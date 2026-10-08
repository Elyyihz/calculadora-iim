import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

interface Faq {
  question: string;
  answer: string;
}

const FAQS: Faq[] = [
  {
    question: 'Para quem é a UrbanFlow?',
    answer: 'A UrbanFlow atende empresas de médio e grande porte da Região Metropolitana do Recife e de todo o Brasil que buscam reduzir custos invisíveis associados a deslocamento, atrasos e turnover, além de promover qualidade de vida e atingir metas ESG (Escopo 3).'
  },
  {
    question: 'O que a empresa recebe no diagnóstico?',
    answer: 'A empresa recebe um relatório executivo detalhado contendo a nota do Índice de Impacto de Mobilidade (IIM de 0 a 100), o gráfico de radar dimensional, a quantificação financeira de perdas operacionais estimadas e uma matriz de intervenções prioritárias sob medida.'
  },
  {
    question: 'Como os dados dos colaboradores são tratados?',
    answer: 'Total conformidade com a LGPD. Os dados são coletados de forma agregada e anonimizada. Não realizamos rastreamento individual por GPS e não solicitamos o endereço residencial exato do colaborador, protegendo integralmente a privacidade da equipe.'
  },
  {
    question: 'Já posso calcular o IIM da minha empresa aqui?',
    answer: 'Sim! Disponibilizamos uma Calculadora IIM interativa preliminar em nosso site para que sua liderança possa simular o impacto e visualizar projeções em tempo real antes de contratar a consultoria completa.'
  }
];

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section
      id="faq"
      style={{
        background: '#FFFFFF',
        padding: '7rem 0 6rem',
        position: 'relative'
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '4rem',
            alignItems: 'flex-start'
          }}
          className="faq-grid"
        >
          {/* Left Column: Heading */}
          <div>
            <div
              style={{
                fontSize: '0.78rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#3B5848',
                marginBottom: '1.2rem'
              }}
            >
              Antes do próximo passo
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
                fontWeight: 800,
                color: '#0B1924',
                lineHeight: 1.15,
                letterSpacing: '-0.025em'
              }}
            >
              Vamos tirar
              <br />
              suas dúvidas.
            </h2>
          </div>

          {/* Right Column: Clean Minimalist Accordion */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {FAQS.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  style={{
                    borderTop: idx === 0 ? '1px solid #E5E7EB' : 'none',
                    borderBottom: '1px solid #E5E7EB',
                    padding: '1.5rem 0'
                  }}
                >
                  <button
                    type="button"
                    onClick={() => toggle(idx)}
                    aria-expanded={isOpen}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '1.5rem',
                      background: 'none',
                      border: 'none',
                      textAlign: 'left',
                      cursor: 'pointer',
                      padding: 0
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        color: isOpen ? '#2E9E5B' : '#0B1924',
                        lineHeight: 1.4,
                        transition: 'color 0.2s ease'
                      }}
                    >
                      {faq.question}
                    </span>
                    <span
                      style={{
                        color: isOpen ? '#2E9E5B' : '#6B7280',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        transition: 'transform 0.2s ease'
                      }}
                    >
                      {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                    </span>
                  </button>

                  {isOpen && (
                    <div
                      style={{
                        paddingTop: '1rem',
                        fontSize: '0.96rem',
                        color: '#4B5563',
                        lineHeight: 1.7
                      }}
                    >
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
