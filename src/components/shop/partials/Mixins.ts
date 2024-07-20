interface CartItem {
  id: string;
  quantitiy: number;
  price: number;
}

// Calculate the subtotal for a specific product in the cart
export const subTotal = (id: string, price: number): number => {
  let subTotalCost = 0;
  const carts: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');
  carts.forEach((item) => {
    if (item.id === id) {
      subTotalCost = item.quantitiy * price;
    }
  });
  return subTotalCost;
};

// Get the quantity of a specific product in the cart
export const quantity = (id: string): number => {
  let productQuantity = 0;
  const carts: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');
  carts.forEach((item) => {
    if (item.id === id) {
      productQuantity = item.quantitiy;
    }
  });
  return productQuantity;
};

// Calculate the total cost of all items in the cart
export const totalCost = (): number => {
  let totalCost = 0;
  const carts: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');
  carts.forEach((item) => {
    totalCost += item.quantitiy * item.price;
  });
  return totalCost;
};
