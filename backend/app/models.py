from datetime import datetime, timezone
from sqlalchemy import (
    Column,
    Integer,
    String,
    Float,
    DateTime,
    Text
)
from .database import Base


class DiagnosticoIIM(Base):
    """
    SQLAlchemy model representing a complete IIM mobility diagnosis.
    Stores all inputs, calculated dimensions, final IIM score, and financial metrics
    to facilitate deep statistical analysis for corporate mobility consulting.
    """
    __tablename__ = "diagnosticos_iim"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    created_at = Column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        nullable=False,
        index=True
    )

    # 1. Dados da Empresa
    empresa_nome = Column(String(255), nullable=False, index=True)
    empresa_setor = Column(String(100), nullable=False, index=True)
    empresa_regime = Column(String(50), nullable=True)
    empresa_contrato = Column(String(50), nullable=True)
    empresa_flex = Column(String(50), nullable=True)
    empresa_turno = Column(String(50), nullable=True)
    empresa_local = Column(String(50), nullable=True)
    empresa_total = Column(Integer, nullable=True)
    empresa_presencial_qtd = Column(Integer, nullable=True)
    empresa_turnover = Column(Float, nullable=True)
    empresa_burnout = Column(Float, nullable=True)
    empresa_faturamento = Column(Float, nullable=True)
    empresa_salario_medio = Column(Float, nullable=True)
    empresa_beneficios = Column(String(255), nullable=True)
    empresa_ciclista = Column(String(50), nullable=True)

    # 2. Perfil do Colaborador
    func_cargo = Column(String(100), nullable=True)
    func_presenca = Column(String(50), nullable=True)
    func_salario = Column(Float, nullable=True)
    func_reposicao = Column(Float, nullable=True)

    # 3. Dimensão 1 - Trajeto
    d1_tempo = Column(Float, nullable=True)        # minutos ida
    d1_dist = Column(Float, nullable=True)         # km ida
    d1_modal = Column(String(50), nullable=True, index=True)
    d1_dias = Column(Integer, nullable=True)
    d1_bald = Column(Integer, nullable=True)
    d1_espera = Column(Float, nullable=True)
    d1_variacao = Column(Float, nullable=True)
    d1_custo = Column(Float, nullable=True)
    d1_vt = Column(String(50), nullable=True)

    # 4. Dimensão 2 - Estresse & Saúde
    d2_cansaco = Column(Float, nullable=True)
    d2_estresse = Column(Integer, nullable=True)
    d2_conc = Column(Float, nullable=True)
    d2_qual = Column(Float, nullable=True)
    d2_sono = Column(Integer, nullable=True)
    d2_desconforto = Column(Integer, nullable=True)
    d2_lazer = Column(Integer, nullable=True)
    d2_ansiedade = Column(Integer, nullable=True)
    d2_energia = Column(Integer, nullable=True)

    # 5. Dimensão 3 - Pontualidade & Assiduidade
    d3_atrasos = Column(Float, nullable=True)
    d3_faltas = Column(Float, nullable=True)
    d3_recusa = Column(Integer, nullable=True)
    d3_licencas = Column(Float, nullable=True)
    d3_contrib = Column(Integer, nullable=True)
    d3_homeoff = Column(Integer, nullable=True)
    d3_limite = Column(Integer, nullable=True)
    d3_saicedo = Column(Integer, nullable=True)
    d3_intencao = Column(Integer, nullable=True)

    # 6. Dimensão 4 - Vulnerabilidade & Segurança
    d4_bairro = Column(String(255), nullable=True)
    d4_ponto = Column(Float, nullable=True)
    d4_dep = Column(Integer, nullable=True)
    d4_seg = Column(Float, nullable=True)
    d4_app = Column(Integer, nullable=True)
    d4_risco = Column(Integer, nullable=True)
    d4_violencia = Column(Integer, nullable=True)
    d4_vuln = Column(Float, nullable=True)
    d4_tp_qual = Column(Integer, nullable=True)

    # 7. Pontuações Calculadas do IIM
    iim_score = Column(Float, nullable=False, index=True)
    iim_classificacao = Column(String(50), nullable=False, index=True)
    d1_score_norm = Column(Float, nullable=True)
    d2_score_norm = Column(Float, nullable=True)
    d3_score_norm = Column(Float, nullable=True)
    d4_score_norm = Column(Float, nullable=True)

    # 8. Impacto Financeiro Calculado
    custo_bruto_mensal = Column(Float, nullable=True)
    perda_produtividade_mensal = Column(Float, nullable=True)
    presenteismo_mensal = Column(Float, nullable=True)
    custo_turnover_reposicao = Column(Float, nullable=True)
    custo_impacto_total_mensal = Column(Float, nullable=True)
    impacto_empresa_anual = Column(Float, nullable=True)

    # 9. Payload Integral (JSON serializado para auditoria ou extensibilidade)
    payload_completo = Column(Text, nullable=True)
