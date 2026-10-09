import React, { useState } from 'react';
import {
  TrendingDown,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Users,
  MapPin,
  Sparkles,
  ArrowUpRight,
  Quote,
  ShieldCheck
} from 'lucide-react';
import { SUCCESS_CASES, COMPANY_INFO } from '../../data/institutionalData';
import { SuccessCase } from '../../types';

export const CasesDeSucessoSection: React.FC = () => {
  const [activeCaseId, setActiveCaseId] = useState<string>(SUCCESS_CASES[0].id);

  const activeCase: SuccessCase =
    SUCCESS_CASES.find((c) => c.id === activeCaseId) || SUCCESS_CASES[0];

  return (
    <section
      id="cases-de-sucesso"
      style={{
        background: '#F9FAFB',
        borderTop: '1px solid #E5E7EB',
        borderBottom: '1px solid #E5E7EB',
        padding: '7rem 0 6rem',
        position: 'relative'
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div style={{ maxWidth: '820px', marginBottom: '3.5rem' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.78rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#2E9E5B',
              marginBottom: '1rem',
              background: '#EBF8F0',
              padding: '6px 14px',
              borderRadius: '999px',
              border: '1px solid #D5E2D9'
            }}
          >
            <Sparkles size={14} />
            <span>Cases de Sucesso</span>
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
            Da fricção urbana ao retorno mensurável.
          </h2>

          <p
            style={{
              fontSize: '1.1rem',
              color: '#4B5563',
              lineHeight: 1.7,
              fontWeight: 400,
              marginBottom: '1.2rem'
            }}
          >
            Veja simulações práticas de aplicação da metodologia IIM em diferentes realidades corporativas. Entenda o problema inicial de mobilidade enfrentado pelas empresas, as soluções de engenharia aplicadas e os resultados de eficiência conquistados.
          </p>

          {/* Methodology Transparency Disclaimer */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.82rem',
              color: '#6B7280',
              background: '#FFFFFF',
              padding: '6px 12px',
              borderRadius: '8px',
              border: '1px solid #E5E7EB'
            }}
          >
            <ShieldCheck size={15} color="#2E9E5B" />
            <span>Modelagens representativas baseadas no algoritmo preditivo do IIM calibrado pela pesquisa acadêmica.</span>
          </div>
        </div>

        {/* Case Navigation Tabs */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1rem',
            marginBottom: '2.5rem'
          }}
          className="cases-selector-grid"
        >
          {SUCCESS_CASES.map((item) => {
            const isSelected = item.id === activeCase.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveCaseId(item.id)}
                style={{
                  background: isSelected ? '#FFFFFF' : '#FFFFFF',
                  borderRadius: '14px',
                  border: isSelected ? '2px solid #2E9E5B' : '1px solid #E5E7EB',
                  padding: '1.4rem 1.3rem',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: isSelected
                    ? '0 10px 25px rgba(46, 158, 91, 0.12)'
                    : '0 2px 6px rgba(0, 0, 0, 0.02)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.6rem',
                  position: 'relative'
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.borderColor = '#CBD5E1';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.borderColor = '#E5E7EB';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span
                    style={{
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      color: isSelected ? '#2E9E5B' : '#6B7280'
                    }}
                  >
                    {item.sector}
                  </span>
                  {isSelected && (
                    <span
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        color: '#2E9E5B',
                        background: '#EBF8F0',
                        padding: '2px 8px',
                        borderRadius: '999px'
                      }}
                    >
                      Visualizando
                    </span>
                  )}
                </div>

                <div
                  style={{
                    fontSize: '1.05rem',
                    fontWeight: 700,
                    color: '#0B1924',
                    lineHeight: 1.3
                  }}
                >
                  {item.companyName}
                </div>

                <div
                  style={{
                    fontSize: '0.84rem',
                    color: '#4B5563',
                    lineHeight: 1.4
                  }}
                >
                  {item.companySize}
                </div>

                {/* Score badge in the card selector */}
                <div
                  style={{
                    marginTop: '0.4rem',
                    paddingTop: '0.6rem',
                    borderTop: '1px solid #F3F4F6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '0.78rem'
                  }}
                >
                  <span style={{ color: '#6B7280' }}>Impacto IIM:</span>
                  <span style={{ fontWeight: 700, color: '#0B1924' }}>
                    <span style={{ color: '#DC2626' }}>{item.initialScoreIIM}</span>
                    <span style={{ margin: '0 4px', color: '#9CA3AF' }}>→</span>
                    <span style={{ color: '#2E9E5B' }}>{item.finalScoreIIM} pts</span>
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* ACTIVE CASE DETAILS CONTAINER */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '20px',
            border: '1px solid #E5E7EB',
            boxShadow: '0 12px 35px rgba(0, 0, 0, 0.04)',
            overflow: 'hidden'
          }}
        >
          {/* Top Hero Banner of the Case */}
          <div
            style={{
              padding: '2.5rem 2.5rem 2rem',
              borderBottom: '1px solid #F3F4F6',
              background: 'linear-gradient(180deg, #FFFFFF 0%, #FAFAFA 100%)'
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1.5rem',
                marginBottom: '1.2rem'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '0.6rem' }}>
                  <span
                    style={{
                      background: '#133E28',
                      color: '#FFFFFF',
                      fontSize: '0.76rem',
                      fontWeight: 700,
                      padding: '4px 10px',
                      borderRadius: '6px',
                      letterSpacing: '0.04em'
                    }}
                  >
                    {activeCase.sector}
                  </span>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      background: '#F3F4F6',
                      color: '#4B5563',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      padding: '4px 10px',
                      borderRadius: '6px'
                    }}
                  >
                    <Users size={13} />
                    {activeCase.companySize}
                  </span>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      background: '#F3F4F6',
                      color: '#4B5563',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      padding: '4px 10px',
                      borderRadius: '6px'
                    }}
                  >
                    <MapPin size={13} />
                    {activeCase.location}
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.5rem, 2.8vw, 2.2rem)',
                    fontWeight: 800,
                    color: '#0B1924',
                    lineHeight: 1.2,
                    marginBottom: '0.6rem'
                  }}
                >
                  {activeCase.companyName}
                </h3>

                <p
                  style={{
                    fontSize: '1.05rem',
                    color: '#374151',
                    lineHeight: 1.6,
                    maxWidth: '850px'
                  }}
                >
                  {activeCase.tagline}
                </p>
              </div>

              {/* IIM Score Comparison Widget */}
              <div
                style={{
                  background: '#FFFFFF',
                  borderRadius: '16px',
                  border: '1px solid #E5E7EB',
                  padding: '1.2rem 1.6rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.5rem',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.03)'
                }}
              >
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase' }}>
                    IIM Inicial
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '2rem',
                      fontWeight: 800,
                      color: '#DC2626',
                      lineHeight: 1.1
                    }}
                  >
                    {activeCase.initialScoreIIM}
                  </div>
                  <div style={{ fontSize: '0.70rem', color: '#DC2626', fontWeight: 600 }}>Crítico</div>
                </div>

                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '2px'
                  }}
                >
                  <ArrowRight size={22} color="#2E9E5B" />
                  <span
                    style={{
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      color: '#2E9E5B',
                      background: '#EBF8F0',
                      padding: '2px 6px',
                      borderRadius: '4px'
                    }}
                  >
                    queda
                  </span>
                </div>

                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase' }}>
                    IIM Final
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '2rem',
                      fontWeight: 800,
                      color: '#2E9E5B',
                      lineHeight: 1.1
                    }}
                  >
                    {activeCase.finalScoreIIM}
                  </div>
                  <div style={{ fontSize: '0.70rem', color: '#2E9E5B', fontWeight: 600 }}>Otimizado</div>
                </div>
              </div>
            </div>

            {/* 4 Quantitative Result Metric Badges */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem',
                marginTop: '1.5rem'
              }}
              className="case-metrics-grid"
            >
              {activeCase.results.metrics.map((metric, i) => (
                <div
                  key={i}
                  style={{
                    background: '#FFFFFF',
                    borderRadius: '12px',
                    border: '1px solid #E5E7EB',
                    padding: '1.1rem 1.2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <div style={{ fontSize: '0.78rem', color: '#6B7280', fontWeight: 600, marginBottom: '0.5rem' }}>
                    {metric.label}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '0.4rem' }}>
                    <span style={{ fontSize: '0.84rem', color: '#9CA3AF', textDecoration: 'line-through' }}>
                      {metric.before}
                    </span>
                    <span style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0B1924' }}>
                      {metric.after}
                    </span>
                  </div>
                  <div>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        color: '#2E9E5B',
                        background: '#EBF8F0',
                        padding: '2px 8px',
                        borderRadius: '6px'
                      }}
                    >
                      <TrendingDown size={13} />
                      {metric.badge}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3 Pillars Breakdown: Problem, Solution, Results */}
          <div
            style={{
              padding: '2.5rem',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
              gap: '2rem'
            }}
            className="case-breakdown-grid"
          >
            {/* 1. O Problema Inicial */}
            <div
              style={{
                background: '#FFFBFB',
                borderRadius: '16px',
                border: '1px solid #FEE2E2',
                padding: '2rem 1.8rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: '#DC2626',
                    marginBottom: '1rem',
                    background: '#FEF2F2',
                    padding: '4px 10px',
                    borderRadius: '6px'
                  }}
                >
                  <AlertCircle size={14} />
                  <span>01. O Problema Inicial</span>
                </div>

                <h4
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: '#0B1924',
                    marginBottom: '0.8rem',
                    lineHeight: 1.3
                  }}
                >
                  {activeCase.problem.title}
                </h4>

                <p
                  style={{
                    fontSize: '0.92rem',
                    color: '#4B5563',
                    lineHeight: 1.65,
                    marginBottom: '1.5rem'
                  }}
                >
                  {activeCase.problem.description}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {activeCase.problem.points.map((pt, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <div
                        style={{
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          background: '#DC2626',
                          marginTop: '7px',
                          flexShrink: 0
                        }}
                      />
                      <span style={{ fontSize: '0.88rem', color: '#4B5563', lineHeight: 1.5 }}>
                        {pt}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 2. A Solução UrbanFlow */}
            <div
              style={{
                background: '#F7FCF9',
                borderRadius: '16px',
                border: '1px solid #D1FAE5',
                padding: '2rem 1.8rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: '#2E9E5B',
                    marginBottom: '1rem',
                    background: '#EBF8F0',
                    padding: '4px 10px',
                    borderRadius: '6px'
                  }}
                >
                  <Sparkles size={14} />
                  <span>02. A Solução Aplicada</span>
                </div>

                <h4
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: '#0B1924',
                    marginBottom: '0.8rem',
                    lineHeight: 1.3
                  }}
                >
                  {activeCase.solution.title}
                </h4>

                <p
                  style={{
                    fontSize: '0.92rem',
                    color: '#4B5563',
                    lineHeight: 1.65,
                    marginBottom: '1.5rem'
                  }}
                >
                  {activeCase.solution.description}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {activeCase.solution.interventions.map((it, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <CheckCircle2
                        size={16}
                        color="#2E9E5B"
                        style={{ marginTop: '2px', flexShrink: 0 }}
                      />
                      <span style={{ fontSize: '0.88rem', color: '#1F2937', lineHeight: 1.5, fontWeight: 500 }}>
                        {it}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 3. Os Resultados & Retorno */}
            <div
              style={{
                background: '#F9FAFB',
                borderRadius: '16px',
                border: '1px solid #E5E7EB',
                padding: '2rem 1.8rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: '#133E28',
                    marginBottom: '1rem',
                    background: '#EAF2EC',
                    padding: '4px 10px',
                    borderRadius: '6px'
                  }}
                >
                  <TrendingUp size={14} />
                  <span>03. Resultados & ROI</span>
                </div>

                <h4
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: '#0B1924',
                    marginBottom: '0.8rem',
                    lineHeight: 1.3
                  }}
                >
                  {activeCase.results.title}
                </h4>

                <p
                  style={{
                    fontSize: '0.92rem',
                    color: '#4B5563',
                    lineHeight: 1.65,
                    marginBottom: '1.5rem'
                  }}
                >
                  {activeCase.results.description}
                </p>

                <div
                  style={{
                    background: '#FFFFFF',
                    borderRadius: '12px',
                    border: '1px solid #D5E2D9',
                    padding: '1.2rem',
                    marginBottom: '1rem'
                  }}
                >
                  <div style={{ fontSize: '0.76rem', fontWeight: 700, color: '#2E9E5B', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                    Impacto Econômico Líquido
                  </div>
                  <div style={{ fontSize: '0.94rem', fontWeight: 600, color: '#0B1924', lineHeight: 1.4 }}>
                    {activeCase.results.roiSummary}
                  </div>
                </div>
              </div>

              {/* Stakeholder quote */}
              <div
                style={{
                  borderTop: '1px solid #E5E7EB',
                  paddingTop: '1.2rem',
                  position: 'relative'
                }}
              >
                <div style={{ display: 'flex', gap: '8px' }}>
                  <Quote size={20} color="#2E9E5B" style={{ flexShrink: 0, opacity: 0.8 }} />
                  <div>
                    <p
                      style={{
                        fontSize: '0.84rem',
                        fontStyle: 'italic',
                        color: '#4B5563',
                        lineHeight: 1.5,
                        marginBottom: '0.5rem'
                      }}
                    >
                      "{activeCase.testimonial.quote}"
                    </p>
                    <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#0B1924' }}>
                      {activeCase.testimonial.author}
                    </div>
                    <div style={{ fontSize: '0.74rem', color: '#6B7280' }}>
                      {activeCase.testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Conversion Action for this Case */}
          <div
            style={{
              padding: '1.8rem 2.5rem',
              background: '#0B1924',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1.5rem'
            }}
            className="case-footer-cta"
          >
            <div>
              <div
                style={{
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  marginBottom: '0.3rem'
                }}
              >
                Sua empresa enfrenta desafios semelhantes de atrasos, estresse ou turnover?
              </div>
              <div style={{ fontSize: '0.88rem', color: '#9CA3AF' }}>
                Podemos rodar o diagnóstico preliminar do IIM na sua operação em poucos dias.
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <a
                href={COMPANY_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: '#2E9E5B',
                  color: '#FFFFFF',
                  padding: '12px 24px',
                  borderRadius: '10px',
                  fontWeight: 700,
                  fontSize: '0.92rem',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 4px 15px rgba(46, 158, 91, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#25834b';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#2E9E5B';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <span>Falar com consultor sobre este caso</span>
                <ArrowUpRight size={16} strokeWidth={2.5} />
              </a>

              <a
                href="#simulador"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: '#D1D5DB',
                  padding: '12px 18px',
                  borderRadius: '10px',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#FFFFFF';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#D1D5DB';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                }}
              >
                <span>Testar simulador didático</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
