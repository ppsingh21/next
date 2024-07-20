export interface EditCategoryModal {
  modal: boolean;
  cId: string | null;
  des: string;
  status: string;
}

export interface Category {
  _id: string;
  cName: string;
  cDescription: string;
  cImage: string;
  cStatus: string;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryState {
  categories: Category[];
  addCategoryModal: boolean;
  editCategoryModal: EditCategoryModal;
  loading: boolean;
}

export type CategoryAction =
  | { type: 'fetchCategoryAndChangeState'; payload: Category[] }
  | { type: 'addCategoryModal'; payload: boolean }
  | { type: 'editCategoryModalOpen'; cId: string; des: string; status: string }
  | { type: 'editCategoryModalClose' }
  | { type: 'loading'; payload: boolean };

export interface FormData {
  cName: string;
  cDescription: string;
  cImage: File | null;
  cStatus: string;
  success: boolean;
  error: string | boolean;
}
