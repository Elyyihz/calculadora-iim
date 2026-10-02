import React from 'react';
import { CalculatorFormData } from '../../../types/calculator';
import { FormField } from '../common/FormField';
import { FormChips } from '../common/FormChips';
import { ArrowRight, Info } from 'lucide-react';

interface Step1EmpresaProps {
  data: CalculatorFormData;
  errors: Record<string, string>;
  onChange: <K extends keyof CalculatorFormData>(field: K, value: CalculatorFormData[K]) => void;
  onNext: () => void;
}

export const Step1Empresa: React.FC<Step1EmpresaProps> = ({
  data,
  errors,
  onChange,
  onNext
}) => {
  return (
    <div className="calc-section-card">
      <div className="calc-section-head">
        <div className="calc-dim-badge">
          🏢<span className="pct">Etapa 1</span>
        </div>
        <div className="calc-section-head-text">
          <h2>Dados da Empresa</h2>
          <p>Contexto organizacional — alimenta modificadores do IIM e cálculo de ROI</p>
        </div>
      </div>

      <div className="calc-section-body">
        {/* EXPLICATIVO DA ESCALA DO IIM */}
        <div
          style={{
            background: 'var(--accent-light)',
            border: '1px solid var(--accent-mid)',
            borderRadius: 'var(--radius-sm)',
            padding: '11px 16px',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '0.84rem',
            color: 'var(--brand)',
            lineHeight: 1.45
          }}
        >
          <Info size={18} color="var(--accent)" style={{ flexShrink: 0 }} />
          <span>
            <strong>Escala do IIM:</strong> Quanto maior a pontuação (aproximando-se de 100), pior é a mobilidade e maior é o impacto negativo financeiro e de bem-estar para a empresa e para o colaborador.
          </span>
        </div>

        <p className="calc-subsection-title">Identificação &amp; Operação</p>

        <FormField
          label="Nome da empresa"
          hasError={!!errors.empresa_nome}
          errorMessage={errors.empresa_nome}
        >
          <input
            type="text"
            placeholder="Ex: Empresa ABC Ltda"
            value={data.empresa_nome}
            onChange={(e) => onChange('empresa_nome', e.target.value)}
          />
        </FormField>

        <div className="calc-grid-2">
          <FormField
            label="Setor de atuação"
            tip="Ajusta benchmarks e pesos — logística e saúde têm presencialidade mais crítica que tech."
            hasError={!!errors.empresa_setor}
            errorMessage={errors.empresa_setor}
          >
            <select
              value={data.empresa_setor}
              onChange={(e) => onChange('empresa_setor', e.target.value)}
            >
              <option value="">Selecione...</option>
              <option value="tech">💻 Tecnologia</option>
              <option value="saude">🏥 Saúde</option>
              <option value="edu">🎓 Educação</option>
              <option value="varejo">🛒 Varejo</option>
              <option value="industria">🏭 Indústria</option>
              <option value="financeiro">🏦 Financeiro</option>
              <option value="logistica">🚚 Logística</option>
              <option value="servicos">🤝 Serviços</option>
              <option value="governo">🏛️ Governo</option>
              <option value="outro">➕ Outro</option>
            </select>
          </FormField>

          <FormField
            label="Regime de trabalho"
            hasError={!!errors.empresa_regime}
            errorMessage={errors.empresa_regime}
          >
            <FormChips
              selectedValue={data.empresa_regime}
              onChange={(val) => onChange('empresa_regime', val)}
              options={[
                { value: 'presencial', label: '🏢 100% Presencial' },
                { value: 'hibrido', label: '🔀 Híbrido' },
                { value: 'remoto', label: '🏠 Remoto' }
              ]}
            />
          </FormField>
        </div>

        <div className="calc-grid-2">
          <FormField
            label="Regime de contratação"
            hasError={!!errors.empresa_contrato}
            errorMessage={errors.empresa_contrato}
          >
            <FormChips
              selectedValue={data.empresa_contrato}
              onChange={(val) => onChange('empresa_contrato', val)}
              options={[
                { value: 'clt', label: '📋 CLT' },
                { value: 'pj', label: '💼 PJ' },
                { value: 'terceiro', label: '🤝 Terceirizado' },
                { value: 'estagio', label: '🎓 Estagiário' },
                { value: 'misto', label: '🔀 Misto' }
              ]}
            />
          </FormField>

          <FormField
            label="Flexibilidade de horário"
            tip="Horário rígido é modificador negativo — amplifica D1 e D2."
            hasError={!!errors.empresa_flex}
            errorMessage={errors.empresa_flex}
          >
            <FormChips
              selectedValue={data.empresa_flex}
              onChange={(val) => onChange('empresa_flex', val)}
              options={[
                { value: 'nao', label: '❌ Não, horário fixo' },
                { value: 'parcial', label: '⚖️ Parcial (±30 min)' },
                { value: 'sim', label: '✅ Sim, flexível' }
              ]}
            />
          </FormField>
        </div>

        <div className="calc-grid-2">
          <FormField
            label="Turno predominante"
            tip="Turno noturno reduz opções de transporte público — amplifica D4."
            hasError={!!errors.empresa_turno}
            errorMessage={errors.empresa_turno}
          >
            <FormChips
              selectedValue={data.empresa_turno}
              onChange={(val) => onChange('empresa_turno', val)}
              options={[
                { value: 'diurno', label: '☀️ Diurno' },
                { value: 'vespertino', label: '🌇 Vespertino' },
                { value: 'noturno', label: '🌙 Noturno' },
                { value: 'revezamento', label: '🔄 Revezamento' }
              ]}
            />
          </FormField>

          <FormField
            label="Localização da empresa"
            tip="Empresa periférica amplifica D4 — acesso mais difícil = maior vulnerabilidade."
            hasError={!!errors.empresa_local}
            errorMessage={errors.empresa_local}
          >
            <FormChips
              selectedValue={data.empresa_local}
              onChange={(val) => onChange('empresa_local', val)}
              options={[
                { value: 'centro', label: '🏙️ Centro / área nobre' },
                { value: 'intermediaria', label: '🏘️ Zona intermediária' },
                { value: 'periferia', label: '🌳 Periferia / industrial' },
                { value: 'fora', label: '🛣️ Fora da cidade' }
              ]}
            />
          </FormField>
        </div>

        <p className="calc-subsection-title">Quadro de Funcionários</p>
        <div className="calc-grid-2">
          <FormField
            label="Total de colaboradores"
            hasError={!!errors.empresa_total}
            errorMessage={errors.empresa_total}
          >
            <input
              type="number"
              placeholder="Ex: 250"
              min="1"
              value={data.empresa_total}
              onChange={(e) =>
                onChange('empresa_total', e.target.value === '' ? '' : parseFloat(e.target.value))
              }
            />
          </FormField>

          <FormField
            label="Em regime presencial"
            hasError={!!errors.empresa_presencial_qtd}
            errorMessage={errors.empresa_presencial_qtd}
          >
            <input
              type="number"
              placeholder="Ex: 180"
              min="1"
              value={data.empresa_presencial_qtd}
              onChange={(e) =>
                onChange('empresa_presencial_qtd', e.target.value === '' ? '' : parseFloat(e.target.value))
              }
            />
          </FormField>
        </div>

        <div className="calc-grid-2">
          <FormField
            label="Turnover anual (%)"
            tip="Dado real — calibra o custo de reposição no cálculo financeiro. Acima de 15% amplifica D3."
            hasError={!!errors.empresa_turnover}
            errorMessage={errors.empresa_turnover}
          >
            <input
              type="number"
              placeholder="Ex: 12"
              min="0"
              max="100"
              value={data.empresa_turnover}
              onChange={(e) =>
                onChange('empresa_turnover', e.target.value === '' ? '' : parseFloat(e.target.value))
              }
            />
          </FormField>

          <FormField
            label="Afastamentos por burnout (12m)"
            tip="Alta taxa de burnout amplifica D2 — correlação direta com trajetos de alto IIM."
            hasError={!!errors.empresa_burnout}
            errorMessage={errors.empresa_burnout}
          >
            <input
              type="number"
              placeholder="Ex: 8"
              min="0"
              value={data.empresa_burnout}
              onChange={(e) =>
                onChange('empresa_burnout', e.target.value === '' ? '' : parseFloat(e.target.value))
              }
            />
          </FormField>
        </div>

        <p className="calc-subsection-title">Financeiro</p>
        <div className="calc-grid-2">
          <FormField
            label="Faturamento anual (R$)"
            hasError={!!errors.empresa_faturamento}
            errorMessage={errors.empresa_faturamento}
          >
            <input
              type="number"
              placeholder="Ex: 5000000"
              min="0"
              value={data.empresa_faturamento}
              onChange={(e) =>
                onChange('empresa_faturamento', e.target.value === '' ? '' : parseFloat(e.target.value))
              }
            />
          </FormField>

          <FormField
            label="Salário médio mensal (R$)"
            tip="Base para o custo real. Fórmula: salário + 68% encargos + perdas de produtividade."
            hasError={!!errors.empresa_salario_medio}
            errorMessage={errors.empresa_salario_medio}
          >
            <input
              type="number"
              placeholder="Ex: 3500"
              min="0"
              value={data.empresa_salario_medio}
              onChange={(e) =>
                onChange('empresa_salario_medio', e.target.value === '' ? '' : parseFloat(e.target.value))
              }
            />
          </FormField>
        </div>

        <p className="calc-subsection-title">Benefícios de Mobilidade</p>
        <FormField
          label="Benefícios de transporte oferecidos"
          tip="Fator de mitigação — reduz modificadores negativos no IIM."
          hasError={!!errors.empresa_beneficios}
          errorMessage={errors.empresa_beneficios}
        >
          <FormChips
            selectedValue={data.empresa_beneficios}
            onChange={(val) => onChange('empresa_beneficios', val)}
            options={[
              { value: 'nenhum', label: '❌ Nenhum' },
              { value: 'vt', label: '🎫 VT mínimo legal' },
              { value: 'vt_extra', label: '💳 VT extra / app' },
              { value: 'fretado', label: '🚌 Fretado' },
              { value: 'estacionamento', label: '🅿️ Estacionamento' },
              { value: 'auxilio', label: '💰 Auxílio livre' }
            ]}
          />
        </FormField>

        <FormField
          label="Infraestrutura para ciclistas"
          hasError={!!errors.empresa_ciclista}
          errorMessage={errors.empresa_ciclista}
        >
          <FormChips
            selectedValue={data.empresa_ciclista}
            onChange={(val) => onChange('empresa_ciclista', val)}
            options={[
              { value: 'sim', label: '✅ Sim' },
              { value: 'nao', label: '❌ Não' }
            ]}
          />
        </FormField>

        <div className="calc-nav-row">
          <div />
          <button type="button" className="btn btn-primary" onClick={onNext}>
            <span>Perfil do Colaborador</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
