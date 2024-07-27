import React, { Fragment, useContext, useEffect } from 'react';
import { getAllCategory, deleteCategory } from './FetchApi';
import { CategoryContext } from './CategoryContext';
import moment from 'moment';
import { Category } from './types';
import Image from 'next/image';

const apiURL = process.env.NEXT_PUBLIC_API_URL as string;

const AllCategory: React.FC = () => {
  const context = useContext(CategoryContext);

  useEffect(() => {
    if (context) {
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    if (!context) return;

    const { dispatch } = context;
    dispatch({ type: 'loading', payload: true });
    const responseData = await getAllCategory();
    setTimeout(() => {
      if (responseData && responseData.Categories) {
        dispatch({
          type: 'fetchCategoryAndChangeState',
          payload: responseData.Categories,
        });
        dispatch({ type: 'loading', payload: false });
      } else {
        dispatch({ type: 'loading', payload: false });
        // handle error appropriately if needed
      }
    }, 1000);
  };

  const deleteCategoryReq = async (cId: string) => {
    const deleteC = await deleteCategory(cId);
    if (deleteC && 'error' in deleteC) {
      console.log(deleteC.error);
    } else if (deleteC && 'message' in deleteC) {
      console.log(deleteC.message);
      fetchData();
    }
  };

  const editCategory = (
    cId: string,
    type: boolean,
    des: string,
    status: string
  ) => {
    if (!context) return;

    const { dispatch } = context;
    if (type) {
      dispatch({
        type: 'editCategoryModalOpen',
        cId: cId,
        des: des,
        status: status,
      });
    }
  };

  if (!context) {
    return null; // or handle the error as appropriate
  }

  const { data } = context;
  const { categories, loading } = data;
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
              <th className="px-4 py-2 border">Category</th>
              <th className="px-4 py-2 border">Description</th>
              <th className="px-4 py-2 border">Image</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Created at</th>
              <th className="px-4 py-2 border">Updated at</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories && categories.length > 0 ? (
              categories.map((item: Category, key: number) => (
                <CategoryTable
                  category={item}
                  editCat={(
                    cId: string,
                    type: boolean,
                    des: string,
                    status: string
                  ) => editCategory(cId, type, des, status)}
                  deleteCat={(cId: string) => deleteCategoryReq(cId)}
                  key={key}
                />
              ))
            ) : (
              <tr>
                <td
                  colSpan={7}
                  className="text-xl text-center font-semibold py-8"
                >
                  No category found
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="text-sm text-gray-600 mt-2">
          Total {categories && categories.length} category found
        </div>
      </div>
    </Fragment>
  );
};

/* Single Category Component */
interface CategoryTableProps {
  category: Category;
  deleteCat: (cId: string) => void;
  editCat: (cId: string, type: boolean, des: string, status: string) => void;
}

const CategoryTable: React.FC<CategoryTableProps> = ({
  category,
  deleteCat,
  editCat,
}) => {
  return (
    <tr>
      <td className="p-2 text-left">
        {category.cName.length > 20
          ? category.cName.slice(0, 20) + '...'
          : category.cName}
      </td>
      <td className="p-2 text-left">
        {category.cDescription.length > 30
          ? category.cDescription.slice(0, 30) + '...'
          : category.cDescription}
      </td>
      <td className="p-2 text-center">
        <Image
                    loading='lazy'
          className="w-12 h-12 object-cover object-center"
          src={`${apiURL}/uploads/categories/${category.cImage}`}
          alt={category.cName}
          width={100}
          height={100}
        />
      </td>
      <td className="p-2 text-center">
        {category.cStatus === 'Active' ? (
          <span className="bg-green-200 rounded-full text-center text-xs px-2 font-semibold">
            {category.cStatus}
          </span>
        ) : (
          <span className="bg-red-200 rounded-full text-center text-xs px-2 font-semibold">
            {category.cStatus}
          </span>
        )}
      </td>
      <td className="p-2 text-center">
        {moment(category.createdAt).format('lll')}
      </td>
      <td className="p-2 text-center">
        {moment(category.updatedAt).format('lll')}
      </td>
      <td className="p-2 flex items-center justify-center">
        <span
          onClick={() =>
            editCat(category._id, true, category.cDescription, category.cStatus)
          }
          className="cursor-pointer hover:bg-gray-200 rounded-lg p-2 mx-1"
        >
          <svg
            className="w-6 h-6 fill-current text-green-500"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
            <path
              fillRule="evenodd"
              d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
              clipRule="evenodd"
            />
          </svg>
        </span>
        <span
          onClick={() => deleteCat(category._id)}
          className="cursor-pointer hover:bg-gray-200 rounded-lg p-2 mx-1"
        >
          <svg
            className="w-6 h-6 fill-current text-red-500"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </td>
    </tr>
  );
};

export default AllCategory;
