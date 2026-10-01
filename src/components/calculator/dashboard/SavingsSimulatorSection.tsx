import React from 'react';
import { SimulatedSavings } from '../../../types/calculatorDTOs';

interface SavingsSimulatorSectionProps {
  iimAtual: number;
  custoMensal: number;
  simulatedSavings: SimulatedSavings | null;
  onUpdateTarget: (targetIim: number) => void;
}

const fmtBRL = (v: number) =>
  'R$\u00a0' + Math.round(v).toLocaleString('pt-BR');

export const SavingsSimulatorSection: React.FC<SavingsSimulatorSectionProps> = ({
  iimAtual,
  custoMensal,
  simulatedSavings,
  onUpdateTarget
}) => {
  if (iimAtual <= 15) {
    return (
      <div className="res-section sim-section">
        <p className="calc-subsection-title" style={{ marginTop: 0 }}>
          Simulador de Economia
        </p>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
          IIM já está em nível baixo — foco em manutenção preventiva.
        </p>
      </div>
    );
  }

  const minTarget = Math.max(15, Math.round(iimAtual * 0.30));
  const maxTarget = Math.max(iimAtual - 5, minTarget + 1);
  const currentTarget = simulatedSavings ? simulatedSavings.iimAlvo : Math.round(iimAtual * 0.62);

  // Real-time calculation fallback if simulatedSavings is null
  const reducao = 1 - currentTarget / Math.max(iimAtual, 1);
  const economiaM = simulatedSavings ? simulatedSavings.economiaMensal : custoMensal * reducao;
  const economiaA = simulatedSavings ? simulatedSavings.economiaAnual : economiaM * 12;
  const redPts = simulatedSavings ? simulatedSavings.pontosReduzidos : Math.round(iimAtual - currentTarget);
  const redPct = simulatedSavings ? simulatedSavings.percentualReducao : Math.round(reducao * 100);

  return (
    <div className="res-section sim-section">
      <p className="calc-subsection-title" style={{ marginTop: 0 }}>
        Simulador de Economia
      </p>
      <p className="sim-subtitle">
        Arraste para simular quanto a empresa economiza ao reduzir o IIM
      </p>

      {/* SIMULATOR HEADER */}
      <div className="sim-header">
        <div className="sim-info">
          <span className="sim-lbl">IIM Atual</span>
          <span className="sim-score">{iimAtual}</span>
        </div>
        <div className="sim-arrow">→</div>
        <div className="sim-info">
          <span className="sim-lbl">IIM Alvo</span>
          <span className="sim-score accent">{currentTarget}</span>
        </div>
      </div>

      {/* REAL-TIME SLIDER INPUT */}
      <div style={{ margin: '1rem 0 1.5rem' }}>
        <input
          type="range"
          min={minTarget}
          max={maxTarget}
          value={currentTarget}
          onInput={(e) => onUpdateTarget(parseInt((e.target as HTMLInputElement).value, 10))}
          onChange={(e) => onUpdateTarget(parseInt(e.target.value, 10))}
          style={{ width: '100%' }}
          aria-label="IIM Alvo para simulação de economia"
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-faint)' }}>Meta ambiciosa: {minTarget}</span>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-faint)' }}>Redução leve: {maxTarget}</span>
        </div>
      </div>

      {/* REAL-TIME OUTPUT CARDS */}
      <div className="sim-economy">
        <div className="sim-eco-item">
          <span>Redução no IIM</span>
          <strong>
            −{redPts} pontos ({redPct}%)
          </strong>
        </div>
        <div className="sim-eco-item hl">
          <span>Economia mensal estimada</span>
          <strong>{fmtBRL(economiaM)}/mês</strong>
        </div>
        <div className="sim-eco-item hl">
          <span>Economia anual estimada</span>
          <strong>{fmtBRL(economiaA)}/ano</strong>
        </div>
      </div>
    </div>
  );
};
