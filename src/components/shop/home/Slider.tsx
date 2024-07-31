import React, { useEffect, useContext, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { HomeContext } from './HomeContext';
import { HomeContextProps, SliderImage } from './types';
import { sliderImages } from '../../admin/dashboardAdmin/Action';
import './style.css';

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
    <div id="fontdiv" className="relative font-bold text-black font-clarendon">
      {sliderImagesData && sliderImagesData.length > 0 ? (
        <div id="slider" className="relative">
          <Image
            loading="eager"
                            
            className="w-full object-cover object-center aspect-[4/3] md:aspect-[2/1]"
            src={`${apiURL}/uploads/customize/${sliderImagesData[slide].slideImage}`}
            alt="sliderImage"
            width={100}
            height={isMobile ? 300 : 500}
          />
          <span className="font-clarendon absolute top-0 translate-x-2.5 translate-y-10 text-xs font-normal md:translate-x-10 md:translate-y-32 md:text-4xl">
            Best Price - Guaranteed!
          </span>
          <span className="font-clarendon absolute top-0 translate-x-2.5 translate-y-14 text-lg tracking-wider font-normal md:translate-x-10 md:tracking-wider md:translate-y-48 md:text-7xl">
            Only
          </span>
          <span className="font-clarendon absolute top-0 text-pink-600 translate-x-16 translate-y-14 text-lg tracking-wider font-normal md:translate-x-60 md:tracking-wider md:translate-y-48 md:text-7xl">
            Less Driven
          </span>
          <span className="font-clarendon absolute top-0 text-pink-600 translate-x-2.5 translate-y-20 text-lg tracking-wider font-normal md:translate-x-10 md:translate-y-72 md:text-7xl md:tracking-wider">
            Used Cars!
          </span>
          <Link
            href="/all-products"
            className={`font-clarendon absolute top-0 text-white text-center transition-colors duration-500
              translate-x-3 translate-y-44 text-xs py-1 px-2 font-light md:font-normal'
              md:translate-x-10 md:translate-y-108 md:text-2xl md:py-2 md:px-5
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
