'use client';
import React, { createContext, useReducer, Dispatch, ReactNode } from 'react';

interface Message {
  _id: string;
  name: string;
  email: string;
  number: string;
  message: string;
  addressed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface MessageState {
  messages: Message[];
  addMessageModal: boolean;
  updateMessageModal: {
    modal: boolean;
    mId: string | null;
    addressed: boolean;
  };
  loading: boolean;
}

export interface Action {
  type: string;
  payload?: any;
  mId?: string;
  addressed?: boolean;
}

export const messageState: MessageState = {
  messages: [],
  addMessageModal: false,
  updateMessageModal: {
    modal: false,
    mId: null,
    addressed: false,
  },
  loading: false,
};

export const MessageContext = createContext<{
  state: MessageState;
  dispatch: Dispatch<Action>;
}>({
  state: messageState,
  dispatch: () => null,
});

export const messageReducer = (
  state: MessageState,
  action: Action
): MessageState => {
  switch (action.type) {
    case 'updateMessageModalOpen':
      return {
        ...state,
        updateMessageModal: {
          modal: true,
          mId: action.mId || null,
          addressed: action.addressed || false,
        },
      };
    case 'updateMessageModalClose':
      return {
        ...state,
        updateMessageModal: {
          modal: false,
          mId: null,
          addressed: false,
        },
      };
    case 'loading':
      return {
        ...state,
        loading: action.payload,
      };
    case 'fetchMessageAndChangeState':
      return {
        ...state,
        messages: action.payload,
      };
    default:
      return state;
  }
};

interface MessageProviderProps {
  children: ReactNode;
}

const MessageProvider: React.FC<MessageProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(messageReducer, messageState);

  return (
    <MessageContext.Provider value={{ state, dispatch }}>
      {children}
    </MessageContext.Provider>
  );
};

export { MessageProvider };
