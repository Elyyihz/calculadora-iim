import React from 'react';
import { CalculatorInputDTO, FullIimDiagnosis, SimulatedSavings } from '../../../types/calculatorDTOs';
import { ResultDashboard } from '../dashboard/ResultDashboard';

interface Step7ResultadoProps {
  formData?: CalculatorInputDTO;
  result: FullIimDiagnosis;
  simulatedSavings: SimulatedSavings | null;
  onUpdateSimulation: (targetIim: number) => void;
  onEdit: () => void;
  onReset: () => void;
}

export const Step7Resultado: React.FC<Step7ResultadoProps> = (props) => {
  return <ResultDashboard {...props} />;
};

export default Step7Resultado;
