import CategoriesView from "@/components/DefaultTemplate/CategoriesView/CategoriesView";
import CollectionServices from "@/db/services/collectionsServices";
import { sanitatedClientData } from "@/utils/util";

const { getAllCollections } = new CollectionServices();

const collections = sanitatedClientData(await getAllCollections());

export default async function CategoriesPage() {
  return <CategoriesView collections={collections}></CategoriesView>;
}
