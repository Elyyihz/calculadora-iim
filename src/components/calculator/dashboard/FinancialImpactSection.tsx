import React from 'react';
import { FinancialMetrics } from '../../../types/calculatorDTOs';

interface FinancialImpactSectionProps {
  financeiro: FinancialMetrics;
}

const fmtBRL = (v: number) =>
  'R$\u00a0' + Math.round(v).toLocaleString('pt-BR');

export const FinancialImpactSection: React.FC<FinancialImpactSectionProps> = ({
  financeiro
}) => {
  const cards = [
    {
      label: 'Custo bruto mensal',
      val: financeiro.custoBrutoMensal,
      sub: 'salário + 68% encargos',
      cls: ''
    },
    {
      label: 'Perda de produtividade',
      val: financeiro.perdaProdutividadeMensal,
      sub: 'absenteísmo + desempenho',
      cls: ''
    },
    {
      label: 'Presenteísmo estimado',
      val: financeiro.presenteismoMensal,
      sub: 'presente, rendendo menos',
      cls: 'hl'
    },
    {
      label: 'Custo de reposição',
      val: financeiro.custoTurnoverReposicao,
      sub: 'salário × fator × 1,4',
      cls: ''
    },
    {
      label: 'Impacto estimado / mês',
      val: financeiro.custoImpactoTotalMensal,
      sub: 'soma ponderada pelo IIM',
      cls: 'hl'
    }
  ];

  return (
    <div className="res-section">
      <p className="calc-subsection-title" style={{ marginTop: 0 }}>
        Impacto financeiro — este colaborador
      </p>

      <div className="cards-grid">
        {cards.map((card, idx) => (
          <div key={idx} className={`metric-card ${card.cls}`}>
            <div className="mc-label">{card.label}</div>
            <div className="mc-val">{fmtBRL(card.val)}</div>
            <div className="mc-sub">{card.sub}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
