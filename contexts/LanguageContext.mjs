'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const translations = {
  en: {
    dashboard: 'Dashboard',
    layouts: 'Layouts',
    components: 'Components',
    pages: 'Pages',
    applications: 'Applications',
    ui: 'UI',
    menu: 'Menu',
    submenu: 'Submenu',
    search: 'Search...',
    notifications: 'Notifications',
    profile: 'Profile',
    settings: 'Settings',
    signOut: 'Sign Out',
    light: 'Light',
    dark: 'Dark',
    system: 'System',
    english: 'English',
    spanish: 'Spanish',
  },
  es: {
    dashboard: 'Tablero',
    layouts: 'Diseños',
    components: 'Componentes',
    pages: 'Páginas',
    applications: 'Aplicaciones',
    ui: 'Interfaz',
    menu: 'Menú',
    submenu: 'Submenú',
    search: 'Buscar...',
    notifications: 'Notificaciones',
    profile: 'Perfil',
    settings: 'Configuración',
    signOut: 'Cerrar Sesión',
    light: 'Claro',
    dark: 'Oscuro',
    system: 'Sistema',
    english: 'Inglés',
    spanish: 'Español',
  }
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en');
  const [t, setT] = useState(translations.en);

  useEffect(() => {
    // Load saved language preference or use browser language
    const savedLanguage = localStorage.getItem('language') || 
      (navigator.language.startsWith('es') ? 'es' : 'en');
    setLanguage(savedLanguage);
    setT(translations[savedLanguage] || translations.en);
  }, []);

  const changeLanguage = (lang) => {
    if (translations[lang]) {
      setLanguage(lang);
      setT(translations[lang]);
      localStorage.setItem('language', lang);
    }
  };

  const translate = (key) => {
    return t[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t: translate }}>
      {children}
    </LanguageContext.Provider>
  );
}
