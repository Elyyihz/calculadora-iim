import React from 'react';
import { Database, Cpu, Compass, Activity, CheckCircle2 } from 'lucide-react';
import { METHOD_STEPS } from '../../data/institutionalData';

export const DaEscutaAcaoSection: React.FC = () => {
  const getStepIcon = (idx: number) => {
    switch (idx) {
      case 0:
        return <Database size={22} color="var(--accent)" />;
      case 1:
        return <Cpu size={22} color="var(--accent)" />;
      case 2:
        return <Compass size={22} color="var(--accent)" />;
      case 3:
      default:
        return <Activity size={22} color="var(--accent)" />;
    }
  };

  return (
    <section
      id="da-escuta-a-acao"
      style={{
        background: '#FFFFFF',
        padding: '7rem 0',
        position: 'relative'
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div style={{ maxWidth: '780px', margin: '0 auto 5rem', textAlign: 'center' }}>
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
            Fluxo Executivo de Trabalho
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
            Da escuta à ação
          </h2>
          <p
            style={{
              fontSize: '1.1rem',
              color: 'var(--text-muted)',
              lineHeight: 1.7,
              fontWeight: 400
            }}
          >
            Nossa abordagem é estruturada em 4 passos ágeis, concebida para gerar impacto
            tangível sem sobrecarregar a rotina da sua equipe ou do departamento de RH.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '2rem',
            position: 'relative'
          }}
        >
          {METHOD_STEPS.map((step, idx) => (
            <div
              key={step.number}
              style={{
                background: '#FFFFFF',
                borderRadius: 'var(--radius)',
                border: '1px solid rgba(11, 37, 69, 0.08)',
                padding: '2.5rem 1.8rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 4px 20px rgba(11, 37, 69, 0.03)',
                position: 'relative',
                transition: 'transform var(--transition-fast), box-shadow var(--transition-fast)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 30px rgba(11, 37, 69, 0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(11, 37, 69, 0.03)';
              }}
            >
              <div>
                {/* Step Top: Number & Icon */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.8rem' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.6rem',
                      fontWeight: 800,
                      color: 'var(--brand)',
                      letterSpacing: '-0.03em'
                    }}
                  >
                    {step.number}
                  </span>
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '10px',
                      background: 'var(--accent-light)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {getStepIcon(idx)}
                  </div>
                </div>

                {/* Step Title */}
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.25rem',
                    fontWeight: 800,
                    color: 'var(--brand)',
                    marginBottom: '1rem',
                    lineHeight: 1.3
                  }}
                >
                  {step.title}
                </h3>

                {/* Step Description */}
                <p
                  style={{
                    fontSize: '0.92rem',
                    color: '#4B5563',
                    lineHeight: 1.65,
                    marginBottom: '1.6rem'
                  }}
                >
                  {step.description}
                </p>
              </div>

              {/* Step Key Details */}
              {step.details && (
                <div
                  style={{
                    borderTop: '1px solid #F3F4F6',
                    paddingTop: '1.2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem'
                  }}
                >
                  {step.details.map((detail, dIdx) => (
                    <div key={dIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <CheckCircle2 size={14} color="var(--accent)" style={{ flexShrink: 0, marginTop: '3px' }} />
                      <span style={{ fontSize: '0.80rem', color: '#6B7280', lineHeight: 1.45 }}>
                        {detail}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
