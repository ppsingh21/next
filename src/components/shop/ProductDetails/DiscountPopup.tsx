import Image from 'next/image';
import React, { useState, useEffect, Fragment } from 'react';
import popup from './2150167585.jpg';

interface PopUpProps {
  value: {
    pOffer: string;
    pPrice: number;
    productId: string;
  };
}

const DiscountPopup: React.FC<PopUpProps> = (props) => {
  const [show, setShow] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const calculateTimeLeft = () => {
    const now = new Date();
    const nextSunday = new Date(now);
    nextSunday.setDate(now.getDate() + ((7 - now.getDay()) % 7));
    nextSunday.setHours(23, 59, 59, 999);

    const difference = +nextSunday - +now;

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const seconds = Math.floor((difference / 1000) % 60);
    return { days, hours, minutes, seconds };
  };

  useEffect(() => {
    const hasShown = localStorage.getItem(`discountPopupShown_${props.value.productId}`);
    if (!hasShown) {
      setTimeout(() => {
        setShow(true);
      }, 5000); // Show popup after 5 seconds 
    }
  }, [props.value.productId]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleEnquireNowClick = () => {
    localStorage.setItem(`discountPopupShown_${props.value.productId}`, 'true');
    setShow(false);
    if (window.innerWidth <= 768) {
      window.scroll({
        top: 300, // Change this value to the position you want to scroll to
        behavior: 'smooth',
      });
    }
    if (window.fbq) {
      // Add Facebook Pixel tracking for Enquiry
      window.fbq('track', 'Lead', {
        event_category: 'Enquiry',
        event_label: 'Enquire Now Button Click',
      });
    }
    console.log('Enquiry Now Clicked');
  };

  const handleClose = () => {
    localStorage.setItem(`discountPopupShown_${props.value.productId}`, 'true');
    setShow(false);
  };

  return (
    <Fragment>
      {show && (
        <div className="fixed inset-0 flex flex-col md:flex-row justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="md:w-96 w-80 md:aspect-1 flex bg-white justify-center items-center shadow-lg md:rounded-l-lg md:rounded-none rounded-t-lg py-6 px-2 relative">
            <button
              className="md:hidden block text-3xl absolute top-2 right-2 text-black hover:text-gray-700"
              onClick={handleClose}
            >
              &times;
            </button>
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2 text-pran-red">Independence Day Sale</h2>
              <p className="text-lg mb-2">{props.value.pOffer}%{' '}OFF{' '}&{' '}Discount{' '}of{' '}Rs.{' '}
                {isNaN(props.value.pPrice) || 
                isNaN(parseFloat(props.value.pOffer)) 
                ? "Invalid price or offer"
                : (Math.round((props.value.pPrice * parseFloat(props.value.pOffer)) /
                  (100 - parseFloat(props.value.pOffer)) /1000) * 1000).toLocaleString() }{'!'}
              </p>
              <p className="text-lg mb-4">Hurry and book a test drive today!</p>
              <div className="text-xl font-bold mb-4">
                <span>{timeLeft.days}</span> days{' '}
                <span>{timeLeft.hours}</span> hrs{' '}
                <span>{timeLeft.minutes}</span> mins left
              </div>
              <button
                className="w-full py-2 mb-2 bg-pran-red hover:bg-gray-700 text-white rounded"
                onClick={handleEnquireNowClick}
              >
                BOOK YOUR CAR NOW
              </button>
              <button
                className="w-full py-2 bg-gray-300 text-black hover:bg-gray-400 rounded"
                onClick={handleClose}
              >
                NO, THANKS
              </button>
            </div>
          </div>
          <div className='md:w-96 w-80 relative'>
          <button
              className="hidden md:block text-3xl absolute top-2 right-2 hover:text-gray-500 text-black"
              onClick={handleClose}
            >
              &times;
            </button>
            <Image 
              src={popup}
              alt="Discount Image" 
              className="w-full md:rounded-r-lg md:rounded-none rounded-b-lg shadow-lg border-white border-2 aspect-1 object-cover overflow-hidden" 
              width={100}
              height={100}
              loading='eager'
            />
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default DiscountPopup;
