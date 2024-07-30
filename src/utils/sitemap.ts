import { getAllProduct } from '@/components/admin/products/FetchApi';
import { SitemapStream, streamToPromise } from 'sitemap';
import { Readable } from 'stream';

interface Product {
  _id: string;
  pName: string;
}

export async function generateSitemap() {
  const hostname = process.env.NEXT_PUBLIC_API_URL;

  const links = [
    { url: '/', changefreq: 'daily', priority: 0.9 },
    { url: '/all-products', changefreq: 'daily', priority: 0.8 },
    { url: '/blogs', changefreq: 'daily', priority: 0.8 },
    { url: '/contact-us', changefreq: 'monthly', priority: 0.7 },
    { url: '/faqs', changefreq: 'monthly', priority: 0.7 },
    { url: '/privacy-policy', changefreq: 'yearly', priority: 0.5 },
    { url: '/terms-and-conditions', changefreq: 'yearly', priority: 0.5 },
    { url: '/wish-list', changefreq: 'monthly', priority: 0.6 },
    // Add more static routes as needed
  ];

  // Fetch dynamic routes, e.g., products
  const products = await getAllProduct();
  if (products && products.Products) {
    (products.Products as Product[]).forEach((product: Product) => {
      links.push({
        url: `/products/${product.pName.replace(/ /g, '-')}/${product._id}`,
        changefreq: 'daily',
        priority: 0.8,
      });
    });
  }

  const stream = new SitemapStream({ hostname });
  const xmlString = await streamToPromise(
    Readable.from(links).pipe(stream)
  ).then((data) => data.toString());

  return xmlString;
}
