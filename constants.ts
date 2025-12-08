import { PortfolioData } from './types';

// -------------------------------------------------------
// NOTE: This data is populated from your CV and current status.
// -------------------------------------------------------

export const PORTFOLIO_DATA_EN: PortfolioData = {
  name: "Bruno Gonçalves",
  title: "IT Support Specialist & Computer Engineering Student",
  location: "Helsinki, Finland",
  email: "bruno.m.goncalves@pm.me",
  resumeUrl: "#",
  bio: "IT support and service operations professional with a background in technical troubleshooting, infrastructure fundamentals, and customer support. After leading service teams and operations for nearly a decade, I am returning to the technical path with updated certifications (AWS, Linux, CCNA) and a BSc in Computer Engineering in progress. I specialize in SaaS support, systems administration, and cloud infrastructure.",
  socials: [
    { platform: "GitHub", url: "https://github.com/bgonc", iconClass: "fab fa-github" },
    { platform: "LinkedIn", url: "https://linkedin.com/in/brunogoncalvesss", iconClass: "fab fa-linkedin" },
    { platform: "Website", url: "https://bgonc.github.io", iconClass: "fas fa-globe" },
  ],
  skills: [
    { name: "AWS Cloud", level: 75, category: "Backend" },
    { name: "Linux Administration", level: 80, category: "Backend" },
    { name: "Networking (CCNA)", level: 85, category: "Backend" },
    { name: "SaaS Support", level: 95, category: "Tools" },
    { name: "Troubleshooting", level: 95, category: "Tools" },
    { name: "Customer Service", level: 95, category: "Tools" },
  ],
  experience: [
    {
      id: 1,
      role: "Support Specialist (Provet Cloud)",
      company: "Nordhealth",
      period: "Present",
      description: "Currently working as a Support Specialist for Provet Cloud, a leading veterinary practice management software. Focusing on technical troubleshooting, SaaS platform support, and ensuring customer success in a dynamic environment."
    },
    {
      id: 2,
      role: "Team Leader, Senior Customer Service Specialist",
      company: "Swappie Oy",
      period: "Mar 2021 – Aug 2025",
      description: "Led a multilingual customer service team in a fast-paced e-commerce environment. Supported users with complex product and platform issues, improved workflows and onboarding, and collaborated with Product/IT teams to resolve platform issues."
    },
    {
      id: 3,
      role: "Service Supervisor & Team Leader",
      company: "Sol Palvelut Oy",
      period: "Oct 2011 – Feb 2021",
      description: "Supervised a multi-site service team ensuring high operational standards. Implemented process improvements in scheduling and resource allocation, and handled payroll and administrative coordination over a nine-year tenure."
    },
    {
      id: 4,
      role: "IT Support & Network Specialist",
      company: "Mobbit Systems",
      period: "Jan 2008 - Sep 2011",
      description: "Delivered Tier 1/2 technical support for clients including the National Bank of Portugal. Resolved hardware, DNS, DHCP, and VPN issues. Participated in network deployments (routers, switches, firewalls) and provided on-site software support."
    }
  ],
  projects: [
    {
      id: 1,
      title: "AWS Cloud Infrastructure",
      description: "Implementation of scalable cloud architectures using AWS services. Focus on high availability, security best practices, and cost optimization as part of the AWS Certified Cloud Practitioner certification.",
      technologies: ["AWS", "EC2", "S3", "IAM"],
      imageUrl: "https://picsum.photos/600/400?random=10",
      githubUrl: "https://github.com/bgonc",
    },
    {
      id: 2,
      title: "Linux Automation & Scripting",
      description: "Collection of shell scripts and automation tools for system administration tasks, user management, and log analysis, developed during Linux Essentials training.",
      technologies: ["Linux", "Bash", "Shell Scripting", "Cron"],
      imageUrl: "https://picsum.photos/600/400?random=11",
      githubUrl: "https://github.com/bgonc",
    },
    {
      id: 3,
      title: "Network Topology Design",
      description: "Design and simulation of complex enterprise network topologies including VLANs, OSPF routing, and ACL security configurations based on CCNA curriculum.",
      technologies: ["Cisco Packet Tracer", "Networking", "TCP/IP", "OSPF"],
      imageUrl: "https://picsum.photos/600/400?random=12",
      githubUrl: "https://github.com/bgonc",
    }
  ]
};

