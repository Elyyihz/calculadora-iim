import React from 'react';
import { CalculatorInputDTO, FullIimDiagnosis, SimulatedSavings } from '../../../types/calculatorDTOs';
import { ScoreHero } from './ScoreHero';
import { RadarDimensionalSection } from './RadarDimensionalSection';
import { FinancialImpactSection } from './FinancialImpactSection';
import { ProjectionsSection } from './ProjectionsSection';
import { SavingsSimulatorSection } from './SavingsSimulatorSection';
import { InterventionsSection } from './InterventionsSection';
import { RecommendationsSection } from './RecommendationsSection';
import { CompanyScaleSection } from './CompanyScaleSection';
import { MethodologySection } from './MethodologySection';

interface ResultDashboardProps {
  formData?: CalculatorInputDTO;
  result: FullIimDiagnosis;
  simulatedSavings: SimulatedSavings | null;
  onUpdateSimulation: (targetIim: number) => void;
  onEdit: () => void;
  onReset: () => void;
}

export const ResultDashboard: React.FC<ResultDashboardProps> = ({
  formData,
  result,
  simulatedSavings,
  onUpdateSimulation,
  onEdit,
  onReset
}) => {
  return (
    <div id="resultado" className="res-dashboard active">
      {/* 1. HERO SCORE & PRINT ACTION */}
      <ScoreHero result={result} formData={formData} />

      {/* 2. RADAR & DIMENSIONAL SCORES */}
      <RadarDimensionalSection
        dimensoes={result.dimensoes}
        financeiro={result.financeiro}
      />

      {/* 3. IMPACTO FINANCEIRO INDIVIDUAL */}
      <FinancialImpactSection financeiro={result.financeiro} />

      {/* 4. PROJEÇÃO INERCIAL 12 MESES */}
      <ProjectionsSection
        marcos={result.projecao12Meses.marcos}
        notaInercial={result.projecao12Meses.notaInercial}
      />

      {/* 5. SIMULADOR DE ECONOMIA (REAL-TIME DATA BINDING) */}
      <SavingsSimulatorSection
        iimAtual={result.iimRounded}
        custoMensal={result.financeiro.custoImpactoTotalMensal}
        simulatedSavings={simulatedSavings}
        onUpdateTarget={onUpdateSimulation}
      />

      {/* 6. INTERVENÇÕES COM ROI */}
      <InterventionsSection intervencoes={result.intervencoesPrioritarias} />

      {/* 7. RECOMENDAÇÕES URBANFLOW */}
      <RecommendationsSection recomendacoes={result.recomendacoes} />

      {/* 8. PROJEÇÃO PARA TODA A EMPRESA */}
      <CompanyScaleSection projecao={result.projecaoEmpresa} />

      {/* 9. METODOLOGIA IIM & REINICIALIZAÇÃO */}
      <MethodologySection onEdit={onEdit} onReset={onReset} />

      {/* 10. AVISO LEGAL NO RODAPÉ DE IMPRESSÃO / PDF (@media print) */}
      <div className="print-only-footer">
        Todos os números apresentados devem ser tratados como dados estimados e projetados
      </div>
    </div>
  );
};
