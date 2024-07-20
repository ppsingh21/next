import { getSingleProduct } from '@/components/shop/ProductDetails/FetchApi';
import ProductDetailsSection from '@/components/shop/ProductDetails/ProductDetailsSection';
import React from 'react';
import { Metadata } from 'next';

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
}

interface PageProps {
  params: {
    id: string;
    pName: string;
  };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
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
      url: typeof window !== 'undefined' ? window.location.href : '',
      type: 'website',
      siteName: 'PranMotors',
    },
  };
}

const Page = async ({ params }: PageProps) => {
  const { id } = params;
  const responseData = await getSingleProduct(id);

  if (!responseData || !responseData.Product) {
    // Return 404 not found if product data is not found
    return <div>Product not found</div>;
  }

  const product = responseData.Product;

  return <ProductDetailsSection initialProductData={product} />;
};

export default Page;
