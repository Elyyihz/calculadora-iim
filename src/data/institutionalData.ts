import {
  TeamMember,
  Pillar,
  ResponsibilityItem,
  StatMetric,
  NavItem,
  FaqItem,
  StepItem,
  PillarMovement
} from '../types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Início', href: '/' },
  { label: 'O que nos move', href: '/#o-que-nos-move' },
  { label: 'O Método', href: '/#o-metodo' },
  { label: 'Da escuta à ação', href: '/#da-escuta-a-acao' },
  { label: 'Nossa Origem', href: '/#nossa-origem' },
  { label: 'FAQ', href: '/#faq' }
];

export const COMPANY_INFO = {
  name: 'UrbanFlow',
  tagline: 'Consultoria Estratégica em Mobilidade Corporativa & People Analytics',
  description: 'Transformamos deslocamentos urbanos em inteligência de dados, reduzindo custos invisíveis de turnover e presenteísmo e destravando a produtividade das organizações.',
  email: 'contato@urbanflow.com.br',
  phone: '+55 (81) 99876-5432',
  whatsappUrl: 'https://wa.me/5581998765432?text=Olá,%20gostaria%20de%20saber%20mais%20sobre%20a%20consultoria%20UrbanFlow%20e%20o%20diagnóstico%20IIM.',
  address: 'Polo Tecnológico / UNINASSAU · Recife, PE — Brasil'
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
