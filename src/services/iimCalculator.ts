import { CalculatorInputDTO, FullIimDiagnosis } from '../types/calculatorDTOs';
import { CalculatorService, IIM_WEIGHTS, IimWeights } from './CalculatorService';

export function calculateIim(data: CalculatorInputDTO): FullIimDiagnosis {
  return CalculatorService.generateFullDiagnosis(data);
}

export { CalculatorService, IIM_WEIGHTS };
export type { IimWeights };

