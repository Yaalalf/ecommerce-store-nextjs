import AllProductsView from "@/components/DefaultTemplate/AllProductsView";
import CollectionServices from "@/db/services/collectionsServices";
import ProductServices from "@/db/services/productServices";
import { sanitatedClientData } from "@/utils/util";

export default async function HomePage() {
  const { getAllProducts } = new ProductServices();
  const { getAllCollections } = new CollectionServices();
  const products = sanitatedClientData(await getAllProducts());
  const collections = sanitatedClientData(await getAllCollections());

  console.log(collections);

  return (
    <div className="full-width full-height">
      <AllProductsView products={products} collections={collections} />
    </div>
  );
}
