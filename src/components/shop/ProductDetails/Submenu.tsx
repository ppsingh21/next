import React, { Fragment, useEffect, useState } from 'react';

interface SubmenuProps {
  value: {
    product: string;
  };
}

const Submenu: React.FC<SubmenuProps> = (props) => {
  const { product } = props.value;
  const [shareMessage, setShareMessage] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setShareMessage(`Hey, Check out this ${product}! Click here: ${window.location.href}`);
    }
  }, [product]);

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

  const shareEmail = (): void => {
    if (typeof window !== 'undefined') {
      window.location.href = `mailto:?body=${encodeURIComponent(shareMessage)}`;
    }
  };

  const shareInstagram = (): void => {
    if (typeof window !== 'undefined') {
    window.open(
      `https://www.instagram.com/?url=${encodeURIComponent(window.location.href)}`
    );
  }
  };

  const shareWhatsApp = (): void => {
    if (typeof window !== 'undefined') {
    window.open(
      `https://api.whatsapp.com/send?text=${encodeURIComponent(shareMessage)}`
    );
  }
  };
  return (
    <Fragment>
      {/* Submenu Section */}
      <section className="py-2 mt-2 md:mx-12 md:mt-32 lg:mt-2">
        <div className="flex flex-row gap-1 justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            className="Kj-yxs"
          >
            <path
              d="M14.78 5.883L9.032 0v3.362C3.284 4.202.822 8.404 0 12.606 2.053 9.666 4.927 8.32 9.032 8.32v3.446l5.748-5.883z"
              fill="#c2c2c2"
              fillRule="evenodd"
            />
          </svg>
          <p>Share with a friend :</p>
          <div className="flex flex-row gap-4 justify-end items-center">
            <div>
              <a href="#" onClick={shareEmail}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20px"
                  height="20px"
                  viewBox="0 0 21.382 17.105"
                >
                  <path
                    id="ic_markunread_24px"
                    d="M21.243,4H4.138A2.135,2.135,0,0,0,2.011,6.138L2,18.967a2.144,2.144,0,0,0,2.138,2.138H21.243a2.144,2.144,0,0,0,2.138-2.138V6.138A2.144,2.144,0,0,0,21.243,4Zm0,4.276-8.553,5.345L4.138,8.276V6.138l8.553,5.345,8.553-5.345Z"
                    transform="translate(-2 -4)"
                    fill="#d20062"
                  ></path>
                </svg>
              </a>
            </div>
            <div>
              <a href="#" onClick={shareInstagram}>
                <svg
                  fill="#d20062"
                  width="20px"
                  height="20px"
                  viewBox="0 0 2476 2476"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path d="M825.4 1238c0-227.9 184.7-412.7 412.6-412.7 227.9 0 412.7 184.8 412.7 412.7 0 227.9-184.8 412.7-412.7 412.7-227.9 0-412.6-184.8-412.6-412.7m-223.1 0c0 351.1 284.6 635.7 635.7 635.7s635.7-284.6 635.7-635.7-284.6-635.7-635.7-635.7S602.3 886.9 602.3 1238m1148-660.9c0 82 66.5 148.6 148.6 148.6 82 0 148.6-66.6 148.6-148.6s-66.5-148.5-148.6-148.5-148.6 66.5-148.6 148.5M737.8 2245.7c-120.7-5.5-186.3-25.6-229.9-42.6-57.8-22.5-99-49.3-142.4-92.6-43.3-43.3-70.2-84.5-92.6-142.3-17-43.6-37.1-109.2-42.6-229.9-6-130.5-7.2-169.7-7.2-500.3s1.3-369.7 7.2-500.3c5.5-120.7 25.7-186.2 42.6-229.9 22.5-57.8 49.3-99 92.6-142.4 43.3-43.3 84.5-70.2 142.4-92.6 43.6-17 109.2-37.1 229.9-42.6 130.5-6 169.7-7.2 500.2-7.2 330.6 0 369.7 1.3 500.3 7.2 120.7 5.5 186.2 25.7 229.9 42.6 57.8 22.4 99 49.3 142.4 92.6 43.3 43.3 70.1 84.6 92.6 142.4 17 43.6 37.1 109.2 42.6 229.9 6 130.6 7.2 169.7 7.2 500.3 0 330.5-1.2 369.7-7.2 500.3-5.5 120.7-25.7 186.3-42.6 229.9-22.5 57.8-49.3 99-92.6 142.3-43.3 43.3-84.6 70.1-142.4 92.6-43.6 17-109.2 37.1-229.9 42.6-130.5 6-169.7 7.2-500.3 7.2-330.5 0-369.7-1.2-500.2-7.2M727.6 7.5c-131.8 6-221.8 26.9-300.5 57.5-81.4 31.6-150.4 74-219.3 142.8C139 276.6 96.6 345.6 65 427.1 34.4 505.8 13.5 595.8 7.5 727.6 1.4 859.6 0 901.8 0 1238s1.4 378.4 7.5 510.4c6 131.8 26.9 221.8 57.5 300.5 31.6 81.4 73.9 150.5 142.8 219.3 68.8 68.8 137.8 111.1 219.3 142.8 78.8 30.6 168.7 51.5 300.5 57.5 132.1 6 174.2 7.5 510.4 7.5 336.3 0 378.4-1.4 510.4-7.5 131.8-6 221.8-26.9 300.5-57.5 81.4-31.7 150.4-74 219.3-142.8 68.8-68.8 111.1-137.9 142.8-219.3 30.6-78.7 51.6-168.7 57.5-300.5 6-132.1 7.4-174.2 7.4-510.4s-1.4-378.4-7.4-510.4c-6-131.8-26.9-221.8-57.5-300.5-31.7-81.4-74-150.4-142.8-219.3C2199.4 139 2130.3 96.6 2049 65c-78.8-30.6-168.8-51.6-300.5-57.5-132-6-174.2-7.5-510.4-7.5-336.3 0-378.4 1.4-510.5 7.5"></path>
                  </g>
                </svg>
              </a>
            </div>
            <div>
              <a href="#" onClick={shareWhatsApp}>
                <svg
                  height="20px"
                  width="20px"
                  version="1.1"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 418.135 418.135"
                  xmlSpace="preserve"
                  fill="#d20062"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <g>
                      <path
                        style={{ fill: '#d20062' }}
                        d="M198.929,0.242C88.5,5.5,1.356,97.466,1.691,208.02c0.102,33.672,8.231,65.454,22.571,93.536 L2.245,408.429c-1.191,5.781,4.023,10.843,9.766,9.483l104.723-24.811c26.905,13.402,57.125,21.143,89.108,21.631 c112.869,1.724,206.982-87.897,210.5-200.724C420.113,93.065,320.295-5.538,198.929,0.242z M323.886,322.197 c-30.669,30.669-71.446,47.559-114.818,47.559c-25.396,0-49.71-5.698-72.269-16.935l-14.584-7.265l-64.206,15.212l13.515-65.607 l-7.185-14.07c-11.711-22.935-17.649-47.736-17.649-73.713c0-43.373,16.89-84.149,47.559-114.819 c30.395-30.395,71.837-47.56,114.822-47.56C252.443,45,293.218,61.89,323.887,92.558c30.669,30.669,47.559,71.445,47.56,114.817 C371.446,250.361,354.281,291.803,323.886,322.197z"
                      ></path>
                      <path
                        style={{ fill: '#d20062' }}
                        d="M309.712,252.351l-40.169-11.534c-5.281-1.516-10.968-0.018-14.816,3.903l-9.823,10.008 c-4.142,4.22-10.427,5.576-15.909,3.358c-19.002-7.69-58.974-43.23-69.182-61.007c-2.945-5.128-2.458-11.539,1.158-16.218 l8.576-11.095c3.36-4.347,4.069-10.185,1.847-15.21l-16.9-38.223c-4.048-9.155-15.747-11.82-23.39-5.356 c-11.211,9.482-24.513,23.891-26.13,39.854c-2.851,28.144,9.219,63.622,54.862,106.222c52.73,49.215,94.956,55.717,122.449,49.057 c15.594-3.777,28.056-18.919,35.921-31.317C323.568,266.34,319.334,255.114,309.712,252.351z"
                      ></path>
                    </g>
                  </g>
                </svg>
              </a>
            </div>
          </div>
        </div>
        {/* Timer Section */}
        <div className="text-center mt-4">
          <p>Offer ends in</p>
          <p className="text-lg font-bold">{timeLeft.hours} hrs {timeLeft.minutes} mins {timeLeft.seconds} secs</p>
        </div>
      </section>
    </Fragment>
  );
};

export default Submenu;
