import { createContext, Dispatch, ReactNode, useReducer } from 'react';

interface Order {
  transactionId: string;
  booking: string;
  phone: string;
  address: string;
  createdAt: string;
}

interface DashboardState {
  totalData: { Users: number; Orders: number; Products: number; Categories: number };
  totalOrders: { Orders: Order[] };
  uploadSliderBtn: boolean;
  imageUpload: boolean;
  sliderImages: { _id: string; slideImage: string }[];
}

export interface DashboardAction {
  type: string;
  payload: any;
}

const dashboardState: DashboardState = {
  totalData: { Users: 0, Orders: 0, Products: 0, Categories: 0 },
  totalOrders: { Orders: [] },
  uploadSliderBtn: true,
  imageUpload: false,
  sliderImages: [],
};

const dashboardReducer = (
  state: DashboardState,
  action: DashboardAction
): DashboardState => {
  switch (action.type) {
    case 'totalData':
      return {
        ...state,
        totalData: action.payload,
      };
    case 'totalOrders':
      return {
        ...state,
        totalOrders: action.payload,
      };
    case 'uploadSliderBtn':
      return {
        ...state,
        uploadSliderBtn: action.payload,
      };
    case 'imageUpload':
      return {
        ...state,
        imageUpload: action.payload,
      };
    case 'sliderImages':
      return {
        ...state,
        sliderImages: action.payload,
      };
    default:
      return state;
  }
};

export interface DashboardContextProps {
  data: DashboardState;
  dispatch: Dispatch<DashboardAction>;
}

export const DashboardContext = createContext<
  DashboardContextProps | undefined
>(undefined);

export const DashboardProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(dashboardReducer, dashboardState);

  return (
    <DashboardContext.Provider value={{ data: state, dispatch }}>
      {children}
    </DashboardContext.Provider>
  );
};

export { dashboardState as dashboardstate, dashboardReducer };
