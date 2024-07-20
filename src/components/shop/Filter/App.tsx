'use client';
import { useState, useContext, useEffect, Fragment, ChangeEvent } from 'react';
import Navigation from './Navigation/Nav';
import { isWishReq, unWishReq, isWish } from '../home/Mixins';
import Sidebar from './Sidebar/Sidebar';
import './index.css';
import { Carousel } from 'react-responsive-carousel';
import Badge from '../home/Badge';
import Image from 'next/image';
import Link from 'next/link';
import '../home/style.css';
import { LayoutContext } from '../layout/layoutContext';
const apiURL = process.env.NEXT_PUBLIC_API_URL as string;

interface Product {
  _id: string;
  pName: string;
  pCategory: { _id: string };
  pPrice: number;
  pImages: string[];
  pViews: number;
  pDriven: number;
  pFuel: string;
  pTransmission: string;
  pYear: number;
  pTag: string;
}

interface Category {
  _id: string;
  cName: string;
}

interface AllProductsProps {
  initialProducts: Product[];
  initialCategories: Category[];
}

const AllProducts = ({
  initialProducts,
  initialCategories,
}: AllProductsProps) => {
  const { state, dispatch } = useContext(LayoutContext);
  const [wList, setWlist] = useState<string[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWlist(JSON.parse(localStorage.getItem('wishList') || '[]'));
    }
  }, []);

  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<string | null>(null);
  const [query, setQuery] = useState<string>('');
  // Initialize state for screen size
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsSmallScreen(window.innerWidth <= 768);

      // Function to update screen size state
      const updateScreenSize = () => {
        setIsSmallScreen(window.innerWidth <= 768);
      };

      // Add event listener when component mounts
      window.addEventListener('resize', updateScreenSize);
      return () => {
        // Clean up event listener when component unmounts
        window.removeEventListener('resize', updateScreenSize);
      };
    }
  }, []); // Empty dependency array ensures this effect runs only once after initial render
  
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === 'category') {
      setSelectedCategory(value);
    } else if (name === 'price') {
      setPriceRange(value);
    }
  };

  const filteredData = (
    products: any[],
    selectedCategory: string | null,
    priceRange: string | null,
    query: string
  ) => {
    let filteredProducts = products;

    if (query) {
      filteredProducts = filteredProducts.filter((product) =>
        product.pName.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (selectedCategory && selectedCategory !== 'all') {
      filteredProducts = filteredProducts.filter(
        (product) => product.pCategory._id === selectedCategory // Ensure comparison with the correct field
      );
    }

    if (priceRange && priceRange !== 'all') {
      const [min, max] = priceRange.split('-');
      filteredProducts = filteredProducts.filter((product) => {
        const price = product.pPrice;
        return (
          (!min || price >= parseInt(min)) && (!max || price <= parseInt(max))
        );
      });
    }

    return filteredProducts.map((item, index) => (
      <Fragment key={index}>
        <div className="relative my-4 col-span-1 border border-gray-300 rounded-md p-4 mx-2 shadow-lg space-y-1">
          {item.pImages && item.pImages.length > 0 ? (
            <Carousel
              showArrows={true}
              showStatus={false}
              showIndicators={false}
              showThumbs={false}
              dynamicHeight={true}
              autoPlay={false}
              interval={2000}
              infiniteLoop={true}
              emulateTouch={true}
            >
              {item.pImages.map((image: string, Imgindex: number) => (
                <Link
                  className="cursor-pointer"
                  key={Imgindex}
                  href={`/products/${item.pName.replace(/ /g, '-')}/${item._id}`}
                >
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      paddingBottom: '66.66%',
                    }}
                  >
                    <Image
                      className="object-cover rounded-md"
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                      }}
                      src={`${apiURL}/uploads/products/${image}`}
                      alt={item.pName}
                      fill
                      priority={true}
                    />
                  </div>
                </Link>
              ))}
            </Carousel>
          ) : (
            <div>No images available</div>
          )}
          <div className="flex items-center justify-between mt-2">
            <span className="text-gray-600 truncate">{item.pName}</span>
            <div className="flex items-center space-x-1">
              <span>
                <svg
                  style={{ fill: '#f71979' }}
                  className="bi bi-eye-fill w-4 h-4 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="#f71979"
                  viewBox="0 0 16 16"
                >
                  <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                  <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
                </svg>
              </span>
              <span className="text-gray-700">{item.pViews}</span>
            </div>
          </div>
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row text-xs">
              <div className="mr-2">{item.pDriven} KM | </div>
              <div className="mr-2">{item.pFuel} | </div>
              <div className="mr-2">{item.pTransmission} |</div>
              <div className="mr-2">{item.pYear}</div>
            </div>
            <div>
              <svg
                onClick={(e) =>
                  isWishReq(
                    e as unknown as React.MouseEvent<HTMLElement>,
                    item._id,
                    setWlist
                  )
                }
                className={`${
                  isWish(item._id, wList) && 'hidden'
                } w-5 h-5 md:w-6 md:h-6 cursor-pointer transition-all duration-300 ease-in`}
                fill="none"
                stroke="#f71979"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <svg
                onClick={(e) =>
                  unWishReq(
                    e as unknown as React.MouseEvent<HTMLElement>,
                    item._id,
                    setWlist
                  )
                }
                className={`${
                  !isWish(item._id, wList) && 'hidden'
                } w-5 h-5 md:w-6 md:h-6 cursor-pointer transition-all duration-300 ease-in`}
                fill="#f71979"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          <div className="flex flex-row justify-between">
            <div>Rs. {item.pPrice}.00</div>
            <Badge pTag={item.pTag} />
          </div>
        </div>
      </Fragment>
    ));
  };

  return (
    <Fragment>
      {isSmallScreen ? (
        <div className="flex flex-col justify-center items-center">
          <Sidebar handleChange={handleChange} categories={categories} />
          <Navigation query={query} handleInputChange={handleInputChange} />
          <h1 className="text-left mt-4 font-semibold">
            Buy Certified Pre-Owned Cars
          </h1>
          <div className="flex flex-col justify-center items-center">
            {products && products.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 relative">
                {filteredData(products, selectedCategory, priceRange, query)}
              </div>
            ) : (
              <div className="col-span-2 md:col-span-3 lg:col-span-4 flex items-center justify-center py-24 text-2xl">
                No product found
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-row justify-center">
          <div className="pr-4">
            <Sidebar handleChange={handleChange} categories={categories} />
          </div>
          <div className="flex flex-col justify-center items-center w-3/4">
            <Navigation query={query} handleInputChange={handleInputChange} />
            <h1 className="text-left mt-4 font-semibold">
              Buy Certified Pre-Owned Cars
            </h1>
            {products && products.length > 0 ? (
              <div className="grid grid-cols-3 relative">
                {filteredData(products, selectedCategory, priceRange, query)}
              </div>
            ) : (
              <div className="col-span-2 md:col-span-3 lg:col-span-4 flex items-center justify-center py-24 text-2xl">
                No product found
              </div>
            )}
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default AllProducts;
