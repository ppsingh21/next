'use client';
import React, { createContext, useReducer, ReactNode } from 'react';
import AdminLayout from '../layout/AdminLayout';
import ProductMenu from './ProductMenu';
import ProductTable from './ProductTable';
import { productState, productReducer, ProductState } from './ProductContext';

export interface ProductContextProps {
  data: ProductState;
  dispatch: React.Dispatch<any>;
}

export const ProductContext = createContext<ProductContextProps | undefined>(
  undefined
);

const ProductComponent: React.FC = () => {
  return (
    <div className="grid grid-cols-1 space-y-4 p-4">
      <ProductMenu />
      <ProductTable />
    </div>
  );
};

const Products: React.FC = () => {
  const [data, dispatch] = useReducer(productReducer, productState);

  return (
    <ProductContext.Provider value={{ data, dispatch }}>
      <AdminLayout>
        <ProductComponent />
      </AdminLayout>
    </ProductContext.Provider>
  );
};

export default Products;
