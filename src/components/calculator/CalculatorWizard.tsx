import React from 'react';
import { StepperNav } from './StepperNav';
import { Step1Empresa } from './steps/Step1Empresa';
import { Step2Colaborador } from './steps/Step2Colaborador';
import { Step3D1Trajeto } from './steps/Step3D1Trajeto';
import { Step4D2Estresse } from './steps/Step4D2Estresse';
import { Step5D3Pontualidade } from './steps/Step5D3Pontualidade';
import { Step6D4Vulnerabilidade } from './steps/Step6D4Vulnerabilidade';
import { Step7Resultado } from './steps/Step7Resultado';
import { useCalculatorStore } from '../../context/CalculatorContext';
import '../../styles/calculator.css';

export const CalculatorWizard: React.FC = () => {
  const {
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
  } = useCalculatorStore();

  return (
    <div>
      {/* STEPPER PROGRESS NAVIGATION */}
      {currentStep <= 6 && (
        <StepperNav
          currentStep={currentStep}
          onSelectStep={goToStep}
          completedSteps={completedSteps}
        />
      )}

      {/* ACTIVE STEP CARD */}
      <div className="calc-main">
        {currentStep === 1 && (
          <Step1Empresa
            data={formData}
            errors={errors}
            onChange={setFieldValue}
            onNext={advanceStep}
          />
        )}

        {currentStep === 2 && (
          <Step2Colaborador
            data={formData}
            errors={errors}
            onChange={setFieldValue}
            onPrev={goToPreviousStep}
            onNext={advanceStep}
          />
        )}

        {currentStep === 3 && (
          <Step3D1Trajeto
            data={formData}
            errors={errors}
            onChange={setFieldValue}
            onPrev={goToPreviousStep}
            onNext={advanceStep}
          />
        )}

        {currentStep === 4 && (
          <Step4D2Estresse
            data={formData}
            errors={errors}
            onChange={setFieldValue}
            onPrev={goToPreviousStep}
            onNext={advanceStep}
          />
        )}

        {currentStep === 5 && (
          <Step5D3Pontualidade
            data={formData}
            errors={errors}
            onChange={setFieldValue}
            onPrev={goToPreviousStep}
            onNext={advanceStep}
          />
        )}

        {currentStep === 6 && (
          <Step6D4Vulnerabilidade
            data={formData}
            errors={errors}
            onChange={setFieldValue}
            onPrev={goToPreviousStep}
            onSubmit={calculateDiagnosis}
          />
        )}

        {currentStep === 7 && result && (
          <Step7Resultado
            result={result}
            simulatedSavings={simulatedSavings}
            onUpdateSimulation={updateSimulationTarget}
            onEdit={() => goToStep(6)}
            onReset={resetCalculator}
          />
        )}
      </div>
    </div>
  );
};
