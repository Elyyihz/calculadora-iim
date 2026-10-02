/**
 * Data Transfer Objects (DTOs) for the IIM Calculator
 * Strictly typed inputs for every step of the wizard
 */

export type BeneficioTipo = 'nenhum' | 'vt' | 'vt_extra' | 'fretado' | 'estacionamento' | 'auxilio';

export interface EmpresaDTO {
  empresa_nome: string;
  empresa_setor: string;
  empresa_regime: 'presencial' | 'hibrido' | 'remoto' | '';
  empresa_contrato: 'clt' | 'pj' | 'terceiro' | 'estagio' | 'misto' | '';
  empresa_flex: 'nao' | 'parcial' | 'sim' | '';
  empresa_turno: 'diurno' | 'vespertino' | 'noturno' | 'revezamento' | '';
  empresa_local: 'centro' | 'intermediaria' | 'periferia' | 'fora' | '';
  empresa_total: number | '';
  empresa_presencial_qtd: number | '';
  empresa_turnover: number | '';
  empresa_burnout: number | '';
  empresa_faturamento: number | '';
  empresa_salario_medio: number | '';
  empresa_beneficios: BeneficioTipo[];
  empresa_ciclista: 'sim' | 'nao' | '';
}

export interface ColaboradorDTO {
  func_cargo: 'operacional' | 'tecnico' | 'administrativo' | 'analitico' | 'lideranca' | 'diretoria' | '';
  func_presenca: 'obrigatorio' | 'parcial' | 'nao' | '';
  func_salario: number | '';
  func_reposicao: '0.5' | '1.0' | '1.5' | '2.0' | '';
}

export interface D1TrajetoDTO {
  d1_tempo: number | '';
  d1_dist: number | '';
  d1_modal: 'onibus' | 'metro' | 'carro' | 'moto' | 'bici' | 'pe' | 'app' | 'misto' | '';
  d1_dias: '1' | '2' | '3' | '4' | '5' | '';
  d1_bald: '0' | '1' | '2' | '3' | '';
  d1_espera: number | '';
  d1_variacao: number;
  d1_custo: number | '';
  d1_vt: 'sim' | 'parcial' | 'nao' | '';
}

export interface D2EstresseDTO {
  d2_cansaco: number;
  d2_estresse: '0' | '1' | '2' | '3' | '4' | '';
  d2_conc: number;
  d2_qual: number;
  d2_sono: '0' | '1' | '2' | '3' | '4' | '';
  d2_desconforto: '0' | '1' | '2' | '3' | '4' | '';
  d2_lazer: '0' | '2' | '4' | '';
  d2_ansiedade: '0' | '1' | '2' | '3' | '4' | '';
  d2_energia: '0' | '1' | '2' | '3' | '4' | '';
}

export interface D3PontualidadeDTO {
  d3_atrasos: number | '';
  d3_faltas: number | '';
  d3_recusa: '0' | '2' | '4' | '';
  d3_licencas: number | '';
  d3_contrib: '0' | '1' | '3' | '4' | '';
  d3_homeoff: '0' | '1' | '2' | '3' | '4' | '';
  d3_limite: '0' | '1' | '2' | '3' | '4' | '';
  d3_saicedo: '0' | '1' | '2' | '3' | '4' | '';
  d3_intencao: '0' | '1' | '3' | '4' | '';
}

export interface D4VulnerabilidadeDTO {
  d4_bairro: string;
  d4_ponto: number | '';
  d4_dep: '0' | '1' | '3' | '4' | '';
  d4_seg: number;
  d4_app: '0' | '1' | '3' | '4' | '';
  d4_risco: '0' | '1' | '3' | '4' | '';
  d4_violencia: '0' | '2' | '4' | '';
  d4_vuln: number;
  d4_tp_qual: '0' | '1' | '3' | '4' | '';
}

/** Complete input state aggregating all steps */
export type CalculatorInputDTO = EmpresaDTO &
  ColaboradorDTO &
  D1TrajetoDTO &
  D2EstresseDTO &
  D3PontualidadeDTO &
  D4VulnerabilidadeDTO;

export interface DimensionalScores {
  d1Raw: number;
  d1Norm: number;
  d2Raw: number;
  d2Norm: number;
  d3Raw: number;
  d3Norm: number;
  d4Raw: number;
  d4Norm: number;
  daysMultiplier: number;
  sectorMultiplier: number;
  organizationalModifier: number;
}

export interface FinancialMetrics {
  salarioEfetivo: number;
  custoBrutoMensal: number;
  perdaProdutividadeMensal: number;
  presenteismoMensal: number;
  custoTurnoverReposicao: number;
  probabilidadeTurnover: number;
  custoImpactoTotalMensal: number;
  custoPorDimensao: {
    d1: number;
    d2: number;
    d3: number;
    d4: number;
  };
}

export interface ProjectionMilestone {
  meses: number;
  label: string;
  custoAcumulado: number;
  observacao: string;
  isAnual: boolean;
}

export interface SimulatedSavings {
  iimAtual: number;
  iimAlvo: number;
  pontosReduzidos: number;
  percentualReducao: number;
  economiaMensal: number;
  economiaAnual: number;
}

export interface PrioritizedIntervention {
  id: string;
  label: string;
  esforco: 'Baixo' | 'Médio' | 'Alto';
  esforcoCls: string;
  desc: string;
  reducaoIIM: number;
  economiaMensal: number;
  roiScore: number;
}

export interface DiagnosisRecommendations {
  titulo: string;
  itens: string[];
  dimensoesCriticas: string;
}

export interface CompanyScaleProjection {
  totalPresencial: number;
  impactoEmpresaMensal: number;
  impactoEmpresaAnual: number;
  faturamentoAnual: number;
  percentualFaturamento: string;
}

export interface FullIimDiagnosis {
  iim: number;
  iimRounded: number;
  classificacao: string;
  classBg: string;
  classColor: string;
  contexto: string;
  empresaNome: string;
  dimensoes: DimensionalScores;
  financeiro: FinancialMetrics;
  projecao12Meses: {
    marcos: ProjectionMilestone[];
    notaInercial: string;
  };
  simuladorPadrao: SimulatedSavings;
  intervencoesPrioritarias: PrioritizedIntervention[];
  recomendacoes: DiagnosisRecommendations;
  projecaoEmpresa: CompanyScaleProjection;
}
