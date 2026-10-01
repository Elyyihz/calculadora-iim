import React, { createContext, useContext, useState, ReactNode } from 'react';
import {
  CalculatorInputDTO,
  FullIimDiagnosis,
  SimulatedSavings
} from '../types/calculatorDTOs';
import { StepId } from '../types/calculator';
import { CalculatorService, INITIAL_CALCULATOR_DATA } from '../services/CalculatorService';

interface CalculatorContextType {
  formData: CalculatorInputDTO;
  currentStep: StepId;
  completedSteps: number[];
  errors: Record<string, string>;
  result: FullIimDiagnosis | null;
  simulatedSavings: SimulatedSavings | null;
  setFieldValue: <K extends keyof CalculatorInputDTO>(field: K, value: CalculatorInputDTO[K]) => void;
  advanceStep: () => boolean;
  goToPreviousStep: () => void;
  goToStep: (targetStep: StepId) => boolean;
  calculateDiagnosis: () => boolean;
  updateSimulationTarget: (targetIim: number) => void;
  resetCalculator: () => void;
}

const CalculatorContext = createContext<CalculatorContextType | undefined>(undefined);

export const CalculatorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<CalculatorInputDTO>(INITIAL_CALCULATOR_DATA);
  const [currentStep, setCurrentStep] = useState<StepId>(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [result, setResult] = useState<FullIimDiagnosis | null>(null);
  const [simulatedSavings, setSimulatedSavings] = useState<SimulatedSavings | null>(null);

  const setFieldValue = <K extends keyof CalculatorInputDTO>(
    field: K,
    value: CalculatorInputDTO[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as string]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field as string];
        return next;
      });
    }
  };

  const validateAndScroll = (step: number): boolean => {
    const stepErrors = CalculatorService.validateStep(step, formData);
    setErrors(stepErrors);

    if (Object.keys(stepErrors).length > 0) {
      setTimeout(() => {
        const firstEl = document.querySelector('.field-required-missing');
        if (firstEl) {
          firstEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 50);
      return false;
    }
    return true;
  };

  const advanceStep = (): boolean => {
    if (!validateAndScroll(currentStep)) return false;

    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps((prev) => [...prev, currentStep]);
    }
    const nextStep = (currentStep + 1) as StepId;
    setCurrentStep(nextStep);
    window.scrollTo({ top: 120, behavior: 'smooth' });
    return true;
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep((currentStep - 1) as StepId);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const goToStep = (targetStep: StepId): boolean => {
    if (targetStep < currentStep) {
      setCurrentStep(targetStep);
      window.scrollTo({ top: 120, behavior: 'smooth' });
      return true;
    }
    if (!validateAndScroll(currentStep)) return false;

    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps((prev) => [...prev, currentStep]);
    }
    setCurrentStep(targetStep);
    window.scrollTo({ top: 120, behavior: 'smooth' });
    return true;
  };

  const calculateDiagnosis = (): boolean => {
    if (!validateAndScroll(6)) return false;

    const fullResult = CalculatorService.generateFullDiagnosis(formData);
    setResult(fullResult);
    setSimulatedSavings(fullResult.simuladorPadrao);
    if (!completedSteps.includes(6)) {
      setCompletedSteps((prev) => [...prev, 6]);
    }
    setCurrentStep(7);
    window.scrollTo({ top: 120, behavior: 'smooth' });
    return true;
  };

  const updateSimulationTarget = (targetIim: number) => {
    if (!result) return;
    const sim = CalculatorService.calculateSimuladorEconomia(
      result.iimRounded,
      result.financeiro.custoImpactoTotalMensal,
      targetIim
    );
    setSimulatedSavings(sim);
  };

  const resetCalculator = () => {
    setFormData(INITIAL_CALCULATOR_DATA);
    setErrors({});
    setCompletedSteps([]);
    setResult(null);
    setSimulatedSavings(null);
    setCurrentStep(1);
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  return (
    <CalculatorContext.Provider
      value={{
        formData,
        currentStep,
        completedSteps,
        errors,
        result,
        simulatedSavings,
        setFieldValue,
        advanceStep,
        goToPreviousStep,
        goToStep,
        calculateDiagnosis,
        updateSimulationTarget,
        resetCalculator
      }}
    >
      {children}
    </CalculatorContext.Provider>
  );
};

export const useCalculatorStore = (): CalculatorContextType => {
  const context = useContext(CalculatorContext);
  if (!context) {
    throw new Error('useCalculatorStore must be used within a CalculatorProvider');
  }
  return context;
};
