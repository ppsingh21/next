import axios from 'axios';

const apiURL = process.env.NEXT_PUBLIC_API_URL;

export const getAllOrder = async () => {
  try {
    const res = await axios.get(`${apiURL}/api/order/get-all-orders`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const editOrder = async (oId: string, status: string) => {
  const data = { oId, status };
  try {
    const res = await axios.post(`${apiURL}/api/order/update-order`, data);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteOrder = async (oId: string) => {
  const data = { oId };
  try {
    const res = await axios.post(`${apiURL}/api/order/delete-order`, data);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
