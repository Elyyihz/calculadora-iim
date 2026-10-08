import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Compass, Calculator, ArrowRight, Info } from 'lucide-react';

interface DimensionDetail {
  code: string;
  weight: string;
  name: string;
  color: string;
  description: string;
  factors: string[];
}

const DIMENSIONS: DimensionDetail[] = [
  {
    code: 'D1',
    weight: '30%',
    name: 'Tempo e Distância (Trajeto)',
    color: '#0B2545',
    description: 'Avalia a fricção física e o tempo despendido no deslocamento pendular diário, penalizando esperas e baldeações.',
    factors: ['Duração do trajeto ida e volta', 'Quilometragem e conexões/baldeações', 'Incerteza e variação de trânsito']
  },
  {
    code: 'D2',
    weight: '27%',
    name: 'Estresse e Fadiga Percebidos',
    color: '#133966',
    description: 'Mede o desgaste fisiológico e psicológico acumulado antes do expediente, com impacto direto no presenteísmo.',
    factors: ['Nível de cansaço e perda de foco', 'Impacto na qualidade do sono', 'Ansiedade e privação de lazer']
  },
  {
    code: 'D3',
    weight: '25%',
    name: 'Pontualidade e Assiduidade',
    color: '#2E9E5B',
    description: 'Quantifica as perdas operacionais por absenteísmo forçado, recusa de tarefas e o risco real de demissão motivada pelo trânsito.',
    factors: ['Frequência de atrasos e faltas', 'Licenças médicas e home office forçado', 'Intenção voluntária de demissão']
  },
  {
    code: 'D4',
    weight: '18%',
    name: 'Vulnerabilidade Socioespacial',
    color: '#059669',
    description: 'Avalia a dependência de modais precários, exposição a riscos urbanos (obras, alagamentos, violência) e comprometimento de renda.',
    factors: ['Dependência de transporte público', 'Exposição a riscos no itinerário', 'Comprometimento de renda com transporte']
  }
];

