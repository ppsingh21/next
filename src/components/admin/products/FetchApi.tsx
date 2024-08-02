import axios, { AxiosResponse } from 'axios';
import imageCompression from 'browser-image-compression';

const apiURL = process.env.NEXT_PUBLIC_API_URL as string;

const compressImage = async (imageFile: File): Promise<File> => {
  const options = {
    maxSizeMB: 0.5, // Set target size to 0.5MB
    maxWidthOrHeight: 1920, // Maximum width or height in pixels
    useWebWorker: true, // Use web worker for compression
  };

  try {
    const originalFileName = imageFile.name;
    const compressedBlob = await imageCompression(imageFile, options);

    const compressedFile = new File([compressedBlob], originalFileName, {
      type: imageFile.type,
    });

    return compressedFile;
  } catch (error) {
    console.error('Error compressing image:', error);
    throw error;
  }
};

interface Product {
  pName: string;
  pDescription: string;
  pImage: File[];
  pStatus: string;
  pCategory: { _id: string };
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
  pTag: string;
  pAbs: string;
  pAirbags: string;
  pCruiseControl: string;
  pAdjustableSteer: string;
  pRearParkSensor: string;
  pSunroof: string;
}

interface EditProduct extends Product {
  pId: string;
  pEditImages?: File[] | undefined;
  pImages: string[];
}

interface CreateProductImageParams {
  pImage: File[];
}

export const getAllProduct = async (): Promise<any> => {
  try {
    const res: AxiosResponse<any> = await axios.get(
      `${apiURL}/api/product/all-product`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const createProductImage = async ({
  pImage,
}: CreateProductImageParams): Promise<any> => {
  const formData = new FormData();
  try {
    for (const file of pImage) {
      const compressedFile = await compressImage(file);
      formData.append('pImage', compressedFile);
    }

    const res: AxiosResponse<any> = await axios.post(
      `${apiURL}/api/product/upload-images`,
      formData
    );
    return res.data;
  } catch (error) {
    console.error('Error uploading images:', error);
    throw error;
  }
};

export const createProduct = async ({
  pName,
  pDescription,
  pImage,
  pStatus,
  pCategory,
  pQuantity,
  pPrice,
  pOffer,
  pModel,
  pYear,
  pTransmission,
  pDriven,
  pOwners,
  pInsurance,
  pFuel,
  pColour,
  pEngine,
  pPower,
  pTorque,
  pProductCode,
  pTag,
  pAbs,
  pAirbags,
  pCruiseControl,
  pAdjustableSteer,
  pRearParkSensor,
  pSunroof,
}: Product): Promise<any> => {
  const formData = new FormData();

  try {
    for (const file of pImage) {
      const compressedFile = await compressImage(file);
      formData.append('pImage', compressedFile);
    }

    formData.append('pName', pName);
    formData.append('pDescription', pDescription);
    formData.append('pStatus', pStatus);
    formData.append('pCategory', pCategory._id);
    formData.append('pQuantity', pQuantity.toString());
    formData.append('pPrice', pPrice.toString());
    formData.append('pOffer', pOffer.toString());
    formData.append('pModel', pModel);
    formData.append('pYear', pYear);
    formData.append('pTransmission', pTransmission);
    formData.append('pDriven', pDriven);
    formData.append('pOwners', pOwners);
    formData.append('pInsurance', pInsurance);
    formData.append('pFuel', pFuel);
    formData.append('pColour', pColour);
    formData.append('pEngine', pEngine);
    formData.append('pPower', pPower);
    formData.append('pTorque', pTorque);
    formData.append('pProductCode', pProductCode);
    formData.append('pTag', pTag);
    formData.append('pAbs', pAbs.toString());
    formData.append('pAirbags', pAirbags.toString());
    formData.append('pCruiseControl', pCruiseControl.toString());
    formData.append('pAdjustableSteer', pAdjustableSteer.toString());
    formData.append('pRearParkSensor', pRearParkSensor.toString());
    formData.append('pSunroof', pSunroof.toString());

    const res: AxiosResponse<any> = await axios.post(
      `${apiURL}/api/product/add-product`,
      formData
    );
    return res.data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

export const editProduct = async (product: EditProduct): Promise<any> => {
  console.log(product);
  const formData = new FormData();
  if (product.pEditImages) {
    for (const file of product.pEditImages) {
      const compressedFile = await compressImage(file);
      formData.append('pEditImages', compressedFile);
    }
  }
  formData.append('pId', product.pId);
  formData.append('pName', product.pName);
  formData.append('pDescription', product.pDescription);
  formData.append('pStatus', product.pStatus);
  formData.append('pCategory', product.pCategory._id);
  formData.append('pQuantity', product.pQuantity.toString());
  formData.append('pPrice', product.pPrice.toString());
  formData.append('pOffer', product.pOffer.toString());
  formData.append('pImages', product.pImages.toString());
  formData.append('pModel', product.pModel);
  formData.append('pYear', product.pYear);
  formData.append('pTransmission', product.pTransmission);
  formData.append('pDriven', product.pDriven);
  formData.append('pOwners', product.pOwners);
  formData.append('pInsurance', product.pInsurance);
  formData.append('pFuel', product.pFuel);
  formData.append('pColour', product.pColour);
  formData.append('pEngine', product.pEngine);
  formData.append('pPower', product.pPower);
  formData.append('pTorque', product.pTorque);
  formData.append('pProductCode', product.pProductCode);
  formData.append('pTag', product.pTag);
  formData.append('pAbs', product.pAbs.toString());
  formData.append('pAirbags', product.pAirbags.toString());
  formData.append('pCruiseControl', product.pCruiseControl.toString());
  formData.append('pAdjustableSteer', product.pAdjustableSteer.toString());
  formData.append('pRearParkSensor', product.pRearParkSensor.toString());
  formData.append('pSunroof', product.pSunroof.toString());

  try {
    const res: AxiosResponse<any> = await axios.post(
      `${apiURL}/api/product/edit-product`,
      formData
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduct = async (pId: string): Promise<any> => {
  try {
    const res: AxiosResponse<any> = await axios.post(
      `${apiURL}/api/product/delete-product`,
      { pId }
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const productByCategory = async (catId: string): Promise<any> => {
  try {
    const res: AxiosResponse<any> = await axios.post(
      `${apiURL}/api/product/product-by-category`,
      {
        catId,
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const productByPrice = async (price: number): Promise<any> => {
  try {
    const res: AxiosResponse<any> = await axios.post(
      `${apiURL}/api/product/product-by-price`,
      {
        price,
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
