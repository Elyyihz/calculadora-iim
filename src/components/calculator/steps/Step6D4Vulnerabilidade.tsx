import React from 'react';
import { CalculatorFormData } from '../../../types/calculator';
import { D4RiscoTipo } from '../../../types/calculatorDTOs';
import { FormField } from '../common/FormField';
import { FormChips, FormChipsMulti } from '../common/FormChips';
import { FormScale } from '../common/FormScale';
import {
  ArrowLeft,
  BarChart2,
  Check,
  Sliders,
  X,
  XCircle,
  ShieldCheck,
  Construction,
  CloudRain,
  AlertTriangle
} from 'lucide-react';

interface Step6D4VulnerabilidadeProps {
  data: CalculatorFormData;
  errors: Record<string, string>;
  onChange: <K extends keyof CalculatorFormData>(field: K, value: CalculatorFormData[K]) => void;
  onPrev: () => void;
  onSubmit: () => void;
}

export const Step6D4Vulnerabilidade: React.FC<Step6D4VulnerabilidadeProps> = ({
  data,
  errors,
  onChange,
  onPrev,
  onSubmit
}) => {
  return (
    <div className="calc-section-card">
      <div className="calc-section-head">
        <div className="calc-dim-badge">
          D4<span className="pct">18%</span>
        </div>
        <div className="calc-section-head-text">
          <h2>Vulnerabilidade Modal e Socioespacial</h2>
          <p>Estrutura de risco do deslocamento — amplificador de todas as dimensões</p>
        </div>
      </div>

      <div className="calc-section-body">
        <div className="calc-grid-2">
          <FormField
            label="01 · Bairro de residência"
            tip="Campo de referência interna do consultor — não entra no cálculo e não é exposto para evitar reidentificação."
            hasError={!!errors.d4_bairro}
            errorMessage={errors.d4_bairro}
          >
            <input
              type="text"
              placeholder="Ex: Boa Viagem, Centro, Ibura"
              value={data.d4_bairro}
              onChange={(e) => onChange('d4_bairro', e.target.value)}
            />
          </FormField>

          <FormField
            label="02 · Distância até o ponto de ônibus/metrô (min a pé)"
            hasError={!!errors.d4_ponto}
            errorMessage={errors.d4_ponto}
          >
            <input
              type="number"
              placeholder="Ex: 12"
              min="0"
              value={data.d4_ponto}
              onChange={(e) =>
                onChange('d4_ponto', e.target.value === '' ? '' : parseFloat(e.target.value))
              }
            />
          </FormField>
        </div>

        <FormField
          label="03 · Dependência do transporte público"
          hasError={!!errors.d4_dep}
          errorMessage={errors.d4_dep}
        >
          <FormChips
            selectedValue={data.d4_dep}
            onChange={(val) => onChange('d4_dep', val)}
            options={[
              { value: '0', label: 'Nenhuma (carro próprio)' },
              { value: '1', label: 'Baixa (tem alternativas)' },
              { value: '3', label: 'Alta (quase sempre TP)' },
              { value: '4', label: 'Total (só TP)' }
            ]}
          />
        </FormField>

        <FormField
          label="04 · Percepção de segurança pública no trajeto"
          tip="Percepção de risco afeta rotas, horários e o estresse do deslocamento."
        >
          <FormScale
            value={data.d4_seg}
            onChange={(val) => onChange('d4_seg', val)}
            labels={['Muito inseguro', 'Inseguro', 'Neutro', 'Seguro', 'Muito seguro']}
            minLabel="Muito inseguro"
            maxLabel="Muito seguro"
          />
        </FormField>

        <FormField
          label="05 · Tem acesso a app de transporte (Uber/99) como alternativa?"
          tip="Alternativa modal reduz vulnerabilidade, mas pode gerar custo adicional."
          hasError={!!errors.d4_app}
          errorMessage={errors.d4_app}
        >
          <FormChips
            selectedValue={data.d4_app}
            onChange={(val) => onChange('d4_app', val)}
            options={[
              { value: '0', label: 'Sim, uso regularmente', icon: <Check size={14} /> },
              { value: '1', label: 'Às vezes', icon: <Sliders size={14} /> },
              { value: '3', label: 'Não uso (custo)', icon: <X size={14} /> },
              { value: '4', label: 'Não tenho acesso', icon: <XCircle size={14} /> }
            ]}
          />
        </FormField>

        <FormField
          label="06 · O trajeto passa por áreas com risco percebido? (seleção múltipla)"
          tip="Risco acumulado no trajeto — obras, alagamentos e violência amplificam a vulnerabilidade. Pode selecionar mais de uma opção."
          hasError={!!errors.d4_risco}
          errorMessage={errors.d4_risco}
        >
          <div style={{ marginBottom: '8px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Selecione todos os riscos enfrentados na rota (ou selecione <strong>Nenhum risco</strong>):
          </div>
          <FormChipsMulti<D4RiscoTipo>
            selectedValues={data.d4_risco || []}
            onChange={(vals) => onChange('d4_risco', vals)}
            exclusiveValue="0"
            options={[
              { value: '0', label: 'Nenhum risco', icon: <ShieldCheck size={14} /> },
              { value: '1', label: 'Obras / desvios', icon: <Construction size={14} /> },
              { value: '3', label: 'Enchentes / alagamentos', icon: <CloudRain size={14} /> },
              { value: '4', label: 'Violência / insegurança', icon: <AlertTriangle size={14} /> }
            ]}
          />
        </FormField>

        <FormField
          label="07 · Já foi vítima de violência ou assalto durante o deslocamento?"
          tip="Experiência direta de violência gera trauma — impacto severo em D2 e D4."
          hasError={!!errors.d4_violencia}
          errorMessage={errors.d4_violencia}
        >
          <FormChips
            selectedValue={data.d4_violencia}
            onChange={(val) => onChange('d4_violencia', val)}
            options={[
              { value: '0', label: 'Não' },
              { value: '2', label: 'Sim, 1 vez' },
              { value: '4', label: 'Sim, mais de 1 vez' }
            ]}
          />
        </FormField>

        <FormField
          label="08 · Índice de vulnerabilidade do bairro de residência"
          tip="1 = bairro nobre, infraestrutura consolidada. 5 = periferia com transporte escasso."
        >
          <FormScale
            value={data.d4_vuln}
            onChange={(val) => onChange('d4_vuln', val)}
            labels={['Baixa vulnerab.', 'Média-baixa', 'Média', 'Média-alta', 'Alta vulnerab.']}
            minLabel="Baixa vulnerabilidade"
            maxLabel="Alta vulnerabilidade"
          />
        </FormField>

        <FormField
          label="09 · Qualidade do transporte público na rota"
          hasError={!!errors.d4_tp_qual}
          errorMessage={errors.d4_tp_qual}
        >
          <FormChips
            selectedValue={data.d4_tp_qual}
            onChange={(val) => onChange('d4_tp_qual', val)}
            options={[
              { value: '0', label: 'Ótimo (pontual, seguro)' },
              { value: '1', label: 'Regular (atrasos ocasionais)' },
              { value: '3', label: 'Ruim (atrasos frequentes)' },
              { value: '4', label: 'Péssimo (superlotado)' }
            ]}
          />
        </FormField>

        <div className="calc-nav-row">
          <button type="button" className="btn btn-ghost" onClick={onPrev}>
            <ArrowLeft size={16} />
            <span>Voltar</span>
          </button>
          <button type="button" className="btn btn-primary" onClick={onSubmit}>
            <BarChart2 size={16} />
            <span>Gerar Diagnóstico Completo</span>
          </button>
        </div>
      </div>
    </div>
  );
};
