from datetime import datetime
from typing import Any, Dict, List, Optional, Union
from pydantic import BaseModel, Field, field_validator


class EmpresaInputDTO(BaseModel):
    empresa_nome: str = Field(..., description="Nome da empresa diagnosticada")
    empresa_setor: str = Field(..., description="Setor de atuação da empresa")
    empresa_regime: Optional[str] = "presencial"
    empresa_contrato: Optional[str] = "clt"
    empresa_flex: Optional[str] = "nao"
    empresa_turno: Optional[str] = "diurno"
    empresa_local: Optional[str] = "centro"
    empresa_total: Optional[Union[int, str]] = None
    empresa_presencial_qtd: Optional[Union[int, str]] = None
    empresa_turnover: Optional[Union[float, str]] = None
    empresa_burnout: Optional[Union[float, str]] = None
    empresa_faturamento: Optional[Union[float, str]] = None
    empresa_salario_medio: Optional[Union[float, str]] = None
    empresa_beneficios: Optional[Union[str, List[str]]] = "vt"
    empresa_ciclista: Optional[str] = "nao"

    @field_validator("empresa_beneficios", mode="before")
    def clean_beneficios(cls, v):
        if isinstance(v, list):
            return ",".join([str(item) for item in v if item])
        return v

    @field_validator(
        "empresa_total", "empresa_presencial_qtd", "empresa_turnover",
        "empresa_burnout", "empresa_faturamento", "empresa_salario_medio",
        mode="before"
    )
    def clean_numeric(cls, v):
        if v == "" or v is None:
            return None
        try:
            return float(v) if isinstance(v, (int, float, str)) else None
        except (ValueError, TypeError):
            return None


class ColaboradorInputDTO(BaseModel):
    func_cargo: Optional[str] = "operacional"
    func_presenca: Optional[str] = "obrigatorio"
    func_salario: Optional[Union[float, str]] = None
    func_reposicao: Optional[Union[float, str]] = None

    @field_validator("func_salario", "func_reposicao", mode="before")
    def clean_numeric(cls, v):
        if v == "" or v is None:
            return None
        try:
            return float(v)
        except (ValueError, TypeError):
            return None


class D1TrajetoInputDTO(BaseModel):
    d1_tempo: Optional[Union[float, int, str]] = None
    d1_dist: Optional[Union[float, int, str]] = None
    d1_modal: Optional[str] = "onibus"
    d1_dias: Optional[Union[int, str]] = 5
    d1_bald: Optional[Union[int, str]] = 0
    d1_espera: Optional[Union[float, int, str]] = None
    d1_variacao: Optional[Union[float, int, str]] = 15
    d1_custo: Optional[Union[float, int, str]] = None
    d1_vt: Optional[str] = "sim"

    @field_validator("d1_tempo", "d1_dist", "d1_dias", "d1_bald", "d1_espera", "d1_variacao", "d1_custo", mode="before")
    def clean_numeric(cls, v):
        if v == "" or v is None:
            return None
        try:
            return float(v)
        except (ValueError, TypeError):
            return None


class D2EstresseInputDTO(BaseModel):
    d2_cansaco: Optional[Union[float, int, str]] = 2
    d2_estresse: Optional[Union[int, str]] = 2
    d2_conc: Optional[Union[float, int, str]] = 2
    d2_qual: Optional[Union[float, int, str]] = 2
    d2_sono: Optional[Union[int, str]] = 2
    d2_desconforto: Optional[Union[int, str]] = 2
    d2_lazer: Optional[Union[int, str]] = 0
    d2_ansiedade: Optional[Union[int, str]] = 2
    d2_energia: Optional[Union[int, str]] = 2

    @field_validator("d2_cansaco", "d2_estresse", "d2_conc", "d2_qual", "d2_sono", "d2_desconforto", "d2_lazer", "d2_ansiedade", "d2_energia", mode="before")
    def clean_numeric(cls, v):
        if v == "" or v is None:
            return 0
        try:
            return float(v)
        except (ValueError, TypeError):
            return 0


class D3PontualidadeInputDTO(BaseModel):
    d3_atrasos: Optional[Union[float, int, str]] = 0
    d3_faltas: Optional[Union[float, int, str]] = 0
    d3_recusa: Optional[Union[int, str]] = 0
    d3_licencas: Optional[Union[float, int, str]] = 0
    d3_contrib: Optional[Union[int, str]] = 0
    d3_homeoff: Optional[Union[int, str]] = 0
    d3_limite: Optional[Union[int, str]] = 0
    d3_saicedo: Optional[Union[int, str]] = 0
    d3_intencao: Optional[Union[int, str]] = 0

    @field_validator("d3_atrasos", "d3_faltas", "d3_recusa", "d3_licencas", "d3_contrib", "d3_homeoff", "d3_limite", "d3_saicedo", "d3_intencao", mode="before")
    def clean_numeric(cls, v):
        if v == "" or v is None:
            return 0
        try:
            return float(v)
        except (ValueError, TypeError):
            return 0


