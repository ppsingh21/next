'use client';
import React, { Fragment, useState, useEffect } from 'react';
import logo from './pran.png';
import warranty from './Asset 3.png';
import EmiCalculator from './EmiCal';
import capital from './Asset 1.png';
import buyback from './Asset 2.png';
import inspection from './Asset 4.png';
import warrantylogo from './warranty.png';
import inspectionlogo from './tag.png';
import Image from 'next/image';

const ExploreMore = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [isHove, setIsHove] = useState(false);
  const [isHver, setIsHver] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleCheckEligibilityClick = () => {
    setIsPopupVisible(true);
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleClick = () => {
    const phoneNumber = '919900204243'; // Replace with your phone number in international format, e.g., 1234567890 for +1 234 567 890
    const message =
      "Hi Pran Motors, I'm looking for financing option for a car";
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
  };

  const handleBuyback = () => {
    const phoneNumber = '919900204243'; // Replace with your phone number in international format, e.g., 1234567890 for +1 234 567 890
    const message = 'Hi Pran Motors, I want to sell back my car';
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
  };

  const handleWarranty = () => {
    const phoneNumber = '919900204243'; // Replace with your phone number in international format, e.g., 1234567890 for +1 234 567 890
    const message = 'Hi Pran Motors, I want to know more about car warranty';
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
  };

  const handleInspection = () => {
    const phoneNumber = '919900204243'; // Replace with your phone number in international format, e.g., 1234567890 for +1 234 567 890
    const message = 'Hi Pran Motors, I want to know more about car inspection';
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
  };

  return (
    <Fragment>
      <div className="flex flex-col justify-center items-center py-10 space-y-4">
        <div className="flex flex-row justify-center items-center space-x-2 lg:pb-16">
          {isClient && window.innerWidth > 768 && (
            <div
              style={{
                width: '400px',
                height: '1px', // Adjust height as needed
                background: 'linear-gradient(to right, transparent, gray)', // Fading effect
              }}
            ></div>
          )}
          <h2 className="text-2xl font-bold">Explore More</h2>
          {isClient && window.innerWidth > 768 && (
            <div
              style={{
                width: '400px',
                height: '1px', // Adjust height as needed
                background: 'linear-gradient(to left, transparent, gray)', // Fading effect
              }}
            ></div>
          )}
        </div>
        {isClient && window.innerWidth <= 768 ? (
          <div className="flex lg:flex-row flex-col justify-center">
            <div className="relative flex flex-col justify-center items-center p-4  rounded-lg m-4">
              <Image
                loading="eager"
                            
                style={{ width: '300px' }}
                src={capital}
                alt="capital"
              />
              <h3
                style={{ top: '30px' }}
                className="z-30 absolute flex flex-row text-lg justify-center items-center font-semibold"
              >
                <Image
                  loading="eager"
                            
                  src={logo}
                  style={{ width: '16px', height: '16px' }}
                  alt="logo"
                />
                <p>Capital</p>
              </h3>
              <p style={{ top: '60px' }} className="z-30 absolute text-sm">
                Get your car licensed today
              </p>
              <div
                className="z-30 absolute mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
                onClick={handleCheckEligibilityClick}
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
                style={{
                  background: isHover ? '#32012F' : '#f71979',
                  top: '180px',
                }}
              >
                Check Eligibility
              </div>
            </div>
            <div className="relative flex flex-col justify-center items-center p-4   rounded-lg mx-4">
              <Image
                loading="eager"
                            
                style={{ width: '300px' }}
                src={buyback}
                alt="buyback"
              />
              <h3
                style={{ top: '30px' }}
                className="z-30 absolute flex flex-row text-lg justify-center items-center font-semibold"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16px"
                  height="16px"
                  fill="currentColor"
                  className="bi bi-coin"
                  viewBox="0 0 16 16"
                >
                  <path d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518z" />
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                  <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11m0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12" />
                </svg>
                <p>Buyback</p>
              </h3>
              <p style={{ top: '60px' }} className="text-sm absolute z-30">
                Commit less, buy more
              </p>
              <div
                onClick={handleBuyback}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{
                  background: isHovered ? '#32012F' : '#f71979',
                  top: '180px',
                }}
                className="z-30 absolute mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Explore Buyback
              </div>
            </div>
            <div className="relative flex flex-col justify-center items-center p-4   rounded-lg mx-4">
              <Image
                loading="eager"
                            
                style={{ width: '300px' }}
                src={warranty}
                alt="warranty"
              />
              <h3
                style={{ top: '30px' }}
                className="z-30 absolute flex flex-row text-lg justify-center items-center font-semibold"
              >
                <Image
                  loading="eager"
                            
                  src={warrantylogo}
                  style={{ width: '20px', height: '20px' }}
                  alt="warrantylogo"
                />
                <p>Warranty</p>
              </h3>
              <p style={{ top: '60px' }} className="text-sm absolute z-30">
                Know more about warranty
              </p>
              <div
                onClick={handleWarranty}
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
                style={{
                  background: isHover ? '#32012F' : '#f71979',
                  top: '180px',
                }}
                className="z-30 absolute mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Explore Warranty
              </div>
            </div>
            <div className="relative flex flex-col justify-center items-center p-4   rounded-lg mx-4">
              <Image
                loading="eager"
                            
                style={{ width: '300px' }}
                src={inspection}
                alt="inspection"
              />
              <h3
                style={{ top: '30px' }}
                className="z-30 absolute flex flex-row text-lg justify-center items-center font-semibold"
              >
                <Image
                  loading="eager"
                            
                  src={inspectionlogo}
                  style={{ width: '20px', height: '20px' }}
                  alt="inspectionlogo"
                />
                <p>Inspection</p>
              </h3>
              <p style={{ top: '60px' }} className="text-sm absolute z-30">
                Know more about inspection process
              </p>
              <div
                onClick={handleInspection}
                onMouseEnter={() => setIsHver(true)}
                onMouseLeave={() => setIsHver(false)}
                style={{
                  background: isHver ? '#32012F' : '#f71979',
                  top: '180px',
                }}
                className="z-30 absolute mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Know More
              </div>
            </div>
          </div>
        ) : (
          <div className="flex lg:flex-row flex-col justify-center items-center">
            <div className="relative flex flex-col justify-center items-center p-4  rounded-lg mx-4">
              <Image
                loading="eager"
                            
                style={{ width: '300px' }}
                src={capital}
                alt="demo"
              />
              <h3
                style={{ top: '30px' }}
                className="z-30 absolute flex flex-row text-lg justify-center items-center font-semibold"
              >
                <Image
                  loading="eager"
                            
                  src={logo}
                  style={{ width: '16px', height: '16px' }}
                  alt="logo"
                />
                <p>Capital</p>
              </h3>
              <p style={{ top: '60px' }} className="z-30 absolute text-sm">
                Get your car licensed today
              </p>
              <div
                className="z-30 cursor-pointer absolute mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
                onClick={handleCheckEligibilityClick}
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
                style={{
                  background: isHover ? '#32012F' : '#f71979',
                  top: '250px',
                }}
              >
                Check Eligibility
              </div>
            </div>
            <div className="relative flex flex-col justify-center items-center p-4   rounded-lg mx-4">
              <Image
                loading="eager"
                            
                style={{ width: '300px' }}
                src={buyback}
                alt="demo"
              />
              <h3
                style={{ top: '30px' }}
                className="z-30 absolute flex flex-row text-lg justify-center items-center font-semibold"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16px"
                  height="16px"
                  fill="currentColor"
                  className="bi bi-coin"
                  viewBox="0 0 16 16"
                >
                  <path d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518z" />
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                  <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11m0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12" />
                </svg>
                <p>Buyback</p>
              </h3>
              <p style={{ top: '60px' }} className="text-sm absolute z-30">
                Commit less, buy more
              </p>
              <div
                onClick={handleBuyback}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{
                  background: isHovered ? '#32012F' : '#f71979',
                  top: '250px',
                }}
                className="z-30 absolute cursor-pointer mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Explore Buyback
              </div>
            </div>
            <div className="relative flex flex-col justify-center items-center p-4  rounded-lg mx-4">
              <Image
                loading="eager"
                            
                style={{ width: '300px' }}
                src={warranty}
                alt="warranty"
              />
              <h3
                style={{ top: '30px' }}
                className="z-30 absolute flex flex-row text-lg justify-center items-center font-semibold"
              >
                <Image
                  loading="eager"
                            
                  src={warrantylogo}
                  style={{ width: '20px', height: '20px' }}
                  alt="warrantylogo"
                />
                <p>Warranty</p>
              </h3>
              <p style={{ top: '60px' }} className="z-30 absolute text-sm">
                Know more about warranty
              </p>
              <div
                className="z-30 absolute mt-2 cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-md"
                onClick={handleWarranty}
                onMouseEnter={() => setIsHove(true)}
                onMouseLeave={() => setIsHove(false)}
                style={{
                  background: isHove ? '#32012F' : '#f71979',
                  top: '250px',
                }}
              >
                Explore Warranty
              </div>
            </div>
            <div className="relative flex flex-col justify-center items-center p-4  rounded-lg mx-4">
              <Image
                loading="eager"
                            
                style={{ width: '300px' }}
                src={inspection}
                alt="inspection"
              />
              <h3
                style={{ top: '30px' }}
                className="z-30 absolute flex flex-row text-lg justify-center items-center font-semibold"
              >
                <Image
                  loading="eager"
                            
                  src={inspectionlogo}
                  style={{ width: '20px', height: '20px' }}
                  alt="inspectionlogo"
                />
                <p>Inspection</p>
              </h3>
              <p style={{ top: '60px' }} className="z-30 absolute text-sm">
                Know more about inspection process
              </p>
              <div
                className="z-30 absolute cursor-pointer mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
                onClick={handleInspection}
                onMouseEnter={() => setIsHver(true)}
                onMouseLeave={() => setIsHver(false)}
                style={{
                  background: isHver ? '#32012F' : '#f71979',
                  top: '250px',
                }}
              >
                Know More
              </div>
            </div>
          </div>
        )}
      </div>
      {isPopupVisible && (
        <div className="fixed flex-col inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div
            className="bg-white p-6 rounded-lg shadow-lg relative"
            style={{
              width: isClient && window.innerWidth <= 768 ? '100%' : '50%',
            }}
          >
            <div
              className="absolute cursor-pointer top-2 right-2 text-gray-600"
              onClick={handleClosePopup}
              style={{ right: '10px', top: '10px' }}
            >
              {' '}
              {/* Adjusted the position */}
              &#x2715;
            </div>
            <EmiCalculator />
            <div
              style={{ background: isHovered ? '#a21452' : '#f71979' }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={handleClick}
              className="py-4 px-20 rounded-lg cursor-pointer text-center text-white mt-4"
            >
              Check Eligibility
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default ExploreMore;