export const PORTFOLIO_DATA_PT: PortfolioData = {
  name: "Bruno Gonçalves",
  title: "Especialista de Suporte TI e Estudante de Eng. Informática",
  location: "Helsínquia, Finlândia",
  email: "bruno.m.goncalves@pm.me",
  resumeUrl: "#",
  bio: "Profissional de suporte TI e operações com experiência em resolução de problemas técnicos, fundamentos de infraestrutura e apoio ao cliente. Após liderar equipas de serviço e operações durante quase uma década, estou a regressar à área técnica com certificações atualizadas (AWS, Linux, CCNA) e uma Licenciatura em Engenharia Informática em curso. Especializo-me em suporte SaaS, administração de sistemas e infraestrutura cloud.",
  socials: [
    { platform: "GitHub", url: "https://github.com/bgonc", iconClass: "fab fa-github" },
    { platform: "LinkedIn", url: "https://linkedin.com/in/brunogoncalvesss", iconClass: "fab fa-linkedin" },
    { platform: "Website", url: "https://bgonc.github.io", iconClass: "fas fa-globe" },
  ],
  skills: [
    { name: "AWS Cloud", level: 75, category: "Backend" },
    { name: "Administração Linux", level: 80, category: "Backend" },
    { name: "Redes (CCNA)", level: 85, category: "Backend" },
    { name: "Suporte SaaS", level: 95, category: "Tools" },
    { name: "Resolução de Problemas", level: 95, category: "Tools" },
    { name: "Atendimento ao Cliente", level: 95, category: "Tools" },
  ],
  experience: [
    {
      id: 1,
      role: "Especialista de Suporte (Provet Cloud)",
      company: "Nordhealth",
      period: "Presente",
      description: "Atualmente a trabalhar como Especialista de Suporte para o Provet Cloud, um software líder de gestão de clínicas veterinárias. Foco na resolução de problemas técnicos, suporte à plataforma SaaS e garantia do sucesso do cliente num ambiente dinâmico."
    },
    {
      id: 2,
      role: "Líder de Equipa, Especialista Sénior de Apoio ao Cliente",
      company: "Swappie Oy",
      period: "Mar 2021 – Ago 2025",
      description: "Liderança de uma equipa multilingue de apoio ao cliente num ambiente de e-commerce acelerado. Suporte a utilizadores com problemas complexos de produto e plataforma, melhoria de fluxos de trabalho e integração, e colaboração com equipas de Produto/TI para resolver problemas da plataforma."
    },
    {
      id: 3,
      role: "Supervisor de Serviços e Líder de Equipa",
      company: "Sol Palvelut Oy",
      period: "Out 2011 – Fev 2021",
      description: "Supervisão de uma equipa de serviço multi-site, garantindo elevados padrões operacionais. Implementação de melhorias de processos no agendamento e alocação de recursos, e gestão de coordenação administrativa e salarial ao longo de nove anos."
    },
    {
      id: 4,
      role: "Especialista de Suporte TI e Redes",
      company: "Mobbit Systems",
      period: "Jan 2008 - Set 2011",
      description: "Suporte técnico de Nível 1 e 2 para clientes, incluindo o Banco de Portugal. Resolução de problemas de hardware, DNS, DHCP e VPN. Participação em implementações de rede (routers, switches, firewalls) e suporte de software on-site."
    }
  ],
  projects: [
    {
      id: 1,
      title: "Infraestrutura Cloud AWS",
      description: "Implementação de arquiteturas cloud escaláveis usando serviços AWS. Foco em alta disponibilidade, melhores práticas de segurança e otimização de custos como parte da certificação AWS Cloud Practitioner.",
      technologies: ["AWS", "EC2", "S3", "IAM"],
      imageUrl: "https://picsum.photos/600/400?random=10",
      githubUrl: "https://github.com/bgonc",
    },
    {
      id: 2,
      title: "Automação Linux e Scripting",
      description: "Coleção de shell scripts e ferramentas de automação para tarefas de administração de sistemas, gestão de utilizadores e análise de logs, desenvolvidos durante a formação Linux Essentials.",
      technologies: ["Linux", "Bash", "Shell Scripting", "Cron"],
      imageUrl: "https://picsum.photos/600/400?random=11",
      githubUrl: "https://github.com/bgonc",
    },
    {
      id: 3,
      title: "Design de Topologia de Rede",
      description: "Design e simulação de topologias de rede empresariais complexas, incluindo VLANs, encaminhamento OSPF e configurações de segurança ACL baseadas no currículo CCNA.",
      technologies: ["Cisco Packet Tracer", "Networking", "TCP/IP", "OSPF"],
      imageUrl: "https://picsum.photos/600/400?random=12",
      githubUrl: "https://github.com/bgonc",
    }
  ]
};

// Default export for backward compatibility if needed, mostly used by context now
export const PORTFOLIO_DATA = PORTFOLIO_DATA_EN;