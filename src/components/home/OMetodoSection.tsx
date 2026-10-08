import React, { useState } from 'react';

interface DimensionItem {
  id: string;
  code: string;
  title: string;
  labelChart: string;
  description: string;
  // Internal coordinate multiplier for radar visualization (not exposed to user)
  val: number;
}

const DIMENSIONS: DimensionItem[] = [
  {
    id: 'trajeto',
    code: '01 / TRAJETO',
    title: 'Trajeto',
    labelChart: 'TRAJETO',
    description: 'O caminho entre casa e trabalho. Esta dimensão olha para as condições do trajeto e sua participação no impacto da mobilidade.',
    val: 82
  },
  {
    id: 'estresse',
    code: '02 / ESTRESSE',
    title: 'Estresse',
    labelChart: 'ESTRESSE',
    description: 'O desgaste mental e físico gerado pela rotina de deslocamento. Avalia estresse crônico, fadiga, privação de sono e sobrecarga antes do expediente.',
    val: 76
  },
  {
    id: 'pontualidade',
    code: '03 / PONTUALIDADE',
    title: 'Pontualidade',
    labelChart: 'PONTUALIDADE',
    description: 'A relação entre deslocamento, pontualidade e assiduidade. Analisa frequência de atrasos e risco de rotatividade associado.',
    val: 68
  },
  {
    id: 'vulnerabilidade',
    code: '04 / VULNERABILIDADE',
    title: 'Vulnerabilidade',
    labelChart: 'VULNER.',
    description: 'A exposição a riscos urbanos, dependência de transporte público e barreiras socioespaciais no itinerário diário.',
    val: 62
  }
];

