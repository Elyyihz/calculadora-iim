import json
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from sqlalchemy import func

from ..database import get_db
from ..models import DiagnosticoIIM
from ..schemas import (
    DiagnosticoCreateDTO,
    DiagnosticoResponseDTO,
    EstatisticasConsultoriaDTO,
    SetorEstatisticaDTO
)

router = APIRouter(prefix="/api", tags=["Diagnósticos IIM"])


@router.post(
    "/diagnosticos",
    response_model=DiagnosticoResponseDTO,
    status_code=status.HTTP_201_CREATED,
    summary="Armazenar novo diagnóstico de mobilidade IIM"
)
def criar_diagnostico(
    payload: DiagnosticoCreateDTO,
    db: Session = Depends(get_db)
):
    """
    Recebe as respostas do formulário da calculadora e os resultados do IIM calculados,
    persistindo-os na base de dados relacional para apoiar a consultoria e alimentar
    indicadores estatísticos organizacionais.
    """
    resp = payload.respostas
    res = payload.resultado

    # Extrai métricas dimensionais e financeiras de forma segura
    d1_norm = res.dimensoes.d1Norm if res.dimensoes else None
    d2_norm = res.dimensoes.d2Norm if res.dimensoes else None
    d3_norm = res.dimensoes.d3Norm if res.dimensoes else None
    d4_norm = res.dimensoes.d4Norm if res.dimensoes else None

    custo_bruto = res.financeiro.custoBrutoMensal if res.financeiro else None
    perda_prod = res.financeiro.perdaProdutividadeMensal if res.financeiro else None
    presenteismo = res.financeiro.presenteismoMensal if res.financeiro else None
    custo_turnover = res.financeiro.custoTurnoverReposicao if res.financeiro else None
    custo_total = res.financeiro.custoImpactoTotalMensal if res.financeiro else None
    impacto_anual = res.projecaoEmpresa.impactoEmpresaAnual if res.projecaoEmpresa else None

    # Serializa payload completo para auditoria ou evolução futura
    payload_json = json.dumps(payload.model_dump(), default=str)

    novo_diagnostico = DiagnosticoIIM(
        # 1. Empresa
        empresa_nome=resp.empresa_nome,
        empresa_setor=resp.empresa_setor,
        empresa_regime=resp.empresa_regime,
        empresa_contrato=resp.empresa_contrato,
        empresa_flex=resp.empresa_flex,
        empresa_turno=resp.empresa_turno,
        empresa_local=resp.empresa_local,
        empresa_total=int(resp.empresa_total) if resp.empresa_total is not None else None,
        empresa_presencial_qtd=int(resp.empresa_presencial_qtd) if resp.empresa_presencial_qtd is not None else None,
        empresa_turnover=resp.empresa_turnover,
        empresa_burnout=resp.empresa_burnout,
        empresa_faturamento=resp.empresa_faturamento,
        empresa_salario_medio=resp.empresa_salario_medio,
        empresa_beneficios=resp.empresa_beneficios,
        empresa_ciclista=resp.empresa_ciclista,

        # 2. Colaborador
        func_cargo=resp.func_cargo,
        func_presenca=resp.func_presenca,
        func_salario=resp.func_salario,
        func_reposicao=resp.func_reposicao,

        # 3. D1
        d1_tempo=resp.d1_tempo,
        d1_dist=resp.d1_dist,
        d1_modal=resp.d1_modal,
        d1_dias=int(resp.d1_dias) if resp.d1_dias is not None else None,
        d1_bald=int(resp.d1_bald) if resp.d1_bald is not None else None,
        d1_espera=resp.d1_espera,
        d1_variacao=resp.d1_variacao,
        d1_custo=resp.d1_custo,
        d1_vt=resp.d1_vt,

        # 4. D2
        d2_cansaco=resp.d2_cansaco,
        d2_estresse=int(resp.d2_estresse) if resp.d2_estresse is not None else None,
        d2_conc=resp.d2_conc,
        d2_qual=resp.d2_qual,
        d2_sono=int(resp.d2_sono) if resp.d2_sono is not None else None,
        d2_desconforto=int(resp.d2_desconforto) if resp.d2_desconforto is not None else None,
        d2_lazer=int(resp.d2_lazer) if resp.d2_lazer is not None else None,
        d2_ansiedade=int(resp.d2_ansiedade) if resp.d2_ansiedade is not None else None,
        d2_energia=int(resp.d2_energia) if resp.d2_energia is not None else None,

        # 5. D3
        d3_atrasos=resp.d3_atrasos,
        d3_faltas=resp.d3_faltas,
        d3_recusa=int(resp.d3_recusa) if resp.d3_recusa is not None else None,
        d3_licencas=resp.d3_licencas,
        d3_contrib=int(resp.d3_contrib) if resp.d3_contrib is not None else None,
        d3_homeoff=int(resp.d3_homeoff) if resp.d3_homeoff is not None else None,
        d3_limite=int(resp.d3_limite) if resp.d3_limite is not None else None,
        d3_saicedo=int(resp.d3_saicedo) if resp.d3_saicedo is not None else None,
        d3_intencao=int(resp.d3_intencao) if resp.d3_intencao is not None else None,

        # 6. D4
        d4_bairro=resp.d4_bairro,
        d4_ponto=resp.d4_ponto,
        d4_dep=int(resp.d4_dep) if resp.d4_dep is not None else None,
        d4_seg=resp.d4_seg,
        d4_app=int(resp.d4_app) if resp.d4_app is not None else None,
        d4_risco=str(resp.d4_risco) if resp.d4_risco is not None else None,
        d4_violencia=int(resp.d4_violencia) if resp.d4_violencia is not None else None,
        d4_vuln=resp.d4_vuln,
        d4_tp_qual=int(resp.d4_tp_qual) if resp.d4_tp_qual is not None else None,

        # 7. Resultados
        iim_score=round(res.iim, 1),
        iim_classificacao=res.classificacao,
        d1_score_norm=round(d1_norm, 1) if d1_norm is not None else None,
        d2_score_norm=round(d2_norm, 1) if d2_norm is not None else None,
        d3_score_norm=round(d3_norm, 1) if d3_norm is not None else None,
        d4_score_norm=round(d4_norm, 1) if d4_norm is not None else None,

        # 8. Financeiro
        custo_bruto_mensal=round(custo_bruto, 2) if custo_bruto is not None else None,
        perda_produtividade_mensal=round(perda_prod, 2) if perda_prod is not None else None,
        presenteismo_mensal=round(presenteismo, 2) if presenteismo is not None else None,
        custo_turnover_reposicao=round(custo_turnover, 2) if custo_turnover is not None else None,
        custo_impacto_total_mensal=round(custo_total, 2) if custo_total is not None else None,
        impacto_empresa_anual=round(impacto_anual, 2) if impacto_anual is not None else None,

        # 9. Json completo
        payload_completo=payload_json
    )

    db.add(novo_diagnostico)
    db.commit()
    db.refresh(novo_diagnostico)

    return novo_diagnostico


