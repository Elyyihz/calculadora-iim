import {
  TeamMember,
  Pillar,
  ResponsibilityItem,
  StatMetric,
  NavItem,
  FaqItem,
  StepItem,
  PillarMovement,
  SuccessCase
} from '../types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Soluções', href: '/#o-que-nos-move' },
  { label: 'Nosso método', href: '/#o-metodo' },
  { label: 'Simulador', href: '/#simulador' },
  { label: 'Cases', href: '/#cases-de-sucesso' },
  { label: 'A UrbanFlow', href: '/#nossa-origem' },
  { label: 'FAQ', href: '/#faq' }
];

export const COMPANY_INFO = {
  name: 'UrbanFlow',
  tagline: 'Consultoria Estratégica em Mobilidade Corporativa & People Analytics',
  description: 'Transformamos deslocamentos urbanos em inteligência de dados, reduzindo custos invisíveis de turnover e presenteísmo e destravando a produtividade das organizações.',
  email: 'urbanflowtcc@gmail.com',
  phone: '+55 (81) 98899-6468',
  phoneDisplay: '(81) 98899-6468',
  whatsappUrl: 'https://wa.me/5581988996468?text=Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20a%20consultoria%20UrbanFlow%20e%20preparar%20meu%20diagn%C3%B3stico%20IIM.',
  instagramUrl: 'https://www.instagram.com/urbanflowconsultoria?stkn=MXc5azI2dDN6enA1eg==',
  linkedinUrl: 'https://www.linkedin.com/in/urbanflow?utm_source=share_via&utm_content=profile&utm_medium=member_android',
  address: 'Recife e Região Metropolitana · Pernambuco, Brasil'
};

export const HERO_STATS: StatMetric[] = [
  { value: '4 Dimensões', label: 'Análise Multicritério', subtext: 'Tempo, estresse, assiduidade e vulnerabilidade' },
  { value: '-35%', label: 'Custos Invisíveis', subtext: 'Redução média comprovada em perdas operacionais' },
  { value: '100% LGPD', label: 'Privacidade Nativa', subtext: 'Anonimização total sem coleta de rotas individuais' },
  { value: 'ROI Claro', label: 'Impacto Financeiro', subtext: 'Modelagem direta para deliberação do CFO' }
];

export const PILLARS_MOVEMENT: PillarMovement[] = [
  {
    id: 'eficiencia-cfo',
    role: 'Eficiência',
    stakeholder: 'Diretoria Financeira · CFO',
    title: 'Eliminação de custos invisíveis e ROI auditável',
    description: 'Desperdício com vale-transporte descalibrado, atrasos sistemáticos e o custo bilionário de substituição de colaboradores que pedem demissão pelo trânsito corroem o EBITDA da sua empresa. O IIM monetiza o atrito urbano e gera retorno líquido mensurável.',
    metric: 'Até -35% em despesas ocultas de mobilidade',
    highlights: [
      'Auditoria de custo real de reposição por função/cargo',
      'Simulador de economia em tempo real para balanço executivo',
      'Otimização inteligente de subsídios e vale-transporte'
    ]
  },
  {
    id: 'produtividade-gestores',
    role: 'Produtividade',
    stakeholder: 'Operações & Gestores',
    title: 'Energia e foco desde o primeiro minuto de trabalho',
    description: 'Rotas caóticas geram o custo de transição: o colaborador chega exausto e perde até 40% da capacidade cognitiva nas primeiras horas do expediente. Nossas intervenções devolvem clareza mental e garantem previsibilidade nas entregas da equipe.',
    metric: 'Recuperação direta de horas produtivas semanais',
    highlights: [
      'Janelas flexíveis e escalonamento inteligente de entrada',
      'Queda acentuada em atrasos crônicos e reuniões canceladas',
      'Previsibilidade operacional para equipes sob alta demanda'
    ]
  },
  {
    id: 'bem-estar-rh',
    role: 'Bem-estar',
    stakeholder: 'Recursos Humanos · People',
    title: 'Retenção de talentos e prevenção ativa do burnout',
    description: 'O desgaste no trânsito é o vetor silencioso número um na decisão voluntária de demissão nas grandes metrópoles. Oferecer suporte à mobilidade é o benefício mais tangível de valorização humana, saúde física e mental e elevação do eNPS corporativo.',
    metric: 'Retenção de colaboradores-chave e aumento de eNPS',
    highlights: [
      'Mitigação de estresse antecipado e privação de sono',
      'Políticas híbridas orientadas por dados reais de moradia',
      'Fortalecimento da cultura de pertencimento e acolhimento'
    ]
  }
];