class D4VulnerabilidadeInputDTO(BaseModel):
    d4_bairro: Optional[str] = ""
    d4_ponto: Optional[Union[float, int, str]] = None
    d4_dep: Optional[Union[int, str]] = 0
    d4_seg: Optional[Union[float, int, str]] = 2
    d4_app: Optional[Union[int, str]] = 0
    d4_risco: Optional[Union[str, int, List[Union[str, int]]]] = "0"
    d4_violencia: Optional[Union[int, str]] = 0
    d4_vuln: Optional[Union[float, int, str]] = 2
    d4_tp_qual: Optional[Union[int, str]] = 0

    @field_validator("d4_risco", mode="before")
    def clean_d4_risco(cls, v):
        if isinstance(v, list):
            return ",".join([str(item) for item in v if item is not None])
        if v == "" or v is None:
            return "0"
        return str(v)

    @field_validator("d4_ponto", "d4_dep", "d4_seg", "d4_app", "d4_violencia", "d4_vuln", "d4_tp_qual", mode="before")
    def clean_numeric(cls, v):
        if v == "" or v is None:
            return 0
        try:
            return float(v)
        except (ValueError, TypeError):
            return 0


class RespostasCalculadoraDTO(
    EmpresaInputDTO,
    ColaboradorInputDTO,
    D1TrajetoInputDTO,
    D2EstresseInputDTO,
    D3PontualidadeInputDTO,
    D4VulnerabilidadeInputDTO
):
    """Aggregate model representing all user answers entered into the wizard steps."""
    pass


class DimensoesScoreDTO(BaseModel):
    d1Raw: Optional[float] = 0.0
    d1Norm: Optional[float] = 0.0
    d2Raw: Optional[float] = 0.0
    d2Norm: Optional[float] = 0.0
    d3Raw: Optional[float] = 0.0
    d3Norm: Optional[float] = 0.0
    d4Raw: Optional[float] = 0.0
    d4Norm: Optional[float] = 0.0


class FinanceiroResultDTO(BaseModel):
    custoBrutoMensal: Optional[float] = 0.0
    perdaProdutividadeMensal: Optional[float] = 0.0
    presenteismoMensal: Optional[float] = 0.0
    custoTurnoverReposicao: Optional[float] = 0.0
    custoImpactoTotalMensal: Optional[float] = 0.0


class ProjecaoEmpresaDTO(BaseModel):
    totalPresencial: Optional[float] = 0.0
    impactoEmpresaMensal: Optional[float] = 0.0
    impactoEmpresaAnual: Optional[float] = 0.0
    faturamentoAnual: Optional[float] = 0.0
    percentualFaturamento: Optional[str] = "0.00"


class ResultadoCalculadoraDTO(BaseModel):
    iim: float = Field(..., description="Pontuação final calculada do IIM (0 a 100)")
    classificacao: str = Field(..., description="Faixa de criticidade (Baixo, Moderado, Alto, Crítico)")
    dimensoes: Optional[DimensoesScoreDTO] = None
    financeiro: Optional[FinanceiroResultDTO] = None
    projecaoEmpresa: Optional[ProjecaoEmpresaDTO] = None


class DiagnosticoCreateDTO(BaseModel):
    """
    Main payload DTO received from the frontend calculator.
    Contains both raw responses and calculated results.
    """
    respostas: RespostasCalculadoraDTO
    resultado: ResultadoCalculadoraDTO
    metadata: Optional[Dict[str, Any]] = None


class DiagnosticoResponseDTO(BaseModel):
    id: int
    created_at: datetime
    empresa_nome: str
    empresa_setor: str
    iim_score: float
    iim_classificacao: str
    d1_score_norm: Optional[float] = None
    d2_score_norm: Optional[float] = None
    d3_score_norm: Optional[float] = None
    d4_score_norm: Optional[float] = None
    custo_impacto_total_mensal: Optional[float] = None
    impacto_empresa_anual: Optional[float] = None

    class Config:
        from_attributes = True


class SetorEstatisticaDTO(BaseModel):
    setor: str
    total_empresas: int
    iim_medio: float
    custo_mensal_medio: float


class EstatisticasConsultoriaDTO(BaseModel):
    total_diagnosticos: int
    iim_medio_geral: float
    distribuicao_classificacao: Dict[str, int]
    media_dimensoes_normalizadas: Dict[str, float]
    tempo_medio_trajeto_minutos: float
    distancia_media_km: float
    modais_mais_utilizados: Dict[str, int]
    estatisticas_por_setor: List[SetorEstatisticaDTO]
    impacto_financeiro_acumulado_mensal: float
    impacto_financeiro_acumulado_anual: float
