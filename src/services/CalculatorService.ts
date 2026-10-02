import {
  CalculatorInputDTO,
  DimensionalScores,
  FinancialMetrics,
  ProjectionMilestone,
  SimulatedSavings,
  PrioritizedIntervention,
  DiagnosisRecommendations,
  CompanyScaleProjection,
  FullIimDiagnosis
} from '../types/calculatorDTOs';

/**
 * PESOS OFICIAIS DAS DIMENSÕES DO IIM v3.0
 *
 * Configuração central e isolada dos coeficientes ponderadores de cada dimensão.
 * Pode ser ajustada diretamente aqui sem necessidade de alterar as funções matemáticas:
 * - D1: Trajeto (Tempo, distância e comutação) — 30% (0.30)
 * - D2: Estresse (Desgaste físico, mental e qualidade de sono) — 27% (0.27)
 * - D3: Pontualidade (Atrasos, faltas e risco de turnover) — 25% (0.25)
 * - D4: Vulnerabilidade (Custo relativo de transporte e segurança) — 18% (0.18)
 *
 * Nota: A soma dos pesos deve totalizar 1.00 (100%).
 */
export const IIM_WEIGHTS = {
  D1: 0.30,
  D2: 0.27,
  D3: 0.25,
  D4: 0.18
} as const;

export type IimWeights = typeof IIM_WEIGHTS;

export const INITIAL_CALCULATOR_DATA: CalculatorInputDTO = {
  // Etapa 1
  empresa_nome: '',
  empresa_setor: '',
  empresa_regime: '',
  empresa_contrato: '',
  empresa_flex: '',
  empresa_turno: '',
  empresa_local: '',
  empresa_total: '',
  empresa_presencial_qtd: '',
  empresa_turnover: '',
  empresa_burnout: '',
  empresa_faturamento: '',
  empresa_salario_medio: '',
  empresa_beneficios: '',
  empresa_ciclista: '',

  // Etapa 2
  func_cargo: '',
  func_presenca: '',
  func_salario: '',
  func_reposicao: '',

  // Etapa 3
  d1_tempo: '',
  d1_dist: '',
  d1_modal: '',
  d1_dias: '',
  d1_bald: '',
  d1_espera: '',
  d1_variacao: 50,
  d1_custo: '',
  d1_vt: '',

  // Etapa 4
  d2_cansaco: 50,
  d2_estresse: '',
  d2_conc: 30,
  d2_qual: 50,
  d2_sono: '',
  d2_desconforto: '',
  d2_lazer: '',
  d2_ansiedade: '',
  d2_energia: '',

  // Etapa 5
  d3_atrasos: '',
  d3_faltas: '',
  d3_recusa: '',
  d3_licencas: '',
  d3_contrib: '',
  d3_homeoff: '',
  d3_limite: '',
  d3_saicedo: '',
  d3_intencao: '',

  // Etapa 6
  d4_bairro: '',
  d4_ponto: '',
  d4_dep: '',
  d4_seg: 60,
  d4_app: '',
  d4_risco: '',
  d4_violencia: '',
  d4_vuln: 40,
  d4_tp_qual: ''
};

export class CalculatorService {
  // Teores máximos para normalização de scores
  public static readonly D1_MAX = 120;
  public static readonly D2_MAX = 150;
  public static readonly D3_MAX = 90;
  public static readonly D4_MAX = 260;
  public static readonly WEIGHTS = IIM_WEIGHTS;

  // =========================================================================
  // D1 — TEMPO E DISTÂNCIA (TRAJETO)
  // =========================================================================
  public static calcD1Raw(data: CalculatorInputDTO): number {
    const tempo = Math.min(Number(data.d1_tempo) || 0, 300); // teto 5h
    const dist = Math.min(Number(data.d1_dist) || 0, 200);   // teto 200km ida
    const bald = parseFloat(data.d1_bald || '0');
    const espera = Math.min(Number(data.d1_espera) || 0, 120); // teto 2h
    const varAmt = (data.d1_variacao ?? 50) / 100;
    const vt = data.d1_vt;

    let score = 0;
    score += Math.min(tempo / 1.2, 100) * 0.35;
    score += Math.min(dist / 0.5, 100) * 0.15;
    score += bald * 6;
    score += Math.min(espera * 1.5, 20);
    score += varAmt * 15;

    if (vt === 'parcial') score += 8;
    if (vt === 'nao') score += 16;

    return score;
  }

