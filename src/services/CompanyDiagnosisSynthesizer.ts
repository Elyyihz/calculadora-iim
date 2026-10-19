import {
  EmployeeIndividualDiagnosis,
  CompanyExecutiveSummary,
  CompanyRiskGroup,
  GlobalCompanyIntervention
} from '../types/spreadsheet';

/**
 * Service that consolidates 100% of individual employee survey records
 * into an executive company report with overall IIM average, risk tier grouping,
 * and data-driven global corporate interventions.
 */
export class CompanyDiagnosisSynthesizer {
  /**
   * Synthesizes the full corporate report from individual employee diagnoses.
   *
   * @param diagnoses - Array containing 100% of the employee diagnoses.
   * @param companyName - Name of the client company.
   * @param salarioMedio - Average company salary baseline.
   * @param faturamentoMensal - Monthly company revenue baseline.
   * @returns Complete executive summary and dashboard structure.
   */
  public static synthesize(
    diagnoses: EmployeeIndividualDiagnosis[],
    companyName: string = 'Empresa Cliente',
    salarioMedio: number = 3800,
    faturamentoMensal: number = 450000
  ): CompanyExecutiveSummary {
    console.info(`[CompanyDiagnosisSynthesizer] Step started: Synthesizing executive report for "${companyName}" (${diagnoses.length} employees)`);

    const total = diagnoses.length;
    if (total === 0) {
      console.warn('[CompanyDiagnosisSynthesizer] Decision taken: Zero records supplied; returning empty summary baseline');
      return this.createEmptySummary(companyName);
    }

    // 1. Overall Company Average IIM and Dimensions
    const avgIimScore = Math.round(diagnoses.reduce((acc, d) => acc + d.iimScore, 0) / total);
    const avgD1 = Math.round(diagnoses.reduce((acc, d) => acc + d.d1Score, 0) / total);
    const avgD2 = Math.round(diagnoses.reduce((acc, d) => acc + d.d2Score, 0) / total);
    const avgD3 = Math.round(diagnoses.reduce((acc, d) => acc + d.d3Score, 0) / total);
    const avgD4 = Math.round(diagnoses.reduce((acc, d) => acc + d.d4Score, 0) / total);

    // Classification
    let classification = 'Baixo Impacto (Mobilidade Fluida)';
    let classColor = '#15803D';
    let classBg = '#DCFCE7';

    if (avgIimScore > 80) {
      classification = 'Impacto Crítico (Alto Risco e Ruptura)';
      classColor = '#DC2626';
      classBg = '#FEE2E2';
    } else if (avgIimScore > 60) {
      classification = 'Alto Impacto (Prejuízo Operacional)';
      classColor = '#EA580C';
      classBg = '#FFEDD5';
    } else if (avgIimScore > 40) {
      classification = 'Impacto Moderado (Atenção Preventiva)';
      classColor = '#D97706';
      classBg = '#FEF3C7';
    }

    // 2. Risk Groups Distribution
    const riskGroups = this.buildRiskGroups(diagnoses);

    // 3. Financial Loss Projection
    const hourlyRate = salarioMedio / 176;
    const monthlyDelaysLoss = diagnoses.reduce((acc, d) => acc + (d.atrasosMes * 0.75 * hourlyRate), 0);
    const monthlyPresenteeismLoss = diagnoses.reduce((acc, d) => acc + ((d.d2Score / 100) * 0.12 * salarioMedio), 0);
    const criticalCount = riskGroups.critico.count + riskGroups.alto.count;
    const monthlyTurnoverRiskLoss = (criticalCount * 1.2 * salarioMedio) / 12;
    const monthlyFinancialLossEstimate = Math.round(monthlyDelaysLoss + monthlyPresenteeismLoss + monthlyTurnoverRiskLoss);

    // 4. Data-driven Global Interventions
    const globalInterventions = this.generateGlobalInterventions(
      diagnoses,
      riskGroups,
      avgIimScore,
      { d1: avgD1, d2: avgD2, d3: avgD3, d4: avgD4 },
      monthlyFinancialLossEstimate
    );

    // 5. Executive Key Insights
    const keyInsights = this.generateKeyInsights(
      diagnoses,
      riskGroups,
      avgIimScore,
      monthlyFinancialLossEstimate,
      faturamentoMensal
    );

    console.info(`[CompanyDiagnosisSynthesizer] Step concluded: Executive report generated (Company IIM: ${avgIimScore} pts, Loss: R$ ${monthlyFinancialLossEstimate}/mo)`);

    return {
      companyName,
      totalEmployees: total,
      avgIimScore,
      classification,
      classColor,
      classBg,
      dimensionalAverages: {
        d1: avgD1,
        d2: avgD2,
        d3: avgD3,
        d4: avgD4
      },
      riskGroups,
      globalInterventions,
      keyInsights,
      monthlyFinancialLossEstimate
    };
  }

