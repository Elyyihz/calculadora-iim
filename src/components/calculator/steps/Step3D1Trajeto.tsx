import React from 'react';
import { CalculatorFormData } from '../../../types/calculator';
import { FormField } from '../common/FormField';
import { FormChips } from '../common/FormChips';
import { FormScale } from '../common/FormScale';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface Step3D1TrajetoProps {
  data: CalculatorFormData;
  errors: Record<string, string>;
  onChange: <K extends keyof CalculatorFormData>(field: K, value: CalculatorFormData[K]) => void;
  onPrev: () => void;
  onNext: () => void;
}

export const Step3D1Trajeto: React.FC<Step3D1TrajetoProps> = ({
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
          D1<span className="pct">30%</span>
        </div>
        <div className="calc-section-head-text">
          <h2>Tempo e Distância de Deslocamento</h2>
          <p>Exposição física ao deslocamento — tempo, distância, modal e frequência</p>
        </div>
      </div>

      <div className="calc-section-body">
        <div className="calc-grid-2">
          <FormField
            label="01 · Tempo médio do trajeto (minutos)"
            tip="Considera o trajeto porta a porta, incluindo esperas e conexões."
            hasError={!!errors.d1_tempo}
            errorMessage={errors.d1_tempo}
          >
            <input
              type="number"
              placeholder="Ex: 55"
              min="0"
              value={data.d1_tempo}
              onChange={(e) =>
                onChange('d1_tempo', e.target.value === '' ? '' : parseFloat(e.target.value))
              }
            />
          </FormField>

          <FormField
            label="02 · Distância aproximada (km, ida)"
            hasError={!!errors.d1_dist}
            errorMessage={errors.d1_dist}
          >
            <input
              type="number"
              placeholder="Ex: 22"
              min="0"
              value={data.d1_dist}
              onChange={(e) =>
                onChange('d1_dist', e.target.value === '' ? '' : parseFloat(e.target.value))
              }
            />
          </FormField>
        </div>

        <FormField
          label="03 · Meio de transporte principal"
          hasError={!!errors.d1_modal}
          errorMessage={errors.d1_modal}
        >
          <FormChips
            selectedValue={data.d1_modal}
            onChange={(val) => onChange('d1_modal', val)}
            options={[
              { value: 'onibus', label: '🚌 Ônibus' },
              { value: 'metro', label: '🚇 Metrô/BRT' },
              { value: 'carro', label: '🚗 Carro próprio' },
              { value: 'moto', label: '🏍️ Moto' },
              { value: 'bici', label: '🚲 Bicicleta' },
              { value: 'pe', label: '🚶 A pé' },
              { value: 'app', label: '📱 App (Uber/99)' },
              { value: 'misto', label: '🔀 Misto' }
            ]}
          />
        </FormField>

        <div className="calc-grid-2">
          <FormField
            label="04 · Dias presenciais por semana"
            tip="Funciona como multiplicador global do IIM — 1 dia/sem reduz impacto em 70%."
            hasError={!!errors.d1_dias}
            errorMessage={errors.d1_dias}
          >
            <FormChips
              selectedValue={data.d1_dias}
              onChange={(val) => onChange('d1_dias', val)}
              options={[
                { value: '1', label: '1 dia' },
                { value: '2', label: '2 dias' },
                { value: '3', label: '3 dias' },
                { value: '4', label: '4 dias' },
                { value: '5', label: '5 dias' }
              ]}
            />
          </FormField>

          <FormField
            label="05 · Baldeações / conexões"
            tip="Cada conexão adiciona espera, incerteza e desgaste mental ao percurso."
            hasError={!!errors.d1_bald}
            errorMessage={errors.d1_bald}
          >
            <FormChips
              selectedValue={data.d1_bald}
              onChange={(val) => onChange('d1_bald', val)}
              options={[
                { value: '0', label: '0 conexões' },
                { value: '1', label: '1' },
                { value: '2', label: '2' },
                { value: '3', label: '3+' }
              ]}
            />
          </FormField>
        </div>

        <div className="calc-grid-2">
          <FormField
            label="06 · Tempo médio de espera (min)"
            tip="Tempo improdutivo exposto — invisível nas métricas tradicionais."
            hasError={!!errors.d1_espera}
            errorMessage={errors.d1_espera}
          >
            <input
              type="number"
              placeholder="Ex: 15"
              min="0"
              value={data.d1_espera}
              onChange={(e) =>
                onChange('d1_espera', e.target.value === '' ? '' : parseFloat(e.target.value))
              }
            />
          </FormField>

          <FormField
            label="07 · O trajeto varia muito conforme o trânsito?"
          >
            <FormScale
              value={data.d1_variacao}
              onChange={(val) => onChange('d1_variacao', val)}
              labels={['Muito estável', 'Estável', 'Variável', 'Muito variável']}
              minLabel="Muito estável"
              maxLabel="Muito variável"
            />
          </FormField>
        </div>

        <div className="calc-grid-2">
          <FormField
            label="08 · Custo mensal com transporte (R$)"
            tip="Percentual do salário comprometido com transporte entra como indicador de vulnerabilidade financeira em D4."
            hasError={!!errors.d1_custo}
            errorMessage={errors.d1_custo}
          >
            <input
              type="number"
              placeholder="Ex: 280"
              min="0"
              value={data.d1_custo}
              onChange={(e) =>
                onChange('d1_custo', e.target.value === '' ? '' : parseFloat(e.target.value))
              }
            />
          </FormField>

          <FormField
            label="09 · O vale-transporte cobre o custo total?"
            hasError={!!errors.d1_vt}
            errorMessage={errors.d1_vt}
          >
            <FormChips
              selectedValue={data.d1_vt}
              onChange={(val) => onChange('d1_vt', val)}
              options={[
                { value: 'sim', label: '✅ Sim, totalmente' },
                { value: 'parcial', label: '⚖️ Parcialmente' },
                { value: 'nao', label: '❌ Não cobre' }
              ]}
            />
          </FormField>
        </div>

        <div className="calc-nav-row">
          <button type="button" className="btn btn-ghost" onClick={onPrev}>
            <ArrowLeft size={16} />
            <span>Voltar</span>
          </button>
          <button type="button" className="btn btn-primary" onClick={onNext}>
            <span>D2 · Estresse</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
