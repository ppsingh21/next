'use client';
import React, { createContext, useReducer, Dispatch, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { postCarFormData } from '../ProductDetails/FetchApi';
import { usePathname } from 'next/navigation';
import Navbar from '../partials/Navbar';
import Footer from '../partials/Footer';

export interface LayoutState {
  navberHamburger: boolean;
  loginSignupModal: boolean;
  loginSignupError: boolean;
  cartModal: boolean;
  cartProduct: any; // You should replace `any` with the actual type of cartProduct
  singleProductDetail: any; // You should replace `any` with the actual type of singleProductDetail
  inCart: any; // You should replace `any` with the actual type of inCart
  cartTotalCost: any; // You should replace `any` with the actual type of cartTotalCost
  orderSuccess: boolean;
  products: any; // You should replace `any` with the actual type of products
  loading: boolean;
}

export type LayoutAction =
  | { type: 'hamburgerToggle'; payload: boolean }
  | { type: 'loginSignupModalToggle'; payload: boolean }
  | { type: 'cartModalToggle'; payload: boolean }
  | { type: 'cartProduct'; payload: any } // Replace `any` with actual type
  | { type: 'singleProductDetail'; payload: any } // Replace `any` with actual type
  | { type: 'inCart'; payload: any } // Replace `any` with actual type
  | { type: 'cartTotalCost'; payload: any } // Replace `any` with actual type
  | { type: 'loginSignupError'; payload: boolean }
  | { type: 'orderSuccess'; payload: boolean }
  | { type: 'setProducts'; payload: any } // Replace `any` with actual type
  | { type: 'loading'; payload: boolean };

export const layoutState: LayoutState = {
  navberHamburger: false,
  loginSignupModal: false,
  loginSignupError: false,
  cartModal: false,
  cartProduct: null,
  singleProductDetail: null,
  inCart: null,
  cartTotalCost: null,
  orderSuccess: false,
  products: null,
  loading: false,
};

export const layoutReducer = (
  state: LayoutState,
  action: LayoutAction
): LayoutState => {
  switch (action.type) {
    case 'hamburgerToggle':
      return {
        ...state,
        navberHamburger: action.payload,
      };
    case 'loginSignupModalToggle':
      return {
        ...state,
        loginSignupModal: action.payload,
      };
    case 'cartModalToggle':
      return {
        ...state,
        cartModal: action.payload,
      };
    case 'cartProduct':
      return {
        ...state,
        cartProduct: action.payload,
      };
    case 'singleProductDetail':
      return {
        ...state,
        singleProductDetail: action.payload,
      };
    case 'inCart':
      return {
        ...state,
        inCart: action.payload,
      };
    case 'cartTotalCost':
      return {
        ...state,
        cartTotalCost: action.payload,
      };
    case 'loginSignupError':
      return {
        ...state,
        loginSignupError: action.payload,
      };
    case 'orderSuccess':
      return {
        ...state,
        orderSuccess: action.payload,
      };
    case 'setProducts':
      return {
        ...state,
        products: action.payload,
      };
    case 'loading':
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};

interface LayoutContextProps {
  state: LayoutState;
  dispatch: Dispatch<LayoutAction>;
}

export const LayoutContext = createContext<LayoutContextProps>({
  state: layoutState,
  dispatch: () => null,
});

const LayoutProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(layoutReducer, layoutState);
  const id = uuidv4();

  const [errorName, setErrorName] = useState('');
  const [errorPhone, setErrorPhone] = useState('');
  const [isInput, setInput] = useState(false);
  const [interestText, setInterestText] = useState('');
  const [phone, setPhone] = useState('');
  const [contactMethod, setContactMethod] = useState(''); // To track the contact method (whatsapp or call)

  const closePopup = () => {
    setInput(false);
    setErrorName('');
    setErrorPhone('');
  };

  const handleWhatsAppClick = () => {
    setContactMethod('Whatsapp');
    setInput(true);
  };

  const handleCallClick = () => {
    setContactMethod('Call');
    setInput(true);
  };

  const handleContact = async (contactMethod: string, Name: string) => {
    console.log('contact');
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

    // If validation passes, continue with the contact
    await postCarFormData(id, interestText, phone, contactMethod, Name);
    setInput(false);
    // setShowConfirmation(true); // Show confirmation popup after data is sent
    // Reset state variables to their initial values
    if (contactMethod === 'Whatsapp') {
      handleEnquiry();
    } else if (contactMethod === 'Call') {
      window.location.href = 'tel:+919900204243';
    }
    setInterestText('');
    setPhone('');
  };

  const handleEnquiry = () => {
    const message = encodeURIComponent(`Hey Pran Motors, I am looking for `);
    window.open(`https://wa.me/+919900204243?text=${message}`, '_blank');
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;
    // Remove non-digit characters
    inputValue = inputValue.replace(/\D/g, '');
    // Limit the input to 10 digits
    inputValue = inputValue.slice(0, 10);
    // Set phone number
    setPhone(inputValue);
  };

  const pathname = usePathname(); // Get the current pathname

  // Define a function to check if the current route is an admin route
  const isAdminRoute = () => {
    return pathname.startsWith('/admin');
  };

  return (
    <LayoutContext.Provider value={{ state, dispatch }}>
      {!isAdminRoute() && <Navbar />}
      {children}
      {!isAdminRoute() && <Footer />}
      {!isAdminRoute() && <div
        className="fixed bottom-0 left-0 right-0 z-30 flex justify-around md:hidden"
        style={{ background: '#303031' }}
      >
        <button
          className="text-white py-2 w-1/2 px-4 flex justify-center items-center"
          onClick={handleCallClick}
          style={{ backgroundColor: '#5356FF' }}
        >
          <svg
            style={{ paddingRight: '2px', backgroundColor: '#5356FF' }}
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-telephone-fill"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"
            />
          </svg>
          Call
        </button>
        <button
          className="text-white py-2 w-1/2 px-4 flex justify-center items-center"
          onClick={handleWhatsAppClick}
          style={{ backgroundColor: '#25d366' }}
        >
          <svg
            style={{ paddingRight: '2px', backgroundColor: '#25d366' }}
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="currentColor"
            className="bi bi-whatsapp"
            viewBox="0 0 16 16"
          >
            <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
          </svg>
          WhatsApp
        </button>
      </div> }
      {!isAdminRoute() &&<div
        onClick={handleCallClick}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '100px',
          zIndex: '30',
          cursor: 'pointer',
        }}
        className="md:block hidden"
      >
        <svg
          className="p-2 rounded-full"
          style={{ backgroundColor: '#5356FF' }}
          width="60px"
          height="60px"
          viewBox="0 0 24 24"
          fill="#ffffff"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9.52024 7.76662C9.33885 7.35303 9.13737 7.34298 8.96603 7.34298C8.81477 7.33294 8.65288 7.33294 8.48154 7.33294C8.32083 7.33294 8.04845 7.3932 7.81684 7.64549C7.58464 7.89719 6.95007 8.49217 6.95007 9.71167C6.95007 10.9318 7.83693 12.1111 7.95805 12.2724C8.07858 12.4337 9.67149 15.0139 12.192 16.0124C14.2883 16.839 14.712 16.6777 15.1657 16.6269C15.6189 16.5767 16.6275 16.0325 16.839 15.4476C17.0405 14.8733 17.0405 14.3693 16.9802 14.2682C16.9199 14.1678 16.748 14.1069 16.5064 13.9758C16.2541 13.8552 15.0446 13.2502 14.813 13.1693C14.5808 13.0889 14.4195 13.0487 14.2582 13.2904C14.0969 13.5427 13.623 14.0969 13.4724 14.2582C13.3306 14.4195 13.1799 14.4396 12.9377 14.3185C12.686 14.1979 11.8895 13.9356 10.9418 13.0889C10.2056 12.4331 9.71167 11.6171 9.56041 11.3755C9.41979 11.1232 9.54032 10.992 9.67149 10.8709C9.78257 10.7604 9.92378 10.579 10.0449 10.4378C10.1654 10.296 10.2056 10.1855 10.2966 10.0242C10.377 9.86292 10.3368 9.71167 10.2765 9.59114C10.2157 9.48006 9.74239 8.26056 9.52024 7.76662Z"
              stroke="#ffffff"
              strokeLinejoin="round"
            ></path>
          </g>
        </svg>
      </div>}
      {!isAdminRoute() &&<div
        onClick={handleWhatsAppClick}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: '30',
          cursor: 'pointer',
        }}
        className="md:block hidden"
      >
        <svg
          style={{ backgroundColor: '#25d366' }}
          xmlns="http://www.w3.org/2000/svg"
          width="60px"
          height="60px"
          fill="#ffffff"
          className="bi bi-whatsapp p-2 rounded-full"
          viewBox="0 0 16 16"
        >
          <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
        </svg>
      </div>}
      {isInput && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div
            className="relative bg-white p-4 rounded shadow-lg"
            style={{ width: '400px' }}
          >
            <span
              className="absolute top-0 right-0 font-bold cursor-pointer"
              onClick={closePopup}
            >
              &#x2715;
            </span>
            <h2 className="text-xl mb-4">Enter Your Details</h2>
            <input
              className="border p-2 mb-2 w-full"
              type="text"
              placeholder="Enter your name"
              value={interestText}
              onChange={(e) => setInterestText(e.target.value)}
            />
            {errorName && <p className="text-red-500 text-sm"> {errorName} </p>}
            <input
              className="border p-2 mb-2 w-full"
              type="text"
              placeholder="Enter your phone number"
              value={phone}
              onChange={handlePhoneChange}
            />
            {errorPhone && (
              <p className="text-red-500 text-sm"> {errorPhone} </p>
            )}
            <button
              style={{ background: '#d20062' }}
              className="text-white px-4 py-2 rounded w-full"
              onClick={() => handleContact(contactMethod, interestText)}
            >
              {contactMethod} Us!
            </button>
          </div>
        </div>
      )}
    </LayoutContext.Provider>
  );
};

export default LayoutProvider;
