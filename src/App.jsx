import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Filters from './components/Filters/Filters';
import FoodCard from './components/FoodCard/FoodCard';
import Footer from './components/Footer/Footer';
import { getAllFoods } from './utils/api';
import './App.styles.css';

const App = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [novaFilter, setNovaFilter] = useState('');
  const [nutriScoreFilter, setNutriScoreFilter] = useState('');
  const [ecoScoreFilter, setEcoScoreFilter] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#dc004e',
      },
    },
  });

  useEffect(() => {
    loadInitialProducts();
  }, []);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  const loadInitialProducts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      console.log('Starting to load products...');
      const products = await getAllFoods();
      console.log('Received products in App:', {
        isArray: Array.isArray(products),
        length: products?.length,
        firstItem: products?.[0]
      });

      if (Array.isArray(products) && products.length > 0) {
        setProducts(products);
        setFilteredProducts(products);
      } else {
        console.error('No valid products received:', products);
        throw new Error('No se encontraron productos válidos');
      }
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
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={`app-container ${darkMode ? 'dark-mode' : ''}`}>
        <header className="app-header">
          <h1>OpenFoodFacts - Buscador</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="theme-toggle-button"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </header>

        <div className="tabs-container">
          <button
            className={`tab-button ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            Todos los productos
          </button>
          <button
            className={`tab-button ${activeTab === 'favorites' ? 'active' : ''}`}
            onClick={() => setActiveTab('favorites')}
          >
            Favoritos
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

        <div className="products-grid">
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
        </div>

        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default App;
