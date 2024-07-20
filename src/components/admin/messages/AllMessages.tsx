import React, { Fragment, useContext, useEffect } from 'react';
import moment from 'moment';

import {
  fetchData,
  deleteMessageReq,
  updateMessageAddressedReq,
} from './Actions';
import { MessageContext } from './MessageContext';

const AllMessages: React.FC = () => {
  const { state, dispatch } = useContext(MessageContext);
  const { messages, loading } = state;

  useEffect(() => {
    fetchData(dispatch);
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <svg
          className="w-12 h-12 animate-spin text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          ></path>
        </svg>
      </div>
    );
  }

  return (
    <Fragment>
      <div className="col-span-1 overflow-auto bg-white shadow-lg p-4">
        <table className="table-auto border w-full my-2">
          <thead>
            <tr>
              <th className="px-2 py-2 border">Message Id</th>
              <th className="px-2 py-2 border">Email</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Phone</th>
              <th className="px-4 py-2 border">Message</th>
              <th className="px-4 py-2 border">Addressed</th>
              <th className="px-4 py-2 border">Created at</th>
              <th className="px-4 py-2 border">Updated at</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {messages && messages.length > 0 ? (
              messages.map((item: Message, i: number) => (
                <MessageTableRow
                  key={i}
                  message={item}
                  deleteMessage={(oId: string) =>
                    deleteMessageReq(oId, dispatch)
                  }
                  updateMessageAddressed={(oId: string, addressed: boolean) =>
                    updateMessageAddressedReq(oId, addressed, dispatch)
                  }
                />
              ))
            ) : (
              <tr>
                <td
                  colSpan={9}
                  className="text-xl text-center font-semibold py-8"
                >
                  No messages found
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="text-sm text-gray-600 mt-2">
          Total {messages && messages.length} message
          {messages.length !== 1 ? 's' : ''} found
        </div>
      </div>
    </Fragment>
  );
};

interface Message {
  _id: string;
  email: string;
  name: string;
  number: string;
  message: string;
  addressed: boolean;
  createdAt: string;
  updatedAt: string;
}

interface MessageTableProps {
  message: Message;
  deleteMessage: (oId: string) => void;
  updateMessageAddressed: (oId: string, addressed: boolean) => void;
}

const MessageTableRow: React.FC<MessageTableProps> = ({
  message,
  deleteMessage,
  updateMessageAddressed,
}) => {
  return (
    <tr className="border-b">
      <td className="hover:bg-gray-200 p-2 text-center cursor-default">
        {message._id}
      </td>
      <td className="hover:bg-gray-200 p-2 text-center cursor-default">
        {message.email}
      </td>
      <td className="hover:bg-gray-200 p-2 text-center cursor-default">
        {message.name}
      </td>
      <td className="hover:bg-gray-200 p-2 text-center cursor-default">
        {message.number}
      </td>
      <td className="hover:bg-gray-200 p-2 text-center cursor-default">
        {message.message}
      </td>
      <td className="hover:bg-gray-200 p-2 text-center cursor-default">
        {message.addressed ? (
          <span className="block text-green-600 rounded-full text-center text-xs px-2 font-semibold">
            Addressed
          </span>
        ) : (
          <span className="block text-red-600 rounded-full text-center text-xs px-2 font-semibold">
            Not Addressed
          </span>
        )}
      </td>
      <td className="hover:bg-gray-200 p-2 text-center">
        {moment(message.createdAt).format('lll')}
      </td>
      <td className="hover:bg-gray-200 p-2 text-center">
        {moment(message.updatedAt).format('lll')}
      </td>
      <td className="p-2 flex items-center justify-center">
        <span
          onClick={() => deleteMessage(message._id)}
          className="cursor-pointer hover:bg-gray-200 rounded-lg p-2 mx-1"
        >
          <svg
            className="w-6 h-6 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </span>
        <span
          onClick={() =>
            updateMessageAddressed(message._id, !message.addressed)
          }
          className="cursor-pointer hover:bg-gray-200 rounded-lg p-2 mx-1"
        >
          {message.addressed ? (
            <svg
              className="w-6 h-6 fill-current text-red-500"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12zm-3-4.414a2 2 0 012.828 0L10 14.172l1.172-1.172a2 2 0 112.828 2.828L10 19.828l-5.172-5.172a2 2 0 012.828-2.828L10 14.172l-1.172-1.172a2 2 0 00-2.828 2.828L10 17.828z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6 fill-current text-green-500"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12zm-3-4.414a2 2 0 012.828 0L10 14.172l1.172-1.172a2 2 0 112.828 2.828L10 19.828l-5.172-5.172a2 2 0 012.828-2.828L10 14.172l-1.172-1.172a2 2 0 00-2.828 2.828L10 17.828z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </span>
      </td>
    </tr>
  );
};

export default AllMessages;
