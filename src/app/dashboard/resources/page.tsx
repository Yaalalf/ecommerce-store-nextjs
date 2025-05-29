import ResourcesView from "@/components/Dashboard/ResourcesView/ResourcesView";
import { IResource } from "@/db/models/resources";
import ResourceServices from "@/db/services/resourceServices";
import { sanitatedClientData } from "@/utils/util";

export default async function ResourcesPage() {
  const { getAllResources } = new ResourceServices();
  const resources = sanitatedClientData(await getAllResources()) as IResource[];

  return <ResourcesView resources={resources} />;
}
