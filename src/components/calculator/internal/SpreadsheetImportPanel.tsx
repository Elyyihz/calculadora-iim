import React, { useState, useMemo } from 'react';
import {
  Download,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Info,
  Database,
  Sparkles,
  FileText,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useCalculatorStore } from '../../../context/CalculatorContext';
import { CalculatorInputDTO } from '../../../types/calculatorDTOs';
import { SpreadsheetDropzone } from './SpreadsheetDropzone';
import { SpreadsheetColumnInspector } from './SpreadsheetColumnInspector';
import { IndividualDiagnosisTable } from './IndividualDiagnosisTable';
import { CompanySummaryDashboard } from './CompanySummaryDashboard';
import { ParsedSpreadsheetResult } from '../../../types/spreadsheet';
import { spreadsheetParserService } from '../../../services/SpreadsheetParserService';
import { IndividualIimCalculator } from '../../../services/IndividualIimCalculator';
import { CompanyDiagnosisSynthesizer } from '../../../services/CompanyDiagnosisSynthesizer';

interface EmployeeRow {
  id: string;
  setor: string;
  cargo: string;
  tempoTrajetoMin: number;
  distanciaKm: number;
  estresse: number;
  sono: number;
  atrasosMes: number;
  riscoDemissao: number;
  modal: string;
  gastoPct: number;
}

/**
 * Interface and processor for ingesting structured employee response spreadsheets.
 *
 * Facilitates bulk survey aggregation (D1-D4 metrics across the employee base)
 * and directly calculates the full IIM diagnosis or feeds the calculator state.
 */
