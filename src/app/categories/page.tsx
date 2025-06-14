import CategoriesView from "@/components/DefaultTemplate/CategoriesView/CategoriesView";
import MainFooter from "@/components/DefaultTemplate/MainFooter/MainFooter";
import CollectionServices from "@/db/services/collectionsServices";
import { filterDataByFieldWithValue } from "@/utils/filter";
import { sanitatedClientData } from "@/utils/util";

const { getAllCollections } = new CollectionServices();

const collections = sanitatedClientData(await getAllCollections());

export default async function CategoriesPage() {
  return (
    <>
      <CategoriesView
        collections={filterDataByFieldWithValue(collections, {
          field: "title",
          value: "HOME_COLLECTION",
          distinct: true,
        })}
      ></CategoriesView>
      <MainFooter />
    </>
  );
}
