import AddProductView from "@/components/Dashboard/AddProductView/AddProductView";
import { IResource } from "@/db/models/resources";
import CollectionServices from "@/db/services/collectionsServices";
import ResourceServices from "@/db/services/resourceServices";
import { sanitatedClientData } from "@/utils/util";

export default async function NewProductPage() {
  const { getAllResources } = new ResourceServices();
  const resources = sanitatedClientData(await getAllResources()) as IResource[];
  const { getAllCollections } = new CollectionServices();
  const collections = sanitatedClientData(await getAllCollections());

  return <AddProductView resources={resources} collections={collections} />;
}
