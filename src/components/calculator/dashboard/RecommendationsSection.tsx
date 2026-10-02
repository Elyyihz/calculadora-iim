import React from 'react';
import { DiagnosisRecommendations } from '../../../types/calculatorDTOs';
import { ShieldCheck, AlertCircle, AlertTriangle, AlertOctagon } from 'lucide-react';

interface RecommendationsSectionProps {
  recomendacoes: DiagnosisRecommendations;
}

export const RecommendationsSection: React.FC<RecommendationsSectionProps> = ({
  recomendacoes
}) => {
  const getHeaderIcon = () => {
    const t = recomendacoes.titulo.toLowerCase();
    if (t.includes('crítico')) {
      return <AlertOctagon size={20} color="#DC2626" style={{ flexShrink: 0 }} />;
    }
    if (t.includes('alto impacto')) {
      return <AlertTriangle size={20} color="#EA580C" style={{ flexShrink: 0 }} />;
    }
    if (t.includes('desgaste') || t.includes('preventiva')) {
      return <AlertCircle size={20} color="#D97706" style={{ flexShrink: 0 }} />;
    }
    return <ShieldCheck size={20} color="var(--accent)" style={{ flexShrink: 0 }} />;
  };

  return (
    <div className="res-section">
      <p className="calc-subsection-title" style={{ marginTop: 0 }}>
        Diagnóstico UrbanFlow
      </p>

      <div className="rec-block">
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {getHeaderIcon()}
          <span>{recomendacoes.titulo}</span>
        </h3>
        <ul className="rec-list">
          {recomendacoes.itens.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
