export interface ProductState {
  navberHamburger: boolean;
  loginSignupModal: boolean;
  loginSignupError: boolean;
  cartModal: boolean;
  cartProduct: any | null;
  singleProductDetail: any | null;
  inCart: any | null;
  cartTotalCost: any | null;
  orderSuccess: boolean;
  products: any[] | null;
  loading: boolean;
}

export interface ProductContextProps {
  state: ProductState;
  dispatch: React.Dispatch<any>;
}
