import { CalculatorService } from './CalculatorService';
import { CalculatorInputDTO } from '../types/calculatorDTOs';
import { EmployeeIndividualDiagnosis } from '../types/spreadsheet';

export interface RawEmployeeData {
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
 * Service responsible for computing individual multidimensional IIM scores
 * for 100% of employees present in an imported corporate dataset.
 */
export class IndividualIimCalculator {
  /**
   * Calculates individual IIM diagnosis for a single employee record.
   *
   * @param emp - The employee record extracted from the spreadsheet.
   * @param companySalarioMedio - Baseline salary used for transport cost ratio.
   * @returns Comprehensive individual diagnosis with dimensional scores.
   */
  public static calculateSingle(
    emp: RawEmployeeData,
    companySalarioMedio: number = 3800
  ): EmployeeIndividualDiagnosis {
    const toLikert0to4 = (val1to5: number): '0' | '1' | '2' | '3' | '4' => {
      const clamped = Math.min(Math.max(Math.round(val1to5 - 1), 0), 4);
      return String(clamped) as '0' | '1' | '2' | '3' | '4';
    };

    const isPublicTransit = /onibus|metro|transporte\s*p[uú]blico/i.test(emp.modal);
    const isCarOrMoto = /carro|moto/i.test(emp.modal);
    const isBikeOrFoot = /bike|bici|pe|ativo/i.test(emp.modal);

    const modalDTO: 'onibus' | 'metro' | 'carro' | 'moto' | 'bici' | 'pe' | 'app' | 'misto' =
      isPublicTransit ? 'onibus' : isCarOrMoto ? 'carro' : isBikeOrFoot ? 'bici' : 'misto';

    // Map single employee answers to CalculatorInputDTO format
    const empInput: CalculatorInputDTO = {
      empresa_nome: 'Diagnóstico Individual',
      empresa_setor: 'servicos',
      empresa_regime: 'presencial',
      empresa_contrato: 'clt',
      empresa_flex: 'parcial',
      empresa_turno: 'diurno',
      empresa_local: 'intermediaria',
      empresa_total: 100,
      empresa_presencial_qtd: 100,
      empresa_turnover: 20,
      empresa_burnout: 5,
      empresa_salario_medio: companySalarioMedio,
      empresa_faturamento: 500000,
      empresa_beneficios: ['vt'],
      empresa_ciclista: 'nao',

      func_cargo: 'operacional',
      func_presenca: 'obrigatorio',
      func_salario: companySalarioMedio,
      func_reposicao: '1.0',

      // D1 Trajeto
      d1_tempo: emp.tempoTrajetoMin,
      d1_dist: emp.distanciaKm || Math.round(emp.tempoTrajetoMin * 0.35),
      d1_modal: modalDTO,
      d1_dias: '5',
      d1_bald: emp.tempoTrajetoMin >= 80 ? '2' : emp.tempoTrajetoMin >= 45 ? '1' : '0',
      d1_espera: Math.round(emp.tempoTrajetoMin * 0.22),
      d1_variacao: 50,
      d1_custo: Math.round(companySalarioMedio * (emp.gastoPct / 100)),
      d1_vt: 'sim',

      // D2 Estresse
      d2_cansaco: Math.min(Math.round((emp.estresse / 5) * 85), 100),
      d2_estresse: toLikert0to4(emp.estresse),
      d2_conc: Math.min(Math.round((emp.estresse / 5) * 60), 100),
      d2_qual: Math.max(Math.round(100 - (emp.estresse / 5) * 60), 15),
      d2_sono: toLikert0to4(emp.sono),
      d2_desconforto: toLikert0to4(emp.estresse),
      d2_lazer: (emp.estresse >= 3.5 ? '4' : emp.estresse >= 2 ? '2' : '0') as '0' | '2' | '4',
      d2_ansiedade: toLikert0to4(emp.estresse),
      d2_energia: toLikert0to4(emp.estresse),

      // D3 Pontualidade
      d3_atrasos: emp.atrasosMes,
      d3_faltas: Math.max(0, Math.round(emp.atrasosMes * 0.25)),
      d3_recusa: (emp.estresse >= 3.5 ? '4' : emp.estresse >= 2 ? '2' : '0') as '0' | '2' | '4',
      d3_licencas: Math.max(0, Math.round(emp.atrasosMes * 0.15)),
      d3_contrib: (emp.estresse >= 3.5 ? '4' : emp.estresse >= 2.5 ? '3' : '1') as '0' | '1' | '3' | '4',
      d3_homeoff: '2',
      d3_limite: '2',
      d3_saicedo: '1',
      d3_intencao: (emp.riscoDemissao >= 3.5 ? '4' : emp.riscoDemissao >= 2.5 ? '3' : emp.riscoDemissao >= 1.5 ? '1' : '0') as '0' | '1' | '3' | '4',

      // D4 Vulnerabilidade
      d4_bairro: 'Região Metropolitana',
      d4_ponto: Math.round(Math.min(Math.max(emp.tempoTrajetoMin * 0.12, 5), 25)),
      d4_dep: (isPublicTransit ? '3' : '1') as '0' | '1' | '3' | '4',
      d4_seg: isPublicTransit ? 35 : 65,
      d4_app: '1',
      d4_risco: isPublicTransit ? ['1', '3'] : ['0'],
      d4_violencia: (isPublicTransit ? '2' : '0') as '0' | '2' | '4',
      d4_vuln: isPublicTransit ? 65 : 30,
      d4_tp_qual: (isPublicTransit ? '3' : '1') as '0' | '1' | '3' | '4'
    };

    const dimScores = CalculatorService.calculateDimensionalScores(empInput);
    const iimResult = CalculatorService.calculateIimScore(dimScores);

    const iim = iimResult.iimRounded;
    let riskLevel: 'baixo' | 'moderado' | 'alto' | 'critico' = 'baixo';

    if (iim > 80) {
      riskLevel = 'critico';
    } else if (iim > 60) {
      riskLevel = 'alto';
    } else if (iim > 40) {
      riskLevel = 'moderado';
    }

    return {
      id: emp.id,
      setor: emp.setor,
      cargo: emp.cargo,
      tempoTrajetoMin: emp.tempoTrajetoMin,
      distanciaKm: emp.distanciaKm,
      estresse: emp.estresse,
      sono: emp.sono,
      atrasosMes: emp.atrasosMes,
      riscoDemissao: emp.riscoDemissao,
      modal: emp.modal,
      gastoPct: emp.gastoPct,
      d1Score: Math.round(dimScores.d1Norm),
      d2Score: Math.round(dimScores.d2Norm),
      d3Score: Math.round(dimScores.d3Norm),
      d4Score: Math.round(dimScores.d4Norm),
      iimScore: iim,
      classification: iimResult.classificacao,
      classificationColor: iimResult.classColor,
      classificationBg: iimResult.classBg,
      riskLevel
    };
  }

