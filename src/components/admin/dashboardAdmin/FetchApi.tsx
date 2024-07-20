import axios, { AxiosResponse } from 'axios';

const apiURL = process.env.NEXT_PUBLIC_API_URL as string;

interface DashboardDataResponse {
  // Define the structure of the expected response data here
  // Example:
  // totalUsers: number;
  // totalSales: number;
}

interface SliderImage {
  id: string;
  url: string;
}

interface GetSliderImagesResponse {
  Images: SliderImage[];
}

interface UploadImageResponse {
  success: boolean;
  // Define other fields if necessary
}

interface DeleteImageResponse {
  success: boolean;
  // Define other fields if necessary
}

export const DashboardData = async (): Promise<
  DashboardDataResponse | undefined
> => {
  try {
    const res: AxiosResponse<DashboardDataResponse> = await axios.post(
      `${apiURL}/api/customize/dashboard-data`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getSliderImages = async (): Promise<
  GetSliderImagesResponse | undefined
> => {
  try {
    const res: AxiosResponse<GetSliderImagesResponse> = await axios.get(
      `${apiURL}/api/customize/get-slide-image`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const postUploadImage = async (
  formData: FormData
): Promise<UploadImageResponse | undefined> => {
  try {
    const res: AxiosResponse<UploadImageResponse> = await axios.post(
      `${apiURL}/api/customize/upload-slide-image`,
      formData
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const postDeleteImage = async (
  id: string
): Promise<DeleteImageResponse | undefined> => {
  try {
    const res: AxiosResponse<DeleteImageResponse> = await axios.post(
      `${apiURL}/api/customize/delete-slide-image`,
      { id }
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
