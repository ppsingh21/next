import React from 'react';
import { Metadata } from 'next';
import { getAllProduct } from '@/components/admin/products/FetchApi';
import { getAllCategory } from '@/components/admin/categories/FetchApi';
import AllProducts from '@/components/shop/Filter/App';

interface PageProps {
  params: {
    pName: string;
  };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  return {
    title: 'Book Second Hand Car | Swift, Hyundai, Maruti Suzuki & More',
    description:
      'Get Honda, Ford, BMW, AUDI, SKODA, Hyundai, Maruti Suzuki, Swift second hand cars in Bangalore and more. Visit our website, and book free test drive. Call Now!',
    keywords: 'Second Hand Car',
  };
}

const Page = async () => {
  const responseData = await getAllProduct();
  const products = responseData?.Products || [];
  const categoryData = await getAllCategory();
  const categories = categoryData?.Categories || [];

  return (
    <AllProducts initialProducts={products} initialCategories={categories} />
  );
};

export default Page;
