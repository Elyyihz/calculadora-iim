import React, { useState, useMemo } from 'react';
import { ArrowUpRight, Calculator, Info, Sparkles, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { COMPANY_INFO } from '../../data/institutionalData';

interface PorteOption {
  label: string;
  colaboradores: number;
  custoBaseTurnover: number;
}

interface TempoOption {
  label: string;
  pontos: number;
}

interface ModalOption {
  label: string;
  pontos: number;
  vulnerabilidade: number;
}

interface DesgasteOption {
  label: string;
  pontos: number;
}

const PORTES: PorteOption[] = [
  { label: '20 a 50 pessoas', colaboradores: 35, custoBaseTurnover: 42000 },
  { label: '51 a 200 pessoas', colaboradores: 120, custoBaseTurnover: 144000 },
  { label: '201 a 500 pessoas', colaboradores: 320, custoBaseTurnover: 384000 },
  { label: 'Mais de 500 pessoas', colaboradores: 650, custoBaseTurnover: 780000 }
];

const TEMPOS: TempoOption[] = [
  { label: 'Até 1h / dia', pontos: 25 },
  { label: '1h a 2h / dia', pontos: 55 },
  { label: '2h a 3h / dia', pontos: 78 },
  { label: 'Mais de 3h / dia', pontos: 95 }
];

const MODAIS: ModalOption[] = [
  { label: 'Transporte Público (Ônibus / Metrô)', pontos: 82, vulnerabilidade: 85 },
  { label: 'Veículo Próprio (Carro / Moto)', pontos: 65, vulnerabilidade: 45 },
  { label: 'Misto / Aplicativo', pontos: 50, vulnerabilidade: 50 },
  { label: 'Fretado / Mobilidade Ativa', pontos: 30, vulnerabilidade: 25 }
];

const DESGASTES: DesgasteOption[] = [
  { label: 'Baixo (rotina previsível)', pontos: 25 },
  { label: 'Moderado (cansaço regular)', pontos: 55 },
  { label: 'Crítico (alto estresse e atrasos)', pontos: 88 }
];

/**
 * Calculadora Didática Simplificada para a Landing Page Pública.
 *
 * Apresenta uma versão conceitual e instantânea com apenas 4 variáveis básicas
 * para que visitantes externos e tomadores de decisão compreendam a lógica
 * de monetização e atrito do IIM sem expor a complexidade das 36 perguntas internas.
 */
export const CalculadoraDidaticaSection: React.FC = () => {
  const [porteIndex, setPorteIndex] = useState<number>(1); // Default: 51-200
  const [tempoIndex, setTempoIndex] = useState<number>(1); // Default: 1h-2h
  const [modalIndex, setModalIndex] = useState<number>(0); // Default: Transporte Público
  const [desgasteIndex, setDesgasteIndex] = useState<number>(1); // Default: Moderado

  // Cálculo didático instantâneo
  const { iimScore, custoEstimadoAnual, nivelImpacto, corNivel, dimensaoScores } = useMemo(() => {
    const selPorte = PORTES[porteIndex];
    const selTempo = TEMPOS[tempoIndex];
    const selModal = MODAIS[modalIndex];
    const selDesgaste = DESGASTES[desgasteIndex];

    // Ponderação didática preliminar
    const d1 = selTempo.pontos;
    const d2 = selDesgaste.pontos;
    const d3 = Math.round((selTempo.pontos * 0.5) + (selDesgaste.pontos * 0.5));
    const d4 = selModal.vulnerabilidade;

    const rawIim = Math.round((d1 * 0.30) + (d2 * 0.27) + (d3 * 0.25) + (d4 * 0.18));
    const finalIim = Math.min(Math.max(rawIim, 15), 95);

    // Estimativa didática de perda anual (custo de transição e absenteísmo por colaborador)
    // Fator proporcional ao IIM e porte da empresa
    const custoPorColab = (finalIim / 100) * 1850;
    const custoPerdaAnual = Math.round(selPorte.colaboradores * custoPorColab * 12);

    let nivel = 'Moderado';
    let cor = '#D97706';
    if (finalIim <= 38) {
      nivel = 'Baixo Impacto (Saudável)';
      cor = '#2E9E5B';
    } else if (finalIim > 65) {
      nivel = 'Crítico (Atrito Severo)';
      cor = '#DC2626';
    }

    return {
      iimScore: finalIim,
      custoEstimadoAnual: custoPerdaAnual,
      nivelImpacto: nivel,
      corNivel: cor,
      dimensaoScores: { d1, d2, d3, d4 }
    };
  }, [porteIndex, tempoIndex, modalIndex, desgasteIndex]);

  const whatsappDidaticoUrl = `${COMPANY_INFO.whatsappUrl}%20Fiz%20a%20simula%C3%A7%C3%A3o%20did%C3%A1tica%20do%20IIM%20no%20site%20(Score%20${iimScore})%20e%20gostaria%20de%20um%20diagn%C3%B3stico%20completo%20com%20a%20UrbanFlow.`;

  return (
    <section
      id="simulador"
      style={{
        background: '#F9FAFB',
        borderTop: '1px solid #E5E7EB',
        borderBottom: '1px solid #E5E7EB',
        padding: '6.5rem 0 7rem',
        position: 'relative'
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div style={{ maxWidth: '780px', margin: '0 auto 4rem', textAlign: 'center' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 16px',
              borderRadius: 'var(--radius-pill)',
              background: 'rgba(46, 158, 91, 0.12)',
              color: '#2E9E5B',
              fontSize: '0.78rem',
              fontWeight: 700,
              letterSpacing: '0.10em',
              textTransform: 'uppercase',
              marginBottom: '1.2rem'
            }}
          >
            <Sparkles size={14} />
            <span>Simulador Didático Preliminar</span>
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.1rem, 4vw, 3.2rem)',
              fontWeight: 800,
              color: '#0B1924',
              lineHeight: 1.15,
              letterSpacing: '-0.025em',
              marginBottom: '1.2rem'
            }}
          >
            Entenda o conceito do IIM na sua empresa
          </h2>

          <p
            style={{
              fontSize: '1.08rem',
              color: '#4B5563',
              lineHeight: 1.7,
              fontWeight: 400
            }}
          >
            O Índice de Impacto de Mobilidade conecta tempo de deslocamento a perdas financeiras concretas.
            Selecione 4 variáveis simplificadas para visualizar uma estimativa ilustrativa em tempo real.
          </p>
        </div>

        {/* 2-Column Grid: Inputs on Left, Realtime Didactic Output on Right */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '2.5rem',
            alignItems: 'start'
          }}
          className="simulador-grid"
        >
          {/* LEFT: 4 SIMPLIFIED CONTROLS */}
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '20px',
              border: '1px solid #E5E7EB',
              padding: '2.5rem 2.2rem',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.03)',
              display: 'flex',
              flexDirection: 'column',
              gap: '2rem'
            }}
          >
            {/* Control 1: Porte da Empresa */}
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  color: '#0B1924',
                  marginBottom: '0.75rem'
                }}
              >
                1. Tamanho da equipe na operação
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                {PORTES.map((p, idx) => {
                  const active = porteIndex === idx;
                  return (
                    <button
                      key={p.label}
                      type="button"
                      onClick={() => setPorteIndex(idx)}
                      style={{
                        padding: '10px 12px',
                        borderRadius: '10px',
                        border: active ? '1.5px solid #2E9E5B' : '1px solid #E5E7EB',
                        background: active ? '#EBF8F0' : '#FFFFFF',
                        color: active ? '#1E3A2B' : '#4B5563',
                        fontSize: '0.84rem',
                        fontWeight: active ? 700 : 500,
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {p.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Control 2: Tempo de Deslocamento */}
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  color: '#0B1924',
                  marginBottom: '0.75rem'
                }}
              >
                2. Tempo médio de deslocamento diário (ida + volta)
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                {TEMPOS.map((t, idx) => {
                  const active = tempoIndex === idx;
                  return (
                    <button
                      key={t.label}
                      type="button"
                      onClick={() => setTempoIndex(idx)}
                      style={{
                        padding: '10px 12px',
                        borderRadius: '10px',
                        border: active ? '1.5px solid #2E9E5B' : '1px solid #E5E7EB',
                        background: active ? '#EBF8F0' : '#FFFFFF',
                        color: active ? '#1E3A2B' : '#4B5563',
                        fontSize: '0.84rem',
                        fontWeight: active ? 700 : 500,
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {t.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Control 3: Modal Predominante */}
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  color: '#0B1924',
                  marginBottom: '0.75rem'
                }}
              >
                3. Principal modal de transporte utilizado
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {MODAIS.map((m, idx) => {
                  const active = modalIndex === idx;
                  return (
                    <button
                      key={m.label}
                      type="button"
                      onClick={() => setModalIndex(idx)}
                      style={{
                        padding: '10px 14px',
                        borderRadius: '10px',
                        textAlign: 'left',
                        border: active ? '1.5px solid #2E9E5B' : '1px solid #E5E7EB',
                        background: active ? '#EBF8F0' : '#FFFFFF',
                        color: active ? '#1E3A2B' : '#4B5563',
                        fontSize: '0.84rem',
                        fontWeight: active ? 700 : 500,
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {m.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Control 4: Nível de Desgaste e Atrasos */}
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  color: '#0B1924',
                  marginBottom: '0.75rem'
                }}
              >
                4. Percepção geral de desgaste e pontualidade
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {DESGASTES.map((d, idx) => {
                  const active = desgasteIndex === idx;
                  return (
                    <button
                      key={d.label}
                      type="button"
                      onClick={() => setDesgasteIndex(idx)}
                      style={{
                        padding: '10px 14px',
                        borderRadius: '10px',
                        textAlign: 'left',
                        border: active ? '1.5px solid #2E9E5B' : '1px solid #E5E7EB',
                        background: active ? '#EBF8F0' : '#FFFFFF',
                        color: active ? '#1E3A2B' : '#4B5563',
                        fontSize: '0.84rem',
                        fontWeight: active ? 700 : 500,
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {d.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT: REALTIME DIDACTIC RESULT CARD */}
          <div
            style={{
              background: '#0B1924',
              color: '#FFFFFF',
              borderRadius: '20px',
              padding: '2.8rem 2.4rem',
              boxShadow: '0 16px 40px rgba(11, 25, 36, 0.18)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative'
            }}
          >
            <div>
              {/* Header result */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '1.5rem',
                  paddingBottom: '1.2rem',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.12)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Calculator size={18} color="#2E9E5B" />
                  <span style={{ fontSize: '0.82rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#94A3B8' }}>
                    Resultado Didático
                  </span>
                </div>
                <span
                  style={{
                    fontSize: '0.75rem',
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-pill)',
                    background: 'rgba(255, 255, 255, 0.08)',
                    color: '#CBD5E1'
                  }}
                >
                  Simulação Preliminar
                </span>
              </div>

              {/* Main Score & Financial Loss Hero */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                  gap: '1.5rem',
                  marginBottom: '2rem'
                }}
              >
                {/* Score */}
                <div>
                  <div style={{ fontSize: '0.78rem', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>
                    Score IIM Estimado
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '3rem',
                      fontWeight: 800,
                      color: corNivel,
                      lineHeight: 1
                    }}
                  >
                    {iimScore}
                    <span style={{ fontSize: '1.1rem', color: '#94A3B8', fontWeight: 400 }}> / 100</span>
                  </div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 600, color: corNivel, marginTop: '6px' }}>
                    {nivelImpacto}
                  </div>
                </div>

                {/* Financial Loss */}
                <div>
                  <div style={{ fontSize: '0.78rem', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>
                    Perda Operacional Estimada
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '2rem',
                      fontWeight: 800,
                      color: '#FFFFFF',
                      lineHeight: 1.2
                    }}
                  >
                    R$ {(custoEstimadoAnual / 1000).toFixed(0)}k
                    <span style={{ fontSize: '0.85rem', color: '#94A3B8', fontWeight: 400 }}> / ano</span>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#94A3B8', marginTop: '4px' }}>
                    Custo de transição & atrasos
                  </div>
                </div>
              </div>

              {/* Mini Dimensions Bars */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2rem' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: '#CBD5E1', marginBottom: '3px' }}>
                    <span>Trajeto e Distância</span>
                    <span>{dimensaoScores.d1} pts</span>
                  </div>
                  <div style={{ height: '6px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${dimensaoScores.d1}%`, height: '100%', background: '#2E9E5B', transition: 'width 0.3s ease' }} />
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: '#CBD5E1', marginBottom: '3px' }}>
                    <span>Estresse e Fadiga</span>
                    <span>{dimensaoScores.d2} pts</span>
                  </div>
                  <div style={{ height: '6px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${dimensaoScores.d2}%`, height: '100%', background: '#2E9E5B', transition: 'width 0.3s ease' }} />
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: '#CBD5E1', marginBottom: '3px' }}>
                    <span>Pontualidade e Rotina</span>
                    <span>{dimensaoScores.d3} pts</span>
                  </div>
                  <div style={{ height: '6px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${dimensaoScores.d3}%`, height: '100%', background: '#2E9E5B', transition: 'width 0.3s ease' }} />
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: '#CBD5E1', marginBottom: '3px' }}>
                    <span>Vulnerabilidade Urbana</span>
                    <span>{dimensaoScores.d4} pts</span>
                  </div>
                  <div style={{ height: '6px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${dimensaoScores.d4}%`, height: '100%', background: '#2E9E5B', transition: 'width 0.3s ease' }} />
                  </div>
                </div>
              </div>

              {/* Explanatory Didactic Note */}
              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  padding: '1rem 1.2rem',
                  fontSize: '0.82rem',
                  color: '#CBD5E1',
                  lineHeight: 1.55,
                  marginBottom: '2rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#6EE7B7', fontWeight: 700, marginBottom: '4px' }}>
                  <Info size={14} />
                  <span>Entendendo o conceito:</span>
                </div>
                O IIM opera em escala inversa: quanto mais alta a pontuação, maior é o atrito e mais dinheiro a empresa perde silenciosamente em turnover e presenteísmo matinal.
              </div>
            </div>

            {/* Bottom Actions */}
            <div>
              {/* PRIMARY GREEN ACTION: Solicitar Diagnóstico Completo Oficial */}
              <a
                href={whatsappDidaticoUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  background: '#2E9E5B',
                  color: '#FFFFFF',
                  padding: '16px 24px',
                  fontSize: '1rem',
                  fontWeight: 700,
                  borderRadius: '12px',
                  textDecoration: 'none',
                  boxShadow: '0 8px 24px rgba(46, 158, 91, 0.35)',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer',
                  marginBottom: '1rem'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#25824A';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#2E9E5B';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <span>Solicitar diagnóstico completo</span>
                <ArrowUpRight size={18} strokeWidth={2.4} />
              </a>

              {/* Internal Workspace Access Link */}
              <div style={{ textAlign: 'center' }}>
                <Link
                  to="/interno/calculadora"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px',
                    fontSize: '0.78rem',
                    color: '#64748B',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#94A3B8')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#64748B')}
                >
                  <Lock size={12} />
                  <span>Acesso restrito da equipe UrbanFlow</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
