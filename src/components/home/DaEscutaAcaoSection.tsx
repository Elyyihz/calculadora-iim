import React from 'react';

const STEPS = [
  {
    num: '01',
    title: 'Escutamos sua equipe',
    desc: 'Um questionário estruturado reúne informações sobre a experiência de deslocamento dos colaboradores.'
  },
  {
    num: '02',
    title: 'Conectamos os dados',
    desc: 'O diagnóstico com o IIM organiza as dimensões da mobilidade e orienta a leitura dos impactos.'
  },
  {
    num: '03',
    title: 'Traçamos um plano',
    desc: 'As intervenções são priorizadas a partir da análise e das necessidades da sua operação.'
  },
  {
    num: '04',
    title: 'Acompanhamos a jornada',
    desc: 'O monitoramento posterior ajuda a acompanhar a evolução e ajustar o caminho.'
  }
];

export const DaEscutaAcaoSection: React.FC = () => {
  return (
    <section
      id="da-escuta-a-acao"
      style={{
        background: '#FFFFFF',
        padding: '7rem 0 6rem',
        position: 'relative'
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '2.5rem',
            marginBottom: '4.5rem'
          }}
        >
          <div>
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
              Da escuta à ação
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.2rem, 4.2vw, 3.2rem)',
                fontWeight: 800,
                color: '#0B1924',
                lineHeight: 1.15,
                letterSpacing: '-0.025em'
              }}
            >
              Entender. Priorizar.
              <br />
              Transformar.
            </h2>
          </div>

          <div style={{ maxWidth: '440px', paddingTop: '1.2rem' }}>
            <p
              style={{
                fontSize: '1.05rem',
                color: '#4B5563',
                lineHeight: 1.7,
                fontWeight: 400
              }}
            >
              Cada empresa tem uma rotina. Nosso trabalho é entender a sua e construir um plano que faça sentido para quem está em movimento.
            </p>
          </div>
        </div>

        {/* 4 Steps Row with Connecting Lines */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '2rem'
          }}
          className="steps-grid"
        >
          {STEPS.map((step) => (
            <div key={step.num} style={{ display: 'flex', flexDirection: 'column' }}>
              {/* Number and green line */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  marginBottom: '1.8rem'
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.8rem',
                    fontWeight: 700,
                    color: '#2E9E5B',
                    letterSpacing: '-0.02em'
                  }}
                >
                  {step.num}
                </span>
                <div
                  style={{
                    flex: 1,
                    height: '1px',
                    background: '#D5E2D9'
                  }}
                />
              </div>

              {/* Title */}
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  color: '#0B1924',
                  marginBottom: '0.8rem',
                  lineHeight: 1.3
                }}
              >
                {step.title}
              </h3>

              {/* Description */}
              <p
                style={{
                  fontSize: '0.94rem',
                  color: '#4B5563',
                  lineHeight: 1.65
                }}
              >
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
