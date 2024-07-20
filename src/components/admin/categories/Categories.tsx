'use client';
import React, { Fragment, useReducer } from 'react';
import {
  CategoryContext,
  categoryReducer,
  categoryState,
} from './CategoryContext';
import AdminLayout from '../layout/AdminLayout';
import AllCategory from './AllCategories';
import CategoryMenu from './CategoryMenu';

const Categories: React.FC = () => {
  const [data, dispatch] = useReducer(categoryReducer, categoryState);

  return (
    <Fragment>
      <CategoryContext.Provider value={{ data, dispatch }}>
        <AdminLayout>
          <div className="grid grid-cols-1 space-y-4 p-4">
            <CategoryMenu />
            <AllCategory />
          </div>
        </AdminLayout>
      </CategoryContext.Provider>
    </Fragment>
  );
};

export default Categories;
