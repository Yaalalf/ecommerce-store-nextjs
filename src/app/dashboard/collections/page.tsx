import CollectionServices from "@/db/services/collectionsServices";
import CollectionsView from "@/features/dashboard/collections/components/CollectionsView/CollectionsView";
import { ICollectionsView } from "@/features/dashboard/collections/types/dto";
import { sanitatedClientData } from "@/utils/util";

export default async function CollectionsPage() {
  const { getAllCollections } = new CollectionServices();
  const collections = sanitatedClientData(
    await getAllCollections()
  ) as ICollectionsView[];

  return <CollectionsView collections={collections} />;
}
