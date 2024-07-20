'use client';

import React, { Fragment, useReducer } from 'react';
import Slider from '@/components/shop/home/Slider';
import {
  homestate,
  HomeContext,
  homeReducer,
} from '@/components/shop/home/HomeContext';
import BuySellCarComponent from '@/components/shop/home/BuySell';
import FAQs from '@/components/shop/home/FAQs';
import HotCars from '@/components/shop/home/HotCars';
import HowPranWorks from '@/components/shop/home/HowPranWorks';
import ExploreMore from '@/components/shop/home/ExploreMore';
import '@/components/shop/home/style.css';
import WhyPranMotors from '@/components/shop/home/WhyPranMotors';

interface HomePageProps {
  initialSliderImages: any[];
}

const HomeComponent: React.FC<HomePageProps> = ({ initialSliderImages }) => {
  return (
    <Fragment>
      <Slider initialSliderImages={initialSliderImages} />
      <section className="lg:m-4 md:my-6">
        <BuySellCarComponent />
      </section>
      <section className="m-4 md:mx-8 md:my-6">
        <HowPranWorks />
      </section>
      <section className="lg:m-4 md:mx-8 md:my-6">
        <HotCars />
      </section>
      <section className="m-4 md:mx-8 md:my-6">
        <ExploreMore />
      </section>
      <section className="m-4 md:mx-8 md:my-6">
        <FAQs />
      </section>
      <section className="m-4 md:mx-8 md:my-6">
        <WhyPranMotors />
      </section>
    </Fragment>
  );
};

const Home: React.FC<HomePageProps> = ({ initialSliderImages }) => {
  const [data, dispatch] = useReducer(homeReducer, {
    ...homestate,
    sliderImages: initialSliderImages,
  });

  return (
    <Fragment>
      <HomeContext.Provider value={{ data, dispatch }}>
        <HomeComponent initialSliderImages={initialSliderImages} />
      </HomeContext.Provider>
    </Fragment>
  );
};

export default Home;
