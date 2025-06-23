import { ICollectionPopulated } from "@/db/models/collections";
import { IResource } from "@/db/models/resources";
import CollectionServices from "@/db/services/collectionsServices";
import ResourceServices from "@/db/services/resourceServices";
import { CollectionView } from "@/features/dashboard/collections/components/CollectionView/CollectionView";
import { sanitatedClientData } from "@/utils/util";
import { ObjectId } from "mongoose";

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ id: ObjectId }>;
}) {
  const { id } = await params;
  const { getCollectionById } = new CollectionServices();
  const collection = sanitatedClientData(
    await getCollectionById({ id })
  ) as ICollectionPopulated;

  const { getAllResources } = new ResourceServices();
  const resources = sanitatedClientData(await getAllResources()) as IResource[];

  return <CollectionView resources={resources} collection={collection} />;
}
