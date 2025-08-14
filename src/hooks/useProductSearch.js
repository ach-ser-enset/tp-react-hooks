import { useState, useEffect, useCallback } from 'react';

// TODO: Exercice 3.1 - Créer le hook useDebounce
// TODO: Exercice 3.2 - Créer le hook useLocalStorage

const useProductSearch = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Exercice 4: État pour la pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const itemsPerPage = 6;

  const fetchProducts = useCallback(async (page = 1) => {
    setLoading(true);
    setError(null);
    try {
      // Exercice 4: Paramètres de pagination
      const skip = (page - 1) * itemsPerPage;
      const response = await fetch(`https://api.daaif.net/products?delay=1000&limit=${itemsPerPage}&skip=${skip}`);
      if (!response.ok) throw new Error('Erreur réseau');
      const data = await response.json();
      
      setProducts(data.products || []);
      setTotalProducts(data.total || 0);
      setTotalPages(Math.ceil((data.total || 0) / itemsPerPage));
      setCurrentPage(page);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts(1);
  }, [fetchProducts]);

  // Exercice 4: Fonction de rechargement
  const reload = useCallback(() => {
    fetchProducts(currentPage);
  }, [fetchProducts, currentPage]);

  // Exercice 4: Fonctions de pagination
  const nextPage = useCallback(() => {
    if (currentPage < totalPages) {
      fetchProducts(currentPage + 1);
    }
  }, [currentPage, totalPages, fetchProducts]);

  const previousPage = useCallback(() => {
    if (currentPage > 1) {
      fetchProducts(currentPage - 1);
    }
  }, [currentPage, fetchProducts]);

  const goToPage = useCallback((page) => {
    if (page >= 1 && page <= totalPages) {
      fetchProducts(page);
    }
  }, [totalPages, fetchProducts]);

  return { 
    products, 
    loading, 
    error,
    currentPage,
    totalPages,
    totalProducts,
    reload,
    nextPage,
    previousPage,
    goToPage,
    hasNextPage: currentPage < totalPages,
    hasPreviousPage: currentPage > 1
  };
};

export default useProductSearch;