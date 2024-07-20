import React, { Fragment, useContext, useState, FormEvent } from 'react';
import { createCategory, getAllCategory } from './FetchApi';
import { FormData } from './types';
import { CategoryContext } from './CategoryContext';

const AddCategoryModal: React.FC = () => {
  const categoryContext = useContext(CategoryContext);
  if (!categoryContext) {
    throw new Error('AddCategoryModal must be used within a CategoryProvider');
  }

  const { data, dispatch } = categoryContext;

  const alert = (msg: string | boolean, type: string) => (
    <div className={`bg-${type}-200 py-2 px-4 w-full`}>{msg}</div>
  );

  const [fData, setFdata] = useState<FormData>({
    cName: '',
    cDescription: '',
    cImage: null,
    cStatus: 'Active',
    success: false,
    error: false,
  });

  const fetchData = async () => {
    const responseData = await getAllCategory();
    if (responseData && responseData.Categories) {
      dispatch({
        type: 'fetchCategoryAndChangeState',
        payload: responseData.Categories,
      });
    }
  };

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: 'loading', payload: true });

    if (!fData.cImage) {
      dispatch({ type: 'loading', payload: false });
      return setFdata({ ...fData, error: 'Please upload a category image' });
    }

    try {
      const responseData = await createCategory({
        ...fData,
        cImage: fData.cImage as File, // Ensuring cImage is of type File
      });
      if (responseData && responseData.success) {
        fetchData();
        setFdata({
          cName: '',
          cDescription: '',
          cImage: null,
          cStatus: 'Active',
          success: responseData.success,
          error: false,
        });
        dispatch({ type: 'loading', payload: false });
      } else if (responseData && responseData.error) {
        setFdata({ ...fData, success: false, error: responseData.error });
        dispatch({ type: 'loading', payload: false });
      }
    } catch (error) {
      console.error(error);
      setFdata({ ...fData, success: false, error: 'An error occurred' });
      dispatch({ type: 'loading', payload: false });
    }
  };

  return (
    <Fragment>
      <div
        onClick={() => dispatch({ type: 'addCategoryModal', payload: false })}
        className={`${data.addCategoryModal ? '' : 'hidden'} fixed top-0 left-0 z-30 w-full h-full bg-black opacity-50`}
      />
      <div
        className={`${data.addCategoryModal ? '' : 'hidden'} fixed inset-0 m-4 flex items-center z-30 justify-center`}
      >
        <div className="relative bg-white w-full md:w-1/2 shadow-lg flex flex-col items-center space-y-4 overflow-y-auto px-4 py-4 md:px-8">
          <div className="flex items-center justify-between w-full pt-4">
            <span className="text-left font-semibold text-2xl tracking-wider">
              Add Category
            </span>
            <span
              style={{ background: '#303031' }}
              onClick={() =>
                dispatch({ type: 'addCategoryModal', payload: false })
              }
              className="cursor-pointer text-gray-100 py-2 px-2 rounded-full"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </span>
          </div>
          {fData.error && alert(fData.error, 'red')}
          {fData.success && alert(fData.success, 'green')}
          <form className="w-full" onSubmit={submitForm}>
            <div className="flex flex-col space-y-1 w-full py-4">
              <label htmlFor="name">Category Name</label>
              <input
                onChange={(e) => setFdata({ ...fData, cName: e.target.value })}
                value={fData.cName}
                className="px-4 py-2 border focus:outline-none"
                type="text"
              />
            </div>
            <div className="flex flex-col space-y-1 w-full">
              <label htmlFor="description">Category Description</label>
              <textarea
                onChange={(e) =>
                  setFdata({ ...fData, cDescription: e.target.value })
                }
                value={fData.cDescription}
                className="px-4 py-2 border focus:outline-none"
                name="description"
                id="description"
                cols={5}
                rows={5}
              />
            </div>
            <div className="flex flex-col space-y-1 w-full">
              <label htmlFor="image">Category Image</label>
              <input
                accept=".jpg, .jpeg, .png"
                onChange={(e) =>
                  setFdata({
                    ...fData,
                    cImage: e.target.files ? e.target.files[0] : null,
                  })
                }
                className="px-4 py-2 border focus:outline-none"
                type="file"
              />
            </div>
            <div className="flex flex-col space-y-1 w-full">
              <label htmlFor="status">Category Status</label>
              <select
                name="status"
                onChange={(e) =>
                  setFdata({ ...fData, cStatus: e.target.value })
                }
                className="px-4 py-2 border focus:outline-none"
                id="status"
                value={fData.cStatus}
              >
                <option value="Active">Active</option>
                <option value="Disabled">Disabled</option>
              </select>
            </div>
            <div className="flex flex-col space-y-1 w-full pb-4 md:pb-6 mt-4">
              <button
                style={{ background: '#303031' }}
                type="submit"
                className="bg-gray-800 text-gray-100 rounded-full text-lg font-medium py-2"
              >
                Create Category
              </button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default AddCategoryModal;
