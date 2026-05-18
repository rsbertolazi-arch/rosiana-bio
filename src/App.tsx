import { useState, useEffect, type FormEvent } from 'react'
import {
  Briefcase,
  GraduationCap,
  Award,
  BookOpen,
  Mic,
  Mail,
  Linkedin,
  ChevronDown,
  Brain,
  Code,
  Users,
  Target,
  Sparkles,
  Menu,
  X,
  ExternalLink,
  MapPin,
  Calendar,
  Download,
  FileText,
  Layers,
  Youtube,
  Shield,
  Send,
  Phone,
  CheckCircle,
  MessageSquare,
} from 'lucide-react'
import './App.css'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [scrollY, setScrollY] = useState(0)
  const [formName, setFormName] = useState('')
  const [formPhone, setFormPhone] = useState('')
  const [formIsWhatsapp, setFormIsWhatsapp] = useState(false)
  const [formMessage, setFormMessage] = useState('')
  const [formSent, setFormSent] = useState(false)
  const [formSending, setFormSending] = useState(false)

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, '')
    if (digits.length === 0) return ''
    if (digits.length <= 2) return `(${digits}`
    if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
    if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`
  }

  const handlePhoneChange = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 11)
    setFormPhone(formatPhone(digits))
  }

  const resetForm = () => {
    setFormSent(false)
    setFormSending(false)
    setFormName('')
    setFormPhone('')
    setFormIsWhatsapp(false)
    setFormMessage('')
  }

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setFormSending(true)
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: '267a4f5c-49e4-42cd-abc4-2c0177c378ca',
          subject: `Novo contato via site - ${formName}`,
          from_name: formName,
          Nome: formName,
          Telefone: formPhone,
          WhatsApp: formIsWhatsapp ? 'Sim' : 'Não',
          Mensagem: formMessage,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setFormSent(true)
        setTimeout(() => resetForm(), 30000)
      } else {
        alert('Erro ao enviar mensagem. Por favor, tente novamente.')
      }
    } catch {
      alert('Erro ao enviar mensagem. Por favor, tente novamente.')
    } finally {
      setFormSending(false)
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
      const sections = ['home', 'about', 'expertise', 'career', 'publications', 'certifications', 'contact']
      for (const section of sections.reverse()) {
        const el = document.getElementById(section)
        if (el && window.scrollY >= el.offsetTop - 100) {
          setActiveSection(section)
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
      setIsMenuOpen(false)
    }
  }

  const navItems = [
    { id: 'home', label: 'Início' },
    { id: 'about', label: 'Sobre' },
    { id: 'expertise', label: 'Expertise' },
    { id: 'career', label: 'Carreira' },
    { id: 'publications', label: 'Publicações' },
    { id: 'certifications', label: 'Certificações' },
    { id: 'contact', label: 'Contato' },
  ]

  const careerData = [
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

  const expertiseAreas = [
    { icon: <Brain className="w-8 h-8" />, title: 'Inteligência Artificial', desc: 'IA aplicada a gestão, liderança e transformação organizacional' },
    { icon: <Code className="w-8 h-8" />, title: 'Engenharia de Software', desc: 'Java, .NET, Angular, Spring Boot, Kafka, Microsserviços' },
    { icon: <Target className="w-8 h-8" />, title: 'Transformação Digital', desc: 'Modernização arquitetural, cloud e evolução de plataformas' },
    { icon: <Users className="w-8 h-8" />, title: 'Liderança Estratégica', desc: 'Times multidisciplinares de alta performance' },
    { icon: <Briefcase className="w-8 h-8" />, title: 'Governança de TI', desc: 'COBIT, ITIL, LGPD, eficiência operacional' },
    { icon: <Sparkles className="w-8 h-8" />, title: 'Agilidade Organizacional', desc: 'Lean, OKRs, Management 3.0, Cynefin' },
  ]

  const certifications = [
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

  const education = [
    { degree: 'MBA em Gestão de Negócios: Tecnologia e Transformação Digital', school: 'FIA' },
    { degree: 'MBA em Gestão de TI e Internet', school: 'UNINOVE' },
    { degree: 'Pós-Graduação em Análise de Sistemas', school: 'Estácio de Sá' },
  ]

  const executiveTraining = [
    'Inteligência Artificial para Gestores (FGV)',
    'AI for Business (IBMEC)',
    'Chief Digital Officer (FIA)',
    'Liderança Estratégica',
    'OKRs',
    'Métricas Ágeis',
    'Governança',
    'Transformação Organizacional',
  ]

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrollY > 50 ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button
              onClick={() => scrollTo('home')}
              className="transition-opacity hover:opacity-80"
            >
              <img
                src="/images/logo-rsb.png"
                alt="RSB - Rosiana da Silva Bertolazi"
                className={`${scrollY > 50 ? 'h-12' : 'h-32'} w-auto transition-all duration-300`}
              />
            </button>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-all ${
                    activeSection === item.id
                      ? scrollY > 50
                        ? 'text-violet-700 bg-violet-50'
                        : 'text-white bg-white/20'
                      : scrollY > 50
                      ? 'text-slate-600 hover:text-violet-700 hover:bg-violet-50'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`md:hidden p-2 rounded-lg ${
                scrollY > 50 ? 'text-slate-800' : 'text-white'
              }`}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-slate-100 shadow-xl">
            <div className="px-4 py-3 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`block w-full text-left px-4 py-2.5 text-sm font-medium rounded-lg transition-all ${
                    activeSection === item.id
                      ? 'text-violet-700 bg-violet-50'
                      : 'text-slate-600 hover:text-violet-700 hover:bg-violet-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/images/hero-bg.jpg)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-violet-900/90 via-slate-900/85 to-indigo-900/90" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
            <MapPin className="w-4 h-4 text-violet-300" />
            <span className="text-sm text-violet-200">São Paulo, SP</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Rosiana da Silva
            <br />
            <span className="bg-gradient-to-r from-violet-300 to-indigo-300 bg-clip-text text-transparent">
              Bertolazi
            </span>
          </h1>

          <p className="text-xl sm:text-2xl text-slate-300 mb-4 font-light">
            Executiva de Tecnologia | Autora | Palestrante | Empreendedora
          </p>

          <p className="text-lg text-violet-300 mb-10 font-medium">
            Criadora do <span className="text-white font-semibold">IA em Pauta</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <button
              onClick={() => scrollTo('about')}
              className="px-8 py-3.5 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-violet-600/30 hover:shadow-violet-500/40 hover:-translate-y-0.5"
            >
              Conheça minha história
            </button>
            <button
              onClick={() => scrollTo('contact')}
              className="px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all backdrop-blur-sm border border-white/20 hover:-translate-y-0.5"
            >
              Entre em contato
            </button>
          </div>

          <a
            href="/RSB_2026.pdf"
            download
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl transition-all backdrop-blur-sm border border-white/20 mb-12"
          >
            <Download className="w-5 h-5" />
            Download Currículo (PDF)
          </a>

          <button
            onClick={() => scrollTo('about')}
            className="animate-bounce text-white/60 hover:text-white transition-colors block mx-auto"
          >
            <ChevronDown className="w-8 h-8 mx-auto" />
          </button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="mb-8 flex justify-center lg:justify-start">
                <img
                  src="/images/rosiana-foto.png"
                  alt="Rosiana da Silva Bertolazi"
                  className="w-48 h-48 rounded-full object-cover shadow-xl border-4 border-violet-200"
                />
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-100 text-violet-700 text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                Sobre mim
              </div>
              <h2 className="text-4xl font-bold text-slate-800 mb-6">
                Transformando negócios através da{' '}
                <span className="text-violet-600">tecnologia e inovação</span>
              </h2>
              <div className="space-y-4 text-slate-600 leading-relaxed text-justify">
                <p>
                  Executiva de Tecnologia com atuação em transformação digital, liderança estratégica
                  e evolução de operações orientadas a inovação. Experiência na liderança de times
                  multidisciplinares, modernização tecnológica, transformação organizacional e gestão
                  de iniciativas críticas em empresas de medio e grande porte.
                </p>
                <p>
                  Atuo conectando tecnologia, negócio e pessoas para acelerar resultados, aumentar
                  eficiência operacional e apoiar ambientes de alta performance. Vivência em
                  engenharia de software, governança, agilidade organizacional, delivery estratégico
                  e Inteligência Artificial aplicada a gestão.
                </p>
                <p>
                  Sou autora, palestrante e criadora do{' '}
                  <span className="font-semibold text-violet-600">IA em Pauta</span>, iniciativa
                  voltada para discussões e conteúdos sobre Inteligência Artificial aplicada a gestão,
                  liderança e transformação organizacional.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-violet-100 to-indigo-100 rounded-3xl p-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
                    <div className="text-3xl font-bold text-violet-600 mb-1">25+</div>
                    <div className="text-sm text-slate-500">Anos de experiência</div>
                  </div>
                  <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
                    <div className="text-3xl font-bold text-violet-600 mb-1">6+</div>
                    <div className="text-sm text-slate-500">Empresas lideradas</div>
                  </div>
                  <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
                    <div className="text-3xl font-bold text-violet-600 mb-1">3</div>
                    <div className="text-sm text-slate-500">MBAs e Pós</div>
                  </div>
                  <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
                    <div className="text-3xl font-bold text-violet-600 mb-1">9+</div>
                    <div className="text-sm text-slate-500">Certificações</div>
                  </div>
                </div>

                <div className="mt-6 bg-white rounded-2xl p-6 shadow-sm">
                  <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                    <Target className="w-5 h-5 text-violet-600" />
                    Principais Resultados
                  </h3>
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-violet-500 mt-2 shrink-0" />
                      Impacto direto em 30%+ do faturamento corporativo da Raia Drogasil
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-violet-500 mt-2 shrink-0" />
                      Transformação sistêmica para adequação a LGPD em grande varejista
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-violet-500 mt-2 shrink-0" />
                      Modernização arquitetural com microsserviços e integração de sistemas
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section id="expertise" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-100 text-violet-700 text-sm font-medium mb-4">
              <Layers className="w-4 h-4" />
              Áreas de Atuação
            </div>
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Expertise & Competências</h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              Atuação estratégica conectando tecnologia, negócio e pessoas para acelerar resultados
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {expertiseAreas.map((area, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 group border border-slate-100 hover:border-violet-200 hover:-translate-y-1"
              >
                <div className="w-14 h-14 bg-violet-100 rounded-xl flex items-center justify-center text-violet-600 mb-5 group-hover:bg-violet-600 group-hover:text-white transition-all">
                  {area.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">{area.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{area.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IA em Pauta Section */}
      <section className="py-24 bg-gradient-to-br from-violet-900 via-indigo-900 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: 'url(/images/ai-tech.jpg)' }}
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-violet-300 text-sm font-medium mb-6 backdrop-blur-sm">
                <Brain className="w-4 h-4" />
                Projeto Autoral
              </div>
              <h2 className="text-4xl font-bold text-white mb-6">
                IA em Pauta
              </h2>
              <p className="text-lg text-slate-300 mb-6 leading-relaxed text-justify">
                Iniciativa criada para discutir e disseminar conhecimento sobre Inteligencia
                Artificial aplicada a gestão, liderança e transformação organizacional.
              </p>
              <p className="text-slate-400 mb-8 leading-relaxed text-justify">
                Conteúdos, discussões e estudos voltados para gestores e líderes que desejam
                compreender e aplicar IA de forma prática e estratégica nas organizações.
              </p>
              <a
                href="https://www.linkedin.com/in/iaempauta/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-violet-600/30 mb-6"
              >
                <Linkedin className="w-5 h-5" />
                Siga o IA em Pauta no LinkedIn
              </a>
              <div className="flex flex-wrap gap-3">
                {['IA Aplicada', 'Gestão', 'Liderança', 'Transformação', 'Inovação'].map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 bg-white/10 rounded-full text-sm text-violet-200 backdrop-blur-sm border border-white/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-violet-500/20 rounded-xl flex items-center justify-center shrink-0">
                    <Mic className="w-6 h-6 text-violet-300" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Palestras</h3>
                    <p className="text-slate-400 text-sm">
                      Temas de transformação digital, LGPD e agilidade organizacional
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-violet-500/20 rounded-xl flex items-center justify-center shrink-0">
                    <BookOpen className="w-6 h-6 text-violet-300" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Publicações</h3>
                    <p className="text-slate-400 text-sm">
                      Livros, e-Books e artigos sobre tecnologia e gestão
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-violet-500/20 rounded-xl flex items-center justify-center shrink-0">
                    <Users className="w-6 h-6 text-violet-300" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Comunidade</h3>
                    <p className="text-slate-400 text-sm">
                      Participação voluntária em educação e disseminação de conhecimento
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Career Timeline */}
      <section id="career" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-100 text-violet-700 text-sm font-medium mb-4">
              <Briefcase className="w-4 h-4" />
              Trajetória Profissional
            </div>
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Carreira</h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              Mais de 25 anos de experiência em tecnologia e transformação digital
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-violet-200 md:-translate-x-px" />

            {careerData.map((item, idx) => (
              <div
                key={idx}
                className={`relative flex flex-col md:flex-row items-start mb-12 ${
                  idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-violet-600 rounded-full border-4 border-white shadow-md -translate-x-1/2 z-10 mt-6" />

                <div className={`ml-12 md:ml-0 md:w-1/2 ${idx % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
                    <div className="flex items-center gap-2 text-sm text-violet-600 font-medium mb-2">
                      <Calendar className="w-4 h-4" />
                      {item.period}
                    </div>
                    <div className="flex items-center gap-4 mb-1">
                      {item.logo && (
                        <img
                          src={item.logo}
                          alt={`Logo ${item.company}`}
                          className="h-12 w-16 object-contain shrink-0"
                        />
                      )}
                      <h3 className="text-xl font-bold text-slate-800">{item.company}</h3>
                    </div>
                    <p className="text-violet-600 font-medium mb-3">{item.role}</p>
                    <p className="text-slate-500 text-sm leading-relaxed">{item.description}</p>
                    {item.url && (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 mt-3 text-sm text-violet-600 hover:text-violet-500 font-medium transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Visitar site
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Publications Section */}
      <section id="publications" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-100 text-violet-700 text-sm font-medium mb-4">
              <BookOpen className="w-4 h-4" />
              Publicações
            </div>
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Livros, e-Books & Artigos</h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              Compartilhando conhecimento sobre tecnologia, gestão e inteligência artificial
            </p>
          </div>

          {/* Book */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-slate-800 mb-8 text-center">Livro</h3>
            <div className="max-w-4xl mx-auto bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100 hover:border-violet-200 transition-all">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="flex items-center justify-center p-8 bg-gradient-to-br from-slate-50 to-violet-50">
                  <div className="flex gap-4">
                    <img
                      src="/images/jae-capa.jpg"
                      alt="Jornada do Ágil Escalado - Capa"
                      className="w-40 rounded-lg shadow-lg"
                    />
                    <img
                      src="/images/jae-contracapa.jpg"
                      alt="Jornada do Ágil Escalado - Contracapa"
                      className="w-40 rounded-lg shadow-lg"
                    />
                  </div>
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <span className="text-sm text-violet-600 font-medium mb-2">Co-autora</span>
                  <h4 className="text-xl font-bold text-slate-800 mb-3">Jornada do Ágil Escalado</h4>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6">
                    Entenda como a agilidade em escala com foco nas pessoas potencializa resultados de valor aos clientes. Conteúdo criado por 64 pessoas com grande atuação no mercado.
                  </p>
                  <a
                    href="https://www.amazon.com.br/Jornada-%C3%81gil-Escalado-Adriana-Sim%C3%A3o/dp/6588431112"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-violet-600/30 w-fit"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Ver na Amazon
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* e-Books */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-slate-800 mb-8 text-center">e-Books</h3>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <a
                href="https://x9x8f6d.short.gy/ebook_lideranca_rsb"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all group border border-slate-100 hover:border-violet-200 hover:-translate-y-1"
              >
                <div className="flex items-center justify-center p-6 bg-gradient-to-br from-violet-100 to-indigo-100">
                  <img
                    src="/images/ebook-lideranca.png"
                    alt="Liderança em Tempos de IA"
                    className="h-64 rounded-lg shadow-lg"
                  />
                </div>
                <div className="p-6">
                  <h4 className="text-lg font-bold text-slate-800 mb-2">Liderança em Tempos de IA</h4>
                  <p className="text-slate-500 text-sm leading-relaxed mb-3">
                    Decidir, Sustentar e Evoluir em um Mundo Automatizado
                  </p>
                  <span className="inline-flex items-center gap-1 text-violet-600 text-sm font-medium">
                    <Download className="w-4 h-4" />
                    Baixar e-Book
                  </span>
                </div>
              </a>

              <a
                href="https://x9x8f6d.short.gy/IA_Pratica_RSB"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all group border border-slate-100 hover:border-violet-200 hover:-translate-y-1"
              >
                <div className="flex items-center justify-center p-6 bg-gradient-to-br from-indigo-100 to-purple-100">
                  <img
                    src="/images/ebook-ia-pratica.png"
                    alt="IA na Prática - Do Erro ao Valor"
                    className="h-64 rounded-lg shadow-lg"
                  />
                </div>
                <div className="p-6">
                  <h4 className="text-lg font-bold text-slate-800 mb-2">IA na Prática: Do Erro ao Valor</h4>
                  <p className="text-slate-500 text-sm leading-relaxed mb-3">
                    Como estruturar, planejar e investir em IA nas empresas
                  </p>
                  <span className="inline-flex items-center gap-1 text-violet-600 text-sm font-medium">
                    <Download className="w-4 h-4" />
                    Baixar e-Book
                  </span>
                </div>
              </a>
            </div>
          </div>

          {/* Webinar */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-slate-800 mb-8 text-center">Webinar</h3>
            <div className="max-w-4xl mx-auto bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100 hover:border-violet-200 transition-all">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="flex items-center justify-center p-8 bg-gradient-to-br from-red-50 to-orange-50">
                  <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg">
                    <img
                      src="https://img.youtube.com/vi/Lbz_v7nIgD8/hqdefault.jpg"
                      alt="Webinar LGPD"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-lg">
                        <Youtube className="w-8 h-8 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <div className="inline-flex items-center gap-2 mb-3">
                    <Shield className="w-5 h-5 text-violet-600" />
                    <span className="text-sm text-violet-600 font-medium">LGPD</span>
                  </div>
                  <h4 className="text-xl font-bold text-slate-800 mb-3">Webinar sobre LGPD</h4>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6">
                    Webinar sobre Lei Geral de Proteção de Dados (LGPD), abordando aspectos práticos da implementação e adequação em times de desenvolvimento de software.
                  </p>
                  <a
                    href="https://www.youtube.com/watch?v=Lbz_v7nIgD8&t=34s"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-red-600/30 w-fit"
                  >
                    <Youtube className="w-4 h-4" />
                    Assistir no YouTube
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Articles */}
          <div>
            <h3 className="text-2xl font-bold text-slate-800 mb-8 text-center">Artigos</h3>
            <div className="max-w-md mx-auto">
              <a
                href="https://www.linkedin.com/in/rsbertolazi/recent-activity/articles/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 px-8 py-5 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all border border-slate-100 hover:border-violet-200 hover:-translate-y-1 group"
              >
                <FileText className="w-8 h-8 text-violet-600" />
                <div>
                  <h4 className="text-lg font-bold text-slate-800">Artigos no LinkedIn</h4>
                  <p className="text-slate-500 text-sm">Transformação digital, LGPD, IA e gestão</p>
                </div>
                <ExternalLink className="w-5 h-5 text-violet-400 group-hover:text-violet-600 transition-colors ml-auto" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications & Education */}
      <section id="certifications" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-100 text-violet-700 text-sm font-medium mb-4">
              <Award className="w-4 h-4" />
              Formação & Certificações
            </div>
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Educação & Credenciais</h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Academic */}
            <div className="bg-gradient-to-br from-violet-50 to-indigo-50 rounded-2xl p-8 border border-violet-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-violet-600 rounded-xl flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">Formação Acadêmica</h3>
              </div>
              <div className="space-y-4">
                {education.map((edu, idx) => (
                  <div key={idx} className="bg-white rounded-xl p-4 shadow-sm">
                    <p className="font-semibold text-slate-800 text-sm">{edu.degree}</p>
                    <p className="text-violet-600 text-sm mt-1">{edu.school}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 border border-indigo-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">Certificações</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {certifications.map((cert, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 bg-white rounded-lg text-sm text-slate-700 shadow-sm border border-slate-100 hover:border-indigo-200 transition-colors"
                  >
                    {cert}
                  </span>
                ))}
              </div>
            </div>

            {/* Executive Training */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">Formação Executiva</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {executiveTraining.map((training, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 bg-white rounded-lg text-sm text-slate-700 shadow-sm border border-slate-100 hover:border-purple-200 transition-colors"
                  >
                    {training}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-gradient-to-br from-violet-900 via-indigo-900 to-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-violet-300 text-sm font-medium mb-6 backdrop-blur-sm">
              <Mail className="w-4 h-4" />
              Contato
            </div>
            <h2 className="text-4xl font-bold text-white mb-6">Vamos conversar?</h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Estou disponível para palestras, consultorias, parcerias e oportunidades de colaboração
              em transformação digital e inteligência artificial.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Contact Form */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              {formSent ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-12">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle className="w-8 h-8 text-green-400" />
                  </div>
                  <p className="text-white text-lg font-semibold mb-2">Seu contato foi enviado com sucesso.</p>
                  <p className="text-slate-300 text-sm">Entraremos em contato em breve.</p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1.5">Nome Completo</label>
                    <input
                      type="text"
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-violet-400 focus:ring-1 focus:ring-violet-400 transition-colors"
                      placeholder="Seu nome completo"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1.5">Telefone de Contato</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="tel"
                        required
                        value={formPhone}
                        onChange={(e) => handlePhoneChange(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-violet-400 focus:ring-1 focus:ring-violet-400 transition-colors"
                        placeholder="(DD) XXXXX-XXXX"
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="whatsapp"
                      checked={formIsWhatsapp}
                      onChange={(e) => setFormIsWhatsapp(e.target.checked)}
                      className="w-4 h-4 rounded border-white/20 bg-white/10 text-violet-500 focus:ring-violet-400"
                    />
                    <label htmlFor="whatsapp" className="text-sm text-slate-300 flex items-center gap-1.5">
                      <MessageSquare className="w-4 h-4 text-green-400" />
                      Marque esse campo se o telefone informado também for WhatsApp
                    </label>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1.5">
                      Mensagem <span className="text-slate-400">({formMessage.length}/300)</span>
                    </label>
                    <textarea
                      required
                      maxLength={300}
                      rows={4}
                      value={formMessage}
                      onChange={(e) => setFormMessage(e.target.value)}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-violet-400 focus:ring-1 focus:ring-violet-400 transition-colors resize-none"
                      placeholder="Escreva sua mensagem aqui..."
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={formSending}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-violet-600 hover:bg-violet-500 disabled:bg-violet-800 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all shadow-lg shadow-violet-600/30"
                  >
                    <Send className="w-4 h-4" />
                    {formSending ? 'Enviando...' : 'Enviar'}
                  </button>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div className="flex flex-col justify-center gap-6">
              <a
                href="mailto:rsbgestao@gmail.com"
                className="flex items-center gap-4 px-6 py-4 bg-white/10 hover:bg-white/20 rounded-2xl text-white transition-all backdrop-blur-sm border border-white/10 hover:border-white/20 group"
              >
                <Mail className="w-6 h-6 text-violet-300 group-hover:text-violet-200" />
                <div className="text-left">
                  <div className="text-sm text-slate-400">E-mail</div>
                  <div className="font-medium">rsbgestao@gmail.com</div>
                </div>
              </a>
              <a
                href="https://www.linkedin.com/in/rsbertolazi/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 px-6 py-4 bg-white/10 hover:bg-white/20 rounded-2xl text-white transition-all backdrop-blur-sm border border-white/10 hover:border-white/20 group"
              >
                <Linkedin className="w-6 h-6 text-violet-300 group-hover:text-violet-200" />
                <div className="text-left">
                  <div className="text-sm text-slate-400">LinkedIn</div>
                  <div className="font-medium">rsbertolazi</div>
                </div>
              </a>
              <a
                href="https://www.linkedin.com/in/iaempauta/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 px-6 py-4 bg-white/10 hover:bg-white/20 rounded-2xl text-white transition-all backdrop-blur-sm border border-white/10 hover:border-white/20 group"
              >
                <Mic className="w-6 h-6 text-violet-300 group-hover:text-violet-200" />
                <div className="text-left">
                  <div className="text-sm text-slate-400">IA em Pauta</div>
                  <div className="font-medium">iaempauta</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 py-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-slate-400 text-sm">
              &copy; {new Date().getFullYear()} Rosiana da Silva Bertolazi. Todos os direitos reservados.
            </div>
            <div className="flex items-center gap-6">
              <button
                onClick={() => scrollTo('contact')}
                className="text-slate-400 hover:text-violet-400 transition-colors cursor-pointer"
              >
                <Mail className="w-5 h-5" />
              </button>
              <a
                href="https://www.linkedin.com/in/rsbertolazi/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-violet-400 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
