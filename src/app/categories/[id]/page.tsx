import CategoryView from "@/components/DefaultTemplate/CategoryView/CategoryView";
import MainFooter from "@/components/DefaultTemplate/MainFooter/MainFooter";
import { ICollectionPopulated } from "@/db/models/collections";
import CollectionServices from "@/db/services/collectionsServices";
import { ObjectId } from "mongoose";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ id: ObjectId }>;
}) {
  const { id } = await params;
  const { getCollectionById } = new CollectionServices();
  const category = (await getCollectionById({ id })) as ICollectionPopulated;
  const sanitizedCategory = JSON.parse(JSON.stringify(category));

  return (
    <>
      <CategoryView category={sanitizedCategory} />
      <MainFooter />
    </>
  );
}
