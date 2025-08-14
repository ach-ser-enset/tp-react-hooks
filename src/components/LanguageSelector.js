import React, { useContext } from 'react';
import { ThemeContext } from '../App';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageSelector = () => {
  const { isDarkTheme } = useContext(ThemeContext);
  const { currentLanguage, changeLanguage, availableLanguages, t } = useLanguage();

  const languageNames = {
    fr: 'Français',
    en: 'English',
    ar: 'العربية'
  };

  return (
    <div className="dropdown">
      <button
        className={`px-3 py-2 rounded dropdown-toggle ${
          isDarkTheme 
            ? 'bg-dark text-light border border-light' 
            : 'bg-light text-dark border border-dark'
        }`}
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {t('language')}: {languageNames[currentLanguage]}
      </button>
      <ul className={`dropdown-menu ${isDarkTheme ? 'dropdown-menu-dark' : ''}`}>
        {availableLanguages.map(lang => (
          <li key={lang}>
            <button
              className={`dropdown-item ${currentLanguage === lang ? 'active' : ''}`}
              onClick={() => changeLanguage(lang)}
            >
              {languageNames[lang]}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LanguageSelector;
