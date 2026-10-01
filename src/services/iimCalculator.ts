import { CalculatorFormData, IimResult } from '../types/calculator';

const D1_MAX = 120;
const D2_MAX = 150;
const D3_MAX = 90;
const D4_MAX = 260;

export function calculateIim(data: CalculatorFormData): IimResult {
  // 1. D1 Raw & Normalized
  const tempo = Math.min(Number(data.d1_tempo) || 0, 300);
  const dist = Math.min(Number(data.d1_dist) || 0, 200);
  const bald = parseFloat(data.d1_bald || '0');
  const espera = Math.min(Number(data.d1_espera) || 0, 120);
  const varAmt = (data.d1_variacao ?? 50) / 100;
  const vt = data.d1_vt;

  let d1Raw = 0;
  d1Raw += Math.min(tempo / 1.2, 100) * 0.35;
  d1Raw += Math.min(dist / 0.5, 100) * 0.15;
  d1Raw += bald * 6;
  d1Raw += Math.min(espera * 1.5, 20);
  d1Raw += varAmt * 15;
  if (vt === 'parcial') d1Raw += 8;
  if (vt === 'nao') d1Raw += 16;
  const d1 = Math.min((d1Raw / D1_MAX) * 100, 100);

  // 2. D2 Raw & Normalized
  let d2Raw = 0;
  d2Raw += (data.d2_cansaco ?? 50) * 0.20;
  d2Raw += parseFloat(data.d2_estresse || '0') * 5;
  d2Raw += (data.d2_conc ?? 30) * 0.12;
  d2Raw += (100 - (data.d2_qual ?? 50)) * 0.10;
  d2Raw += parseFloat(data.d2_sono || '0') * 4;
  d2Raw += parseFloat(data.d2_desconforto || '0') * 4;
  d2Raw += parseFloat(data.d2_lazer || '0') * 4;
  d2Raw += parseFloat(data.d2_ansiedade || '0') * 5;
  d2Raw += parseFloat(data.d2_energia || '0') * 5;

  const burnoutQtd = Number(data.empresa_burnout) || 0;
  const totalColabs = Math.max(Number(data.empresa_total) || 100, 1);
  const burnoutRate = Math.min(burnoutQtd / totalColabs, 0.40);
  d2Raw *= (1 + burnoutRate * 0.50);
  const d2 = Math.min((d2Raw / D2_MAX) * 100, 100);

  // 3. D3 Raw & Normalized
  let d3Raw = 0;
  const atrasos = Number(data.d3_atrasos) || 0;
  const faltas = Number(data.d3_faltas) || 0;
  d3Raw += Math.min(atrasos * 8, 44) * (11 / 44);
  d3Raw += Math.min(faltas * 15, 44) * (11 / 44);
  d3Raw += parseFloat(data.d3_recusa || '0') * (11 / 4);
  d3Raw += Math.min((Number(data.d3_licencas) || 0) * 3, 36) * (9 / 36);
  d3Raw += parseFloat(data.d3_contrib || '0') * (9 / 4);
  d3Raw += parseFloat(data.d3_homeoff || '0') * (9 / 4);
  d3Raw += parseFloat(data.d3_limite || '0') * (7 / 4);
  d3Raw += parseFloat(data.d3_saicedo || '0') * (7 / 4);
  d3Raw += parseFloat(data.d3_intencao || '0') * (16 / 4);

  const turnoverReal = Math.min(Number(data.empresa_turnover) || 0, 100);
  if (turnoverReal > 20) {
    d3Raw *= (1 + ((turnoverReal - 20) / 100) * 0.5);
  }
  const d3 = Math.min((d3Raw / D3_MAX) * 100, 100);

  // 4. D4 Raw & Normalized
  let d4Raw = 0;
  d4Raw += parseFloat(data.d4_dep || '0') * 12;
  d4Raw += (100 - (data.d4_seg ?? 60)) * 0.20;
  d4Raw += parseFloat(data.d4_app || '0') * 8;
  d4Raw += parseFloat(data.d4_risco || '0') * 10;
  d4Raw += parseFloat(data.d4_violencia || '0') * 12;
  d4Raw += (data.d4_vuln ?? 40) * 0.20;
  d4Raw += parseFloat(data.d4_tp_qual || '0') * 10;
  d4Raw += Math.min((Number(data.d4_ponto) || 0) * 2, 15);

  const salarioBase = Number(data.func_salario) || Number(data.empresa_salario_medio) || 3500;
  const custTransp = Number(data.d1_custo) || 0;
  if (custTransp > 0 && salarioBase > 0) {
    const pctSal = custTransp / (salarioBase * 0.75);
    if (pctSal > 0.20) d4Raw += 18;
    else if (pctSal > 0.12) d4Raw += 10;
    else if (pctSal > 0.06) d4Raw += 4;
  }
  const d4 = Math.min((d4Raw / D4_MAX) * 100, 100);

  // Global Multipliers
  const diasMap: Record<string, number> = { '1': 0.32, '2': 0.52, '3': 0.72, '4': 0.88, '5': 1.0 };
  const daysMult = diasMap[data.d1_dias] || 1.0;

  const sectorMap: Record<string, number> = {
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
  const sectorMult = sectorMap[data.empresa_setor] || 1.0;

  // Modifiers
  let mod = 0;
  if (data.empresa_turno === 'noturno') mod += 10;
  if (data.empresa_flex === 'nao') mod += 8;
  if (['periferia', 'fora'].includes(data.empresa_local)) mod += 8;
  if (data.empresa_beneficios === 'nenhum') mod += 5;

  let iim = (d1 * 0.30 + d2 * 0.27 + d3 * 0.25 + d4 * 0.18) * daysMult * sectorMult;
  iim = Math.min(iim + mod * 0.3, 100);
  const iimRounded = Math.round(iim);

  // Classification
  let classification = '🟢 Baixo Impacto';
  let classBg = '#e8fbf3';
  let classColor = '#0D2B1F';

  if (iim <= 40) {
    classification = '🟢 Baixo Impacto';
    classBg = '#e8fbf3';
    classColor = '#0D2B1F';
  } else if (iim <= 60) {
    classification = '🟡 Impacto Moderado';
    classBg = '#fffaeb';
    classColor = '#7a5c00';
  } else if (iim <= 80) {
    classification = '🟠 Alto Impacto';
    classBg = '#fff3e8';
    classColor = '#7a3e00';
  } else {
    classification = '🔴 Impacto Crítico';
    classBg = '#fff0f0';
    classColor = '#cc3333';
  }

  const contextMap: Record<number, string> = {
    40: 'Situação estável — colaborador tem condições favoráveis de deslocamento.',
    60: 'Sinais de desgaste detectados — intervenção preventiva pode evitar escalada de custos.',
    80: 'Alto impacto operacional — perda de produtividade e risco de turnover significativos.',
    100: 'Impacto crítico — cada mês sem intervenção adiciona custo acumulado e risco de perda do colaborador.'
  };
  const ctxKey = iim <= 40 ? 40 : iim <= 60 ? 60 : iim <= 80 ? 80 : 100;
  const contextText = contextMap[ctxKey];

  // Financial calculations
  const salario = Math.min(salarioBase, 200000);
  const fatorReposicao = parseFloat(data.func_reposicao || '1.0');
  const custoBruto = salario * 1.68;

  const perdaProd = custoBruto * (iim / 100) * 0.25;
  const presenteismo = custoBruto * (d2 / 100) * 0.12;

  const turnoverCalib = turnoverReal > 0 ? Math.max(turnoverReal / 15, 0.6) : 1.0;
  const custoTurnover = salario * 12 * fatorReposicao * 1.4 * turnoverCalib;
  const probTurnover = Math.min((iim / 100) * 0.55, 0.55);
  const custoMensal = perdaProd + presenteismo + (custoTurnover * probTurnover) / 12;

  const dimCosts = {
    d1: perdaProd * 0.30 * (d1 / Math.max(iim, 1)),
    d2: (perdaProd + presenteismo) * 0.27 * (d2 / Math.max(iim, 1)),
    d3: perdaProd * 0.25 * (d3 / Math.max(iim, 1)),
    d4: perdaProd * 0.18 * (d4 / Math.max(iim, 1))
  };

  return {
    d1,
    d2,
    d3,
    d4,
    iim,
    iimRounded,
    classification,
    classBg,
    classColor,
    contextText,
    empresaNome: data.empresa_nome.trim(),
    salario,
    fatorReposicao,
    custoBruto,
    perdaProd,
    presenteismo,
    custoTurnover,
    custoMensal,
    dimCosts
  };
}
