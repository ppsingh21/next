import axios from 'axios';

const apiURL = process.env.NEXT_PUBLIC_API_URL as string;

export const wishListProducts = async () => {
  // Check if the wishlist exists in local storage
  const wishList = localStorage.getItem('wishList');
  if (!wishList) {
    console.warn('No wishList found in local storage');
    return [];
  }

  // Parse the wishlist into a product array
  const productArray = JSON.parse(wishList);

  try {
    // Make a POST request to the API with the product array
    const response = await axios.post(`${apiURL}/api/product/wish-product`, {
      productArray,
    });

    // Return the response data
    return response.data;
  } catch (error) {
    // Log the error and provide more detailed information
    console.error('Error fetching wishlist products:', error);
    // Optionally re-throw the error to handle it further up the call stack
    throw error;
  }
};
