import React, { createContext, useState } from 'react';
import ProductList from './components/ProductList';
import ProductSearch from './components/ProductSearch';
import ThemeToggle from './components/ThemeToggle';
import LanguageSelector from './components/LanguageSelector';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';

export const ThemeContext = createContext();

const AppContent = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  // Exercice 1: État de recherche en temps réel
  const [searchTerm, setSearchTerm] = useState('');
  // Exercice 2: Utilisation du contexte de langue
  const { t } = useLanguage();

  return (
    <ThemeContext.Provider value={{ isDarkTheme, setIsDarkTheme }}>
      <div className={`container ${isDarkTheme ? 'bg-dark text-light' : 'bg-light'}`}>
        <header className="my-4">
          <h1 className="text-center">{t('productCatalog')}</h1>
          <div className="d-flex justify-content-end gap-2">
            <ThemeToggle />
            {/* Exercice 2: Sélecteur de langue */}
            <LanguageSelector />
          </div>
        </header>
        <main>
          {/* Exercice 1: Passage des props de recherche */}
          <ProductSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <ProductList searchTerm={searchTerm} />
        </main>
      </div>
    </ThemeContext.Provider>
  );
};

// Exercice 2: Wrapper avec LanguageProvider
const App = () => {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
};

export default App;
