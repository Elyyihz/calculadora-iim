import {
  CalculatorInputDTO,
  FullIimDiagnosis
} from './calculatorDTOs';

export * from './calculatorDTOs';

export type CalculatorFormData = CalculatorInputDTO;
export type IimResult = FullIimDiagnosis;

export type StepId = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface StepConfig {
  id: StepId;
  badge: string;
  title: string;
  subtitle: string;
  shortLabel: string;
}
