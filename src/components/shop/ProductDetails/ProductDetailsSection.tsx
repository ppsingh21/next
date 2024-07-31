'use client';
import React, {
  Fragment,
  useState,
  useEffect,
  useContext,
  ChangeEvent,
} from 'react';
import ProductDetailsContext from './ProductDetailsContext';
import Submenu from './Submenu';
import { postCarFormData } from './FetchApi';
import { cartListProduct } from '../partials/FetchApi'; // Importing the required function from partials directory
import { cartList } from './Mixins';
import './style.css';
import Badge from '../home/Badge';
import { isWishReq, unWishReq, isWish } from '../home/Mixins';
import EmiCalculator from '../home/EmiCal';
import inspection from '../home/inspection.png';
import warranty1 from '../home/warranty1.png';
import moneyback from '../home/moneyback.png';
import addedbenefits from '../home/addedbenifits.png';
import abs from './abs.png';
import airbag from './airbag.png';
import steer from './steer.png';
import rear from './rear.png';
import cruise from './cruise.png';
import sunroof from './sunroof.png';
import Link from 'next/link';
import Image from 'next/image';
import { LayoutContext } from '../layout/layoutContext';
import DiscountPopup from './DiscountPopup';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

declare global {
  interface Window {
    fbq: any;
  }
}

interface Product {
  _id: string;
  pName: string;
  pImages: string[];
  pDriven: number;
  pFuel: string;
  pTransmission: string;
  pOwners: number;
  pPrice: number;
  pModel: string;
  pYear: number;
  pInsurance: string;
  pProductCode: string;
  pPower: number;
  pEngine: number;
  pTorque: number;
  pAbs: string;
  pAirbags: string;
  pCruiseControl: string;
  pAdjustableSteer: string;
  pRearParkSensor: string;
  pSunroof: string;
  pDescription: string;
  pCategory: {
    _id: string;
    cName: string;
  };
  pTag: string;
  pColour: string;
  pOffer: number;
}

const apiURL = process.env.NEXT_PUBLIC_API_URL as string;

