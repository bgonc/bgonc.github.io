import { PortfolioData } from './types';

// -------------------------------------------------------
// NOTE: This data is populated from your CV and current status.
// -------------------------------------------------------

export const PORTFOLIO_DATA_EN: PortfolioData = {
  name: "bruno_",
  title: "IT Student | Technical Support Specialist",
  location: "Helsinki, Finland",
  email: ["contact", "goncalves.fi"].join("@"),
  resumeUrl: "#",
  bio: "I work in technical support and study IT. Most of my projects are practical tools I build while learning Linux, cloud fundamentals, and automation. Currently preparing for AWS Solutions Architect Associate (AWS SAA).",
  socials: [
    { platform: "Codeberg", url: "https://codeberg.org/bgonc", iconClass: "", iconSvgPath: "M11.999.747A11.974 11.974 0 0 0 0 12.75c0 2.254.635 4.465 1.833 6.376L11.837 6.19c.072-.092.251-.092.323 0l4.178 5.402h-2.992l.065.239h3.113l.882 1.138h-3.674l.103.374h3.86l.777 1.003h-4.358l.135.483h4.593l.695.894h-5.038l.165.589h5.326l.609.785h-5.717l.182.65h6.038l.562.727h-6.397l.183.65h6.717A12.003 12.003 0 0 0 24 12.75 11.977 11.977 0 0 0 11.999.747zm3.654 19.104.182.65h5.326c.173-.204.353-.433.513-.65zm.385 1.377.18.65h3.563c.233-.198.485-.428.712-.65zm.383 1.377.182.648h1.203c.356-.204.685-.412 1.042-.648z" },
    { platform: "LinkedIn", url: "https://linkedin.com/in/brunogoncalvesss", iconClass: "fab fa-linkedin" },
    { platform: "Website", url: "https://bgonc.codeberg.page", iconClass: "fas fa-globe" },
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
      codebergUrl: "https://codeberg.org/bgonc/system-dashboard",
    },
    {
      id: 2,
      title: "Provet Report Studio",
      description: "A browser tool I built to process Provet exports with filters, merges, and reporting. Everything runs client-side.",
      technologies: ["JavaScript", "HTML", "CSS", "SheetJS"],
      imageUrl: "/images/projects/dotfiles.png",
      codebergUrl: "https://codeberg.org/bgonc/provet-report-studio",
      liveUrl: "https://bgonc.codeberg.page/provet-report-studio",
    },
    {
      id: 3,
      title: "Portfolio Website",
      description: "My personal website for sharing projects and learning progress, built with React and TypeScript.",
      technologies: ["React", "TypeScript", "Vite", "Tailwind"],
      imageUrl: "/images/projects/rhcsa.png",
      codebergUrl: "https://codeberg.org/bgonc/portfolio",
      liveUrl: "https://bgonc.codeberg.page",
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
