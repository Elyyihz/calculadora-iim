import { CalculatorInputDTO, FullIimDiagnosis } from '../types/calculatorDTOs';
import { CalculatorService } from './CalculatorService';

export function calculateIim(data: CalculatorInputDTO): FullIimDiagnosis {
  return CalculatorService.generateFullDiagnosis(data);
}

export { CalculatorService };
