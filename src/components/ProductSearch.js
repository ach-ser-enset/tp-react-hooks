import React, { useContext } from 'react';
import { ThemeContext } from '../App';
import { useLanguage } from '../contexts/LanguageContext';

// Exercice 1: Composant de recherche contrôlé
const ProductSearch = ({ searchTerm, setSearchTerm }) => {
  const { isDarkTheme } = useContext(ThemeContext);
  // Exercice 2: Utilisation du contexte de langue
  const { t } = useLanguage();
  // TODO: Exercice 1.2 - Utiliser le hook useDebounce

  return (
    <div className="mb-4">
      {/* Exercice 1: Input contrôlé pour la recherche en temps réel */}
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={t('searchProduct')}
        className={`form-control ${isDarkTheme ? 'bg-dark text-light' : ''}`}
      />
    </div>
  );
};

export default ProductSearch;