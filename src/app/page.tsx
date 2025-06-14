import AllProductsView from "@/components/DefaultTemplate/AllProductsView";
import MainFooter from "@/components/DefaultTemplate/MainFooter/MainFooter";
import MainHeader from "@/components/DefaultTemplate/MainHeader/MainHeader";
import CollectionServices from "@/db/services/collectionsServices";
import PromotionalServices from "@/db/services/promotionalsServices";
import { filterDataByFieldWithValue } from "@/utils/filter";
import { sanitatedClientData } from "@/utils/util";
import { headers } from "next/headers";

export default async function HomePage() {
  const headersList = await headers();
  const userAgent = headersList.get("user-agent") as string;

  const isMobile = userAgent.match("Mobile");

  const { getAllPromotionals } = new PromotionalServices();

  const { getAllCollections } = new CollectionServices();
  const collections = sanitatedClientData(await getAllCollections());
  const promotionals = sanitatedClientData(await getAllPromotionals());
  return (
    <>
      <MainHeader />
      <div className="w-full h-full">
        <AllProductsView
          products={
            collections.find(
              (collection) => collection.title === "HOME_COLLECTION"
            )?.products || []
          }
          collections={filterDataByFieldWithValue(collections, {
            field: "title",
            value: "HOME_COLLECTION",
            distinct: true,
          })}
          promotionals={promotionals}
          isMobile={Boolean(isMobile)}
        />
      </div>
      <MainFooter />
    </>
  );
}
