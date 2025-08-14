import React, { createContext, useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

// Traductions disponibles
const translations = {
  fr: {
    productCatalog: 'Catalogue de Produits',
    searchProduct: 'Rechercher un produit...',
    loading: 'Chargement...',
    error: 'Erreur',
    price: 'Prix',
    lightMode: 'Mode Clair',
    darkMode: 'Mode Sombre',
    language: 'Langue'
  },
  en: {
    productCatalog: 'Product Catalog',
    searchProduct: 'Search for a product...',
    loading: 'Loading...',
    error: 'Error',
    price: 'Price',
    lightMode: 'Light Mode',
    darkMode: 'Dark Mode',
    language: 'Language'
  },
  ar: {
    productCatalog: 'كتالوج المنتجات',
    searchProduct: 'البحث عن منتج...',
    loading: 'جاري التحميل...',
    error: 'خطأ',
    price: 'السعر',
    lightMode: 'الوضع الفاتح',
    darkMode: 'الوضع الداكن',
    language: 'اللغة'
  }
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  // Exercice 3: Utilisation du hook useLocalStorage pour persister la langue
  const [currentLanguage, setCurrentLanguage] = useLocalStorage('language', 'fr');

  const t = (key) => {
    return translations[currentLanguage][key] || key;
  };

  const changeLanguage = (language) => {
    setCurrentLanguage(language);
  };

  return (
    <LanguageContext.Provider value={{
      currentLanguage,
      changeLanguage,
      t,
      availableLanguages: Object.keys(translations)
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export default LanguageContext;
