import ProductView from "@/components/DefaultTemplate/ProductView";
import { IProductPopulated } from "@/db/models/product";
import ProductServices from "@/db/services/productServices";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { getProductById } = new ProductServices();
  const product = (await getProductById({ id })) as IProductPopulated;
  const sanitizedProduct = JSON.parse(JSON.stringify(product));

  return <ProductView product={sanitizedProduct} />;
}