  public static calcD1(data: CalculatorInputDTO): number {
    const raw = this.calcD1Raw(data);
    return Math.min((raw / this.D1_MAX) * 100, 100);
  }

  // =========================================================================
  // D2 — ESTRESSE E FADIGA PERCEBIDOS
  // =========================================================================
  public static calcD2Raw(data: CalculatorInputDTO): number {
    let score = 0;
    score += (data.d2_cansaco ?? 50) * 0.20;
    score += parseFloat(data.d2_estresse || '0') * 5;
    score += (data.d2_conc ?? 30) * 0.12;
    score += (100 - (data.d2_qual ?? 50)) * 0.10;
    score += parseFloat(data.d2_sono || '0') * 4;
    score += parseFloat(data.d2_desconforto || '0') * 4;
    score += parseFloat(data.d2_lazer || '0') * 4;
    score += parseFloat(data.d2_ansiedade || '0') * 5;
    score += parseFloat(data.d2_energia || '0') * 5;

    // Amplificação por burnout da empresa (Etapa 1)
    const burnoutQtd = Number(data.empresa_burnout) || 0;
    const totalColabs = Math.max(Number(data.empresa_total) || 100, 1);
    const burnoutRate = Math.min(burnoutQtd / totalColabs, 0.40);
    score *= (1 + burnoutRate * 0.50);

    return score;
  }

  public static calcD2(data: CalculatorInputDTO): number {
    const raw = this.calcD2Raw(data);
    return Math.min((raw / this.D2_MAX) * 100, 100);
  }

  // =========================================================================
  // D3 — PONTUALIDADE E FREQUÊNCIA
  // =========================================================================
  public static calcD3Raw(data: CalculatorInputDTO): number {
    let score = 0;
    const atrasos = Number(data.d3_atrasos) || 0;
    const faltas = Number(data.d3_faltas) || 0;

    score += Math.min(atrasos * 8, 44) * (11 / 44);
    score += Math.min(faltas * 15, 44) * (11 / 44);
    score += parseFloat(data.d3_recusa || '0') * (11 / 4);
    score += Math.min((Number(data.d3_licencas) || 0) * 3, 36) * (9 / 36);
    score += parseFloat(data.d3_contrib || '0') * (9 / 4);
    score += parseFloat(data.d3_homeoff || '0') * (9 / 4);
    score += parseFloat(data.d3_limite || '0') * (7 / 4);
    score += parseFloat(data.d3_saicedo || '0') * (7 / 4);
    score += parseFloat(data.d3_intencao || '0') * (16 / 4);

    // Amplificação por turnover da empresa acima de 20%
    const turnoverReal = Math.min(Number(data.empresa_turnover) || 0, 100);
    if (turnoverReal > 20) {
      score *= (1 + ((turnoverReal - 20) / 100) * 0.5);
    }

    return score;
  }

  public static calcD3(data: CalculatorInputDTO): number {
    const raw = this.calcD3Raw(data);
    return Math.min((raw / this.D3_MAX) * 100, 100);
  }

  // =========================================================================
  // D4 — VULNERABILIDADE MODAL E SOCIOESPACIAL
  // =========================================================================
  public static calcD4Raw(data: CalculatorInputDTO): number {
    let score = 0;
    score += parseFloat(data.d4_dep || '0') * 12;
    score += (100 - (data.d4_seg ?? 60)) * 0.20;
    score += parseFloat(data.d4_app || '0') * 8;
    score += parseFloat(data.d4_risco || '0') * 10;
    score += parseFloat(data.d4_violencia || '0') * 12;
    score += (data.d4_vuln ?? 40) * 0.20;
    score += parseFloat(data.d4_tp_qual || '0') * 10;
    score += Math.min((Number(data.d4_ponto) || 0) * 2, 15);

    // Relação custo de transporte vs salário líquido
    const salarioBase = Number(data.func_salario) || Number(data.empresa_salario_medio) || 3500;
    const custTransp = Number(data.d1_custo) || 0;
    if (custTransp > 0 && salarioBase > 0) {
      const pctSal = custTransp / (salarioBase * 0.75);
      if (pctSal > 0.20) score += 18;
      else if (pctSal > 0.12) score += 10;
      else if (pctSal > 0.06) score += 4;
    }

    return score;
  }

