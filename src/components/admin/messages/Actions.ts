import { Dispatch } from 'react';
import {
  getAllMessages,
  deleteMessage,
  updateMessageAddressed,
} from './FetchApi';

interface Action {
  type: string;
  payload?: any;
}

export const fetchData = async (dispatch: Dispatch<Action>) => {
  dispatch({ type: 'loading', payload: true });
  try {
    let messages = await getAllMessages();

    if (messages && messages.length > 0) {
      dispatch({
        type: 'fetchMessageAndChangeState',
        payload: messages,
      });
    } else {
      dispatch({
        type: 'fetchMessageAndChangeState',
        payload: [],
      });
    }
  } catch (error) {
    console.error('Error fetching messages:', error);
  } finally {
    dispatch({ type: 'loading', payload: false });
  }
};

export const deleteMessageReq = async (
  oId: string,
  dispatch: Dispatch<Action>
) => {
  try {
    let responseData = await deleteMessage(oId);
    if (responseData && responseData.success) {
      fetchData(dispatch); // Refresh messages after successful delete
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateMessageAddressedReq = async (
  oId: string,
  addressed: boolean,
  dispatch: Dispatch<Action>
) => {
  try {
    let responseData = await updateMessageAddressed(oId, addressed);
    if (responseData && responseData.success) {
      fetchData(dispatch); // Refresh messages after successful update
    }
  } catch (error) {
    console.log(error);
  }
};

export const filterMessages = async (
  type: string,
  data: any[],
  dispatch: Dispatch<Action>,
  dropdown: boolean,
  setDropdown: (value: boolean) => void
) => {
  // Implement your filter logic based on the updated messages
};
