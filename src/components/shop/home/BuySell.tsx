import React, { Fragment, useState, useEffect } from 'react';
import inspection from './inspection.png';
import warranty from './warranty1.png';
import moneyback from './moneyback.png';
import addedbenefits from './addedbenifits.png';
import ProductCategory from './ProductCategory';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import './transitions.css'; // Import custom CSS for transitions
import Image from 'next/image';
import Link from 'next/link';
import useIsMobile from './useIsMobile';

const BuySellCarComponent = () => {
  const [buy, setBuy] = useState(true);

  return (
    <Fragment>
      <div className="flex flex-col lg:mx-12 lg:p-8 p-4 m-4 rounded-lg shadow-lg">
        <div className="flex justify-center p-2">
          <div
            className={`slide-background ${buy ? 'active-left' : 'active-right'}`}
          >
            <div className="button-container lg:text-xl px-2">
              <div
                className={`button ${buy ? 'active' : 'inactive'}`}
                onClick={() => setBuy(true)}
              >
                Buy Car
              </div>
              <div
                className={`button ${buy ? 'inactive' : 'active'}`}
                onClick={() => setBuy(false)}
              >
                Sell Car
              </div>
            </div>
          </div>
        </div>
        <div className="relative" style={{ minHeight: '300px' }}>
          <SwitchTransition mode="out-in">
            <CSSTransition
              key={buy ? 'buy' : 'sell'}
              addEndListener={(node, done) =>
                node.addEventListener('transitionend', done, false)
              }
              classNames="slide"
            >
              <div className="w-full">
                {buy ? <BuyCarSection /> : <SellCarSection />}
              </div>
            </CSSTransition>
          </SwitchTransition>
        </div>
      </div>
    </Fragment>
  );
};

const BuyCarSection = () => {
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = useIsMobile();

  return (
    <div>
      <div className="text-center py-6 font-bold text-2xl">
        Pran Motors Advantage
      </div>
      <div className={`flex py-2 lg:space-x-8 space-y-4 text-center justify-center ${isMobile ? 'flex-col' : 'lg:flex-row'}`}>
        <div className="lg:pl-4 lg:pr-2 mt-4">
          <Image src={inspection} alt="inspection" />
          <p className="font-medium text-lg p-2">200-Points Inspection</p>
          <p>
            Every Car is carefully handpicked after a thorough quality
            inspection.
          </p>
        </div>
        <div className="lg:px-2">
          <Image src={warranty} alt="warranty" />
          <p className="font-medium text-lg p-2">Warranty included</p>
          <p>
            Our way of being there for you through your car ownership journey.
          </p>
        </div>
        <div className="lg:px-2">
          <Image src={moneyback} alt="moneyback" />
          <p className="font-medium text-lg p-2">5-Day Money Back</p>
          <p>
            All our cars come with a no- questions-asked 5-day money back
            guarantee.
          </p>
        </div>
        <div className="lg:pl-2 lg:pr-4">
          <Image src={addedbenefits} alt="addedbenefits" />
          <p className="font-medium text-lg p-2">Best Price Assurance</p>
          <p>
            No more endless negotiations or haggling. With Pran Motors, you get
            the best deal upfront and right away.
          </p>
        </div>
      </div>
      <div
        className="flex justify-between items-center lg:p-8 pt-4 space-y-2"
        style={{
          display: 'flex',
          flexDirection: isMobile
            ? 'column'
            : 'row' /* Set to column for screens less than 768px */,
        }}
      >
        <div className="flex flex-row justify-center items-center">
          <svg
            width="27px"
            height="22"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 0.178223C8.96 0.178223 0 9.13822 0 20.1782C0 31.2182 8.96 40.1782 20 40.1782C31.04 40.1782 40 31.2182 40 20.1782C40 9.13822 31.04 0.178223 20 0.178223ZM15 25.5182V14.8382C15 13.2582 16.76 12.2982 18.08 13.1582L26.38 18.4982C27.6 19.2782 27.6 21.0782 26.38 21.8582L18.08 27.1982C16.76 28.0582 15 27.0982 15 25.5182Z"
              fill="#f71979"
            ></path>
          </svg>
          <p>Watch the Film</p>
        </div>
        <Link
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{ background: isHovered ? '#32012F' : '#f71979' }}
          className="text-white p-4 rounded-md cursor-pointer"
          href={'/all-products'}
        >
          Browse Cars
        </Link>
        <div className="flex flex-row">
          <div>Learn More </div>
          <div className="pl-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              stroke="#f71979"
              width="10"
              height="10"
              viewBox="0 0 14 8"
              style={{ transform: 'rotate(-90deg) translate(-9px, 0)' }}
            >
              <path
                fill="none"
                fillRule="evenodd"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M386 48L392 54 398 48"
                transform="translate(-385 -47)"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

const SellCarSection = () => {
  return (
    <div>
      {/* Category, Search & Filter Section */}
      <section className="m-4 lg:pt-16 md:mx-8 md:my-6">
        <ProductCategory />
      </section>
    </div>
  );
};

export default BuySellCarComponent;
