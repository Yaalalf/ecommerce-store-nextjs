import { IResource } from "@/db/models/resources";
import ResourceServices from "@/db/services/resourceServices";
import AddCollection from "@/features/dashboard/collections/components/AddCollection/AddCollection";
import { sanitatedClientData } from "@/utils/util";

export default async function NewCollectionPage() {
  const { getAllResources } = new ResourceServices();
  const resources = sanitatedClientData(await getAllResources()) as IResource[];

  return <AddCollection resources={resources} />;
}
