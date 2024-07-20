'use client';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import backgroundImage from './PranAutosContactBG.jpg';

const apiURL = process.env.NEXT_PUBLIC_API_URL as string;

interface FormData {
  email: string;
  name: string;
  number: string;
  message: string;
}

const ContactUs = () => {
  const [form, setForm] = useState(true);
  const [ishover, setIshover] = useState(false);
  const [hover, setHover] = useState(false);

  const postCarFormData = async (
    name: string,
    email: string,
    number: string,
    message: string
  ) => {
    try {
      console.log(name, email, number, message);
      let res = await axios.post(`${apiURL}/api/messages/create-message`, {
        name: name,
        email: email,
        number: number,
        message: message,
      });
      // return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const [formData, setFormData] = useState<FormData>({
    email: '',
    name: '',
    number: '',
    message: '',
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (/^\d{0,10}$/.test(value)) {
      setFormData({
        ...formData,
        number: value,
      });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { email, name, number, message } = formData;
    try {
      await postCarFormData(name, email, number, message);
      setForm(false);
      // Clear form or give feedback to the user
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100%',
        height: '100vh',
      }}
      className="flex flex-col items-center justify-center min-h-screen text-white py-16 px-4"
    >
      <div className="hide-scrollbar flex flex-col md:flex-row lg:max-w-6xl w-full rounded-lg overflow-auto shadow-lg">
        {/* Contact Details */}
        <div className="lg:w-1/2 p-8 text-white">
          <h1 className="text-3xl font-bold mb-4">Contact us</h1>
          <p className="mb-8">
            Leave your email and we will get back to you within 24 hours
          </p>

          <div className="mb-4">
            <div className="flex items-center mb-2">
              <svg
                className="w-6 h-6 mr-2 bi bi-envelope-fill"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z" />
              </svg>
              <div>Email</div>
            </div>
            <a
              className="hover:underline text-white"
              href="mailto:info@pranautos.com"
            >
              info@pranautos.com
            </a>
          </div>

          <div className="mb-4">
            <div className="flex items-center mb-2">
              <svg
                className="w-6 h-6 mr-2 bi bi-telephone-fill"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"
                />
              </svg>
              <div>Phone</div>
            </div>
            <a className="hover:underline text-white" href="tel:+91-9900204243">
              +91-9900204243
            </a>
          </div>

          <div className="mb-4">
            <div className="flex items-center mb-2">
              <svg
                className="w-6 h-6 mr-2 bi bi-buildings-fill"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M15 .5a.5.5 0 0 0-.724-.447l-8 4A.5.5 0 0 0 6 4.5v3.14L.342 9.526A.5.5 0 0 0 0 10v5.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V14h1v1.5a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5zM2 11h1v1H2zm2 0h1v1H4zm-1 2v1H2v-1zm1 0h1v1H4zm9-10v1h-1V3zM8 5h1v1H8zm1 2v1H8V7zM8 9h1v1H8zm2 0h1v1h-1zm-1 2v1H8v-1zm1 0h1v1h-1zm3-2v1h-1V9zm-1 2h1v1h-1zm-2-4h1v1h-1zm3 0v1h-1V7zm-2-2v1h-1V5zm1 0h1v1h-1z" />
              </svg>
              <div>Address</div>
            </div>
            <a
              className="hover:underline text-white"
              href="https://g.co/kgs/fBdMfBg"
              target="_blank"
              rel="noopener noreferrer"
            >
              Pran Motors, Sy No. 75/2, Sulikunte, Dommasandra Post, Sarjapura
              Road, Bengaluru - 562125
            </a>
          </div>

          <div className="mb-4">
            <div className="flex items-center mb-2">
              <svg
                className="w-6 h-6 mr-2 bi bi-sun-fill"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708" />
              </svg>
              <div>Working hours</div>
            </div>
            <div>8 a.m. – 11 p.m.</div>
          </div>

          <div className="flex space-x-4 mt-8">
            <a
              href="https://www.facebook.com/people/Pran-Motors-Pre-Owned/61557625513527/?mibextid=WC7FNe&rdid=GdJ5KrHPapEbvsnL"
              target="_blank"
              rel="noopener noreferrer"
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
            <a
              href="https://www.instagram.com/pranmotors/"
              target="_blank"
              rel="noopener noreferrer"
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
        </div>
        {/* Contact Form */}
        {form ? (
          <div className="lg:w-1/2 bg-white p-8">
            <form className="w-full" onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="email">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  className="w-full p-2 rounded border text-gray-700 border-gray-300"
                  type="email"
                  id="email"
                  name="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  className="w-full p-2 rounded border text-gray-700 border-gray-300"
                  type="text"
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="number">
                  Phone Number
                </label>
                <input
                  className="w-full p-2 rounded border text-gray-700 border-gray-300"
                  type="text"
                  id="number"
                  name="number"
                  placeholder="123-456-7890"
                  value={formData.number}
                  onChange={handleNumberChange}
                  pattern="\d{10}"
                  title="Please enter exactly 10 digits."
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="message">
                  Your message <span className="text-red-500">*</span>
                </label>
                <textarea
                  className="w-full p-2 rounded border text-gray-700 border-gray-300"
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Enter your message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <div className="text-right">
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  type="submit"
                >
                  Send message
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="lg:w-1/2 bg-white p-8 text-gray-700">
            <h1 className="text-xl font-bold mb-4">
              Thank you for contacting us
            </h1>
            <p className="mb-4">We will get back to you soon</p>
            <div className="space-x-2 text-white">
              <Link
                className="rounded-md p-2"
                style={{ background: ishover ? '#d20062' : '#f71979' }}
                href={'/all-products'}
                onMouseEnter={() => setIshover(true)}
                onMouseLeave={() => setIshover(false)}
              >
                Buy a Car
              </Link>
              <button
                className="rounded-md p-2"
                style={{ background: hover ? '#d20062' : '#f71979' }}
                onClick={(e) =>
                  window.open(
                    `https://wa.me/919900204243?text=${encodeURIComponent('Hi Pran Motors, I want to sell my car')}`,
                    '_blank'
                  )
                }
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
              >
                Sell a Car
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactUs;
