import React, { Fragment, useState, useEffect, useContext } from 'react';
import { getAllProduct } from '../../admin/products/FetchApi';
import { HomeContext } from './HomeContext';
import { isWishReq, unWishReq, isWish } from './Mixins';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import './style.css';
import Badge from './Badge';
import Link from 'next/link';
import Image from 'next/image';

const apiURL = process.env.NEXT_PUBLIC_API_URL as string;

const SingleProduct: React.FC = () => {
  const { data, dispatch } = useContext(HomeContext);
  const { products } = data;

  const [wList, setWlist] = useState<string[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWlist(JSON.parse(localStorage.getItem('wishList') || '[]'));
    }
  }, []);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    dispatch({ type: 'loading', payload: true });
    try {
      let responseData = await getAllProduct();
      setTimeout(() => {
        if (responseData && responseData.Products) {
          dispatch({ type: 'setProducts', payload: responseData.Products });
          dispatch({ type: 'loading', payload: false });
        }
      }, 500);
    } catch (error) {
      console.log(error);
    }
  };

  if (data.loading) {
    return (
      <div className="col-span-2 md:col-span-3 lg:col-span-4 flex items-center justify-center py-24">
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
      {products && products.length > 0 ? (
        <div className="relative lg:grid lg:px-12 py-8  md:flex md:flex-col lg:grid-cols-4">
          {products.slice(0, 4).map((item, index) => {
            return (
              <Fragment key={index}>
                <div className="relative my-4 col-span-1 border border-gray-300 rounded-md p-4 mx-2 shadow-lg space-y-1">
                  {item.pImages && item.pImages.length > 0 ? (
                    <Swiper
                    navigation
                    pagination={{ type: "custom"}}
                    autoplay={false}
                    loop={true}
                    modules={[Autoplay, Navigation, Pagination]}
                  >
                    {item.pImages.map((image: string, index: number) => (
                      <SwiperSlide key={index}>
                        <div
                          className="relative w-full"
                          style={{
                            paddingBottom: "66.66%",
                          }}
                        >
                          <Link
                            className="cursor-pointer"
                            href={`/products/${item.pName.replace(/ /g, '-')}/${item._id}`}
                          >
                            <Image
                            loading='lazy'
                               className="object-cover rounded-md absolute top-0 left-0 w-full h-full"
                               src={`${apiURL}/uploads/products/${image}`}
                               alt={item.pName}
                               fill
                               
                             />
                          </Link>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  ) : (
                    <div>No images available</div>
                  )}
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-gray-600 truncate">{item.pName}</span>
                    <div className="flex items-center space-x-1">
                      <span>
                        <svg
                          style={{ fill: '#f71979' }}
                          className="bi bi-eye-fill w-4 h-4 fill-current "
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
                    {/* WhisList Logic  */}
                    <div className="">
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
                    {/* WhisList Logic End */}
                  </div>
                  <div className="flex flex-row justify-between">
                    <div>Rs. {item.pPrice}.00</div>
                    <Badge pTag={item.pTag} />
                  </div>
                </div>
              </Fragment>
            );
          })}
        </div>
      ) : (
        <div className="col-span-2 md:col-span-3 lg:col-span-4 flex items-center justify-center py-24 text-2xl">
          No product found
        </div>
      )}
    </Fragment>
  );
};

export default SingleProduct;