  public static calcD4(data: CalculatorInputDTO): number {
    const raw = this.calcD4Raw(data);
    return Math.min((raw / this.D4_MAX) * 100, 100);
  }

  // =========================================================================
  // MULTIPLICADORES & MODIFICADORES
  // =========================================================================
  public static getDaysMultiplier(dias: string): number {
    const map: Record<string, number> = {
      '1': 0.32,
      '2': 0.52,
      '3': 0.72,
      '4': 0.88,
      '5': 1.00
    };
    return map[dias] || 1.00;
  }

  public static getSectorMultiplier(setor: string): number {
    const map: Record<string, number> = {
      logistica: 1.06,
      saude: 1.05,
      industria: 1.04,
      varejo: 1.03,
      governo: 0.96,
      tech: 1.00,
      financeiro: 1.00,
      edu: 1.00,
      servicos: 1.01
    };
    return map[setor] || 1.00;
  }

  public static getOrganizationalModifier(data: CalculatorInputDTO): number {
    let mod = 0;
    if (data.empresa_turno === 'noturno') mod += 10;
    if (data.empresa_flex === 'nao') mod += 8;
    if (['periferia', 'fora'].includes(data.empresa_local)) mod += 8;
    if (data.empresa_beneficios === 'nenhum') mod += 5;
    return mod;
  }

  // =========================================================================
  // CÁLCULO GERAL DAS DIMENSÕES
  // =========================================================================
  public static calculateDimensionalScores(data: CalculatorInputDTO): DimensionalScores {
    return {
      d1Raw: this.calcD1Raw(data),
      d1Norm: this.calcD1(data),
      d2Raw: this.calcD2Raw(data),
      d2Norm: this.calcD2(data),
      d3Raw: this.calcD3Raw(data),
      d3Norm: this.calcD3(data),
      d4Raw: this.calcD4Raw(data),
      d4Norm: this.calcD4(data),
      daysMultiplier: this.getDaysMultiplier(data.d1_dias),
      sectorMultiplier: this.getSectorMultiplier(data.empresa_setor),
      organizationalModifier: this.getOrganizationalModifier(data)
    };
  }

  // =========================================================================
  // FÓRMULA PRINCIPAL DO IIM & CLASSIFICAÇÃO
  // =========================================================================
  public static calculateIimScore(dimScores: DimensionalScores): {
    iim: number;
    iimRounded: number;
    classificacao: string;
    classBg: string;
    classColor: string;
    contexto: string;
  } {
    const basePonderada =
      dimScores.d1Norm * IIM_WEIGHTS.D1 +
      dimScores.d2Norm * IIM_WEIGHTS.D2 +
      dimScores.d3Norm * IIM_WEIGHTS.D3 +
      dimScores.d4Norm * IIM_WEIGHTS.D4;

    let iim = basePonderada * dimScores.daysMultiplier * dimScores.sectorMultiplier;
    iim = Math.min(iim + dimScores.organizationalModifier * 0.3, 100);
    const iimRounded = Math.round(iim);

    let classificacao = '🟢 Baixo Impacto (Mobilidade Eficiente)';
    let classBg = '#EBF7F0';
    let classColor = '#0B2545';

    if (iim <= 40) {
      classificacao = '🟢 Baixo Impacto (Mobilidade Eficiente)';
      classBg = '#EBF7F0';
      classColor = '#0B2545';
    } else if (iim <= 60) {
      classificacao = '🟡 Impacto Moderado (Atenção a Desgaste)';
      classBg = '#fffaeb';
      classColor = '#7a5c00';
    } else if (iim <= 80) {
      classificacao = '🟠 Alto Impacto (Mobilidade Prejudicial)';
      classBg = '#fff3e8';
      classColor = '#7a3e00';
    } else {
      classificacao = '🔴 Impacto Crítico (Alto Risco e Prejuízo)';
      classBg = '#fff0f0';
      classColor = '#cc3333';
    }

    const contextMap: Record<number, string> = {
      40: 'Situação favorável (0–40): mobilidade fluida com impacto negativo mínimo nos custos e no bem-estar.',
      60: 'Atenção necessária (41–60): atrito intermediário no trajeto, com início de perda produtiva e estresse perceptível.',
      80: 'Impacto negativo elevado (61–80): deslocamento desgastante gerando perda severa de produtividade e risco de rotatividade.',
      100: 'Impacto negativo crítico (81–100): condições severas de mobilidade acarretando alto prejuízo financeiro e risco de burnout.'
    };
    const ctxKey = iim <= 40 ? 40 : iim <= 60 ? 60 : iim <= 80 ? 80 : 100;

    return {
      iim,
      iimRounded,
      classificacao,
      classBg,
      classColor,
      contexto: contextMap[ctxKey]
    };
  }

