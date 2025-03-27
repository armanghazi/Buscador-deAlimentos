import React, { useState, useEffect } from 'react';
import Filters from './components/Filters/Filters';
import FoodCard from './components/FoodCard/FoodCard';
import Footer from './components/Footer/Footer';
import { getAllFoods } from './utils/api';
import './App.styles.css';

const App = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    // Load favorites from localStorage on initial render
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  const [darkMode, setDarkMode] = useState(() => {
    // Load dark mode from localStorage
    const savedDarkMode = localStorage.getItem('darkMode');
    return savedDarkMode ? JSON.parse(savedDarkMode) : false;
  });
  const [novaFilter, setNovaFilter] = useState('');
  const [nutriScoreFilter, setNutriScoreFilter] = useState('');
  const [ecoScoreFilter, setEcoScoreFilter] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadInitialProducts();
  }, []);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
    // Save dark mode to localStorage
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const loadInitialProducts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      console.log('Starting to load products...');
      const products = await getAllFoods();
      
      if (!products || products.length === 0) {
        throw new Error('No se encontraron productos');
      }

      console.log('Setting products:', products.length);
      setProducts(products);
      setFilteredProducts(products);
    } catch (error) {
      console.error('Error loading products:', error);
      setError(`Error al cargar los productos: ${error.message}`);
      setProducts([]);
      setFilteredProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterClick = () => {
    let filtered = [...products];

    if (novaFilter) {
      filtered = filtered.filter(product => String(product.nova_group) === String(novaFilter));
    }

    if (nutriScoreFilter) {
      filtered = filtered.filter(product => String(product.nutriscore_grade).toLowerCase() === String(nutriScoreFilter).toLowerCase());
    }

    if (ecoScoreFilter) {
      filtered = filtered.filter(product => String(product.ecoscore_grade).toLowerCase() === String(ecoScoreFilter).toLowerCase());
    }

    setFilteredProducts(filtered);
  };

  const handleFavoriteClick = (product) => {
    setFavorites(prevFavorites => {
      const isFavorite = prevFavorites.some(fav => fav.code === product.code);
      if (isFavorite) {
        return prevFavorites.filter(fav => fav.code !== product.code);
      } else {
        return [...prevFavorites, product];
      }
    });
  };

  const handleDetailsClick = (product) => {
    window.open(`https://es.openfoodfacts.org/producto/${product.code}`, '_blank');
  };

  const displayedProducts = activeTab === 'favorites' ? favorites : filteredProducts;

  return (
    <div className={`app-container ${darkMode ? 'dark-mode' : ''}`}>
      <header className="app-header">
        <h1>Buscador Datos sobre los alimentos</h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="theme-toggle-button"
          aria-label={darkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
      </header>

      <div className="tabs-container">
        <button
          className={`tab-button ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          Todos los productos ({products.length})
        </button>
        <button
          className={`tab-button ${activeTab === 'favorites' ? 'active' : ''}`}
          onClick={() => setActiveTab('favorites')}
        >
          Favoritos ({favorites.length})
        </button>
      </div>

      <Filters
        novaFilter={novaFilter}
        onNovaChange={setNovaFilter}
        nutriScoreFilter={nutriScoreFilter}
        onNutriScoreChange={setNutriScoreFilter}
        ecoScoreFilter={ecoScoreFilter}
        onEcoScoreChange={setEcoScoreFilter}
        onFilterClick={handleFilterClick}
      />

      <main className="products-grid">
        {isLoading ? (
          <div className="loading-message">
            <div className="loading-spinner"></div>
            Cargando productos...
          </div>
        ) : error ? (
          <div className="error-message">
            {error}
            <button onClick={loadInitialProducts} className="retry-button">
              Intentar de nuevo
            </button>
          </div>
        ) : displayedProducts.length === 0 ? (
          <div className="no-results-message">
            {activeTab === 'favorites' 
              ? 'No hay productos favoritos'
              : 'No se encontraron productos que coincidan con los filtros'}
          </div>
        ) : (
          displayedProducts.map(product => (
            <FoodCard
              key={product.code}
              product={product}
              isFavorite={favorites.some(fav => fav.code === product.code)}
              onFavoriteClick={handleFavoriteClick}
              onDetailsClick={handleDetailsClick}
            />
          ))
        )}
      </main>

      <Footer />
    </div>
  );
};

export default App;
