import React from 'react';
import { ProjectionMilestone } from '../../../types/calculatorDTOs';
import { AlertTriangle } from 'lucide-react';

interface ProjectionsSectionProps {
  marcos: ProjectionMilestone[];
  notaInercial: string;
}

const fmtBRL = (v: number) =>
  'R$\u00a0' + Math.round(v).toLocaleString('pt-BR');

export const ProjectionsSection: React.FC<ProjectionsSectionProps> = ({
  marcos,
  notaInercial
}) => {
  return (
    <div className="res-section">
      <p className="calc-subsection-title" style={{ marginTop: 0 }}>
        Projeção de custo — se nada for feito
      </p>

      <div style={{ overflowX: 'auto' }}>
        <table className="proj-table">
          <thead>
            <tr>
              <th>Horizonte</th>
              <th>Custo acumulado</th>
              <th>Observação</th>
            </tr>
          </thead>
          <tbody>
            {marcos.map((marco, i) => (
              <tr key={i}>
                <td>{marco.label}</td>
                <td className={`proj-num ${marco.isAnual ? 'red' : ''}`}>
                  {fmtBRL(marco.custoAcumulado)}
                </td>
                <td style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>
                  {marco.observacao}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p
        className="proj-note"
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '8px'
        }}
      >
        <AlertTriangle size={16} color="#D97706" style={{ flexShrink: 0, marginTop: '2px' }} />
        <span>{notaInercial}</span>
      </p>
    </div>
  );
};