  // =========================================================================
  // CÁLCULOS FINANCEIROS
  // =========================================================================
  public static calculateFinancials(
    data: CalculatorInputDTO,
    d1: number,
    d2: number,
    d3: number,
    d4: number,
    iim: number
  ): FinancialMetrics {
    const salarioBase = Number(data.func_salario) || Number(data.empresa_salario_medio) || 3500;
    const salarioEfetivo = Math.min(salarioBase, 200000);
    const fatorReposicao = parseFloat(data.func_reposicao || '1.0');
    const custoBrutoMensal = salarioEfetivo * 1.68;

    // Perda de produtividade (absenteísmo + lentidão)
    const perdaProdutividadeMensal = custoBrutoMensal * (iim / 100) * 0.25;

    // Presenteísmo (presente fisicamente mas com foco drenado por D2)
    const presenteismoMensal = custoBrutoMensal * (d2 / 100) * 0.12;

    // Custo de reposição de turnover (headhunter + ramp-up + absorção)
    const turnoverReal = Math.min(Number(data.empresa_turnover) || 0, 100);
    const turnoverCalib = turnoverReal > 0 ? Math.max(turnoverReal / 15, 0.6) : 1.0;
    const custoTurnoverReposicao = salarioEfetivo * 12 * fatorReposicao * 1.4 * turnoverCalib;

    // Probabilidade contínua de turnover acumulada no mês
    const probabilidadeTurnover = Math.min((iim / 100) * 0.55, 0.55);

    // Custo de impacto mensal integrado
    const custoImpactoTotalMensal =
      perdaProdutividadeMensal +
      presenteismoMensal +
      (custoTurnoverReposicao * probabilidadeTurnover) / 12;

    // Decomposição de custo por dimensão
    const safeIim = Math.max(iim, 1);
    const custoPorDimensao = {
      d1: perdaProdutividadeMensal * IIM_WEIGHTS.D1 * (d1 / safeIim),
      d2: (perdaProdutividadeMensal + presenteismoMensal) * IIM_WEIGHTS.D2 * (d2 / safeIim),
      d3: perdaProdutividadeMensal * IIM_WEIGHTS.D3 * (d3 / safeIim),
      d4: perdaProdutividadeMensal * IIM_WEIGHTS.D4 * (d4 / safeIim)
    };

    return {
      salarioEfetivo,
      custoBrutoMensal,
      perdaProdutividadeMensal,
      presenteismoMensal,
      custoTurnoverReposicao,
      probabilidadeTurnover,
      custoImpactoTotalMensal,
      custoPorDimensao
    };
  }

  // =========================================================================
  // PROJEÇÃO INERCIAL 12 MESES
  // =========================================================================
  public static calculateProjecao12Meses(
    custoMensal: number,
    iim: number
  ): { marcos: ProjectionMilestone[]; notaInercial: string } {
    const horizons = [
      { meses: 1, label: 'Agora (1 mês)', isAnual: false, obs: 'custo acumulado' },
      { meses: 3, label: '3 meses', isAnual: false, obs: 'custo acumulado' },
      { meses: 6, label: '6 meses', isAnual: false, obs: 'custo acumulado' },
      { meses: 12, label: '12 meses', isAnual: true, obs: '⚠ custo acumulado anual' }
    ];

    const marcos: ProjectionMilestone[] = horizons.map((h) => ({
      meses: h.meses,
      label: h.label,
      custoAcumulado: custoMensal * h.meses,
      observacao: h.obs,
      isAnual: h.isAnual
    }));

    const notaInercial =
      iim > 60
        ? '⚠ Com IIM acima de 60, o risco de turnover é ponderado mensalmente. A perda de um colaborador de alto custo de reposição pode triplicar o impacto de um único mês. Cada mês de inação é custo composto.'
        : 'IIM moderado — o custo acumulado é real mas gerenciável com intervenções preventivas de baixo esforço.';

    return { marcos, notaInercial };
  }

