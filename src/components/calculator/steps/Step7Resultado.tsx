import React from 'react';
import { FullIimDiagnosis, SimulatedSavings } from '../../../types/calculatorDTOs';
import { Printer, RotateCcw, ArrowLeft } from 'lucide-react';

interface Step7ResultadoProps {
  result: FullIimDiagnosis;
  simulatedSavings: SimulatedSavings | null;
  onUpdateSimulation: (targetIim: number) => void;
  onEdit: () => void;
  onReset: () => void;
}

const fmtBRL = (v: number) =>
  'R$ ' + Math.round(v).toLocaleString('pt-BR');

export const Step7Resultado: React.FC<Step7ResultadoProps> = ({
  result,
  simulatedSavings,
  onUpdateSimulation,
  onEdit,
  onReset
}) => {
  // SVG Radar coordinates
  const cx = 150;
  const cy = 150;
  const r = 95;
  const vals = [
    result.dimensoes.d1Norm / 100,
    result.dimensoes.d2Norm / 100,
    result.dimensoes.d3Norm / 100,
    result.dimensoes.d4Norm / 100
  ];
  const angles = [-Math.PI / 2, 0, Math.PI / 2, Math.PI]; // top, right, bottom, left
  const labels = ['D1', 'D2', 'D3', 'D4'];
  const subs = ['Trajeto', 'Estresse', 'Pontual.', 'Vulnerab.'];
  const scores = [
    Math.round(result.dimensoes.d1Norm),
    Math.round(result.dimensoes.d2Norm),
    Math.round(result.dimensoes.d3Norm),
    Math.round(result.dimensoes.d4Norm)
  ];

  const radarPolygonPoints = vals
    .map(
      (v, i) =>
        `${(cx + v * r * Math.cos(angles[i])).toFixed(1)},${(cy + v * r * Math.sin(angles[i])).toFixed(1)}`
    )
    .join(' ');

  const currentSim = simulatedSavings || result.simuladorPadrao;

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
            {result.classificacao}
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
          {result.contexto}
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
                points={radarPolygonPoints}
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
                { label: 'D1 · Trajeto', val: result.dimensoes.d1Norm, weight: '30%' },
                { label: 'D2 · Estresse', val: result.dimensoes.d2Norm, weight: '27%' },
                { label: 'D3 · Pontualidade', val: result.dimensoes.d3Norm, weight: '25%' },
                { label: 'D4 · Vulnerabilidade', val: result.dimensoes.d4Norm, weight: '18%' }
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
                { label: 'D1 · Trajeto', cost: result.financeiro.custoPorDimensao.d1 },
                { label: 'D2 · Estresse', cost: result.financeiro.custoPorDimensao.d2 },
                { label: 'D3 · Pontualidade', cost: result.financeiro.custoPorDimensao.d3 },
                { label: 'D4 · Vulnerabilidade', cost: result.financeiro.custoPorDimensao.d4 }
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
                          (item.cost / Math.max(result.financeiro.custoImpactoTotalMensal, 1)) * 100,
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
              Custo Bruto Mensal
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700 }}>
              {fmtBRL(result.financeiro.custoBrutoMensal)}
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              salário + encargos (68%)
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
              Perda Produtividade
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700 }}>
              {fmtBRL(result.financeiro.perdaProdutividadeMensal)}
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
              {fmtBRL(result.financeiro.presenteismoMensal)}
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              foco drenado (D2)
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
              {fmtBRL(result.financeiro.custoImpactoTotalMensal)}
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--brand-mid)', marginTop: '2px' }}>
              ao mês / colaborador
            </div>
          </div>
        </div>
      </div>

      {/* 4. PROJEÇÃO INERCIAL 12 MESES */}
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
          Projeção inercial de custo — se nada for feito
        </p>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ background: 'var(--surface-3)', borderBottom: '1px solid var(--border)' }}>
                <th style={{ padding: '8px 12px', textAlign: 'left', fontWeight: 600 }}>Horizonte</th>
                <th style={{ padding: '8px 12px', textAlign: 'left', fontWeight: 600 }}>Custo acumulado</th>
                <th style={{ padding: '8px 12px', textAlign: 'left', fontWeight: 600 }}>Observação</th>
              </tr>
            </thead>
            <tbody>
              {result.projecao12Meses.marcos.map((marco, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '9px 12px', color: 'var(--text)' }}>{marco.label}</td>
                  <td
                    style={{
                      padding: '9px 12px',
                      fontFamily: 'var(--font-display)',
                      fontWeight: 700,
                      color: marco.isAnual ? 'var(--warn)' : 'var(--brand)'
                    }}
                  >
                    {fmtBRL(marco.custoAcumulado)}
                  </td>
                  <td style={{ padding: '9px 12px', color: 'var(--text-muted)', fontSize: '0.82rem' }}>
                    {marco.observacao}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p style={{ fontSize: '0.78rem', color: 'var(--text-faint)', fontStyle: 'italic', marginTop: '0.8rem' }}>
          {result.projecao12Meses.notaInercial}
        </p>
      </div>

      {/* 5. SIMULADOR DE ECONOMIA */}
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
          Simulador de Economia
        </p>

        <div style={{ marginBottom: '1.2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--brand)' }}>
              IIM Alvo: {currentSim.iimAlvo} pontos (Redução de {currentSim.pontosReduzidos} pts / {currentSim.percentualReducao}%)
            </label>
            <span style={{ fontSize: '0.8rem', color: 'var(--brand-mid)' }}>
              IIM Atual: {result.iimRounded}
            </span>
          </div>
          <input
            type="range"
            min={Math.max(15, Math.round(result.iimRounded * 0.30))}
            max={Math.max(result.iimRounded - 5, 20)}
            value={currentSim.iimAlvo}
            onChange={(e) => onUpdateSimulation(parseInt(e.target.value, 10))}
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
              {fmtBRL(currentSim.economiaMensal)}
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
              {fmtBRL(currentSim.economiaAnual)}
            </strong>
          </div>
        </div>
      </div>

      {/* 6. INTERVENÇÕES COM ROI */}
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
          Intervenções prioritárias — Impacto × ROI
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {result.intervencoesPrioritarias.map((inv) => (
            <div
              key={inv.id}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr auto auto auto',
                gap: '12px',
                alignItems: 'center',
                background: 'var(--surface-2)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-sm)',
                padding: '10px 14px'
              }}
            >
              <div>
                <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text)' }}>
                  {inv.label}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  {inv.desc}
                </div>
              </div>

              <div>
                <span
                  style={{
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    padding: '3px 8px',
                    borderRadius: '8px',
                    background:
                      inv.esforco === 'Baixo'
                        ? 'var(--accent-light)'
                        : inv.esforco === 'Médio'
                        ? '#fffaeb'
                        : '#fff3e8',
                    color:
                      inv.esforco === 'Baixo'
                        ? 'var(--brand-mid)'
                        : inv.esforco === 'Médio'
                        ? '#7a5c00'
                        : '#7a3e00'
                  }}
                >
                  {inv.esforco}
                </span>
              </div>

              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  color: 'var(--accent)',
                  minWidth: '65px',
                  textAlign: 'center'
                }}
              >
                −{Math.round(inv.reducaoIIM)} pts
              </div>

              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  color: 'var(--brand)',
                  minWidth: '95px',
                  textAlign: 'right'
                }}
              >
                {fmtBRL(inv.economiaMensal)}/mês
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 7. RECOMENDAÇÕES URBANFLOW */}
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
          Diagnóstico &amp; Recomendações UrbanFlow
        </p>

        <div
          style={{
            background: 'var(--accent-light)',
            border: '1px solid var(--accent-mid)',
            borderRadius: 'var(--radius-sm)',
            padding: '1.25rem 1.5rem'
          }}
        >
          <h4
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.96rem',
              fontWeight: 700,
              color: 'var(--brand)',
              marginBottom: '0.75rem'
            }}
          >
            {result.recomendacoes.titulo}
          </h4>

          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {result.recomendacoes.itens.map((item, idx) => (
              <li
                key={idx}
                style={{
                  fontSize: '0.85rem',
                  color: 'var(--brand-mid)',
                  display: 'flex',
                  gap: '8px',
                  lineHeight: 1.45
                }}
              >
                <span style={{ color: 'var(--accent)', fontWeight: 700 }}>↳</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 8. PROJEÇÃO PARA TODA A EMPRESA */}
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
          Projeção para a empresa (Escala organizacional)
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
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
            <div style={{ fontSize: '0.72rem', color: 'var(--text-faint)' }}>Colaboradores Presenciais</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 700 }}>
              {result.projecaoEmpresa.totalPresencial}
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>base de projeção</div>
          </div>

          <div
            style={{
              background: 'var(--surface-2)',
              borderRadius: 'var(--radius-sm)',
              padding: '1rem',
              border: '1px solid var(--border)'
            }}
          >
            <div style={{ fontSize: '0.72rem', color: 'var(--text-faint)' }}>Impacto Mensal Estimado</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 700 }}>
              {fmtBRL(result.projecaoEmpresa.impactoEmpresaMensal)}
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>toda a equipa presencial</div>
          </div>

          <div
            style={{
              background: 'var(--surface-2)',
              borderRadius: 'var(--radius-sm)',
              padding: '1rem',
              border: '1px solid var(--border)'
            }}
          >
            <div style={{ fontSize: '0.72rem', color: 'var(--text-faint)' }}>Impacto Anual Estimado</div>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.3rem',
                fontWeight: 700,
                color: 'var(--warn)'
              }}
            >
              {fmtBRL(result.projecaoEmpresa.impactoEmpresaAnual)}
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>12 meses inercial</div>
          </div>

          <div
            style={{
              background: 'var(--surface-2)',
              borderRadius: 'var(--radius-sm)',
              padding: '1rem',
              border: '1px solid var(--border)'
            }}
          >
            <div style={{ fontSize: '0.72rem', color: 'var(--text-faint)' }}>% do Faturamento</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 700 }}>
              {result.projecaoEmpresa.percentualFaturamento}
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>comprometido com comutação</div>
          </div>
        </div>

        <p style={{ fontSize: '0.75rem', color: 'var(--text-faint)', marginTop: '0.8rem', lineHeight: 1.5 }}>
          ⚠️ Estimativa ilustrativa: projeta o custo deste colaborador para todo o quadro presencial. O Diagnóstico UrbanFlow completo aplica o instrumento a uma amostra representativa estatística.
        </p>
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
