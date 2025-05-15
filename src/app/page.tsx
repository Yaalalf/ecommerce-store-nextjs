import AllProductsView from "@/components/DefaultTemplate/AllProductsView";
import CollectionServices from "@/db/services/collectionsServices";
import ProductServices from "@/db/services/productServices";
import PromotionalServices from "@/db/services/promotionalsServices";
import { sanitatedClientData } from "@/utils/util";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ categoryIndex?: number }>;
}) {
  const categoryIndex = (await searchParams).categoryIndex;
  console.log(categoryIndex);
  const { getAllProducts } = new ProductServices();
  const { getAllPromotionals } = new PromotionalServices();

  const { getAllCollections } = new CollectionServices();
  const products = sanitatedClientData(await getAllProducts());
  const collections = sanitatedClientData(await getAllCollections());
  const promotionals = sanitatedClientData(await getAllPromotionals());
  return (
    <div className="full-width full-height">
      <AllProductsView
        products={products}
        collections={collections}
        promotionals={promotionals}
        categoryIndex={categoryIndex ? Number(categoryIndex) : 0}
      />
    </div>
  );
}