export const METHOD_STEPS: StepItem[] = [
  {
    number: '01',
    title: 'Conectamos os dados',
    description: 'Mapeamos o perfil de deslocamento dos colaboradores com formulários digitais ultra-rápidos e dados cadastrais básicos da empresa. Processo 100% anônimo, sem atrito para a equipe e em estrita conformidade com a LGPD.',
    details: [
      'Coleta ágil e sem burocracia em poucos minutos',
      'Zero rastreamento invasivo por GPS individual',
      'Agrupamento inteligente por zonas e polos de moradia'
    ]
  },
  {
    number: '02',
    title: 'Calculamos o IIM',
    description: 'Processamos as respostas no algoritmo proprietário do Índice de Impacto de Mobilidade, ponderando as 4 dimensões (D1 a D4). O diagnóstico gera um score de 0 a 100 e quantifica as perdas com presenteísmo e turnover.',
    details: [
      'Ponderação científica testada academicamente',
      'Gráfico de radar multicritério por área ou unidade',
      'Monetização precisa do custo mensal e anual para o negócio'
    ]
  },
  {
    number: '03',
    title: 'Traçamos um plano',
    description: 'Desenhamos um Plano Diretor de Mobilidade Corporativa customizado, priorizado por matriz de esforço versus impacto financeiro. Ações práticas de curto, médio e longo prazo sob medida para o orçamento da empresa.',
    details: [
      'Ajustes de modelos híbridos e políticas de presença',
      'Rotas otimizadas, fretamento inteligente ou auxílio flexível',
      'Plano de ação executivo com metas claras para a liderança'
    ]
  },
  {
    number: '04',
    title: 'Acompanhamos a jornada',
    description: 'Monitoramos a implementação com painéis de controle e reavaliações periódicas. Medimos a evolução do índice IIM, a redução de emissões de carbono (ESG - Escopo 3) e o retorno real do investimento para a diretoria.',
    details: [
      'Dashboard executivo de evolução de indicadores',
      'Cálculo de toneladas de CO₂e evitadas para relatórios ESG',
      'Acompanhamento de satisfação dos colaboradores e ROI'
    ]
  }
];