  /**
   * Groups employees into the 4 official IIM risk tiers with detailed metrics.
   *
   * @param diagnoses - All employee diagnoses.
   * @returns Record with the 4 risk groups.
   */
  private static buildRiskGroups(
    diagnoses: EmployeeIndividualDiagnosis[]
  ): Record<'baixo' | 'moderado' | 'alto' | 'critico', CompanyRiskGroup> {
    const total = diagnoses.length;

    const filterGroup = (min: number, max: number) =>
      diagnoses.filter((d) => d.iimScore >= min && d.iimScore <= max);

    const baixos = filterGroup(0, 40);
    const moderados = filterGroup(41, 60);
    const altos = filterGroup(61, 80);
    const criticos = filterGroup(81, 100);

    const computeGroupMetrics = (
      key: 'baixo' | 'moderado' | 'alto' | 'critico',
      label: string,
      range: string,
      color: string,
      bgColor: string,
      items: EmployeeIndividualDiagnosis[],
      summaryText: string,
      recommendationText: string
    ): CompanyRiskGroup => {
      const count = items.length;
      const percentage = total > 0 ? Math.round((count / total) * 100) : 0;
      const avgTempo = count > 0 ? Math.round(items.reduce((acc, d) => acc + d.tempoTrajetoMin, 0) / count) : 0;
      const avgEstresse = count > 0 ? Number((items.reduce((acc, d) => acc + d.estresse, 0) / count).toFixed(1)) : 0;
      const avgAtrasos = count > 0 ? Number((items.reduce((acc, d) => acc + d.atrasosMes, 0) / count).toFixed(1)) : 0;

      // Detect predominant modal
      const modalCounts: Record<string, number> = {};
      items.forEach((d) => {
        modalCounts[d.modal] = (modalCounts[d.modal] || 0) + 1;
      });
      const predominantModal = Object.entries(modalCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'Geral';

      return {
        key,
        label,
        range,
        color,
        bgColor,
        count,
        percentage,
        avgTempo,
        avgEstresse,
        avgAtrasos,
        predominantModal,
        summary: summaryText,
        recommendation: recommendationText
      };
    };

    return {
      baixo: computeGroupMetrics(
        'baixo',
        'Baixo Risco',
        '0–40 pts',
        '#16A34A',
        '#DCFCE7',
        baixos,
        'Deslocamento fluido com atrito mínimo. Colaboradores residem mais próximos ou possuem transporte eficiente.',
        'Preservar condições atuais e incentivar mobilidade ativa e caronas internas.'
      ),
      moderado: computeGroupMetrics(
        'moderado',
        'Impacto Moderado',
        '41–60 pts',
        '#D97706',
        '#FEF3C7',
        moderados,
        'Fricção intermediária com perda de tempo e estresse pontual nos horários de pico.',
        'Aplicar políticas preventivas de flexibilidade de entrada e tolerância de jornada.'
      ),
      alto: computeGroupMetrics(
        'alto',
        'Alto Risco',
        '61–80 pts',
        '#EA580C',
        '#FFEDD5',
        altos,
        'Trajeto desgastante (>75 min), cansaço crônico e início de queda perceptível na retenção.',
        'Intervenção prioritária com teletrabalho parcial e subsídio a rotas alternativas.'
      ),
      critico: computeGroupMetrics(
        'critico',
        'Risco Crítico',
        '81–100 pts',
        '#DC2626',
        '#FEE2E2',
        criticos,
        'Exaustão severa, múltiplas baldeações, alta dependência de transporte vulnerável e risco iminente de turnover.',
        'Plano de choque imediato com fretamento de rota, remanejamento de turnos ou trabalho híbrido estruturado.'
      )
    };
  }

  /**
   * Suggests the top corporate global interventions tailored to the consolidated dataset.
   *
   * @param diagnoses - All employee diagnoses.
   * @param riskGroups - Computed risk bands.
   * @param avgIim - Company average IIM score.
   * @param dims - Dimensional averages.
   * @param monthlyLoss - Projected monthly financial loss.
   * @returns Array of prioritized global company interventions.
   */
  private static generateGlobalInterventions(
    diagnoses: EmployeeIndividualDiagnosis[],
    riskGroups: Record<'baixo' | 'moderado' | 'alto' | 'critico', CompanyRiskGroup>,
    avgIim: number,
    dims: { d1: number; d2: number; d3: number; d4: number },
    monthlyLoss: number
  ): GlobalCompanyIntervention[] {
    const total = diagnoses.length;
    const highRiskTotal = riskGroups.alto.count + riskGroups.critico.count;
    const interventions: GlobalCompanyIntervention[] = [];

    const isCompanyHighRisk = avgIim >= 50;
    // Intervenção 1: Escalonamento de Horários (aplicável se D1 alto ou atrasos frequentes)
    const transitUsers = diagnoses.filter((d) => /onibus|metro/i.test(d.modal)).length;
    interventions.push({
      id: 'escalonamento_horarios',
      title: 'Escalonamento de Horários e Janela Flexível de Entrada',
      category: 'Jornada & Escala',
      priority: dims.d1 > 50 || riskGroups.critico.count > 0 || isCompanyHighRisk ? 'Alta' : 'Média',
      effort: 'Baixo',
      timeframe: 'Até 30 dias',
      targetEmployeesCount: transitUsers > 0 ? transitUsers : Math.round(total * 0.7),
      targetGroupLabel: `${transitUsers} colaboradores que usam transporte coletivo`,
      iimReductionProjected: isCompanyHighRisk ? 12 : 8,
      monthlySavingsProjected: Math.round(monthlyLoss * 0.22),
      description:
        'Permite janela de entrada flexível (ex.: 07h30 às 09h00) para dispersar a equipe dos horários de pico no trânsito, reduzindo o tempo de espera e a ansiedade matinal.',
      actionSteps: [
        'Definir faixas horárias permitidas por setor operacional sem impactar o atendimento.',
        'Alinhar compensação de jornada via banco de horas flexível.',
        'Monitorar a redução de atrasos nos primeiros 45 dias pós-implementação.'
      ]
    });

    // Intervenção 2: Modelo Híbrido / Teletrabalho Focado em Distância
    if (highRiskTotal > 0 || dims.d2 > 50) {
      interventions.push({
        id: 'teletrabalho_distancia',
        title: 'Política de Teletrabalho Parcial Focada em Distância (1 a 2 dias/semana)',
        category: 'Jornada & Escala',
        priority: 'Alta',
        effort: 'Médio',
        timeframe: '30 a 60 dias',
        targetEmployeesCount: highRiskTotal,
        targetGroupLabel: `${highRiskTotal} colaboradores nas faixas de Alto Risco e Crítico`,
        iimReductionProjected: 18,
        monthlySavingsProjected: Math.round(monthlyLoss * 0.35),
        description:
          'Concessão direcionada de 1 a 2 dias semanais de home office exclusivamente para colaboradores com trajeto superior a 70 minutos diários ou múltiplas baldeações.',
        actionSteps: [
          'Mapear colaboradores elegíveis por função e tempo de deslocamento (>70 min).',
          'Instituir acordo formal de teletrabalho conforme CLT e disponibilizar infraestrutura.',
          'Reavaliar o índice de satisfação e risco de demissão após 60 dias de aplicação.'
        ]
      });
    }

    // Intervenção 3: Vale Mobilidade Multimodal Flexível
    const highCostUsers = diagnoses.filter((d) => d.gastoPct >= 12 || d.d4Score >= 55).length;
    interventions.push({
      id: 'vale_mobilidade_flexivel',
      title: 'Auxílio Mobilidade Multimodal Flexível (Vale-Transporte Flex)',
      category: 'Benefícios & Auxílios',
      priority: dims.d4 > 50 ? 'Alta' : 'Média',
      effort: 'Baixo',
      timeframe: 'Até 45 dias',
      targetEmployeesCount: highCostUsers > 0 ? highCostUsers : Math.round(total * 0.5),
      targetGroupLabel: `${highCostUsers || Math.round(total * 0.5)} colaboradores com alta vulnerabilidade financeira`,
      iimReductionProjected: 12,
      monthlySavingsProjected: Math.round(monthlyLoss * 0.18),
      description:
        'Migração do vale-transporte engessado para um cartão de benefício de mobilidade de livre escolha, permitindo combinar ônibus, metrô, aplicativos de corrida e bicicleta compartilhada.',
      actionSteps: [
        'Cotar operadores de benefícios corporativos com saldo flexível de mobilidade.',
        'Substituir o desconto tradicional pelo benefício com teto compatível.',
        'Incluir incentivo para uso de transporte não poluente ou carona solidária.'
      ]
    });

    // Intervenção 4: Fretado Corporativo Compartilhado em Rotas Críticas
    if (riskGroups.critico.count >= 5 || (highRiskTotal / total) >= 0.25) {
      interventions.push({
        id: 'fretado_rotas_criticas',
        title: 'Fretado Corporativo Compartilhado para Polos Críticos',
        category: 'Logística Corporativa',
        priority: 'Estratégica',
        effort: 'Alto',
        timeframe: '60 a 90 dias',
        targetEmployeesCount: riskGroups.critico.count + Math.round(riskGroups.alto.count * 0.6),
        targetGroupLabel: `Colaboradores de polos distantes e eixos de difícil acesso`,
        iimReductionProjected: 24,
        monthlySavingsProjected: Math.round(monthlyLoss * 0.40),
        description:
          'Contratação de van ou micro-ônibus fretado interligando estações de integração e polos residenciais periféricos até a sede da empresa.',
        actionSteps: [
          'Rodar análise de geolocalização dos CEPs dos funcionários de faixas críticas.',
          'Consolidar 1 a 2 rotas troncais nos horários de entrada e saída.',
          'Realizar cotação com empresas de fretamento e comparar custo vs perda produtiva.'
        ]
      });
    }

    // Intervenção 5: Programa de Apoio à Saúde e Descompressão
    if (dims.d2 >= 50 || diagnoses.some((d) => d.estresse >= 4)) {
      interventions.push({
        id: 'saude_descompressao',
        title: 'Programa de Descompressão e Atenuação de Burnout do Trânsito',
        category: 'Saúde & Bem-Estar',
        priority: 'Média',
        effort: 'Baixo',
        timeframe: 'Até 30 dias',
        targetEmployeesCount: total,
        targetGroupLabel: `Toda a equipe operacional (foco em colaboradores com estresse ≥ 4)`,
        iimReductionProjected: 8,
        monthlySavingsProjected: Math.round(monthlyLoss * 0.14),
        description:
          'Implementação de espaço de descompressão, apoio psicológico com convênio e palestras sobre gestão do tempo e saúde do sono para quem enfrenta trânsito pesado.',
        actionSteps: [
          'Criar espaço confortável para acolhimento pré-expediente para quem chega adiantado.',
          'Oferecer telemedicina/apoio psicológico com foco em estresse crônico.',
          'Orientar líderes sobre comunicação empática frente a incidentes de trânsito.'
        ]
      });
    }

    return interventions;
  }

  /**
   * Produces concise executive insights summarizing key findings.
   *
   * @param diagnoses - All employee records.
   * @param riskGroups - Computed risk bands.
   * @param avgIim - Company average IIM score.
   * @param monthlyLoss - Projected monthly financial loss.
   * @returns Array of executive insight sentences.
   */
  private static generateKeyInsights(
    diagnoses: EmployeeIndividualDiagnosis[],
    riskGroups: Record<'baixo' | 'moderado' | 'alto' | 'critico', CompanyRiskGroup>,
    avgIim: number,
    monthlyLoss: number,
    faturamentoMensal?: number
  ): string[] {
    const total = diagnoses.length;
    const insights: string[] = [];

    const criticalAndHigh = riskGroups.critico.count + riskGroups.alto.count;
    const criticalPct = Math.round((criticalAndHigh / total) * 100);

    insights.push(
      `O IIM médio consolidado da empresa é de ${avgIim} pontos, com ${criticalPct}% dos colaboradores (${criticalAndHigh} de ${total}) classificados nas faixas de Alto Risco e Risco Crítico, exigindo ação prioritária da liderança.`
    );

    const publicTransitCount = diagnoses.filter((d) => /onibus|metro/i.test(d.modal)).length;
    const transitPct = Math.round((publicTransitCount / total) * 100);
    insights.push(
      `${transitPct}% da força de trabalho depende de transporte coletivo, com tempo médio de deslocamento de ${riskGroups.alto.avgTempo || 75} minutos por dia.`
    );

    insights.push(
      `O atrito de deslocamento gera um impacto financeiro estimado em R$ ${monthlyLoss.toLocaleString('pt-BR')}/mês em perdas de horas produtivas, atrasos e risco de rotatividade.`
    );

    if (faturamentoMensal && faturamentoMensal > 0) {
      const pctRev = ((monthlyLoss / faturamentoMensal) * 100).toFixed(1);
      insights.push(
        `As perdas de produtividade estimadas representam aproximadamente ${pctRev}% do faturamento mensal declarado da organização.`
      );
    }

    if (riskGroups.baixo.percentage >= 30) {
      insights.push(
        `${riskGroups.baixo.percentage}% da equipe goza de mobilidade fluida (IIM ≤ 40), servindo como grupo de controle positivo para benchmarks internos.`
      );
    }

    return insights;
  }

  /**
   * Generates a neutral baseline when no records are present.
   */
  private static createEmptySummary(companyName: string): CompanyExecutiveSummary {
    return {
      companyName,
      totalEmployees: 0,
      avgIimScore: 0,
      classification: 'Sem Dados',
      classColor: '#94A3B8',
      classBg: '#F1F5F9',
      dimensionalAverages: { d1: 0, d2: 0, d3: 0, d4: 0 },
      riskGroups: {
        baixo: { key: 'baixo', label: 'Baixo Risco', range: '0–40 pts', color: '#16A34A', bgColor: '#DCFCE7', count: 0, percentage: 0, avgTempo: 0, avgEstresse: 0, avgAtrasos: 0, predominantModal: '-', summary: '', recommendation: '' },
        moderado: { key: 'moderado', label: 'Impacto Moderado', range: '41–60 pts', color: '#D97706', bgColor: '#FEF3C7', count: 0, percentage: 0, avgTempo: 0, avgEstresse: 0, avgAtrasos: 0, predominantModal: '-', summary: '', recommendation: '' },
        alto: { key: 'alto', label: 'Alto Risco', range: '61–80 pts', color: '#EA580C', bgColor: '#FFEDD5', count: 0, percentage: 0, avgTempo: 0, avgEstresse: 0, avgAtrasos: 0, predominantModal: '-', summary: '', recommendation: '' },
        critico: { key: 'critico', label: 'Risco Crítico', range: '81–100 pts', color: '#DC2626', bgColor: '#FEE2E2', count: 0, percentage: 0, avgTempo: 0, avgEstresse: 0, avgAtrasos: 0, predominantModal: '-', summary: '', recommendation: '' }
      },
      globalInterventions: [],
      keyInsights: [],
      monthlyFinancialLossEstimate: 0
    };
  }
}
