'use client';
import React, { Fragment, useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import './style.css';
import bgImage from './PRAN MOTORS Red1.png';
import { LayoutContext } from '../layout/layoutContext';

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { state, dispatch } = useContext(LayoutContext);

  const navberToggleOpen = () =>
    dispatch({ type: 'hamburgerToggle', payload: !state.navberHamburger });

  const loginModalOpen = () =>
    state.loginSignupModal
      ? dispatch({ type: 'loginSignupModalToggle', payload: false })
      : dispatch({ type: 'loginSignupModalToggle', payload: true });

  const cartModalOpen = () =>
    state.cartModal
      ? dispatch({ type: 'cartModalToggle', payload: false })
      : dispatch({ type: 'cartModalToggle', payload: true });

  return (
    <Fragment>
      {/* Navbar Section */}
      <nav className="p-1 z-20 shadow-lg lg:shadow-none bg-white w-full">
        <div
          className="m-4 md:mx-12 md:my-6 grid grid-cols-3 lg:grid-cols-3 items-center"
          style={{ marginTop: '5px', marginBottom: '5px' }}
        >
          <div className="hidden lg:block col-span-1 flex text-gray-600 mt-1">
            <Link
              className="hover:bg-gray-200 px-4 py-3 rounded-lg tracking-wide hover:text-gray-800 cursor-pointer"
              href="/contact-us"
            >
              Contact us
            </Link>
          </div>
          <div className="col-span-2 lg:hidden flex justify-items-stretch items-center">
            {/* Hamburger Icon */}
            <div className="col-span-1 flex text-gray-600 lg:hidden mt-1">
              <svg
                onClick={navberToggleOpen}
                className="w-8 h-8 cursor-pointer text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {state.navberHamburger ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12h18M3 6h18M3 18h18"
                  />
                )}
              </svg>
            </div>
            <Link
              href="/"
              style={{ letterSpacing: '0.10rem' }}
              className="pl-2"
            >
              <Image
                    loading='lazy' src={bgImage} alt="Logo" height={35} />
            </Link>
          </div>
          <Link
            href="/"
            style={{ letterSpacing: '0.70rem', margin: 'auto' }}
            className="hidden lg:block flex items-left col-span-1 text-center text-gray-800 font-bold tracking-widest uppercase text-2xl cursor-pointer"
          >
            <Image
                    loading='lazy' src={bgImage} alt="Logo" height={90} />
          </Link>
          <div className="flex items-right col-span-1 lg:col-span-1 justify-end">
            {/* WishList Page Button */}
            <Link
              href="/wish-list"
              className="hover:bg-gray-200 rounded-lg px-2 py-2 cursor-pointer flex flex-col items-center"
              title="Wishlist"
            >
              <svg
                className={`${
                  pathname === '/wish-list' ? 'fill-current text-gray-800' : ''
                } w-8 h-8 text-gray-600 cursor-pointer`}
                fill="none"
                stroke="currentColor"
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
              <p className="text-gray-600 font-semibold">Wishlist</p>
            </Link>
          </div>
        </div>
        <div
          className={
            state.navberHamburger
              ? 'px-1 pb-2 md:pb-0 md:px-10 lg:hidden'
              : 'hidden px-1 pb-2 md:pb-0 md:px-10 lg:hidden'
          }
        >
          <div className="col-span-1 flex flex-col text-gray-600">
            <Link
              className="font-medium text-lg tracking-widest hover:text-gray-800 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer"
              href="/"
            >
              Shop
            </Link>
            <Link
              className="font-medium text-lg tracking-widest hover:text-gray-800 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer"
              href="/blog"
            >
              Blog
            </Link>
            <Link
              className="font-medium text-lg tracking-widest hover:text-gray-800 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer"
              href="/contact-us"
            >
              Contact us
            </Link>
          </div>
        </div>
      </nav>
      {/* End Navbar Section */}
    </Fragment>
  );
};

export default Navbar;
