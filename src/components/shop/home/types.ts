export interface SliderImage {
  slideImage: string;
}

export interface HomeState {
  categoryListDropdown: boolean;
  filterListDropdown: boolean;
  searchDropdown: boolean;
  products: any[] | null; // Adjust the type according to your actual product structure
  loading: boolean;
  sliderImages: SliderImage[];
}

export interface HomeContextProps {
  data: HomeState;
  dispatch: React.Dispatch<any>; // Replace `any` with your action type if available
}
