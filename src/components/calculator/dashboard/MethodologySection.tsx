import React from 'react';
import { ArrowLeft, RotateCcw } from 'lucide-react';

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

      <div style={{ overflowX: 'auto' }}>
        <table className="info-table">
          <thead>
            <tr>
              <th>Pontuação</th>
              <th>Classificação</th>
              <th>Ação recomendada</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>0–40</td>
              <td>
                <span
                  style={{
                    background: '#EBF7F0',
                    color: '#0B2545',
                    borderRadius: '4px',
                    padding: '2px 8px',
                    fontSize: '0.8rem',
                    fontWeight: 600
                  }}
                >
                  🟢 Baixo impacto
                </span>
              </td>
              <td style={{ color: 'var(--text-muted)' }}>Monitoramento anual.</td>
            </tr>
            <tr>
              <td>41–60</td>
              <td>
                <span
                  style={{
                    background: '#fffaeb',
                    color: '#7a5c00',
                    borderRadius: '4px',
                    padding: '2px 8px',
                    fontSize: '0.8rem',
                    fontWeight: 600
                  }}
                >
                  🟡 Impacto moderado
                </span>
              </td>
              <td style={{ color: 'var(--text-muted)' }}>
                Revisar VT e flexibilidade de horário.
              </td>
            </tr>
            <tr>
              <td>61–80</td>
              <td>
                <span
                  style={{
                    background: '#fff3e8',
                    color: '#7a3e00',
                    borderRadius: '4px',
                    padding: '2px 8px',
                    fontSize: '0.8rem',
                    fontWeight: 600
                  }}
                >
                  🟠 Alto impacto
                </span>
              </td>
              <td style={{ color: 'var(--text-muted)' }}>
                Intervenção necessária. Mapeamento de alternativas de modal.
              </td>
            </tr>
            <tr>
              <td>81–100</td>
              <td>
                <span
                  style={{
                    background: '#fff0f0',
                    color: '#cc3333',
                    borderRadius: '4px',
                    padding: '2px 8px',
                    fontSize: '0.8rem',
                    fontWeight: 600
                  }}
                >
                  🔴 Impacto crítico
                </span>
              </td>
              <td style={{ color: 'var(--text-muted)' }}>
                Ação imediata. Cada mês adiciona custo acumulado.
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