const ProductDetailsSection = ({
  initialProductData,
}: {
  initialProductData: Product;
}) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    // This code will run only on the client side
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };

    handleResize(); // Check the screen size on initial render
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array ensures this effect runs only once after initial render

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const colorSwitchInterval = setInterval(() => {
      setIsHovered((prev) => !prev);
    }, 150); // Interval for color switching effect

    return () => clearInterval(colorSwitchInterval);
  }, []);

  const buttonStyle: React.CSSProperties = {
    background: isHovered ? '#227c4fd6' : '#00d46b', // Switch effect between pink and purple
    cursor: 'pointer',
    color: 'white',
    textAlign: 'center',
    transition: 'background 0.5s', // Smooth transition between colors
  };

  const { state, dispatch } = useContext(ProductDetailsContext);
  const { state: layoutData, dispatch: layoutDispatch } =
    useContext(LayoutContext);

  const sProduct = initialProductData;
  const [pImages, setPimages] = useState<string[] | null>(sProduct.pImages);
  const [isInput, setInput] = useState(false);
  const [booking, setBooking] = useState('');
  const [interestText, setInterestText] = useState('');
  const [phone, setPhone] = useState('');
  const [errorName, setErrorName] = useState('');
  const [errorPhone, setErrorPhone] = useState('');

  /* WhisList State */
  const [wList, setWlist] = useState<string[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWlist(JSON.parse(localStorage.getItem('wishList') || '[]'));
    }
  }, []);

  useEffect(() => {
    layoutDispatch({
      type: 'singleProductDetail',
      payload: initialProductData,
    });
    layoutDispatch({ type: 'inCart', payload: cartList() });
    const fetchCartProduct = async () => {
      try {
        const responseData = await cartListProduct();
        if (responseData && responseData.Products) {
          layoutDispatch({
            type: 'cartProduct',
            payload: responseData.Products,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchCartProduct();
  }, [initialProductData, layoutDispatch]);

  const handleContact = async (booking: string, Name: string) => {
    // Reset previous error messages
    setErrorName('');
    setErrorPhone('');

    // Perform validation checks
    let hasError = false;
    if (interestText.trim().length === 0) {
      setErrorName('Name cannot be empty');
      hasError = true;
    }
    if (phone.trim().length < 10) {
      setErrorPhone('Phone number must be at least 10 digits');
      hasError = true;
    }

    // If any error, stop further processing
    if (hasError) return;

    const link = typeof window !== 'undefined' ? window.location.href : '';
    // If validation passes, continue with the contact
    await postCarFormData(link, interestText, phone, booking, Name);
    setInput(false);
    // Reset state variables to their initial values
    if (booking === 'ENQUIRY') {
      handleEnquiry(Name);
    } else {
      window.open(
        `https://appt.link/meet-with-pran-motors-iSjzdF1o/car-test-drive`,
        '_blank'
      );
    }
    setInterestText('');
    setPhone('');
  };

  const handleEnquireNowClick = () => {
    setBooking('ENQUIRY');
    setInput(true);
    if (window.fbq) {
      // Add Facebook Pixel tracking for Enquiry
      window.fbq('track', 'Lead', {
        event_category: 'Enquiry',
        event_label: 'Enquire Now Button Click',
      });
    }
    console.log('Enquiry Now Clicked');
  };

  const handleTestDriveClick = () => {
    setBooking('TEST DRIVE');
    setInput(true);
    if (window.fbq) {
      // Add Facebook Pixel tracking for Book Test Drive
      window.fbq('track', 'Schedule', {
        event_category: 'Book Test Drive',
        event_label: 'Book Test Drive Button Click',
      });
    }
    console.log('Test Drive Booked');
  };

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;
    // Remove non-digit characters
    inputValue = inputValue.replace(/\D/g, '');
    // Limit the input to 10 digits
    inputValue = inputValue.slice(0, 10);
    // Set phone number
    setPhone(inputValue);
  };

  const handleEnquiry = (productName: string) => {
    const currentPageLink =
      typeof window !== 'undefined' ? window.location.href : '';
    const message = encodeURIComponent(
      `Hey Pran Motors, I have an enquiry for ${productName} at ${currentPageLink}`
    );
    if (typeof window !== 'undefined') {
      window.open(`https://wa.me/+919900204243?text=${message}`, '_blank');
    }
  };

  const calculateEMI = (price: number): string => {
    const principal = price * 0.9; // 90% of the price
    const annualInterestRate = 12.5; // 12% annual interest rate
    const tenureYears = 5; // 5 years of tenure

    const monthlyInterestRate = annualInterestRate / 12 / 100;
    const numberOfPayments = tenureYears * 12;

    const emi =
      (principal *
        monthlyInterestRate *
        Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
      (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

    return emi.toFixed(2); // Return EMI rounded to 2 decimal places
  };

  const customRenderIndicator = (
    onClickHandler: (e: React.MouseEvent | React.KeyboardEvent) => void,
    isSelected: boolean,
    index: number,
    label: string
  ) => {
    if (index < 8) {
      // Limit to 8 dots
      return (
        <li
          className={`dot ${isSelected ? 'selected' : ''}`}
          onClick={onClickHandler}
          key={index}
          aria-label={`${label} ${index + 1}`}
        />
      );
    }
    return null;
  };

  if (state.loading) {
    return (
      <div className="col-span-2 md:col-span-3 lg:col-span-4 flex items-center justify-center h-screen">
        <svg
          className="w-12 h-12 animate-spin text-gray-600"
          fill="none"
          stroke="#d20062"
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
  } else if (!sProduct) {
    return <div>No product</div>;
  }

  return (
    <Fragment>
      <DiscountPopup
        value={{
          pOffer: sProduct.pOffer,
          pPrice: sProduct.pPrice,
          productId: sProduct._id
        }}
      />
      {isSmallScreen ? (
        <section className="relative m-4 md:hidden block">
          <Link
            className="cursor-pointer absolute z-40 -top-2 left-1"
            href={'/all-products'}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              className="bi bi-arrow-left-circle-fill"
              viewBox="0 0 16 16"
            >
              <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
            </svg>
          </Link>
          <div className="grid mt-4 grid-cols-2 ">
            <div className="py-4 col-span-2 ">
              {pImages && pImages.length > 0 ? (
                <div className="slider">
                  <Swiper
                    navigation={{
                      prevEl: `.slider__prev`,
                      nextEl: `.slider__next`,
                    }}
                    pagination={{ type: 'custom' }}
                    autoplay={false}
                    loop={true}
                    modules={[Autoplay, Navigation, Pagination]}
                  >
                    {pImages.map((image, index) => (
                      <SwiperSlide key={index}>
                        <div className="overflow-hidden" key={index}>
                          <Image
                            loading="lazy"
                            width={100}
                            height={100}
                            id="product-image"
                            className="w-full object-cover object-center rounded-md aspect-[4/3]"
                            src={`${apiURL}/uploads/products/${image}`}
                            alt={sProduct.pName}
                          />
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  <div className={`slider__prev`}></div>
                  <div className={`slider__next`}></div>
                </div>
              ) : (
                <div>No images available</div>
              )}
            </div>

            <div className="col-span-2 ">
              <div>
                <div className="flex flex-col leading-8 p-4 my-4 border border-gray-300 rounded-lg shadow-lg">
                  <div className="flex flex-row justify-between items-center">
                    <h1 className="font-semibold tracking-wider text-pran-red">
                      {sProduct.pName}
                    </h1>
                    {/* WhisList Logic  */}
                    <div className="">
                      <svg
                        onClick={(e) =>
                          isWishReq(
                            e as unknown as React.MouseEvent<HTMLElement>,
                            sProduct._id,
                            setWlist
                          )
                        }
                        className={`${
                          isWish(sProduct._id, wList) && 'hidden'
                        } w-5 h-5 cursor-pointer transition-all duration-300 ease-in`}
                        xmlns="http://www.w3.org/2000/svg"
                        width="29"
                        height="25"
                        viewBox="0 0 29 25"
                        fill="none"
                      >
                        <path
                          d="M20.9977 0.178101C18.3761 0.178101 16.0808 1.30544 14.65 3.21101C13.2193 1.30544 10.924 0.178101 8.30237 0.178101C6.21555 0.180453 4.21487 1.01048 2.73926 2.48609C1.26366 3.96169 0.433627 5.96237 0.431274 8.04919C0.431274 16.9359 13.6077 24.1291 14.1689 24.4261C14.3168 24.5057 14.4821 24.5473 14.65 24.5473C14.818 24.5473 14.9833 24.5057 15.1312 24.4261C15.6923 24.1291 28.8688 16.9359 28.8688 8.04919C28.8664 5.96237 28.0364 3.96169 26.5608 2.48609C25.0852 1.01048 23.0845 0.180453 20.9977 0.178101ZM14.65 22.3695C12.3319 21.0187 2.46252 14.8653 2.46252 8.04919C2.46454 6.50099 3.08045 5.01677 4.1752 3.92203C5.26995 2.82728 6.75416 2.21137 8.30237 2.20935C10.7716 2.20935 12.8448 3.52458 13.7106 5.63708C13.7871 5.82336 13.9173 5.98269 14.0845 6.09481C14.2518 6.20694 14.4486 6.26681 14.65 6.26681C14.8514 6.26681 15.0482 6.20694 15.2155 6.09481C15.3828 5.98269 15.513 5.82336 15.5895 5.63708C16.4553 3.52078 18.5284 2.20935 20.9977 2.20935C22.5459 2.21137 24.0301 2.82728 25.1248 3.92203C26.2196 5.01677 26.8355 6.50099 26.8375 8.04919C26.8375 14.8551 16.9656 21.0175 14.65 22.3695Z"
                          fill="black"
                        />
                      </svg>

                      <svg
                        onClick={(e) =>
                          unWishReq(
                            e as unknown as React.MouseEvent<HTMLElement>,
                            sProduct._id,
                            setWlist
                          )
                        }
                        className={`${
                          !isWish(sProduct._id, wList) && 'hidden'
                        } w-5 h-5 cursor-pointer transition-all duration-300 ease-in`}
                        xmlns="http://www.w3.org/2000/svg"
                        width="27"
                        height="23"
                        viewBox="0 0 27 23"
                        fill="none"
                      >
                        <path
                          opacity="0.2"
                          d="M26.8531 7.04919C26.8531 15.4281 13.65 22.5375 13.65 22.5375C13.65 22.5375 0.446899 15.4281 0.446899 7.04919C0.446899 5.23101 1.16917 3.4873 2.45482 2.20165C3.74047 0.915996 5.48418 0.193726 7.30237 0.193726C10.1702 0.193726 12.6268 1.75652 13.65 4.25623C14.6733 1.75652 17.1298 0.193726 19.9977 0.193726C21.8159 0.193726 23.5596 0.915996 24.8452 2.20165C26.1309 3.4873 26.8531 5.23101 26.8531 7.04919Z"
                          fill="black"
                        />
                      </svg>
                    </div>
                    {/* WhisList Logic End */}
                  </div>
                  <div className="flex flex-row text-xs font-semibold">
                    <div className="mr-2">{sProduct.pDriven} km</div>
                    <div className="mr-2">{sProduct.pTransmission}</div>
                    <div className="mr-2">{sProduct.pFuel}</div>
                    <div className="mr-2">{sProduct.pOwners}st Owner</div>
                  </div>
                  <div
                    style={{ fontSize: '10px' }}
                    className="flex flex-col justify-between font-semibold"
                  >
                    <div>One Year Warranty + PRAN Member Benefits</div>
                    <div className="leading-loose flex flex-row justify-between items-center">
                      <div>PRAN Motors, Sarjapura Road </div>
                      <Badge pTag={sProduct.pTag} />
                    </div>
                  </div>
                  <div className="flex flex-row justify-between">
                    <div className="flex flex-col justify-center leading-loose">
                      <div className="text-lg font-semibold">
                        ₹ {calculateEMI(sProduct.pPrice)}/mo
                      </div>
                      <div className="text-xs-custom">On 10% down payment</div>
                      <div className="font-semibold text-xs-custom">
                        CHECK ELIGIBLITY!
                      </div>
                    </div>
                    <div className="flex flex-col justify-center">
                      <div className="text-xl font-semibold">
                        ₹ {sProduct.pPrice / 100000} Lakh
                      </div>
                      <div className="text-xs text-right">
                        {sProduct.pOffer}% off
                      </div>
                      <div className="line-through text-xs text-right">
                        ₹{' '}
                        {(sProduct.pPrice * 100) /
                          (100 - sProduct.pOffer) /
                          100000}{' '}
                        Lakh
                      </div>
                    </div>
                  </div>

                  {/* <div className="flex justify-between items-center">
                <div className="flex justify-between items-center">
                <span style={{ color: '#d20062' }} className="text-xl font-bold tracking-wider">
                  <p>Rs. {sProduct.pPrice}.00</p>
                  <p className="text-xs font-normal text-gray-600">Fixed on road price</p>
                </span>
              </div>
              </div> */}
                  {!isInput && (
                    <div className="flex flex-row font-bold justify-between text-sm text-white my-2">
                      <div
                        onClick={handleEnquireNowClick}
                        id="bg-opacity-80"
                        style={{ transition: 'opacity 300ms' }}
                        className="cursor-pointer mr-2 flex-1 items-center rounded-md flex flex-col py-2"
                      >
                        <p>ENQUIRE NOW</p>
                        <p className="text-xs font-normal">100% refundable</p>
                      </div>
                      <div
                        onClick={handleTestDriveClick}
                        id="book"
                        style={{
                          ...buttonStyle,
                          animation: isHovered ? 'blink 1s infinite' : 'none', // Apply blinking animation when hovered
                        }}
                        className="cursor-pointer text-sm flex-col ml-2 px-3 justify-center items-center rounded-md flex py-2"
                      >
                        <p>BOOK TEST</p>
                        <p>DRIVE</p>
                      </div>
                    </div>
                  )}
                  {isInput && (
                    <div className="flex flex-col">
                      {errorName && (
                        <p
                          style={{
                            color: 'red',
                            fontSize: '12px',
                            marginBottom: '5px',
                          }}
                        >
                          {errorName}
                        </p>
                      )}
                      <input
                        style={{
                          marginBottom: '10px',
                          borderWidth: '1px',
                          borderRadius: '0px',
                          borderColor: '#5755FE',
                          padding: '3px',
                          opacity: '50%',
                        }}
                        type="text"
                        height="50px"
                        width="200px"
                        placeholder="Enter your name"
                        value={interestText}
                        onChange={(e) => setInterestText(e.target.value)}
                      />
                      {errorPhone && (
                        <p
                          style={{
                            color: 'red',
                            fontSize: '12px',
                            marginBottom: '5px',
                          }}
                        >
                          {errorPhone}
                        </p>
                      )}
                      <input
                        style={{
                          marginBottom: '10px',
                          borderWidth: '1px',
                          borderRadius: '0px',
                          borderColor: '#5755FE',
                          padding: '3px',
                          opacity: '50%',
                        }}
                        type="text"
                        height="50px"
                        width="200px"
                        value={phone}
                        onChange={handlePhoneChange}
                        maxLength={10}
                        placeholder="Enter your number"
                      />
                      <button
                        style={{ background: '#5755FE' }}
                        className="px-4 py-2 text-white text-center uppercase opacity-100 rounded-md cursor-pointer"
                        onClick={() => handleContact(booking, sProduct.pName)}
                      >
                        BOOK!
                      </button>
                    </div>
                  )}
                  {/* {showConfirmation && (
        <div onClick={() => handleWhatsApp(sProduct.pName)} style={{ background: "#5755FE" }} className="px-4 py-2 text-white text-center uppercase opacity-100 rounded-md cursor-pointer">
          Connect with us on Whatsapp
        </div>
      )} */}
                </div>

                <Submenu
                  value={{
                    product: sProduct.pName,
                  }}
                />
              </div>
            </div>
          </div>

          <div>
            <div
              style={{
                backgroundImage:
                  'linear-gradient(to top right, #F5F5F5, #FFFFFF)',
              }}
              className="my-4 md:my-6 text-gray-600 p-4  border border-gray-300 rounded-md"
            >
              <div className="border-b-2 text-gray-900 border-gray-300">
                {sProduct.pDescription}
              </div>
              <div className="grid grid-cols-2 px-2 text-l">
                <div className="border-b-2 border-gray-300 flex flex-col items-left justify-center text-left py-4">
                  <div className="flex flex-row items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="#d20062"
                      className="bi bi-car-front-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2.52 3.515A2.5 2.5 0 0 1 4.82 2h6.362c1 0 1.904.596 2.298 1.515l.792 1.848c.075.175.21.319.38.404.5.25.855.715.965 1.262l.335 1.679q.05.242.049.49v.413c0 .814-.39 1.543-1 1.997V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.338c-1.292.048-2.745.088-4 .088s-2.708-.04-4-.088V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.892c-.61-.454-1-1.183-1-1.997v-.413a2.5 2.5 0 0 1 .049-.49l.335-1.68c.11-.546.465-1.012.964-1.261a.8.8 0 0 0 .381-.404l.792-1.848ZM3 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2m10 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2M6 8a1 1 0 0 0 0 2h4a1 1 0 1 0 0-2zM2.906 5.189a.51.51 0 0 0 .497.731c.91-.073 3.35-.17 4.597-.17s3.688.097 4.597.17a.51.51 0 0 0 .497-.731l-.956-1.913A.5.5 0 0 0 11.691 3H4.309a.5.5 0 0 0-.447.276L2.906 5.19Z" />
                    </svg>
                    <div style={{ color: '#d20062' }} className="px-2 text-m">
                      Model
                    </div>
                  </div>
                  <div style={{ transform: 'translate(24px,0)' }}>
                    {sProduct.pModel.substring(0, 10)}
                  </div>
                </div>
                <div className="border-b-2 border-gray-300 flex flex-col items-left justify-center text-left py-4">
                  <div className="flex flex-row items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="#d20062"
                      className="bi bi-calendar-date-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4zm5.402 9.746c.625 0 1.184-.484 1.184-1.18 0-.832-.527-1.23-1.16-1.23-.586 0-1.168.387-1.168 1.21 0 .817.543 1.2 1.144 1.2" />
                      <path d="M16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2m-6.664-1.21c-1.11 0-1.656-.767-1.703-1.407h.683c.043.37.387.82 1.051.82.844 0 1.301-.848 1.305-2.164h-.027c-.153.414-.637.79-1.383.79-.852 0-1.676-.61-1.676-1.77 0-1.137.871-1.809 1.797-1.809 1.172 0 1.953.734 1.953 2.668 0 1.805-.742 2.871-2 2.871zm-2.89-5.435v5.332H5.77V8.079h-.012c-.29.156-.883.52-1.258.777V8.16a13 13 0 0 1 1.313-.805h.632z" />
                    </svg>
                    <div className="px-2 text-m" style={{ color: '#d20062' }}>
                      Make Year
                    </div>
                  </div>
                  <div style={{ transform: 'translate(24px,0)' }}>
                    {sProduct.pYear}
                  </div>
                </div>
                <div className="border-b-2 border-gray-300 flex flex-col items-left justify-center text-left py-4">
                  <div className="flex flex-row items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="#d20062"
                      className="bi bi-card-checklist"
                      viewBox="0 0 16 16"
                    >
                      <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z" />
                      <path d="M7 5.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0M7 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0" />
                    </svg>
                    <div className="text-m pl-2 text-pran-red">Insurance</div>
                  </div>
                  <div style={{ transform: 'translate(24px,0)' }}>
                    {sProduct.pInsurance}
                  </div>
                </div>
                <div className="border-b-2 border-gray-300 flex flex-col items-left justify-center text-left py-4">
                  <div className="flex flex-row items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="#d20062"
                      className="bi bi-gear-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
                    </svg>
                    <div className="text-m pl-2" style={{ color: '#d20062' }}>
                      Transmission
                    </div>
                  </div>
                  <div style={{ transform: 'translate(24px,0)' }}>
                    {sProduct.pTransmission}
                  </div>
                </div>
                <div className="border-b-2 border-gray-300 flex flex-col items-left justify-center text-left py-4">
                  <div className="flex flex-row items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="#d20062"
                      className="bi bi-fuel-pump-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M1 2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v8a2 2 0 0 1 2 2v.5a.5.5 0 0 0 1 0V8h-.5a.5.5 0 0 1-.5-.5V4.375a.5.5 0 0 1 .5-.5h1.495c-.011-.476-.053-.894-.201-1.222a.97.97 0 0 0-.394-.458c-.184-.11-.464-.195-.9-.195a.5.5 0 0 1 0-1q.846-.002 1.412.336c.383.228.634.551.794.907.295.655.294 1.465.294 2.081V7.5a.5.5 0 0 1-.5.5H15v4.5a1.5 1.5 0 0 1-3 0V12a1 1 0 0 0-1-1v4h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1zm2.5 0a.5.5 0 0 0-.5.5v5a.5.5 0 0 0 .5.5h5a.5.5 0 0 0 .5-.5v-5a.5.5 0 0 0-.5-.5z" />
                    </svg>
                    <div className="px-2 text-m" style={{ color: '#d20062' }}>
                      Fuel Type
                    </div>
                  </div>
                  <div style={{ transform: 'translate(24px,0)' }}>
                    {sProduct.pFuel}
                  </div>
                </div>
                <div className="border-b-2 border-gray-300 flex flex-col items-left justify-center text-left py-4">
                  <div className="flex flex-row items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="#d20062"
                      className="bi bi-signpost-2-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M7.293.707A1 1 0 0 0 7 1.414V2H2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h5v1H2.5a1 1 0 0 0-.8.4L.725 8.7a.5.5 0 0 0 0 .6l.975 1.3a1 1 0 0 0 .8.4H7v5h2v-5h5a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1H9V6h4.5a1 1 0 0 0 .8-.4l.975-1.3a.5.5 0 0 0 0-.6L14.3 2.4a1 1 0 0 0-.8-.4H9v-.586A1 1 0 0 0 7.293.707" />
                    </svg>
                    <div className="px-2 text-m" style={{ color: '#d20062' }}>
                      Km driven
                    </div>
                  </div>
                  <div style={{ transform: 'translate(24px,0)' }}>
                    {sProduct.pDriven} km
                  </div>
                </div>
                <div className="border-b-2 border-gray-300 md:border-none flex flex-col items-left justify-center text-left py-4">
                  <div className="flex flex-row items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="#d20062"
                      className="bi bi-people-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" />
                    </svg>
                    <div className="px-2 text-m" style={{ color: '#d20062' }}>
                      Owners
                    </div>
                  </div>
                  <div style={{ transform: 'translate(24px,0)' }}>
                    {sProduct.pOwners}
                  </div>
                </div>

                <div className="border-b-2 border-gray-300 md:border-none flex flex-col items-left justify-center text-left py-4">
                  <div className="flex flex-row items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="#d20062"
                      className="bi bi-palette-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M12.433 10.07C14.133 10.585 16 11.15 16 8a8 8 0 1 0-8 8c1.996 0 1.826-1.504 1.649-3.08-.124-1.101-.252-2.237.351-2.92.465-.527 1.42-.237 2.433.07M8 5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m4.5 3a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3M5 6.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m.5 6.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3" />
                    </svg>
                    <div className="px-2 text-m" style={{ color: '#d20062' }}>
                      Colour
                    </div>
                  </div>
                  <div style={{ transform: 'translate(24px,0)' }}>
                    {sProduct.pColour}
                  </div>
                </div>

                <div className="border-b-2 border-gray-300 flex flex-col items-left justify-center text-left py-4">
                  <div className="flex flex-row items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="#d20062"
                      className="bi bi-upc-scan"
                      viewBox="0 0 16 16"
                    >
                      <path d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5M.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5m15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5M3 4.5a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0zm2 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0zm2 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0zm2 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0z" />
                    </svg>
                    <div className="px-2 text-m" style={{ color: '#d20062' }}>
                      RTO
                    </div>
                  </div>
                  <div style={{ transform: 'translate(24px,0)' }}>
                    {sProduct.pProductCode}
                  </div>
                </div>
                <div className="border-b-2 border-gray-300 md:border-none flex flex-col items-left justify-center text-left py-4">
                  <div className="flex flex-row items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="#d20062"
                      className="bi bi-ev-front-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2.52 3.515A2.5 2.5 0 0 1 4.82 2h6.362c1 0 1.904.596 2.298 1.515l.792 1.848c.075.175.21.319.38.404.5.25.855.715.965 1.262l.335 1.679q.05.242.049.49v.413c0 .814-.39 1.543-1 1.997V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.338c-1.292.048-2.745.088-4 .088s-2.708-.04-4-.088V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.892c-.61-.454-1-1.183-1-1.997v-.413a2.5 2.5 0 0 1 .049-.49l.335-1.68c.11-.546.465-1.012.964-1.261a.8.8 0 0 0 .381-.404l.792-1.848Zm6.75.51a.186.186 0 0 0-.23.034L6.05 7.246a.188.188 0 0 0 .137.316h1.241l-.673 2.195a.19.19 0 0 0 .085.218c.075.043.17.03.23-.034l2.88-3.187a.188.188 0 0 0-.137-.316H8.572l.782-2.195a.19.19 0 0 0-.085-.218Z" />
                    </svg>
                    <div className="px-2 text-m" style={{ color: '#d20062' }}>
                      Power
                    </div>
                  </div>
                  <div style={{ transform: 'translate(24px,0)' }}>
                    {sProduct.pPower} bhp
                  </div>
                </div>
                <div className="border-b-2 border-gray-300 md:border-noneflex flex-col items-left justify-center text-left py-4">
                  <div className="flex flex-row items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="#d20062"
                      className="bi bi-explicit-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2.5 0A2.5 2.5 0 0 0 0 2.5v11A2.5 2.5 0 0 0 2.5 16h11a2.5 2.5 0 0 0 2.5-2.5v-11A2.5 2.5 0 0 0 13.5 0zm4.326 10.88H10.5V12h-5V4.002h5v1.12H6.826V7.4h3.457v1.073H6.826z" />
                    </svg>
                    <div className="px-2 text-m" style={{ color: '#d20062' }}>
                      Engine
                    </div>
                  </div>
                  <div style={{ transform: 'translate(24px,0)' }}>
                    {sProduct.pEngine} cc
                  </div>
                </div>
                <div className="border-b-2 border-gray-300 md:border-noneflex flex-col items-left justify-center text-left pt-4 ">
                  <div className="flex flex-row items-cente">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="#d20062"
                      className="bi bi-fan"
                      viewBox="0 0 16 16"
                    >
                      <path d="M10 3c0 1.313-.304 2.508-.8 3.4a2 2 0 0 0-1.484-.38c-.28-.982-.91-2.04-1.838-2.969a8 8 0 0 0-.491-.454A6 6 0 0 1 8 2c.691 0 1.355.117 1.973.332Q10 2.661 10 3m0 5q0 .11-.012.217c1.018-.019 2.2-.353 3.331-1.006a8 8 0 0 0 .57-.361 6 6 0 0 0-2.53-3.823 9 9 0 0 1-.145.64c-.34 1.269-.944 2.346-1.656 3.079.277.343.442.78.442 1.254m-.137.728a2 2 0 0 1-1.07 1.109c.525.87 1.405 1.725 2.535 2.377q.3.174.605.317a6 6 0 0 0 2.053-4.111q-.311.11-.641.199c-1.264.339-2.493.356-3.482.11ZM8 10c-.45 0-.866-.149-1.2-.4-.494.89-.796 2.082-.796 3.391q0 .346.027.678A6 6 0 0 0 8 14c.94 0 1.83-.216 2.623-.602a8 8 0 0 1-.497-.458c-.925-.926-1.555-1.981-1.836-2.96Q8.149 10 8 10M6 8q0-.12.014-.239c-1.02.017-2.205.351-3.34 1.007a8 8 0 0 0-.568.359 6 6 0 0 0 2.525 3.839 8 8 0 0 1 .148-.653c.34-1.267.94-2.342 1.65-3.075A2 2 0 0 1 6 8m-3.347-.632c1.267-.34 2.498-.355 3.488-.107.196-.494.583-.89 1.07-1.1-.524-.874-1.406-1.733-2.541-2.388a8 8 0 0 0-.594-.312 6 6 0 0 0-2.06 4.106q.309-.11.637-.199M8 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                    </svg>
                    <div className="px-2 text-m" style={{ color: '#d20062' }}>
                      Torque
                    </div>
                  </div>
                  <div style={{ transform: 'translate(24px,0)' }}>
                    {sProduct.pTorque} Nm
                  </div>
                </div>
                <div className="border-b-2 border-gray-300 flex flex-col items-left justify-center text-left py-2">
                  <div className="flex flex-row items-center py-2">
                    <Image loading='eager' src={abs} alt="abs" width="16" />
                    <div className="px-2 text-m" style={{ color: '#d20062' }}>
                      ABS
                    </div>
                  </div>
                  <div style={{ transform: 'translate(24px,0)' }}>
                    {sProduct.pAbs}
                  </div>
                </div>
                <div className="border-b-2 border-gray-300 flex flex-col items-left justify-center text-left py-2">
                  <div className="flex flex-row items-center py-2">
                    <Image
                      loading="eager"
                            
                      src={airbag}
                      alt="airbag"
                      width="16"
                    />
                    <div className="px-2 text-m" style={{ color: '#d20062' }}>
                      AirBags
                    </div>
                  </div>
                  <div style={{ transform: 'translate(24px,0)' }}>
                    {sProduct.pAirbags}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 px- text-l">
                <div className="border-b-2 border-gray-300 flex flex-col items-left justify-center text-left py-2">
                  <div className="flex flex-row items-center p-2">
                    <Image
                      loading="eager"
                            
                      src={cruise}
                      alt="cruise"
                      width="20"
                    />
                    <div className="pl-1 text-m" style={{ color: '#d20062' }}>
                      Cruise Control
                    </div>
                  </div>
                  <div style={{ transform: 'translate(24px,0)' }}>
                    {sProduct.pCruiseControl}
                  </div>
                </div>
                <div className="border-b-2 border-gray-300 md:border-none flex flex-col items-left justify-center text-left py-2">
                  <div className="flex flex-row items-center p-2">
                    <Image loading='eager' src={steer} alt="steer" width="16" />
                    <div className="px-2 text-m" style={{ color: '#d20062' }}>
                      Adjustable Steering
                    </div>
                  </div>
                  <div style={{ transform: 'translate(24px,0)' }}>
                    {sProduct.pAdjustableSteer}
                  </div>
                </div>
                <div className="border-b-2 border-gray-300 md:border-none flex flex-col items-left justify-center text-left py-2">
                  <div className="flex flex-row items-center p-2">
                    <Image loading='eager' src={rear} alt="rear" width="16" />
                    <div className="pl-2 text-m" style={{ color: '#d20062' }}>
                      Rear Parking Sensor
                    </div>
                  </div>
                  <div style={{ transform: 'translate(24px,0)' }}>
                    {sProduct.pRearParkSensor}
                  </div>
                </div>
                <div className="flex flex-col items-left justify-center text-left py-2">
                  <div className="flex flex-row items-center p-2">
                    <Image
                      loading="eager"
                            
                      src={sunroof}
                      alt="sunroof"
                      width="20"
                    />
                    <div className="pl-1 text-m" style={{ color: '#d20062' }}>
                      Sunroof Style
                    </div>
                  </div>
                  <div style={{ transform: 'translate(24px,0)' }}>
                    {sProduct.pSunroof}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-lg ml-6 my-4">Pran Motors Advantage</div>
          <div className="border rounded-lg flex flex-col justify-center items-center mb-6  border-gray-300 p-4">
            <div
              className="flex py-2 lg:space-x-8 space-y-4 text-center justify-center"
              style={{
                display: 'flex',
                flexDirection:
                  'column' /* Set to column for screens less than 768px */,
              }}
            >
              <div className="lg:pl-4 lg:pr-2 mt-4">
                <Image loading='eager' src={inspection} alt="inspection" />
                <p className="font-medium text-lg p-2">200-Points Inspection</p>
                <p>
                  Every Car is carefully handpicked after a thorough quality
                  inspection.
                </p>
              </div>
              <div className="lg:px-2">
                <Image loading='eager' src={warranty1} alt="warranty" />
                <p className="font-medium text-lg p-2">Warranty included</p>
                <p>
                  Our way of being there for you through your car ownership
                  journey.
                </p>
              </div>
              <div className="lg:px-2">
                <Image loading='eager' src={moneyback} alt="moneyback" />
                <p className="font-medium text-lg p-2">5-Day Money Back</p>
                <p>
                  All our cars come with a no- questions-asked 5-day money back
                  guarantee.
                </p>
              </div>
              <div className="lg:pl-2 lg:pr-4">
                <Image loading='eager' src={addedbenefits} alt="addedbenefits" />
                <p className="font-medium text-lg p-2">Best Price Assurance</p>
                <p>
                  No more endless negotiations or haggling. With Pran Motors,
                  you get the best deal upfront and right away.
                </p>
              </div>
            </div>
          </div>
          <div className="text-lg ml-6 mt-4 -mb-12">Need a Loan?</div>
          <EmiCalculator />
        </section>
      ) : (
        <section className="hidden md:flex justify-center lg:space-x-8">
          <Link className="cursor-pointer mt-5 mr-1" href={'/all-products'}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              className="bi bi-arrow-left-circle-fill"
              viewBox="0 0 16 16"
            >
              <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
            </svg>
          </Link>
          {/* left side */}
          <div style={{ width: '45%' }} className="mt-5 flex flex-col">
            {pImages && pImages.length > 0 ? (
              <div className="relative w-full">
                <Swiper
                  navigation={{
                    prevEl: `.slider__prev`,
                    nextEl: `.slider__next`,
                  }}
                  pagination={{ type: 'bullets' }}
                  autoplay={false}
                  loop={true}
                  modules={[Autoplay, Navigation, Pagination]}
                >
                  {pImages.map((image, index) => (
                    <SwiperSlide key={index}>
                      <div className="overflow-hidden" key={index}>
                        <Image
                          loading="lazy"
                          width={100}
                          height={100}
                          id="product-image"
                          className="w-full object-cover object-center rounded-md aspect-[4/3]"
                          src={`${apiURL}/uploads/products/${image}`}
                          alt={sProduct.pName}
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
                <div className={`slider__prev`}></div>
                <div className={`slider__next`}></div>
              </div>
            ) : (
              <div>No images available</div>
            )}
            <div>
              <div className="text-lg ml-4 mt-6">
                Get familiar with your ride
              </div>
              <div
                style={{
                  backgroundImage:
                    'linear-gradient(to top right, #F5F5F5, #FFFFFF)',
                }}
                className="my-4 md:my-6 text-gray-600 px-4 py-2  border border-gray-300 rounded-md"
              >
                <div className="border-b-2 text-gray-900 border-gray-300">
                  {sProduct.pDescription}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 px-2 text-l">
                  <div className="border-b-2 border-gray-300 flex flex-col items-left justify-center text-left p-4">
                    <div className="flex flex-row items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="#d20062"
                        className="bi bi-car-front-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M2.52 3.515A2.5 2.5 0 0 1 4.82 2h6.362c1 0 1.904.596 2.298 1.515l.792 1.848c.075.175.21.319.38.404.5.25.855.715.965 1.262l.335 1.679q.05.242.049.49v.413c0 .814-.39 1.543-1 1.997V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.338c-1.292.048-2.745.088-4 .088s-2.708-.04-4-.088V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.892c-.61-.454-1-1.183-1-1.997v-.413a2.5 2.5 0 0 1 .049-.49l.335-1.68c.11-.546.465-1.012.964-1.261a.8.8 0 0 0 .381-.404l.792-1.848ZM3 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2m10 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2M6 8a1 1 0 0 0 0 2h4a1 1 0 1 0 0-2zM2.906 5.189a.51.51 0 0 0 .497.731c.91-.073 3.35-.17 4.597-.17s3.688.097 4.597.17a.51.51 0 0 0 .497-.731l-.956-1.913A.5.5 0 0 0 11.691 3H4.309a.5.5 0 0 0-.447.276L2.906 5.19Z" />
                      </svg>
                      <div style={{ color: '#d20062' }} className="px-2 text-m">
                        Model
                      </div>
                    </div>
                    <div style={{ transform: 'translate(24px,0)' }}>
                      {sProduct.pModel}
                    </div>
                  </div>
                  <div className="border-b-2 border-gray-300 flex flex-col items-left justify-center text-left p-4">
                    <div className="flex flex-row items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="#d20062"
                        className="bi bi-calendar-date-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4zm5.402 9.746c.625 0 1.184-.484 1.184-1.18 0-.832-.527-1.23-1.16-1.23-.586 0-1.168.387-1.168 1.21 0 .817.543 1.2 1.144 1.2" />
                        <path d="M16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2m-6.664-1.21c-1.11 0-1.656-.767-1.703-1.407h.683c.043.37.387.82 1.051.82.844 0 1.301-.848 1.305-2.164h-.027c-.153.414-.637.79-1.383.79-.852 0-1.676-.61-1.676-1.77 0-1.137.871-1.809 1.797-1.809 1.172 0 1.953.734 1.953 2.668 0 1.805-.742 2.871-2 2.871zm-2.89-5.435v5.332H5.77V8.079h-.012c-.29.156-.883.52-1.258.777V8.16a13 13 0 0 1 1.313-.805h.632z" />
                      </svg>
                      <div className="px-2 text-m" style={{ color: '#d20062' }}>
                        Make Year
                      </div>
                    </div>
                    <div style={{ transform: 'translate(24px,0)' }}>
                      {sProduct.pYear}
                    </div>
                  </div>
                  <div className="border-b-2 border-gray-300 flex flex-col items-left justify-center text-left p-4">
                    <div className="flex flex-row items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="#d20062"
                        className="bi bi-card-checklist"
                        viewBox="0 0 16 16"
                      >
                        <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z" />
                        <path d="M7 5.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0M7 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0" />
                      </svg>
                      <div className="px-2 text-m" style={{ color: '#d20062' }}>
                        Insurance
                      </div>
                    </div>
                    <div style={{ transform: 'translate(24px,0)' }}>
                      {sProduct.pInsurance}
                    </div>
                  </div>
                  <div className="border-b-2 border-gray-300 flex flex-col items-left justify-center text-left p-4">
                    <div className="flex flex-row items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="#d20062"
                        className="bi bi-gear-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
                      </svg>
                      <div className="px-2 text-m" style={{ color: '#d20062' }}>
                        Transmission
                      </div>
                    </div>
                    <div style={{ transform: 'translate(24px,0)' }}>
                      {sProduct.pTransmission}
                    </div>
                  </div>
                  <div className="border-b-2 border-gray-300 flex flex-col items-left justify-center text-left p-4">
                    <div className="flex flex-row items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="#d20062"
                        className="bi bi-fuel-pump-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M1 2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v8a2 2 0 0 1 2 2v.5a.5.5 0 0 0 1 0V8h-.5a.5.5 0 0 1-.5-.5V4.375a.5.5 0 0 1 .5-.5h1.495c-.011-.476-.053-.894-.201-1.222a.97.97 0 0 0-.394-.458c-.184-.11-.464-.195-.9-.195a.5.5 0 0 1 0-1q.846-.002 1.412.336c.383.228.634.551.794.907.295.655.294 1.465.294 2.081V7.5a.5.5 0 0 1-.5.5H15v4.5a1.5 1.5 0 0 1-3 0V12a1 1 0 0 0-1-1v4h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1zm2.5 0a.5.5 0 0 0-.5.5v5a.5.5 0 0 0 .5.5h5a.5.5 0 0 0 .5-.5v-5a.5.5 0 0 0-.5-.5z" />
                      </svg>
                      <div className="px-2 text-m" style={{ color: '#d20062' }}>
                        Fuel Type
                      </div>
                    </div>
                    <div style={{ transform: 'translate(24px,0)' }}>
                      {sProduct.pFuel}
                    </div>
                  </div>
                  <div className="border-b-2 border-gray-300 flex flex-col items-left justify-center text-left p-4">
                    <div className="flex flex-row items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="#d20062"
                        className="bi bi-signpost-2-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M7.293.707A1 1 0 0 0 7 1.414V2H2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h5v1H2.5a1 1 0 0 0-.8.4L.725 8.7a.5.5 0 0 0 0 .6l.975 1.3a1 1 0 0 0 .8.4H7v5h2v-5h5a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1H9V6h4.5a1 1 0 0 0 .8-.4l.975-1.3a.5.5 0 0 0 0-.6L14.3 2.4a1 1 0 0 0-.8-.4H9v-.586A1 1 0 0 0 7.293.707" />
                      </svg>
                      <div className="px-2 text-m" style={{ color: '#d20062' }}>
                        Km driven
                      </div>
                    </div>
                    <div style={{ transform: 'translate(24px,0)' }}>
                      {sProduct.pDriven} km
                    </div>
                  </div>
                  <div className="border-b-2 border-gray-300 flex flex-col items-left justify-center text-left p-4">
                    <div className="flex flex-row items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="#d20062"
                        className="bi bi-people-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" />
                      </svg>
                      <div className="px-2 text-m" style={{ color: '#d20062' }}>
                        No. of Owner
                      </div>
                    </div>
                    <div style={{ transform: 'translate(24px,0)' }}>
                      {sProduct.pOwners}
                    </div>
                  </div>

                  <div className="border-b-2 border-gray-300 flex flex-col items-left justify-center text-left p-4">
                    <div className="flex flex-row items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="#d20062"
                        className="bi bi-palette-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M12.433 10.07C14.133 10.585 16 11.15 16 8a8 8 0 1 0-8 8c1.996 0 1.826-1.504 1.649-3.08-.124-1.101-.252-2.237.351-2.92.465-.527 1.42-.237 2.433.07M8 5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m4.5 3a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3M5 6.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m.5 6.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3" />
                      </svg>
                      <div className="px-2 text-m" style={{ color: '#d20062' }}>
                        Colour
                      </div>
                    </div>
                    <div style={{ transform: 'translate(24px,0)' }}>
                      {sProduct.pColour}
                    </div>
                  </div>

                  <div className="border-b-2 border-gray-300 flex flex-col items-left justify-center text-left p-2">
                    <div
                      style={{ transform: 'translate(8px,0)' }}
                      className="flex flex-row items-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="#d20062"
                        className="bi bi-upc-scan"
                        viewBox="0 0 16 16"
                      >
                        <path d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5M.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5m15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5M3 4.5a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0zm2 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0zm2 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0zm2 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0z" />
                      </svg>
                      <div className="px-2 text-m" style={{ color: '#d20062' }}>
                        RTO
                      </div>
                    </div>
                    <div style={{ transform: 'translate(32px,0)' }}>
                      {sProduct.pProductCode}
                    </div>
                  </div>
                  <div className="border-b-2 border-gray-300 flex flex-col items-left justify-center text-left p-2">
                    <div className="flex flex-row items-center p-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="#d20062"
                        className="bi bi-ev-front-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M2.52 3.515A2.5 2.5 0 0 1 4.82 2h6.362c1 0 1.904.596 2.298 1.515l.792 1.848c.075.175.21.319.38.404.5.25.855.715.965 1.262l.335 1.679q.05.242.049.49v.413c0 .814-.39 1.543-1 1.997V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.338c-1.292.048-2.745.088-4 .088s-2.708-.04-4-.088V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.892c-.61-.454-1-1.183-1-1.997v-.413a2.5 2.5 0 0 1 .049-.49l.335-1.68c.11-.546.465-1.012.964-1.261a.8.8 0 0 0 .381-.404l.792-1.848Zm6.75.51a.186.186 0 0 0-.23.034L6.05 7.246a.188.188 0 0 0 .137.316h1.241l-.673 2.195a.19.19 0 0 0 .085.218c.075.043.17.03.23-.034l2.88-3.187a.188.188 0 0 0-.137-.316H8.572l.782-2.195a.19.19 0 0 0-.085-.218Z" />
                      </svg>
                      <div className="px-2 text-m" style={{ color: '#d20062' }}>
                        Power
                      </div>
                    </div>
                    <div style={{ transform: 'translate(32px,0)' }}>
                      {sProduct.pPower} bhp
                    </div>
                  </div>
                  <div className="border-b-2 border-gray-300 flex flex-col items-left justify-center text-left p-2">
                    <div className="flex flex-row items-center p-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="#d20062"
                        className="bi bi-explicit-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M2.5 0A2.5 2.5 0 0 0 0 2.5v11A2.5 2.5 0 0 0 2.5 16h11a2.5 2.5 0 0 0 2.5-2.5v-11A2.5 2.5 0 0 0 13.5 0zm4.326 10.88H10.5V12h-5V4.002h5v1.12H6.826V7.4h3.457v1.073H6.826z" />
                      </svg>
                      <div className="px-2 text-m" style={{ color: '#d20062' }}>
                        Engine
                      </div>
                    </div>
                    <div style={{ transform: 'translate(32px,0)' }}>
                      {sProduct.pEngine} cc
                    </div>
                  </div>
                  <div className="border-b-2 border-gray-300 flex flex-col items-left justify-center text-left p-2">
                    <div className="flex flex-row items-center p-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="#d20062"
                        className="bi bi-fan"
                        viewBox="0 0 16 16"
                      >
                        <path d="M10 3c0 1.313-.304 2.508-.8 3.4a2 2 0 0 0-1.484-.38c-.28-.982-.91-2.04-1.838-2.969a8 8 0 0 0-.491-.454A6 6 0 0 1 8 2c.691 0 1.355.117 1.973.332Q10 2.661 10 3m0 5q0 .11-.012.217c1.018-.019 2.2-.353 3.331-1.006a8 8 0 0 0 .57-.361 6 6 0 0 0-2.53-3.823 9 9 0 0 1-.145.64c-.34 1.269-.944 2.346-1.656 3.079.277.343.442.78.442 1.254m-.137.728a2 2 0 0 1-1.07 1.109c.525.87 1.405 1.725 2.535 2.377q.3.174.605.317a6 6 0 0 0 2.053-4.111q-.311.11-.641.199c-1.264.339-2.493.356-3.482.11ZM8 10c-.45 0-.866-.149-1.2-.4-.494.89-.796 2.082-.796 3.391q0 .346.027.678A6 6 0 0 0 8 14c.94 0 1.83-.216 2.623-.602a8 8 0 0 1-.497-.458c-.925-.926-1.555-1.981-1.836-2.96Q8.149 10 8 10M6 8q0-.12.014-.239c-1.02.017-2.205.351-3.34 1.007a8 8 0 0 0-.568.359 6 6 0 0 0 2.525 3.839 8 8 0 0 1 .148-.653c.34-1.267.94-2.342 1.65-3.075A2 2 0 0 1 6 8m-3.347-.632c1.267-.34 2.498-.355 3.488-.107.196-.494.583-.89 1.07-1.1-.524-.874-1.406-1.733-2.541-2.388a8 8 0 0 0-.594-.312 6 6 0 0 0-2.06 4.106q.309-.11.637-.199M8 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                      </svg>
                      <div className="px-2 text-m" style={{ color: '#d20062' }}>
                        Torque
                      </div>
                    </div>
                    <div style={{ transform: 'translate(32px,0)' }}>
                      {sProduct.pTorque} Nm
                    </div>
                  </div>
                  <div className="border-b-2 border-gray-300 flex flex-col items-left justify-center text-left p-2">
                    <div className="flex flex-row items-center p-2">
                      <Image loading='eager' src={abs} alt="abs" width="16" />
                      <div className="px-2 text-m" style={{ color: '#d20062' }}>
                        ABS
                      </div>
                    </div>
                    <div style={{ transform: 'translate(32px,0)' }}>
                      {sProduct.pAbs}
                    </div>
                  </div>
                  <div className="border-b-2 border-gray-300 flex flex-col items-left justify-center text-left p-2">
                    <div className="flex flex-row items-center p-2">
                      <Image
                        loading="eager"
                            
                        src={airbag}
                        alt="airbag"
                        width="16"
                      />
                      <div className="px-2 text-m" style={{ color: '#d20062' }}>
                        AirBags
                      </div>
                    </div>
                    <div style={{ transform: 'translate(32px,0)' }}>
                      {sProduct.pAirbags}
                    </div>
                  </div>
                  <div className="border-b-2 border-gray-300 flex flex-col items-left justify-center text-left p-2">
                    <div className="flex flex-row items-center p-2">
                      <Image
                        loading="eager"
                            
                        src={cruise}
                        alt="cruise"
                        width="20"
                      />
                      <div className="pl-1 text-m" style={{ color: '#d20062' }}>
                        Cruise Control
                      </div>
                    </div>
                    <div style={{ transform: 'translate(32px,0)' }}>
                      {sProduct.pCruiseControl}
                    </div>
                  </div>
                  <div className="border-b-2 border-gray-300 md:border-none flex flex-col items-left justify-center text-left p-2">
                    <div className="flex flex-row items-center p-2">
                      <Image
                        loading="eager"
                            
                        src={steer}
                        alt="steer"
                        width="16"
                      />
                      <div className="px-2 text-m" style={{ color: '#d20062' }}>
                        Adjustable Steering
                      </div>
                    </div>
                    <div style={{ transform: 'translate(32px,0)' }}>
                      {sProduct.pAdjustableSteer}
                    </div>
                  </div>
                  <div className="border-b-2 border-gray-300 md:border-none flex flex-col items-left justify-center text-left p-2">
                    <div className="flex flex-row items-center p-2">
                      <Image loading='eager' src={rear} alt="rear" width="16" />
                      <div className="pl-2 text-m" style={{ color: '#d20062' }}>
                        Rear Parking Sensor
                      </div>
                    </div>
                    <div style={{ transform: 'translate(32px,0)' }}>
                      {sProduct.pRearParkSensor}
                    </div>
                  </div>
                  <div className="flex flex-col items-left justify-center text-left p-2">
                    <div className="flex flex-row items-center p-2">
                      <Image
                        loading="eager"
                            
                        src={sunroof}
                        alt="sunroof"
                        width="20"
                      />
                      <div className="pl-1 text-m" style={{ color: '#d20062' }}>
                        Sunroof Style
                      </div>
                    </div>
                    <div style={{ transform: 'translate(32px,0)' }}>
                      {sProduct.pSunroof}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-lg ml-6 my-4">Pran Motors Advantage</div>
            <div className="border p-4 text-center rounded-lg grid col-span-2 grid-cols-2 justify-center items-center border-gray-300">
              <div className="p-4">
                <Image loading='eager' src={inspection} alt="inspection" />
                <p className="font-medium p-2">200-Points Inspection</p>
                <p style={{ fontSize: '12px' }}>
                  Every Car is carefully handpicked after a thorough quality
                  inspection.
                </p>
              </div>
              <div className="p-4">
                <Image loading='eager' src={warranty1} alt="warranty" />
                <p className="font-medium p-2">Warranty included</p>
                <p style={{ fontSize: '12px' }}>
                  Our way of being there for you through your car ownership
                  journey.
                </p>
              </div>
              <div className="p-4">
                <Image loading='eager' src={moneyback} alt="moneyback" />
                <p className="font-medium p-2">5-Day Money Back</p>
                <p style={{ fontSize: '12px' }}>
                  All our cars come with a no- questions-asked 5-day money back
                  guarantee.
                </p>
              </div>
              <div className="p-4">
                <Image loading='eager' src={addedbenefits} alt="addedbenefits" />
                <p className="font-medium p-2">Best Price Assurance</p>
                <p style={{ fontSize: '12px' }}>
                  No more endless negotiations or haggling. With Pran Motors,
                  you get the best deal upfront and right away.
                </p>
              </div>
            </div>

            <div className="text-lg ml-6 mt-4">Need a Loan?</div>
            <EmiCalculator />
          </div>

          {/* right side */}
          <div
            className="mt-10"
            style={{
              width: '30%',
              position: 'sticky',
              top: '0',
              height: '62vh',
              zIndex: '30',
            }}
          >
            <div className="col-span-2">
              <div>
                <div className="flex flex-col leading-8 p-4 mr-8 my-4 border border-gray-300 rounded-lg shadow-lg">
                  <div className="flex flex-row justify-between items-center">
                    <h1
                      className="text-xl font-semibold tracking-wider"
                      style={{ color: '#d20062' }}
                    >
                      {sProduct.pName}
                    </h1>
                    {/* WhisList Logic  */}
                    <div className=" mx-2 my-2 md:mx-4">
                      <svg
                        onClick={(e) =>
                          isWishReq(
                            e as unknown as React.MouseEvent<HTMLElement>,
                            sProduct._id,
                            setWlist
                          )
                        }
                        className={`${
                          isWish(sProduct._id, wList) && 'hidden'
                        } w-5 h-5 md:w-6 md:h-6 cursor-pointer transition-all duration-300 ease-in`}
                        xmlns="http://www.w3.org/2000/svg"
                        width="29"
                        height="25"
                        viewBox="0 0 29 25"
                        fill="none"
                      >
                        <path
                          d="M20.9977 0.178101C18.3761 0.178101 16.0808 1.30544 14.65 3.21101C13.2193 1.30544 10.924 0.178101 8.30237 0.178101C6.21555 0.180453 4.21487 1.01048 2.73926 2.48609C1.26366 3.96169 0.433627 5.96237 0.431274 8.04919C0.431274 16.9359 13.6077 24.1291 14.1689 24.4261C14.3168 24.5057 14.4821 24.5473 14.65 24.5473C14.818 24.5473 14.9833 24.5057 15.1312 24.4261C15.6923 24.1291 28.8688 16.9359 28.8688 8.04919C28.8664 5.96237 28.0364 3.96169 26.5608 2.48609C25.0852 1.01048 23.0845 0.180453 20.9977 0.178101ZM14.65 22.3695C12.3319 21.0187 2.46252 14.8653 2.46252 8.04919C2.46454 6.50099 3.08045 5.01677 4.1752 3.92203C5.26995 2.82728 6.75416 2.21137 8.30237 2.20935C10.7716 2.20935 12.8448 3.52458 13.7106 5.63708C13.7871 5.82336 13.9173 5.98269 14.0845 6.09481C14.2518 6.20694 14.4486 6.26681 14.65 6.26681C14.8514 6.26681 15.0482 6.20694 15.2155 6.09481C15.3828 5.98269 15.513 5.82336 15.5895 5.63708C16.4553 3.52078 18.5284 2.20935 20.9977 2.20935C22.5459 2.21137 24.0301 2.82728 25.1248 3.92203C26.2196 5.01677 26.8355 6.50099 26.8375 8.04919C26.8375 14.8551 16.9656 21.0175 14.65 22.3695Z"
                          fill="black"
                        />
                      </svg>

                      <svg
                        onClick={(e) =>
                          unWishReq(
                            e as unknown as React.MouseEvent<HTMLElement>,
                            sProduct._id,
                            setWlist
                          )
                        }
                        className={`${
                          !isWish(sProduct._id, wList) && 'hidden'
                        } w-5 h-5 md:w-6 md:h-6 cursor-pointer transition-all duration-300 ease-in`}
                        xmlns="http://www.w3.org/2000/svg"
                        width="27"
                        height="23"
                        viewBox="0 0 27 23"
                        fill="none"
                      >
                        <path
                          opacity="0.2"
                          d="M26.8531 7.04919C26.8531 15.4281 13.65 22.5375 13.65 22.5375C13.65 22.5375 0.446899 15.4281 0.446899 7.04919C0.446899 5.23101 1.16917 3.4873 2.45482 2.20165C3.74047 0.915996 5.48418 0.193726 7.30237 0.193726C10.1702 0.193726 12.6268 1.75652 13.65 4.25623C14.6733 1.75652 17.1298 0.193726 19.9977 0.193726C21.8159 0.193726 23.5596 0.915996 24.8452 2.20165C26.1309 3.4873 26.8531 5.23101 26.8531 7.04919Z"
                          fill="black"
                        />
                      </svg>
                    </div>
                    {/* WhisList Logic End */}
                  </div>
                  <div className="flex flex-row font-semibold">
                    <div className="mr-2">{sProduct.pDriven} km</div>
                    <div className="mr-2">{sProduct.pFuel}</div>
                    <div className="mr-2">{sProduct.pTransmission}</div>
                    <div className="mr-2">{sProduct.pOwners}st Owner</div>
                  </div>
                  <div className="flex flex-row justify-between space-y-2">
                    <div className="space-y-1">
                      <div className="text-xs font-semibold">
                        One Year Warranty + PRAN Member Benefits
                      </div>
                      <div className="text-xs font-semibold">
                        PRAN Motors, Sarjapura Road
                      </div>
                    </div>
                    <Badge pTag={sProduct.pTag} />
                  </div>
                  <div className="flex flex-row justify-between">
                    <div className="flex flex-col justify-center space-y-1">
                      <div className="text-xl font-semibold">
                        ₹ {calculateEMI(sProduct.pPrice)}/mo
                      </div>
                      <div className="text-xs">On 10% down payment</div>
                      <div className="text-xs font-semibold">
                        CHECK ELIGIBLITY!
                      </div>
                    </div>
                    <div className="flex flex-col justify-center">
                      <div className="text-2xl font-semibold">
                        ₹ {sProduct.pPrice / 100000} Lakh
                      </div>
                      <div className="text-xs text-right">
                        {sProduct.pOffer}% off
                      </div>
                      <div className="line-through text-xs text-right">
                        ₹{' '}
                        {(sProduct.pPrice * 100) /
                          (100 - sProduct.pOffer) /
                          100000}{' '}
                        Lakh
                      </div>
                    </div>
                  </div>
                  {!isInput && (
                    <div className="flex flex-row font-bold justify-between text-white my-2">
                      <div
                        onClick={handleEnquireNowClick}
                        id="bg-opacity-80"
                        style={{ transition: 'opacity 300ms' }}
                        className="cursor-pointer mr-2 flex-1 items-center rounded-md flex flex-col py-1"
                      >
                        <p>ENQUIRE NOW</p>
                        <p className="text-xs font-normal">100% refundable</p>
                      </div>
                      <div
                        onClick={handleTestDriveClick}
                        id="book"
                        style={{
                          ...buttonStyle,
                          animation: 'blink 1s infinite',
                        }}
                        className="cursor-pointer flex-1 ml-2 justify-center items-center rounded-md flex py-1"
                      >
                        <p>BOOK TEST DRIVE</p>
                      </div>
                    </div>
                  )}
                  {isInput && (
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      {errorName && (
                        <p
                          style={{
                            color: 'red',
                            fontSize: '12px',
                            marginBottom: '5px',
                          }}
                        >
                          {errorName}
                        </p>
                      )}
                      <input
                        style={{
                          marginBottom: '10px',
                          borderWidth: '1px',
                          borderRadius: '0px',
                          borderColor: '#5755FE',
                          padding: '3px',
                          opacity: '50%',
                        }}
                        type="text"
                        height="50px"
                        width="200px"
                        placeholder="Enter your name"
                        value={interestText}
                        onChange={(e) => setInterestText(e.target.value)}
                      />
                      {errorPhone && (
                        <p
                          style={{
                            color: 'red',
                            fontSize: '12px',
                            marginBottom: '5px',
                          }}
                        >
                          {errorPhone}
                        </p>
                      )}
                      <input
                        style={{
                          marginBottom: '10px',
                          borderWidth: '1px',
                          borderRadius: '0px',
                          borderColor: '#5755FE',
                          padding: '3px',
                          opacity: '50%',
                        }}
                        type="text"
                        height="50px"
                        width="200px"
                        value={phone}
                        onChange={handlePhoneChange}
                        maxLength={10}
                        placeholder="Enter your number"
                      />
                      <button
                        style={{ background: '#5755FE' }}
                        className="px-4 py-2 text-white text-center uppercase opacity-100 rounded-md cursor-pointer"
                        onClick={() => handleContact(booking, sProduct.pName)}
                      >
                        BOOK!
                      </button>
                    </div>
                  )}
                </div>

                <Submenu
                  value={{
                    product: sProduct.pName,
                  }}
                />
              </div>
            </div>
          </div>
        </section>
      )}
    </Fragment>
  );
};

export default ProductDetailsSection;
