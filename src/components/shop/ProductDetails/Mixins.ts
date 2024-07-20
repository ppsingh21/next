// Define the types for the parameters and return values
type Dispatch = (action: { type: string; payload: any }) => void;

// Function to get the list of cart item IDs from local storage
export const cartList = (): string[] | null => {
  const carts = localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart') as string)
    : null;
  const list: string[] = [];
  if (carts !== null) {
    for (const cart of carts) {
      list.push(cart.id);
    }
    return list;
  } else {
    return null;
  }
};

// Function to update the quantity of an item in the cart
export const updateQuantity = (
  type: 'increase' | 'decrease',
  totalQuantity: number,
  quantity: number,
  setQuantity: (quantity: number) => void,
  setAlertq: (alert: boolean) => void
): void => {
  if (type === 'increase') {
    if (quantity === totalQuantity) {
      setAlertq(true);
    } else {
      setQuantity(quantity + 1);
    }
  } else if (type === 'decrease') {
    if (quantity === 1) {
      setQuantity(1);
      setAlertq(false);
    } else {
      setQuantity(quantity - 1);
    }
  }
};

// Function to handle image sliding in a carousel
export const slideImage = (
  type: 'increase',
  active: number,
  count: number,
  setCount: (count: number) => void,
  pImages: string[]
): void => {
  if (active === count) {
    return;
  }
  if (type === 'increase') {
    if (count === pImages.length - 1) {
      setCount(0);
    } else if (count < pImages.length) {
      setCount(count + 1);
    }
  }
};

// Function to check if an item is in the cart
export const inCart = (id: string): boolean => {
  const cartProducts = localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart') as string)
    : [];
  for (const product of cartProducts) {
    if (product.id === id) {
      return true;
    }
  }
  return false;
};

// Function to add an item to the cart
export const addToCart = (
  id: string,
  quantity: number,
  price: number,
  layoutDispatch: Dispatch,
  setQuantity: (quantity: number) => void,
  setAlertq: (alert: boolean) => void,
  fetchData: () => void,
  totalCost: () => number
): void => {
  let isObj = false;
  const cart = localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart') as string)
    : [];
  if (cart.length > 0) {
    cart.forEach((item: { id: string }) => {
      if (item.id === id) {
        isObj = true;
      }
    });
    if (!isObj) {
      cart.push({ id, quantity, price });
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  } else {
    cart.push({ id, quantity, price });
    localStorage.setItem('cart', JSON.stringify(cart));
  }
  layoutDispatch({ type: 'inCart', payload: cartList() });
  layoutDispatch({ type: 'cartTotalCost', payload: totalCost() });
  setQuantity(1);
  setAlertq(false);
  fetchData();
};
