import React, { Fragment, useContext, useState, useEffect, FormEvent } from 'react';
import { editProduct, getAllProduct } from './FetchApi';
import { getAllCategory } from '../categories/FetchApi';
import Image from 'next/image';
import { ProductContext } from './Product';

interface Category {
  _id: string;
  cName: string;
}

interface EditProductFormData {
  pId: string;
  pName: string;
  pDescription: string;
  pImages: string[] ;
  pEditImages: File[] | undefined;
  pImage: File[];
  pStatus: string;
  pCategory: string;
  pQuantity: string;
  pPrice: string;
  pOffer: string;
  pModel: string;
  pYear: string;
  pTransmission: string;
  pDriven: string;
  pOwners: string;
  pInsurance: string;
  pFuel: string;
  pColour: string;
  pPower: string;
  pEngine: string;
  pTorque: string;
  pProductCode: string;
  pTag: string;
  pAbs: string;
  pAirbags: string;
  pCruiseControl: string;
  pAdjustableSteer: string;
  pRearParkSensor: string;
  pSunroof: string;
  error: string | boolean;
  success: string | boolean;
}

const apiURL = process.env.NEXT_PUBLIC_API_URL as string;

const EditProductModal: React.FC = () => {
  const context = useContext(ProductContext);
  const [categories, setCategories] = useState<Category[] | null>(null);

  const alert = (msg: string, type: string): React.ReactNode => (
    <div className={`bg-${type}-200 py-2 px-4 w-full`}>{msg}</div>
  );

  const [editformData, setEditformdata] = useState<EditProductFormData>({
    pId: '',
    pName: '',
    pDescription: '',
    pImages: [],
    pEditImages: undefined,
    pImage: [],
    pStatus: '',
    pCategory: '',
    pQuantity: '',
    pPrice: '',
    pOffer: '',
    pModel: '',
    pYear: '',
    pTransmission: '',
    pDriven: '',
    pOwners: '',
    pInsurance: '',
    pFuel: '',
    pColour: '',
    pPower: '',
    pEngine: '',
    pTorque: '',
    pProductCode: '',
    pTag: '',
    pAbs: '',
    pAirbags: '',
    pCruiseControl: '',
    pAdjustableSteer: '',
    pRearParkSensor: '',
    pSunroof: '',
    error: false,
    success: false,
  });

  useEffect(() => {
    fetchCategoryData();
  }, []);

  const fetchCategoryData = async () => {
    let responseData = await getAllCategory();
    if (responseData && responseData.Categories) {
      setCategories(responseData.Categories);
    }
  };

  useEffect(() => {
    if (context) {
      setEditformdata({
        pId: context.data.editProductModal.pId,
        pName: context.data.editProductModal.pName,
        pDescription: context.data.editProductModal.pDescription,
        pImages: context.data.editProductModal.pImages || [],
        pEditImages: undefined,
        pImage: [],
        pStatus: context.data.editProductModal.pStatus,
        pCategory: context.data.editProductModal.pCategory,
        pQuantity: context.data.editProductModal.pQuantity,
        pPrice: context.data.editProductModal.pPrice,
        pOffer: context.data.editProductModal.pOffer,
        pModel: context.data.editProductModal.pModel,
        pYear: context.data.editProductModal.pYear,
        pTransmission: context.data.editProductModal.pTransmission,
        pDriven: context.data.editProductModal.pDriven,
        pOwners: context.data.editProductModal.pOwners,
        pInsurance: context.data.editProductModal.pInsurance,
        pFuel: context.data.editProductModal.pFuel,
        pColour: context.data.editProductModal.pColour,
        pEngine: context.data.editProductModal.pEngine,
        pPower: context.data.editProductModal.pPower,
        pTorque: context.data.editProductModal.pTorque,
        pProductCode: context.data.editProductModal.pProductCode,
        pTag: context.data.editProductModal.pTag,
        pAbs: context.data.editProductModal.pAbs,
        pAirbags: context.data.editProductModal.pAirbags,
        pCruiseControl: context.data.editProductModal.pCruiseControl,
        pAdjustableSteer: context.data.editProductModal.pAdjustableSteer,
        pRearParkSensor: context.data.editProductModal.pRearParkSensor,
        pSunroof: context.data.editProductModal.pSunroof,
        error: false,
        success: false,
      });
    }
  }, [context]);

  if (!context) return null; // Handle the case where context is undefined

  const { data, dispatch } = context;
  
  const fetchData = async () => {
    let responseData = await getAllProduct();
    if (responseData && responseData.Products) {
      context.dispatch({
        type: 'fetchProductsAndChangeState',
        payload: responseData.Products,
      });
    }
  };

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editformData.pEditImages) {
      console.log('Image Not upload', editformData);
    } else {
      console.log('Image uploading');
    }
    try {
      let responseData = await editProduct(editformData);
      if (responseData.success) {
        fetchData();
        setEditformdata({ ...editformData, success: responseData.success });
        setTimeout(() => {
          setEditformdata({
            ...editformData,
            success: responseData.success,
          });
        }, 2000);
      } else if (responseData.error) {
        setEditformdata({ ...editformData, error: responseData.error });
        setTimeout(() => {
          setEditformdata({
            ...editformData,
            error: responseData.error,
          });
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      {/* Black Overlay */}
      <div
        onClick={(e) =>
          dispatch({ type: 'editProductModalClose', payload: false })
        }
        className={`${
          data.editProductModal.modal ? '' : 'hidden'
        } fixed top-0 left-0 z-30 w-full h-full bg-black opacity-50`}
      />
      {/* End Black Overlay */}

      {/* Modal Start */}
      <div
        className={`${
          data.editProductModal.modal ? '' : 'hidden'
        } overflow-auto fixed inset-0 z-30 flex justify-center`}
      >
        <div className="bg-white w-11/12 md:w-3/6 shadow-lg flex flex-col items-center space-y-4 px-4 py-4 md:px-8 overflow-auto">
          <div className="flex items-center justify-between w-full pt-4">
            <span className="text-left font-semibold text-2xl tracking-wider">
              Edit Product
            </span>
            {/* Close Modal */}
            <span
              style={{ background: '#303031' }}
              onClick={(e) =>
                dispatch({ type: 'editProductModalClose', payload: false })
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
          {editformData.error ? alert(editformData.error as string, 'red') : ''}
          {editformData.success
            ? alert('Product updated successfully!', 'green')
            : ''}
          <form className="w-full" onSubmit={(e) => submitForm(e)}>
            <div className="flex space-x-1 py-4">
              <div className="w-1/2 flex flex-col space-y-1 space-x-1">
                <label htmlFor="name">Product Name *</label>
                <input
                  value={editformData.pName}
                  onChange={(e) =>
                    setEditformdata({
                      ...editformData,
                      error: false,
                      success: false,
                      pName: e.target.value,
                    })
                  }
                  className="px-4 py-2 border focus:outline-none"
                  type="text"
                />
              </div>
              <div className="w-1/2 flex flex-col space-y-1 space-x-1">
                <label htmlFor="price">Product Price *</label>
                <input
                  value={editformData.pPrice}
                  onChange={(e) =>
                    setEditformdata({
                      ...editformData,
                      error: false,
                      success: false,
                      pPrice: e.target.value,
                    })
                  }
                  type="number"
                  className="px-4 py-2 border focus:outline-none"
                  id="price"
                />
              </div>
            </div>
            <div className="flex space-x-1 py-4">
              <div className="w-full space-y-1 flex flex-col">
                <label htmlFor="description">Product Description *</label>
                <textarea
                  value={editformData.pDescription}
                  onChange={(e) =>
                    setEditformdata({
                      ...editformData,
                      error: false,
                      success: false,
                      pDescription: e.target.value,
                    })
                  }
                  className="px-4 py-2 border focus:outline-none"
                  name="description"
                  id="description"
                  cols={5}
                  rows={2}
                />
              </div>
            </div>
            <div className="flex space-x-1 py-4">
              <div className="w-full space-y-1 flex flex-col">
                <div className="flex flex-row justify-between">
                  <label htmlFor="image">Product Images *</label>
                  {editformData.pImages ? (
                    <div className="flex space-x-1">
                      <Image
                    loading='lazy'
                        className="h-16 w-16 object-cover"
                        src={`${apiURL}/uploads/products/${editformData.pImages[0]}`}
                        alt="productImage"
                        width={100}
                        height={100}
                      />
                      <Image
                    loading='lazy'
                        className="h-16 w-16 object-cover"
                        src={`${apiURL}/uploads/products/${editformData.pImages[1]}`}
                        alt="productImage"
                        width={100}
                        height={100}
                      />
                    </div>
                  ) : (
                    ''
                  )}
                  <span className="text-gray-600 text-xs">
                    Must need 2 images
                  </span>
                </div>
                <input
                  onChange={(e) =>
                    setEditformdata({
                      ...editformData,
                      error: false,
                      success: false,
                      pEditImages: Array.from(e.target.files || []),
                    })
                  }
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  className="px-4 py-4 border focus:outline-none"
                  id="image"
                  multiple
                />
              </div>
            </div>
            <div className="flex space-x-1 py-4">
              <div className="w-1/2 flex flex-col space-y-1 space-x-1">
                <label htmlFor="model">Product Model *</label>
                <input
                  value={editformData.pModel}
                  onChange={(e) =>
                    setEditformdata({
                      ...editformData,
                      error: false,
                      success: false,
                      pModel: e.target.value,
                    })
                  }
                  className="px-4 py-2 border focus:outline-none"
                  type="text"
                  id="model"
                />
              </div>
              <div className="w-1/2 flex flex-col space-y-1 space-x-1">
                <label htmlFor="year">Product Year *</label>
                <input
                  value={editformData.pYear}
                  onChange={(e) =>
                    setEditformdata({
                      ...editformData,
                      error: false,
                      success: false,
                      pYear: e.target.value,
                    })
                  }
                  type="number"
                  className="px-4 py-2 border focus:outline-none"
                  id="year"
                />
              </div>
            </div>
            <div className="flex space-x-1 py-4">
              <div className="w-1/2 flex flex-col space-y-1 space-x-1">
                <label htmlFor="transmission">Product Transmission *</label>
                <select
                  value={editformData.pTransmission}
                  onChange={(e) =>
                    setEditformdata({
                      ...editformData,
                      error: false,
                      success: false,
                      pTransmission: e.target.value,
                    })
                  }
                  className="px-4 py-2 border focus:outline-none"
                  id="transmission"
                  name="transmission"
                >
                  <option value="Manual">Manual</option>
                  <option value="Automatic">Automatic</option>
                </select>
              </div>
              <div className="w-1/2 flex flex-col space-y-1 space-x-1">
                <label htmlFor="driven">Product Driven (in km) *</label>
                <input
                  value={editformData.pDriven}
                  onChange={(e) =>
                    setEditformdata({
                      ...editformData,
                      error: false,
                      success: false,
                      pDriven: e.target.value,
                    })
                  }
                  type="number"
                  className="px-4 py-2 border focus:outline-none"
                  id="driven"
                />
              </div>
            </div>
            <div className="flex space-x-1 py-4">
              <div className="w-1/2 flex flex-col space-y-1 space-x-1">
                <label htmlFor="owners">
                  Product Owners (Number of previous owners) *
                </label>
                <input
                  value={editformData.pOwners}
                  onChange={(e) =>
                    setEditformdata({
                      ...editformData,
                      error: false,
                      success: false,
                      pOwners: e.target.value,
                    })
                  }
                  className="px-4 py-2 border focus:outline-none"
                  type="number"
                  id="owners"
                />
              </div>
              <div className="w-1/2 flex flex-col space-y-1 space-x-1">
                <label htmlFor="insurance">Product Insurance *</label>
                <select
                  value={editformData.pInsurance}
                  onChange={(e) =>
                    setEditformdata({
                      ...editformData,
                      error: false,
                      success: false,
                      pPrice: e.target.value,
                    })
                  }
                  className="px-4 py-2 border focus:outline-none"
                  id="insurance"
                  name="insurance"
                >
                  <option value="YES">YES</option>
                  <option value="NO">NO</option>
                </select>
              </div>
            </div>
            <div className="flex space-x-1 py-4">
              <div className="w-1/2 flex flex-col space-y-1 space-x-1">
                <label htmlFor="fuel">Product Fuel *</label>
                <select
                  value={editformData.pFuel}
                  onChange={(e) =>
                    setEditformdata({
                      ...editformData,
                      error: false,
                      success: false,
                      pFuel: e.target.value,
                    })
                  }
                  className="px-4 py-2 border focus:outline-none"
                  id="fuel"
                  name="fuel"
                >
                  <option value="Petrol">Petrol</option>
                  <option value="Diesel">Diesel</option>
                </select>
              </div>
              <div className="w-1/2 flex flex-col space-y-1 space-x-1">
                <label htmlFor="colour">Product Colour *</label>
                <input
                  value={editformData.pColour}
                  onChange={(e) =>
                    setEditformdata({
                      ...editformData,
                      error: false,
                      success: false,
                      pColour: e.target.value,
                    })
                  }
                  type="text"
                  className="px-4 py-2 border focus:outline-none"
                  id="colour"
                />
              </div>
            </div>
            <div className="flex space-x-1 py-4">
              <div className="w-1/2 flex flex-col space-y-1 space-x-1">
                <label htmlFor="engine">Product Engine (in cc) *</label>
                <input
                  value={editformData.pEngine}
                  onChange={(e) =>
                    setEditformdata({
                      ...editformData,
                      error: false,
                      success: false,
                      pEngine: e.target.value,
                    })
                  }
                  className="px-4 py-2 border focus:outline-none"
                  type="number"
                  id="engine"
                />
              </div>
              <div className="w-1/2 flex flex-col space-y-1 space-x-1">
                <label htmlFor="power">Product Power (in bhp) *</label>
                <input
                  value={editformData.pPower}
                  onChange={(e) =>
                    setEditformdata({
                      ...editformData,
                      error: false,
                      success: false,
                      pPower: e.target.value,
                    })
                  }
                  type="number"
                  className="px-4 py-2 border focus:outline-none"
                  id="power"
                />
              </div>
            </div>
            <div className="flex space-x-1 py-4">
              <div className="w-1/2 flex flex-col space-y-1 space-x-1">
                <label htmlFor="torque">Product Torque (in Nm) *</label>
                <input
                  value={editformData.pTorque}
                  onChange={(e) =>
                    setEditformdata({
                      ...editformData,
                      error: false,
                      success: false,
                      pTorque: e.target.value,
                    })
                  }
                  type="number"
                  className="px-4 py-2 border focus:outline-none"
                  id="torque"
                />
              </div>
              <div className="w-1/2 flex flex-col space-y-1 space-x-1">
                <label htmlFor="code">Product Product Code *</label>
                <input
                  value={editformData.pProductCode}
                  onChange={(e) =>
                    setEditformdata({
                      ...editformData,
                      error: false,
                      success: false,
                      pProductCode: e.target.value,
                    })
                  }
                  className="px-4 py-2 border focus:outline-none"
                  type="text"
                  id="code"
                />
              </div>
            </div>
            <div className="flex space-x-1 py-4">
              <div className="w-1/2 flex flex-col space-y-1 space-x-1">
                <label htmlFor="tag">Product Tag *</label>
                <select
                  value={editformData.pTag}
                  onChange={(e) =>
                    setEditformdata({
                      ...editformData,
                      error: false,
                      success: false,
                      pTag: e.target.value,
                    })
                  }
                  className="px-4 py-2 border focus:outline-none"
                  id="tag"
                  name="tag"
                >
                  <option value="Insider">Insider</option>
                  <option value="Select">Select</option>
                  <option value="Budget">Budget</option>
                  <option value="Sold_Out">Sold Out</option>
                </select>
              </div>
              <div className="w-1/2 flex flex-col space-y-1 space-x-1">
                <label htmlFor="rearparkingsensors">
                  Rear Parking Sensors *
                </label>
                <select
                  value={editformData.pRearParkSensor}
                  onChange={(e) =>
                    setEditformdata({
                      ...editformData,
                      error: false,
                      success: false,
                      pRearParkSensor: e.target.value,
                    })
                  }
                  className="px-4 py-2 border focus:outline-none"
                  id="rearparkingsensors"
                  name="rearparkingsensors"
                >
                  <option value="YES">YES</option>
                  <option value="NO">NO</option>
                </select>
              </div>
            </div>
            {/* Most Important part for uploading multiple image */}
            <div className="flex space-x-1 py-4">
              <div className="w-1/2 flex flex-col space-y-1">
                <label htmlFor="status">Product Status *</label>
                <select
                  value={editformData.pStatus}
                  onChange={(e) =>
                    setEditformdata({
                      ...editformData,
                      error: false,
                      success: false,
                      pStatus: e.target.value,
                    })
                  }
                  name="status"
                  className="px-4 py-2 border focus:outline-none"
                  id="status"
                >
                  <option value="Active">Active</option>
                  <option value="Disabled">Disabled</option>
                </select>
              </div>
              <div className="w-1/2 flex flex-col space-y-1">
                <label htmlFor="category">Product Category *</label>
                <select
                  onChange={(e) =>
                    setEditformdata({
                      ...editformData,
                      error: false,
                      success: false,
                      pCategory: e.target.value,
                    })
                  }
                  name="category"
                  className="px-4 py-2 border focus:outline-none"
                  id="category"
                >
                  <option disabled value="">
                    Select a category
                  </option>
                  {categories && categories.length > 0
                    ? categories.map((elem) => {
                        return (
                          <Fragment key={elem._id}>
                            {editformData.pCategory === elem._id ? (
                              <option value={elem._id} key={elem._id} selected>
                                {elem.cName}
                              </option>
                            ) : (
                              <option value={elem._id} key={elem._id}>
                                {elem.cName}
                              </option>
                            )}
                          </Fragment>
                        );
                      })
                    : ''}
                </select>
              </div>
            </div>
            <div className="flex space-x-1 py-4">
              <div className="w-1/2 flex flex-col space-y-1">
                <label htmlFor="quantity">Product in Stock *</label>
                <input
                  value={editformData.pQuantity}
                  onChange={(e) =>
                    setEditformdata({
                      ...editformData,
                      error: false,
                      success: false,
                      pQuantity: e.target.value,
                    })
                  }
                  type="number"
                  className="px-4 py-2 border focus:outline-none"
                  id="quantity"
                />
              </div>
              <div className="w-1/2 flex flex-col space-y-1">
                <label htmlFor="offer">Product Offfer (%) *</label>
                <input
                  value={editformData.pOffer}
                  onChange={(e) =>
                    setEditformdata({
                      ...editformData,
                      error: false,
                      success: false,
                      pOffer: e.target.value,
                    })
                  }
                  type="number"
                  className="px-4 py-2 border focus:outline-none"
                  id="offer"
                />
              </div>
            </div>
            <div className="flex space-x-1 py-4">
              <div className="w-1/2 flex flex-col space-y-1 space-x-1">
                <label htmlFor="airbag">AirBags *</label>
                <input
                  value={editformData.pAirbags}
                  onChange={(e) =>
                    setEditformdata({
                      ...editformData,
                      error: false,
                      success: false,
                      pAirbags: e.target.value,
                    })
                  }
                  className="px-4 py-2 border focus:outline-none"
                  type="number"
                  id="airbag"
                />
              </div>
              <div className="w-1/2 flex flex-col space-y-1 space-x-1">
                <label htmlFor="abs">ABS *</label>
                <select
                  value={editformData.pAbs}
                  onChange={(e) =>
                    setEditformdata({
                      ...editformData,
                      error: false,
                      success: false,
                      pAbs: e.target.value,
                    })
                  }
                  className="px-4 py-2 border focus:outline-none"
                  id="abs"
                  name="abs"
                >
                  <option value="YES">YES</option>
                  <option value="NO">NO</option>
                </select>
              </div>
            </div>
            <div className="flex space-x-1 py-4">
              <div className="w-1/2 flex flex-col space-y-1 space-x-1">
                <label htmlFor="cruisecontrol">Cruise Control *</label>
                <select
                  value={editformData.pCruiseControl}
                  onChange={(e) =>
                    setEditformdata({
                      ...editformData,
                      error: false,
                      success: false,
                      pCruiseControl: e.target.value,
                    })
                  }
                  className="px-4 py-2 border focus:outline-none"
                  id="cruisecontrol"
                  name="cruisecontrol"
                >
                  <option value="YES">YES</option>
                  <option value="NO">NO</option>
                </select>
              </div>
              <div className="w-1/2 flex flex-col space-y-1 space-x-1">
                <label htmlFor="adjustablesteering">
                  Adjustable Steering *
                </label>
                <select
                  value={editformData.pAdjustableSteer}
                  onChange={(e) =>
                    setEditformdata({
                      ...editformData,
                      error: false,
                      success: false,
                      pAdjustableSteer: e.target.value,
                    })
                  }
                  className="px-4 py-2 border focus:outline-none"
                  id="adjustablesteering"
                  name="adjustablesteering"
                >
                  <option value="YES">YES</option>
                  <option value="NO">NO</option>
                </select>
              </div>
            </div>
            <div className="flex space-x-1 py-4">
              <div className="w-1/2 flex flex-col space-y-1 space-x-1">
                <label htmlFor="sunroof">Sunroof Style *</label>
                <select
                  value={editformData.pSunroof}
                  onChange={(e) =>
                    setEditformdata({
                      ...editformData,
                      error: false,
                      success: false,
                      pSunroof: e.target.value,
                    })
                  }
                  className="px-4 py-2 border focus:outline-none"
                  id="sunroof"
                  name="sunroof"
                >
                  <option value="Not_Available">Not Available</option>
                  <option value="Standard">Standard</option>
                  <option value="Moonroof">Moonroof</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col space-y-1 w-full pb-4 md:pb-6 mt-4">
              <button
                style={{ background: '#303031' }}
                type="submit"
                className="rounded-full bg-gray-800 text-gray-100 text-lg font-medium py-2"
              >
                Update product
              </button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default EditProductModal;
