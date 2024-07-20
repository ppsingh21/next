export interface EditProductModal {
  modal: boolean;
  pId: string;
  pName: string;
  pDescription: string;
  pImages: string[] | null;
  pStatus: string;
  pCategory: string;
  pQuantity: string;
  pPrice: string;
  pOffer: string;
  pModel: string;
  pYear: string;
  pTransmission: string;
  pDriven: string;
  pOwners: string;
  pInsurance: string;
  pFuel: string;
  pColour: string;
  pEngine: string;
  pPower: string;
  pTorque: string;
  pProductCode: string;
  pViews: string;
  pTag: string;
  pAbs: string;
  pAirbags: string;
  pCruiseControl: string;
  pAdjustableSteer: string;
  pRearParkSensor: string;
  pSunroof: string;
}

export interface ProductState {
  products: any[] | null;
  addProductModal: boolean;
  editProductModal: EditProductModal;
}

export const productState: ProductState = {
  products: null,
  addProductModal: false,
  editProductModal: {
    modal: false,
    pId: '',
    pName: '',
    pDescription: '',
    pImages: null,
    pStatus: '',
    pCategory: '',
    pQuantity: '',
    pPrice: '',
    pOffer: '',
    pModel: '',
    pYear: '',
    pTransmission: '',
    pDriven: '',
    pOwners: '',
    pInsurance: '',
    pFuel: '',
    pColour: '',
    pEngine: '',
    pPower: '',
    pTorque: '',
    pProductCode: '',
    pViews: '',
    pTag: '',
    pAbs: '',
    pAirbags: '',
    pCruiseControl: '',
    pAdjustableSteer: '',
    pRearParkSensor: '',
    pSunroof: '',
  },
};

type Action =
  | { type: 'fetchProductsAndChangeState'; payload: any[] }
  | { type: 'addProductModal'; payload: boolean }
  | { type: 'editProductModalOpen'; product: Partial<EditProductModal> }
  | { type: 'editProductModalClose' };

export const productReducer = (
  state: ProductState,
  action: Action
): ProductState => {
  switch (action.type) {
    case 'fetchProductsAndChangeState':
      return {
        ...state,
        products: action.payload,
      };
    case 'addProductModal':
      return {
        ...state,
        addProductModal: action.payload,
      };
    case 'editProductModalOpen':
      return {
        ...state,
        editProductModal: {
          ...state.editProductModal,
          ...action.product,
          modal: true,
        },
      };
    case 'editProductModalClose':
      return {
        ...state,
        editProductModal: {
          ...productState.editProductModal,
          modal: false,
        },
      };
    default:
      return state;
  }
};
