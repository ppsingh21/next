import Image from 'next/image';
import React, { useState, useEffect, Fragment } from 'react';
import popup from './popup.png';

interface PopUpProps {
  value: {
    pOffer: number;
    pPrice: number;
    productId: string;
  };
}

const DiscountPopup: React.FC<PopUpProps> = (props) => {
  const [show, setShow] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
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

    const hours = Math.floor(difference / (1000 * 60 * 60));
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const seconds = Math.floor((difference / 1000) % 60);
    return { hours, minutes, seconds };
  };

  useEffect(() => {
    const hasShown = localStorage.getItem(`discountPopupShown_${props.value.productId}`);
    if (!hasShown) {
      setTimeout(() => {
        setShow(true);
      }, 1); // Show popup after 10 seconds 10000
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
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="md:w-96 w-80 md:aspect-1 md:flex md:flex-row bg-white md:justify-center md:items-center shadow-lg md:rounded-l-lg md:rounded-none rounded-lg p-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2 text-pran-red">Sale</h2>
              <p className="text-lg mb-2">Upto {props.value.pOffer}% OFF</p>
              <p className="text-lg mb-4">
                Discount of Upto{' '}
                {(props.value.pPrice * props.value.pOffer) /
                  (100 - props.value.pOffer)}
              </p>
              <p className="text-lg mb-4">Hurry and book a test drive today!</p>
              <div className="text-xl font-bold mb-4">
                <span>{timeLeft.hours}</span> hrs{' '}
                <span>{timeLeft.minutes}</span> mins{' '}
                <span>{timeLeft.seconds}</span> secs left
              </div>
              <Image 
              src={popup}
              alt="Discount Image" 
              className="w-full mb-4 md:hidden" 
              width={100}
              height={100}
              loading='eager'
              priority
              />
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
          <div className='w-96 hidden md:block'>
              <Image 
                src={popup}
                alt="Discount Image" 
                className="w-full rounded-r-lg shadow-lg aspect-1 object-cover overflow-hidden" 
                width={100}
                height={100}
                loading='eager'
                priority
                />
            </div>
        </div>
      )}
    </Fragment>
  );
};

export default DiscountPopup;
