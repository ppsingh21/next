import React, { useEffect, useContext, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { HomeContext } from './HomeContext';
import { HomeContextProps, SliderImage } from './types';
import { sliderImages } from '../../admin/dashboardAdmin/Action';

interface SliderProps {
  initialSliderImages: SliderImage[];
}

const apiURL = process.env.NEXT_PUBLIC_API_URL as string;

const Slider: React.FC<SliderProps> = ({ initialSliderImages }) => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const { data, dispatch } = useContext(HomeContext) as HomeContextProps;
  const [slide, setSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // State to manage loading indicator

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    const colorSwitchInterval = setInterval(() => {
      setIsHovered((prev) => !prev);
    }, 150); // Interval for color switching effect

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Clean up event listener
    return () => {
      clearInterval(colorSwitchInterval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (!initialSliderImages || initialSliderImages.length === 0) {
      sliderImages(dispatch).then(() => setIsLoading(false));
    } else {
      dispatch({ type: 'sliderImages', payload: initialSliderImages });
      setIsLoading(false); // Set loading to false once images are loaded
    }
  }, [dispatch, initialSliderImages]);

  const sliderImagesData =
    data.sliderImages && data.sliderImages.length > 0
      ? data.sliderImages
      : initialSliderImages;

  return (
    <div className="relative font-bold text-black font-clarendon">
      {sliderImagesData && sliderImagesData.length > 0 ? (
        <div id="slider" className="relative">
          <Image
            className="w-full object-cover object-center"
            src={`${apiURL}/uploads/customize/${sliderImagesData[slide].slideImage}`}
            alt="sliderImage"
            width={100}
            height={isMobile ? 300 : 500}
            priority={true}
            style={{
              aspectRatio: isMobile ? '4/3' : '2/1',
            }}
          />
          <span
            className={`absolute top-0 ${
              isMobile ? 'translate-x-2.5 translate-y-10 text-xs font-normal' : 'translate-x-10 translate-y-32 text-4xl font-normal'
            }`}
          >
            Best Price - Guaranteed!
          </span>
          <span
            className={`absolute top-0 ${
              isMobile ? 'translate-x-2.5 translate-y-14 text-lg tracking-wider font-normal' : 'translate-x-10 tracking-wider translate-y-48 text-7xl font-normal'
            }`}
          >
            Only
          </span>
          <span
            className={`absolute top-0 text-pink-600 ${
              isMobile ? 'translate-x-16 translate-y-14 text-lg tracking-wider font-normal' : 'translate-x-60 tracking-wider translate-y-48 text-7xl font-normal'
            }`}
          >
            Less Driven
          </span>
          <span
            className={`absolute top-0 text-pink-600 ${
              isMobile ? 'translate-x-2.5 translate-y-20 text-lg tracking-wider font-normal' : 'translate-x-10 translate-y-72 text-7xl font-normal tracking-wider'
            }`}
          >
            Used Cars!
          </span>
          <Link href="/all-products"
            className={`absolute top-0 text-white text-center transition-colors duration-500 ${
              isMobile
                ? 'translate-x-3 translate-y-44 text-xs py-1 px-2 font-normal'
                : 'translate-x-10 translate-y-108 text-2xl py-2 px-5 font-normal'
            } ${isHovered ? 'bg-pink-600' : 'bg-purple-700'} rounded shadow-md`}
          >
            View All Cars
          </Link>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Slider;