export const ORIGIN_STORY = {
  institution: 'UNINASSAU · Centro Universitário Maurício de Nassau',
  city: 'Recife, Pernambuco — Brasil',
  title: 'Nascida da pesquisa aplicada no coração do Recife',
  paragraph1: 'A UrbanFlow teve sua gênese no ecossistema de pesquisa aplicada e engenharia de produção da UNINASSAU, em Recife (PE). Historicamente reconhecida como uma das capitais com o tráfego urbano mais desafiador do Brasil, a capital pernambucana serviu como o laboratório empírico natural ideal para investigar um fenômeno urgente e silencioso.',
  paragraph2: 'Nossos fundadores perceberam que a mobilidade urbana era tratada pelo mercado apenas como uma despesa protocolar de transporte, quando na verdade constituía um dos maiores ralos invisíveis de produtividade, receita operacional e saúde mental das companhias.',
  paragraph3: 'Combinando modelagem matemática avançada, People Analytics e pesquisa de campo com centenas de trabalhadores, desenvolvemos o algoritmo do Índice de Impacto de Mobilidade (IIM). Hoje, a metodologia ultrapassou as barreiras acadêmicas e se tornou uma consultoria corporativa de referência que transforma dados em qualidade de vida e eficiência financeira.',
  badges: [
    'Recife, PE · Berço Metodológico',
    'UNINASSAU · Rigor Científico',
    'Pesquisa Aplicada com Impacto Corporativo Real'
  ]
};

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'o-que-e-iim',
    question: 'O que é exatamente o IIM (Índice de Impacto de Mobilidade)?',
    answer: 'O IIM é uma métrica científica proprietária desenvolvida pela UrbanFlow que quantifica, em uma escala de 0 a 100, o grau de impacto negativo que os deslocamentos diários causam tanto na vida do colaborador quanto nas finanças da organização. Quanto maior a pontuação, mais crítico é o atrito e maiores são as perdas financeiras em produtividade, presenteísmo e risco de demissão voluntária.'
  },
  {
    id: 'privacidade-lgpd',
    question: 'Como a UrbanFlow garante a conformidade com a LGPD e a privacidade dos colaboradores?',
    answer: 'A privacidade é um pilar estruturante da nossa arquitetura. Não realizamos rastreamento em tempo real por GPS e nunca solicitamos endereços residenciais exatos. As análises trabalham exclusivamente com dados anonimizados agregados por zonas de transporte e perfis demográficos, garantindo total conformidade com a Lei Geral de Proteção de Dados (LGPD) e segurança jurídica para a empresa.'
  },
  {
    id: 'prazo-implementacao',
    question: 'Qual é o tempo médio para realização de um diagnóstico corporativo completo?',
    answer: 'Um diagnóstico padrão com o IIM é executado entre 7 e 15 dias úteis, divididos entre a fase de coleta digital das respostas, processamento algorítmico e elaboração do relatório executivo. A empresa recebe uma apresentação estruturada com o gráfico de radar dimensional, simulação financeira e o plano de ação priorizado.'
  },
  {
    id: 'comprovacao-roi',
    question: 'Como o IIM comprova o Retorno sobre o Investimento (ROI) para o CFO?',
    answer: 'Nossa modelagem monetiza três grandes custos ocultos: o presenteísmo matinal (tempo de transição cognitiva até o início do trabalho efetivo), as perdas por atrasos e absenteísmo, e o custo de substituição de colaboradores (headhunter, rescisão e ramp-up de novos talentos). O simulador do IIM projeta a economia financeira líquida para cada ponto de redução do índice.'
  },
  {
    id: 'porte-empresas',
    question: 'A consultoria atende empresas de qualquer porte ou setor?',
    answer: 'Sim. A metodologia atende desde médias empresas (a partir de 50 colaboradores) até corporações com milhares de funcionários em múltiplos polos. O IIM possui multiplicadores específicos calibrados para setores como Indústria, Tecnologia, Serviços, Saúde, Logística e Varejo.'
  },
  {
    id: 'esg-descarbonizacao',
    question: 'Como o diagnóstico do IIM se conecta à agenda ESG e às metas de carbono?',
    answer: 'A mobilidade pendular dos colaboradores compõe o Escopo 3 do GHG Protocol (emissões indiretas da cadeia de valor). Ao mapear os modais utilizados e otimizar rotas ou introduzir dias de trabalho remoto orientado, a consultoria calcula as toneladas de CO₂e evitadas, gerando dados auditáveis para os relatórios de sustentabilidade e metas Net-Zero da organização.'
  }
];

export const PILLARS: Pillar[] = [
  {
    id: 'diagnostico-iim',
    title: 'Diagnóstico Científico (IIM)',
    description: 'Avaliamos a sua operação através do Índice de Impacto de Mobilidade, combinando métricas de tempo, estresse urbano, assiduidade e custos diretos.',
    iconName: 'Compass',
    metrics: '4 Dimensões Integradas'
  },
  {
    id: 'otimizacao-rotas',
    title: 'Otimização Operacional e Híbrida',
    description: 'Estruturação de políticas de trabalho híbrido, redes de transporte corporativo e rotas otimizadas com base em mapas térmicos reais de moradia.',
    iconName: 'TrendingUp',
    metrics: 'Até -35% em Custos'
  },
  {
    id: 'esg-sustentabilidade',
    title: 'Alinhamento ESG e Descarbonização',
    description: 'Relatórios auditáveis de emissões de Escopo 3 vinculados a comutações corporativas, facilitando certificações sustentáveis e metas Net-Zero.',
    iconName: 'Leaf',
    metrics: 'Auditoria Escopo 3'
  },
  {
    id: 'gestao-mudanca',
    title: 'Engajamento e Bem-Estar',
    description: 'Programas de mobilidade ativa (bicicletas, carpooling corporativo e incentivos de transição) com adesão e satisfação do time.',
    iconName: 'Users',
    metrics: '+40pts no eNPS'
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'pesquisa-uninassau',
    name: 'Núcleo de Engenharia & Gestão UNINASSAU',
    role: 'Polo de Pesquisa e Desenvolvimento Metodológico',
    specialty: 'Engenharia de Produção, Ciência de Dados e Mobilidade Urbana',
    bio: 'Desenvolvedores da modelagem multicritério e matriz de ponderação dimensional do IIM v3.0, com validação empírica no tráfego da Região Metropolitana do Recife.',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    skills: ['Modelagem IIM', 'Pesquisa Aplicada', 'People Analytics']
  }
];

