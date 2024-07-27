import React, { Fragment, useContext, useState, useEffect } from 'react';
import { HomeContext } from './HomeContext';
import { HomeContextProps } from './types';
import { getAllCategory } from '../../admin/categories/FetchApi';
import './style.css';
import Image from 'next/image';

const apiURL = process.env.NEXT_PUBLIC_API_URL as string;

interface Category {
  _id: string;
  cName: string;
  cImage: string;
}

interface Product {
  _id: string;
  pName: string;
  pDescription: string;
  pImage: string[];
  pStatus: string;
  pCategory: string;
  pQuantity: number;
  pPrice: number;
  pOffer: number;
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
  pAbs: boolean;
  pAirbags: boolean;
  pCruiseControl: boolean;
  pAdjustableSteer: boolean;
  pRearParkSensor: boolean;
  pSunroof: boolean;
}

const CategoryList: React.FC = () => {
  const { data } = useContext(HomeContext) as HomeContextProps;
  const [categories, setCategories] = useState<Category[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, []);
  
  const fetchData = async () => {
    try {
      const responseData = await getAllCategory();
      if (responseData) {
        setCategories(responseData.Categories); // Directly set the categories if it's an array
      } else {
        console.error('Expected an array but got:', responseData);
      }
    } catch (error) {
      console.log(error);
    }
  };
  

  if (categories.length === 0) {
    return <div>Loading...</div>; // or any other loading indicator
  }

  return (
    <div className={`my-4`}>
      <hr />
      <div className="py-1 grid grid-cols-2 lg:grid-cols-5">
        {categories.map((item, index) => (
          <Fragment key={index}>
            <span
              // href={`/products/category/${item._id}`}
              className="col-span-1 mx-6 flex flex-col items-center justify-center space-y-2 cursor-pointer"
            >
              <Image
                    loading='lazy'
                style={{
                  border: `2px solid ${hoveredIndex === index ? '#f71979' : '#fff'}`,
                  borderRadius: '0.5rem',
                }}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
                src={`${apiURL}/uploads/categories/${item.cImage}`}
                alt="pic"
                width={100}
                height={100}
              />
            </span>
          </Fragment>
        ))}
      </div>
    </div>
  );
};

interface CategoryPopupProps {
  allCategories: Category[];
  onClose: () => void;
}

const CategoryPopup: React.FC<CategoryPopupProps> = ({
  allCategories,
  onClose,
}) => (
  <div className="popup-container">
    <div className="popup-card">
      <button onClick={onClose} className="close-button">
        Close
      </button>
      <div className="categories-list">
        {allCategories.map((category, index) => (
          <div key={index}>{category.cName}</div>
        ))}
      </div>
    </div>
  </div>
);

const ProductCategoryDropdown: React.FC = () => {
  const { data } = useContext(HomeContext) as HomeContextProps;
  const [showPopup, setShowPopup] = useState(false);
  const [allCategories, setAllCategories] = useState<Category[]>([]);

  return (
    <Fragment>
      <CategoryList />
      {showPopup && (
        <CategoryPopup
          allCategories={allCategories}
          onClose={() => setShowPopup(false)}
        />
      )}
    </Fragment>
  );
};

export default ProductCategoryDropdown;
