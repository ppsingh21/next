import React, { useState, useEffect, Fragment } from 'react';

interface PopUpProps {
    value: {
        pOffer: number;
        pPrice: number;
    };
}
const DiscountPopup: React.FC<PopUpProps> = (props) => {
    const [show, setShow] = useState(true);
    const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

    const calculateTimeLeft = () => {
      const now = new Date();
      const nextSunday = new Date(now);
      nextSunday.setDate(now.getDate() + (7 - now.getDay()) % 7);
      nextSunday.setHours(23, 59, 59, 999);
  
      const difference = +nextSunday - +now;
  
      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);
      return { hours, minutes, seconds };
    };
  
    useEffect(() => {
      const timer = setInterval(() => {
        setTimeLeft(calculateTimeLeft());
      }, 1000);
  
      return () => clearInterval(timer);
    }, []);

    const handleEnquireNowClick = () => {
        window.open(
            `https://appt.link/meet-with-pran-motors-iSjzdF1o/car-test-drive`,
            '_blank'
          );
        if (window.fbq) {
          // Add Facebook Pixel tracking for Enquiry
          window.fbq('track', 'Lead', {
            event_category: 'Enquiry',
            event_label: 'Enquire Now Button Click',
          });
        }
        console.log('Enquiry Now Clicked');
      };

  return (
    <Fragment>
      {show && 
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="w-80 bg-white shadow-lg rounded-lg p-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2 text-pran-red">Sale</h2>
              <p className="text-lg mb-2">Upto {props.value.pOffer}% OFF</p>
              <p className="text-lg mb-4">Discount of Upto {props.value.pPrice * props.value.pOffer / (100 - props.value.pOffer)}</p>
              <p className="text-lg mb-4">Hurry and book a test drive today!</p>
              <div className="text-xl font-bold mb-4">
                <span>{timeLeft.hours}</span> hrs <span>{timeLeft.minutes}</span> mins <span>{timeLeft.seconds}</span> secs left
              </div>
              <button className="w-full py-2 mb-2 bg-pran-red hover:bg-gray-700 text-white rounded"
                onClick={handleEnquireNowClick}>BOOK YOUR CAR NOW</button>
              <button className="w-full py-2 bg-gray-300 text-black hover:bg-gray-400 rounded"
                onClick={() => setShow(false)}>NO, THANKS</button>
            </div>
          </div>
        </div>
      }

    </Fragment>
  );
};

export default DiscountPopup;
