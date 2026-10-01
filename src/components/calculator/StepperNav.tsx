import React from 'react';
import { StepConfig, StepId } from '../../types/calculator';
import { Check } from 'lucide-react';

export const STEPS: StepConfig[] = [
  { id: 1, badge: '🏢', title: 'Dados da Empresa', subtitle: 'Contexto organizacional', shortLabel: 'Empresa' },
  { id: 2, badge: '👤', title: 'Perfil do Colaborador', subtitle: 'Cargo, função e reposição', shortLabel: 'Colaborador' },
  { id: 3, badge: 'D1', title: 'Tempo e Distância de Deslocamento', subtitle: 'Exposição física e modal', shortLabel: 'D1 · Trajeto' },
  { id: 4, badge: 'D2', title: 'Estresse e Fadiga Percebidos', subtitle: 'Impacto subjetivo e fisiológico', shortLabel: 'D2 · Estresse' },
  { id: 5, badge: 'D3', title: 'Pontualidade e Frequência', subtitle: 'Impacto financeiro e assiduidade', shortLabel: 'D3 · Pontual.' },
  { id: 6, badge: 'D4', title: 'Vulnerabilidade Modal e Socioespacial', subtitle: 'Risco e infraestrutura', shortLabel: 'D4 · Vulnerab.' }
];

interface StepperNavProps {
  currentStep: StepId;
  onSelectStep: (step: StepId) => void;
  completedSteps: number[];
}

export const StepperNav: React.FC<StepperNavProps> = ({
  currentStep,
  onSelectStep,
  completedSteps
}) => {
  const activeIndex = currentStep <= 6 ? currentStep : 6;
  const progressPercent = (activeIndex / STEPS.length) * 100;

  return (
    <div className="calc-progress-wrap">
      <div className="calc-progress-card">
        <div className="calc-steps-row">
          {STEPS.map((s, idx) => {
            const isDone = completedSteps.includes(s.id) && s.id !== currentStep;
            const isActive = s.id === currentStep;

            return (
              <React.Fragment key={s.id}>
                <div
                  className={`calc-step-item ${isActive ? 'active' : ''} ${isDone ? 'done' : ''}`}
                  onClick={() => onSelectStep(s.id)}
                  title={`${s.id}. ${s.title}`}
                  role="button"
                  tabIndex={0}
                >
                  <div className="calc-step-num">
                    {isDone ? <Check size={13} strokeWidth={3} /> : s.id}
                  </div>
                  <span className="calc-step-label">{s.shortLabel}</span>
                </div>

                {idx < STEPS.length - 1 && <div className="calc-step-sep" />}
              </React.Fragment>
            );
          })}
        </div>

        <div className="calc-progress-bar-wrap">
          <div
            className="calc-progress-bar-fill"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    </div>
  );
};