export const OMetodoSection: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const activeDim = DIMENSIONS[selectedIndex];

  // SVG Radar Coordinates
  const cx = 200;
  const cy = 180;
  const rMax = 115;

  // Vertex points for the 4 dimensions:
  // 0: Trajeto (Top: angle -90°)
  // 1: Estresse (Right: angle 0°)
  // 2: Pontualidade (Bottom: angle 90°)
  // 3: Vulnerabilidade (Left: angle 180°)
  const getPoint = (dimIndex: number, factor: number) => {
    const dist = (factor / 100) * rMax;
    switch (dimIndex) {
      case 0:
        return { x: cx, y: cy - dist };
      case 1:
        return { x: cx + dist, y: cy };
      case 2:
        return { x: cx, y: cy + dist };
      case 3:
      default:
        return { x: cx - dist, y: cy };
    }
  };

  const p0 = getPoint(0, DIMENSIONS[0].val);
  const p1 = getPoint(1, DIMENSIONS[1].val);
  const p2 = getPoint(2, DIMENSIONS[2].val);
  const p3 = getPoint(3, DIMENSIONS[3].val);
  const polygonPoints = `${p0.x},${p0.y} ${p1.x},${p1.y} ${p2.x},${p2.y} ${p3.x},${p3.y}`;

  return (
    <section
      id="o-metodo"
      style={{
        background: '#0B1924',
        color: '#FFFFFF',
        padding: '6.5rem 0',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3.5rem',
            alignItems: 'center'
          }}
          className="metodo-grid"
        >
          {/* LEFT COLUMN: Texts + 4 Dimension Buttons */}
          <div>
            {/* Eyebrow */}
            <div
              style={{
                fontSize: '0.78rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#6EE7B7',
                marginBottom: '1.2rem'
              }}
            >
              Dados que dão direção
            </div>

            {/* Title */}
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.1rem, 4vw, 3.1rem)',
                fontWeight: 800,
                color: '#FFFFFF',
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                marginBottom: '1.4rem'
              }}
            >
              Quatro perspectivas.
              <br />
              Um caminho mais inteligente.
            </h2>

            {/* Subtitle */}
            <p
              style={{
                fontSize: '1.05rem',
                color: '#94A3B8',
                lineHeight: 1.7,
                fontWeight: 400,
                marginBottom: '2.5rem',
                maxWidth: '520px'
              }}
            >
              O Índice de Impacto de Mobilidade (IIM) reúne quatro dimensões do deslocamento em uma visão estruturada para orientar o diagnóstico.
            </p>

            {/* 4 Clean Dimension Buttons in a 2x2 Grid (percentages removed, harmoniously aligned) */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '1rem',
                maxWidth: '520px'
              }}
              className="dimension-buttons-grid"
            >
              {DIMENSIONS.map((dim, idx) => {
                const isActive = selectedIndex === idx;
                return (
                  <button
                    key={dim.id}
                    type="button"
                    onClick={() => setSelectedIndex(idx)}
                    aria-label={`Selecionar dimensão ${dim.title}`}
                    style={{
                      background: isActive ? '#C6F6D5' : 'rgba(255, 255, 255, 0.03)',
                      color: isActive ? '#0B1924' : '#F8FAFC',
                      border: isActive
                        ? '1px solid #2E9E5B'
                        : '1px solid rgba(255, 255, 255, 0.14)',
                      borderRadius: '12px',
                      padding: '1.1rem 1.4rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      textAlign: 'left',
                      boxShadow: isActive ? '0 4px 18px rgba(46, 158, 91, 0.22)' : 'none'
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.14)';
                      }
                    }}
                  >
                    <span
                      style={{
                        fontSize: '1rem',
                        fontWeight: isActive ? 700 : 500,
                        letterSpacing: '-0.01em'
                      }}
                    >
                      {dim.title}
                    </span>
                  </button>
                );
              })}
            </div>
            {/* Note: The obsolete sentence "Os percentuais representam os pesos de cada dimensão..." was removed intentionally as per confidential methodology rules. */}
          </div>

          {/* RIGHT COLUMN: Dark Container Card with Radar Chart & Selected Dimension Info */}
          <div>
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.02)',
                borderRadius: '18px',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                padding: '2.4rem 2.2rem 2.2rem',
                boxShadow: '0 16px 40px rgba(0, 0, 0, 0.25)',
                position: 'relative'
              }}
            >
              {/* Header inside the card */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '1rem'
                }}
              >
                <span
                  style={{
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: '#94A3B8'
                  }}
                >
                  Índice de Impacto de Mobilidade
                </span>
                <span
                  style={{
                    fontSize: '0.74rem',
                    fontWeight: 600,
                    color: '#CBD5E1',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: 'var(--radius-pill)',
                    padding: '4px 12px',
                    background: 'rgba(255, 255, 255, 0.04)'
                  }}
                >
                  O método
                </span>
              </div>

              {/* RADAR SVG VISUALIZATION */}
              <div
                style={{
                  width: '100%',
                  maxWidth: '380px',
                  margin: '0 auto 1.5rem',
                  position: 'relative'
                }}
              >
                <svg
                  viewBox="0 0 400 360"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                >
                  {/* Concentric diamond grid guidelines */}
                  {[0.33, 0.66, 1.0].map((ratio, i) => {
                    const top = cy - rMax * ratio;
                    const right = cx + rMax * ratio;
                    const bottom = cy + rMax * ratio;
                    const left = cx - rMax * ratio;
                    return (
                      <polygon
                        key={i}
                        points={`${cx},${top} ${right},${cy} ${cx},${bottom} ${left},${cy}`}
                        fill="none"
                        stroke="rgba(255, 255, 255, 0.12)"
                        strokeWidth="1"
                        strokeDasharray={ratio === 1.0 ? 'none' : '3 3'}
                      />
                    );
                  })}

                  {/* Axis lines */}
                  <line
                    x1={cx}
                    y1={cy - rMax}
                    x2={cx}
                    y2={cy + rMax}
                    stroke="rgba(255, 255, 255, 0.15)"
                    strokeWidth="1"
                  />
                  <line
                    x1={cx - rMax}
                    y1={cy}
                    x2={cx + rMax}
                    y2={cy}
                    stroke="rgba(255, 255, 255, 0.15)"
                    strokeWidth="1"
                  />

                  {/* Polygon shape for IIM Dimensions */}
                  <polygon
                    points={polygonPoints}
                    fill="rgba(46, 158, 91, 0.24)"
                    stroke="#2E9E5B"
                    strokeWidth="2"
                    style={{ transition: 'all 0.3s ease' }}
                  />

                  {/* Center Circle IIM */}
                  <circle
                    cx={cx}
                    cy={cy}
                    r="24"
                    fill="#0B1924"
                    stroke="rgba(255, 255, 255, 0.25)"
                    strokeWidth="1.5"
                  />
                  <text
                    x={cx}
                    y={cy + 4}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#FFFFFF"
                    fontSize="11"
                    fontWeight="800"
                    fontFamily="var(--font-display)"
                    letterSpacing="0.05em"
                  >
                    IIM
                  </text>

                  {/* Dimension vertex labels & markers */}
                  {/* D0: TRAJETO (Top) */}
                  <g
                    style={{ cursor: 'pointer' }}
                    onClick={() => setSelectedIndex(0)}
                  >
                    <text
                      x={cx}
                      y={cy - rMax - 12}
                      textAnchor="middle"
                      fill={selectedIndex === 0 ? '#C6F6D5' : '#94A3B8'}
                      fontSize="11"
                      fontWeight={selectedIndex === 0 ? '700' : '500'}
                      letterSpacing="0.06em"
                    >
                      TRAJETO
                    </text>
                    <circle
                      cx={p0.x}
                      cy={p0.y}
                      r={selectedIndex === 0 ? 6 : 4}
                      fill={selectedIndex === 0 ? '#C6F6D5' : '#2E9E5B'}
                      stroke={selectedIndex === 0 ? '#2E9E5B' : 'transparent'}
                      strokeWidth="2"
                    />
                  </g>

                  {/* D1: ESTRESSE (Right) */}
                  <g
                    style={{ cursor: 'pointer' }}
                    onClick={() => setSelectedIndex(1)}
                  >
                    <text
                      x={cx + rMax + 14}
                      y={cy + 4}
                      textAnchor="start"
                      fill={selectedIndex === 1 ? '#C6F6D5' : '#94A3B8'}
                      fontSize="11"
                      fontWeight={selectedIndex === 1 ? '700' : '500'}
                      letterSpacing="0.06em"
                    >
                      ESTRESSE
                    </text>
                    <circle
                      cx={p1.x}
                      cy={p1.y}
                      r={selectedIndex === 1 ? 6 : 4}
                      fill={selectedIndex === 1 ? '#C6F6D5' : '#2E9E5B'}
                      stroke={selectedIndex === 1 ? '#2E9E5B' : 'transparent'}
                      strokeWidth="2"
                    />
                  </g>

                  {/* D2: PONTUALIDADE (Bottom) */}
                  <g
                    style={{ cursor: 'pointer' }}
                    onClick={() => setSelectedIndex(2)}
                  >
                    <text
                      x={cx}
                      y={cy + rMax + 20}
                      textAnchor="middle"
                      fill={selectedIndex === 2 ? '#C6F6D5' : '#94A3B8'}
                      fontSize="11"
                      fontWeight={selectedIndex === 2 ? '700' : '500'}
                      letterSpacing="0.06em"
                    >
                      PONTUALIDADE
                    </text>
                    <circle
                      cx={p2.x}
                      cy={p2.y}
                      r={selectedIndex === 2 ? 6 : 4}
                      fill={selectedIndex === 2 ? '#C6F6D5' : '#2E9E5B'}
                      stroke={selectedIndex === 2 ? '#2E9E5B' : 'transparent'}
                      strokeWidth="2"
                    />
                  </g>

                  {/* D3: VULNERABILIDADE (Left) */}
                  <g
                    style={{ cursor: 'pointer' }}
                    onClick={() => setSelectedIndex(3)}
                  >
                    <text
                      x={cx - rMax - 14}
                      y={cy + 4}
                      textAnchor="end"
                      fill={selectedIndex === 3 ? '#C6F6D5' : '#94A3B8'}
                      fontSize="11"
                      fontWeight={selectedIndex === 3 ? '700' : '500'}
                      letterSpacing="0.06em"
                    >
                      VULNER.
                    </text>
                    <circle
                      cx={p3.x}
                      cy={p3.y}
                      r={selectedIndex === 3 ? 6 : 4}
                      fill={selectedIndex === 3 ? '#C6F6D5' : '#2E9E5B'}
                      stroke={selectedIndex === 3 ? '#2E9E5B' : 'transparent'}
                      strokeWidth="2"
                    />
                  </g>
                </svg>
              </div>

              {/* Lower Section: Detailed Description of the Selected Dimension (NO GIANT NUMERICAL PERCENTAGE) */}
              <div
                style={{
                  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                  paddingTop: '1.4rem'
                }}
              >
                {/* Clean Title only, giant percentage removed */}
                <div
                  style={{
                    fontSize: '0.80rem',
                    fontWeight: 700,
                    letterSpacing: '0.10em',
                    textTransform: 'uppercase',
                    color: '#6EE7B7',
                    marginBottom: '0.6rem'
                  }}
                >
                  {activeDim.code}
                </div>

                {/* Description */}
                <p
                  style={{
                    fontSize: '0.94rem',
                    color: '#CBD5E1',
                    lineHeight: 1.65,
                    marginBottom: '1.4rem',
                    minHeight: '52px'
                  }}
                >
                  {activeDim.description}
                </p>

                {/* Legal disclaimer */}
                <div
                  style={{
                    fontSize: '0.73rem',
                    color: '#64748B',
                    lineHeight: 1.5,
                    borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                    paddingTop: '0.8rem'
                  }}
                >
                  Dados estimados e projetados. A metodologia apoia o diagnóstico; não representa garantia de resultado.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .dimension-buttons-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
