import React from 'react';
import { PrioritizedIntervention } from '../../../types/calculatorDTOs';

interface InterventionsSectionProps {
  intervencoes: PrioritizedIntervention[];
}

const fmtBRL = (v: number) =>
  'R$\u00a0' + Math.round(v).toLocaleString('pt-BR');

export const InterventionsSection: React.FC<InterventionsSectionProps> = ({
  intervencoes
}) => {
  return (
    <div className="res-section">
      <p className="calc-subsection-title" style={{ marginTop: 0 }}>
        Intervenções prioritárias — impacto × ROI
      </p>

      <div className="interv-header">
        <div>Intervenção</div>
        <div>Esforço</div>
        <div style={{ textAlign: 'center' }}>Redução IIM</div>
        <div style={{ textAlign: 'right' }}>Economia/mês</div>
      </div>

      <div id="intervTable">
        {intervencoes.map((inv) => (
          <div key={inv.id} className="interv-row">
            <div>
              <div className="interv-main-label">{inv.label}</div>
              <div className="interv-desc">{inv.desc}</div>
            </div>
            <div>
              <span className={`esforco-badge ${inv.esforcoCls}`}>
                {inv.esforco}
              </span>
            </div>
            <div className="interv-iim">−{Math.round(inv.reducaoIIM)} pts</div>
            <div className="interv-eco">{fmtBRL(inv.economiaMensal)}/mês</div>
          </div>
        ))}
      </div>
    </div>
  );
};
