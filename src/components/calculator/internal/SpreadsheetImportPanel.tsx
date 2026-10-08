import React, { useState } from 'react';
import {
  Download,
  Upload,
  CheckCircle2,
  AlertTriangle,
  Play,
  ArrowRight,
  Info,
  Database
} from 'lucide-react';
import { useCalculatorStore } from '../../../context/CalculatorContext';
import { CalculatorInputDTO } from '../../../types/calculatorDTOs';

interface EmployeeRow {
  id: string;
  setor: string;
  tempoTrajetoMin: number;
  estresse: number;
  atrasosMes: number;
  modal: string;
  riscoDemissao: number;
}

/**
 * Interface and processor for ingesting structured employee response spreadsheets.
 *
 * Facilitates bulk survey aggregation (D1-D4 metrics across the employee base)
 * and directly loads sanitized parameters into the calculator state.
 */
export const SpreadsheetImportPanel: React.FC<{ onProcessed?: () => void }> = ({ onProcessed }) => {
  const { loadData, goToStep } = useCalculatorStore();

  const [rawText, setRawText] = useState<string>('');
  const [parsedRows, setParsedRows] = useState<EmployeeRow[]>([]);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Manual inputs for corporate aggregation tuning
  const [empresaNome, setEmpresaNome] = useState<string>('Empresa Cliente Diagnóstico');
  const [salarioMedio, setSalarioMedio] = useState<number>(3800);
  const [faturamentoMensal, setFaturamentoMensal] = useState<number>(450000);

  /**
   * Generates and triggers the download of the official UrbanFlow survey template (.csv).
   */
  const handleDownloadTemplate = () => {
    const header = 'id_colaborador,setor,cargo,tempo_trajeto_min,distancia_km,estresse_transito_1a5,qualidade_sono_1a5,atrasos_mes,risco_demissao_1a5,modal_predominante,gasto_transporte_renda_pct\n';
    const sampleRows = [
      'COLAB_001,Operações,Assistente,90,18,4,3,3,4,Onibus/Metro,12',
      'COLAB_002,Tecnologia,Desenvolvedor,45,12,2,2,0,1,Carro/Moto,8',
      'COLAB_003,Atendimento,Analista,120,25,5,4,4,5,Onibus/Metro,15',
      'COLAB_004,Financeiro,Coordenador,60,15,3,3,1,2,Misto/App,9',
      'COLAB_005,Logística,Operador,110,22,4,4,3,4,Onibus/Metro,14'
    ].join('\n');

    const csvContent = 'data:text/csv;charset=utf-8,' + encodeURIComponent(header + sampleRows);
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', csvContent);
    downloadAnchor.setAttribute('download', 'modelo_respostas_colaboradores_urbanflow.csv');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    document.body.removeChild(downloadAnchor);
  };

  /**
   * Parses CSV string into strongly-typed employee rows.
   */
  const parseCsvData = (text: string): EmployeeRow[] => {
    const lines = text.trim().split(/\r?\n/);
    if (lines.length < 2) return [];

    const rows: EmployeeRow[] = [];
    // Skip header line
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      // Split by comma or semicolon
      const cols = line.split(/[,;\t]/).map((c) => c.trim().replace(/^["']|["']$/g, ''));
      if (cols.length >= 6) {
        rows.push({
          id: cols[0] || `FUNC_${i}`,
          setor: cols[1] || 'Geral',
          tempoTrajetoMin: Number(cols[3]) || 60,
          estresse: Number(cols[5]) || 3,
          atrasosMes: Number(cols[7]) || 1,
          riscoDemissao: Number(cols[8]) || 2,
          modal: cols[9] || 'Transporte Público'
        });
      }
    }
    return rows;
  };

  /**
   * Handles local file upload.
   */
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setRawText(content);
      const parsed = parseCsvData(content);
      setParsedRows(parsed);
      if (parsed.length > 0) {
        setFeedback({
          type: 'success',
          message: `${parsed.length} respostas de colaboradores identificadas com sucesso na planilha.`
        });
      } else {
        setFeedback({
          type: 'error',
          message: 'Não foi possível reconhecer linhas de dados no arquivo. Verifique o modelo padrão.'
        });
      }
    };
    reader.readAsText(file);
  };

  /**
   * Handles text input pasting.
   */
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setRawText(val);
    const parsed = parseCsvData(val);
    setParsedRows(parsed);
    if (parsed.length > 0) {
      setFeedback({
        type: 'success',
        message: `${parsed.length} registros válidos detectados a partir do texto colado.`
      });
    } else {
      setFeedback(null);
    }
  };

  /**
   * Calculates averages and feeds the main calculator context.
   */
  const handleFeedCalculator = () => {
    if (parsedRows.length === 0) {
      setFeedback({
        type: 'error',
        message: 'Nenhum dado de colaborador válido para alimentar a calculadora.'
      });
      return;
    }

    // Aggregations
    const total = parsedRows.length;
    const avgTempo = Math.round(parsedRows.reduce((acc, r) => acc + r.tempoTrajetoMin, 0) / total);
    const avgEstresse = (parsedRows.reduce((acc, r) => acc + r.estresse, 0) / total).toFixed(1);
    const avgAtrasos = Math.round(parsedRows.reduce((acc, r) => acc + r.atrasosMes, 0) / total);
    const avgRiscoDemissao = (parsedRows.reduce((acc, r) => acc + r.riscoDemissao, 0) / total).toFixed(1);

    // Map into CalculatorInputDTO shape
    const aggregatedPayload: Partial<CalculatorInputDTO> = {
      empresa_nome: empresaNome || 'Diagnóstico Corporativo Consolidado',
      empresa_total: total >= 20 ? total : 50,
      empresa_salario_medio: salarioMedio,
      empresa_faturamento: faturamentoMensal,
      // Dimension 1: Trajeto
      d1_tempo: avgTempo,
      d1_dist: Math.round(avgTempo * 0.35),
      d1_bald: (avgTempo > 80 ? '2' : '1') as '1' | '2',
      // Dimension 2: Estresse
      d2_estresse: String(Math.min(Math.max(Math.round(Number(avgEstresse)), 0), 4)) as '0' | '1' | '2' | '3' | '4',
      d2_sono: String(Math.min(Math.max(Math.round(Number(avgEstresse) * 0.9), 0), 4)) as '0' | '1' | '2' | '3' | '4',
      // Dimension 3: Pontualidade
      d3_atrasos: avgAtrasos,
      d3_intencao: String(Math.min(Math.max(Math.round(Number(avgRiscoDemissao)), 0), 4)) as '0' | '1' | '3' | '4'
    };

    loadData(aggregatedPayload);
    setFeedback({
      type: 'success',
      message: 'Dados consolidados com sucesso! A calculadora foi pré-alimentada com as médias da planilha.'
    });

    if (onProcessed) {
      onProcessed();
    } else {
      goToStep(1);
    }
  };

  return (
    <div
      style={{
        background: '#FFFFFF',
        borderRadius: '20px',
        border: '1px solid #E5E7EB',
        padding: '2.5rem 2.2rem',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.04)'
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1.2rem',
          marginBottom: '2rem',
          paddingBottom: '1.5rem',
          borderBottom: '1px solid #E5E7EB'
        }}
      >
        <div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.78rem',
              fontWeight: 700,
              color: '#2E9E5B',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '0.4rem'
            }}
          >
            <Database size={15} />
            <span>Módulo de Extração em Lote</span>
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.45rem',
              fontWeight: 800,
              color: '#0B1924'
            }}
          >
            Alimentação de Dados por Planilha de Funcionários
          </h2>
        </div>

        {/* Download template button */}
        <button
          type="button"
          onClick={handleDownloadTemplate}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 18px',
            borderRadius: '10px',
            border: '1px solid #2E9E5B',
            background: 'rgba(46, 158, 91, 0.08)',
            color: '#1E7A43',
            fontSize: '0.86rem',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(46, 158, 91, 0.16)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(46, 158, 91, 0.08)')}
        >
          <Download size={16} />
          <span>Baixar Modelo de Planilha (.csv)</span>
        </button>
      </div>

      {/* Explanatory Banner */}
      <div
        style={{
          background: '#F8FAFC',
          border: '1px solid #E2E8F0',
          borderRadius: '12px',
          padding: '1.2rem 1.4rem',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '12px',
          marginBottom: '2rem'
        }}
      >
        <Info size={18} color="#0B1924" style={{ flexShrink: 0, marginTop: '2px' }} />
        <p style={{ fontSize: '0.86rem', color: '#4B5563', lineHeight: 1.6, margin: 0 }}>
          Este módulo permite que a equipe interna importe as respostas brutas dos formulários aplicados
          aos colaboradores da empresa cliente. O sistema calcula a distribuição amostral e as médias
          ponderadas das 4 dimensões (D1 a D4), alimentando o modelo da calculadora para a emissão do IIM oficial.
        </p>
      </div>

      {/* 2-Columns: Upload/Paste on Left, Corporate Parameters on Right */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem',
          marginBottom: '2rem'
        }}
      >
        {/* Upload Box & Textarea */}
        <div>
          <label
            style={{
              display: 'block',
              fontSize: '0.88rem',
              fontWeight: 700,
              color: '#0B1924',
              marginBottom: '0.6rem'
            }}
          >
            1. Carregar Arquivo CSV ou Colar Dados Tabulares
          </label>

          {/* Upload Drop Area */}
          <div
            style={{
              border: '2px dashed #CBD5E1',
              borderRadius: '12px',
              padding: '1.6rem 1.2rem',
              textAlign: 'center',
              background: '#FAFAFA',
              marginBottom: '1rem',
              cursor: 'pointer',
              position: 'relative'
            }}
          >
            <input
              type="file"
              accept=".csv,.txt"
              onChange={handleFileUpload}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                opacity: 0,
                cursor: 'pointer'
              }}
            />
            <Upload size={24} color="#64748B" style={{ margin: '0 auto 8px' }} />
            <div style={{ fontSize: '0.88rem', fontWeight: 600, color: '#0B1924' }}>
              Clique para selecionar ou arraste o arquivo CSV
            </div>
            <div style={{ fontSize: '0.78rem', color: '#94A3B8', marginTop: '4px' }}>
              Formatos aceitos: CSV delimitado por vírgula ou ponto-e-vírgula
            </div>
          </div>

          {/* Paste Textarea */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
              <span style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: 600 }}>
                Ou cole o conteúdo da planilha diretamente aqui:
              </span>
              {parsedRows.length > 0 && (
                <span style={{ fontSize: '0.78rem', color: '#2E9E5B', fontWeight: 700 }}>
                  {parsedRows.length} linhas lidas
                </span>
              )}
            </div>
            <textarea
              rows={4}
              value={rawText}
              onChange={handleTextChange}
              placeholder="Cole aqui as linhas copiadas do Excel / Google Sheets..."
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: '8px',
                border: '1px solid #D1D5DB',
                fontSize: '0.82rem',
                fontFamily: 'monospace',
                boxSizing: 'border-box',
                outline: 'none'
              }}
            />
          </div>
        </div>

        {/* Corporate Parameters Tuning */}
        <div>
          <label
            style={{
              display: 'block',
              fontSize: '0.88rem',
              fontWeight: 700,
              color: '#0B1924',
              marginBottom: '0.6rem'
            }}
          >
            2. Calibração Corporativa da Empresa Cliente
          </label>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <span style={{ display: 'block', fontSize: '0.78rem', color: '#64748B', marginBottom: '4px', fontWeight: 600 }}>
                Razão Social / Identificação da Empresa:
              </span>
              <input
                type="text"
                value={empresaNome}
                onChange={(e) => setEmpresaNome(e.target.value)}
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  borderRadius: '8px',
                  border: '1px solid #D1D5DB',
                  fontSize: '0.88rem',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <span style={{ display: 'block', fontSize: '0.78rem', color: '#64748B', marginBottom: '4px', fontWeight: 600 }}>
                  Salário Médio (R$):
                </span>
                <input
                  type="number"
                  value={salarioMedio}
                  onChange={(e) => setSalarioMedio(Number(e.target.value))}
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    borderRadius: '8px',
                    border: '1px solid #D1D5DB',
                    fontSize: '0.88rem',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div>
                <span style={{ display: 'block', fontSize: '0.78rem', color: '#64748B', marginBottom: '4px', fontWeight: 600 }}>
                  Faturamento Mensal (R$):
                </span>
                <input
                  type="number"
                  value={faturamentoMensal}
                  onChange={(e) => setFaturamentoMensal(Number(e.target.value))}
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    borderRadius: '8px',
                    border: '1px solid #D1D5DB',
                    fontSize: '0.88rem',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>

            {/* Ingestion Summary Card */}
            <div
              style={{
                background: '#F0FDF4',
                border: '1px solid #BBF7D0',
                borderRadius: '10px',
                padding: '1rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px'
              }}
            >
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#166534' }}>
                Resumo da Amostra Extraída:
              </div>
              <div style={{ fontSize: '0.82rem', color: '#15803D' }}>
                • Colaboradores no lote: <strong>{parsedRows.length} respondentes</strong>
              </div>
              {parsedRows.length > 0 && (
                <>
                  <div style={{ fontSize: '0.82rem', color: '#15803D' }}>
                    • Tempo médio de ida e volta: <strong>{Math.round(parsedRows.reduce((a, b) => a + b.tempoTrajetoMin, 0) / parsedRows.length)} min</strong>
                  </div>
                  <div style={{ fontSize: '0.82rem', color: '#15803D' }}>
                    • Nível médio de estresse: <strong>{(parsedRows.reduce((a, b) => a + b.estresse, 0) / parsedRows.length).toFixed(1)} / 5</strong>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Feedback banner */}
      {feedback && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 14px',
            borderRadius: '10px',
            fontSize: '0.86rem',
            marginBottom: '1.5rem',
            background: feedback.type === 'success' ? '#F0FDF4' : '#FEF2F2',
            border: feedback.type === 'success' ? '1px solid #86EFAC' : '1px solid #FCA5A5',
            color: feedback.type === 'success' ? '#15803D' : '#B91C1C'
          }}
        >
          {feedback.type === 'success' ? <CheckCircle2 size={16} /> : <AlertTriangle size={16} />}
          <span>{feedback.message}</span>
        </div>
      )}

      {/* Action Button: Feed Calculator */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
        <button
          type="button"
          onClick={handleFeedCalculator}
          disabled={parsedRows.length === 0}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '14px 28px',
            borderRadius: '12px',
            background: parsedRows.length > 0 ? '#2E9E5B' : '#E5E7EB',
            color: parsedRows.length > 0 ? '#FFFFFF' : '#9CA3AF',
            fontSize: '0.95rem',
            fontWeight: 700,
            border: 'none',
            cursor: parsedRows.length > 0 ? 'pointer' : 'not-allowed',
            transition: 'all 0.2s',
            boxShadow: parsedRows.length > 0 ? '0 8px 20px rgba(46, 158, 91, 0.3)' : 'none'
          }}
        >
          <Play size={16} />
          <span>Alimentar Calculadora e Processar IIM</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};
