import React, { useContext } from 'react';
import { ThemeContext } from '../App';
import { useLanguage } from '../contexts/LanguageContext';

const ThemeToggle = () => {
  const { isDarkTheme, setIsDarkTheme } = useContext(ThemeContext);
  // Exercice 2: Utilisation du contexte de langue
  const { t } = useLanguage();
  
  return (
    <button
      onClick={() => setIsDarkTheme(!isDarkTheme)}
      className={`px-5 py-2 rounded ${
        isDarkTheme 
          ? 'bg-dark text-light border border-light' 
          : 'bg-light text-dark border border-dark'
      }`}
    >
      {isDarkTheme ? t('lightMode') : t('darkMode')}
    </button>
  );
};

export default ThemeToggle;