  // =========================================================================
  // SIMULADOR DE ECONOMIA
  // =========================================================================
  public static calculateSimuladorEconomia(
    iimAtual: number,
    custoMensal: number,
    iimAlvo: number
  ): SimulatedSavings {
    const t = Math.max(iimAlvo, 10);
    const reducao = 1 - t / Math.max(iimAtual, 1);
    const economiaMensal = custoMensal * reducao;
    const economiaAnual = economiaMensal * 12;
    const pontosReduzidos = Math.round(iimAtual - t);

    return {
      iimAtual,
      iimAlvo: t,
      pontosReduzidos,
      percentualReducao: Math.round(reducao * 100),
      economiaMensal,
      economiaAnual
    };
  }

  // =========================================================================
  // INTERVENÇÕES PRIORITÁRIAS COM ROI
  // =========================================================================
  public static calculateIntervencoes(
    dimScores: DimensionalScores,
    iim: number,
    custoMensal: number
  ): PrioritizedIntervention[] {
    const INTERVENCOES_CATALOGO = [
      {
        id: 'flex_horario',
        label: 'Flexibilidade de horário (±30 min)',
        esforco: 'Baixo' as const,
        esforcoCls: 'esf-low',
        dI: { d1: 10, d2: 9, d3: 5, d4: 0 },
        desc: 'Reduz pressão de D1 e ansiedade antecipatória de D2'
      },
      {
        id: 'vt_integral',
        label: 'Vale-transporte cobertura integral',
        esforco: 'Baixo' as const,
        esforcoCls: 'esf-low',
        dI: { d1: 8, d2: 0, d3: 3, d4: 12 },
        desc: 'Elimina custo descoberto — reduz vulnerabilidade financeira'
      },
      {
        id: 'auxilio_mob',
        label: 'Auxílio-mobilidade (crédito livre)',
        esforco: 'Baixo' as const,
        esforcoCls: 'esf-low',
        dI: { d1: 5, d2: 4, d3: 0, d4: 15 },
        desc: 'Flexibilidade modal — colaborador escolhe o melhor trajeto'
      },
      {
        id: 'hibrido_1d',
        label: 'Híbrido 1 dia/semana',
        esforco: 'Médio' as const,
        esforcoCls: 'esf-med',
        dI: { d1: 18, d2: 14, d3: 12, d4: 0 },
        desc: 'Reduz exposição ao deslocamento em ~20%'
      },
      {
        id: 'hibrido_2d',
        label: 'Híbrido 2 dias/semana',
        esforco: 'Médio' as const,
        esforcoCls: 'esf-med',
        dI: { d1: 28, d2: 22, d3: 20, d4: 0 },
        desc: 'Reduz exposição em ~40% — maior impacto global no IIM'
      },
      {
        id: 'saude_mental',
        label: 'Programa de saúde mental e bem-estar',
        esforco: 'Médio' as const,
        esforcoCls: 'esf-med',
        dI: { d1: 0, d2: 22, d3: 10, d4: 0 },
        desc: 'Suporte psicológico reduz burnout e presenteísmo (D2)'
      },
      {
        id: 'fretado_rotas',
        label: 'Fretado corporativo rotas críticas',
        esforco: 'Alto' as const,
        esforcoCls: 'esf-high',
        dI: { d1: 25, d2: 12, d3: 10, d4: 20 },
        desc: 'Elimina variabilidade e reduz D4 — transfere risco para a empresa'
      }
    ];

    const esforcoPeso = { Baixo: 1, Médio: 2, Alto: 3 };

    const scored = INTERVENCOES_CATALOGO.map((inv) => {
      const nD1 = Math.max(dimScores.d1Norm - inv.dI.d1, 0);
      const nD2 = Math.max(dimScores.d2Norm - inv.dI.d2, 0);
      const nD3 = Math.max(dimScores.d3Norm - inv.dI.d3, 0);
      const nD4 = Math.max(dimScores.d4Norm - inv.dI.d4, 0);

      const newIIM =
        nD1 * IIM_WEIGHTS.D1 +
        nD2 * IIM_WEIGHTS.D2 +
        nD3 * IIM_WEIGHTS.D3 +
        nD4 * IIM_WEIGHTS.D4;
      const reducaoIIM = Math.max(iim - newIIM, 0);
      const economiaMensal = custoMensal * (reducaoIIM / Math.max(iim, 1));
      const roiScore = economiaMensal / esforcoPeso[inv.esforco];

      return {
        id: inv.id,
        label: inv.label,
        esforco: inv.esforco,
        esforcoCls: inv.esforcoCls,
        desc: inv.desc,
        reducaoIIM,
        economiaMensal,
        roiScore
      };
    });

    // Ordenação decrescente por ROI
    scored.sort((a, b) => b.roiScore - a.roiScore);
    return scored.slice(0, 5);
  }

