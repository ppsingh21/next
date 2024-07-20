import React, { createContext, useReducer, Dispatch } from 'react';
import { CategoryState, CategoryAction } from './types';

export const categoryState: CategoryState = {
  categories: [],
  addCategoryModal: false,
  editCategoryModal: {
    modal: false,
    cId: null,
    des: '',
    status: '',
  },
  loading: false,
};

export const categoryReducer = (
  state: CategoryState,
  action: CategoryAction
): CategoryState => {
  switch (action.type) {
    case 'fetchCategoryAndChangeState':
      return {
        ...state,
        categories: action.payload,
      };
    case 'addCategoryModal':
      return {
        ...state,
        addCategoryModal: action.payload,
      };
    case 'editCategoryModalOpen':
      return {
        ...state,
        editCategoryModal: {
          modal: true,
          cId: action.cId,
          des: action.des,
          status: action.status,
        },
      };
    case 'editCategoryModalClose':
      return {
        ...state,
        editCategoryModal: {
          modal: false,
          cId: null,
          des: '',
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

export interface CategoryContextProps {
  data: CategoryState;
  dispatch: Dispatch<CategoryAction>;
}

export const CategoryContext = createContext<CategoryContextProps | undefined>(
  undefined
);

const CategoryProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(categoryReducer, categoryState);

  return (
    <CategoryContext.Provider value={{ data: state, dispatch }}>
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryProvider;
