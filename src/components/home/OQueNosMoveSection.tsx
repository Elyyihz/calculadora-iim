import React from 'react';

const PILLARS = [
  {
    code: '01 / FINANÇAS',
    title: 'Custos invisíveis que pesam na operação.',
    desc: 'Um diagnóstico para apoiar decisões sobre custos associados ao deslocamento e priorizar oportunidades de melhoria.',
    target: 'Para lideranças e finanças'
  },
  {
    code: '02 / OPERAÇÃO',
    title: 'Produtividade que se perde no trajeto.',
    desc: 'Entenda como trajetos e pontualidade afetam a operação e direcione intervenções para a realidade da sua equipe.',
    target: 'Para gestores e operações'
  },
  {
    code: '03 / PESSOAS',
    title: 'Bem-estar que faz a diferença na retenção.',
    desc: 'Coloque estresse e vulnerabilidade no centro da conversa sobre mobilidade, qualidade de vida e bem-estar.',
    target: 'Para RH e ESG'
  }
];

export const OQueNosMoveSection: React.FC = () => {
  return (
    <section
      id="o-que-nos-move"
      style={{
        background: '#FFFFFF',
        padding: '7rem 0 6rem',
        position: 'relative'
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div style={{ maxWidth: '780px', marginBottom: '4.5rem' }}>
          <div
            style={{
              fontSize: '0.78rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#3B5848',
              marginBottom: '1rem'
            }}
          >
            O que nos move
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.2rem, 4.2vw, 3.2rem)',
              fontWeight: 800,
              color: '#0B1924',
              lineHeight: 1.15,
              letterSpacing: '-0.025em',
              marginBottom: '1.2rem'
            }}
          >
            O trabalho começa antes do expediente.
          </h2>
          <p
            style={{
              fontSize: '1.1rem',
              color: '#4B5563',
              lineHeight: 1.7,
              fontWeight: 400
            }}
          >
            Três frentes onde a mobilidade impacta diretamente os resultados da sua empresa.
          </p>
        </div>

        {/* 3 Pillar Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2.5rem'
          }}
          className="move-cards-grid"
        >
          {PILLARS.map((p) => (
            <div
              key={p.code}
              style={{
                background: '#FFFFFF',
                borderRadius: '16px',
                border: '1px solid #E5E7EB',
                padding: '2.6rem 2.2rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
                transition: 'all 0.25s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 30px rgba(11, 37, 69, 0.07)';
                e.currentTarget.style.borderColor = '#D1D5DB';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.03)';
                e.currentTarget.style.borderColor = '#E5E7EB';
              }}
            >
              <div>
                {/* Code badge */}
                <div
                  style={{
                    fontSize: '0.80rem',
                    fontWeight: 700,
                    letterSpacing: '0.10em',
                    textTransform: 'uppercase',
                    color: '#2E9E5B',
                    marginBottom: '1.2rem'
                  }}
                >
                  {p.code}
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.35rem',
                    fontWeight: 700,
                    color: '#0B1924',
                    lineHeight: 1.3,
                    marginBottom: '1.2rem'
                  }}
                >
                  {p.title}
                </h3>

                {/* Description */}
                <p
                  style={{
                    fontSize: '0.96rem',
                    color: '#4B5563',
                    lineHeight: 1.7,
                    marginBottom: '2.5rem'
                  }}
                >
                  {p.desc}
                </p>
              </div>

              {/* Target / Stakeholder label at the bottom */}
              <div
                style={{
                  borderTop: '1px solid #F3F4F6',
                  paddingTop: '1.2rem',
                  fontSize: '0.84rem',
                  color: '#2E9E5B',
                  fontWeight: 600
                }}
              >
                {p.target}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
