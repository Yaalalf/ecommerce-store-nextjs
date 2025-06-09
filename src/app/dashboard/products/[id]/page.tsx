import { IProductPopulated } from "@/db/models/product";
import { IResource } from "@/db/models/resources";
import CollectionServices from "@/db/services/collectionsServices";
import ProductServices from "@/db/services/productServices";
import ResourceServices from "@/db/services/resourceServices";
import ProductView from "@/features/dashboard/products/components/ProductView/ProductView";
import { sanitatedClientData } from "@/utils/util";
import { ObjectId } from "mongoose";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: ObjectId }>;
}) {
  const { id } = await params;
  const { getProductById } = new ProductServices();
  const product = sanitatedClientData(
    await getProductById({ id })
  ) as IProductPopulated;

  const { getAllResources } = new ResourceServices();
  const resources = sanitatedClientData(await getAllResources()) as IResource[];

  const { getAllCollections } = new CollectionServices();
  const collections = sanitatedClientData(await getAllCollections());

  return (
    <ProductView
      product={product}
      resources={resources}
      collections={collections}
    />
  );
}