export const OMetodoSection: React.FC = () => {
  // Scenario state: 'comparison' | 'optimized' | 'baseline'
  const [activeScenario, setActiveScenario] = useState<'comparison' | 'baseline' | 'optimized'>('comparison');

  // Baseline values (sem gestão, IIM alto)
  const baseline = { d1: 78, d2: 82, d3: 70, d4: 65 };
  // Optimized values (com UrbanFlow, IIM baixo)
  const optimized = { d1: 34, d2: 28, d3: 30, d4: 25 };

  // Center & Radius for 400x400 viewBox
  const cx = 200;
  const cy = 200;
  const rMax = 135;

  const getCoordinates = (d1: number, d2: number, d3: number, d4: number) => {
    // D1: Top (angle -90°)
    const x1 = cx;
    const y1 = cy - (d1 / 100) * rMax;
    // D2: Right (angle 0°)
    const x2 = cx + (d2 / 100) * rMax;
    const y2 = cy;
    // D3: Bottom (angle 90°)
    const x3 = cx;
    const y3 = cy + (d3 / 100) * rMax;
    // D4: Left (angle 180°)
    const x4 = cx - (d4 / 100) * rMax;
    const y4 = cy;

    return `${x1},${y1} ${x2},${y2} ${x3},${y3} ${x4},${y4}`;
  };

  const baselinePoints = getCoordinates(baseline.d1, baseline.d2, baseline.d3, baseline.d4);
  const optimizedPoints = getCoordinates(optimized.d1, optimized.d2, optimized.d3, optimized.d4);

  return (
    <section
      id="o-metodo"
      style={{
        background: 'var(--surface-2)',
        padding: '7rem 0',
        position: 'relative'
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div style={{ maxWidth: '820px', margin: '0 auto 4.5rem', textAlign: 'center' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '5px 14px',
              borderRadius: 'var(--radius-pill)',
              background: 'rgba(11, 37, 69, 0.08)',
              color: 'var(--brand)',
              fontSize: '0.78rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '1.2rem'
            }}
          >
            <Compass size={14} color="var(--accent)" />
            <span>Matriz Multicritério Proprietária</span>
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
            O Método
          </h2>
          <p
            style={{
              fontSize: '1.1rem',
              color: 'var(--text-muted)',
              lineHeight: 1.7,
              fontWeight: 400
            }}
          >
            O Índice de Impacto de Mobilidade (IIM) consolida dados quantitativos e percepções humanas
            em 4 dimensões científicas ponderadas. Uma escala de 0 a 100 onde quanto menor a pontuação,
            maior a eficiência operacional e o bem-estar corporativo.
          </p>
        </div>

        {/* Content Layout: Radar Chart on Left, Dimensions Details on Right */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: '3rem',
            alignItems: 'center',
            marginBottom: '4.5rem'
          }}
        >
          {/* RADAR CHART INTERACTIVE CARD */}
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: 'var(--radius)',
              border: '1px solid rgba(11, 37, 69, 0.08)',
              padding: '2.5rem 2rem',
              boxShadow: '0 8px 30px rgba(11, 37, 69, 0.04)',
              textAlign: 'center'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '10px' }}>
              <div style={{ textAlign: 'left' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Visualização Polar
                </span>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--brand)' }}>
                  Gráfico de Radar do IIM
                </h3>
              </div>

              {/* Scenario Toggle */}
              <div
                style={{
                  display: 'inline-flex',
                  background: 'var(--surface-2)',
                  padding: '3px',
                  borderRadius: 'var(--radius-pill)',
                  border: '1px solid var(--border)'
                }}
              >
                <button
                  type="button"
                  onClick={() => setActiveScenario('comparison')}
                  style={{
                    padding: '5px 12px',
                    borderRadius: 'var(--radius-pill)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: activeScenario === 'comparison' ? '#FFFFFF' : 'var(--text-muted)',
                    background: activeScenario === 'comparison' ? 'var(--brand)' : 'transparent',
                    transition: 'all 0.2s'
                  }}
                >
                  Comparativo
                </button>
                <button
                  type="button"
                  onClick={() => setActiveScenario('baseline')}
                  style={{
                    padding: '5px 12px',
                    borderRadius: 'var(--radius-pill)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: activeScenario === 'baseline' ? '#FFFFFF' : 'var(--text-muted)',
                    background: activeScenario === 'baseline' ? '#cc3333' : 'transparent',
                    transition: 'all 0.2s'
                  }}
                >
                  Sem Gestão
                </button>
                <button
                  type="button"
                  onClick={() => setActiveScenario('optimized')}
                  style={{
                    padding: '5px 12px',
                    borderRadius: 'var(--radius-pill)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: activeScenario === 'optimized' ? '#FFFFFF' : 'var(--text-muted)',
                    background: activeScenario === 'optimized' ? 'var(--accent)' : 'transparent',
                    transition: 'all 0.2s'
                  }}
                >
                  Otimizado
                </button>
              </div>
            </div>

            {/* SVG RADAR GRAPH */}
            <div style={{ maxWidth: '380px', margin: '0 auto', position: 'relative' }}>
              <svg viewBox="0 0 400 400" style={{ width: '100%', height: 'auto', display: 'block' }}>
                {/* Concentric Grid Polygons */}
                {[0.25, 0.5, 0.75, 1.0].map((level, i) => (
                  <polygon
                    key={i}
                    points={getCoordinates(level * 100, level * 100, level * 100, level * 100)}
                    fill="none"
                    stroke="#E5E7EB"
                    strokeWidth="1.2"
                    strokeDasharray={level === 1 ? 'none' : '3 3'}
                  />
                ))}

                {/* Axes lines */}
                <line x1={cx} y1={cy - rMax} x2={cx} y2={cy + rMax} stroke="#D1D5DB" strokeWidth="1" />
                <line x1={cx - rMax} y1={cy} x2={cx + rMax} y2={cy} stroke="#D1D5DB" strokeWidth="1" />

                {/* Grid Scale Labels */}
                <text x={cx + 6} y={cy - rMax * 0.25 + 4} fontSize="9" fill="#9CA3AF" fontWeight="600">25</text>
                <text x={cx + 6} y={cy - rMax * 0.50 + 4} fontSize="9" fill="#9CA3AF" fontWeight="600">50</text>
                <text x={cx + 6} y={cy - rMax * 0.75 + 4} fontSize="9" fill="#9CA3AF" fontWeight="600">75</text>
                <text x={cx + 6} y={cy - rMax * 1.00 + 4} fontSize="9" fill="#9CA3AF" fontWeight="600">100</text>

                {/* Baseline Polygon (Red / High Impact) */}
                {(activeScenario === 'comparison' || activeScenario === 'baseline') && (
                  <polygon
                    points={baselinePoints}
                    fill="rgba(204, 51, 51, 0.18)"
                    stroke="#CC3333"
                    strokeWidth="2.5"
                    style={{ transition: 'all 0.4s ease' }}
                  />
                )}

                {/* Optimized Polygon (Green / Low Impact) */}
                {(activeScenario === 'comparison' || activeScenario === 'optimized') && (
                  <polygon
                    points={optimizedPoints}
                    fill="rgba(46, 158, 91, 0.22)"
                    stroke="#2E9E5B"
                    strokeWidth="2.5"
                    style={{ transition: 'all 0.4s ease' }}
                  />
                )}

                {/* Dimension Vertex Points & Labels */}
                {/* D1 Top */}
                <circle cx={cx} cy={cy - rMax} r="4" fill="#0B2545" />
                <text x={cx} y={cy - rMax - 14} textAnchor="middle" fontSize="12" fontWeight="700" fill="#0B2545" fontFamily="var(--font-display)">
                  D1 · Trajeto (30%)
                </text>

                {/* D2 Right */}
                <circle cx={cx + rMax} cy={cy} r="4" fill="#0B2545" />
                <text x={cx + rMax + 12} y={cy + 4} textAnchor="start" fontSize="12" fontWeight="700" fill="#0B2545" fontFamily="var(--font-display)">
                  D2 · Estresse (27%)
                </text>

                {/* D3 Bottom */}
                <circle cx={cx} cy={cy + rMax} r="4" fill="#0B2545" />
                <text x={cx} y={cy + rMax + 20} textAnchor="middle" fontSize="12" fontWeight="700" fill="#0B2545" fontFamily="var(--font-display)">
                  D3 · Assiduidade (25%)
                </text>

                {/* D4 Left */}
                <circle cx={cx - rMax} cy={cy} r="4" fill="#0B2545" />
                <text x={cx - rMax - 12} y={cy + 4} textAnchor="end" fontSize="12" fontWeight="700" fill="#0B2545" fontFamily="var(--font-display)">
                  D4 · Vulnerab. (18%)
                </text>
              </svg>
            </div>

            {/* Legend strip */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1.5rem',
                marginTop: '1.5rem',
                paddingTop: '1.2rem',
                borderTop: '1px solid #F3F4F6',
                fontSize: '0.82rem'
              }}
            >
              {(activeScenario === 'comparison' || activeScenario === 'baseline') && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: 'rgba(204, 51, 51, 0.6)', border: '1.5px solid #CC3333' }} />
                  <span style={{ fontWeight: 600, color: 'var(--text)' }}>Sem Gestão (IIM 74 · Crítico)</span>
                </div>
              )}
              {(activeScenario === 'comparison' || activeScenario === 'optimized') && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: 'rgba(46, 158, 91, 0.6)', border: '1.5px solid #2E9E5B' }} />
                  <span style={{ fontWeight: 600, color: 'var(--text)' }}>UrbanFlow (IIM 32 · Baixo Impacto)</span>
                </div>
              )}
            </div>
          </div>

          {/* 4 DIMENSIONS DETAIL CARDS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            {DIMENSIONS.map((dim) => (
              <div
                key={dim.code}
                style={{
                  background: '#FFFFFF',
                  borderRadius: 'var(--radius)',
                  border: '1px solid rgba(11, 37, 69, 0.08)',
                  padding: '1.5rem 1.8rem',
                  boxShadow: '0 2px 14px rgba(11, 37, 69, 0.03)',
                  transition: 'border-color var(--transition-fast)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '0.90rem',
                        fontWeight: 800,
                        color: '#FFFFFF',
                        background: 'var(--brand)',
                        padding: '3px 10px',
                        borderRadius: '6px'
                      }}
                    >
                      {dim.code}
                    </span>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--brand)' }}>
                      {dim.name}
                    </h4>
                  </div>
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '0.92rem',
                      fontWeight: 800,
                      color: 'var(--accent)',
                      background: 'var(--accent-light)',
                      padding: '3px 10px',
                      borderRadius: 'var(--radius-pill)'
                    }}
                  >
                    Peso {dim.weight}
                  </span>
                </div>

                <p style={{ fontSize: '0.88rem', color: '#4B5563', lineHeight: 1.6, marginBottom: '0.8rem' }}>
                  {dim.description}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {dim.factors.map((f, idx) => (
                    <span
                      key={idx}
                      style={{
                        fontSize: '0.78rem',
                        color: 'var(--brand)',
                        background: 'var(--surface-2)',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontWeight: 500
                      }}
                    >
                      • {f}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM METRIC CALLOUT */}
        <div
          style={{
            background: 'var(--brand)',
            borderRadius: 'var(--radius)',
            padding: '2.5rem 3rem',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.5rem',
            boxShadow: '0 8px 32px rgba(11, 37, 69, 0.16)'
          }}
          className="card-blue"
        >
          <div style={{ maxWidth: '640px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--accent)', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
              <Info size={14} />
              <span>Regra de Escala do IIM</span>
            </div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '0.5rem' }}>
              Quanto maior a pontuação, maior o atrito e a perda financeira
            </h3>
            <p style={{ fontSize: '0.92rem', color: 'rgba(255, 255, 255, 0.90)', lineHeight: 1.6 }}>
              O IIM opera em escala inversa ao bem-estar: scores acima de 60 exigem intervenção emergencial.
              Nosso objetivo na consultoria é conduzir sua organização para a faixa verde (IIM ≤ 40).
            </p>
          </div>

          <Link
            to="/calculadora"
            className="btn btn-cta"
            style={{
              padding: '14px 28px',
              fontSize: '0.95rem'
            }}
          >
            <Calculator size={18} />
            <span>Testar na Calculadora</span>
            <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </section>
  );
};
