const BASE_URL_V0 = 'https://world.openfoodfacts.org/api/v0';
const BASE_URL_V2 = 'https://world.openfoodfacts.org/api/v2';

const SEARCH_FIELDS = 'code,product_name,image_url,image_small_url,nova_group,nutriscore_grade,ecoscore_grade';

const handleResponse = async (response) => {
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

export const getAllFoods = async () => {
  try {
    console.log('Fetching products from API...');
    const url = `${BASE_URL_V2}/search?fields=${SEARCH_FIELDS}&page_size=50&sort_by=unique_scans_n`;

    const data = await fetch(url).then(handleResponse);
    

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
    const url = `${BASE_URL_V0}/product/${barcode}.json`;
    const data = await fetch(url).then(handleResponse);
    return data;
  } catch (error) {
    console.error('Error getting food details:', error);
    throw error;
  }
};

export const getCategories = async () => {
  try {
    const url = 'https://world.openfoodfacts.org/categories.json';
    const data = await fetch(url).then(handleResponse);
    return data;
  } catch (error) {
    console.error('Error getting categories:', error);
    throw error;
  }
};