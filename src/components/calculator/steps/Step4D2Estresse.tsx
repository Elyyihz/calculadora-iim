import React from 'react';
import { CalculatorFormData } from '../../../types/calculator';
import { FormField } from '../common/FormField';
import { FormChips } from '../common/FormChips';
import { FormScale } from '../common/FormScale';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface Step4D2EstresseProps {
  data: CalculatorFormData;
  errors: Record<string, string>;
  onChange: <K extends keyof CalculatorFormData>(field: K, value: CalculatorFormData[K]) => void;
  onPrev: () => void;
  onNext: () => void;
}

const FREQUENCY_CHIPS = [
  { value: '0', label: 'Nunca' },
  { value: '1', label: 'Raramente' },
  { value: '2', label: 'Às vezes' },
  { value: '3', label: 'Frequentemente' },
  { value: '4', label: 'Sempre' }
];

export const Step4D2Estresse: React.FC<Step4D2EstresseProps> = ({
  data,
  errors,
  onChange,
  onPrev,
  onNext
}) => {
  return (
    <div className="calc-section-card">
      <div className="calc-section-head">
        <div className="calc-dim-badge">
          D2<span className="pct">27%</span>
        </div>
        <div className="calc-section-head-text">
          <h2>Estresse e Fadiga Percebidos</h2>
          <p>Impacto subjetivo e fisiológico — conectado ao custo de saúde, presenteísmo e burnout</p>
        </div>
      </div>

      <div className="calc-section-body">
        <FormField
          label="01 · Nível de cansaço ao chegar ao trabalho"
          tip="Indica quanto o trajeto drena energia antes do expediente começar."
        >
          <FormScale
            value={data.d2_cansaco}
            onChange={(val) => onChange('d2_cansaco', val)}
            labels={['Nenhum', 'Leve', 'Moderado', 'Alto', 'Muito alto']}
            minLabel="Nenhum"
            maxLabel="Muito alto"
          />
        </FormField>

        <FormField
          label="02 · Frequência de estresse durante o trajeto"
          hasError={!!errors.d2_estresse}
          errorMessage={errors.d2_estresse}
        >
          <FormChips
            selectedValue={data.d2_estresse}
            onChange={(val) => onChange('d2_estresse', val)}
            options={FREQUENCY_CHIPS}
          />
        </FormField>

        <FormField
          label="03 · O trajeto impacta a concentração no início do expediente?"
          tip="'Custo de transição' — tempo até recuperar foco após deslocamento. Base do custo de presenteísmo."
        >
          <FormScale
            value={data.d2_conc}
            onChange={(val) => onChange('d2_conc', val)}
            labels={['Nenhum impacto', 'Pouco', 'Médio', 'Alto', 'Muito alto']}
            minLabel="Nenhum impacto"
            maxLabel="Muito alto"
          />
        </FormField>

        <FormField
          label="04 · Avaliação geral da qualidade do deslocamento"
        >
          <FormScale
            value={data.d2_qual}
            onChange={(val) => onChange('d2_qual', val)}
            labels={['Péssima', 'Ruim', 'Regular', 'Boa', 'Excelente']}
            minLabel="Péssima"
            maxLabel="Excelente"
          />
        </FormField>

        <FormField
          label="05 · O trajeto afeta a qualidade do sono?"
          tip="Acordar muito cedo acumula privação de sono — impacta cognição e saúde."
          hasError={!!errors.d2_sono}
          errorMessage={errors.d2_sono}
        >
          <FormChips
            selectedValue={data.d2_sono}
            onChange={(val) => onChange('d2_sono', val)}
            options={FREQUENCY_CHIPS}
          />
        </FormField>

        <FormField
          label="06 · Chega fisicamente desconfortável ao trabalho?"
          tip="Calor, chuva, superlotação — gera desconforto e constrangimento."
          hasError={!!errors.d2_desconforto}
          errorMessage={errors.d2_desconforto}
        >
          <FormChips
            selectedValue={data.d2_desconforto}
            onChange={(val) => onChange('d2_desconforto', val)}
            options={FREQUENCY_CHIPS}
          />
        </FormField>

        <FormField
          label="07 · O deslocamento impede atividades físicas, refeições ou lazer?"
          tip="Trajetos longos roubam tempo de recuperação — alta correlação com burnout."
          hasError={!!errors.d2_lazer}
          errorMessage={errors.d2_lazer}
        >
          <FormChips
            selectedValue={data.d2_lazer}
            onChange={(val) => onChange('d2_lazer', val)}
            options={[
              { value: '0', label: '🟢 Não, tenho tempo' },
              { value: '2', label: '🟡 Às vezes prejudica' },
              { value: '4', label: '🔴 Sim, sempre prejudica' }
            ]}
          />
        </FormField>

        <FormField
          label="08 · Sente ansiedade ou irritação antecipada em relação ao trajeto?"
          tip="Ansiedade antecipatória é sinal de estresse crônico — precede sintomas graves."
          hasError={!!errors.d2_ansiedade}
          errorMessage={errors.d2_ansiedade}
        >
          <FormChips
            selectedValue={data.d2_ansiedade}
            onChange={(val) => onChange('d2_ansiedade', val)}
            options={FREQUENCY_CHIPS}
          />
        </FormField>

        <FormField
          label="09 · O trajeto deixa sem energia para a vida pessoal?"
          tip="'Roubo de vida' — quando o deslocamento compromete relações e bem-estar."
          hasError={!!errors.d2_energia}
          errorMessage={errors.d2_energia}
        >
          <FormChips
            selectedValue={data.d2_energia}
            onChange={(val) => onChange('d2_energia', val)}
            options={FREQUENCY_CHIPS}
          />
        </FormField>

        <div className="calc-nav-row">
          <button type="button" className="btn btn-ghost" onClick={onPrev}>
            <ArrowLeft size={16} />
            <span>Voltar</span>
          </button>
          <button type="button" className="btn btn-primary" onClick={onNext}>
            <span>D3 · Pontualidade</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
