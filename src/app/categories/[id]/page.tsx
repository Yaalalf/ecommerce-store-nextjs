import CategoryView from "@/components/DefaultTemplate/CategoryView/CategoryView";
import MainFooter from "@/components/DefaultTemplate/MainFooter/MainFooter";
import { ICollectionPopulated } from "@/db/models/collections";
import CollectionServices from "@/db/services/collectionsServices";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
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
