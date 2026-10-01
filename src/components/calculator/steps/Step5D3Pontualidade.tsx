import React from 'react';
import { CalculatorFormData } from '../../../types/calculator';
import { FormField } from '../common/FormField';
import { FormChips } from '../common/FormChips';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface Step5D3PontualidadeProps {
  data: CalculatorFormData;
  errors: Record<string, string>;
  onChange: <K extends keyof CalculatorFormData>(field: K, value: CalculatorFormData[K]) => void;
  onPrev: () => void;
  onNext: () => void;
}

export const Step5D3Pontualidade: React.FC<Step5D3PontualidadeProps> = ({
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
          D3<span className="pct">25%</span>
        </div>
        <div className="calc-section-head-text">
          <h2>Pontualidade e Frequência</h2>
          <p>Maior impacto financeiro direto — intenção de saída tem sub-peso de 16%</p>
        </div>
      </div>

      <div className="calc-section-body">
        {/* SUB-PESOS BANNER */}
        <div
          style={{
            background: 'var(--surface-3)',
            borderRadius: 'var(--radius-sm)',
            padding: '0.75rem 1rem',
            marginBottom: '1.5rem',
            fontSize: '0.8rem',
            color: 'var(--text-muted)'
          }}
        >
          <strong style={{ color: 'var(--brand)' }}>Sub-pesos ativos:</strong> Atrasos (11%) · Faltas (11%) · Recusou tarefa (11%) · Licenças (9%) · Contribuição do trajeto (9%) · Home office por evitação (9%) · Limite exato (7%) · Sai mais cedo (7%) · Intenção de saída (16%)
        </div>

        <div className="calc-grid-2">
          <FormField
            label="01 · Atrasos por mês causados pelo trajeto"
            subPeso="11%"
            hasError={!!errors.d3_atrasos}
            errorMessage={errors.d3_atrasos}
          >
            <input
              type="number"
              placeholder="Ex: 3"
              min="0"
              value={data.d3_atrasos}
              onChange={(e) =>
                onChange('d3_atrasos', e.target.value === '' ? '' : parseFloat(e.target.value))
              }
            />
          </FormField>

          <FormField
            label="02 · Faltas motivadas por transporte / mês"
            subPeso="11%"
            hasError={!!errors.d3_faltas}
            errorMessage={errors.d3_faltas}
          >
            <input
              type="number"
              placeholder="Ex: 1"
              min="0"
              value={data.d3_faltas}
              onChange={(e) =>
                onChange('d3_faltas', e.target.value === '' ? '' : parseFloat(e.target.value))
              }
            />
          </FormField>
        </div>

        <FormField
          label="03 · Já recusou reunião, hora extra ou tarefa por causa do deslocamento?"
          subPeso="11%"
          hasError={!!errors.d3_recusa}
          errorMessage={errors.d3_recusa}
        >
          <FormChips
            selectedValue={data.d3_recusa}
            onChange={(val) => onChange('d3_recusa', val)}
            options={[
              { value: '0', label: 'Nunca' },
              { value: '2', label: 'Sim, 1–2 vezes' },
              { value: '4', label: 'Sim, com frequência' }
            ]}
          />
        </FormField>

        <div className="calc-grid-2">
          <FormField
            label="04 · Licenças de saúde mental (dias, 12m)"
            subPeso="9%"
            hasError={!!errors.d3_licencas}
            errorMessage={errors.d3_licencas}
          >
            <input
              type="number"
              placeholder="Ex: 5"
              min="0"
              value={data.d3_licencas}
              onChange={(e) =>
                onChange('d3_licencas', e.target.value === '' ? '' : parseFloat(e.target.value))
              }
            />
          </FormField>

          <FormField
            label="05 · O trajeto contribuiu para essas licenças?"
            subPeso="9%"
            hasError={!!errors.d3_contrib}
            errorMessage={errors.d3_contrib}
          >
            <FormChips
              selectedValue={data.d3_contrib}
              onChange={(val) => onChange('d3_contrib', val)}
              options={[
                { value: '0', label: 'Não' },
                { value: '1', label: 'Pouco' },
                { value: '3', label: 'Bastante' },
                { value: '4', label: 'Totalmente' }
              ]}
            />
          </FormField>
        </div>

        <FormField
          label="06 · Já pediu home office motivado pelo trajeto?"
          subPeso="9%"
          tip="Home office frequente por evitação é custo oculto de flexibilidade forçada."
          hasError={!!errors.d3_homeoff}
          errorMessage={errors.d3_homeoff}
        >
          <FormChips
            selectedValue={data.d3_homeoff}
            onChange={(val) => onChange('d3_homeoff', val)}
            options={[
              { value: '0', label: 'Nunca' },
              { value: '1', label: '1–2 vezes' },
              { value: '2', label: 'Às vezes' },
              { value: '3', label: 'Frequentemente' },
              { value: '4', label: 'Sempre que possível' }
            ]}
          />
        </FormField>

        <FormField
          label="07 · Com que frequência chega no limite exato do horário?"
          subPeso="7%"
          hasError={!!errors.d3_limite}
          errorMessage={errors.d3_limite}
        >
          <FormChips
            selectedValue={data.d3_limite}
            onChange={(val) => onChange('d3_limite', val)}
            options={[
              { value: '0', label: 'Nunca' },
              { value: '1', label: 'Raramente' },
              { value: '2', label: 'Às vezes' },
              { value: '3', label: 'Frequentemente' },
              { value: '4', label: 'Todo dia' }
            ]}
          />
        </FormField>

        <FormField
          label="08 · Sai mais cedo do trabalho por causa do transporte?"
          subPeso="7%"
          hasError={!!errors.d3_saicedo}
          errorMessage={errors.d3_saicedo}
        >
          <FormChips
            selectedValue={data.d3_saicedo}
            onChange={(val) => onChange('d3_saicedo', val)}
            options={[
              { value: '0', label: 'Nunca' },
              { value: '1', label: 'Raramente' },
              { value: '2', label: 'Às vezes' },
              { value: '3', label: 'Frequentemente' },
              { value: '4', label: 'Todo dia' }
            ]}
          />
        </FormField>

        {/* INTENÇÃO DE DEMISSÃO - HIGHLIGHT BOX */}
        <div
          style={{
            background: 'rgba(204, 51, 51, 0.04)',
            border: '1px solid rgba(204, 51, 51, 0.2)',
            borderRadius: '10px',
            padding: '1.1rem',
            marginBottom: '1rem'
          }}
        >
          <FormField
            label="09 · Intenção de demissão por causa do trajeto"
            subPeso="16%"
            subPesoHigh={true}
            hasError={!!errors.d3_intencao}
            errorMessage={errors.d3_intencao}
          >
            <FormChips
              selectedValue={data.d3_intencao}
              onChange={(val) => onChange('d3_intencao', val)}
              options={[
                { value: '0', label: 'Nunca pensou' },
                { value: '1', label: 'Pensou 1–2 vezes' },
                { value: '3', label: 'Pensa com frequência' },
                { value: '4', label: 'Está pensando agora' }
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
            <span>D4 · Vulnerabilidade</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