  /**
   * Processes all rows in the dataset, calculating the individual IIM for 100% of employees.
   *
   * @param employees - Array of raw employee records.
   * @param companySalarioMedio - Company baseline average wage.
   * @returns Array of individual diagnoses for all employees without truncation.
   */
  public static calculateAll(
    employees: RawEmployeeData[],
    companySalarioMedio: number = 3800
  ): EmployeeIndividualDiagnosis[] {
    console.info(`[IndividualIimCalculator] Step started: Calculating individual IIM for ${employees.length} employees (100% of dataset)`);

    const results: EmployeeIndividualDiagnosis[] = [];

    for (let i = 0; i < employees.length; i++) {
      const diagnosis = this.calculateSingle(employees[i], companySalarioMedio);
      results.push(diagnosis);
    }

    console.info(`[IndividualIimCalculator] Step concluded: Processed ${results.length} individual employee diagnoses`);
    return results;
  }

  /**
   * Generates and triggers download of a CSV file containing all individual employee IIM diagnoses.
   *
   * @param diagnoses - All computed diagnoses.
   * @param companyName - Name of the client company.
   */
  public static exportToCsv(diagnoses: EmployeeIndividualDiagnosis[], companyName: string): void {
    const headers = [
      'id_colaborador',
      'setor',
      'cargo',
      'tempo_trajeto_min',
      'distancia_km',
      'modal_predominante',
      'estresse_1a5',
      'sono_1a5',
      'atrasos_mes',
      'risco_demissao_1a5',
      'gasto_transporte_pct',
      'd1_trajeto_score',
      'd2_estresse_score',
      'd3_pontualidade_score',
      'd4_vulnerabilidade_score',
      'iim_individual_score',
      'classificacao_iim',
      'nivel_risco'
    ].join(',');

    const lines = diagnoses.map((d) =>
      [
        `"${d.id}"`,
        `"${d.setor}"`,
        `"${d.cargo}"`,
        d.tempoTrajetoMin,
        d.distanciaKm,
        `"${d.modal}"`,
        d.estresse,
        d.sono,
        d.atrasosMes,
        d.riscoDemissao,
        d.gastoPct,
        d.d1Score,
        d.d2Score,
        d.d3Score,
        d.d4Score,
        d.iimScore,
        `"${d.classification}"`,
        `"${d.riskLevel}"`
      ].join(',')
    );

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + encodeURIComponent([headers, ...lines].join('\n'));
    const safeName = companyName.toLowerCase().replace(/[^a-z0-9]/g, '_');
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', csvContent);
    downloadAnchor.setAttribute('download', `iim_individual_colaboradores_${safeName || 'diagnostico'}.csv`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    document.body.removeChild(downloadAnchor);
  }
}
