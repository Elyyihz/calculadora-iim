import React from 'react';
import { DimensionalScores, FinancialMetrics } from '../../../types/calculatorDTOs';

interface RadarDimensionalSectionProps {
  dimensoes: DimensionalScores;
  financeiro: FinancialMetrics;
}

const fmtBRL = (v: number) =>
  'R$\u00a0' + Math.round(v).toLocaleString('pt-BR');

export const RadarDimensionalSection: React.FC<RadarDimensionalSectionProps> = ({
  dimensoes,
  financeiro
}) => {
  // SVG Radar setup
  const cx = 150;
  const cy = 150;
  const r = 95;
  const vals = [
    dimensoes.d1Norm / 100,
    dimensoes.d2Norm / 100,
    dimensoes.d3Norm / 100,
    dimensoes.d4Norm / 100
  ];
  const angles = [-Math.PI / 2, 0, Math.PI / 2, Math.PI]; // top, right, bottom, left
  const labels = ['D1', 'D2', 'D3', 'D4'];
  const subs = ['Trajeto', 'Estresse', 'Pontual.', 'Vulnerab.'];
  const scores = [
    Math.round(dimensoes.d1Norm),
    Math.round(dimensoes.d2Norm),
    Math.round(dimensoes.d3Norm),
    Math.round(dimensoes.d4Norm)
  ];

  const polygonPoints = vals
    .map(
      (v, i) =>
        `${(cx + v * r * Math.cos(angles[i])).toFixed(1)},${(cy + v * r * Math.sin(angles[i])).toFixed(1)}`
    )
    .join(' ');

  const dimScoreItems = [
    { label: 'D1 · Trajeto', val: dimensoes.d1Norm, weight: '30%' },
    { label: 'D2 · Estresse', val: dimensoes.d2Norm, weight: '27%' },
    { label: 'D3 · Pontualidade', val: dimensoes.d3Norm, weight: '25%' },
    { label: 'D4 · Vulnerabilidade', val: dimensoes.d4Norm, weight: '18%' }
  ];

  const dimCostItems = [
    { label: 'D1 · Trajeto', cost: financeiro.custoPorDimensao.d1 },
    { label: 'D2 · Estresse', cost: financeiro.custoPorDimensao.d2 },
    { label: 'D3 · Pontualidade', cost: financeiro.custoPorDimensao.d3 },
    { label: 'D4 · Vulnerabilidade', cost: financeiro.custoPorDimensao.d4 }
  ];

  const maxCost = Math.max(
    financeiro.custoPorDimensao.d1,
    financeiro.custoPorDimensao.d2,
    financeiro.custoPorDimensao.d3,
    financeiro.custoPorDimensao.d4,
    1
  );

  return (
    <div className="res-section">
      <div className="res-two-col">
        {/* RADAR CHART SVG */}
        <div>
          <p className="calc-subsection-title" style={{ marginTop: 0 }}>
            Perfil dimensional
          </p>
          <div className="radar-wrap">
            <svg
              viewBox="0 0 300 300"
              style={{ width: '100%', overflow: 'visible' }}
              role="img"
              aria-label="Gráfico de radar dimensional IIM"
            >
              {/* Concentric rings */}
              {[0.25, 0.5, 0.75, 1.0].map((pct, i) => {
                const ringPts = angles
                  .map(
                    (a) =>
                      `${(cx + pct * r * Math.cos(a)).toFixed(1)},${(cy + pct * r * Math.sin(a)).toFixed(1)}`
                  )
                  .join(' ');
                return (
                  <polygon
                    key={i}
                    points={ringPts}
                    fill="none"
                    stroke={i === 3 ? 'rgba(11, 37, 69, 0.18)' : 'rgba(11, 37, 69, 0.08)'}
                    strokeWidth="1"
                  />
                );
              })}

              {/* 50 axis label */}
              <text
                x={cx + 4}
                y={(cy - 0.5 * r - 3).toFixed(1)}
                fontSize="9"
                fill="#9CA3AF"
                fontFamily="var(--font-body)"
              >
                50
              </text>

              {/* Axis lines */}
              {angles.map((a, i) => (
                <line
                  key={i}
                  x1={cx}
                  y1={cy}
                  x2={(cx + r * Math.cos(a)).toFixed(1)}
                  y2={(cy + r * Math.sin(a)).toFixed(1)}
                  stroke="rgba(11, 37, 69, 0.12)"
                  strokeWidth="1"
                />
              ))}

              {/* Data polygon in Verde #2E9E5B */}
              <polygon
                points={polygonPoints}
                fill="rgba(46, 158, 91, 0.20)"
                stroke="#2E9E5B"
                strokeWidth="2.5"
              />

              {/* Dots in Verde #2E9E5B */}
              {vals.map((v, i) => (
                <circle
                  key={i}
                  cx={(cx + v * r * Math.cos(angles[i])).toFixed(1)}
                  cy={(cy + v * r * Math.sin(angles[i])).toFixed(1)}
                  r="4.5"
                  fill="#2E9E5B"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                />
              ))}

              {/* Labels & values */}
              {angles.map((a, i) => {
                const lOff = r + 20;
                const lx = (cx + lOff * Math.cos(a)).toFixed(1);
                const ly = (cy + lOff * Math.sin(a)).toFixed(1);

                return (
                  <g key={i}>
                    <text
                      x={lx}
                      y={ly}
                      textAnchor="middle"
                      fontSize="11"
                      fontWeight="600"
                      fill="#1F2937"
                      fontFamily="var(--font-body)"
                    >
                      {labels[i]}
                    </text>
                    <text
                      x={lx}
                      y={parseFloat(ly) + 12}
                      textAnchor="middle"
                      fontSize="10"
                      fill="#6B7280"
                      fontFamily="var(--font-body)"
                    >
                      {subs[i]}
                    </text>
                    <text
                      x={lx}
                      y={parseFloat(ly) + 25}
                      textAnchor="middle"
                      fontSize="12"
                      fontWeight="700"
                      fill="#2E9E5B"
                      fontFamily="var(--font-display)"
                    >
                      {scores[i]}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* DIMENSION BARS & COSTS */}
        <div>
          <p className="calc-subsection-title" style={{ marginTop: 0 }}>
            Score por dimensão
          </p>
          <div className="dim-bars">
            {dimScoreItems.map((item, i) => (
              <div key={i} className="dim-bar-row">
                <div className="dim-bar-name">{item.label}</div>
                <div className="bar-track">
                  <div
                    className="bar-fill"
                    style={{ width: `${Math.round(item.val)}%` }}
                  />
                </div>
                <div className="dim-bar-val">{Math.round(item.val)}</div>
              </div>
            ))}
          </div>

          <p className="calc-subsection-title">Custo estimado por dimensão</p>
          <div>
            {dimCostItems.map((item, i) => {
              const pct = (item.cost / maxCost) * 100;
              return (
                <div key={i} className="dim-cost-row">
                  <div className="dim-bar-name" style={{ fontSize: '0.78rem' }}>
                    {item.label}
                  </div>
                  <div className="cost-bar-track">
                    <div
                      className="cost-bar-fill"
                      style={{ width: `${pct.toFixed(0)}%` }}
                    />
                  </div>
                  <div className="dim-cost-val">{fmtBRL(item.cost)}/mês</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
