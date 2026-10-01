import React from 'react';
import { CalculatorFormData } from '../../../types/calculator';
import { FormField } from '../common/FormField';
import { FormChips } from '../common/FormChips';
import { ArrowLeft, ArrowRight, AlertTriangle } from 'lucide-react';

interface Step2ColaboradorProps {
  data: CalculatorFormData;
  errors: Record<string, string>;
  onChange: <K extends keyof CalculatorFormData>(field: K, value: CalculatorFormData[K]) => void;
  onPrev: () => void;
  onNext: () => void;
}

export const Step2Colaborador: React.FC<Step2ColaboradorProps> = ({
  data,
  errors,
  onChange,
  onPrev,
  onNext
}) => {
  const showSalaryFallbackNote =
    data.func_salario === '' && data.empresa_salario_medio === '';

  return (
    <div className="calc-section-card">
      <div className="calc-section-head">
        <div className="calc-dim-badge">
          👤<span className="pct">Etapa 2</span>
        </div>
        <div className="calc-section-head-text">
          <h2>Perfil do Colaborador</h2>
          <p>Dados de cargo, função e reposição — personalizam os pesos financeiros</p>
        </div>
      </div>

      <div className="calc-section-body">
        <FormField
          label="Cargo / Função"
          tip="Cargos operacionais têm menos flexibilidade — amplifica D1. Analíticos podem ser remotos."
          hasError={!!errors.func_cargo}
          errorMessage={errors.func_cargo}
        >
          <FormChips
            selectedValue={data.func_cargo}
            onChange={(val) => onChange('func_cargo', val)}
            options={[
              { value: 'operacional', label: '🔧 Operacional' },
              { value: 'tecnico', label: '⚙️ Técnico' },
              { value: 'administrativo', label: '📋 Administrativo' },
              { value: 'analitico', label: '📊 Analítico / Especialista' },
              { value: 'lideranca', label: '👔 Liderança / Gestão' },
              { value: 'diretoria', label: '🏆 Diretoria / C-Level' }
            ]}
          />
        </FormField>

        <FormField
          label="O cargo exige presença física obrigatória?"
          hasError={!!errors.func_presenca}
          errorMessage={errors.func_presenca}
        >
          <FormChips
            selectedValue={data.func_presenca}
            onChange={(val) => onChange('func_presenca', val)}
            options={[
              { value: 'obrigatorio', label: '✅ Sim, 100% obrigatório' },
              { value: 'parcial', label: '⚖️ Parcial' },
              { value: 'nao', label: '🏠 Não, pode ser remoto' }
            ]}
          />
        </FormField>

        <div className="calc-grid-2">
          <FormField
            label="Salário mensal do colaborador (R$)"
            tip="Usado no cálculo individual. Se vazio, usa o salário médio da empresa ou R$3.500 como valor de referência."
            hasError={!!errors.func_salario}
            errorMessage={errors.func_salario}
          >
            <input
              type="number"
              placeholder="Ex: 4200"
              min="0"
              value={data.func_salario}
              onChange={(e) =>
                onChange('func_salario', e.target.value === '' ? '' : parseFloat(e.target.value))
              }
            />

            {showSalaryFallbackNote && (
              <div
                className="calc-warn-msg"
                style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '6px' }}
              >
                <AlertTriangle size={13} />
                <span>
                  Sem este dado, o cálculo financeiro usará a referência (R$3.500)
                </span>
              </div>
            )}
          </FormField>

          <FormField
            label="Fator de reposição do cargo"
            tip="Custo de substituição = salário anual × fator × 1,4 (headhunter + ramp-up). Operacional: 0,5×. C-Level: 2,0×."
            hasError={!!errors.func_reposicao}
            errorMessage={errors.func_reposicao}
          >
            <FormChips
              selectedValue={data.func_reposicao}
              onChange={(val) => onChange('func_reposicao', val)}
              options={[
                { value: '0.5', label: '0,5× (operacional)' },
                { value: '1.0', label: '1,0× (técnico/admin)' },
                { value: '1.5', label: '1,5× (analítico)' },
                { value: '2.0', label: '2,0× (gestão/C-Level)' }
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
            <span>D1 · Trajeto</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
