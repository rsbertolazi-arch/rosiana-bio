export const navItems = [
  { id: 'home', label: 'Início' },
  { id: 'about', label: 'Sobre' },
  { id: 'expertise', label: 'Expertise' },
  { id: 'career', label: 'Carreira' },
  { id: 'publications', label: 'Publicações' },
  { id: 'certifications', label: 'Certificações' },
  { id: 'contact', label: 'Contato' },
]

export interface CareerEntry {
  company: string
  role: string
  period: string
  logo: string
  description: string
  url?: string
}

export const careerData: CareerEntry[] = [
  {
    company: 'F1RST Digital Services',
    role: 'IT Leader',
    period: '12/2025 - Atual',
    logo: '/images/logo-f1rst.jpeg',
    description:
      'Gestão de Engenharia de Software em iniciativas relacionadas a contas corporativas (Pessoa Jurídica). Liderança de times atuando em soluções de alta e baixa plataforma em ambiente de alta criticidade operacional. Atuação estratégica conectando tecnologia, negócio e entrega contínua, incluindo utilização prática de Inteligência Artificial.',
  },
  {
    company: 'CNP Seguradora',
    role: 'Coordenadora de TI',
    period: '09/2024 - 10/2025',
    logo: '/images/logo-cnp.webp',
    description:
      'Liderança de times responsáveis por desenvolvimento e sustentação de sistemas estratégicos de seguros e odontologia. Evolução de plataformas críticas com foco em estabilidade, escalabilidade e eficiência operacional.',
  },
  {
    company: 'Mills',
    role: 'Coordenadora Digital',
    period: '06/2024 - 08/2024',
    logo: '/images/logo-mills.png',
    description:
      'Liderança de iniciativas de transformação digital e modernização tecnológica. Gestão de times multidisciplinares em projetos envolvendo Java, Node.js, RPA e microsserviços.',
  },
  {
    company: 'Conduent Brasil',
    role: 'Coordenadora de Desenvolvimento e Sistemas',
    period: '03/2023 - 02/2024',
    logo: '/images/logo-conduent.png',
    description:
      'Gestão de equipes responsáveis por sistemas ligados a previdência privada. Coordenação técnica e estratégica de iniciativas envolvendo .NET, ASP Core e aplicações corporativas.',
  },
  {
    company: 'Savoyard Fromagerie',
    role: 'Sócia-Proprietária',
    period: '04/2022 - 02/2023',
    logo: '/images/logo-savoyard.jpg',
    description:
      'Gestão integral do negócio, incluindo operação, relacionamento com clientes, estrategia comercial e gestão financeira. Experiência empreendedora ampliando visao de negócio.',
    url: 'https://www.savoyard.com.br/',
  },
  {
    company: 'RD Saúde (Raia Drogasil)',
    role: 'Coordenadora de Desenvolvimento e Sistemas',
    period: '11/2000 - 04/2022',
    logo: '/images/logo-rd.png',
    description:
      'Liderança de equipes em projetos estratégicos de desenvolvimento, transformação digital e adequação a LGPD. Atuação estratégica na evolução e sustentação de produto digital com impacto direto em mais de 30% do faturamento corporativo.',
  },
]

export const certifications = [
  'COBIT 5 Foundation',
  'ITIL v3 Foundation',
  'DASSM',
  'Business Agility Foundation & Practitioner',
  'Management 3.0',
  'Lean Inception Facilitator',
  'Cynefin Practitioner',
  'DevOps',
  'LGPD Fundamentos',
  'LGPD - Liderança de Projetos',
]

export const education = [
  { degree: 'MBA em Gestão de Negócios: Tecnologia e Transformação Digital', school: 'FIA' },
  { degree: 'MBA em Gestão de TI e Internet', school: 'UNINOVE' },
  { degree: 'Pós-Graduação em Análise de Sistemas', school: 'Estácio de Sá' },
]

export const executiveTraining = [
  'Inteligência Artificial para Gestores (FGV)',
  'AI for Business (IBMEC)',
  'Chief Digital Officer (FIA)',
  'Liderança Estratégica',
  'OKRs',
  'Métricas Ágeis',
  'Governança',
  'Transformação Organizacional',
]
