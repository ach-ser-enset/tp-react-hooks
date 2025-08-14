import React, { useContext, useEffect } from 'react';
import { ThemeContext } from '../App';
import { useLanguage } from '../contexts/LanguageContext';
import useDebounce from '../hooks/useDebounce';

// Exercice 1: Composant de recherche contrôlé
const ProductSearch = ({ searchTerm, setSearchTerm }) => {
  const { isDarkTheme } = useContext(ThemeContext);
  // Exercice 2: Utilisation du contexte de langue
  const { t } = useLanguage();
  // Exercice 3: Utilisation du hook useDebounce pour optimiser la recherche
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Effect pour démontrer l'utilisation du terme de recherche debouncé
  useEffect(() => {
    if (debouncedSearchTerm) {
      console.log('Recherche debouncée pour:', debouncedSearchTerm);
      // Ici on pourrait faire un appel API ou autre traitement
    }
  }, [debouncedSearchTerm]);

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
      {/* Exercice 3: Affichage du terme debouncé pour démonstration */}
      {debouncedSearchTerm && (
        <small className="text-muted mt-2 d-block">
          Recherche active pour: "{debouncedSearchTerm}"
        </small>
      )}
    </div>
  );
};

export default ProductSearch;