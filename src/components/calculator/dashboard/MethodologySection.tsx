import React from 'react';
import { ArrowLeft, RotateCcw, Info } from 'lucide-react';

interface MethodologySectionProps {
  onEdit: () => void;
  onReset: () => void;
}

export const MethodologySection: React.FC<MethodologySectionProps> = ({
  onEdit,
  onReset
}) => {
  return (
    <div className="res-section">
      <p className="calc-subsection-title" style={{ marginTop: 0 }}>
        Metodologia IIM v3.0
      </p>

      <div className="formula-box">
        IIM = [(D1×0,30) + (D2×0,27) + (D3×0,25) + (D4×0,18)] × Mult. de Dias × Fator Setorial +
        Modificador Organizacional
      </div>

      {/* REGRA DA ESCALA DO IIM */}
      <div
        style={{
          background: 'var(--accent-light)',
          border: '1px solid var(--accent-mid)',
          borderRadius: 'var(--radius-sm)',
          padding: '11px 16px',
          marginBottom: '1.25rem',
          fontSize: '0.84rem',
          color: 'var(--brand)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          lineHeight: 1.45
        }}
      >
        <Info size={18} color="var(--accent)" style={{ flexShrink: 0 }} />
        <span>
          <strong>Regra da Escala:</strong> Quanto maior a pontuação (aproximando-se de 100), pior é a mobilidade e maior é o impacto negativo financeiro e de bem-estar para a empresa e para o colaborador.
        </span>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="info-table">
          <thead>
            <tr>
              <th>Faixa IIM</th>
              <th>Classificação</th>
              <th>Impacto na Empresa &amp; Colaborador</th>
              <th>Ação Recomendada</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ fontWeight: 700 }}>0–40</td>
              <td>
                <span
                  style={{
                    background: '#EBF7F0',
                    color: '#0B2545',
                    borderRadius: '4px',
                    padding: '3px 8px',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    whiteSpace: 'nowrap'
                  }}
                >
                  🟢 Baixo impacto (Eficiente)
                </span>
              </td>
              <td style={{ color: 'var(--text-muted)' }}>
                Mobilidade fluida; impacto negativo mínimo nos custos operacionais e no bem-estar.
              </td>
              <td style={{ color: 'var(--text-muted)' }}>Monitoramento periódico anual.</td>
            </tr>
            <tr>
              <td style={{ fontWeight: 700 }}>41–60</td>
              <td>
                <span
                  style={{
                    background: '#fffaeb',
                    color: '#7a5c00',
                    borderRadius: '4px',
                    padding: '3px 8px',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    whiteSpace: 'nowrap'
                  }}
                >
                  🟡 Impacto moderado (Atenção)
                </span>
              </td>
              <td style={{ color: 'var(--text-muted)' }}>
                Atrito intermediário; início de perda produtiva e desgaste perceptível no trajeto.
              </td>
              <td style={{ color: 'var(--text-muted)' }}>
                Revisar horários flexíveis e benefícios de transporte corporativo.
              </td>
            </tr>
            <tr>
              <td style={{ fontWeight: 700 }}>61–80</td>
              <td>
                <span
                  style={{
                    background: '#fff3e8',
                    color: '#7a3e00',
                    borderRadius: '4px',
                    padding: '3px 8px',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    whiteSpace: 'nowrap'
                  }}
                >
                  🟠 Alto impacto (Prejudicial)
                </span>
              </td>
              <td style={{ color: 'var(--text-muted)' }}>
                Mobilidade deficiente; forte perda de produtividade, estresse e risco de turnover.
              </td>
              <td style={{ color: 'var(--text-muted)' }}>
                Intervenção tática em 30–60 dias (trabalho híbrido, vans/fretados, rotas).
              </td>
            </tr>
            <tr>
              <td style={{ fontWeight: 700 }}>81–100</td>
              <td>
                <span
                  style={{
                    background: '#fff0f0',
                    color: '#cc3333',
                    borderRadius: '4px',
                    padding: '3px 8px',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    whiteSpace: 'nowrap'
                  }}
                >
                  🔴 Impacto crítico (Alto Risco)
                </span>
              </td>
              <td style={{ color: 'var(--text-muted)' }}>
                Condições severas de deslocamento; custo agudo, exaustão e risco iminente de burnout/desligamento.
              </td>
              <td style={{ color: 'var(--text-muted)' }}>
                Ação emergencial imediata com consultoria especializada UrbanFlow.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="met-box" style={{ marginTop: '1.5rem' }}>
        <div className="met-title">Base metodológica</div>
        <p className="met-text">
          As dimensões D1 e D3 são calibradas por dados objetivos (tempo, atrasos, faltas). D2 é
          amplificada em até 20% pelo índice real de burnout da empresa informado na Etapa 1; D3 é
          amplificada em até 50% do excedente de turnover acima de 20%. D4 incorpora o percentual do
          salário comprometido com transporte como indicador de vulnerabilidade financeira. O
          Multiplicador de Dias (presença semanal) e o Fator Setorial são{' '}
          <strong>premissas do modelo dos autores</strong>, não coeficientes extraídos de fonte externa
          — refletem o pressuposto de que a exposição ao deslocamento é proporcional à frequência
          presencial e de que setores como logística e saúde têm presencialidade mais crítica que
          tecnologia. O Modificador Organizacional soma até 9,3 pontos ao IIM quando presentes,
          cumulativamente: turno noturno, ausência de flexibilidade de horário, localização
          periférica/fora da cidade e ausência de benefícios de mobilidade. O coeficiente de
          produtividade de 0,25 baseia-se em meta-análise de estudos de bem-estar corporativo. Custo
          de presenteísmo estimado em até 12% do custo bruto mensal, alinhado a benchmarks da OMS.
        </p>
      </div>

      <div className="calc-nav-row no-print">
        <button type="button" className="btn btn-ghost" onClick={onEdit}>
          <ArrowLeft size={16} />
          <span>Rever Respostas</span>
        </button>

        <button type="button" className="btn btn-danger" onClick={onReset}>
          <RotateCcw size={16} />
          <span>↺ Novo diagnóstico</span>
        </button>
      </div>
    </div>
  );
};
