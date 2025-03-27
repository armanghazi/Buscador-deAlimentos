const BASE_URL = 'https://world.openfoodfacts.org/api/v0';

export const getAllFoods = async () => {
  try {
    console.log('Fetching products from API...');
    const response = await fetch(
      `${BASE_URL}/search.json?page_size=500&sort_by=popularity_key&json=true`,
      {
        headers: {
          'User-Agent': 'OpenFoodFacts - Buscador/1.0'
        }
      }
    );
    
    if (!response.ok) {
      console.error('API Response not OK:', response.status, response.statusText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('API Response:', {
      status: response.status,
      totalProducts: data.count,
      pageSize: data.page_size,
      hasProducts: !!data.products,
      productsLength: data.products?.length
    });
    
    if (!data || !Array.isArray(data.products)) {
      console.error('Invalid API response format:', data);
      throw new Error('Invalid API response format');
    }
    
    // Filter out products without required fields
    const validProducts = data.products.filter(product => {
      const isValid = product && 
        product.code && 
        product.product_name &&
        (product.image_url || product.image_small_url);
      
      if (!isValid) {
        console.log('Invalid product found:', product);
      }
      
      return isValid;
    });
    
    console.log('Filtered products:', {
      total: validProducts.length,
      firstProduct: validProducts[0]
    });
    
    return validProducts;
  } catch (error) {
    console.error('Error in getAllFoods:', error);
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