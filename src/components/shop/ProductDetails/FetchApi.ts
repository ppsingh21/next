import axios from 'axios';

const apiURL = process.env.NEXT_PUBLIC_API_URL as string;

export interface Product {
  _id: string;
  pName: string;
  pImages: string[];
  pDriven: number;
  pFuel: string;
  pTransmission: string;
  pOwners: number;
  pPrice: number;
  pModel: string;
  pYear: number;
  pInsurance: string;
  pProductCode: string;
  pPower: number;
  pEngine: number;
  pTorque: number;
  pAbs: string;
  pAirbags: string;
  pCruiseControl: string;
  pAdjustableSteer: string;
  pRearParkSensor: string;
  pSunroof: string;
  pDescription: string;
  pCategory: {
    _id: string;
    cName: string;
  };
  pTag: string;
  pColour: string;
  pOffer: string;
}

// Type for add/delete review response
interface ReviewResponse {
  success: boolean;
  message: string;
  // Add more fields as needed
}

// Type for car form data response
interface CarFormResponse {
  success: boolean;
  message: string;
  // Add more fields as needed
}

export const getSingleProduct = async (
  pId: string
): Promise<{ Product: Product } | undefined> => {
  try {
    const res = await axios.post<{ Product: Product }>(
      `${apiURL}/api/product/single-product`,
      {
        pId,
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const postAddReview = async (
  formData: any
): Promise<ReviewResponse | undefined> => {
  try {
    const res = await axios.post<ReviewResponse>(
      `${apiURL}/api/product/add-review`,
      formData
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const postDeleteReview = async (
  formData: any
): Promise<ReviewResponse | undefined> => {
  try {
    const res = await axios.post<ReviewResponse>(
      `${apiURL}/api/product/delete-review`,
      formData
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const postCarFormData = async (
  pId: string,
  name: string,
  mobileNumber: string,
  booking: string,
  productName: string
): Promise<CarFormResponse | undefined> => {
  try {
    console.log(pId, name, mobileNumber, booking, productName);
    const res = await axios.post<CarFormResponse>(
      `${apiURL}/api/order/create-order`,
      {
        allProduct: pId,
        user: name,
        phone: mobileNumber,
        booking,
        product: productName,
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