export const RESPONSIBILITIES: ResponsibilityItem[] = [
  {
    id: 'ambiental',
    category: 'ESG',
    title: 'Responsabilidade Ambiental e Clima',
    description: 'A mobilidade corporativa é um vetor crítico de emissões indiretas de gases estufa. O nosso compromisso é converter dados de deslocamento em reduções auditáveis de carbono.',
    impactMetrics: 'Milhares de toneladas de CO₂e mitigadas em planos de mobilidade inteligente',
    commitments: [
      'Inventariação rigorosa de emissões indiretas (Escopo 3) segundo o GHG Protocol.',
      'Incentivo ativo a transportes compartilhados e modelos híbridos com baixa emissão.',
      'Definição de metas auditáveis de sustentabilidade corporativa.'
    ]
  }
];

export const SUCCESS_CASES: SuccessCase[] = [
  {
    id: 'logistica-operacoes',
    companyName: 'LogiNord Operações & Distribuição',
    sector: 'Logística & Supply Chain',
    companySize: '480 colaboradores operacionais',
    location: 'Região Metropolitana do Recife · Polo Suape',
    tagline: 'Eliminação do gargalo de atrasos matinais e redução de 56% no turnover operacional com reescalonamento inteligente e fretamento otimizado.',
    initialScoreIIM: 76,
    finalScoreIIM: 39,
    highlightMetric: '-68% em atrasos e R$ 245 mil/ano poupados',
    problem: {
      title: 'Atrasos sistemáticos e rotatividade crônica na linha de triagem',
      description: 'Com deslocamentos médios de 1h50 por trecho em transporte público saturado, os operadores chegavam com fadiga extrema. Atrasos sistemáticos na abertura do primeiro turno paralisavam a linha de expedição, gerando alto estresse e pedidos contínuos de demissão.',
      points: [
        'Mais de 35 minutos de atraso médio acumulado nos turnos de abertura (07h00).',
        'Taxa de turnover anual na operação em 32%, custando R$ 410 mil/ano em rescisões e novos treinamentos.',
        '74% dos operadores relatavam exaustão física e insônia antes mesmo do início da jornada de trabalho.'
      ]
    },
    solution: {
      title: 'Diagnóstico georreferenciado do IIM e malha sincronizada de transporte',
      description: 'A UrbanFlow realizou a coleta do IIM mapeando os polos residenciais de 100% da equipe operacional, identificando os nós críticos de retenção e desenhando um plano de mobilidade focado em eficiência e pontualidade.',
      interventions: [
        'Deslocamento estratégico de 30 minutos na escala de início do turno (das 07h00 para 07h30), escapando do pior congestionamento viário.',
        'Roteirização de 4 vans de fretamento compartilhado conectando os maiores adensamentos residenciais aos centros de distribuição.',
        'Instalação de ponto de apoio de mobilidade ativa com vestiários e bicicletário seguro para deslocamentos de última milha.'
      ]
    },
    results: {
      title: 'Previsibilidade na expedição e retorno financeiro auditável',
      description: 'Em 90 dias após a implementação, o IIM despencou 37 pontos, restaurando a disciplina operacional da fábrica e mitigando os custos de reposição.',
      metrics: [
        { label: 'Índice IIM Consolidado', before: '76 pts (Crítico)', after: '39 pts (Moderado)', badge: '-48% no Impacto', isPositive: true },
        { label: 'Atrasos Sistemáticos', before: '35 min/colaborador', after: '9 min/colaborador', badge: '-68% de queda', isPositive: true },
        { label: 'Turnover Operacional', before: '32% ao ano', after: '14% ao ano', badge: '-56% rotatividade', isPositive: true },
        { label: 'Economia Líquida Anual', before: 'R$ 0', after: 'R$ 245.000 / ano', badge: 'ROI de 3.4x', isPositive: true }
      ],
      roiSummary: 'Retorno sobre investimento de 3,4x no primeiro ano e estabilização de 100% da escala operacional matinal.'
    },
    testimonial: {
      quote: 'Achávamos que o problema da nossa operação era falta de pontualidade dos funcionários. O diagnóstico do IIM nos provou que era uma falha de engenharia de horários em relação à malha de transporte. Em três meses, a linha voltou a rodar no horário e as demissões despencaram.',
      author: 'Diretoria de Operações & Logística',
      role: 'LogiNord Distribuição'
    }
  },
  {
    id: 'tecnologia-financas',
    companyName: 'FinVibe Soluções Digitais',
    sector: 'Fintech & Tecnologia',
    companySize: '210 profissionais de TI e Produto',
    location: 'Polo Empresarial Urbano',
    tagline: 'Fim da perda de talentos sêniores e recuperação do foco cognitivo substituindo o presencial rígido por um modelo híbrido guiado por dados de deslocamento.',
    initialScoreIIM: 68,
    finalScoreIIM: 31,
    highlightMetric: '+46 pontos no eNPS e 2,2h semanais de foco recuperadas',
    problem: {
      title: 'Fadiga cognitiva matinal e debandada de especialistas seniores',
      description: 'A exigência de retorno presencial 100% causou imediata insatisfação nos times de desenvolvimento. O trânsito pesado minava a energia dos profissionais antes de sentarem na frente do computador, provocando forte presenteísmo e perda de desenvolvedores para empresas remotas.',
      points: [
        'Perda média de 2 horas cognitivas úteis por dia por profissional no custo de transição e estresse de trânsito.',
        'Evasão de 4 desenvolvedores sêniores em 60 dias exclusivamente pelo cansaço do deslocamento diário.',
        'Desperdício de R$ 38 mil/mês em convênios de estacionamento corporativo com baixa ocupação real.'
      ]
    },
    solution: {
      title: 'Híbrido Inteligente com base no IIM e Vale-Mobilidade Flexível',
      description: 'A UrbanFlow cruzou a matriz de tempo de comutação com os ritos ágeis de desenvolvimento, desenhando uma política de presença flexível e previsível sem perda de coesão entre os squads.',
      interventions: [
        'Política híbrida de 2 a 3 dias com "dias-núcleo" de rituais presenciais, eliminando idas desnecessárias ao escritório.',
        'Janela de chegada flexível entre 07h30 e 10h00, permitindo evitar o pico e garantindo sincronia assíncrona respeitada.',
        'Substituição do subsídio fixo de vagas por carteira digital flexível de mobilidade para caronas corporativas, transporte ativo e aplicativos.'
      ]
    },
    results: {
      title: 'Produtividade de ponta a ponta e recorde histórico de retenção',
      description: 'A entrega de sprints aumentou significativamente com o fim do estresse de trânsito, e os pedidos de demissão por atrito de deslocamento foram completamente zerados.',
      metrics: [
        { label: 'Índice IIM Consolidado', before: '68 pts (Alto)', after: '31 pts (Baixo)', badge: '-54% no Impacto', isPositive: true },
        { label: 'Retenção de Sêniores', before: '76% no período', after: '96% no período', badge: '+20 p.p. retenção', isPositive: true },
        { label: 'eNPS Interno', before: '+18 (Neutro)', after: '+64 (Zona de Excelência)', badge: '+46 pontos', isPositive: true },
        { label: 'Foco Produtivo Diário', before: '120 min de perda/dia', after: '25 min de perda/dia', badge: '+2,2h úteis/sem', isPositive: true }
      ],
      roiSummary: 'Preservação da capacidade de entrega dos produtos de software e corte de 80% nos custos emergenciais de contratação técnica.'
    },
    testimonial: {
      quote: 'O IIM nos deu a fundamentação técnica e científica que precisávamos para alinhar a liderança. O resultado foi um salto imediato no eNPS e a certeza de que nossa equipe produz melhor quando não é esgotada pelo asfalto.',
      author: 'Head de Pessoas & Cultura',
      role: 'FinVibe Soluções Digitais'
    }
  },
  {
    id: 'atendimento-bpo',
    companyName: 'OmniContact Serviços de Relacionamento',
    sector: 'Customer Care & Serviços Compartilhados',
    companySize: '750 operadores e supervisores',
    location: 'Polo Central Integrado',
    tagline: 'Mitigação da vulnerabilidade nos trajetos noturnos e redução drástica do absenteísmo com criação de rotas seguras e adequação de escalas.',
    initialScoreIIM: 82,
    finalScoreIIM: 42,
    highlightMetric: '-71% em absenteísmo e R$ 390 mil/ano poupados em SLAs',
    problem: {
      title: 'Insegurança em paradas noturnas e absenteísmo crônico às segundas',
      description: 'Colaboradores do segundo turno (término após 21h30) enfrentavam pontos de ônibus escuros e longos intervalos de espera, gerando alta sensação de insegurança, estresse agudo e faltas recorrentes que comprometiam os SLAs contratuais de atendimento.',
      points: [
        'Absenteísmo às segundas e sextas-feiras atingindo 14,5%, estourando o tempo médio de atendimento (TMA) e gerando risco de multas.',
        '68% dos operadores relatavam medo constante e sensação de vulnerabilidade no trajeto noturno.',
        'Custos descontrolados com horas extras de supervisão e transporte emergencial de contingência.'
      ]
    },
    solution: {
      title: 'Programa Corredor Seguro e sincronização de escalas com a malha urbana',
      description: 'Com os dados da dimensão D4 (Vulnerabilidade) e D2 (Estresse) do IIM, a UrbanFlow articulou intervenções estruturadas para assegurar proteção física e previsibilidade no trajeto.',
      interventions: [
        'Criação do "Corredor Seguro": embarque assistido na porta da empresa e vans circulares até os terminais integrados centrais a partir das 21h00.',
        'Sincronização dos minutos de encerramento dos turnos exatamente com os horários de saída das linhas troncais.',
        'Criação do canal interno de monitoramento preventivo de rotas e segurança comunitária entre os colaboradores.'
      ]
    },
    results: {
      title: 'Segurança humana revertida em estabilidade operacional de SLAs',
      description: 'O clima de segurança e acolhimento reduziu radicalmente as faltas e atestados médicos, garantindo cumprimento integral dos contratos de atendimento corporativo.',
      metrics: [
        { label: 'Índice IIM Consolidado', before: '82 pts (Crítico)', after: '42 pts (Moderado)', badge: '-49% no Impacto', isPositive: true },
        { label: 'Taxa de Absenteísmo', before: '14,5%', after: '4,2%', badge: '-71% de faltas', isPositive: true },
        { label: 'Sensação de Vulnerabilidade', before: '68% em risco', after: '16% em risco', badge: '-76% insegurança', isPositive: true },
        { label: 'Economia em Multas & HE', before: 'Custos elevados', after: 'R$ 390.000 / ano', badge: '100% SLAs cumpridos', isPositive: true }
      ],
      roiSummary: 'Proteção total dos SLAs de clientes corporativos e redução de 75% nos custos com horas extras emergenciais.'
    },
    testimonial: {
      quote: 'Cuidar da volta para casa das nossas equipes transformou a relação das pessoas com a empresa. Quando o colaborador sente que a empresa se importa com sua segurança real, o absenteísmo despenca e a qualidade do atendimento sobe.',
      author: 'Gerência Geral de Operações',
      role: 'OmniContact Serviços de Relacionamento'
    }
  }
];

