import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageSquare } from 'lucide-react';
import { FAQ_ITEMS, COMPANY_INFO } from '../../data/institutionalData';

export const FaqSection: React.FC = () => {
  // Store set of open item IDs (default first item open)
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({
    'o-que-e-iim': true
  });

  const toggleItem = (id: string) => {
    setOpenIds((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <section
      id="faq"
      style={{
        background: '#FFFFFF',
        padding: '7rem 0',
        position: 'relative'
      }}
    >
      <div className="container" style={{ maxWidth: '920px' }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '5px 14px',
              borderRadius: 'var(--radius-pill)',
              background: 'var(--accent-light)',
              color: 'var(--accent)',
              fontSize: '0.78rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '1.2rem'
            }}
          >
            <HelpCircle size={14} />
            <span>Perguntas Frequentes</span>
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 800,
              color: 'var(--brand)',
              lineHeight: 1.2,
              marginBottom: '1.2rem'
            }}
          >
            Tire suas dúvidas sobre o IIM
          </h2>
          <p
            style={{
              fontSize: '1.1rem',
              color: 'var(--text-muted)',
              lineHeight: 1.7,
              fontWeight: 400
            }}
          >
            Esclarecimentos detalhados sobre a metodologia, privacidade de dados, conformidade com a LGPD
            e o retorno sobre o investimento financeiro para a sua diretoria.
          </p>
        </div>

        {/* Accordion List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '3.5rem' }}>
          {FAQ_ITEMS.map((item) => {
            const isOpen = !!openIds[item.id];
            return (
              <div
                key={item.id}
                style={{
                  border: '1px solid rgba(11, 37, 69, 0.08)',
                  borderRadius: 'var(--radius)',
                  background: isOpen ? '#FFFFFF' : '#FAFAFA',
                  boxShadow: isOpen ? '0 4px 20px rgba(11, 37, 69, 0.04)' : 'none',
                  overflow: 'hidden',
                  transition: 'all 0.25s ease'
                }}
              >
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={isOpen}
                  style={{
                    width: '100%',
                    padding: '1.6rem 2rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    textAlign: 'left',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.05rem',
                      fontWeight: 700,
                      color: isOpen ? 'var(--brand)' : '#374151',
                      lineHeight: 1.4,
                      transition: 'color 0.2s'
                    }}
                  >
                    {item.question}
                  </span>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: isOpen ? 'var(--accent-light)' : 'rgba(11, 37, 69, 0.04)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.25s ease, background 0.2s'
                    }}
                  >
                    <ChevronDown size={18} color={isOpen ? 'var(--accent)' : 'var(--text-muted)'} />
                  </div>
                </button>

                {isOpen && (
                  <div
                    style={{
                      padding: '0 2rem 1.8rem',
                      color: '#4B5563',
                      fontSize: '0.98rem',
                      lineHeight: 1.75,
                      borderTop: '1px solid #F3F4F6',
                      paddingTop: '1.2rem'
                    }}
                  >
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support Callout */}
        <div
          style={{
            textAlign: 'center',
            padding: '2rem',
            background: 'var(--surface-2)',
            borderRadius: 'var(--radius)',
            border: '1px solid rgba(11, 37, 69, 0.06)'
          }}
        >
          <p style={{ fontSize: '0.96rem', color: '#4B5563', marginBottom: '0.8rem' }}>
            Ainda tem dúvidas técnicas ou deseja uma demonstração institucional para o seu time?
          </p>
          <a
            href={COMPANY_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{
              padding: '11px 24px',
              fontSize: '0.90rem'
            }}
          >
            <MessageSquare size={16} />
            <span>Conversar com nossa equipe de consultores</span>
          </a>
        </div>
      </div>
    </section>
  );
};
