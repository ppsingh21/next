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

interface Product {
  _id: string;
  pName: string;
  pCategory: { _id: string };
  pPrice: number;
  pImages: string[];
  pViews: number;
  pDriven: number;
  pFuel: string;
  pTransmission: string;
  pYear: number;
  pTag: string;
  pOffer: string;
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

function Page () {
// = async () =>{
  // const responseData = await getAllProduct();
  // const products: Product[] = responseData?.Products || [];
  // const categoryData = await getAllCategory();
  // const categories = categoryData?.Categories || [];

  // // Separate sold-out products and non-sold-out products
  // const nonSoldOutProducts = products.filter(
  //   (product) => product.pTag !== 'Sold_Out'
  // );
  // const soldOutProducts = products.filter(
  //   (product) => product.pTag === 'Sold_Out'
  // );

  // // Concatenate non-sold-out products with sold-out products at the end
  // const sortedProducts = [...nonSoldOutProducts, ...soldOutProducts];

  return (
    <AllProducts
      // initialProducts={sortedProducts}
      // initialCategories={categories}
    />
  );
};

export default Page;
