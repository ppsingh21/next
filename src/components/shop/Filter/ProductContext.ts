import { createContext } from 'react';
import { ProductState, ProductContextProps } from './types';

// Initial state for the context
const initialState: ProductState = {
  navberHamburger: false,
  loginSignupModal: false,
  loginSignupError: false,
  cartModal: false,
  cartProduct: null,
  singleProductDetail: null,
  inCart: null,
  cartTotalCost: null,
  orderSuccess: false,
  products: null,
  loading: false,
};

// Define action types
type Action =
  | { type: 'hamburgerToggle'; payload: boolean }
  | { type: 'loginSignupModalToggle'; payload: boolean }
  | { type: 'cartModalToggle'; payload: boolean }
  | { type: 'cartProduct'; payload: any }
  | { type: 'singleProductDetail'; payload: any }
  | { type: 'inCart'; payload: any }
  | { type: 'cartTotalCost'; payload: any }
  | { type: 'loginSignupError'; payload: boolean }
  | { type: 'orderSuccess'; payload: boolean }
  | { type: 'setProducts'; payload: any[] }
  | { type: 'loading'; payload: boolean };

// Reducer function to handle state changes
const productReducer = (state: ProductState, action: Action): ProductState => {
  switch (action.type) {
    case 'hamburgerToggle':
      return {
        ...state,
        navberHamburger: action.payload,
      };
    case 'loginSignupModalToggle':
      return {
        ...state,
        loginSignupModal: action.payload,
      };
    case 'cartModalToggle':
      return {
        ...state,
        cartModal: action.payload,
      };
    case 'cartProduct':
      return {
        ...state,
        cartProduct: action.payload,
      };
    case 'singleProductDetail':
      return {
        ...state,
        singleProductDetail: action.payload,
      };
    case 'inCart':
      return {
        ...state,
        inCart: action.payload,
      };
    case 'cartTotalCost':
      return {
        ...state,
        cartTotalCost: action.payload,
      };
    case 'loginSignupError':
      return {
        ...state,
        loginSignupError: action.payload,
      };
    case 'orderSuccess':
      return {
        ...state,
        orderSuccess: action.payload,
      };
    case 'setProducts':
      return {
        ...state,
        products: action.payload,
      };
    case 'loading':
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};

// Create the context
const ProductContext = createContext<ProductContextProps>({
  state: initialState,
  dispatch: () => null,
});

export { productReducer, ProductContext, initialState as productstate };
