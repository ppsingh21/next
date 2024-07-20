import React from 'react';
import Home from '../components/shop/home/Home';
import { getSliderImages } from '@/components/admin/dashboardAdmin/FetchApi';

const fetchData = async () => {
  try {
    const sliderResponse = await getSliderImages();
    const initialSliderImages = sliderResponse?.Images || [];
    return initialSliderImages;
  } catch (error) {
    console.error('Error fetching slider images:', error);
    return [];
  }
};

const Page = async () => {
  const initialSliderImages = await fetchData();

  return <Home initialSliderImages={initialSliderImages} />;
};

export default Page;