export const SpreadsheetImportPanel: React.FC<{ onProcessed?: () => void }> = ({ onProcessed }) => {
  const { loadData, goToStep, calculateDiagnosisFromData } = useCalculatorStore();

  const [rawText, setRawText] = useState<string>('');
  const [parsedRows, setParsedRows] = useState<EmployeeRow[]>([]);
  const [parsedResult, setParsedResult] = useState<ParsedSpreadsheetResult | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [showPasteBox, setShowPasteBox] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Manual inputs for corporate aggregation tuning
  const [empresaNome, setEmpresaNome] = useState<string>('Empresa Cliente Diagnóstico');
  const [salarioMedio, setSalarioMedio] = useState<number>(3800);
  const [faturamentoMensal, setFaturamentoMensal] = useState<number>(450000);
  const [selectedRiskFilter, setSelectedRiskFilter] = useState<'all' | 'critico' | 'alto' | 'moderado' | 'baixo'>('all');

  /**
   * Generates and triggers the download of the official UrbanFlow survey template (.csv).
   */
  const handleDownloadTemplate = () => {
    const header = 'id_colaborador,setor,cargo,tempo_trajeto_min,distancia_km,estresse_transito_1a5,qualidade_sono_1a5,atrasos_mes,risco_demissao_1a5,modal_predominante,gasto_transporte_renda_pct\n';
    const sampleRows = [
      'COLAB_001,Operações,Assistente Operacional,95,22,4,3,3,4,Onibus/Metro,14',
      'COLAB_002,Tecnologia,Engenheiro de Software,40,11,2,2,0,1,Carro/Moto,7',
      'COLAB_003,Atendimento,Operador de Suporte,110,26,5,4,4,5,Onibus/Metro,16',
      'COLAB_004,Financeiro,Analista Contábil,55,14,3,3,1,2,Misto/App,9',
      'COLAB_005,Logística,Assistente de Estoque,105,24,4,4,3,4,Onibus/Metro,15'
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
   * Maps rows from a ParsedSpreadsheetResult into strongly-typed EmployeeRow objects.
   *
   * Dynamically searches keys matching expected column names or patterns,
   * providing graceful fallbacks if partial columns are provided.
   */
  const mapParsedResultToEmployees = (result: ParsedSpreadsheetResult): EmployeeRow[] => {
    return result.rows.map((row, idx) => {
      const getVal = (patterns: RegExp[], defaultVal: any) => {
        for (const [key, val] of Object.entries(row)) {
          if (patterns.some((p) => p.test(key))) {
            return val !== undefined && val !== null && val !== '' ? val : defaultVal;
          }
        }
        return defaultVal;
      };

      const id = String(getVal([/id/i, /colab/i, /matricula/i, /func/i], `COLAB_${String(idx + 1).padStart(3, '0')}`));
      const setor = String(getVal([/setor/i, /departamento/i, /area/i], 'Operações'));
      const cargo = String(getVal([/cargo/i, /funcao/i, /papel/i], 'Colaborador'));
      const tempo = Number(getVal([/tempo/i, /trajeto/i, /minutos/i, /duracao/i], 60)) || 60;
      const dist = Number(getVal([/distancia/i, /km/i, /quilometros/i], Math.round(tempo * 0.35))) || 15;
      const estresse = Math.min(Math.max(Number(getVal([/estresse/i, /stress/i], 3)) || 3, 1), 5);
      const sono = Math.min(Math.max(Number(getVal([/sono/i, /dormir/i], 3)) || 3, 1), 5);
      const atrasos = Math.max(Number(getVal([/atraso/i, /pontualidade/i], 1)) || 0, 0);
      const risco = Math.min(Math.max(Number(getVal([/risco/i, /demissao/i, /saida/i, /turnover/i], 2)) || 2, 1), 5);
      const modal = String(getVal([/modal/i, /transporte/i, /deslocamento/i], 'Onibus/Metro'));
      const gasto = Number(getVal([/gasto/i, /custo/i, /renda/i, /pct/i, /percentual/i], 12)) || 12;

      return {
        id,
        setor,
        cargo,
        tempoTrajetoMin: tempo,
        distanciaKm: dist,
        estresse,
        sono,
        atrasosMes: atrasos,
        riscoDemissao: risco,
        modal,
        gastoPct: gasto
      };
    });
  };

  /**
   * Handles successful parsing from the drag-and-drop zone (CSV or Excel).
   */
  const handleDropzoneParsed = (result: ParsedSpreadsheetResult, file: File) => {
    setParsedResult(result);
    setUploadedFile(file);

    const mapped = mapParsedResultToEmployees(result);
    setParsedRows(mapped);

    setFeedback({
      type: 'success',
      message: `${result.metadata.totalRows} respostas lidas com sucesso (${result.metadata.totalColumns} colunas identificadas) do arquivo "${file.name}".`
    });
  };

  /**
   * Clears the active spreadsheet and resets state.
   */
  const handleClearSpreadsheet = () => {
    setParsedResult(null);
    setUploadedFile(null);
    setParsedRows([]);
    setRawText('');
    setFeedback(null);
  };

  /**
   * Handles text input pasting with automatic CSV parsing and column extraction.
   */
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setRawText(val);

    if (!val || !val.trim()) {
      handleClearSpreadsheet();
      return;
    }

    try {
      const result = spreadsheetParserService.parseCsvString(val, 'dados_colados.csv', val.length);
      setParsedResult(result);
      const mapped = mapParsedResultToEmployees(result);
      setParsedRows(mapped);
      setFeedback({
        type: 'success',
        message: `${mapped.length} registros válidos e ${result.headers.length} colunas detectadas a partir do texto colado.`
      });
    } catch (err: any) {
      setFeedback({
        type: 'error',
        message: err?.message || 'Falha ao processar texto colado. Verifique os delimitadores.'
      });
    }
  };

  /**
   * Summary metrics computed from parsedRows.
   */
  const metrics = useMemo(() => {
    if (parsedRows.length === 0) return null;

    const total = parsedRows.length;
    const avgTempo = Math.round(parsedRows.reduce((acc, r) => acc + r.tempoTrajetoMin, 0) / total);
    const avgDist = Math.round(parsedRows.reduce((acc, r) => acc + r.distanciaKm, 0) / total);
    const avgEstresse = (parsedRows.reduce((acc, r) => acc + r.estresse, 0) / total);
    const avgSono = (parsedRows.reduce((acc, r) => acc + r.sono, 0) / total);
    const avgAtrasos = (parsedRows.reduce((acc, r) => acc + r.atrasosMes, 0) / total);
    const avgRiscoDemissao = (parsedRows.reduce((acc, r) => acc + r.riscoDemissao, 0) / total);
    const avgGastoPct = Math.round(parsedRows.reduce((acc, r) => acc + r.gastoPct, 0) / total);

    // Distribution by modal
    const publicTransitCount = parsedRows.filter((r) =>
      /onibus|metro|transporte\s*p[uú]blico/i.test(r.modal)
    ).length;
    const isPublicTransitMajority = publicTransitCount / total >= 0.5;

    // Quick estimate of IIM for preview
    const estD1 = Math.min(Math.round((avgTempo / 120) * 100), 100);
    const estD2 = Math.min(Math.round((avgEstresse / 5) * 100), 100);
    const estD3 = Math.min(Math.round(((avgAtrasos * 8 + avgRiscoDemissao * 10) / 70) * 100), 100);
    const estD4 = Math.min(Math.round((isPublicTransitMajority ? 72 : 38) + (avgGastoPct > 12 ? 15 : 5)), 100);
    const prelimIim = Math.round((estD1 * 0.30) + (estD2 * 0.27) + (estD3 * 0.25) + (estD4 * 0.18));

    return {
      total,
      avgTempo,
      avgDist,
      avgEstresse: avgEstresse.toFixed(1),
      avgSono: avgSono.toFixed(1),
      avgAtrasos: avgAtrasos.toFixed(1),
      avgRiscoDemissao: avgRiscoDemissao.toFixed(1),
      avgGastoPct,
      isPublicTransitMajority,
      prelimIim: Math.min(Math.max(prelimIim, 15), 95)
    };
  }, [parsedRows]);

  /**
   * Computes individual IIM scores and dimensional breakdowns for 100% of imported employees.
   */
  const individualDiagnoses = useMemo(
    () => IndividualIimCalculator.calculateAll(parsedRows, salarioMedio),
    [parsedRows, salarioMedio]
  );

  /**
   * Synthesizes the full corporate executive summary, company average IIM,
   * risk distribution tiers, and targeted global interventions.
   */
  const companySummary = useMemo(() => {
    if (individualDiagnoses.length === 0) return null;
    return CompanyDiagnosisSynthesizer.synthesize(
      individualDiagnoses,
      empresaNome.trim() || 'Empresa Cliente Diagnóstico',
      salarioMedio,
      faturamentoMensal
    );
  }, [individualDiagnoses, empresaNome, salarioMedio, faturamentoMensal]);

  /**
   * Prepares the full aggregated payload mapped into CalculatorInputDTO.
   */
  const buildAggregatedPayload = (): Partial<CalculatorInputDTO> => {
    if (!metrics || parsedRows.length === 0) return {};

    const toLikert0to4 = (val1to5: number): '0' | '1' | '2' | '3' | '4' => {
      const clamped = Math.min(Math.max(Math.round(val1to5 - 1), 0), 4);
      return String(clamped) as '0' | '1' | '2' | '3' | '4';
    };

    const numEstresse = Number(metrics.avgEstresse);
    const numSono = Number(metrics.avgSono);
    const numAtrasos = Math.round(Number(metrics.avgAtrasos));
    const numRisco = Number(metrics.avgRiscoDemissao);

    return {
      // Etapa 1: Empresa
      empresa_nome: empresaNome.trim() || 'Diagnóstico Corporativo Consolidado',
      empresa_setor: 'servicos',
      empresa_regime: 'hibrido',
      empresa_contrato: 'clt',
      empresa_flex: 'parcial',
      empresa_turno: 'diurno',
      empresa_local: 'intermediaria',
      empresa_total: metrics.total,
      empresa_presencial_qtd: metrics.total,
      empresa_turnover: Math.min(Math.max(Math.round((numRisco / 5) * 35), 8), 60),
      empresa_burnout: Math.max(Math.round(metrics.total * (numEstresse / 15)), 1),
      empresa_salario_medio: salarioMedio,
      empresa_faturamento: faturamentoMensal,
      empresa_beneficios: ['vt'],
      empresa_ciclista: 'nao',

      // Etapa 2: Colaborador
      func_cargo: 'operacional',
      func_presenca: 'obrigatorio',
      func_salario: salarioMedio,
      func_reposicao: '1.0',

      // Etapa 3: D1 Trajeto
      d1_tempo: metrics.avgTempo,
      d1_dist: metrics.avgDist || Math.round(metrics.avgTempo * 0.35),
      d1_modal: metrics.isPublicTransitMajority ? 'onibus' : 'carro',
      d1_dias: '5',
      d1_bald: (metrics.avgTempo >= 75 ? '2' : '1') as '1' | '2',
      d1_espera: Math.round(metrics.avgTempo * 0.22),
      d1_variacao: 60,
      d1_custo: Math.round(salarioMedio * (metrics.avgGastoPct / 100)),
      d1_vt: 'sim',

      // Etapa 4: D2 Estresse
      d2_cansaco: Math.min(Math.round((numEstresse / 5) * 85), 100),
      d2_estresse: toLikert0to4(numEstresse),
      d2_conc: Math.min(Math.round((numEstresse / 5) * 60), 100),
      d2_qual: Math.max(Math.round(100 - (numEstresse / 5) * 60), 15),
      d2_sono: toLikert0to4(numSono),
      d2_desconforto: toLikert0to4(numEstresse),
      d2_lazer: (numEstresse >= 3.5 ? '4' : numEstresse >= 2 ? '2' : '0') as '0' | '2' | '4',
      d2_ansiedade: toLikert0to4(numEstresse),
      d2_energia: toLikert0to4(numEstresse),

      // Etapa 5: D3 Pontualidade
      d3_atrasos: numAtrasos,
      d3_faltas: Math.max(0, Math.round(numAtrasos * 0.3)),
      d3_recusa: (numEstresse >= 3.5 ? '4' : numEstresse >= 2 ? '2' : '0') as '0' | '2' | '4',
      d3_licencas: Math.max(0, Math.round(numAtrasos * 0.15)),
      d3_contrib: (numEstresse >= 3.5 ? '4' : numEstresse >= 2.5 ? '3' : '1') as '0' | '1' | '3' | '4',
      d3_homeoff: '2',
      d3_limite: '2',
      d3_saicedo: '1',
      d3_intencao: (numRisco >= 3.5 ? '4' : numRisco >= 2.5 ? '3' : numRisco >= 1.5 ? '1' : '0') as '0' | '1' | '3' | '4',

      // Etapa 6: D4 Vulnerabilidade
      d4_bairro: 'Região Metropolitana',
      d4_ponto: Math.round(Math.min(Math.max(metrics.avgTempo * 0.12, 5), 25)),
      d4_dep: (metrics.isPublicTransitMajority ? '3' : '1') as '0' | '1' | '3' | '4',
      d4_seg: metrics.isPublicTransitMajority ? 35 : 65,
      d4_app: '1',
      d4_risco: metrics.isPublicTransitMajority ? ['1', '3'] : ['0'],
      d4_violencia: (metrics.isPublicTransitMajority ? '2' : '0') as '0' | '2' | '4',
      d4_vuln: metrics.isPublicTransitMajority ? 65 : 30,
      d4_tp_qual: (metrics.isPublicTransitMajority ? '3' : '1') as '0' | '1' | '3' | '4'
    };
  };

  /**
   * Action 1: Calculates the full diagnosis and immediately opens the result dashboard!
   */
  const handleCalculateAndShowResults = () => {
    if (parsedRows.length === 0) {
      setFeedback({
        type: 'error',
        message: 'Nenhum dado de colaborador válido para calcular o diagnóstico.'
      });
      return;
    }

    const payload = buildAggregatedPayload();
    calculateDiagnosisFromData(payload);

    setFeedback({
      type: 'success',
      message: 'Diagnóstico IIM calculado com sucesso! Abrindo o painel de resultados consolidado...'
    });

    if (onProcessed) {
      onProcessed();
    }
  };

  /**
   * Action 2: Feeds the wizard step-by-step so the user can inspect or edit individual fields.
   */
  const handleFeedStepByStepWizard = () => {
    if (parsedRows.length === 0) return;

    const payload = buildAggregatedPayload();
    loadData(payload);
    goToStep(1);

    if (onProcessed) {
      onProcessed();
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
            <span>Módulo de Extração em Lote & Ingestão</span>
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
          Este módulo importa e consolida as respostas dos formulários aplicados aos colaboradores da empresa.
          Ao clicar em <strong>"Calcular e Visualizar Diagnóstico IIM Completo"</strong>, o algoritmo processa todas as 4 dimensões
          e gera instantaneamente o painel de impacto com radar dimensional, custos financeiros e recomendações executivas.
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
        {/* Upload Box: Dropzone for CSV/Excel with optional collapsed paste */}
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
            1. Carregar Planilha de Respostas (CSV ou Excel)
          </label>

          <SpreadsheetDropzone
            onParsed={handleDropzoneParsed}
            onClear={handleClearSpreadsheet}
            currentResult={parsedResult}
            currentFile={uploadedFile}
          />

          {/* Collapsible Manual Paste Alternative */}
          <div style={{ marginTop: '1rem' }}>
            <button
              type="button"
              onClick={() => setShowPasteBox(!showPasteBox)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'none',
                border: 'none',
                color: '#4B5563',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer',
                padding: '4px 0'
              }}
            >
              {showPasteBox ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              <span>Ou colar dados tabulares copiados manualmente</span>
            </button>

            {showPasteBox && (
              <div style={{ marginTop: '0.5rem' }}>
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
            )}
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
            2. Calibração da Empresa Cliente
          </label>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <span style={{ display: 'block', fontSize: '0.78rem', color: '#64748B', marginBottom: '4px', fontWeight: 600 }}>
                Razão Social / Nome da Empresa:
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

            {/* Ingestion Summary Card with Live IIM Preview */}
            {metrics && (
              <div
                style={{
                  background: '#F0FDF4',
                  border: '1px solid #BBF7D0',
                  borderRadius: '12px',
                  padding: '1.2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#166534', textTransform: 'uppercase' }}>
                    Resumo Consolidado do Lote:
                  </div>
                  <div
                    style={{
                      background: metrics.prelimIim > 65 ? '#FEE2E2' : metrics.prelimIim > 38 ? '#FEF3C7' : '#DCFCE7',
                      color: metrics.prelimIim > 65 ? '#DC2626' : metrics.prelimIim > 38 ? '#D97706' : '#16A34A',
                      fontWeight: 800,
                      fontSize: '0.82rem',
                      padding: '3px 10px',
                      borderRadius: '999px'
                    }}
                  >
                    IIM Estimado: {metrics.prelimIim} pts
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '6px', fontSize: '0.82rem', color: '#15803D' }}>
                  <div>• Respondentes: <strong>{metrics.total} colaboradores</strong></div>
                  <div>• Tempo médio: <strong>{metrics.avgTempo} min / dia</strong></div>
                  <div>• Estresse médio: <strong>{metrics.avgEstresse} / 5</strong></div>
                  <div>• Atrasos médios: <strong>{metrics.avgAtrasos} / mês</strong></div>
                  <div>• Risco de Saída: <strong>{metrics.avgRiscoDemissao} / 5</strong></div>
                  <div>• Custo Transporte: <strong>{metrics.avgGastoPct}% da renda</strong></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* DETECTED SPREADSHEET COLUMN STRUCTURE & 36-QUESTION MAPPING READINESS */}
      {parsedResult && (
        <div style={{ marginBottom: '2rem' }}>
          <SpreadsheetColumnInspector result={parsedResult} />
        </div>
      )}

      {/* EXECUTIVE COMPANY DASHBOARD (RELATÓRIO DA EMPRESA) */}
      {companySummary && (
        <CompanySummaryDashboard
          summary={companySummary}
          selectedRiskFilter={selectedRiskFilter}
          onFilterByRiskGroup={(riskKey) => setSelectedRiskFilter(riskKey as any)}
        />
      )}

      {/* INDIVIDUAL EMPLOYEE IIM DIAGNOSIS (100% OF EMPLOYEES) */}
      {parsedRows.length > 0 && (
        <div style={{ marginBottom: '2.5rem' }}>
          <IndividualDiagnosisTable
            diagnoses={individualDiagnoses}
            companyName={empresaNome}
            selectedRiskFilter={selectedRiskFilter}
            onRiskFilterChange={setSelectedRiskFilter}
          />
        </div>
      )}

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

      {/* Action Buttons */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          paddingTop: '1rem',
          borderTop: '1px solid #E5E7EB'
        }}
      >
        <button
          type="button"
          onClick={handleFeedStepByStepWizard}
          disabled={parsedRows.length === 0}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 20px',
            borderRadius: '10px',
            background: '#FFFFFF',
            border: '1px solid #D1D5DB',
            color: parsedRows.length > 0 ? '#374151' : '#9CA3AF',
            fontSize: '0.88rem',
            fontWeight: 600,
            cursor: parsedRows.length > 0 ? 'pointer' : 'not-allowed',
            transition: 'all 0.15s ease'
          }}
        >
          <FileText size={16} />
          <span>Revisar Critérios no Formulário Passo a Passo</span>
        </button>

        {/* PRIMARY ACTION: Calculate and Show Results */}
        <button
          type="button"
          onClick={handleCalculateAndShowResults}
          disabled={parsedRows.length === 0}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            padding: '14px 28px',
            borderRadius: '12px',
            background: parsedRows.length > 0 ? '#2E9E5B' : '#E5E7EB',
            color: parsedRows.length > 0 ? '#FFFFFF' : '#9CA3AF',
            fontSize: '0.96rem',
            fontWeight: 800,
            border: 'none',
            cursor: parsedRows.length > 0 ? 'pointer' : 'not-allowed',
            transition: 'all 0.2s',
            boxShadow: parsedRows.length > 0 ? '0 8px 25px rgba(46, 158, 91, 0.35)' : 'none'
          }}
          onMouseEnter={(e) => {
            if (parsedRows.length > 0) {
              e.currentTarget.style.background = '#25834b';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }
          }}
          onMouseLeave={(e) => {
            if (parsedRows.length > 0) {
              e.currentTarget.style.background = '#2E9E5B';
              e.currentTarget.style.transform = 'translateY(0)';
            }
          }}
        >
          <Sparkles size={18} />
          <span>Calcular e Visualizar Diagnóstico IIM Completo</span>
          <ArrowRight size={18} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
};
