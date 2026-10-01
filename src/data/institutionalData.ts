import { TeamMember, Pillar, ResponsibilityItem, StatMetric, NavItem } from '../types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Início', href: '/' },
  { label: 'Quem Somos', href: '/#quem-somos' },
  { label: 'A Equipa', href: '/#a-equipa' },
  { label: 'Responsabilidades', href: '/#responsabilidades' }
];

export const COMPANY_INFO = {
  name: 'UrbanFlow',
  tagline: 'Consultoria Estratégica em Mobilidade Corporativa & Eficiência Operacional',
  description: 'Transformamos o deslocamento e a dinâmica de trabalho de grandes corporações através de diagnósticos quantitativos, inteligência de dados e estratégias sustentáveis de mobilidade.',
  email: 'contacto@urbanflow-consultoria.pt',
  phone: '+351 210 987 654',
  address: 'Avenida da Liberdade 245, 4º Andar, 1250-143 Lisboa'
};

export const HERO_STATS: StatMetric[] = [
  { value: '+42%', label: 'Eficiência de Deslocação', subtext: 'Redução média no tempo diário de comutação' },
  { value: '3.8x', label: 'Retorno sobre Investimento', subtext: 'ROI medido no primeiro ciclo de intervenções' },
  { value: '-28%', label: 'Pegada de Carbono', subtext: 'Corte comprovado de emissões de CO₂e no trajeto casa-trabalho' },
  { value: '85k+', label: 'Colaboradores Impactados', subtext: 'Em projetos de mobilidade inteligente e bem-estar' }
];

export const PILLARS: Pillar[] = [
  {
    id: 'diagnostico-iim',
    title: 'Diagnóstico Científico (IIM)',
    description: 'Avaliamos a sua operação através do Índice de Impacto de Mobilidade, combinando métricas de tempo, stress urbano, pegada ambiental e custos diretos.',
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
    id: 'mariana-vasconcelos',
    name: 'Dra. Mariana Vasconcelos',
    role: 'Sócia Fundadora & Diretora de Estratégia',
    specialty: 'Planeamento Urbano e Modelos de Decisão Corporativa',
    bio: 'Mais de 16 anos a desenhar ecossistemas de mobilidade na Europa e América Latina. Doutorada em Engenharia de Transportes pela Universidade Técnica de Lisboa.',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    skills: ['Estratégia Corporativa', 'Políticas Urbanas', 'Modelagem IIM'],
    linkedin: 'https://linkedin.com'
  },
  {
    id: 'tiago-albuquerque',
    name: 'Eng. Tiago Albuquerque',
    role: 'Head de Inteligência Quantitativa e Algoritmos',
    specialty: 'Otimização Matemática e Simulação de Tráfego',
    bio: 'Especialista em algoritmos preditivos e coautor do algoritmo proprietário da Calculadora IIM v3. Mestre em Data Science e Investigação Operacional.',
    avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
    skills: ['Algoritmos de Otimização', 'Data Analytics', 'ROI Operacional'],
    linkedin: 'https://linkedin.com'
  },
  {
    id: 'clara-mendonca',
    name: 'Clara Mendonça, MSc',
    role: 'Diretora de Sustentabilidade & Impacto ESG',
    specialty: 'Descarbonização e Contabilidade de Emissões de Carbono',
    bio: 'Responsável pelo alinhamento das políticas de transporte das empresas clientes com as normas europeias CSRD e cálculo rigoroso de emissões de Escopo 3.',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
    skills: ['ESG & GHG Protocol', 'Transição Energética', 'Auditoria Sustentável'],
    linkedin: 'https://linkedin.com'
  },
  {
    id: 'andre-carvalho',
    name: 'André Carvalho',
    role: 'Líder de People Experience e Transformação Organizacional',
    specialty: 'Cultura Corporativa, Saúde Mental e Ergonomia do Trabalho',
    bio: 'Focado em diminuir o atrito do trânsito na saúde dos colaboradores. Mais de uma década a gerir projetos de atração de talento e qualidade de vida no trabalho.',
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80',
    skills: ['Gestão de Mudança', 'Wellbeing Corporativo', 'People Analytics'],
    linkedin: 'https://linkedin.com'
  }
];

export const RESPONSIBILITIES: ResponsibilityItem[] = [
  {
    id: 'ambiental',
    category: 'ESG',
    title: 'Responsabilidade Ambiental e Clima',
    description: 'A mobilidade corporativa é um dos principais vetores não medidos de poluição atmosférica. O nosso compromisso é converter dados de comutação em reduções concretas de toneladas de CO₂.',
    impactMetrics: 'Mais de 12.000 toneladas de CO₂e mitigadas anualmente com planos implementados',
    commitments: [
      'Inventariação rigorosa de emissões indiretas (Escopo 3) segundo o GHG Protocol.',
      'Incentivo ativo à eletrificação de frotas e integração de micro-mobilidade verde.',
      'Definição de metas auditáveis de neutralidade de carbono até 2030.'
    ]
  },
  {
    id: 'social',
    category: 'Social',
    title: 'Impacto Social e Qualidade de Vida',
    description: 'Horas excessivas no trânsito degradam a saúde física e mental dos profissionais. Criamos estratégias para devolver tempo com a família e descanso aos colaboradores.',
    impactMetrics: 'Média de 48 minutos diários devolvidos a cada colaborador em empresas parceiras',
    commitments: [
      'Erradicação de percursos diários desnecessários por meio de modelos híbridos inteligentes.',
      'Subsídios e parcerias para transporte público limpo e frotas partilhadas.',
      'Foco em inclusão, segurança nas deslocações e acessibilidade para pessoas com mobilidade reduzida.'
    ]
  },
  {
    id: 'governanca',
    category: 'Governança',
    title: 'Governança, Rigor Técnico e Ética',
    description: 'Decisões de infraestrutura exigem conformidade legal e integridade ética no tratamento dos dados de localização e hábitos de deslocação dos colaboradores.',
    impactMetrics: '100% dos dados anonimizados em conformidade total com o RGPD / GDPR',
    commitments: [
      'Anonimização estrita de coordenadas e moradas em todos os diagnósticos IIM.',
      'Transparência algorítmica: cálculos de ROI e benchmarks auditáveis.',
      'Conformidade rigorosa com normas de contratação pública e privada.'
    ]
  },
  {
    id: 'urbano',
    category: 'Mobilidade',
    title: 'Cidadania Urbana e Desenvolvimento Local',
    description: 'As empresas não existem no vácuo: as suas rotas impactam a fluidez dos bairros em redor dos polos empresariais. Cooperamos para cidades mais humanas.',
    impactMetrics: 'Parcerias com municípios e operadores de trânsito em 6 áreas metropolitanas',
    commitments: [
      'Alívio sistemático dos picos de congestionamento urbano via horários flexíveis.',
      'Estímulo ao comércio de proximidade e descentralização dos polos de trabalho.',
      'Partilha de relatórios abertos de tendências de mobilidade para a comunidade.'
    ]
  }
];
