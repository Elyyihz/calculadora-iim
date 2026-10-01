/**
 * Service for communicating with the FastAPI backend REST API.
 * Provides endpoints for persisting diagnoses and fetching statistical insights.
 */

import { CalculatorInputDTO, FullIimDiagnosis } from '../types/calculatorDTOs';

const API_BASE_URL = ((import.meta as any).env?.VITE_API_URL as string) || 'http://localhost:8000/api';

export interface DiagnosticoSalvo {
  id: number;
  created_at: string;
  empresa_nome: string;
  empresa_setor: string;
  iim_score: number;
  iim_classificacao: string;
  d1_score_norm?: number;
  d2_score_norm?: number;
  d3_score_norm?: number;
  d4_score_norm?: number;
  custo_impacto_total_mensal?: number;
  impacto_empresa_anual?: number;
}

export interface EstatisticasConsultoria {
  total_diagnosticos: number;
  iim_medio_geral: number;
  distribuicao_classificacao: Record<string, number>;
  media_dimensoes_normalizadas: Record<string, number>;
  tempo_medio_trajeto_minutos: number;
  distancia_media_km: number;
  modais_mais_utilizados: Record<string, number>;
  estatisticas_por_setor: Array<{
    setor: string;
    total_empresas: number;
    iim_medio: number;
    custo_mensal_medio: number;
  }>;
  impacto_financeiro_acumulado_mensal: number;
  impacto_financeiro_acumulado_anual: number;
}

export interface SaveDiagnosisResult {
  success: boolean;
  data?: DiagnosticoSalvo;
  error?: string;
}

export const apiService = {
  /**
   * Salva o diagnóstico completo na base de dados de consultoria
   */
  async salvarDiagnostico(
    respostas: CalculatorInputDTO,
    resultado: FullIimDiagnosis
  ): Promise<SaveDiagnosisResult> {
    try {
      const response = await fetch(`${API_BASE_URL}/diagnosticos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          respostas,
          resultado,
          metadata: {
            origem: 'Calculadora IIM Web v3.0',
            data_envio: new Date().toISOString()
          }
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          errorData?.detail || `Falha no servidor (${response.status}: ${response.statusText})`
        );
      }

      const data: DiagnosticoSalvo = await response.json();
      return { success: true, data };
    } catch (err: any) {
      return {
        success: false,
        error: err.message || 'Não foi possível conectar ao servidor de API.'
      };
    }
  },

  /**
   * Consulta os dados estatísticos agregados para benchmarking de consultoria
   */
  async obterEstatisticas(): Promise<{ success: boolean; data?: EstatisticasConsultoria; error?: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/estatisticas`);
      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }
      const data: EstatisticasConsultoria = await response.json();
      return { success: true, data };
    } catch (err: any) {
      return {
        success: false,
        error: err.message || 'Erro ao carregar estatísticas de mobilidade.'
      };
    }
  },

  /**
   * Lista os diagnósticos armazenados na base
   */
  async listarDiagnosticos(
    filtros?: { setor?: string; classificacao?: string }
  ): Promise<{ success: boolean; data?: DiagnosticoSalvo[]; error?: string }> {
    try {
      const params = new URLSearchParams();
      if (filtros?.setor) params.append('setor', filtros.setor);
      if (filtros?.classificacao) params.append('classificacao', filtros.classificacao);

      const url = `${API_BASE_URL}/diagnosticos${params.toString() ? `?${params.toString()}` : ''}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }
      const data: DiagnosticoSalvo[] = await response.json();
      return { success: true, data };
    } catch (err: any) {
      return {
        success: false,
        error: err.message || 'Erro ao listar diagnósticos.'
      };
    }
  }
};
