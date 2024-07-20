import axios from 'axios';

const apiURL = process.env.NEXT_PUBLIC_API_URL as string;

interface CartItem {
  id: string;
  quantitiy: number;
  price: number;
}

interface Product {
  _id: string;
  pName: string;
  pPrice: number;
  pImages: string[];
  // Add other product properties as needed
}

interface CartProductResponse {
  Products: Product[];
}

export const cartListProduct = async (): Promise<
  CartProductResponse | undefined
> => {
  const carts: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');
  const productArray: string[] = carts.map((cart) => cart.id);

  try {
    const res = await axios.post<CartProductResponse>(
      `${apiURL}/api/product/cart-product`,
      {
        productArray,
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
