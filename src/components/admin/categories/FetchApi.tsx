import axios, { AxiosResponse } from 'axios';
import { Category } from './types';

const apiURL = process.env.NEXT_PUBLIC_API_URL as string;

export const getAllCategory = async (): Promise<{ Categories: Category[] } | void> => {
  try {
    const res: AxiosResponse<{ Categories: Category[] }> = await axios.get(
      `${apiURL}/api/category/all-category`
    );
    console.log('return',res.data);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};


interface CreateCategoryParams {
  cName: string;
  cImage: File;
  cDescription: string;
  cStatus: string;
}

export const createCategory = async ({
  cName,
  cImage,
  cDescription,
  cStatus,
}: CreateCategoryParams): Promise<{ success: boolean; error?: string } | void> => {
  const formData = new FormData();
  formData.append('cImage', cImage);
  formData.append('cName', cName);
  formData.append('cDescription', cDescription);
  formData.append('cStatus', cStatus);

  try {
    const res: AxiosResponse<{ success: boolean; error?: string }> = await axios.post(
      `${apiURL}/api/category/add-category`,
      formData
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

interface EditCategoryResponse {
  success?: boolean;
  error?: string;
  category?: Category;
}

export const editCategory = async (
  cId: string,
  des: string,
  status: string
): Promise<EditCategoryResponse | void> => {
  const data = { cId, cDescription: des, cStatus: status };
  try {
    const res: AxiosResponse<EditCategoryResponse> = await axios.post(
      `${apiURL}/api/category/edit-category`,
      data
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteCategory = async (
  cId: string
): Promise<{ message: string } | void> => {
  try {
    const res: AxiosResponse<{ message: string }> = await axios.post(
      `${apiURL}/api/category/delete-category`,
      { cId }
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
