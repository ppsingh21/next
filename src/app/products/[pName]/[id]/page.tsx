import React, { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { getSingleProduct } from '@/components/shop/ProductDetails/FetchApi';
import ProductDetailsSection from '@/components/shop/ProductDetails/ProductDetailsSection';
import { Metadata } from 'next';
import { getAllProduct } from '@/components/admin/products/FetchApi';

interface Product {
  _id: string;
  pName: string;
  pImages: string[];
  pDriven: number;
  pFuel: string;
  pTransmission: string;
  pOwners: number;
  pPrice: number;
  pModel: string;
  pYear: number;
  pInsurance: string;
  pProductCode: string;
  pPower: number;
  pEngine: number;
  pTorque: number;
  pAbs: string;
  pAirbags: string;
  pCruiseControl: string;
  pAdjustableSteer: string;
  pRearParkSensor: string;
  pSunroof: string;
  pDescription: string;
  pCategory: {
    _id: string;
    cName: string;
  };
  pTag: string;
  pColour: string;
  pOffer: string;
}

interface PageProps {
  params: {
    id: string;
    pName: string;
  };
}

export async function generateStaticParams() {
  const response = await getAllProduct();
  const products = response?.Products || [];

  return products.map((product: Product) => ({
    id: product._id,
    pName: sanitizeProductName(product.pName), // Sanitize the product name
  }));
}

function sanitizeProductName(name: string) {
  return name.replace(/[^a-zA-Z0-9-]/g, '-'); // Replace invalid characters with '-'
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = params;
  const responseData = await getSingleProduct(id);

  if (!responseData || !responseData.Product) {
    return {};
  }

  const product = responseData.Product;

  return {
    title: `Buy Second Hand ${product.pName} in Bangalore | Pran Motors`,
    description: `Pran Motors is the perfect choice for second hand cars in Bangalore. Check out our second hand ${product.pName} Car in Bangalore on our website. Buy Now online!`,
    openGraph: {
      title: `Buy Second Hand ${product.pName} in Bangalore | Pran Motors`,
      description: `Pran Motors is the perfect choice for second hand cars in Bangalore. Check out our second hand ${product.pName} Car in Bangalore on our website. Buy Now online!`,
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_API_URL}/uploads/products/${product.pImages[0]}`,
          secureUrl: `${process.env.NEXT_PUBLIC_API_URL}/uploads/products/${product.pImages[0]}`,
        },
      ],
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/products/${product.pName}/${product._id}`,
      type: 'website',
      siteName: 'PranMotors',
    },
  };
}

function Page({ params }: PageProps) {
  const { id } = params;
  // Fetch data if needed
  // const responseData = await getSingleProduct(id);

  // if (!responseData || !responseData.Product) {
  //   notFound();
  // }

  // const product = responseData.Product;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductDetailsSection id={id}
      // initialProductData={product} 
      />
    </Suspense>
  );
};

export default Page;
