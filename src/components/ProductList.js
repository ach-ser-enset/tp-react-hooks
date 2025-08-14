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
    // Exercice 4: États et fonctions de pagination
    currentPage,
    totalPages,
    totalProducts,
    reload,
    nextPage,
    previousPage,
    goToPage,
    hasNextPage,
    hasPreviousPage
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
      {/* Exercice 4: Bouton de rechargement en cas d'erreur */}
      <button 
        className="btn btn-outline-danger ms-2" 
        onClick={reload}
      >
        Réessayer
      </button>
    </div>
  );
  
  return (
    <div>
      {/* Exercice 4: Bouton de rechargement et informations */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <small className="text-muted">
            {totalProducts} produits au total
            {searchTerm && ` | ${filteredProducts.length} résultats pour "${searchTerm}"`}
          </small>
        </div>
        <button 
          className={`btn ${isDarkTheme ? 'btn-outline-light' : 'btn-outline-dark'}`}
          onClick={reload}
          disabled={loading}
        >
          {loading ? t('loading') : t('reload')}
        </button>
      </div>

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
      
      {/* Exercice 4: Contrôles de pagination */}
      {totalPages > 1 && (
        <nav className="mt-4">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${!hasPreviousPage ? 'disabled' : ''}`}>
              <button 
                className="page-link" 
                onClick={previousPage}
                disabled={!hasPreviousPage}
              >
                {t('previous')}
              </button>
            </li>
            
            {/* Affichage des numéros de page */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                <button 
                  className="page-link" 
                  onClick={() => goToPage(page)}
                >
                  {page}
                </button>
              </li>
            ))}
            
            <li className={`page-item ${!hasNextPage ? 'disabled' : ''}`}>
              <button 
                className="page-link" 
                onClick={nextPage}
                disabled={!hasNextPage}
              >
                {t('next')}
              </button>
            </li>
          </ul>
          
          <div className="text-center mt-2">
            <small className="text-muted">
              {t('page')} {currentPage} {t('of')} {totalPages}
            </small>
          </div>
        </nav>
      )}
    </div>
  );
};

export default ProductList;