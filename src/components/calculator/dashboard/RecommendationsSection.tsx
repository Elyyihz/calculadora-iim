import React from 'react';
import { DiagnosisRecommendations } from '../../../types/calculatorDTOs';

interface RecommendationsSectionProps {
  recomendacoes: DiagnosisRecommendations;
}

export const RecommendationsSection: React.FC<RecommendationsSectionProps> = ({
  recomendacoes
}) => {
  return (
    <div className="res-section">
      <p className="calc-subsection-title" style={{ marginTop: 0 }}>
        Diagnóstico UrbanFlow
      </p>

      <div className="rec-block">
        <h3>{recomendacoes.titulo}</h3>
        <ul className="rec-list">
          {recomendacoes.itens.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
