'use client';
import React, { Fragment, useState, useEffect } from 'react';
import moment from 'moment';
import bgImage from './PRAN MOTORS Red11.png';
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  const [windowWidth, setWindowWidth] = useState<number>(0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);
  return (
    <Fragment>
      <footer
        style={{
          background: '#303031',
          color: '#87898A',
          marginBottom: windowWidth <= 768 ? '20px' : '0px',
        }}
        className="z-10 py-6 lg:px-0 px-4 md:px-12 text-center"
      >
        <div className="flex flex-col md:flex-row justify-between">
          {/* Left Section */}
          <div className="flex flex-col md:pl-20">
            <Link
              href={'/'}
              style={{ letterSpacing: '0.70rem', margin: 'auto' }}
              className="p-2 lg:block flex items-left col-span-1 text-center text-gray-800 font-bold tracking-widest uppercase text-2xl cursor-pointer"
            >
              <Image
                    loading='lazy'
                src={bgImage}
                alt="Italian Trulli"
                
                height={100}
              />
            </Link>
            <div>
              {/* Company Info */}
              <h2 className="font-bold">
                Pran Motors(Pre-Owned)- Best price Guaranteed
              </h2>
              <p>Address: Pran Motors, Sy No. 75/2, Sulikunte, </p>
              <p>Dommasandra Post, Sarjapura Road, </p>
              <p>Bengaluru - 562125</p>
            </div>
            <div className="flex justify-center">
              {/* Social Media Links */}
              <div className="flex flex-col p-5">
                <a
                  href="https://www.facebook.com/people/Pran-Motors-Pre-Owned/61557625513527/?mibextid=WC7FNe&rdid=GdJ5KrHPapEbvsnL"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="facebook"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24px"
                    height="24px"
                    viewBox="0 0 21.85 21.85"
                  >
                    <path
                      d="M837.992,276.108h-15.45a3.2,3.2,0,0,0-3.2,3.2v15.45a3.2,3.2,0,0,0,3.2,3.2h6.445v-7.724h-2.561v-3.841h2.561v-2.6a3.845,3.845,0,0,1,3.841-3.841h3.884v3.838h-3.884v2.6h3.884l-.64,3.841h-3.244v7.725h5.164a3.2,3.2,0,0,0,3.2-3.2h0V279.308a3.2,3.2,0,0,0-3.2-3.2Z"
                      transform="translate(-819.342 -276.108)"
                      fill="#fff"
                    ></path>
                  </svg>
                </a>
              </div>
              <div className="flex flex-col p-5">
                <a
                  href="https://www.instagram.com/pranmotors/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="instagram"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24px"
                    height="24px"
                    viewBox="0 0 33 33"
                  >
                    <path
                      fill="#fff"
                      d="M23.338 0H8.662C3.886 0 0 3.886 0 8.662v14.676C0 28.114 3.886 32 8.662 32h14.676C28.114 32 32 28.114 32 23.338V8.662C32 3.886 28.114 0 23.338 0zM16 24.75c-4.825 0-8.75-3.925-8.75-8.75S11.175 7.25 16 7.25s8.75 3.925 8.75 8.75-3.925 8.75-8.75 8.75zm8.959-15.436c-1.426 0-2.585-1.16-2.585-2.585s1.16-2.586 2.585-2.586 2.586 1.16 2.586 2.586-1.16 2.585-2.586 2.585z"
                    ></path>
                    <path
                      fill="#fff"
                      d="M16 9.126c-3.79 0-6.874 3.084-6.874 6.874S12.21 22.874 16 22.874c3.79 0 6.874-3.084 6.874-6.874S19.79 9.126 16 9.126zM24.959 6.019a.71.71 0 10.001 1.42.71.71 0 00-.001-1.42z"
                    ></path>
                  </svg>
                </a>
              </div>
              <div className="flex flex-col p-5">
                <a
                  href="https://www.linkedin.com/company/pran-motors/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="instagram"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="white"
                    className="bi bi-linkedin"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          {/* Right Section */}
          <div className="flex flex-col md:pr-40">
            <div className="flex flex-col md:flex-row justify-between">
              {/* Links */}
              <div className="flex flex-col pb-4">
                <h3 className="font-bold text-xl p-1">Pages</h3>
                <div className="flex flex-col md:flex-row justify-between">
                  <div className="flex flex-col px-5">
                    <ul>
                      <li>
                        <Link href={'/about-us'}
                          className="hover:underline cursor-pointer"
                        >
                          About Us
                        </Link>
                      </li>
                      <Link className="hover:underline" href={'/blogs'}>
                        Blog
                      </Link>
                      <li>
                        <Link
                          className="hover:underline cursor-pointer"
                          href={'/faqs'}
                        >
                          FAQs
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="flex flex-col px-5">
                    <ul>
                      <li>
                        <Link
                          href="https://g.co/kgs/bK432c3"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline cursor-pointer"
                          aria-label="google_reviews"
                        >
                          Reviews
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="hover:underline cursor-pointer"
                          href={'/contact-us'}
                        >
                          Contact Us
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="hover:underline cursor-pointer"
                          href={"https://www.linkedin.com/company/pran-motors/"}
                          aria-label="linkedin"
                        >
                          Careers
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="flex flex-col pb-4 px-10">
                <h3 className="font-bold text-xl p-1">Legal</h3>
                <ul>
                  <li>
                    <Link
                      className="hover:underline cursor-pointer"
                      href={'/privacy-policy'}
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="hover:underline cursor-pointer"
                      href={'/terms-and-conditions'}
                    >
                      Terms and Conditions
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="flex flex-col pb-4 px-10">
                <h3 className="font-bold text-xl p-1">Quick Links</h3>
                <ul>
                  <li>
                    <Link className="hover:underline" href="/all-products">
                      Used Cars in Bangalore
                    </Link>
                  </li>
                  <li>
                    <Link href="/all-products">Car for Sale</Link>
                  </li>
                  <li>
                    <a className="hover:underline" href="#">
                      Buy Old Car
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* Copyright Message */}
        <div>Pran Motors © Copyright {moment().format('YYYY')}</div>
      </footer>
    </Fragment>
  );
};

export default Footer;
