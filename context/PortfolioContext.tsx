import React, { createContext, useContext, useState, useEffect } from 'react';
import { PortfolioData } from '../types';
import { PORTFOLIO_DATA_EN } from '../constants';


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



interface PortfolioContextType {
  data: PortfolioData;
  updateData: (newData: PortfolioData) => void;
  resetData: () => void;
  theme: Theme;
  toggleTheme: () => void;
  labels: Labels;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // UI State
  const [theme, setThemeState] = useState<Theme>('dark');

  // Data State
  const [data, setData] = useState<PortfolioData>(PORTFOLIO_DATA_EN);
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize Theme from storage
  useEffect(() => {
    // Theme Logic
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme) {
      setThemeState(savedTheme);
      applyTheme(savedTheme);
    } else {
      applyTheme('dark'); // Default
    }

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

  const updateData = (newData: PortfolioData) => {
    setData(newData);
    // Persist if needed or simpler just memory for now
  };

  const resetData = () => {
    setData(PORTFOLIO_DATA_EN);
  };

  if (!isLoaded) return null;

  const labels = LABELS_EN;

  return (
    <PortfolioContext.Provider value={{
      data,
      updateData,
      resetData,
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