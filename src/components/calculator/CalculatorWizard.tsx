import React, { useState } from 'react';
import { CalculatorFormData, StepId, IimResult } from '../../types/calculator';
import { calculateIim } from '../../services/iimCalculator';
import { StepperNav } from './StepperNav';
import { Step1Empresa } from './steps/Step1Empresa';
import { Step2Colaborador } from './steps/Step2Colaborador';
import { Step3D1Trajeto } from './steps/Step3D1Trajeto';
import { Step4D2Estresse } from './steps/Step4D2Estresse';
import { Step5D3Pontualidade } from './steps/Step5D3Pontualidade';
import { Step6D4Vulnerabilidade } from './steps/Step6D4Vulnerabilidade';
import { Step7Resultado } from './steps/Step7Resultado';
import '../../styles/calculator.css';

const INITIAL_DATA: CalculatorFormData = {
  // Etapa 1
  empresa_nome: '',
  empresa_setor: '',
  empresa_regime: '',
  empresa_contrato: '',
  empresa_flex: '',
  empresa_turno: '',
  empresa_local: '',
  empresa_total: '',
  empresa_presencial_qtd: '',
  empresa_turnover: '',
  empresa_burnout: '',
  empresa_faturamento: '',
  empresa_salario_medio: '',
  empresa_beneficios: '',
  empresa_ciclista: '',

  // Etapa 2
  func_cargo: '',
  func_presenca: '',
  func_salario: '',
  func_reposicao: '',

  // Etapa 3
  d1_tempo: '',
  d1_dist: '',
  d1_modal: '',
  d1_dias: '',
  d1_bald: '',
  d1_espera: '',
  d1_variacao: 50,
  d1_custo: '',
  d1_vt: '',

  // Etapa 4
  d2_cansaco: 50,
  d2_estresse: '',
  d2_conc: 30,
  d2_qual: 50,
  d2_sono: '',
  d2_desconforto: '',
  d2_lazer: '',
  d2_ansiedade: '',
  d2_energia: '',

  // Etapa 5
  d3_atrasos: '',
  d3_faltas: '',
  d3_recusa: '',
  d3_licencas: '',
  d3_contrib: '',
  d3_homeoff: '',
  d3_limite: '',
  d3_saicedo: '',
  d3_intencao: '',

  // Etapa 6
  d4_bairro: '',
  d4_ponto: '',
  d4_dep: '',
  d4_seg: 60,
  d4_app: '',
  d4_risco: '',
  d4_violencia: '',
  d4_vuln: 40,
  d4_tp_qual: ''
};

