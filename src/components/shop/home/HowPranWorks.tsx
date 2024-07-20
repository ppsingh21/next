import React, { Fragment, useState, useEffect } from 'react';

const HowPranWorks: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [autoplay, setAutoplay] = useState(false);
  const [windowWidth, setWindowWidth] = useState<number>(0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const handleClick = () => {
    setAutoplay(true);
  };

  return (
    <Fragment>
      <div className="flex flex-col justify-center items-center py-10">
        <div className="text-center flex flex-row justify-center space-x-2 items-center py-2 font-bold text-2xl">
          <p>What is Pran Motors Super Garage?</p>
        </div>
        <div className="flex justify-center text-center pb-6 items-center">
          You won&apos;t just love our cars, you&apos;ll love the way you buy
          them
        </div>
        <div className="flex justify-center items-center video-thumbnail cursor-pointer">
          <iframe
            id="youtube-video"
            width={windowWidth >= 768 ? 500 : 300}
            height={windowWidth >= 768 ? 300 : 180}
            src={`https://www.youtube.com/embed/TyKW2C4Yj3E?${autoplay ? 'autoplay=1' : ''}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="YouTube Video"
            onClick={handleClick}
          ></iframe>
        </div>
        <div
          onClick={handleClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{ background: isHovered ? '#32012F' : '#f71979' }}
          className="flex flex-row space-x-2 justify-center items-center cursor-pointer text-white p-4 m-8 rounded-lg"
        >
          <div>Watch How It Works</div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-play-circle-fill"
            viewBox="0 0 16 16"
          >
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814z" />
          </svg>
        </div>
        <div className="flex flex-row">
          <div>Learn More</div>
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
    </Fragment>
  );
};

export default HowPranWorks;