@router.get(
    "/diagnosticos",
    response_model=List[DiagnosticoResponseDTO],
    summary="Listar diagnósticos armazenados"
)
def listar_diagnosticos(
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=200),
    setor: Optional[str] = None,
    classificacao: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """
    Retorna a lista paginada de diagnósticos cadastrados, com opção de filtro
    por setor e por faixa de criticidade do IIM.
    """
    query = db.query(DiagnosticoIIM)
    if setor:
        query = query.filter(DiagnosticoIIM.empresa_setor == setor)
    if classificacao:
        query = query.filter(DiagnosticoIIM.iim_classificacao == classificacao)

    return query.order_by(DiagnosticoIIM.id.desc()).offset(skip).limit(limit).all()


@router.get(
    "/diagnosticos/{diagnostico_id}",
    response_model=DiagnosticoResponseDTO,
    summary="Obter detalhes de um diagnóstico por ID"
)
def obter_diagnostico(
    diagnostico_id: int,
    db: Session = Depends(get_db)
):
    diagnostico = db.query(DiagnosticoIIM).filter(DiagnosticoIIM.id == diagnostico_id).first()
    if not diagnostico:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Diagnóstico #{diagnostico_id} não encontrado."
        )
    return diagnostico


@router.get(
    "/estatisticas",
    response_model=EstatisticasConsultoriaDTO,
    summary="Extração estatística agregada para inteligência de consultoria"
)
def extrair_estatisticas(db: Session = Depends(get_db)):
    """
    Agrega os dados de mobilidade corporativa de todos os diagnósticos armazenados:
    - Média do IIM e distribuição por faixa de risco
    - Médias das 4 dimensões (D1 a D4)
    - Tempo e distância médios de deslocamento
    - Modais de transporte predominantes
    - Agrupamento por setor econômico com impacto financeiro médio
    """
    total = db.query(func.count(DiagnosticoIIM.id)).scalar() or 0

    if total == 0:
        return EstatisticasConsultoriaDTO(
            total_diagnosticos=0,
            iim_medio_geral=0.0,
            distribuicao_classificacao={"Baixo": 0, "Moderado": 0, "Alto": 0, "Crítico": 0},
            media_dimensoes_normalizadas={"D1": 0.0, "D2": 0.0, "D3": 0.0, "D4": 0.0},
            tempo_medio_trajeto_minutos=0.0,
            distancia_media_km=0.0,
            modais_mais_utilizados={},
            estatisticas_por_setor=[],
            impacto_financeiro_acumulado_mensal=0.0,
            impacto_financeiro_acumulado_anual=0.0
        )

    # 1. Médias gerais
    iim_medio = db.query(func.avg(DiagnosticoIIM.iim_score)).scalar() or 0.0
    d1_medio = db.query(func.avg(DiagnosticoIIM.d1_score_norm)).scalar() or 0.0
    d2_medio = db.query(func.avg(DiagnosticoIIM.d2_score_norm)).scalar() or 0.0
    d3_medio = db.query(func.avg(DiagnosticoIIM.d3_score_norm)).scalar() or 0.0
    d4_medio = db.query(func.avg(DiagnosticoIIM.d4_score_norm)).scalar() or 0.0

    tempo_medio = db.query(func.avg(DiagnosticoIIM.d1_tempo)).scalar() or 0.0
    dist_media = db.query(func.avg(DiagnosticoIIM.d1_dist)).scalar() or 0.0

    # 2. Distribuição por classificação
    dist_raw = (
        db.query(DiagnosticoIIM.iim_classificacao, func.count(DiagnosticoIIM.id))
        .group_by(DiagnosticoIIM.iim_classificacao)
        .all()
    )
    distribuicao_map = {"Baixo": 0, "Moderado": 0, "Alto": 0, "Crítico": 0}
    for faixa, count in dist_raw:
        if faixa in distribuicao_map:
            distribuicao_map[faixa] = count
        else:
            distribuicao_map[faixa] = count

    # 3. Modais mais utilizados
    modais_raw = (
        db.query(DiagnosticoIIM.d1_modal, func.count(DiagnosticoIIM.id))
        .filter(DiagnosticoIIM.d1_modal.isnot(None))
        .group_by(DiagnosticoIIM.d1_modal)
        .all()
    )
    modais_map = {str(modal): count for modal, count in modais_raw}

    # 4. Estatísticas por setor
    setores_raw = (
        db.query(
            DiagnosticoIIM.empresa_setor,
            func.count(DiagnosticoIIM.id),
            func.avg(DiagnosticoIIM.iim_score),
            func.avg(DiagnosticoIIM.custo_impacto_total_mensal)
        )
        .group_by(DiagnosticoIIM.empresa_setor)
        .all()
    )
    setores_list = [
        SetorEstatisticaDTO(
            setor=str(setor or "Não informado"),
            total_empresas=cnt,
            iim_medio=round(float(avg_iim or 0.0), 1),
            custo_mensal_medio=round(float(avg_custo or 0.0), 2)
        )
        for setor, cnt, avg_iim, avg_custo in setores_raw
    ]

    # 5. Impacto financeiro acumulado
    total_mensal = db.query(func.sum(DiagnosticoIIM.custo_impacto_total_mensal)).scalar() or 0.0
    total_anual = db.query(func.sum(DiagnosticoIIM.impacto_empresa_anual)).scalar() or 0.0

    return EstatisticasConsultoriaDTO(
        total_diagnosticos=total,
        iim_medio_geral=round(float(iim_medio), 1),
        distribuicao_classificacao=distribuicao_map,
        media_dimensoes_normalizadas={
            "D1": round(float(d1_medio), 1),
            "D2": round(float(d2_medio), 1),
            "D3": round(float(d3_medio), 1),
            "D4": round(float(d4_medio), 1)
        },
        tempo_medio_trajeto_minutos=round(float(tempo_medio), 1),
        distancia_media_km=round(float(dist_media), 1),
        modais_mais_utilizados=modais_map,
        estatisticas_por_setor=setores_list,
        impacto_financeiro_acumulado_mensal=round(float(total_mensal), 2),
        impacto_financeiro_acumulado_anual=round(float(total_anual), 2)
    )


@router.delete(
    "/diagnosticos/{diagnostico_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Remover um diagnóstico"
)
def deletar_diagnostico(
    diagnostico_id: int,
    db: Session = Depends(get_db)
):
    diagnostico = db.query(DiagnosticoIIM).filter(DiagnosticoIIM.id == diagnostico_id).first()
    if not diagnostico:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Diagnóstico #{diagnostico_id} não encontrado."
        )
    db.delete(diagnostico)
    db.commit()
    return None
