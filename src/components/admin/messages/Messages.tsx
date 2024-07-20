'use client';
import React, { Fragment, useReducer } from 'react';
import AllMessages from './AllMessages';
import { MessageContext, messageReducer, messageState } from './MessageContext';
import AdminLayout from '../layout/AdminLayout';

const MessageComponent: React.FC = () => {
  return (
    <div className="grid grid-cols-1 space-y-4 p-4">
      <AllMessages />
    </div>
  );
};

const Messages: React.FC = (props) => {
  const [state, dispatch] = useReducer(messageReducer, messageState);

  return (
    <Fragment>
      <MessageContext.Provider value={{ state, dispatch }}>
        <AdminLayout>
          <MessageComponent />
        </AdminLayout>
      </MessageContext.Provider>
    </Fragment>
  );
};

export default Messages;
