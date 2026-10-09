#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script de Geração do Manual de Uso da Aplicação UrbanFlow em PDF.
Utiliza ReportLab para gerar um documento corporativo profissional de alta fidelidade visual.
"""

import os
import sys
from datetime import datetime
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.units import cm, mm
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
    KeepTogether,
    HRFlowable,
    PageBreak
)
from reportlab.pdfgen import canvas

# Definição da Paleta de Cores da Marca UrbanFlow
COLOR_PRIMARY_DARK = colors.HexColor('#0B1924')
COLOR_SECONDARY_DARK = colors.HexColor('#133E28')
COLOR_ACCENT_GREEN = colors.HexColor('#2E9E5B')
COLOR_LIGHT_GREEN = colors.HexColor('#EBF8F0')
COLOR_BORDER_GREEN = colors.HexColor('#D5E2D9')
COLOR_BG_GRAY = colors.HexColor('#F8FAFC')
COLOR_TEXT_MAIN = colors.HexColor('#1E293B')
COLOR_TEXT_MUTED = colors.HexColor('#64748B')
COLOR_ALERT_RED = colors.HexColor('#DC2626')
COLOR_LIGHT_RED = colors.HexColor('#FEF2F2')
COLOR_BORDER_GRAY = colors.HexColor('#E2E8F0')


class NumberedCanvas(canvas.Canvas):
    """
    Canvas customizado que calcula o número total de páginas em dois passos,
    inserindo rodapé e cabeçalho dinâmicos e precisos em todas as páginas.
    """
    def __init__(self, *args, **kwargs):
        super(NumberedCanvas, self).__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super(NumberedCanvas, self).showPage()
        super(NumberedCanvas, self).save()

    def draw_page_decorations(self, page_count):
        self.saveState()
        width, height = A4

        # Página 1 (Capa) não recebe cabeçalho/rodapé padrão
        if self._pageNumber > 1:
            # Cabeçalho Superior
            self.setFont("Helvetica-Bold", 8)
            self.setFillColor(COLOR_SECONDARY_DARK)
            self.drawString(20 * mm, height - 14 * mm, "urbanflow")
            self.setFont("Helvetica", 8)
            self.setFillColor(COLOR_TEXT_MUTED)
            self.drawString(38 * mm, height - 14 * mm, "· Manual de Operação e Uso da Aplicação (v3.0)")

            self.setStrokeColor(COLOR_BORDER_GRAY)
            self.setLineWidth(0.5)
            self.line(20 * mm, height - 16 * mm, width - 20 * mm, height - 16 * mm)

            # Rodapé Inferior
            self.setStrokeColor(COLOR_BORDER_GRAY)
            self.setLineWidth(0.5)
            self.line(20 * mm, 16 * mm, width - 20 * mm, 16 * mm)

            self.setFont("Helvetica", 8)
            self.setFillColor(COLOR_TEXT_MUTED)
            self.drawString(20 * mm, 11 * mm, "Uso Interno e Confidencial · UrbanFlow Consultoria IIM")
            
            page_str = f"Página {self._pageNumber} de {page_count}"
            self.drawRightString(width - 20 * mm, 11 * mm, page_str)

        self.restoreState()


def build_manual_pdf(filename="manual_de_uso_urbanflow.pdf"):
    """
    Constrói o documento PDF com o manual completo da aplicação.
    """
    doc = SimpleDocTemplate(
        filename,
        pagesize=A4,
        leftMargin=20 * mm,
        rightMargin=20 * mm,
        topMargin=22 * mm,
        bottomMargin=22 * mm
    )

    styles = getSampleStyleSheet()

    # Tipografias e Estilos Customizados
    style_cover_brand = ParagraphStyle(
        'CoverBrand',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=24,
        textColor=COLOR_SECONDARY_DARK
    )

    style_cover_tag = ParagraphStyle(
        'CoverTag',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9,
        leading=12,
        textColor=COLOR_ACCENT_GREEN
    )

    style_cover_title = ParagraphStyle(
        'CoverTitle',
        parent=styles['Title'],
        fontName='Helvetica-Bold',
        fontSize=25,
        leading=30,
        textColor=COLOR_PRIMARY_DARK,
        alignment=0,
        spaceAfter=10
    )

    style_cover_subtitle = ParagraphStyle(
        'CoverSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=12,
        leading=18,
        textColor=COLOR_TEXT_MUTED,
        spaceAfter=20
    )

    style_h1 = ParagraphStyle(
        'Heading1_Custom',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=15,
        leading=19,
        textColor=COLOR_PRIMARY_DARK,
        spaceBefore=16,
        spaceAfter=8,
        keepWithNext=True
    )

    style_h2 = ParagraphStyle(
        'Heading2_Custom',
        parent=styles['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=11.5,
        leading=15,
        textColor=COLOR_SECONDARY_DARK,
        spaceBefore=12,
        spaceAfter=6,
        keepWithNext=True
    )

    style_body = ParagraphStyle(
        'Body_Custom',
        parent=styles['BodyText'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=14.5,
        textColor=COLOR_TEXT_MAIN,
        spaceAfter=7
    )

    style_bullet = ParagraphStyle(
        'Bullet_Custom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=13.5,
        textColor=COLOR_TEXT_MAIN,
        leftIndent=14,
        firstLineIndent=-10,
        spaceAfter=4
    )

    style_callout = ParagraphStyle(
        'Callout_Text',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=13,
        textColor=COLOR_TEXT_MAIN
    )

    style_code = ParagraphStyle(
        'Code_Custom',
        parent=styles['Normal'],
        fontName='Courier',
        fontSize=8,
        leading=11,
        textColor=COLOR_PRIMARY_DARK
    )

    style_table_cell = ParagraphStyle(
        'TableCell',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=11.5,
        textColor=COLOR_TEXT_MAIN
    )

    style_table_cell_bold = ParagraphStyle(
        'TableCellBold',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=11.5,
        textColor=COLOR_PRIMARY_DARK
    )

    story = []

    # =========================================================================
    # CAPA DO DOCUMENTO
    # =========================================================================
    story.append(Spacer(1, 15 * mm))
    story.append(Paragraph("urban<font color='#2E9E5B'>flow</font>", style_cover_brand))
    story.append(Spacer(1, 4 * mm))
    story.append(Paragraph("PEOPLE ANALYTICS & CONSULTORIA ESTRATÉGICA EM MOBILIDADE", style_cover_tag))
    story.append(Spacer(1, 8 * mm))
    story.append(HRFlowable(width="100%", thickness=2, color=COLOR_ACCENT_GREEN, spaceBefore=0, spaceAfter=15))
    story.append(Spacer(1, 6 * mm))

    story.append(Paragraph("MANUAL DE OPERAÇÃO E USO DA APLICAÇÃO", style_cover_title))
    story.append(Paragraph(
        "Guia completo de operação para a equipe interna da UrbanFlow. Abrange a separação de ambientes "
        "(Público vs. Privado), o formulário aprofundado de 36 perguntas, a ingestão em lote por planilha CSV "
        "com cálculo automático do IIM e a interpretação executiva dos resultados.",
        style_cover_subtitle
    ))

    # Box de Metadados da Capa
    meta_data = [
        [
            Paragraph("<b>Versão do Sistema:</b> v3.0 (Metodologia IIM)", style_callout),
            Paragraph(f"<b>Data de Publicação:</b> {datetime.now().strftime('%d/%m/%Y')}", style_callout)
        ],
        [
            Paragraph("<b>Ambiente Restrito:</b> <code>/interno/calculadora</code>", style_callout),
            Paragraph("<b>Público-Alvo:</b> Equipe Interna de Consultoria e Engenharia", style_callout)
        ],
        [
            Paragraph("<b>Credencial Padrão:</b> <code>urbanflow2026</code>", style_callout),
            Paragraph("<b>Status:</b> Operacional / Homologado", style_callout)
        ]
    ]
    t_meta = Table(meta_data, colWidths=[85 * mm, 85 * mm])
    t_meta.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), COLOR_BG_GRAY),
        ('BOX', (0, 0), (-1, -1), 1, COLOR_BORDER_GRAY),
        ('INNERGRID', (0, 0), (-1, -1), 0.5, COLOR_BORDER_GRAY),
        ('TOPPADDING', (0, 0), (-1, -1), 7),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 7),
        ('LEFTPADDING', (0, 0), (-1, -1), 10),
        ('RIGHTPADDING', (0, 0), (-1, -1), 10),
    ]))
    story.append(t_meta)

    story.append(Spacer(1, 20 * mm))

    # Box de Destaque / Aviso
    aviso_data = [[
        Paragraph(
            "<b>IMPORTANTE:</b> Este documento contém diretrizes internas confidenciais da UrbanFlow, incluindo "
            "a estrutura dos pesos das dimensões do IIM, a calibração financeira de turnover e presenteísmo, "
            "e instruções de manuseio de dados de funcionários em estrita conformidade com a LGPD.",
            style_callout
        )
    ]]
    t_aviso = Table(aviso_data, colWidths=[170 * mm])
    t_aviso.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), COLOR_LIGHT_GREEN),
        ('BOX', (0, 0), (-1, -1), 1, COLOR_BORDER_GREEN),
        ('TOPPADDING', (0, 0), (-1, -1), 9),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 9),
        ('LEFTPADDING', (0, 0), (-1, -1), 12),
        ('RIGHTPADDING', (0, 0), (-1, -1), 12),
    ]))
    story.append(t_aviso)

    story.append(PageBreak())

    # =========================================================================
    # SEÇÃO 1: VISÃO GERAL & METODOLOGIA IIM
    # =========================================================================
    story.append(Paragraph("1. Visão Geral e Metodologia Científica do IIM", style_h1))
    story.append(HRFlowable(width="100%", thickness=1, color=COLOR_ACCENT_GREEN, spaceBefore=2, spaceAfter=10))

    story.append(Paragraph(
        "A <b>UrbanFlow</b> é uma consultoria estratégica em People Analytics e Mobilidade Corporativa nascida da pesquisa "
        "aplicada em Engenharia de Produção e Ciência de Dados no centro universitário UNINASSAU, em Recife (PE). "
        "A plataforma tem por objetivo transformar deslocamentos urbanos diários em inteligência preditiva para tomadores de decisão.",
        style_body
    ))
    story.append(Paragraph(
        "O cerne da consultoria é o algoritmo proprietário do <b>Índice de Impacto de Mobilidade (IIM)</b>. O IIM sintetiza, em uma "
        "escala de 0 a 100 pontos, o grau de fricção urbana e desgaste vivenciado pelos colaboradores e mensura as perdas "
        "financeiras invisíveis suportadas pela organização (presenteísmo matinal, atrasos sistemáticos e rotatividade voluntária).",
        style_body
    ))

    story.append(Paragraph("As 4 Dimensões Integradas do IIM:", style_h2))

    dim_table_data = [
        [
            Paragraph("<b>Dimensão</b>", style_table_cell_bold),
            Paragraph("<b>Escopo de Análise</b>", style_table_cell_bold),
            Paragraph("<b>Fator de Impacto</b>", style_table_cell_bold)
        ],
        [
            Paragraph("<b>D1 · Trajeto & Deslocamento</b>", style_table_cell),
            Paragraph("Tempo em trânsito, distância física (km), quantidade de baldeações, tempo de espera em paradas e custo financeiro do modal.", style_table_cell),
            Paragraph("30% (Peso D1)", style_table_cell)
        ],
        [
            Paragraph("<b>D2 · Estresse & Fadiga</b>", style_table_cell),
            Paragraph("Exaustão percebida, ansiedade antes do expediente, privação e qualidade do sono, perda de foco e custo de transição cognitiva.", style_table_cell),
            Paragraph("27% (Peso D2)", style_table_cell)
        ],
        [
            Paragraph("<b>D3 · Pontualidade & Assiduidade</b>", style_table_cell),
            Paragraph("Frequência de atrasos por engarrafamento, faltas, recusas a eventos presenciais, licenças médicas e intenção declarada de demissão.", style_table_cell),
            Paragraph("25% (Peso D3)", style_table_cell)
        ],
        [
            Paragraph("<b>D4 · Vulnerabilidade & Bem-Estar</b>", style_table_cell),
            Paragraph("Insegurança em pontos de embarque, risco de assaltos/violência urbana, peso do transporte na renda líquida e qualidade da infraestrutura.", style_table_cell),
            Paragraph("18% (Peso D4)", style_table_cell)
        ]
    ]
    t_dim = Table(dim_table_data, colWidths=[42 * mm, 98 * mm, 30 * mm])
    t_dim.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), COLOR_BG_GRAY),
        ('BOX', (0, 0), (-1, -1), 0.5, COLOR_BORDER_GRAY),
        ('INNERGRID', (0, 0), (-1, -1), 0.5, COLOR_BORDER_GRAY),
        ('TOPPADDING', (0, 0), (-1, -1), 6),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
        ('LEFTPADDING', (0, 0), (-1, -1), 6),
        ('RIGHTPADDING', (0, 0), (-1, -1), 6),
    ]))
    story.append(t_dim)

    story.append(Spacer(1, 5 * mm))

    # =========================================================================
    # SEÇÃO 2: ARQUITETURA DE DOIS AMBIENTES
    # =========================================================================
    story.append(Paragraph("2. Arquitetura dos Ambientes: Público vs. Privado", style_h1))
    story.append(HRFlowable(width="100%", thickness=1, color=COLOR_ACCENT_GREEN, spaceBefore=2, spaceAfter=10))

    story.append(Paragraph(
        "A aplicação é estritamente particionada em dois ambientes distintos para separar o tráfego comercial externo "
        "das operações confidenciais da equipe interna:",
        style_body
    ))

    env_table_data = [
        [
            Paragraph("<b>Ambiente</b>", style_table_cell_bold),
            Paragraph("<b>Rota & Acesso</b>", style_table_cell_bold),
            Paragraph("<b>Funcionalidades Disponíveis</b>", style_table_cell_bold)
        ],
        [
            Paragraph("<b>Ambiente Público<br/>(Landing Page)</b>", style_table_cell),
            Paragraph("Rota: <code>/</code><br/>Acesso Aberto", style_table_cell),
            Paragraph(
                "• Apresentação institucional da marca UrbanFlow.<br/>"
                "• <b>Simulador Didático Interativo (4 perguntas):</b> gera resultado pedagógico preliminar "
                "para o visitante entender o conceito.<br/>"
                "• <b>Cases de Sucesso Fictícios:</b> 3 simulações corporativas representativas (Logística, Fintech e BPO).<br/>"
                "• FAQ explicativo e botões de contato via WhatsApp e e-mail.",
                style_table_cell
            )
        ],
        [
            Paragraph("<b>Ambiente Privado<br/>(Workspace Interno)</b>", style_table_cell),
            Paragraph("Rota: <code>/interno/calculadora</code><br/>Protegido por senha<br/><b>Senha:</b> <code>urbanflow2026</code>", style_table_cell),
            Paragraph(
                "• <b>Aba 1 · Questionário Passo a Passo (36 Perguntas):</b> formulário detalhado com todas as variáveis do modelo.<br/>"
                "• <b>Aba 2 · Alimentar via Planilha:</b> ingestão em lote de CSV com cálculo instantâneo do diagnóstico.<br/>"
                "• <b>Dashboard Executivo Completo:</b> Radar, finanças, simulação de ROI, projeção de 12 meses e impressão PDF.",
                style_table_cell
            )
        ]
    ]
    t_env = Table(env_table_data, colWidths=[38 * mm, 45 * mm, 87 * mm])
    t_env.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), COLOR_BG_GRAY),
        ('BOX', (0, 0), (-1, -1), 0.5, COLOR_BORDER_GRAY),
        ('INNERGRID', (0, 0), (-1, -1), 0.5, COLOR_BORDER_GRAY),
        ('TOPPADDING', (0, 0), (-1, -1), 6),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
        ('LEFTPADDING', (0, 0), (-1, -1), 6),
        ('RIGHTPADDING', (0, 0), (-1, -1), 6),
    ]))
    story.append(t_env)

    story.append(PageBreak())

    # =========================================================================
    # SEÇÃO 3: MÓDULO DE INGESTÃO EM LOTE POR PLANILHA
    # =========================================================================
    story.append(Paragraph("3. Módulo de Ingestão em Lote e Planilhas CSV", style_h1))
    story.append(HRFlowable(width="100%", thickness=1, color=COLOR_ACCENT_GREEN, spaceBefore=2, spaceAfter=10))

    story.append(Paragraph(
        "O <b>Módulo de Extração em Lote</b> (aba <i>Alimentar via Planilha</i> no ambiente restrito) é a principal ferramenta de trabalho "
        "da consultoria. Ele permite receber as respostas de centenas de colaboradores e processar o diagnóstico consolidado "
        "em poucos segundos, sem necessidade de digitação manual de formulários individuais.",
        style_body
    ))

    story.append(Paragraph("Estrutura Obrigatória do Arquivo CSV (11 Colunas):", style_h2))
    story.append(Paragraph(
        "A planilha de entrada deve ser salva no formato <b>CSV (delimitado por vírgula, ponto-e-vírgula ou tabulação)</b> "
        "com a primeira linha contendo exatamente o cabeçalho a seguir:",
        style_body
    ))

    # Bloco com o cabeçalho CSV
    csv_header_text = (
        "<code>id_colaborador,setor,cargo,tempo_trajeto_min,distancia_km,"
        "estresse_transito_1a5,qualidade_sono_1a5,atrasos_mes,risco_demissao_1a5,"
        "modal_predominante,gasto_transporte_renda_pct</code>"
    )
    story.append(Table([[Paragraph(csv_header_text, style_code)]], colWidths=[170 * mm], style=[
        ('BACKGROUND', (0, 0), (-1, -1), COLOR_BG_GRAY),
        ('BOX', (0, 0), (-1, -1), 1, COLOR_BORDER_GRAY),
        ('PADDING', (0, 0), (-1, -1), 6)
    ]))

    story.append(Spacer(1, 4 * mm))

    csv_cols_data = [
        [Paragraph("<b>Coluna</b>", style_table_cell_bold), Paragraph("<b>Tipo / Formato</b>", style_table_cell_bold), Paragraph("<b>Significado para o Algoritmo</b>", style_table_cell_bold)],
        [Paragraph("<code>id_colaborador</code>", style_table_cell), Paragraph("Texto (ex: COLAB_001)", style_table_cell), Paragraph("Identificador anônimo em conformidade com LGPD.", style_table_cell)],
        [Paragraph("<code>setor</code>", style_table_cell), Paragraph("Texto (ex: Operações)", style_table_cell), Paragraph("Área ou departamento para agrupamento setorial.", style_table_cell)],
        [Paragraph("<code>cargo</code>", style_table_cell), Paragraph("Texto (ex: Assistente)", style_table_cell), Paragraph("Função exercida (calibra fator de reposição e salário).", style_table_cell)],
        [Paragraph("<code>tempo_trajeto_min</code>", style_table_cell), Paragraph("Número inteiro (minutos)", style_table_cell), Paragraph("Tempo total de deslocamento ida e volta por dia.", style_table_cell)],
        [Paragraph("<code>distancia_km</code>", style_table_cell), Paragraph("Número inteiro (km)", style_table_cell), Paragraph("Distância física aproximada de ida e volta.", style_table_cell)],
        [Paragraph("<code>estresse_transito_1a5</code>", style_table_cell), Paragraph("Inteiro de 1 a 5", style_table_cell), Paragraph("Escala Likert de tensão psicológica no deslocamento.", style_table_cell)],
        [Paragraph("<code>qualidade_sono_1a5</code>", style_table_cell), Paragraph("Inteiro de 1 a 5", style_table_cell), Paragraph("Grau de impacto na privação de sono e descanso.", style_table_cell)],
        [Paragraph("<code>atrasos_mes</code>", style_table_cell), Paragraph("Número inteiro", style_table_cell), Paragraph("Quantidade média de atrasos mensais decorrentes do trânsito.", style_table_cell)],
        [Paragraph("<code>risco_demissao_1a5</code>", style_table_cell), Paragraph("Inteiro de 1 a 5", style_table_cell), Paragraph("Intenção declarada de deixar a empresa devido à rotina de transporte.", style_table_cell)],
        [Paragraph("<code>modal_predominante</code>", style_table_cell), Paragraph("Texto (Ônibus, Metrô, Carro)", style_table_cell), Paragraph("Meio de transporte principal utilizado.", style_table_cell)],
        [Paragraph("<code>gasto_transporte_renda_pct</code>", style_table_cell), Paragraph("Percentual (ex: 14)", style_table_cell), Paragraph("Porcentagem da remuneração líquida gasta em transporte.", style_table_cell)]
    ]
    t_cols = Table(csv_cols_data, colWidths=[48 * mm, 38 * mm, 84 * mm])
    t_cols.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), COLOR_BG_GRAY),
        ('BOX', (0, 0), (-1, -1), 0.5, COLOR_BORDER_GRAY),
        ('INNERGRID', (0, 0), (-1, -1), 0.5, COLOR_BORDER_GRAY),
        ('TOPPADDING', (0, 0), (-1, -1), 4),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
        ('LEFTPADDING', (0, 0), (-1, -1), 5),
        ('RIGHTPADDING', (0, 0), (-1, -1), 5),
    ]))
    story.append(t_cols)

    story.append(Spacer(1, 4 * mm))

    story.append(Paragraph("Passo a Passo Operacional para Ingestão:", style_h2))
    story.append(Paragraph("<b>1. Carregamento do Arquivo:</b> Clique na caixa de upload para selecionar o arquivo CSV ou cole o conteúdo diretamente na caixa de texto.", style_bullet))
    story.append(Paragraph("<b>2. Calibração Corporativa:</b> Preencha a Razão Social da empresa, Salário Médio da equipe e Faturamento Mensal.", style_bullet))
    story.append(Paragraph("<b>3. Inspeção Visual:</b> O painel exibe imediatamente a quantidade de registros válidos, as médias do lote e a prévia dos colaboradores.", style_bullet))
    story.append(Paragraph("<b>4. Execução do Diagnóstico:</b> Clique em <b>'Calcular e Visualizar Diagnóstico IIM Completo'</b>. O sistema calcula todas as 4 dimensões e abre automaticamente a tela do relatório executivo.", style_bullet))

    story.append(PageBreak())

    # =========================================================================
    # SEÇÃO 4: INTERPRETAÇÃO DO DASHBOARD EXECUTIVO
    # =========================================================================
    story.append(Paragraph("4. Interpretação do Painel Executivo de Resultados", style_h1))
    story.append(HRFlowable(width="100%", thickness=1, color=COLOR_ACCENT_GREEN, spaceBefore=2, spaceAfter=10))

    story.append(Paragraph(
        "A tela final de resultados (Etapa 7 / Dashboard Executivo) consolida todas as saídas analíticas para apresentar "
        "aos diretores, CFO e lideranças de RH da empresa cliente. Os principais componentes são:",
        style_body
    ))

    # Classificações do Score IIM
    story.append(Paragraph("Escala de Classificação do IIM (0 a 100):", style_h2))

    scores_data = [
        [
            Paragraph("<b>Faixa de Pontuação</b>", style_table_cell_bold),
            Paragraph("<b>Classificação</b>", style_table_cell_bold),
            Paragraph("<b>Diagnóstico & Impacto Operacional</b>", style_table_cell_bold)
        ],
        [
            Paragraph("<b>0 a 38 pts</b>", style_table_cell_bold),
            Paragraph("<font color='#16A34A'><b>Baixo Impacto (Saudável)</b></font>", style_table_cell),
            Paragraph("Operação fluida. Deslocamentos geram baixo atrito; absenteísmo controlado e retenção de talentos estável.", style_table_cell)
        ],
        [
            Paragraph("<b>39 a 65 pts</b>", style_table_cell_bold),
            Paragraph("<font color='#D97706'><b>Moderado (Atenção)</b></font>", style_table_cell),
            Paragraph("Fricção localizada. Atrasos sistemáticos em horários de pico e início de perda cognitiva matinal por cansaço.", style_table_cell)
        ],
        [
            Paragraph("<b>66 a 100 pts</b>", style_table_cell_bold),
            Paragraph("<font color='#DC2626'><b>Crítico (Atrito Severo)</b></font>", style_table_cell),
            Paragraph("Emergência de pessoas e finanças. Alto custo com rescisões/turnover, presenteísmo severo e desmotivação crônica.", style_table_cell)
        ]
    ]
    t_scores = Table(scores_data, colWidths=[38 * mm, 45 * mm, 87 * mm])
    t_scores.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), COLOR_BG_GRAY),
        ('BOX', (0, 0), (-1, -1), 0.5, COLOR_BORDER_GRAY),
        ('INNERGRID', (0, 0), (-1, -1), 0.5, COLOR_BORDER_GRAY),
        ('TOPPADDING', (0, 0), (-1, -1), 5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
        ('LEFTPADDING', (0, 0), (-1, -1), 6),
        ('RIGHTPADDING', (0, 0), (-1, -1), 6),
    ]))
    story.append(t_scores)

    story.append(Spacer(1, 4 * mm))

    story.append(Paragraph("Seções Principais do Relatório Executivo:", style_h2))

    story.append(Paragraph("<b>1. Hero Score & Ações Rápidas:</b> Exibe a nota ponderada em tipografia gigante, a classificação de risco e botões para Imprimir/Exportar PDF executivo ou salvar no histórico da API.", style_bullet))
    story.append(Paragraph("<b>2. Radar Dimensional Multicritério:</b> Gráfico em teia de aranha que expõe visualmente qual das 4 dimensões (Trajeto, Estresse, Pontualidade ou Vulnerabilidade) está mais distorcida.", style_bullet))
    story.append(Paragraph("<b>3. Modelagem de Custos Financeiros:</b> Decompõe o desperdício monetário em três linhas contábeis claras: Perda de Produtividade, Custo de Presenteísmo Matinal e Provisão de Turnover de Reposição.", style_bullet))
    story.append(Paragraph("<b>4. Projeção Corporativa e Impacto no EBITDA:</b> Projeta o custo multiplicado pela totalidade da folha presencial da empresa e compara com o faturamento mensal e anual.", style_bullet))
    story.append(Paragraph("<b>5. Simulador Dinâmico de Economia & ROI:</b> Permite arrastar o alvo de redução de IIM (ex: de 74 para 42 pts) e demonstra instantaneamente quanto dinheiro líquido a empresa economizará por ano.", style_bullet))
    story.append(Paragraph("<b>6. Matriz de Intervenções Prioritárias:</b> Lista de ações concretas (ex: reescalonamento de turnos em 30 min, vans corporativas, híbrido flexível) com retorno sobre o investimento estimado.", style_bullet))

    story.append(PageBreak())

    # =========================================================================
    # SEÇÃO 5: GUIA OPERACIONAL TÉCNICO DA EQUIPE
    # =========================================================================
    story.append(Paragraph("5. Guia Técnico, Comandos e Solução de Problemas", style_h1))
    story.append(HRFlowable(width="100%", thickness=1, color=COLOR_ACCENT_GREEN, spaceBefore=2, spaceAfter=10))

    story.append(Paragraph(
        "A aplicação é construída sobre uma arquitetura moderna, desacoplada e modular: Frontend em React 18 / TypeScript "
        "com Vite, e Backend em FastAPI / Python 3 com servidor assíncrono Uvicorn e banco relacional SQLite.",
        style_body
    ))

    cmd_table_data = [
        [
            Paragraph("<b>Componente</b>", style_table_cell_bold),
            Paragraph("<b>Porta / URL Local</b>", style_table_cell_bold),
            Paragraph("<b>Comando no Terminal</b>", style_table_cell_bold)
        ],
        [
            Paragraph("<b>Frontend (React + Vite)</b>", style_table_cell),
            Paragraph("<code>http://localhost:3000</code>", style_table_cell),
            Paragraph("<code>npm run dev</code>", style_table_cell)
        ],
        [
            Paragraph("<b>Backend (FastAPI)</b>", style_table_cell),
            Paragraph("<code>http://localhost:8000</code>", style_table_cell),
            Paragraph("<code>python3 -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload</code>", style_table_cell)
        ],
        [
            Paragraph("<b>Swagger / OpenAPI Docs</b>", style_table_cell),
            Paragraph("<code>http://localhost:8000/docs</code>", style_table_cell),
            Paragraph("Documentação interativa automática de endpoints REST.", style_table_cell)
        ],
        [
            Paragraph("<b>Health Check</b>", style_table_cell),
            Paragraph("<code>http://localhost:8000/health</code>", style_table_cell),
            Paragraph("Verificação rápida de disponibilidade do serviço de backend.", style_table_cell)
        ]
    ]
    t_cmd = Table(cmd_table_data, colWidths=[45 * mm, 45 * mm, 80 * mm])
    t_cmd.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), COLOR_BG_GRAY),
        ('BOX', (0, 0), (-1, -1), 0.5, COLOR_BORDER_GRAY),
        ('INNERGRID', (0, 0), (-1, -1), 0.5, COLOR_BORDER_GRAY),
        ('TOPPADDING', (0, 0), (-1, -1), 5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
        ('LEFTPADDING', (0, 0), (-1, -1), 6),
        ('RIGHTPADDING', (0, 0), (-1, -1), 6),
    ]))
    story.append(t_cmd)

    story.append(Spacer(1, 4 * mm))

    story.append(Paragraph("Fluxo de Dados e Persistência do Diagnóstico:", style_h2))
    story.append(Paragraph(
        "Ao finalizar um cálculo (manual ou por planilha), os dados são mantidos em memória via React Context "
        "(<code>CalculatorContext</code>). O operador pode clicar em <b>'Salvar no Histórico'</b> no cabeçalho do resultado "
        "para persistir a avaliação via POST na API (<code>/api/diagnosticos</code>), permitindo auditorias e comparação temporal posterior.",
        style_body
    ))

    # Perguntas Frequentes Internas da Equipe
    story.append(Paragraph("Solução de Problemas Operacionais Frequentes (Troubleshooting):", style_h2))
    story.append(Paragraph(
        "<b>• O que fazer se a planilha CSV apresentar erro de leitura?</b><br/>"
        "Verifique se o delimitador utilizado foi vírgula ou ponto-e-vírgula e se o arquivo contém as 11 colunas esperadas. "
        "O arquivo modelo <code>respostas_colaboradores_exemplo.csv</code> na raiz do projeto serve como referência oficial.",
        style_bullet
    ))
    story.append(Paragraph(
        "<b>• Como acessar a calculadora restrita se a sessão expirar?</b><br/>"
        "Acesse <code>/interno/calculadora</code> e informe o código corporativo <code>urbanflow2026</code>. O estado de login "
        "fica salvo com segurança no <code>sessionStorage</code> do navegador.",
        style_bullet
    ))
    story.append(Paragraph(
        "<b>• Como gerar o relatório executivo em PDF para envio ao cliente?</b><br/>"
        "No painel de resultados (Etapa 7), clique no botão 'Imprimir / Salvar PDF'. O sistema ativa as regras de estilo de impressão "
        "(<code>@media print</code>), ocultando menus e formatando o Score, Radar e Métricas em alta resolução.",
        style_bullet
    ))
    story.append(Paragraph(
        "<b>• A calculadora didática da Landing Page afeta a base interna?</b><br/>"
        "Não. O simulador didático da página pública roda de forma puramente matemática e independente no navegador, sem "
        "persistir registros ou alterar os pesos internos de clientes.",
        style_bullet
    ))

    story.append(Spacer(1, 6 * mm))
    story.append(HRFlowable(width="100%", thickness=0.5, color=COLOR_BORDER_GRAY, spaceBefore=4, spaceAfter=8))
    story.append(Paragraph(
        "<font color='#64748B'><i>UrbanFlow Consultoria Estratégica em Mobilidade Corporativa · Recife, Pernambuco · 2026</i></font>",
        ParagraphStyle('FooterSign', parent=styles['Normal'], fontSize=8, alignment=1)
    ))

    # Construção do PDF
    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"Manual gerado com sucesso em: {filename}")


if __name__ == '__main__':
    output_pdf = sys.argv[1] if len(sys.argv) > 1 else "manual_de_uso_urbanflow.pdf"
    build_manual_pdf(output_pdf)
