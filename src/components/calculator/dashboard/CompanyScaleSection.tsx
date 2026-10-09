import React from 'react';
import { CompanyScaleProjection } from '../../../types/calculatorDTOs';
import { AlertTriangle } from 'lucide-react';

interface CompanyScaleSectionProps {
  projecao: CompanyScaleProjection;
}

const fmtBRL = (v: number) =>
  'R$\u00a0' + Math.round(v).toLocaleString('pt-BR');

export const CompanyScaleSection: React.FC<CompanyScaleSectionProps> = ({
  projecao
}) => {
  const cards = [
    {
      label: 'Colaboradores presenciais',
      val: projecao.totalPresencial.toString(),
      sub: 'base do cálculo',
      cls: '',
      isMoney: false
    },
    {
      label: 'Impacto mensal estimado',
      val: fmtBRL(projecao.impactoEmpresaMensal),
      sub: 'projeção para toda a equipe',
      cls: '',
      isMoney: true
    },
    {
      label: 'Impacto anual estimado',
      val: fmtBRL(projecao.impactoEmpresaAnual),
      sub: 'acumulado 12 meses',
      cls: 'hl2',
      isMoney: true,
      warn: true
    },
    {
      label: '% do faturamento',
      val: projecao.percentualFaturamento,
      sub: 'comprometido com mobilidade',
      cls: '',
      isMoney: false
    }
  ];

  return (
    <div className="res-section">
      <p className="calc-subsection-title" style={{ marginTop: 0 }}>
        Projeção para a empresa
      </p>

      <div className="cards-grid">
        {cards.map((c, i) => (
          <div key={i} className={`metric-card ${c.cls}`}>
            <div className="mc-label">{c.label}</div>
            <div className={`mc-val ${c.warn ? 'warn' : ''}`}>{c.val}</div>
            <div className="mc-sub">{c.sub}</div>
          </div>
        ))}
      </div>

      <p
        style={{
          fontSize: '0.78rem',
          color: 'var(--text-faint)',
          marginTop: '0.75rem',
          lineHeight: 1.5
        }}
      >
        <AlertTriangle
          size={14}
          color="#D97706"
          style={{ display: 'inline', verticalAlign: '-2px', marginRight: '5px' }}
        />
        <strong>Estimativa ilustrativa:</strong> projeta o custo mensal deste único colaborador respondente para
        todo o quadro presencial, assumindo perfil de IIM homogêneo. Não é uma estimativa
        estatisticamente validada da empresa — o Diagnóstico UrbanFlow completo aplica o instrumento a
        uma amostra representativa dos colaboradores para gerar uma projeção com validade
        estatística.
      </p>
    </div>
  );
};
