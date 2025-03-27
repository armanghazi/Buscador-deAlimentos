const BASE_URL = 'https://world.openfoodfacts.org/api/v0';

const handleResponse = async (response) => {
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

export const getAllFoods = async () => {
  try {
    console.log('Fetching products from API...');
    const url = `${BASE_URL}/search.json?page_size=1000&sort_by=popularity_key&json=true`;
    const headers = { 'User-Agent': 'OpenFoodFacts - Buscador/1.0' };
    
    const data = await fetch(url, { headers }).then(handleResponse);
    
    if (!data || !data.products) {
      throw new Error('Invalid API response: No products found');
    }

    const validProducts = data.products.filter(product => {
      if (!product || !product.code || !product.product_name) {
        return false;
      }
      return true;
    });

    if (validProducts.length === 0) {
      throw new Error('No valid products found in the response');
    }

    console.log(`Successfully loaded ${validProducts.length} products`);
    return validProducts;
  } catch (error) {
    console.error('Error in getAllFoods:', error);
    throw error;
  }
};

export const getFoodDetails = async (barcode) => {
  try {
    const url = `${BASE_URL}/product/${barcode}.json`;
    const headers = { 'User-Agent': 'OpenFoodFactsExplorer/1.0' };
    const data = await fetch(url, { headers }).then(handleResponse);
    return data;
  } catch (error) {
    console.error('Error getting food details:', error);
    throw error;
  }
};

export const getCategories = async () => {
  try {
    const url = `${BASE_URL}/categories`;
    const headers = { 'User-Agent': 'OpenFoodFactsExplorer/1.0' };
    const data = await fetch(url, { headers }).then(handleResponse);
    return data;
  } catch (error) {
    console.error('Error getting categories:', error);
    throw error;
  }
};