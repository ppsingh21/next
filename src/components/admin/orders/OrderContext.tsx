'use client';
import React, { createContext, useReducer, Dispatch, ReactNode } from 'react';

export interface Order {
  id: string;
  allProduct: { id: { pName: string; pImages: string[] }; quantity: number }[];
  status: string;
  amount: number;
  transactionId: string;
  booking: string;
  user: { email: string };
  phone: string;
  address: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderState {
  orders: Order[];
  addCategoryModal: boolean;
  updateOrderModal: {
    modal: boolean;
    oId: string | null;
    status: string;
  };
  loading: boolean;
}

export interface OrderAction {
  type: string;
  payload?: any;
  oId?: string;
  status?: string;
}

export const orderState: OrderState = {
  orders: [],
  addCategoryModal: false,
  updateOrderModal: {
    modal: false,
    oId: null,
    status: '',
  },
  loading: false,
};

export const OrderContext = createContext<{
  state: OrderState;
  dispatch: Dispatch<OrderAction>;
}>({
  state: orderState,
  dispatch: () => null,
});

export const orderReducer = (
  state: OrderState,
  action: OrderAction
): OrderState => {
  switch (action.type) {
    case 'fetchOrderAndChangeState':
      return {
        ...state,
        orders: action.payload,
      };
    case 'addCategoryModal':
      return {
        ...state,
        addCategoryModal: action.payload,
      };
    case 'updateOrderModalOpen':
      return {
        ...state,
        updateOrderModal: {
          modal: true,
          oId: action.oId!,
          status: action.status!,
        },
      };
    case 'updateOrderModalClose':
      return {
        ...state,
        updateOrderModal: {
          modal: false,
          oId: null,
          status: '',
        },
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

interface OrderProviderProps {
  children: ReactNode;
}

const OrderProvider: React.FC<OrderProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(orderReducer, orderState);

  return (
    <OrderContext.Provider value={{ state, dispatch }}>
      {children}
    </OrderContext.Provider>
  );
};

export { OrderProvider };
