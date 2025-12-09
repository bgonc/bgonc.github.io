import { PortfolioData } from './types';

// -------------------------------------------------------
// NOTE: This data is populated from your CV and current status.
// -------------------------------------------------------

export const PORTFOLIO_DATA_EN: PortfolioData = {
  name: "bruno_",
  title: "IT Student | Linux & Open Source Enthusiast",
  location: "Helsinki, Finland",
  email: "bruno.m.goncalves@pm.me",
  resumeUrl: "#",
  bio: "Passionate about Linux systems and open source technology. Currently preparing for RHCSA certification and diving deep into system administration, automation, and infrastructure management. I love exploring new distributions, optimizing workflows with Bash scripts, and contributing to the open source community.",
  socials: [
    { platform: "GitHub", url: "https://github.com/bgonc", iconClass: "fab fa-github" },
    { platform: "LinkedIn", url: "https://linkedin.com/in/brunogoncalvesss", iconClass: "fab fa-linkedin" },
    { platform: "Website", url: "https://bgonc.github.io", iconClass: "fas fa-globe" },
  ],
  skills: [
    { name: "Linux Admin", level: 90, category: "Backend" },
    { name: "Bash Scripting", level: 85, category: "Backend" },
    { name: "RHCSA Prep", level: 80, category: "Backend" },
    { name: "Networking", level: 75, category: "Backend" },
    { name: "Docker", level: 70, category: "Tools" },
    { name: "Git", level: 85, category: "Tools" },
  ],
  experience: [
    {
      id: 1,
      role: "Support Specialist (Provet Cloud)",
      company: "Nordhealth",
      period: "Present",
      description: "Providing technical support for veterinary practice management software, involving troubleshooting and system diagnostics."
    },
    // ... previous experience kept for history, or shortened if user wants less clutter. Keeping as is for now but focusing on Linux.
    {
      id: 2,
      role: "Team Leader, Senior Customer Service Specialist",
      company: "Swappie Oy",
      period: "Mar 2021 – Aug 2025",
      description: "Led service teams and handled complex technical issues in an e-commerce environment."
    },
    {
      id: 3,
      role: "Service Supervisor & Team Leader",
      company: "Sol Palvelut Oy",
      period: "Oct 2011 – Feb 2021",
      description: "Supervised service operations and team management."
    },
    {
      id: 4,
      role: "IT Support & Network Specialist",
      company: "Mobbit Systems",
      period: "Jan 2008 - Sep 2011",
      description: "Delivered Tier 1/2 technical support, network supervision, and hardware troubleshooting."
    }
  ],
  projects: [
    {
      id: 1,
      title: "Home Lab Setup",
      description: "Configuring a Proxmox home lab for virtualization, experimenting with different Linux distros and container orchestration.",
      technologies: ["Proxmox", "Linux", "Docker", "Networking"],
      imageUrl: "https://picsum.photos/600/400?random=20",
      githubUrl: "https://github.com/bgonc",
    },
    {
      id: 2,
      title: "Dotfiles & Automation",
      description: "My personal collection of dotfiles and automation scripts to set up a productive Linux development environment.",
      technologies: ["Bash", "Lua", "Neovim", "Tmux"],
      imageUrl: "https://picsum.photos/600/400?random=21",
      githubUrl: "https://github.com/bgonc",
    },
    {
      id: 3,
      title: "RHCSA Study Notes",
      description: "A comprehensive repository of notes and practical exercises for the Red Hat Certified System Administrator exam.",
      technologies: ["RHEL", "Systemd", "LVM", "SELinux"],
      imageUrl: "https://picsum.photos/600/400?random=22",
      githubUrl: "https://github.com/bgonc",
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
      title: "Preparing for RHCSA: Week 1",
      excerpt: "First week of studying for the Red Hat exam. Covering file management and basic commands.",
      date: "Dec 01, 2024",
      readTime: "3 min read",
      imageUrl: "https://picsum.photos/600/400?random=31"
    }
  ]
};

export const PORTFOLIO_DATA = PORTFOLIO_DATA_EN;