import { PortfolioData } from './types';

// -------------------------------------------------------
// NOTE: This data is populated from your CV and current status.
// -------------------------------------------------------

export const PORTFOLIO_DATA_EN: PortfolioData = {
  name: "bruno_",
  title: "Technical Support Specialist | Linux & Open Source Enthusiast",
  location: "Helsinki, Finland",
  email: ["contact", "goncalves.fi"].join("@"),
  resumeUrl: "#",
  bio: "I work in technical support for a SaaS platform and enjoy understanding how systems work behind the scenes. Outside work, I experiment with Linux, automation, and privacy-focused tools. I am especially interested in infrastructure, security, and open-source technologies.",
  socials: [
    { platform: "GitHub", url: "https://github.com/bgonc", iconClass: "fab fa-github" },
    { platform: "LinkedIn", url: "https://linkedin.com/in/brunogoncalvesss", iconClass: "fab fa-linkedin" },
    { platform: "Website", url: "https://bgonc.github.io", iconClass: "fas fa-globe" },
  ],
  skills: [
    { name: "Linux Admin", level: 90, category: "Backend" },
    { name: "Bash Scripting", level: 85, category: "Backend" },
    { name: "AWS SAA Prep", level: 80, category: "Backend" },
    { name: "Networking", level: 75, category: "Backend" },
    { name: "Docker", level: 70, category: "Tools" },
    { name: "Git", level: 85, category: "Tools" },
  ],
  experience: [
    {
      id: 1,
      role: "Support Specialist | B2B SaaS",
      company: "Nordhealth",
      period: "Sep 2025 - Present",
      description: "Support veterinary clinics using Provet Cloud via chat, email, and remote sessions. Troubleshoot configuration and workflow issues, and escalate product bugs with clear technical context."
    },
    {
      id: 2,
      role: "Senior Customer Support Specialist",
      company: "Swappie Oy",
      period: "Mar 2021 - Aug 2025",
      description: "Handled complex platform and customer incidents in a high-volume ecommerce environment. Improved onboarding and support workflows, and led a small multilingual support team."
    },
    {
      id: 3,
      role: "Service Supervisor & Team Leader",
      company: "SOL Palvelut Oy",
      period: "Oct 2011 - Feb 2021",
      description: "Managed daily multi-site operations including staffing, scheduling, and service quality. Introduced process improvements to keep teams aligned and delivery consistent."
    },
    {
      id: 4,
      role: "IT Support & Network Specialist",
      company: "Mobbit Systems / DoisBR",
      period: "Jan 2008 - Sep 2011",
      description: "Delivered Tier 1 and Tier 2 IT support for business clients, including network troubleshooting and infrastructure setup. Worked on DNS, DHCP, VPN, hardware, and connectivity issues."
    }
  ],
  projects: [
    {
      id: 1,
      title: "System Dashboard",
      description: "A personal desktop dashboard project for Wayland and Hyprland. It tracks system health, services, updates, and cloud sync in one window.",
      technologies: ["Python", "PyQt6", "Systemd", "psutil"],
      imageUrl: "/images/projects/home-lab.png",
      repositoryUrl: "https://github.com/bgonc/system-dashboard",
    },
    {
      id: 2,
      title: "Excel Utils",
      description: "A browser tool I built to process spreadsheet exports with filters, merges, and reporting. Everything runs client-side.",
      technologies: ["JavaScript", "HTML", "CSS", "SheetJS"],
      imageUrl: "/images/projects/dotfiles.png",
      repositoryUrl: "https://github.com/bgonc/excel-utils",
      liveUrl: "https://bgonc.github.io/excel-utils",
    },
    {
      id: 3,
      title: "Polar AI Coach",
      description: "AI-powered training coach that connects to Polar watch data. Features readiness scoring, sleep and stress analysis, interactive HR charts, adaptive training plans, and daily AI coaching with weather awareness.",
      technologies: ["Python", "Flask", "OpenRouter AI", "Polar API", "Canvas"],
      imageUrl: "/images/projects/polar-coach.png",
      repositoryUrl: "https://github.com/bgonc/polar-coach",
    },
    {
      id: 4,
      title: "Portfolio Website",
      description: "My personal website for sharing projects and learning progress, built with React and TypeScript.",
      technologies: ["React", "TypeScript", "Vite", "Tailwind"],
      imageUrl: "/images/projects/rhcsa.png",
      repositoryUrl: "https://github.com/bgonc/bgonc.github.io",
      liveUrl: "https://bgonc.github.io",
    }
  ],
  blogPosts: [
    {
      id: 1,
      title: "Why I switched to Linux full-time",
      excerpt: "My journey from Windows/Mac to a fully customized Linux environment, and why I'll never go back.",
      date: "Dec 08, 2024",
      readTime: "5 min read",
      imageUrl: "https://picsum.photos/600/400?random=30"
    },
    {
      id: 2,
      title: "Preparing for AWS SAA: Week 1",
      excerpt: "First week of AWS SAA prep, covering IAM, EC2, and foundational architecture concepts.",
      date: "Dec 01, 2024",
      readTime: "3 min read",
      imageUrl: "https://picsum.photos/600/400?random=31"
    }
  ]
};

export const PORTFOLIO_DATA = PORTFOLIO_DATA_EN;