  // =========================================================================
  // RECOMENDAÇÕES URBANFLOW
  // =========================================================================
  public static calculateRecomendacoes(
    iim: number,
    d1: number,
    d2: number,
    d3: number,
    d4: number
  ): DiagnosisRecommendations {
    const dimCriticasList = [
      d1 > 70 ? 'D1 (trajeto)' : null,
      d2 > 70 ? 'D2 (estresse)' : null,
      d3 > 70 ? 'D3 (pontualidade)' : null,
      d4 > 70 ? 'D4 (vulnerabilidade)' : null
    ].filter(Boolean) as string[];

    const dimensoesCriticas =
      dimCriticasList.length > 0 ? dimCriticasList.join(', ') : 'todas as dimensões';

    let titulo = '';
    let itens: string[] = [];

    if (iim <= 40) {
      titulo = '✅ Situação estável — plano de manutenção preventiva';
      itens = [
        'Monitoramento anual do IIM — manter linha de base para comparação setorial',
        'Avaliar benefícios complementares de mobilidade (auxílio-mobilidade flexível)',
        'Consolidar como empresa referência em mobilidade no setor',
        'Diagnóstico UrbanFlow anual para detectar mudanças no perfil residencial da equipe'
      ];
    } else if (iim <= 60) {
      titulo = `⚠ Sinais de desgaste em ${dimensoesCriticas} — intervenção preventiva recomendada`;
      itens = [
        'Revisar cobertura do vale-transporte — custo descoberto é vulnerabilidade financeira direta',
        'Avaliar flexibilidade de horário de entrada (±30 min) — intervenção de custo baixo e alto impacto em D1 e D2',
        'Mapeamento de alternativas de modal para rotas críticas identificadas na etapa D1',
        'Implementar pesquisa de mobilidade semestral — dado longitudinal fortalece o diagnóstico',
        'Diagnóstico UrbanFlow de origem-destino para mapear concentração de colaboradores por bairro'
      ];
    } else if (iim <= 80) {
      titulo = `🚨 Alto impacto em ${dimensoesCriticas} — intervenção necessária`;
      itens = [
        'Auditoria completa de benefícios de mobilidade — comparar cobertura real vs. custo de transporte declarado',
        'Implementar regime híbrido para cargos compatíveis — maior alavanca individual de redução do IIM',
        'Avaliar fretado corporativo para rotas de alta densidade — UrbanFlow realiza mapeamento de viabilidade',
        'Programa de auxílio-mobilidade para colaboradores com D4 alto (vulnerabilidade modal)',
        'Análise de intenção de saída — D3 com score alto indica risco imediato de perda de equipe',
        'Diagnóstico UrbanFlow completo recomendado — estimativa de ROI da intervenção antes de decidir investimento'
      ];
    } else {
      titulo = '🔴 Impacto crítico — ação imediata necessária';
      itens = [
        'Reunião emergencial RH + liderança para plano de mobilidade com prazo definido',
        'Implementação imediata de flexibilidade de horário — alívio rápido sem custo operacional',
        'Avaliar home office parcial como medida de curto prazo enquanto plano estrutural é desenvolvido',
        'Revisão urgente do pacote de benefícios de mobilidade — o custo de inação supera o custo da intervenção',
        'Mapeamento individual para colaboradores com IIM > 85 — risco crítico de perda iminente',
        'Diagnóstico UrbanFlow prioritário — cada mês sem dado estruturado é custo acumulado não mensurado'
      ];
    }

    return { titulo, itens, dimensoesCriticas };
  }

