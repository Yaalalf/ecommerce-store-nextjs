import ProductsView from "@/components/Dashboard/ProductsView/ProductsView";
import { IProduct } from "@/db/models/product";
import ProductServices from "@/db/services/productServices";
import { sanitatedClientData } from "@/utils/util";

export default async function ProductsPage() {
  const { getAllProducts } = new ProductServices();
  const products = sanitatedClientData(await getAllProducts()) as IProduct[];

  return <ProductsView products={products} />;
}
