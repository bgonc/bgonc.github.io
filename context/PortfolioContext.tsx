import React, { createContext, useContext, useState, useEffect } from 'react';
import { PortfolioData } from '../types';
import { PORTFOLIO_DATA_EN, PORTFOLIO_DATA_PT } from '../constants';

type Language = 'en' | 'pt';
type Theme = 'light' | 'dark';

interface Labels {
  home: string;
  about: string;
  experience: string;
  projects: string;
  contact: string;
  available: string;
  viewWork: string;
  contactMe: string;
  yearsExp: string;
  projectsComp: string;
  techProf: string;
  featuredProjects: string;
  code: string;
  liveDemo: string;
  letsWork: string;
  sayHello: string;
  footer: string;
  adminAccess: string;
}

const LABELS_EN: Labels = {
  home: 'Home',
  about: 'About',
  experience: 'Experience',
  projects: 'Projects',
  contact: 'Contact',
  available: 'Currently available for work',
  viewWork: 'View My Work',
  contactMe: 'Contact Me',
  yearsExp: 'Years Experience',
  projectsComp: 'Projects Completed',
  techProf: 'Technical Proficiency',
  featuredProjects: 'Featured Projects',
  code: 'Code',
  liveDemo: 'Live Demo',
  letsWork: "Let's Work Together",
  sayHello: 'Say Hello',
  footer: 'Built with React and Tailwind.',
  adminAccess: 'Admin Access'
};

const LABELS_PT: Labels = {
  home: 'Início',
  about: 'Sobre',
  experience: 'Experiência',
  projects: 'Projetos',
  contact: 'Contacto',
  available: 'Disponível para trabalhar',
  viewWork: 'Ver Portfólio',
  contactMe: 'Contactar',
  yearsExp: 'Anos de Experiência',
  projectsComp: 'Projetos Concluídos',
  techProf: 'Proficiência Técnica',
  featuredProjects: 'Projetos em Destaque',
  code: 'Código',
  liveDemo: 'Demo',
  letsWork: "Vamos Trabalhar Juntos",
  sayHello: 'Diga Olá',
  footer: 'Criado com React e Tailwind.',
  adminAccess: 'Acesso Admin'
};

interface PortfolioContextType {
  data: PortfolioData;
  updateData: (newData: PortfolioData) => void;
  resetData: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  toggleTheme: () => void;
  labels: Labels;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // UI State
  const [language, setLanguageState] = useState<Language>('en');
  const [theme, setThemeState] = useState<Theme>('dark');
  
  // Data State
  const [data, setData] = useState<PortfolioData>(PORTFOLIO_DATA_EN);
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize Theme & Language from storage
  useEffect(() => {
    // Theme Logic
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme) {
      setThemeState(savedTheme);
      applyTheme(savedTheme);
    } else {
      applyTheme('dark'); // Default
    }

    // Language & Data Logic
    const savedLang = (localStorage.getItem('language') as Language) || 'en';
    setLanguageState(savedLang);
    loadDataForLanguage(savedLang);
    
    setIsLoaded(true);
  }, []);

  const applyTheme = (t: Theme) => {
    const root = window.document.documentElement;
    if (t === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setThemeState(newTheme);
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  };

  const loadDataForLanguage = (lang: Language) => {
    const storageKey = `portfolio_data_${lang}`;
    const savedData = localStorage.getItem(storageKey);
    
    let activeData: PortfolioData;
    
    if (savedData) {
      try {
        activeData = JSON.parse(savedData);
      } catch (e) {
        console.error("Failed to parse data", e);
        activeData = lang === 'pt' ? PORTFOLIO_DATA_PT : PORTFOLIO_DATA_EN;
      }
    } else {
      activeData = lang === 'pt' ? PORTFOLIO_DATA_PT : PORTFOLIO_DATA_EN;
    }

    setData(activeData);
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
    loadDataForLanguage(lang);
  };

  const updateData = (newData: PortfolioData) => {
    setData(newData);
    localStorage.setItem(`portfolio_data_${language}`, JSON.stringify(newData));
  };

  const resetData = () => {
    const defaultData = language === 'pt' ? PORTFOLIO_DATA_PT : PORTFOLIO_DATA_EN;
    setData(defaultData);
    localStorage.removeItem(`portfolio_data_${language}`);
  };

  if (!isLoaded) return null;

  const labels = language === 'pt' ? LABELS_PT : LABELS_EN;

  return (
    <PortfolioContext.Provider value={{ 
      data, 
      updateData, 
      resetData, 
      language, 
      setLanguage, 
      theme, 
      toggleTheme, 
      labels 
    }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};