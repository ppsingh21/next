import React, { createContext, useReducer, ReactNode, Dispatch } from 'react';

// Define the state type
type ProductDetailsState = {
  loading: boolean;
  menu: boolean;
  cartState?: any; // Adjust type as needed
};

// Define the action types
type Action =
  | { type: 'menu'; payload: boolean }
  | { type: 'loading'; payload: boolean }
  | { type: 'cartState'; payload: any }; // Adjust type as needed

// Initial state
export const productDetailsState: ProductDetailsState = {
  loading: false,
  menu: true,
};

// Reducer function
export const productDetailsReducer = (
  state: ProductDetailsState,
  action: Action
): ProductDetailsState => {
  switch (action.type) {
    case 'menu':
      return {
        ...state,
        menu: action.payload,
      };
    case 'loading':
      return {
        ...state,
        loading: action.payload,
      };
    case 'cartState':
      return {
        ...state,
        cartState: action.payload,
      };
    default:
      return state;
  }
};

// Create context
const ProductDetailsContext = createContext<{
  state: ProductDetailsState;
  dispatch: Dispatch<Action>;
}>({
  state: productDetailsState,
  dispatch: () => undefined,
});

// Provider component
export const ProductDetailsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(
    productDetailsReducer,
    productDetailsState
  );

  return (
    <ProductDetailsContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductDetailsContext.Provider>
  );
};

export default ProductDetailsContext;
