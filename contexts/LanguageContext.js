'use client';
const { createContext, useContext, useState, useEffect } = require('react');

const LanguageContext = createContext();

function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

const translations = {
  en: {
    dashboard: 'Dashboard',
    layouts: 'Layouts',
    changelog: 'Changelog',
    email: 'Email',
    chat: 'Chat',
    ecommerce: 'eCommerce',
    socialApp: 'Social App',
    project: 'Project',
    calendar: 'Calendar',
    users: 'Users',
    contact: 'Contact',
    note: 'Note',
    toDo: 'To Do',
    kanbanBoard: 'Kanban Board',
    importExport: 'Import Export',
    task: 'Task',
    socialMediaDashboard: 'Social Media Dashboard',
    socialMediaOverview: 'Social Media Overview',
    facebookOverview: 'Facebook Overview',
    twitterOverview: 'Twitter Overview',
    instagramOverview: 'Instagram Overview',
    youtubeSubscribers: 'Youtube Subscribers',
    likes: 'Likes',
    followers: 'Followers',
    subscribers: 'Subscribers',
    engagedUsers: 'Engaged Users',
    pageImpressions: 'Page Impressions',
    totalPageLikes: 'Total Page Likes',
    tweets: 'Tweets',
    tweetImpressions: 'Tweet Impressions',
    retweets: 'Retweets',
    engagementRate: 'Engagement rate',
    posts: 'Posts',
    comments: 'Comments',
    newFollowers: 'New Followers',
  },
  es: {
    dashboard: 'Tablero',
    layouts: 'Diseños',
    changelog: 'Registro de cambios',
    email: 'Correo',
    chat: 'Chat',
    ecommerce: 'Comercio',
    socialApp: 'Red Social',
    project: 'Proyecto',
    calendar: 'Calendario',
    users: 'Usuarios',
    contact: 'Contacto',
    note: 'Nota',
    toDo: 'Tareas',
    kanbanBoard: 'Tablero Kanban',
    importExport: 'Importar/Exportar',
    task: 'Tarea',
    socialMediaDashboard: 'Panel de Redes Sociales',
    socialMediaOverview: 'Resumen de Redes Sociales',
    facebookOverview: 'Resumen de Facebook',
    twitterOverview: 'Resumen de Twitter',
    instagramOverview: 'Resumen de Instagram',
    youtubeSubscribers: 'Suscriptores de YouTube',
    likes: 'Me gusta',
    followers: 'Seguidores',
    subscribers: 'Suscriptores',
    engagedUsers: 'Usuarios comprometidos',
    pageImpressions: 'Impresiones de página',
    totalPageLikes: 'Total de me gusta en la página',
    tweets: 'Tweets',
    tweetImpressions: 'Impresiones de tweets',
    retweets: 'Retweets',
    engagementRate: 'Tasa de compromiso',
    posts: 'Publicaciones',
    comments: 'Comentarios',
    newFollowers: 'Nuevos seguidores',
  },
  fr: {
    dashboard: 'Tableau de bord',
    layouts: 'Mises en page',
    changelog: 'Journal des modifications',
    email: 'Email',
    chat: 'Chat',
    ecommerce: 'Commerce',
    socialApp: 'Réseau social',
    project: 'Projet',
    calendar: 'Calendrier',
    users: 'Utilisateurs',
    contact: 'Contact',
    note: 'Note',
    toDo: 'À faire',
    kanbanBoard: 'Tableau Kanban',
    importExport: 'Import/Export',
    task: 'Tâche',
    socialMediaDashboard: 'Tableau de bord des réseaux sociaux',
    socialMediaOverview: 'Aperçu des réseaux sociaux',
    facebookOverview: 'Aperçu de Facebook',
    twitterOverview: 'Aperçu de Twitter',
    instagramOverview: 'Aperçu d\'Instagram',
    youtubeSubscribers: 'Abonnés YouTube',
    likes: 'J\'aime',
    followers: 'Abonnés',
    subscribers: 'Abonnés',
    engagedUsers: 'Utilisateurs engagés',
    pageImpressions: 'Impressions de page',
    totalPageLikes: 'Total des j\'aime sur la page',
    tweets: 'Tweets',
    tweetImpressions: 'Impressions de tweets',
    retweets: 'Retweets',
    engagementRate: 'Taux d\'engagement',
    posts: 'Publications',
    comments: 'Commentaires',
    newFollowers: 'Nouveaux abonnés',
  },
  de: {
    dashboard: 'Armaturenbrett',
    layouts: 'Layouts',
    changelog: 'Änderungsprotokoll',
    email: 'E-Mail',
    chat: 'Chat',
    ecommerce: 'E-Commerce',
    socialApp: 'Soziales Netzwerk',
    project: 'Projekt',
    calendar: 'Kalender',
    users: 'Benutzer',
    contact: 'Kontakt',
    note: 'Hinweis',
    toDo: 'Aufgaben',
    kanbanBoard: 'Kanban-Board',
    importExport: 'Import/Export',
    task: 'Aufgabe',
    socialMediaDashboard: 'Social-Media-Dashboard',
    socialMediaOverview: 'Social-Media-Übersicht',
    facebookOverview: 'Facebook-Übersicht',
    twitterOverview: 'Twitter-Übersicht',
    instagramOverview: 'Instagram-Übersicht',
    youtubeSubscribers: 'YouTube-Abonnenten',
    likes: 'Gefällt mir',
    followers: 'Follower',
    subscribers: 'Abonnenten',
    engagedUsers: 'Aktive Benutzer',
    pageImpressions: 'Seitenaufrufe',
    totalPageLikes: 'Gefällt-mir-Angaben insgesamt',
    tweets: 'Tweets',
    tweetImpressions: 'Tweet-Impressionen',
    retweets: 'Retweets',
    engagementRate: 'Engagement-Rate',
    posts: 'Beiträge',
    comments: 'Kommentare',
    newFollowers: 'Neue Follower',
  },
};

function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Only access localStorage after component is mounted
    const savedLanguage = typeof window !== 'undefined' ? localStorage.getItem('language') || 'en' : 'en';
    setLanguage(savedLanguage);
  }, []);

  const t = (key) => {
    return translations[language]?.[key] || key;
  };

  const changeLanguage = (lang) => {
    setLanguage(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', lang);
    }
  };

  // Don't render the children until we've determined the language on the client side
  if (!mounted) {
    return null;
  }

  return (
    <LanguageContext.Provider value={{ language, t, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

module.exports = { LanguageProvider, useLanguage };