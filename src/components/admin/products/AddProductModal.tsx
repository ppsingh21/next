import React, { Fragment, useContext, useState, useEffect, FormEvent } from 'react';
import { createProduct, getAllProduct } from './FetchApi';
import { getAllCategory } from '../categories/FetchApi';
import { ProductContext } from './Product';

interface Category {
  _id: string;
  cName: string;
}

interface AddProductDetailProps {
  categories: Category[];
}

interface ProductFormData {
  pName: string;
  pDescription: string;
  pStatus: string;
  pImage: File[];
  pCategory: {_id: string} | null;
  pPrice: string;
  pOffer: string;
  pQuantity: string;
  pModel: string;
  pYear: string;
  pTransmission: string;
  pDriven: string;
  pOwners: string;
  pInsurance: string;
  pFuel: string;
  pColour: string;
  pEngine: string;
  pPower: string;
  pTorque: string;
  pProductCode: string;
  pTag: string;
  pAbs: string;
  pAirbags: string;
  pCruiseControl: string;
  pAdjustableSteer: string;
  pRearParkSensor: string;
  pSunroof: string;
  success: boolean;
  error: string | boolean;
}

const AddProductDetail: React.FC<AddProductDetailProps> = ({ categories }) => {
  const context = useContext(ProductContext);

  const alert = (msg: string, type: string) => (
    <div className={`bg-${type}-200 py-2 px-4 w-full`}>{msg}</div>
  );

  const [fData, setFdata] = useState<ProductFormData>({
    pName: '',
    pDescription: '',
    pStatus: 'Active',
    pImage: [], // Initial value will be null or empty array
    pCategory: null,
    pPrice: '',
    pOffer: '',
    pQuantity: '',
    pModel: '',
    pYear: '',
    pTransmission: 'Manual',
    pDriven: '',
    pOwners: '',
    pInsurance: 'YES',
    pFuel: 'Petrol',
    pColour: '',
    pEngine: '',
    pPower: '',
    pTorque: '',
    pProductCode: '',
    pTag: 'Insider',
    pAbs: 'YES',
    pAirbags: '0',
    pCruiseControl: 'YES',
    pAdjustableSteer: 'YES',
    pRearParkSensor: 'YES',
    pSunroof: 'Not_Available',
    success: false,
    error: false,
  });

  if (!context) return null; // Handle the case where context is undefined

  const { data, dispatch } = context;

  const fetchData = async () => {
    let responseData = await getAllProduct();
    setTimeout(() => {
      if (responseData && responseData.Products) {
        dispatch({
          type: 'fetchProductsAndChangeState',
          payload: responseData.Products,
        });
      }
    }, 1000);
  };

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.currentTarget.reset();

    if (!fData.pImage || fData.pImage.length < 2) {
      setFdata({ ...fData, error: 'Please upload at least 2 images' });
      setTimeout(() => {
        setFdata({ ...fData, error: false });
      }, 2000);
      return;
    }

    if (!fData.pCategory) {
      setFdata({ ...fData, error: 'Please select a category' });
      setTimeout(() => {
        setFdata({ ...fData, error: false });
      }, 2000);
      return;
    }

    try {
      let responseData = await createProduct({
        ...fData,
        pCategory: fData.pCategory,
      });
      if (responseData.success) {
        fetchData();
        setFdata({
          ...fData,
          pName: '',
          pDescription: '',
          pImage: [],
          pStatus: 'Active',
          pCategory: null,
          pPrice: '',
          pQuantity: '',
          pOffer: '',
          pModel: '',
          pYear: '',
          pTransmission: 'Manual',
          pDriven: '',
          pOwners: '',
          pInsurance: 'YES',
          pFuel: 'Petrol',
          pColour: '',
          pEngine: '',
          pPower: '',
          pTorque: '',
          pProductCode: '',
          pTag: 'Insider',
          pAbs: 'YES',
          pAirbags: '0',
          pCruiseControl: 'YES',
          pAdjustableSteer: 'YES',
          pRearParkSensor: 'YES',
          pSunroof: 'Not_Available',
          success: responseData.success,
          error: false,
        });
        setTimeout(() => {
          setFdata({
            ...fData,
            pName: '',
            pDescription: '',
            pImage: [],
            pStatus: 'Active',
            pCategory: null,
            pPrice: '',
            pQuantity: '',
            pOffer: '',
            pModel: '',
            pYear: '',
            pTransmission: 'Manual',
            pDriven: '',
            pOwners: '',
            pInsurance: 'YES',
            pFuel: 'Petrol',
            pColour: '',
            pEngine: '',
            pPower: '',
            pTorque: '',
            pProductCode: '',
            pTag: 'Insider',
            pAbs: 'YES',
            pAirbags: '0',
            pCruiseControl: 'YES',
            pAdjustableSteer: 'YES',
            pRearParkSensor: 'YES',
            pSunroof: 'Not_Available',
            success: false,
            error: false,
          });
        }, 2000);
      } else if (responseData.error) {
        setFdata({ ...fData, success: false, error: responseData.error });
        setTimeout(() => {
          return setFdata({ ...fData, error: false, success: false });
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleWheel = (e: React.WheelEvent<HTMLInputElement>) => {
    e.currentTarget.blur();
  };

  return (
    <Fragment>
      {/* Black Overlay */}
      <div
        onClick={(e) => dispatch({ type: 'addProductModal', payload: false })}
        className={`${
          data.addProductModal ? '' : 'hidden'
        } fixed top-0 left-0 z-30 w-full h-full bg-black opacity-50`}
      />
      {/* End Black Overlay */}

      {/* Modal Start */}
      <div
        className={`${
          data.addProductModal ? '' : 'hidden'
        } overflow-auto fixed inset-0 z-30 flex justify-center`}
      >
        <div className="bg-white w-11/12 md:w-3/6 shadow-lg flex flex-col items-center space-y-4 px-4 py-4 md:px-8 overflow-auto">
          <div className="flex items-center justify-between w-full pt-4">
            <span className="text-left font-semibold text-2xl tracking-wider">
              Add Product
            </span>
            {/* Close Modal */}
            <span
              style={{ background: '#303031' }}
              onClick={(e) =>
                dispatch({ type: 'addProductModal', payload: false })
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
          {fData.error ? alert(fData.error as string, 'red') : ''}
          {fData.success ? alert('Product added successfully!', 'green') : ''}
          <form className="w-full" onSubmit={(e) => submitForm(e)}>
            <div className="flex space-x-1 py-4">
              <div className="w-1/2 flex flex-col space-y-1 space-x-1">
                <label htmlFor="name">Product Name *</label>
                <input
                  value={fData.pName}
                  onChange={(e) =>
                    setFdata({
                      ...fData,
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
                  value={fData.pPrice}
                  onChange={(e) =>
                    setFdata({
                      ...fData,
                      error: false,
                      success: false,
                      pPrice: e.target.value,
                    })
                  }
                  type="number"
                  onWheel={handleWheel}
                  className="px-4 py-2 border focus:outline-none"
                  id="price"
                />
              </div>
            </div>
            <div className="flex space-x-1 py-4">
              <div className="w-1/2 space-y-1 flex flex-col">
                <label htmlFor="description">Product Description *</label>
                <textarea
                  value={fData.pDescription}
                  onChange={(e) =>
                    setFdata({
                      ...fData,
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
              <div className="w-1/2 space-y-1 flex flex-col">
                <div className="flex flex-row justify-between">
                  <label htmlFor="image">Product Images *</label>
                  <span className="text-gray-600 text-xs">
                    Must need 2 images
                  </span>
                </div>
                <input
                  onChange={(e) =>
                    setFdata({
                      ...fData,
                      error: false,
                      success: false,
                      pImage: Array.from(e.target.files || []),
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
                  value={fData.pModel}
                  onChange={(e) =>
                    setFdata({
                      ...fData,
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
                  value={fData.pYear}
                  onChange={(e) =>
                    setFdata({
                      ...fData,
                      error: false,
                      success: false,
                      pYear: e.target.value,
                    })
                  }
                  type="number"
                  onWheel={handleWheel}
                  className="px-4 py-2 border focus:outline-none"
                  id="year"
                />
              </div>
            </div>
            <div className="flex space-x-1 py-4">
              <div className="w-1/2 flex flex-col space-y-1 space-x-1">
                <label htmlFor="transmission">Product Transmission *</label>
                <select
                  value={fData.pTransmission}
                  onChange={(e) =>
                    setFdata({
                      ...fData,
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
                  value={fData.pDriven}
                  onChange={(e) =>
                    setFdata({
                      ...fData,
                      error: false,
                      success: false,
                      pDriven: e.target.value,
                    })
                  }
                  type="number"
                  onWheel={handleWheel}
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
                  value={fData.pOwners}
                  onChange={(e) =>
                    setFdata({
                      ...fData,
                      error: false,
                      success: false,
                      pOwners: e.target.value,
                    })
                  }
                  className="px-4 py-2 border focus:outline-none"
                  type="number"
                  onWheel={handleWheel}
                  id="owners"
                />
              </div>
              <div className="w-1/2 flex flex-col space-y-1 space-x-1">
                <label htmlFor="insurance">Product Insurance *</label>
                <select
                  value={fData.pInsurance}
                  onChange={(e) =>
                    setFdata({
                      ...fData,
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
                  value={fData.pFuel}
                  onChange={(e) =>
                    setFdata({
                      ...fData,
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
                  value={fData.pColour}
                  onChange={(e) =>
                    setFdata({
                      ...fData,
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
                  value={fData.pEngine}
                  onChange={(e) =>
                    setFdata({
                      ...fData,
                      error: false,
                      success: false,
                      pEngine: e.target.value,
                    })
                  }
                  className="px-4 py-2 border focus:outline-none"
                  type="number"
                  onWheel={handleWheel}
                  id="engine"
                />
              </div>
              <div className="w-1/2 flex flex-col space-y-1 space-x-1">
                <label htmlFor="power">Product Power (in bhp) *</label>
                <input
                  value={fData.pPower}
                  onChange={(e) =>
                    setFdata({
                      ...fData,
                      error: false,
                      success: false,
                      pPower: e.target.value,
                    })
                  }
                  type="number"
                  onWheel={handleWheel}
                  className="px-4 py-2 border focus:outline-none"
                  id="power"
                />
              </div>
            </div>
            <div className="flex space-x-1 py-4">
              <div className="w-1/2 flex flex-col space-y-1 space-x-1">
                <label htmlFor="torque">Product Torque (in Nm) *</label>
                <input
                  value={fData.pTorque}
                  onChange={(e) =>
                    setFdata({
                      ...fData,
                      error: false,
                      success: false,
                      pTorque: e.target.value,
                    })
                  }
                  type="number"
                  onWheel={handleWheel}
                  className="px-4 py-2 border focus:outline-none"
                  id="torque"
                />
              </div>
              <div className="w-1/2 flex flex-col space-y-1 space-x-1">
                <label htmlFor="code">Product Code *</label>
                <input
                  value={fData.pProductCode}
                  onChange={(e) =>
                    setFdata({
                      ...fData,
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
                  value={fData.pTag}
                  onChange={(e) =>
                    setFdata({
                      ...fData,
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
                  value={fData.pRearParkSensor}
                  onChange={(e) =>
                    setFdata({
                      ...fData,
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
            {/* Most Important part for uploading multiple image */}
            <div className="flex space-x-1 py-4">
              <div className="w-1/2 flex flex-col space-y-1">
                <label htmlFor="status">Product Status *</label>
                <select
                  value={fData.pStatus}
                  onChange={(e) =>
                    setFdata({
                      ...fData,
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
                  onChange={(e) => {
                    const selectedCategory = categories.find(
                      (cat) => cat._id === e.target.value
                    );
                    setFdata({
                      ...fData,
                      error: false,
                      success: false,
                      pCategory: selectedCategory || null,
                    });
                  }}
                  name="category"
                  className="px-4 py-2 border focus:outline-none"
                  id="category"
                  value={fData.pCategory ? fData.pCategory._id : ''}
                >
                  <option disabled value="">
                    Select a category
                  </option>
                  {categories.length > 0
                    ? categories.map(function (elem) {
                        return (
                          <option value={elem._id} key={elem._id}>
                            {elem.cName}
                          </option>
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
                  value={fData.pQuantity}
                  onChange={(e) =>
                    setFdata({
                      ...fData,
                      error: false,
                      success: false,
                      pQuantity: e.target.value,
                    })
                  }
                  type="number"
                  onWheel={handleWheel}
                  className="px-4 py-2 border focus:outline-none"
                  id="quantity"
                />
              </div>
              <div className="w-1/2 flex flex-col space-y-1">
                <label htmlFor="offer">Product Offfer (%) *</label>
                <input
                  value={fData.pOffer}
                  onChange={(e) =>
                    setFdata({
                      ...fData,
                      error: false,
                      success: false,
                      pOffer: e.target.value,
                    })
                  }
                  type="number"
                  onWheel={handleWheel}
                  className="px-4 py-2 border focus:outline-none"
                  id="offer"
                />
              </div>
            </div>
            <div className="flex space-x-1 py-4">
              <div className="w-1/2 flex flex-col space-y-1 space-x-1">
                <label htmlFor="airbag">AirBags *</label>
                <input
                  value={fData.pAirbags}
                  onChange={(e) =>
                    setFdata({
                      ...fData,
                      error: false,
                      success: false,
                      pAirbags: e.target.value,
                    })
                  }
                  className="px-4 py-2 border focus:outline-none"
                  type="number"
                  onWheel={handleWheel}
                  id="airbag"
                />
              </div>
              <div className="w-1/2 flex flex-col space-y-1 space-x-1">
                <label htmlFor="abs">ABS *</label>
                <select
                  value={fData.pAbs}
                  onChange={(e) =>
                    setFdata({
                      ...fData,
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
                  value={fData.pCruiseControl}
                  onChange={(e) =>
                    setFdata({
                      ...fData,
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
                  value={fData.pAdjustableSteer}
                  onChange={(e) =>
                    setFdata({
                      ...fData,
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
                  value={fData.pSunroof}
                  onChange={(e) =>
                    setFdata({
                      ...fData,
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
                Create product
              </button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

const AddProductModal: React.FC = () => {
  const [allCat, setAllCat] = useState<Category[]>([]);

  useEffect(() => {
    fetchCategoryData();
  }, []);

  const fetchCategoryData = async () => {
    let responseData = await getAllCategory();
    if (responseData && responseData.Categories) {
      setAllCat(responseData.Categories);
    }
  };

  return (
    <Fragment>
      <AddProductDetail categories={allCat} />
    </Fragment>
  );
};

export default AddProductModal;
