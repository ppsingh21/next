import { getAllProduct } from "@/components/admin/products/FetchApi";

export async function generateStaticParams() {
  const response = await getAllProduct();
  const products = response?.Products || [];

  return products.map((product: { _id: string, pName: string }) => ({
    id: product._id,
    pName: product.pName.replace(/\s+/g, '-').replace(/[^\w-]/g, ''),  // Remove special characters
  }));
}