export const CalculatorWizard: React.FC = () => {
  const [formData, setFormData] = useState<CalculatorFormData>(INITIAL_DATA);
  const [currentStep, setCurrentStep] = useState<StepId>(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [result, setResult] = useState<IimResult | null>(null);

  // Field change handler that automatically removes error on input
  const handleChange = <K extends keyof CalculatorFormData>(
    field: K,
    value: CalculatorFormData[K]
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

  // Step-by-step validation of mandatory fields
  const validateStep = (step: StepId): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.empresa_nome.trim()) newErrors.empresa_nome = 'Informe o nome da empresa';
      if (!formData.empresa_setor) newErrors.empresa_setor = 'Selecione o setor de atuação';
      if (!formData.empresa_regime) newErrors.empresa_regime = 'Selecione o regime de trabalho';
      if (!formData.empresa_contrato) newErrors.empresa_contrato = 'Selecione o regime de contratação';
      if (!formData.empresa_flex) newErrors.empresa_flex = 'Indique a flexibilidade de horário';
      if (!formData.empresa_turno) newErrors.empresa_turno = 'Selecione o turno predominante';
      if (!formData.empresa_local) newErrors.empresa_local = 'Selecione a localização da empresa';
      if (formData.empresa_total === '' || Number(formData.empresa_total) < 1)
        newErrors.empresa_total = 'Informe o total de colaboradores';
      if (formData.empresa_presencial_qtd === '' || Number(formData.empresa_presencial_qtd) < 1)
        newErrors.empresa_presencial_qtd = 'Informe a quantidade em regime presencial';
      if (formData.empresa_turnover === '') newErrors.empresa_turnover = 'Informe o turnover anual';
      if (formData.empresa_burnout === '')
        newErrors.empresa_burnout = 'Informe os afastamentos por burnout';
      if (formData.empresa_faturamento === '')
        newErrors.empresa_faturamento = 'Informe o faturamento anual';
      if (formData.empresa_salario_medio === '')
        newErrors.empresa_salario_medio = 'Informe o salário médio mensal';
      if (!formData.empresa_beneficios)
        newErrors.empresa_beneficios = 'Selecione os benefícios oferecidos';
      if (!formData.empresa_ciclista)
        newErrors.empresa_ciclista = 'Indique a infraestrutura para ciclistas';
    } else if (step === 2) {
      if (!formData.func_cargo) newErrors.func_cargo = 'Selecione o cargo / função';
      if (!formData.func_presenca) newErrors.func_presenca = 'Indique a exigência de presença física';
      if (!formData.func_reposicao) newErrors.func_reposicao = 'Selecione o fator de reposição';
    } else if (step === 3) {
      if (formData.d1_tempo === '' || Number(formData.d1_tempo) < 0)
        newErrors.d1_tempo = 'Informe o tempo de trajeto em minutos';
      if (formData.d1_dist === '' || Number(formData.d1_dist) < 0)
        newErrors.d1_dist = 'Informe a distância aproximada em km';
      if (!formData.d1_modal) newErrors.d1_modal = 'Selecione o meio de transporte principal';
      if (!formData.d1_dias) newErrors.d1_dias = 'Indique os dias presenciais por semana';
      if (!formData.d1_bald) newErrors.d1_bald = 'Indique as baldeações/conexões';
      if (formData.d1_espera === '' || Number(formData.d1_espera) < 0)
        newErrors.d1_espera = 'Informe o tempo médio de espera';
      if (formData.d1_custo === '' || Number(formData.d1_custo) < 0)
        newErrors.d1_custo = 'Informe o custo mensal com transporte';
      if (!formData.d1_vt) newErrors.d1_vt = 'Indique se o vale-transporte cobre o custo';
    } else if (step === 4) {
      if (!formData.d2_estresse) newErrors.d2_estresse = 'Indique a frequência de estresse';
      if (!formData.d2_sono) newErrors.d2_sono = 'Indique se afeta a qualidade do sono';
      if (!formData.d2_desconforto) newErrors.d2_desconforto = 'Indique se chega desconfortável';
      if (!formData.d2_lazer) newErrors.d2_lazer = 'Indique se impede lazer ou atividades';
      if (!formData.d2_ansiedade) newErrors.d2_ansiedade = 'Indique a ansiedade antecipada';
      if (!formData.d2_energia) newErrors.d2_energia = 'Indique a energia para vida pessoal';
    } else if (step === 5) {
      if (formData.d3_atrasos === '' || Number(formData.d3_atrasos) < 0)
        newErrors.d3_atrasos = 'Informe a quantidade de atrasos por mês';
      if (formData.d3_faltas === '' || Number(formData.d3_faltas) < 0)
        newErrors.d3_faltas = 'Informe a quantidade de faltas por mês';
      if (!formData.d3_recusa) newErrors.d3_recusa = 'Indique se já recusou tarefas ou horas';
      if (formData.d3_licencas === '' || Number(formData.d3_licencas) < 0)
        newErrors.d3_licencas = 'Informe os dias de licença';
      if (!formData.d3_contrib) newErrors.d3_contrib = 'Indique a contribuição do trajeto';
      if (!formData.d3_homeoff) newErrors.d3_homeoff = 'Indique se pediu home office por evitação';
      if (!formData.d3_limite) newErrors.d3_limite = 'Indique a frequência no limite exato';
      if (!formData.d3_saicedo) newErrors.d3_saicedo = 'Indique se sai mais cedo do trabalho';
      if (!formData.d3_intencao) newErrors.d3_intencao = 'Indique a intenção de demissão';
    } else if (step === 6) {
      if (!formData.d4_bairro.trim()) newErrors.d4_bairro = 'Informe o bairro de residência';
      if (formData.d4_ponto === '' || Number(formData.d4_ponto) < 0)
        newErrors.d4_ponto = 'Informe a distância a pé até o ponto';
      if (!formData.d4_dep) newErrors.d4_dep = 'Indique a dependência do transporte público';
      if (!formData.d4_app) newErrors.d4_app = 'Indique o acesso a aplicativo de transporte';
      if (!formData.d4_risco) newErrors.d4_risco = 'Indique a presença de áreas com risco';
      if (!formData.d4_violencia) newErrors.d4_violencia = 'Indique se foi vítima de assalto/violência';
      if (!formData.d4_tp_qual) newErrors.d4_tp_qual = 'Avalie a qualidade do transporte público';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      // Scroll to first invalid field
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

  const advanceTo = (nextStep: StepId) => {
    if (!validateStep(currentStep)) return;

    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps((prev) => [...prev, currentStep]);
    }
    setCurrentStep(nextStep);
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const goToStep = (targetStep: StepId) => {
    // If going backwards, allow freely
    if (targetStep < currentStep) {
      setCurrentStep(targetStep);
      window.scrollTo({ top: 120, behavior: 'smooth' });
      return;
    }
    // If going forward, validate current step first
    if (validateStep(currentStep)) {
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps((prev) => [...prev, currentStep]);
      }
      setCurrentStep(targetStep);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const handleFinish = () => {
    if (!validateStep(6)) return;
    const computed = calculateIim(formData);
    setResult(computed);
    setCurrentStep(7);
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const handleReset = () => {
    setFormData(INITIAL_DATA);
    setErrors({});
    setCompletedSteps([]);
    setResult(null);
    setCurrentStep(1);
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

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
            onChange={handleChange}
            onNext={() => advanceTo(2)}
          />
        )}

        {currentStep === 2 && (
          <Step2Colaborador
            data={formData}
            errors={errors}
            onChange={handleChange}
            onPrev={() => setCurrentStep(1)}
            onNext={() => advanceTo(3)}
          />
        )}

        {currentStep === 3 && (
          <Step3D1Trajeto
            data={formData}
            errors={errors}
            onChange={handleChange}
            onPrev={() => setCurrentStep(2)}
            onNext={() => advanceTo(4)}
          />
        )}

        {currentStep === 4 && (
          <Step4D2Estresse
            data={formData}
            errors={errors}
            onChange={handleChange}
            onPrev={() => setCurrentStep(3)}
            onNext={() => advanceTo(5)}
          />
        )}

        {currentStep === 5 && (
          <Step5D3Pontualidade
            data={formData}
            errors={errors}
            onChange={handleChange}
            onPrev={() => setCurrentStep(4)}
            onNext={() => advanceTo(6)}
          />
        )}

        {currentStep === 6 && (
          <Step6D4Vulnerabilidade
            data={formData}
            errors={errors}
            onChange={handleChange}
            onPrev={() => setCurrentStep(5)}
            onSubmit={handleFinish}
          />
        )}

        {currentStep === 7 && result && (
          <Step7Resultado
            result={result}
            onEdit={() => setCurrentStep(6)}
            onReset={handleReset}
          />
        )}
      </div>
    </div>
  );
};
