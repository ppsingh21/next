import { createContext } from 'react';
import { HomeState, HomeContextProps, SliderImage } from './types';

// Initial state for the context
const initialState: HomeState = {
  categoryListDropdown: false,
  filterListDropdown: false,
  searchDropdown: false,
  products: null,
  loading: false,
  sliderImages: [],
};

// Define action types
type Action =
  | { type: 'SET_CATEGORY_LIST_DROPDOWN'; payload: boolean }
  | { type: 'SET_FILTER_LIST_DROPDOWN'; payload: boolean }
  | { type: 'SET_SEARCH_DROPDOWN'; payload: boolean }
  | { type: 'SET_PRODUCTS'; payload: any[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_SLIDER_IMAGES'; payload: SliderImage[] }
  | { type: 'categoryListDropdown'; payload: boolean }
  | { type: 'filterListDropdown'; payload: boolean }
  | { type: 'searchDropdown'; payload: boolean }
  | { type: 'setProducts'; payload: any[] }
  | { type: 'searchHandleInReducer'; payload: string; productArray: any[] }
  | { type: 'loading'; payload: boolean }
  | { type: 'sliderImages'; payload: SliderImage[] };

// Reducer function to handle state changes
const homeReducer = (state: HomeState, action: Action): HomeState => {
  switch (action.type) {
    case 'categoryListDropdown':
      return {
        ...state,
        categoryListDropdown: action.payload,
        filterListDropdown: false,
        searchDropdown: false,
      };
    case 'filterListDropdown':
      return {
        ...state,
        categoryListDropdown: false,
        filterListDropdown: action.payload,
        searchDropdown: false,
      };
    case 'searchDropdown':
      return {
        ...state,
        categoryListDropdown: false,
        filterListDropdown: false,
        searchDropdown: action.payload,
      };
    case 'setProducts':
      return {
        ...state,
        products: action.payload,
      };
    case 'searchHandleInReducer':
      return {
        ...state,
        products: action.productArray.filter((item) =>
          item.pName.toUpperCase().includes(action.payload.toUpperCase())
        ),
      };
    case 'loading':
      return {
        ...state,
        loading: action.payload,
      };
    case 'sliderImages':
      return {
        ...state,
        sliderImages: action.payload,
      };
    case 'SET_CATEGORY_LIST_DROPDOWN':
      return { ...state, categoryListDropdown: action.payload };
    case 'SET_FILTER_LIST_DROPDOWN':
      return { ...state, filterListDropdown: action.payload };
    case 'SET_SEARCH_DROPDOWN':
      return { ...state, searchDropdown: action.payload };
    case 'SET_PRODUCTS':
      return { ...state, products: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_SLIDER_IMAGES':
      return { ...state, sliderImages: action.payload };
    default:
      return state;
  }
};

// Create the context
const HomeContext = createContext<HomeContextProps>({
  data: initialState,
  dispatch: () => null,
});

export { homeReducer, HomeContext, initialState as homestate };
