import React, { useContext } from 'react';
import { ThemeContext } from '../App';
import { useLanguage } from '../contexts/LanguageContext';
import useProductSearch from '../hooks/useProductSearch';

// Exercice 1: Composant avec filtrage des produits
const ProductList = ({ searchTerm }) => {
  const { isDarkTheme } = useContext(ThemeContext);
  // Exercice 2: Utilisation du contexte de langue
  const { t } = useLanguage();
  
  const { 
    products, 
    loading, 
    error,
    // TODO: Exercice 4.1 - Récupérer la fonction de rechargement
    // TODO: Exercice 4.2 - Récupérer les fonctions et états de pagination
  } = useProductSearch();

  // Exercice 1: Filtrage en temps réel des produits
  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  if (loading) return (
    <div className="text-center my-4">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">{t('loading')}</span>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="alert alert-danger" role="alert">
      {t('error')}: {error}
    </div>
  );
  
  return (
    <div>
      {/* TODO: Exercice 4.1 - Ajouter le bouton de rechargement */}
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {/* Exercice 1: Affichage des produits filtrés */}
        {filteredProducts.map(product => (
          <div key={product.id} className="col">
            <div className={`card h-100 ${isDarkTheme ? 'bg-dark text-light' : ''}`}>
              {product.thumbnail && (
                <img 
                  src={product.thumbnail} 
                  className="card-img-top" 
                  alt={product.title}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
              )}
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text">
                  <strong>{t('price')}: </strong>
                  {product.price}€
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* TODO: Exercice 4.2 - Ajouter les contrôles de pagination */}
      {/* Exemple de structure pour la pagination :
      <nav className="mt-4">
        <ul className="pagination justify-content-center">
          <li className="page-item">
            <button className="page-link" onClick={previousPage}>
              Précédent
            </button>
          </li>
          <li className="page-item">
            <span className="page-link">
              Page {currentPage} sur {totalPages}
            </span>
          </li>
          <li className="page-item">
            <button className="page-link" onClick={nextPage}>
              Suivant
            </button>
          </li>
        </ul>
      </nav>
      */}
    </div>
  );
};

export default ProductList;