  // =========================================================================
  // PROJEÇÃO CORPORATIVA
  // =========================================================================
  public static calculateProjecaoEmpresa(
    data: CalculatorInputDTO,
    custoMensal: number
  ): CompanyScaleProjection {
    const totalPresencial =
      Number(data.empresa_presencial_qtd) || Number(data.empresa_total) || 100;
    const faturamento = Number(data.empresa_faturamento) || 0;

    const impactoEmpresaMensal = custoMensal * totalPresencial;
    const impactoEmpresaAnual = impactoEmpresaMensal * 12;
    const percentualFaturamento =
      faturamento > 0 ? `${((impactoEmpresaAnual / faturamento) * 100).toFixed(1)}%` : '—';

    return {
      totalPresencial: Math.round(totalPresencial),
      impactoEmpresaMensal,
      impactoEmpresaAnual,
      faturamentoAnual: faturamento,
      percentualFaturamento
    };
  }

  // =========================================================================
  // DIAGNÓSTICO COMPLETO INTEGRADO (EXECUTOR PRINCIPAL)
  // =========================================================================
  public static generateFullDiagnosis(data: CalculatorInputDTO): FullIimDiagnosis {
    const dimensoes = this.calculateDimensionalScores(data);
    const iimResult = this.calculateIimScore(dimensoes);
    const financeiro = this.calculateFinancials(
      data,
      dimensoes.d1Norm,
      dimensoes.d2Norm,
      dimensoes.d3Norm,
      dimensoes.d4Norm,
      iimResult.iim
    );

    const projecao12Meses = this.calculateProjecao12Meses(
      financeiro.custoImpactoTotalMensal,
      iimResult.iim
    );

    const simuladorPadrao = this.calculateSimuladorEconomia(
      iimResult.iimRounded,
      financeiro.custoImpactoTotalMensal,
      Math.round(iimResult.iimRounded * 0.62)
    );

    const intervencoesPrioritarias = this.calculateIntervencoes(
      dimensoes,
      iimResult.iim,
      financeiro.custoImpactoTotalMensal
    );

    const recomendacoes = this.calculateRecomendacoes(
      iimResult.iim,
      dimensoes.d1Norm,
      dimensoes.d2Norm,
      dimensoes.d3Norm,
      dimensoes.d4Norm
    );

    const projecaoEmpresa = this.calculateProjecaoEmpresa(
      data,
      financeiro.custoImpactoTotalMensal
    );

    return {
      iim: iimResult.iim,
      iimRounded: iimResult.iimRounded,
      classificacao: iimResult.classificacao,
      classBg: iimResult.classBg,
      classColor: iimResult.classColor,
      contexto: iimResult.contexto,
      empresaNome: data.empresa_nome.trim(),
      dimensoes,
      financeiro,
      projecao12Meses,
      simuladorPadrao,
      intervencoesPrioritarias,
      recomendacoes,
      projecaoEmpresa
    };
  }

