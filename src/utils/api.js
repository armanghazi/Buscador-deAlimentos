const BASE_URL = 'https://world.openfoodfacts.org/api/v0';

export const getAllFoods = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/search.json?page_size=500&sort_by=popularity_key&json=true`,
      {
        headers: {
          'User-Agent': 'OpenFoodFactsExplorer/1.0'
        }
      }
    );
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const data = await response.json();
    
    // Ensure we have valid data
    if (!data || !Array.isArray(data.products)) {
      throw new Error('Invalid data format received from API');
    }
    
    // Filter out products without required fields
    const validProducts = data.products.filter(product => 
      product && 
      product.code && 
      product.product_name &&
      (product.image_url || product.image_small_url)
    );
    
    return {
      ...data,
      products: validProducts
    };
  } catch (error) {
    console.error('Error fetching foods:', error);
    throw error;
  }
};

export const getFoodDetails = async (barcode) => {
  try {
    const response = await fetch(`${BASE_URL}/product/${barcode}.json`, {
      headers: {
        'User-Agent': 'OpenFoodFactsExplorer/1.0'
      }
    });
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error getting food details:', error);
    throw error;
  }
};

export const getCategories = async () => {
  try {
    const response = await fetch(`${BASE_URL}/categories`, {
      headers: {
        'User-Agent': 'OpenFoodFactsExplorer/1.0'
      }
    });
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error getting categories:', error);
    throw error;
  }
}; 