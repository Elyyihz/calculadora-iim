import React, { useState } from 'react';
import { IimResult } from '../../../types/calculator';
import { Printer, RotateCcw, ArrowLeft } from 'lucide-react';

interface Step7ResultadoProps {
  result: IimResult;
  onEdit: () => void;
  onReset: () => void;
}

const fmtBRL = (v: number) =>
  'R$ ' + Math.round(v).toLocaleString('pt-BR');

export const Step7Resultado: React.FC<Step7ResultadoProps> = ({
  result,
  onEdit,
  onReset
}) => {
  const [simReducao, setSimReducao] = useState(15);

  // Radar coordinates calculation
  const cx = 150;
  const cy = 150;
  const r = 95;
  const vals = [result.d1 / 100, result.d2 / 100, result.d3 / 100, result.d4 / 100];
  const angles = [-Math.PI / 2, 0, Math.PI / 2, Math.PI]; // top, right, bottom, left
  const labels = ['D1', 'D2', 'D3', 'D4'];
  const subs = ['Trajeto', 'Estresse', 'Pontual.', 'Vulnerab.'];
  const scores = [
    Math.round(result.d1),
    Math.round(result.d2),
    Math.round(result.d3),
    Math.round(result.d4)
  ];

  // Radar points
  const pts = vals
    .map(
      (v, i) =>
        `${(cx + v * r * Math.cos(angles[i])).toFixed(1)},${(cy + v * r * Math.sin(angles[i])).toFixed(1)}`
    )
    .join(' ');

  // Simulator values
  const simNovoIIM = Math.max(Math.round(result.iimRounded - simReducao), 10);
  const ecoMensal = result.custoMensal * (simReducao / Math.max(result.iimRounded, 1)) * 0.72;
  const ecoAnual = ecoMensal * 12;

  return (
    <div style={{ maxWidth: '860px', margin: '0 auto', paddingBottom: '4rem' }}>
      {/* 1. HERO SCORE */}
      <div
        style={{
          background: 'var(--brand)',
          padding: '3rem 2rem 2.5rem',
          textAlign: 'center',
          borderRadius: 'var(--radius) var(--radius) 0 0',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse at 50% 0%, rgba(46, 204, 138, 0.15) 0%, transparent 65%)',
            pointerEvents: 'none'
          }}
        />

        {result.empresaNome && (
          <div
            style={{
              color: 'rgba(255, 255, 255, 0.55)',
              fontSize: '0.82rem',
              letterSpacing: '0.06em',
              marginBottom: '0.5rem'
            }}
          >
            Diagnóstico — {result.empresaNome}
          </div>
        )}

        <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', marginBottom: '0.75rem' }}>
          <div
            style={{
              fontSize: '0.75rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'rgba(255, 255, 255, 0.5)',
              marginBottom: '0.5rem'
            }}
          >
            Índice de Impacto de Mobilidade
          </div>

          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '6rem',
              fontWeight: 800,
              lineHeight: 1,
              color: '#FFFFFF',
              letterSpacing: '-0.02em'
            }}
          >
            {result.iimRounded}
          </div>
        </div>

        <div>
          <span
            style={{
              display: 'inline-block',
              padding: '7px 22px',
              borderRadius: '20px',
              fontSize: '0.9rem',
              fontWeight: 600,
              marginTop: '0.75rem',
              background: result.classBg,
              color: result.classColor
            }}
          >
            {result.classification}
          </span>
        </div>

        <p
          style={{
            marginTop: '1rem',
            fontSize: '0.88rem',
            color: 'rgba(255, 255, 255, 0.65)',
            maxWidth: '520px',
            marginLeft: 'auto',
            marginRight: 'auto',
            fontWeight: 300,
            lineHeight: 1.5
          }}
        >
          {result.contextText}
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1.5rem' }}>
          <button
            type="button"
            className="btn btn-outline-light"
            onClick={() => window.print()}
            style={{ fontSize: '0.84rem' }}
          >
            <Printer size={15} />
            <span>Imprimir Relatório</span>
          </button>
        </div>
      </div>

      {/* 2. RADAR & BARRAS */}
      <div
        style={{
          background: 'var(--surface)',
          borderLeft: '1px solid var(--border)',
          borderRight: '1px solid var(--border)',
          borderBottom: '1px solid var(--border)',
          padding: '2rem'
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2.5rem',
            alignItems: 'center'
          }}
        >
          {/* RADAR SVG */}
          <div>
            <p className="calc-subsection-title" style={{ marginTop: 0 }}>
              Perfil dimensional (Radar)
            </p>
            <svg viewBox="0 0 300 300" style={{ width: '100%', overflow: 'visible' }}>
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
                    stroke={i === 3 ? 'rgba(13,43,31,0.2)' : 'rgba(13,43,31,0.08)'}
                    strokeWidth="1"
                  />
                );
              })}

              {angles.map((a, i) => (
                <line
                  key={i}
                  x1={cx}
                  y1={cy}
                  x2={(cx + r * Math.cos(a)).toFixed(1)}
                  y2={(cy + r * Math.sin(a)).toFixed(1)}
                  stroke="rgba(13,43,31,0.12)"
                  strokeWidth="1"
                />
              ))}

              <polygon
                points={pts}
                fill="rgba(46,204,138,0.2)"
                stroke="#2ECC8A"
                strokeWidth="2.5"
              />

              {vals.map((v, i) => (
                <circle
                  key={i}
                  cx={(cx + v * r * Math.cos(angles[i])).toFixed(1)}
                  cy={(cy + v * r * Math.sin(angles[i])).toFixed(1)}
                  r="4.5"
                  fill="#2ECC8A"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                />
              ))}

              {angles.map((a, i) => {
                const lOff = r + 22;
                const lx = (cx + lOff * Math.cos(a)).toFixed(1);
                const ly = (cy + lOff * Math.sin(a)).toFixed(1);
                return (
                  <g key={i}>
                    <text
                      x={lx}
                      y={ly}
                      textAnchor="middle"
                      fontSize="11"
                      fontWeight="700"
                      fill="#5A7568"
                    >
                      {labels[i]}
                    </text>
                    <text
                      x={lx}
                      y={parseFloat(ly) + 12}
                      textAnchor="middle"
                      fontSize="9"
                      fill="#9BB5A8"
                    >
                      {subs[i]}
                    </text>
                    <text
                      x={lx}
                      y={parseFloat(ly) + 24}
                      textAnchor="middle"
                      fontSize="11"
                      fontWeight="800"
                      fill="#2ECC8A"
                    >
                      {scores[i]}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* DIMENSION BARS & COSTS */}
          <div>
            <p className="calc-subsection-title" style={{ marginTop: 0 }}>
              Score por dimensão
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '2rem' }}>
              {[
                { label: 'D1 · Trajeto', val: result.d1, weight: '30%' },
                { label: 'D2 · Estresse', val: result.d2, weight: '27%' },
                { label: 'D3 · Pontualidade', val: result.d3, weight: '25%' },
                { label: 'D4 · Vulnerabilidade', val: result.d4, weight: '18%' }
              ].map((dim, i) => (
                <div
                  key={i}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '120px 1fr 40px',
                    gap: '10px',
                    alignItems: 'center'
                  }}
                >
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    {dim.label}
                  </span>
                  <div
                    style={{
                      height: '8px',
                      background: 'var(--surface-3)',
                      borderRadius: '8px',
                      overflow: 'hidden'
                    }}
                  >
                    <div
                      style={{
                        height: '100%',
                        width: `${Math.round(dim.val)}%`,
                        background: 'var(--accent)',
                        borderRadius: '8px'
                      }}
                    />
                  </div>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, textAlign: 'right' }}>
                    {Math.round(dim.val)}
                  </span>
                </div>
              ))}
            </div>

            <p className="calc-subsection-title">Custo estimado por dimensão</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { label: 'D1 · Trajeto', cost: result.dimCosts.d1 },
                { label: 'D2 · Estresse', cost: result.dimCosts.d2 },
                { label: 'D3 · Pontualidade', cost: result.dimCosts.d3 },
                { label: 'D4 · Vulnerabilidade', cost: result.dimCosts.d4 }
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '120px 1fr 100px',
                    gap: '10px',
                    alignItems: 'center'
                  }}
                >
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    {item.label}
                  </span>
                  <div
                    style={{
                      height: '6px',
                      background: 'var(--surface-3)',
                      borderRadius: '6px',
                      overflow: 'hidden'
                    }}
                  >
                    <div
                      style={{
                        height: '100%',
                        width: `${Math.min(
                          (item.cost / Math.max(result.custoMensal, 1)) * 100,
                          100
                        ).toFixed(0)}%`,
                        background: 'rgba(46, 204, 138, 0.45)',
                        borderRadius: '6px'
                      }}
                    />
                  </div>
                  <span
                    style={{
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      color: 'var(--brand-mid)',
                      textAlign: 'right'
                    }}
                  >
                    {fmtBRL(item.cost)}/mês
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3. IMPACTO FINANCEIRO */}
      <div
        style={{
          background: 'var(--surface)',
          borderLeft: '1px solid var(--border)',
          borderRight: '1px solid var(--border)',
          borderBottom: '1px solid var(--border)',
          padding: '2rem'
        }}
      >
        <p className="calc-subsection-title" style={{ marginTop: 0 }}>
          Impacto financeiro — este colaborador
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
            gap: '12px'
          }}
        >
          <div
            style={{
              background: 'var(--surface-2)',
              borderRadius: 'var(--radius-sm)',
              padding: '1rem',
              border: '1px solid var(--border)'
            }}
          >
            <div style={{ fontSize: '0.72rem', color: 'var(--text-faint)', marginBottom: '4px' }}>
              Perda Produtividade
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700 }}>
              {fmtBRL(result.perdaProd)}
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              absenteísmo e atrasos
            </div>
          </div>

          <div
            style={{
              background: 'var(--surface-2)',
              borderRadius: 'var(--radius-sm)',
              padding: '1rem',
              border: '1px solid var(--border)'
            }}
          >
            <div style={{ fontSize: '0.72rem', color: 'var(--text-faint)', marginBottom: '4px' }}>
              Presenteísmo
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700 }}>
              {fmtBRL(result.presenteismo)}
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              drenagem por estresse (D2)
            </div>
          </div>

          <div
            style={{
              background: 'var(--surface-2)',
              borderRadius: 'var(--radius-sm)',
              padding: '1rem',
              border: '1px solid var(--border)'
            }}
          >
            <div style={{ fontSize: '0.72rem', color: 'var(--text-faint)', marginBottom: '4px' }}>
              Risco Turnover / Mês
            </div>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.25rem',
                fontWeight: 700,
                color: 'var(--warn)'
              }}
            >
              {fmtBRL(result.custoMensal - result.perdaProd - result.presenteismo)}
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              reposição ponderada
            </div>
          </div>

          <div
            style={{
              background: 'var(--accent-light)',
              borderRadius: 'var(--radius-sm)',
              padding: '1rem',
              border: '1px solid var(--accent-mid)'
            }}
          >
            <div style={{ fontSize: '0.72rem', color: 'var(--brand-mid)', marginBottom: '4px', fontWeight: 600 }}>
              Custo Total Oculto
            </div>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.35rem',
                fontWeight: 800,
                color: 'var(--brand)'
              }}
            >
              {fmtBRL(result.custoMensal)}
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--brand-mid)', marginTop: '2px' }}>
              ao mês / colaborador
            </div>
          </div>
        </div>
      </div>

      {/* 4. SIMULADOR DE ECONOMIA */}
      <div
        style={{
          background: 'var(--accent-light)',
          borderLeft: '1px solid var(--accent-mid)',
          borderRight: '1px solid var(--accent-mid)',
          borderBottom: '1px solid var(--accent-mid)',
          padding: '2rem'
        }}
      >
        <p className="calc-subsection-title" style={{ marginTop: 0, color: 'var(--brand-mid)' }}>
          Simulador de Economia — Redução de IIM
        </p>

        <div style={{ marginBottom: '1.2rem' }}>
          <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--brand)' }}>
            Meta de redução no score IIM: -{simReducao} pontos (Novo IIM: {simNovoIIM})
          </label>
          <input
            type="range"
            min="5"
            max="40"
            value={simReducao}
            onChange={(e) => setSimReducao(parseInt(e.target.value, 10))}
            style={{ width: '100%', marginTop: '8px' }}
          />
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '12px'
          }}
        >
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: 'var(--radius-sm)',
              padding: '1rem',
              border: '1px solid var(--border)'
            }}
          >
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Poupança Mensal</span>
            <strong
              style={{
                display: 'block',
                fontFamily: 'var(--font-display)',
                fontSize: '1.3rem',
                color: 'var(--brand)',
                marginTop: '4px'
              }}
            >
              {fmtBRL(ecoMensal)}
            </strong>
          </div>

          <div
            style={{
              background: 'var(--brand)',
              borderRadius: 'var(--radius-sm)',
              padding: '1rem',
              color: '#FFFFFF'
            }}
          >
            <span style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.6)' }}>
              Poupança Anual Estimada
            </span>
            <strong
              style={{
                display: 'block',
                fontFamily: 'var(--font-display)',
                fontSize: '1.35rem',
                color: 'var(--accent)',
                marginTop: '4px'
              }}
            >
              {fmtBRL(ecoAnual)}
            </strong>
          </div>
        </div>
      </div>

      {/* FOOTER ACTIONS */}
      <div
        style={{
          background: 'var(--surface)',
          borderLeft: '1px solid var(--border)',
          borderRight: '1px solid var(--border)',
          borderBottom: '1px solid var(--border)',
          borderRadius: '0 0 var(--radius) var(--radius)',
          padding: '1.5rem 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}
      >
        <button type="button" className="btn btn-ghost" onClick={onEdit}>
          <ArrowLeft size={16} />
          <span>Rever Respostas</span>
        </button>

        <button type="button" className="btn btn-primary" onClick={onReset}>
          <RotateCcw size={16} />
          <span>Novo Diagnóstico</span>
        </button>
      </div>
    </div>
  );
};