  // =========================================================================
  // VALIDAÇÃO ESTRITA DE ETAPAS
  // =========================================================================
  public static validateStep(step: number, data: CalculatorInputDTO): Record<string, string> {
    const errors: Record<string, string> = {};

    if (step === 1) {
      if (!data.empresa_nome.trim()) errors.empresa_nome = 'Informe o nome da empresa';
      if (!data.empresa_setor) errors.empresa_setor = 'Selecione o setor de atuação';
      if (!data.empresa_regime) errors.empresa_regime = 'Selecione o regime de trabalho';
      if (!data.empresa_contrato) errors.empresa_contrato = 'Selecione o regime de contratação';
      if (!data.empresa_flex) errors.empresa_flex = 'Indique a flexibilidade de horário';
      if (!data.empresa_turno) errors.empresa_turno = 'Selecione o turno predominante';
      if (!data.empresa_local) errors.empresa_local = 'Selecione a localização da empresa';
      if (data.empresa_total === '' || Number(data.empresa_total) < 1)
        errors.empresa_total = 'Informe o total de colaboradores';
      if (data.empresa_presencial_qtd === '' || Number(data.empresa_presencial_qtd) < 1)
        errors.empresa_presencial_qtd = 'Informe a quantidade em regime presencial';
      if (data.empresa_turnover === '') errors.empresa_turnover = 'Informe o turnover anual';
      if (data.empresa_burnout === '') errors.empresa_burnout = 'Informe os afastamentos por burnout';
      if (data.empresa_faturamento === '') errors.empresa_faturamento = 'Informe o faturamento anual';
      if (data.empresa_salario_medio === '') errors.empresa_salario_medio = 'Informe o salário médio mensal';
      if (!data.empresa_beneficios) errors.empresa_beneficios = 'Selecione os benefícios oferecidos';
      if (!data.empresa_ciclista) errors.empresa_ciclista = 'Indique a infraestrutura para ciclistas';
    } else if (step === 2) {
      if (!data.func_cargo) errors.func_cargo = 'Selecione o cargo / função';
      if (!data.func_presenca) errors.func_presenca = 'Indique a exigência de presença física';
      if (!data.func_reposicao) errors.func_reposicao = 'Selecione o fator de reposição';
    } else if (step === 3) {
      if (data.d1_tempo === '' || Number(data.d1_tempo) < 0)
        errors.d1_tempo = 'Informe o tempo de trajeto em minutos';
      if (data.d1_dist === '' || Number(data.d1_dist) < 0)
        errors.d1_dist = 'Informe a distância aproximada em km';
      if (!data.d1_modal) errors.d1_modal = 'Selecione o meio de transporte principal';
      if (!data.d1_dias) errors.d1_dias = 'Indique os dias presenciais por semana';
      if (!data.d1_bald) errors.d1_bald = 'Indique as baldeações/conexões';
      if (data.d1_espera === '' || Number(data.d1_espera) < 0)
        errors.d1_espera = 'Informe o tempo médio de espera';
      if (data.d1_custo === '' || Number(data.d1_custo) < 0)
        errors.d1_custo = 'Informe o custo mensal com transporte';
      if (!data.d1_vt) errors.d1_vt = 'Indique se o vale-transporte cobre o custo';
    } else if (step === 4) {
      if (!data.d2_estresse) errors.d2_estresse = 'Indique a frequência de estresse';
      if (!data.d2_sono) errors.d2_sono = 'Indique se afeta a qualidade do sono';
      if (!data.d2_desconforto) errors.d2_desconforto = 'Indique se chega desconfortável';
      if (!data.d2_lazer) errors.d2_lazer = 'Indique se impede lazer ou atividades';
      if (!data.d2_ansiedade) errors.d2_ansiedade = 'Indique a ansiedade antecipada';
      if (!data.d2_energia) errors.d2_energia = 'Indique a energia para vida pessoal';
    } else if (step === 5) {
      if (data.d3_atrasos === '' || Number(data.d3_atrasos) < 0)
        errors.d3_atrasos = 'Informe a quantidade de atrasos por mês';
      if (data.d3_faltas === '' || Number(data.d3_faltas) < 0)
        errors.d3_faltas = 'Informe a quantidade de faltas por mês';
      if (!data.d3_recusa) errors.d3_recusa = 'Indique se já recusou tarefas ou horas';
      if (data.d3_licencas === '' || Number(data.d3_licencas) < 0)
        errors.d3_licencas = 'Informe os dias de licença';
      if (!data.d3_contrib) errors.d3_contrib = 'Indique a contribuição do trajeto';
      if (!data.d3_homeoff) errors.d3_homeoff = 'Indique se pediu home office por evitação';
      if (!data.d3_limite) errors.d3_limite = 'Indique a frequência no limite exato';
      if (!data.d3_saicedo) errors.d3_saicedo = 'Indique se sai mais cedo do trabalho';
      if (!data.d3_intencao) errors.d3_intencao = 'Indique a intenção de demissão';
    } else if (step === 6) {
      if (!data.d4_bairro.trim()) errors.d4_bairro = 'Informe o bairro de residência';
      if (data.d4_ponto === '' || Number(data.d4_ponto) < 0)
        errors.d4_ponto = 'Informe a distância a pé até o ponto';
      if (!data.d4_dep) errors.d4_dep = 'Indique a dependência do transporte público';
      if (!data.d4_app) errors.d4_app = 'Indique o acesso a aplicativo de transporte';
      if (!data.d4_risco) errors.d4_risco = 'Indique a presença de áreas com risco';
      if (!data.d4_violencia) errors.d4_violencia = 'Indique se foi vítima de assalto/violência';
      if (!data.d4_tp_qual) errors.d4_tp_qual = 'Avalie a qualidade do transporte público';
    }

    return errors;
  }
}
