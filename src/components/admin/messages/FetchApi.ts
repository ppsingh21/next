import axios from 'axios';

const apiURL = process.env.NEXT_PUBLIC_API_URL as string;

interface Message {
  _id: string;
  addressed: boolean;
  name: string;
  email: string;
  number: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export const getAllMessages = async (): Promise<Message[]> => {
  try {
    const res = await axios.get<{ messages: Message[] }>(
      `${apiURL}/api/messages/get-all-messages`
    );
    return res.data.messages; // Return the messages array directly
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const updateMessageAddressed = async (
  oId: string,
  addressed: boolean
): Promise<ApiResponse<Message>> => {
  const data = { id: oId, addressed: addressed };
  try {
    const res = await axios.post<ApiResponse<Message>>(
      `${apiURL}/api/messages/update-message`,
      data
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return { success: false, error: 'Error updating message addressed status' };
  }
};

export const deleteMessage = async (
  oId: string
): Promise<ApiResponse<null>> => {
  const data = { id: oId };
  try {
    const res = await axios.post<ApiResponse<null>>(
      `${apiURL}/api/messages/delete-message`,
      data
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return { success: false, error: 'Error deleting message' };
  }
};
