import React from 'react';
import Head from 'next/head';

interface MetaProps {
  title: string;
  description: string;
  keywords: string;
}

const Meta: React.FC<MetaProps> = ({ title, description, keywords }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Head>
  );
};

export default Meta;
