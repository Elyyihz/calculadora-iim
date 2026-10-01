export interface CalculatorFormData {
  // ETAPA 1 — EMPRESA
  empresa_nome: string;
  empresa_setor: string;
  empresa_regime: string;
  empresa_contrato: string;
  empresa_flex: string;
  empresa_turno: string;
  empresa_local: string;
  empresa_total: number | '';
  empresa_presencial_qtd: number | '';
  empresa_turnover: number | '';
  empresa_burnout: number | '';
  empresa_faturamento: number | '';
  empresa_salario_medio: number | '';
  empresa_beneficios: string;
  empresa_ciclista: string;

  // ETAPA 2 — PERFIL DO COLABORADOR
  func_cargo: string;
  func_presenca: string;
  func_salario: number | '';
  func_reposicao: string;

  // ETAPA 3 — D1 TRAJETO
  d1_tempo: number | '';
  d1_dist: number | '';
  d1_modal: string;
  d1_dias: string;
  d1_bald: string;
  d1_espera: number | '';
  d1_variacao: number;
  d1_custo: number | '';
  d1_vt: string;

  // ETAPA 4 — D2 ESTRESSE
  d2_cansaco: number;
  d2_estresse: string;
  d2_conc: number;
  d2_qual: number;
  d2_sono: string;
  d2_desconforto: string;
  d2_lazer: string;
  d2_ansiedade: string;
  d2_energia: string;

  // ETAPA 5 — D3 PONTUALIDADE
  d3_atrasos: number | '';
  d3_faltas: number | '';
  d3_recusa: string;
  d3_licencas: number | '';
  d3_contrib: string;
  d3_homeoff: string;
  d3_limite: string;
  d3_saicedo: string;
  d3_intencao: string;

  // ETAPA 6 — D4 VULNERABILIDADE
  d4_bairro: string;
  d4_ponto: number | '';
  d4_dep: string;
  d4_seg: number;
  d4_app: string;
  d4_risco: string;
  d4_violencia: string;
  d4_vuln: number;
  d4_tp_qual: string;
}

export type StepId = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface StepConfig {
  id: StepId;
  badge: string;
  title: string;
  subtitle: string;
  shortLabel: string;
}

export interface IimResult {
  d1: number;
  d2: number;
  d3: number;
  d4: number;
  iim: number;
  iimRounded: number;
  classification: string;
  classBg: string;
  classColor: string;
  contextText: string;
  empresaNome: string;
  salario: number;
  fatorReposicao: number;
  custoBruto: number;
  perdaProd: number;
  presenteismo: number;
  custoTurnover: number;
  custoMensal: number;
  dimCosts: {
    d1: number;
    d2: number;
    d3: number;
    d4: number;
  };
}
