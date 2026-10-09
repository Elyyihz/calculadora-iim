import React from 'react';
import { CheckCircle2, FileSpreadsheet } from 'lucide-react';
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

interface CalculatorWizardProps {
  onNavigateToSpreadsheet?: () => void;
}

export const CalculatorWizard: React.FC<CalculatorWizardProps> = ({ onNavigateToSpreadsheet }) => {
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
          <div>
            <div
              style={{
                background: '#F0FDF4',
                border: '1px solid #86EFAC',
                borderRadius: '14px',
                padding: '1.2rem 1.6rem',
                marginBottom: '1.8rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem',
                boxShadow: '0 4px 15px rgba(22, 163, 74, 0.08)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <CheckCircle2 size={24} color="#16A34A" />
                <div>
                  <div style={{ fontWeight: 800, fontSize: '1rem', color: '#166534' }}>
                    Diagnóstico IIM Processado com Sucesso!
                  </div>
                  <div style={{ fontSize: '0.84rem', color: '#15803D', marginTop: '2px' }}>
                    O score e todas as análises financeiras e dimensionais abaixo foram calculados para{' '}
                    <strong>{result.empresaNome || 'sua organização'}</strong>.
                  </div>
                </div>
              </div>

              {onNavigateToSpreadsheet && (
                <button
                  type="button"
                  onClick={onNavigateToSpreadsheet}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    background: '#FFFFFF',
                    border: '1px solid #BBF7D0',
                    color: '#166534',
                    fontSize: '0.84rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#F0FDF4')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = '#FFFFFF')}
                >
                  <FileSpreadsheet size={15} />
                  <span>Alimentar Outra Planilha</span>
                </button>
              )}
            </div>

            <Step7Resultado
              formData={formData}
              result={result}
              simulatedSavings={simulatedSavings}
              onUpdateSimulation={updateSimulationTarget}
              onEdit={() => goToStep(1)}
              onReset={resetCalculator}
            />
          </div>
        )}
      </div>
    </div>
  );
};
